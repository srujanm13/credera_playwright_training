import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator("button[type='submit']").click();
  await page.waitForLoadState('networkidle');
});

test('Verify Login Successful Message', async ({ page }) => {
  await expect(page.getByText('Login Successful')).toBeVisible();
});

test('Verify Loading Symbol Disappears', async ({ page }) => {
  const loader = page.locator('.loading, .spinner, #loading');
  if (await loader.count() > 0) {
    await expect(loader.first()).toBeHidden();
  }
});

test('Validate JSON Data', async () => {
  const json = {
    id: 2767,
    name: 'keerthy',
    Email: 'test@omnicom',
    active: true,
    roles: ['QA', 'Admin'],
    date: '2026-07-30'
  };
  expect(typeof json.id).toBe('number');
  expect(typeof json.name).toBe('string');
  expect(json.Email).toContain('@');
  expect(typeof json.active).toBe('boolean');
  expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(json).toHaveProperty('id');
});

test('Verify Database Connected', async ({ page }) => {
  await expect(page.getByText('Database Connected')).toBeVisible();
});

test('Verify Customer Status Dropdown', async ({ page }) => {
  await page.locator('#menuCustomers').click();
const dropdown = page.locator('#statusFilter');
await expect(dropdown).toBeVisible();
const optionTexts = await dropdown.locator('option').allTextContents();
const cleanedOptions = optionTexts.map(option => option.trim());
  expect(cleanedOptions.length).toBeGreaterThan(0);
  expect(cleanedOptions).toEqual(
    expect.arrayContaining(['Active', 'Inactive'])
  );
});