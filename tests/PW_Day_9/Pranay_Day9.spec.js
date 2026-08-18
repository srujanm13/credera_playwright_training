import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Logging into SmartERP application
  await page.goto('https://smarterp-wgaw.onrender.com/');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button:has-text("Login")').click();
});

test('Verifying Successful Login Message', async ({ page }) => {
  await expect(page.getByText('Login Successful')).toBeVisible();
});

test('Ensuring Loading Symbol Disappears', async ({ page }) => {
  const loader = page.locator('.loading, .spinner, #loading');
  if (await loader.count() > 0) {
    await expect(loader.first()).toBeHidden();
  }
});

test('Validating JSON Data', async () => {
  const json = {
    id: 5487,
    name: 'Pranay',
    Email: 'test@omnicom',
    active: true,
    roles: ['QA', 'Admin'],
    date: '2026-07-30'
  };

  //id is a number
  expect(typeof json.id).toBe('number');

  //Name is any string
  expect(typeof json.name).toBe('string');

  //Email contains '@'
  expect(json.Email).toContain('@');

  //Active is Boolean
  expect(typeof json.active).toBe('boolean');

  //Validate date format is in YYYY-MM-DD
  expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

  //Validate whether the id field is present in JSON or not
  expect(json).toHaveProperty('id');
});

test('Verifying Database Connection', async ({ page }) => {
  await expect(page.getByText('Database Connected')).toBeVisible();
});

test('Verify Customer Status Dropdown', async ({ page }) => {
  await page.locator('#menuCustomers').click();
const dropdownField = page.locator('#statusFilter');
await expect(dropdownField).toBeVisible();

const availableOptions = await dropdownField.locator('option').allTextContents();
const trimmingOptions = availableOptions.map(option => option.trim());

  expect(trimmingOptions.length).toBeGreaterThan(0);
  expect(trimmingOptions).toEqual(
    expect.arrayContaining(['All Status', 'Active', 'Inactive', 'Suspended'])
  );
});