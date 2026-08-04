import{test,expect} from'@playwright/test'

test('Handling frames',async({page})=>{

    await page.goto("https://smarterp-wgaw.onrender.com/ ");
    await page.locator('#username').fill("admin");
    await page.locator('#password').fill("admin123");
    await page.locator('#loginBtn').click();
    await page.locator('#playgroundMenu').click(); 
    const frame= page.frameLocator('#demoFrame');
    await frame.locator('#menuProducts').waitFor({state:'visible'});
    await expect(frame.locator('#menuProducts')).toBeVisible();
    await frame.locator('#menuProducts').click();
    await frame.locator('#description').fill('This is the sample text inside a frame element');
    await expect(frame.locator('#description')).toHaveValue('This is the sample text inside a frame element');
    
})

test('Multiple windows',async({browser})=>{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.hyundai.com/in/en",{waitUntil:'domcontentloaded'});
    const [newPage ]= await Promise.all([
    context.waitForEvent('page'),
    page.locator('//span[@class="drive"]').click()
   ])
    await expect(newPage).toHaveURL(/request-a-test-drive/)
    await newPage.locator('#name').fill('Test');
    await expect(newPage.locator('#name')).toHaveValue('Test');
    await page.bringToFront();
    await expect(page).toHaveURL(/en/);
    await page.getByText('Blog').first().click();
    await expect(page).toHaveURL(/blog/);   
})




