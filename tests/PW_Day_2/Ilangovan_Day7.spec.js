import{test,expect} from'@playwright/test'


//Ilangovan_Day7.spec.js
test('All actions', async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
await page.locator('#playgroundMenu').click();

//hover
await page.locator('div.hover-card').hover();
const tooltiptext =await page.locator('div.tooltip').textContent();
console.log(tooltiptext)

//drag and drop

await page.locator('#dragItem').dragTo(page.locator('#dropZone'));
const dropelement=await page.locator('#dropZone');
await expect(dropelement).toContainText('Task 1');


//doubleclick
await page.locator('#doubleBtn').dblclick();
const successmsg=await page.locator('#doubleMessage').textContent();
console.log(successmsg);

//Mouse co-ordinates.

const insidebox=await page.locator('#mouseArea').boundingBox();
await  page.mouse.move(insidebox.x+32, insidebox.y+10);
//await page.waitForTimeout(8000);

//Rightclick

await page.locator('#rightClickBox').click({button:'right'});
const menu=await page.locator('//ul[@id="contextMenu"]/li').allTextContents();
console.log(menu);
await expect(menu).toContain('Edit');
await expect(menu).toEqual(['Edit','Delete','Export']);


//slider

await page.locator('//input[@id="slider"]').fill('100');
//await page.waitForTimeout(8000);

const slidervalue=await page.locator('#sliderValue').innerText();
console.log(slidervalue);
await expect(slidervalue).toBe('100');


//fileupload

await page.locator('#upload').setInputFiles('C:/Users/ilangovan.palani/OneDrive - OneWorkplace/Documents/hello.txt');
const fname=await page.locator('#fileName').textContent();
console.log(fname);
})




