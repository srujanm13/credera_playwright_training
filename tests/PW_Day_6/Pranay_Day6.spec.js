import { test, expect } from '@playwright/test';

//This Test will run before each test, it will log in and navigating to the Customers page
test.beforeEach(async ({ page }) => {
  // Login
  await page.goto('https://smarterp-wgaw.onrender.com/');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button:has-text("Login")').click();

  //await page.waitForLoadState('networkidle');

  // Navigating to Customers Page
  await page.locator('a:has-text("Customers")').click();
  await page.waitForURL('**/customers**');
});

//Grabing CSS Selectors inside a method and performing actions on them
test('CSS Selectors', async ({ page }) => {

  // Locating Customers table by id
  const customersTable = page.locator('#customersTable');
  await expect(customersTable).toBeVisible();

  // Locating all the buttons inside the toolbar
  const toolbarButtons = page.locator('.toolbar button');
  const buttonsCount = await toolbarButtons.count();
  console.log(`Found ${buttonsCount} buttons inside the toolbar.`);

  // Locating Checkbox input with a type
  const checkbox = page.locator('input[type="checkbox"]');
  console.log('NumberofCheckboxes:', await checkbox.count());

});

//Grabing XPath Selectors inside a method and performing actions on them
test('XPath Selectors', async ({ page }) => {

  // Locating Customers table by id
  const customerTable = page.locator("//table[@id='customersTable']");
  await expect(customerTable).toBeVisible();

  // Locating all the links inside the navigation bar
  const navigationLinks = page.locator("//nav//a");
  const navigationlinksCount = await navigationLinks.count();
  console.log(`Found ${navigationlinksCount} links inside the navigation bar.`);

  //Locating a specific button by its ID
  const refreshButton = page.locator("//button[@id='refreshBtn']");
  await expect(refreshButton).toBeVisible();
});

// Grabing Built-in Locators inside a method and performing actions on them
test('Built-in Locators', async ({ page }) => {

  // Finding the "Add Customer" button by role and name
  const addcustomerButton = page.getByRole('button', { name: '+ Add Customer' });
  await expect(addcustomerButton).toBeVisible();

  // Finding the search input field by placeholder
  const searchInput = page.getByPlaceholder('Search');
  await expect(searchInput).toBeVisible();

  // Finding the customer name by text
  const customerName = page.getByText('Rahul Sharma');
  await expect(customerName).toBeVisible();
});

// Utilising Locator Chaining Concepts inside a method and performing actions on them
test('Locator Chaining', async ({ page }) => {

  //Finding the toolbar (Parent Locator)
  const toolbar = page.locator('.toolbar');

  //Finding the buttons inside the toolbar (Child Locator)
  const allButtons = toolbar.locator('button');

  await expect(allButtons.first()).toBeVisible();

  //Printing the count of buttons inside the toolbar
  const allbuttonsCount = await allButtons.count();
  console.log(`Found ${allbuttonsCount} buttons inside the toolbar.`);

  //Finding the customers table (Parent Locator)
  const customerTable = page.locator('#customersTable');

  //Finding the rows inside the customers table (Child Locator)
  const rows = customerTable.locator('tbody tr');

  await expect(rows.first()).toBeVisible();

  //Printing the count of rows inside the customers table
  const rowsCount = await rows.count();
  console.log(`Found ${rowsCount} rows inside the customers table.`);
});

// Utilising Filter Locators Concepts inside a method and performing actions on them
test('Filter Locators', async ({ page }) => {

  // Finding the "Export CSV" button and filter by text
  const exportCSVBtn = page.getByRole('button').filter({ hasText: 'Export CSV' });
  await expect(exportCSVBtn).toBeVisible();

  //Find the customer row with the name "Sneha" and filter by text
  const customerRow = page.locator('#customersTable tbody tr').filter({ hasText: 'Sneha' });
  await expect(customerRow).toBeVisible();
});

// Utilising Relative Locators Concepts inside a method and performing actions on them
test('Relative Locators', async ({ page }) => {

  const customerTable = page.locator('#customersTable');

  // Locating First row in a table
  const firstRow = customerTable.locator('tbody tr').first();
  await expect(firstRow).toBeVisible();

  // Locating Relative locator inside first row
  const editButton = firstRow.locator('button');
  await expect(editButton.first()).toBeVisible();

});