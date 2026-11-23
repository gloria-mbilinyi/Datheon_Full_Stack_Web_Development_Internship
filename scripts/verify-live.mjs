import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const {chromium,expect}=createRequire(new URL('../Task-4-Ecommerce-Shopping-Cart/package.json',import.meta.url))('@playwright/test');
const root=fileURLToPath(new URL('../',import.meta.url));
const evidence=new URL('../docs/evidence/',import.meta.url);
const screenshots=new URL('../docs/screenshots/',import.meta.url);
await mkdir(evidence,{recursive:true});await mkdir(screenshots,{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||(process.platform==='win32'?'chrome':undefined),args:process.platform==='win32'?['--disable-crashpad-for-testing']:[]});
const results=[];
async function capture(page,task) {
  const widths=[];
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Task ${task} overflows at ${width}px`);
    await page.screenshot({path:fileURLToPath(new URL(`task-${task}-${width}.png`,screenshots))});
    widths.push(width);
  }
  return widths;
}
async function portfolio(page) {
  await expect(page.locator('h1')).toContainText('Gloria Beneth Mbilinyi');
  await expect(page.locator('.project-card')).toHaveCount(9);
  const cv=await page.request.get(new URL('/gloria-beneth-mbilinyi-cv.pdf',page.url()).href);
  assert.equal(cv.status(),200);assert.match(cv.headers()['content-type'],/pdf/);
  const initial=await page.locator('html').getAttribute('class');
  await page.getByRole('button',{name:/Switch to/}).click();
  assert.notEqual(await page.locator('html').getAttribute('class'),initial);
  await page.locator('.filter-row').getByRole('button',{name:'AI/ML',exact:true}).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  const safari=page.locator('.project-card').filter({has:page.getByRole('heading',{name:'SafariSmart AI Concierge',exact:true})});
  await safari.getByRole('button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.filter-row').getByRole('button',{name:'All',exact:true}).click();
  await expect(page.locator('.project-card')).toHaveCount(9);
  await page.setViewportSize({width:390,height:1000});
  await page.locator('.mobile-menu-button').click();
  await expect(page.locator('.mobile-menu-button')).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('.mobile-nav a')).toHaveCount(7);
  await page.locator('.mobile-menu-button').click();
  return {projects:9,cvStatus:cv.status(),theme:true,filtering:true,details:true,mobileNavigation:true};
}
try {
  if(process.argv.includes('--local-portfolio')) {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    const response=await page.goto('http://127.0.0.1:4180/');assert.equal(response.status(),200);
    const details=await portfolio(page);
    await writeFile(new URL('portfolio-local-browser.json',evidence),JSON.stringify({scope:'Supplementary Playwright checks against imported Task 1 preview; original CDP script could not launch crashpad in the sandbox',checkedAt:new Date().toISOString(),result:'passed',...details},null,2));
    await page.close();
  }
  const urls=['https://gloria-mbilinyi-gloria-portfolio.gloria-portfolio-tz.workers.dev/','https://gloria-mbilinyi.github.io/taskflow-datheon/','https://gloria-mbilinyi.github.io/skycast-datheon/','https://gloria-mbilinyi.github.io/cartnova-datheon/'];
  for(let index=0;index<urls.length;index++) {
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
    let apiPromise;
    if(index===3) apiPromise=page.waitForResponse(response=>response.url()==='https://fakestoreapi.com/products');
    const response=await page.goto(urls[index]);assert.equal(response.status(),200);
    let detail={};
    if(index===0) detail=await portfolio(page);
    if(index===1) await expect(page).toHaveTitle(/TaskFlow/);
    if(index===2) {
      const geo=page.waitForResponse(response=>response.url().startsWith('https://geocoding-api.open-meteo.com/v1/search'));
      await page.locator('#city-search').fill('Dar es Salaam');await page.locator('#search-submit').click();
      assert.equal((await geo).status(),200);
      await page.getByRole('option').first().waitFor();
      const forecast=page.waitForResponse(response=>response.url().startsWith('https://api.open-meteo.com/v1/forecast'));
      await page.getByRole('option').first().click();const api=await forecast;assert.equal(api.status(),200);
      const data=await api.json();await expect(page.locator('#weather-content')).toBeVisible();
      await expect(page.locator('#current-temperature')).toHaveText(`${Math.round(data.current.temperature_2m)}°C`);
      await expect(page.locator('.forecast-card')).toHaveCount(5);
      detail={geocoding:200,forecast:200,forecastDays:5,temperatureMatchesAPI:true};
    }
    if(index===3) {const api=await apiPromise;assert.equal(api.status(),200);const data=await api.json();await expect(page.locator('.product-card')).toHaveCount(data.length);detail={productsAPI:200,products:data.length};}
    const widths=await capture(page,index+1);assert.deepEqual(errors,[]);
    results.push({task:index+1,url:urls[index],finalURL:page.url(),httpStatus:response.status(),title:await page.title(),widths,runtimeErrors:errors,mocked:false,...detail});
    await context.close();
  }
  const record={checkedAt:new Date().toISOString(),result:'passed',browser:browser.version(),projects:results};
  await writeFile(new URL('live-demos.json',evidence),JSON.stringify(record,null,2));console.log(JSON.stringify(record));
} finally {await browser.close();}
