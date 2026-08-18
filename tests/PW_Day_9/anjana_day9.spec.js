import { test, expect } from "@playwright/test";

import { loginToSmartERP, openCustomers } from "../helpers/smarterp";

test("1. Multiple Wait Strategies", async ({ page }) => {
  await page.goto("https://smarterp-wgaw.onrender.com/");
  await page.locator("#username").waitFor({ state: "visible" });
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await expect(page.locator("#loginBtn")).toBeEnabled();
  await page.locator("#loginBtn").click();
  await page.waitForLoadState("networkidle");
  await page.waitForURL("**/dashboard.html", { timeout: 60000 });
  await expect(page).toHaveTitle("SmartERP Dashboard");
  const mainContent = page
    .locator("main, .dashboard-container, #content")
    .first();
  await mainContent.waitFor({ state: "visible" });
});

test("2. Verify Login Successful Message", async ({ page }) => {
  await page.goto("https://smarterp-wgaw.onrender.com/");
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await page.locator("#loginBtn").click();
  await expect(page.locator("text=Login successful")).toBeVisible();
});

test("3. Verify Loading Symbol Disappears", async ({ page }) => {
  await page.goto("https://smarterp-wgaw.onrender.com/");
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await page.locator("#loginBtn").click();
  await expect(page.locator("#loadingOverlay")).toBeHidden();
});

test("4. Validate JSON Assertions", async () => {
  const data = {
    id: 4567,
    name: "tester",
    Email: "test@omnicom",
    active: true,
    roles: ["QA", "Admin"],
    date: "2026-07-30",
  };
  expect(typeof data.id).toBe("number");
  expect(typeof data.name).toBe("string");
  expect(data.Email).toContain("@");
  expect(typeof data.active).toBe("boolean");
  expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(data).toHaveProperty("id");
});

test("5. Verify Database Connected Status", async ({ page }) => {
  await loginToSmartERP(page);
  const dataBaseConnected = page.locator(".status-list li").nth(0);
  await expect(dataBaseConnected).toBeVisible();
  await expect(dataBaseConnected).toContainText("✅ Database Connected");
});

test("6. Verify Customer Status Dropdown Values", async ({ page }) => {
  await loginToSmartERP(page);
  await page.locator("#menuCustomers").click();
  const options = (
    await page.locator("#statusFilter option").allTextContents()
  ).map((text) => text.trim());
  expect(options).toEqual(
    expect.arrayContaining(["All Status", "Active", "Inactive", "Suspended"]),
  );
});
