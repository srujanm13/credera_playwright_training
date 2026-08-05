import { test, expect } from '@playwright/test';

test('CSS selectors', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.locator('#customersTable')).toBeVisible();
  await expect(page.locator('.toolbar button').first()).toBeVisible();
  await expect(page.locator('input[type="checkbox"]')).toBeVisible();

});

test('Xpath', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.locator('//*[@id="customersTable"]')).toBeVisible();
  await expect(page.locator('//nav//a').first()).toBeVisible();
  await expect(page.locator('//*[@id="deleteSelectedBtn"]')).toBeVisible();

});


test('Built In Locators', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.getByRole('button').first()).toBeVisible();
  await expect(page.getByLabel('Rows per page')).toBeVisible();
  await expect(page.getByText('Export CSV')).toHaveText('Export CSV');

});

test('Locator Chaining', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.locator('.toolbar').locator('button#deleteSelectedBtn')).toBeVisible();
  await expect(page.locator('table').locator('tbody tr[data-id="1001"]')).toBeVisible();

});


test('Filtering', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.locator('button').filter({ hasText: 'Delete Selected' })).toBeVisible();
  await expect(page.locator('tbody tr').filter({ hasText: 'Rahul Sharma' })).toBeVisible();

});

test('Relative Locators', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await expect(page).toHaveTitle('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
  //basic assertions
  await expect(page.locator('tbody tr').first()).toBeVisible();
  await expect(page.locator('td:has-text("Rahul Sharma") + td')).toHaveText('rahul.sharma@smarterp.com');

});