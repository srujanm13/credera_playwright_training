import { test, expect } from '@playwright/test';
import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

test('Await Method', async ({ page }) => {
await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
});

test('Loader handling', async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();

    const loader = page.locator('#loadingOverlay');
    if (await loader.count() > 0) {
        await loader.waitFor({ state: 'hidden' });
    }
});

test('Explicit event waiting', async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.waitForTimeout(3000);
});

test('Verify the success message after a successful login', async ({ page}) => {
    await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    expect(page.locator("#successMessage")).toBeVisible();
    await page.waitForTimeout(3000);
});

test('The Web First Assertions', async ({ page }) => {
    await loginToSmartERP(page); 
    await expect(page).toHaveURL(/dashboard/);
    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});

test('Validate the JSON response', async ( ) => {

  const json = {
        id: 4567,         
        name: "tester",    
        Email: "test@omnicom", 
        active: true,   
        roles: ["QA", "Admin"],    
        date: "2026-07-30" 
    };
 
    expect(typeof json.id).toBe("number");
    expect(typeof json.name).toBe("string");
    expect(json.Email).toContain("@");
    expect(typeof json.active).toBe("boolean");
    expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(json).toHaveProperty("id");
});

test('Verify the Database connected is present with a green check in System Status', async ({ page, context }) => {
    await loginToSmartERP(page);
    await expect(page.getByText("✅ Database Connected")).toBeVisible();
});

test('Verify the Customer Status dropdown values', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openCustomers(page);
    const dropdown = page.locator("#statusFilter");
    const options = await dropdown.locator("option").allTextContents();
    const trimmedOptions = options.map(option => option.trim());
    console.log(trimmedOptions);
});
