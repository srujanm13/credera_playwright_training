import { test, expect } from '@playwright/test';
 
test.describe.configure({ mode: 'serial' });
 
test('capture storage state in json', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Products')).toBeVisible();
    await page.context().storageState({
        path: 'storageState.json'
    });
 
});
 
test('verify cart page using storage state', async ({ browser }) => {
    const context = await browser.newContext({
        storageState: 'storageState.json'
    });
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.title')).toContainText('Your Cart');
 
});