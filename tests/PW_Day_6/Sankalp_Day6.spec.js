const { test, expect } = require('@playwright/test');

test.describe('SmartERP - Locator Strategies Practice', () => {

  // Setup: Navigate and login before each test, then navigate to the customers page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    
    // Login
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: /login/i }).click();
    
    // Navigate to customers page
    await page.getByRole('link', { name: 'Customers' }).click();
  });

  test('1. XPath Locators Test', async ({ page }) => {
    // Locate the customers table using XPath ID
    const customersTable = page.locator("//*[@id='customersTable']");
    const navLinks = page.locator("//nav//a");
    
    await expect(customersTable).toBeVisible();
    await expect(navLinks.first()).toBeVisible();
  });

  test('2. Built-in Locators Test', async ({ page }) => {
    await page.waitForTimeout(5000);
    const customerTable = page.locator('//table[@id="customersTable"]');
    const alllinks = await page.locator(('//nav/ul/li/a'));
    const button = page.locator('//input[@id="addCustomerBtn"]');
    console.log("Customer Table is visible: " + (await customerTable.isVisible()));
    console.log("All links count: " + (await alllinks.count()));
    console.log("Checkbox Input is visible: " + (await button.isVisible()));

});

  test('3. Locator Chaining Test', async ({ page }) => {
    const toolbar = page.locator('.toolbar');
    const buttonInToolbar = toolbar.locator('button');

    const customerTable = page.locator('#customersTable');
    const customerRows = customerTable.locator('tr');

    await expect(customerTable).toBeVisible();
  });

  test('4. Filtering Test', async ({ page }) => {
    const addCustomerButton = page.getByRole('button').filter({ hasText: '+ Add Customer' });
    const rowWithPriya = page.getByRole('row').filter({ hasText: 'Priya' });

    // Verifying element existence with filter criteria
    await expect(addCustomerButton).toBeVisible();
  });

  test('5. Relative & Chained Methods Test', async ({ page }) => {
    const customerTable = page.locator('#customersTable');
    const firstDataRow = customerTable.locator('tbody tr').first();
    const tableHeader = customerTable.locator('thead th').first();

    await expect(customerTable).toBeVisible();
  });

});