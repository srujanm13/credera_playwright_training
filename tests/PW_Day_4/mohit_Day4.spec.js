import { test, expect } from '@playwright/test';
import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

test('Multiple wait strategies', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
  // Auto waiting
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");

  // Explicit event waiting (navigation)
  await Promise.all([
    page.waitForURL('**/dashboard.html'),
    page.locator("#loginBtn").click()
  ]);

  // Web-first assertions
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Explicit state waiting
  const loader = page.locator("#loadingOverlay");
  if (await loader.count()>0) {
    await loader.waitFor({ state: 'hidden' });
  }
  await page.waitForLoadState('networkidle');

  // Hard wait (debugging only)
  await page.waitForTimeout(3000);
});

test("Login Successful Message", async ({page})=>{
  await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await page.locator("#loginBtn").click();
  expect(page.locator("#successMessage")).toBeVisible();
  await page.waitForTimeout(3000);
})

test("Loader symbol", async ({page})=>{
  await page.goto('https://smarterp-wgaw.onrender.com/', {waitUntil: 'domcontentloaded'});
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await page.locator("#loginBtn").click();
  const loader = page.locator("#loadingOverlay");
  if(await loader.count()>0){
    await loader.waitFor({state:'hidden'})
  }
})

test('Validate JSON using asymmetric matchers', async () => {
  const json = {
    "id": 4567,
    "name": 'tester',
    "Email": 'test@omnicom',
    "active": true,
    "roles": ['QA', 'Admin'],
    "date": '2026-07-30'
  };

  // Validate id field exists
  expect(json).toHaveProperty('id');

  // Validate fields using asymmetric matchers
  expect(json).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      Email: expect.stringContaining('@'),
      active: expect.any(Boolean)
    })
  );

  // Validate date format YYYY-MM-DD
  expect(json.date).toEqual(
    expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
  );
});

test("Database Green check verification", async ({page})=>{
    await loginToSmartERP(page);
    const dbStatus = page.locator('.status-list li').nth(0);
    await expect(dbStatus).toHaveText(/✅\s*Database Connected/);
})

test("Dropdown Values", async ({page})=>{
    const values = [ 'All Status', 'Active', 'Inactive', 'Suspended' ];
    await loginToSmartERP(page);
    await openCustomers(page);
    const statusDropdown = (await page.locator('#statusFilter option').allInnerTexts()).map(text => text.trim());
    expect(statusDropdown).toEqual(
        expect.arrayContaining(values)
    )
})