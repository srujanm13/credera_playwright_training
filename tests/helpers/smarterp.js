
import {expect} from '@playwright/test'

export async function loginToSmartERP(page) {
    await page.goto("https://smarterp-wgaw.onrender.com/");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await expect(page.locator("h1")).toHaveText("Dashboard");
}

export async function openPlayground(page) {
    await page.getByRole("link",{name:/Playground/}).click();
    await expect(page).toHaveURL(/playground\.html$/);
}

export async function openCustomers(page) {
    await page.getByRole("link",{name:/Customers/}).click();
    await expect(page).toHaveURL(/customers\.html$/);
}