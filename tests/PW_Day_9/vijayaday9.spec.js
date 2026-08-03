import { test, expect } from '@playwright/test';

test.describe('Vijaya Day 9 - API & UI Tests', () => {

    test('1 - Login and verify dashboard', async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");
        await expect(page.locator('h2').first()).toHaveText('SmartERP');
    });

    test('2 - Verify Customers page loads', async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");
        await page.locator('#menuCustomers').click();
        await expect(page.locator('#customersTable')).toBeVisible();
    });

    test('3 - API response status is 200', async ({ request }) => {
        const response = await request.get('https://smarterp-wgaw.onrender.com/api/customers');
        expect(response.status()).toBe(200);
    });

    test('4 - API response data has correct structure', async ({ request }) => {
        const response = await request.get('https://smarterp-wgaw.onrender.com/api/customers');
        const body = await response.json();
        const data = Array.isArray(body) ? body[0] : body;

        // d. active boolean
        expect(typeof data.active).toBe('boolean');

        // e. date format YYYY-MM-DD
        expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        // f. id field present
        expect(data).toHaveProperty('id');
    });

    test('5 - Verify Database Connected with green check', async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");
        await expect(page.locator('text=Database connected')).toBeVisible();
        const statusIcon = page.locator('text=Database connected').locator('..').locator('svg');
        await expect(statusIcon).toBeVisible();
    });

    test('6 - Verify Customer Status Dropdown Values', async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");
        await page.click('text=Customers');
        const options = await page.locator('select option').allTextContents();
        const trimmed = options.map(o => o.trim()).filter(o => o.length > 0);
        expect(trimmed).toEqual(['All Status', 'Active', 'Inactive', 'Suspended']);
    });

});
