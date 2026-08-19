import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('Login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.getByText('Products')).toBeVisible();

        await page.context().storageState({
            path: 'storageState.json'
        });
    });
});

test.describe('Products', () => {
    test.use({
        storageState: './storageState.json'
    });

    test('Verify Products', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page.getByText('Products')).toBeVisible();
    });
});