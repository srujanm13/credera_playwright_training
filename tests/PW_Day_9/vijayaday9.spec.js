import { test, expect } from '@playwright/test';
import { loginToSmartERP } from '../helpers/smarterp';
test.describe('Vijaya Day 9 - API & UI Tests', () => {
    test('1 - Login and verify dashboard', async ({ page }) => {
        await loginToSmartERP(page);
        await expect(page.locator('h2').first()).toHaveText('SmartERP');
    });

    test('2 - Verify Customers page loads', async ({ page }) => {
        await loginToSmartERP(page);
        await page.locator('#menuCustomers').click();
        await expect(page.locator('#customersTable')).toBeVisible();
    });

    test('Validate JSON using asymmetric matchers', async () => {
        const json = {
            "id": 4567,
            "name": 'tester',
            "Email": 'test@omnicom',
            "active": true,
            "roles": ['QA', 'Admin'],
            "date": '2026-07-30'
        };
        expect(json).toHaveProperty('id');

        expect(json).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                Email: expect.stringContaining('@'),
                active: expect.any(Boolean)
            })
        );

        expect(json.date).toEqual(
            expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
        );
    });

    test('3 - Verify Database Connected with green check', async ({ page }) => {
        await loginToSmartERP(page);
        await expect(page.locator('text=Database connected')).toBeVisible();
        const statusIcon = page.locator('text=Database connected').locator('..');
        await expect(statusIcon).toBeVisible();
    });

    test('4 - Verify Customer Status Dropdown Values', async ({ page }) => {
        await loginToSmartERP(page);
        await page.click('text=Customers');
        const options = await page.locator('#statusFilter option').allTextContents();
        const trimmed = options.map(o => o.trim()).filter(o => o.length > 0);
        expect(trimmed).toEqual(['All Status', 'Active', 'Inactive', 'Suspended']);
    });
});