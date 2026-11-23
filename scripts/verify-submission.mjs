import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const folders=['Task-1-Developer-Portfolio','Task-2-Dynamic-Task-Manager','Task-3-Weather-Forecast','Task-4-Ecommerce-Shopping-Cart'];
const hash=data=>createHash('sha256').update(data).digest('hex');
const ignored=new Set(['node_modules','dist','build','.next','.output','.tanstack','.nitro','.vite','.wrangler','.cache','coverage','test-results','playwright-report']);
let importsChecked=0;
let filesChecked=0;

async function verifyReference(reference,base,projectRoot) {
  if (!reference || /^(?:#|[a-z][a-z0-9+.-]*:)/i.test(reference)) return;
  const clean=reference.split(/[?#]/)[0];
  if (!clean) return;
  const target=resolve(dirname(base),decodeURIComponent(clean));
  const fromRoot=relative(projectRoot,target);
  assert.ok(!fromRoot.startsWith('..')&&!isAbsolute(fromRoot),`Reference escapes project: ${reference}`);
  const candidates=[target,...['.js','.mjs','.ts','.tsx','.json','/index.js','/index.ts','/index.tsx'].map(extension=>target+extension)];
  let found=false;
  for(const candidate of candidates) {try {await access(candidate);found=true;break;} catch { /* Try a supported module extension. */ }}
  assert.ok(found,`Unresolved reference in ${relative(root,base)}: ${reference}`);
  importsChecked++;
}

async function verifyTree(directory,projectRoot) {
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    assert.notEqual(entry.name,'.git','Nested Git metadata is prohibited.');
    if(ignored.has(entry.name)||entry.name.startsWith('.cartnova-build-')) continue;
    const file=resolve(directory,entry.name);
    assert.ok(!entry.isSymbolicLink(),`Unexpected symlink: ${relative(root,file)}`);
    if(entry.isDirectory()) {await verifyTree(file,projectRoot);continue;}
    if(!['.html','.css','.js','.mjs','.ts','.tsx'].includes(extname(file))) continue;
    const content=await readFile(file,'utf8');
    if(extname(file)==='.html') for(const [,reference] of content.matchAll(/(?:src|href)=["']([^"']+)["']/g)) await verifyReference(reference,file,projectRoot);
    if(extname(file)==='.css') for(const [,quote,reference] of content.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/g)) await verifyReference(reference,file,projectRoot);
    if(/\.(?:m?js|tsx?)$/.test(file)) {
      for(const [,reference] of content.matchAll(/(?:\bfrom\s*|\bimport\s*)['"](\.[^'"\n]+)['"]/g)) await verifyReference(reference,file,projectRoot);
      for(const [,reference] of content.matchAll(/new URL\(['"](\.[^'"\n]+)['"],\s*import\.meta\.url\)/g)) {
        // Tests/build scripts may reference outputs that do not exist in a clean clone.
        const destination=relative(projectRoot,resolve(dirname(file),reference)).split(/[\\/]/)[0];
        if(ignored.has(destination)) continue;
        await verifyReference(reference,file,projectRoot);
      }
    }
  }
}

const tasks=[];
for(let index=0;index<folders.length;index++) {
  const folder=folders[index];
  const projectRoot=resolve(root,folder);
  const manifest=JSON.parse(await readFile(resolve(root,`docs/source-manifests/task-${index+1}.json`),'utf8'));
  assert.equal(manifest.directory,folder);
  assert.match(manifest.sourceCommit,/^[0-9a-f]{40}$/);
  assert.ok(manifest.files.length>20,'A real source tree is required.');
  for(const record of manifest.files) {
    const data=await readFile(resolve(projectRoot,record.path));
    assert.equal(hash(data),record.sha256,`Source integrity mismatch: ${folder}/${record.path}`);
    filesChecked++;
  }
  const packageJson=JSON.parse(await readFile(resolve(projectRoot,'package.json'),'utf8'));
  await access(resolve(projectRoot,'package-lock.json'));
  assert.ok((await readFile(resolve(projectRoot,'README.md'),'utf8')).length>1000);
  assert.ok(packageJson.scripts.build&&packageJson.scripts.test);
  await verifyTree(projectRoot,projectRoot);
  tasks.push({task:index+1,directory:folder,sourceCommit:manifest.sourceCommit,files:manifest.files.length});
}

const tracked=execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const secretPatterns=[/gh[pousr]_[A-Za-z0-9_]{25,}/,/github_pat_[A-Za-z0-9_]{30,}/,/AKIA[A-Z0-9]{16}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
for(const path of tracked) {
  const parts=path.split('/');
  assert.ok(!parts.some(part=>ignored.has(part)||part==='.git'),`Excluded path was tracked: ${path}`);
  assert.ok(!/\.(?:pem|p12|pfx|key)$/.test(path),`Credential-like file: ${path}`);
  const name=parts.at(-1);
  assert.ok(!(name==='.env'||(name.startsWith('.env.')&&!['.env.example','.env.sample'].includes(name))),`Private environment file: ${path}`);
  const data=await readFile(resolve(root,path));
  if(data.includes(0)||data.length>3000000) continue;
  const content=data.toString('utf8');
  assert.ok(!secretPatterns.some(pattern=>pattern.test(content)),`Potential credential: ${path}`);
  assert.ok(!/C:\\Users\\|\/Users\/[^/\s]+|\/home\/[^/\s]+/.test(content),`Personal machine path: ${path}`);
}

// Validate local links/images in submission documentation; web links have separate evidence.
for(const document of ['README.md','docs/SUBMISSION_REPORT.md']) {
  const file=resolve(root,document);
  const content=await readFile(file,'utf8');
  for(const [,reference] of content.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)) await verifyReference(reference,file,root);
}
console.log(JSON.stringify({result:'passed',tasks,sourceFiles:filesChecked,relativeReferences:importsChecked,trackedFiles:tracked.length,credentialPatterns:'none detected',nestedGit:'none detected',checkedAt:new Date().toISOString()},null,2));
