import{test,expect} from '@playwright/test'

test('capture storagestate', async({page})=>{
    await page.goto("https://bookcart.azurewebsites.net/login",{waitUntil:'domcontentloaded'});
    await page.locator('//input[@formcontrolname="username"]').fill("ortoni");
    await page.locator('//input[@formcontrolname="password"]').fill("Pass1234$");
    await page.locator('//mat-card-actions/button/span[text()="Login"]').click();
    await expect(page.locator('mat-toolbar-row')).toContainText(' ortoni');
    await page.context().storageState({path:'ilangovanstate.json'})
});

test.use({storageState:'./ilangovanstate.json'});

test.only('use storage state', async({page})=>{
    page.goto("https://bookcart.azurewebsites.net/")
    await expect(page.locator('mat-toolbar-row')).toContainText(' ortoni');
    await page.getByText('account_circlearrow_drop_down').click();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
});

