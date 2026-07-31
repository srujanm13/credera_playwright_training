import { test, expect } from '@playwright/test';

test.describe('Smart ERP Day 8 Tasks', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/');
    });

    test('1,2 & 3 - Wait strategies, Login success and Loading disappears', async ({ page }) => {

        // Explicit wait
        await page.waitForSelector('#username');

        // Fill credentials
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');

        // Click and wait for navigation
        await Promise.all([
            page.waitForLoadState('networkidle'),
            page.click("button[type='submit']")
        ]);

        // Assertion - Login success message
        await expect(page.locator("text=Login Successful")).toBeVisible();

        // Assertion - Loading spinner disappears
        const loader = page.locator(".spinner,.loading,.loader");
        await expect(loader).toBeHidden();

        // Wait for dashboard
        await expect(page).toHaveURL(/dashboard/);

    });

    test('4 - JSON Assertions', async () => {

        const data = {
            id: 4567,
            name: "tester",
            Email: "test@omnicom",
            active: true,
            roles: ["QA", "Admin"],
            date: "2026-07-30"
        };

        // a. id is number
        expect(typeof data.id).toBe("number");

        // b. name is string
        expect(typeof data.name).toBe("string");

        // c. email contains
        expect(data.Email).toContain("@");

        // d. active boolean
        expect(typeof data.active).toBe("boolean");

        // e. date format YYYY-MM-DD
        expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        // f. id field present
        expect(data).toHaveProperty("id");

    });

    test('5 - Verify Database Connected with green check', async ({ page }) => {

        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");

        await expect(page.locator("text=Database connected")).toBeVisible();

        // Verify green icon/check
        const statusIcon = page.locator("text=Database connected").locator("..").locator("svg");

        await expect(statusIcon).toBeVisible();

    });

    test('6 - Verify Customer Status Dropdown Values', async ({ page }) => {

        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");

        await page.click("text=Customers");

        const options = await page.locator("select option").allTextContents();

        const trimmed = options.map(o => o.trim()).filter(o => o.length > 0);
        expect(trimmed).toEqual([
            "All Status",
            "Active",
            "Inactive",
            "Suspended"
        ]);

    });

});