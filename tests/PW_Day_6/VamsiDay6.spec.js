
    import { test, expect } from '@playwright/test'
    import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

    test ('CSS Selectors', async ({ page }) => {
    await loginToSmartERP(page);
    await page.waitForLoadState("networkidle");
    await page.locator("#menuCustomers").click();
    const table = page.locator("#customersTable");
    await expect(table).toBeVisible(); 
    await page.locator(".toolbar button").all();
    const checkbox = page.locator('input[type="checkbox"]#selectAllCustomers'); 
})

    test('Xpath Selectors', async ({ page }) => {
    await loginToSmartERP(page);
    await page.waitForLoadState('networkidle');
    const customersTable = page.locator("//table[@id='customersTable']"); 
    await page.locator("//nav/a").all();
    const addCustomerBtn = page.locator("//button[@id = 'addCustomerBtn']");
})

    test('Built-in Locators', async ({ page }) => {
    await loginToSmartERP(page);
    await page.waitForLoadState('networkidle');
    const addCustomerBtn = page.getByRole("button", { name: "+ Add Customer" });
    const customerHeadingText = page.getByText("Customer Management");
})

    test('Locator Chaining', async ({ page }) => {
    await loginToSmartERP(page);
    await openCustomers(page);
    const toolbar = page.locator(".toolbar");
    const addCustomerBtn = toolbar.locator("#addCustomerBtn");
    const customersTable = page.locator("#customersTable");
    const tableRows = customersTable.locator("tr");
})

    test('Locator Filtering', async ({ page }) => {
    await loginToSmartERP(page);
    await openCustomers(page);
    const addCustomerBtn = page.locator("button", { hasText: "+ Add Customer" });
    const rows = page.locator("tr", { hasText: "Rahul" });
})

    test('Relative Locators', async ({ page }) => {
    await loginToSmartERP(page);
    await openCustomers(page);
    const customerTable = page.locator("#customersTable");
    const firstRow = customerTable.locator("tbody tr").first();
    const toolbarButtons = page.locator(".toolbar button");
    const importCSVButton = toolbarButtons.nth(4);
    await expect(importCSVButton).toBeVisible();
  
})