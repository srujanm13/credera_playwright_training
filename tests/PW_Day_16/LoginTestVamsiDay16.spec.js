
import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });

// TEST 1: Login and Create Storage State

test('storage state', async ({ page }) => {

    // Open application
    await page.goto('https://www.saucedemo.com/');

    // Enter username
    await page.locator("#user-name").fill("standard_user");

    // Enter password
    await page.locator("#password").fill("secret_sauce");

    // Click login
    await page.locator("#login-button").click();

    // Verify successful login
    await expect(page.locator(".title")).toHaveText("Products");

    // Save browser state
    await page.context().storageState({path: 'loginState.json'});

});

test.use({storageState: './loginState.json'});

//Test 2

test('Products page', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/inventory.html");

    // Verify Products heading
    await expect(page.locator(".title")).toHaveText("Products"); 

    // Verify one product is displayed
    await expect(page.getByText("Sauce Labs Backpack").first()).toBeVisible();

});