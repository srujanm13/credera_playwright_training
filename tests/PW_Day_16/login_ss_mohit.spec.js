import {test, expect} from '@playwright/test';

test("Login using Storage state", async ({page})=>{
    test.setTimeout(60000);
    await page.goto("https://opensource-demo.orangehrmlive.com",{waitUntil:'domcontentloaded',timeout:60000});
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await Promise.all([
        page.getByAltText("profile picture").waitFor('visible'),
        page.getByRole("button",{name:'Login'}).click()])   
    await page.context().storageState({path:'mohitstate.json'})
});

 test.use({
     storageState:'./mohitstate.json'
});

test.only("Verify PIM page heading", async ({page})=>{
    test.setTimeout(60000);
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList",{waitUntil:'domcontentloaded',timeout:60000});
    await page.getByRole("heading",{name:'PIM'}).waitFor({state:"visible", timeout: 60000});
})