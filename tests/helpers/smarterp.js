
import {expect} from '@playwright/test'

export async function loginToSmartERP(page) {
    await page.goto("https://smarterp-wgaw.onrender.com/");
    await page.waitForTimeout(2000);
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
}

export async function openPlayground(page) {
    await page.getByRole("link",{name:/Playground/}).click();
    await expect(page).toHaveURL(/playground\.html$/);
}

export async function openCustomers(page) {
    await page.getByRole("link",{name:/Customers/}).click();
    await expect(page).toHaveURL(/customers\.html$/);
}

export async function openDashboard(page) {
    await page.getByRole("link",{name:/Dashboard/}).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
}
