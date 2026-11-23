// Optional Windows sandbox launch adapter. Original specs/configs remain unchanged.
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const allowed=['Task-2-Dynamic-Task-Manager','Task-3-Weather-Forecast','Task-4-Ecommerce-Shopping-Cart'];
if(!allowed.includes(process.env.SUBMISSION_PROJECT)) throw new Error('Set SUBMISSION_PROJECT to one of the three vanilla project folders.');
const project=resolve(root,process.env.SUBMISSION_PROJECT);
const {defineConfig}=createRequire(resolve(project,'package.json'))('@playwright/test');
const original=(await import(pathToFileURL(resolve(project,'playwright.config.js')).href)).default;
export default defineConfig({...original,testDir:resolve(project,'tests/browser'),reporter:[['list']],use:{...original.use,launchOptions:{...original.use?.launchOptions,args:['--disable-crashpad-for-testing']}},webServer:process.env.SUBMISSION_EXTERNAL_PREVIEW?undefined:original.webServer?{...original.webServer,cwd:project}:undefined});
