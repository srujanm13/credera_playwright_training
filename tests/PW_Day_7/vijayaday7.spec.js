import { test, expect } from '@playwright/test';

test.describe('Vijaya Day 7 - Playground Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://smarterp-wgaw.onrender.com/');
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");
        await page.locator('#playgroundMenu').click();
    });

    test('1 - Verify Playground page title', async ({ page }) => {
        await expect(page.locator('h1').first()).toHaveText('Playwright Playground');
    });

    test('2 - Double click button shows message', async ({ page }) => {
        await page.locator('#doubleBtn').dblclick();
        await expect(page.locator('#doubleMessage')).toBeVisible();
    });

    test('3 - Right click shows message', async ({ page }) => {
        await page.getByText('Right Click Here').click({ button: 'right' });
        const msg = await page.locator('#rightClickBox').textContent();
        expect(msg).toBe('Expected Right Click Message');

    });

    test('4 - Slider value can be changed', async ({ page }) => {
        const slider = page.locator('input[type="range"]');
        await slider.evaluate(el => el.value = 75);
        const value = await slider.inputValue();
        expect(value).toBe('75');
    });

    test('5 - Hover reveals tooltip or text', async ({ page }) => {
        await page.getByText('Hover Me').hover();
        await expect(page.getByText('Hover Me')).toBeVisible();
    });

});
