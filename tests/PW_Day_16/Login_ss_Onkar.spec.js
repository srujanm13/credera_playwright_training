import {test, expect} from '@playwright/test';
test('capture storagestate in json', async({page})=>{
    await page.goto("https://bookcart.azurewebsites.net/login",{waitUntil:'domcontentloaded'});
    await page.locator('//input[@formcontrolname="username"]').fill("ortoni");
    await page.locator('//input[@formcontrolname="password"]').fill("Pass1234$");
    await page.locator('//mat-card-actions/button/span[text()="Login"]').click();
    await expect(page.locator('mat-toolbar-row')).toContainText(' ortoni');
    await page.context().storageState({path:'Onkar.json'})
});
test.use({storageState:'./Onkar.json'});

test('use storage state json', async({page})=>{
    await page.goto("https://bookcart.azurewebsites.net/" , {waitUntil:'load', timeout:60000});
    await expect(page.getByText('Book Cart')).toContainText('Book Cart',  {timeout:60000});
});