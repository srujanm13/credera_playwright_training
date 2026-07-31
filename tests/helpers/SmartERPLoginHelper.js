import { expect } from '@playwright/test';

// Login Function
export async function loginToSmartERP(page) {

    await page.goto("https://smarterp-wgaw.onrender.com/");

    // Login
    await page.getByLabel("Username").fill("admin");
    await page.getByLabel("Password").fill("admin123");

    await page.getByRole("button", { name: "Login" }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/dashboard/);
}

// Open Customers Page
export async function openCustomersPage(page) {

    await page.getByRole("link", { name: "Customers" }).click();

    await expect(page).toHaveURL(/customers\.html/);
}

// Open Playground Page (for your previous assignment)
export async function openPlayground(page) {

    await page.getByRole("link", { name: "Playground" }).click();

    await expect(page).toHaveURL(/playground\.html/);
}