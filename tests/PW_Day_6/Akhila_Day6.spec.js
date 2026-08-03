//Scenario: Navigate to https://smarterp-wgaw.onrender.com/ and login with credentials(admin/admin123) then navigate to customers page then
//1. Write a CSS selector to locate the Customers table by id. 
//2. Write a CSS selector to locate all buttons inside the toolbar.
//3. Write a CSS selector to locate a checkbox input with a specific type.
import { test, expect } from '@playwright/test';
test('CSS Selector Practice', async ({ page }) => {

    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Click Customers menu
    await page.getByRole('link', { name: 'Customers' }).click();

    // OR
    // await page.locator('#menuCustomers').click();

    // CSS Selectors
    const customersTable = page.locator('#customersTable');
    const toolbarButtons = page.locator('.toolbar button');
    const checkbox = page.locator('input[type="checkbox"]');
});



//Scenario: Navigate to https://smarterp-wgaw.onrender.com/ and login with credentials(admin/admin123) then navigate to customers page then 
//1. Write an XPath expression to locate the Customers table using its id.
//2. Write an XPath expression to locate all links inside the navigation bar. 
//3. 3. Write an XPath expression to locate a button by its id. 

test('XPath Selector Practice', async ({ page }) => {

    // Navigate to application
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Navigate to Customers page
    await page.getByRole('link', { name: 'Customers' }).click();

    // 1. XPath expression to locate the Customers table using its id
    const customersTable = page.locator('//table[@id="customersTable"]');

    // 2. XPath expression to locate all links inside the navigation bar
    const navLinks = page.locator('//nav//a');

    // 3. XPath expression to locate a button by its id
    const addCustomerButton = page.locator('//button[@id="addCustomerBtn"]');

    // Example validations
    await expect(customersTable).toBeVisible();
    console.log(await navLinks.count());
    await expect(addCustomerButton).toBeVisible();
});

//Scenario: Navigate to https://smarterp-wgaw.onrender.com/ and login with credentials(admin/admin123) then navigate to customers page then 
// 1. Write a locator to find a button by its role. 
//2. Write a locator to find an input by its label. 
//3. Write a locator to find text on the page.  
test('Playwright Built-in Locators Practice', async ({ page }) => {

    // Navigate to application
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Customers page
    await page.getByRole('link', { name: 'Customers' }).click();

    // 1. Locate a button by its role
    const exportButton = page.getByRole('button', { name: 'Export Customers' });

    // 2. Locate an input by its label
    const customerNameInput = page.getByLabel('Customer Name');

    // 3. Locate text on the page
    const recentCustomersText = page.getByText('Recent Customers');

    // Validations

   //wait expect(exportButton).toBeVisible();
   //wait expect(customerNameInput).toBeVisible();
   //wait expect(recentCustomersText).toBeVisible();
});

//Scenario: Navigate to https://smarterp-wgaw.onrender.com/ and login with credentials(admin/admin123) then navigate to customers page then 
//1Create a parent locator for a toolbar and then chain a child button locator.
//2. Write an example where a table locator is chained to find its rows. 

test('Locator Chaining Practice', async ({ page }) => {

    // Navigate to application
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Navigate to Customers page
    await page.getByRole('link', { name: 'Customers' }).click();

    // 1. Parent locator for toolbar and chain child button locator
    const toolbar = page.locator('.toolbar');
    const exportButton = toolbar.getByRole('button', { name: 'Export Customers' });

    // 2. Table locator chained to find its rows
    const customersTable = page.locator('#customersTable');
    const tableRows = customersTable.locator('tbody tr');

    // Example validations
   //wait expect(exportButton).toBeVisible();
    console.log("Total Rows:", await tableRows.count());
});

//Scenario: Navigate to https://smarterp-wgaw.onrender.com/ and login with credentials(admin/admin123) then navigate to customers page then 
//1. Write a locator that filters buttons by text. 
//2. Write a locator that filters rows by text containing a specific name. 
test('Filter Locators Practice', async ({ page }) => {

    // Navigate to application
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Navigate to Customers page
    await page.getByRole('link', { name: 'Customers' }).click();

    // 1. Filter buttons by text
    const exportButton = page.locator('button').filter({ hasText: 'Export Customers' });

    // 2. Filter table rows containing a specific customer name
    const customerRow = page.locator('tbody tr').filter({ hasText: 'John Doe' });

    // Validations
   //wait expect(exportButton).toBeVisible();
   //wait expect(customerRow).toBeVisible();
});

//1. Write an example of locating the first row in a table body. 
test('Locate the first row in a table body', async ({ page }) => {

    // Navigate to application
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Login
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Navigate to Customers page
    await page.getByRole('link', { name: 'Customers' }).click();

    // Locate the first row in the table body
    const firstRow = page.locator('table tbody tr').first();

    // Verify the first row is visible
    await expect(firstRow).toBeVisible();

    // Print the first row's text
    console.log(await firstRow.textContent());
});

//2. Write an example of locating an element based on its relationship to another element. 
test('Locate element based on relationship', async ({ page }) => {

    await page.goto('https://smarterp-wgaw.onrender.com/');
    // Login
    await page.locator('input[name="username"]').fill('admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // Navigate to Customers
    await page.getByRole('link', { name: 'Customers' }).click();

    // Locate the first row
    const firstRow = page.locator('tbody tr').first();

    await expect(firstRow).toBeVisible();

    // Locate Edit button inside the first row
    const editButton = firstRow.getByRole('button', { name: 'Edit' });

    await expect(editButton).toBeVisible();

    await editButton.click();
});