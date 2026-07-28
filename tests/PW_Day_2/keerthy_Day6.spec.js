import { test, expect } from '@playwright/test';

//Test before each test, we will log in and navigate to the Customers page
test.beforeEach(async ({ page }) => {
  // Login
  await page.goto('https://smarterp-wgaw.onrender.com/');

  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();

  await page.waitForLoadState('networkidle');

  // Navigate to Customers
  await page.locator('#menuCustomers').click();
  await page.waitForLoadState('networkidle');
});

//CSS Selectors
test('CSS Selectors', async ({ page }) => {

  // 1. Customers table by id
  const customerTable = page.locator('#customersTable');
  await expect(customerTable).toBeVisible();

  // 2. Toolbar buttons
  const toolbarButtons = page.locator('.toolbar button');
  console.log('Toolbar Buttons:', await toolbarButtons.count());

  // 3. Checkbox by type
  const checkbox = page.locator('input[type="checkbox"]');
  console.log('Checkboxes:', await checkbox.count());

});

//XPath Selectors
test('XPath Selectors', async ({ page }) => {

  // 1. Customers table
  const customerTable = page.locator("//*[@id='customersTable']");
  await expect(customerTable).toBeVisible();

  // 2. Navigation links
  const navLinks = page.locator("//nav//a");
  console.log('Navigation Links:', await navLinks.count());

  // 3. Button by id
  const addCustomerBtn = page.locator("//*[@id='addCustomerBtn']");
  await expect(addCustomerBtn).toBeVisible();

});

// Built-in Locators
test('Built-in Locators', async ({ page }) => {
  // Find the "Add Customer" button by role and name
  const addButton = page.getByRole('button', { name: '+ Add Customer' });
  await expect(addButton).toBeVisible();

  // Find the username input field by label
  const usernameField = page.getByLabel('Username');
  const customersText = page.getByText('Customers');
  await expect(customersText.first()).toBeVisible();

});

// Locator Chaining
test('Locator Chaining', async ({ page }) => {
  //Find the toolbar (Parent Locator)
  const toolbar = page.locator('.toolbar');

  //Find the buttons inside the toolbar (Child Locator)
  const addButton = toolbar.locator('button');

  await expect(addButton.first()).toBeVisible();

  //Print the count of buttons inside the toolbar
  console.log('Toolbar Buttons:', await addButton.count());

  //Find the customers table (Parent Locator)
  const customerTable = page.locator('#customersTable');

  //Find the rows inside the customers table (Child Locator)
  const rows = customerTable.locator('tbody tr');

  await expect(rows.first()).toBeVisible();

  //Print the count of rows inside the customers table
  console.log('Customer Rows:', await rows.count());
});

// Filter Locators
test('Filter Locators', async ({ page }) => {
  // Find the "Add Customer" button and filter by text
  const addCustomerBtn = page.getByRole('button').filter({ hasText: 'Add Customer' });

  await expect(addCustomerBtn).toBeVisible();

  //Find the customer row with the name "Pooja" and filter by text
  const customerRow = page.locator('#customersTable tbody tr').filter({ hasText: 'Pooja' });
  await expect(customerRow).toBeVisible();
});

// First and Relative Locators
test('First and Relative Locators', async ({ page }) => {

  const customerTable = page.locator('#customersTable');

  // First row
  const firstRow = customerTable.locator('tbody tr').first();
  await expect(firstRow).toBeVisible();

  // Relative locator
  const editButton = firstRow.locator('button');
  await expect(editButton.first()).toBeVisible();

});