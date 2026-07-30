
import {expect} from '@playwright/test'

export async function loginToSmartERP(page) {
    await page.goto("https://smarterp-wgaw.onrender.com/");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await page.waitForLoadState('networkidle');
}