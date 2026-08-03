
//CSS Selectors:

import { test, expect } from '@playwright/test'
import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

test ('CSS Selectors', async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    //Wait for page to load
    await page.waitForLoadState('networkidle');
    // Navigate to customers page
    await page.locator("#menuCustomers").click();

    //1. Write a CSS selector to locate the Customers table by id.
    const Table = page.locator("#customersTable");
    await 

    // 2. Write a CSS selector to locate all buttons inside the toolbar.
    await page.locator(".toolbar button").all();

// 3. Write a CSS selector to locate a checkbox input with a specific type.
    const checkbox = page.locator('input[type="checkbox"]#selectAllCustomers');
    
})


// Xpath Selectors:

test('Xpath Selectors', async ({ page }) => {
await page.goto('https://smarterp-wgaw.onrender.com/');

    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    //Wait for page to load
    await page.waitForLoadState('networkidle');

    // 1. Write an XPath expression to locate the Customers table using its id. 
    const customersTable = page.locator("//table[@id='customersTable']"); 
   

    // 2. Write an XPath expression to locate all links inside the navigation bar.
    await page.locator("//nav/a").all();

    /// 3. Write an XPath expression to locate a button by its id. 
    const addCustomerBtn = page.locator("//button[@id = 'addCustomerBtn']");
    await expect(addCustomerBtn).toBeVisible();
})

// Built-in Locators

test('Built-in Locators', async ({ page }) => {
await page.goto('https://smarterp-wgaw.onrender.com/');
     //2. Write a locator to find an input by its label.

    await page.getByLabel('Username').fill("admin");
    await page.getByLabel('Password').fill("admin123");
    await page.getByRole("button",{name:"Login"}).click();

     await page.waitForLoadState('networkidle');

    // 1. Write a locator to find a button by its role. 
    const addCustomerBtn = page.getByRole("button", { name: "+ Add Customer" });

    // 3. Write a locator to find text on the page.
    const customerHeadingText = page.getByText("Customer Management");
    
    
})

// Locator Chaining:

test('Locator Chaining', async ({ page }) => {
    await loginToSmartERP(page);
    await openCustomers(page);

    // 1. Create a parent locator for a toolbar and then chain a child button locator.
    const toolbar = page.locator(".toolbar");
    const addCustomerBtn = toolbar.locator("#addCustomerBtn");

    // 2. Write an example where a table locator is chained to find its rows.
    const customersTable = page.locator("#customersTable");
    const tableRows = customersTable.locator("tr");
})

//Filtering Locators:

test('Locator Filtering', async ({ page }) => {
     await loginToSmartERP(page);
    await openCustomers(page);

    // 1. Write a locator that filters buttons by text. 
    const addCustomerBtn = page.locator("button", { hasText: "+ Add Customer" });

    // 2. Write a locator that filters rows by text containing a specific name. 
    const rows = page.locator("tr", { hasText: "Rahul" });
})

// Relative Locators:

test('Relative Locators', async ({ page }) => {
     await loginToSmartERP(page);
    await openCustomers(page);

    // 1. Write an example of locating the first row in a table body.

    const customerTable = page.locator("#customersTable");
    const firstRow = customerTable.locator("tbody tr").first();

    // 2. Write an example of locating an element based on its relationship to another element.
    const toolbarButtons = page.locator(".toolbar button");
    const importCSVButton = toolbarButtons.nth(4); // Assuming the "Import CSV" button is the 5th button in the toolbar
    await expect(importCSVButton).toBeVisible();
})