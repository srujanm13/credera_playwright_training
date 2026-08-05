import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#menuCustomers').click();
});

test('CSS Selectors', async ({ page }) => {
  const customerTable = page.locator('#customersTable');
  await expect(customerTable).toBeVisible();
  const toolbarButtons = page.locator('.toolbar button');
  const checkbox = page.locator('input[type="checkbox"]');
  await expect(toolbarButtons.first()).toBeVisible();
  await expect(checkbox.first()).toBeVisible();
});

test('XPath Selectors', async ({ page }) => {
  const customerTable = page.locator("//*[@id='customersTable']");
  await expect(customerTable).toBeVisible();
  const navLinks = page.locator("//nav//a");
  const addCustomerBtn = page.locator("//*[@id='addCustomerBtn']");
  await expect(navLinks.first()).toBeVisible();
  await expect(addCustomerBtn).toBeVisible();
});

test('Built-in Locators', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  const usernameField = page.locator('#username');
  await expect(usernameField).toBeVisible();
  await expect(page.getByPlaceholder('Enter username')).toBeVisible();
});

test('Locator Chaining', async ({ page }) => {
  const toolbar = page.locator('.toolbar');
  const addButton = toolbar.locator('button');
  await expect(addButton.first()).toBeVisible();
  const customerTable = page.locator('#customersTable');
  const rows = customerTable.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
});

test('Filter Locators', async ({ page }) => {
  const addCustomerBtn = page.getByRole('button').filter({ hasText: 'Add Customer' });
  await expect(addCustomerBtn).toBeVisible();
  const customerRow = page.locator('#customersTable tbody tr').filter({ hasText: 'Pooja' });
  await expect(customerRow).toBeVisible();
});

test('First and Relative Locators', async ({ page }) => {
  const customerTable = page.locator('#customersTable');
  const firstRow = customerTable.locator('tbody tr').first();
  await expect(firstRow).toBeVisible();
  const editButton = firstRow.locator('button');
  await expect(editButton.first()).toBeVisible();
});