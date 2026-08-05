import { test, expect } from '@playwright/test';
test('CSS Selector Practice Customers table by id, toolbar buttons, and checkbox', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.locator('#menuCustomers').click();
    const customersTable = page.locator('#customersTable');
    const toolbarButtons = page.locator('.toolbar button');
    const checkbox = page.locator('input[type="checkbox"]');
    await context.close();
});

test('XPath Selector Practice Customers table by id, Navigation links, and button', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.locator('#menuCustomers').click();
    await expect(page).toHaveURL(/customers\.html$/);
    const customersTable = page.locator('//table[@id="customersTable"]');
    const navLinks = page.locator('//nav//a');
    const addCustomerButton = page.locator('//button[@id="addCustomerBtn"]');
    await expect(customersTable).toBeVisible();
    console.log('Navigation Links:', await navLinks.count());
    await expect(addCustomerButton).toBeVisible();
    await context.close();
});
  
test('Playwright Built-in Locators Practice to find a button, input label, and text', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    const exportButton = page.getByRole('button').filter({ hasText: 'Export Customers' });
    const customerNameInput = page.getByLabel('Customer Name');
    const recentCustomersText = page.getByText('Recent Customers');
    await context.close();
});

test('Locator Chaining Practice for a toolbar to find child elements', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Customers' }).click();
    const toolbar = page.locator('.toolbar');
    const exportButton = toolbar.getByRole('button', { name: 'Export Customers' });
    const customersTable = page.locator('#customersTable');
    const tableRows = customersTable.locator('tbody tr');
    console.log("Total Rows:", await tableRows.count());
    await context.close();
});
 
test('Filter Locators Practice for filtering buttons, filtering rows by text', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Customers' }).click();
    const exportButton = page.locator('button').filter({ hasText: 'Export Customers' });
    const customerRow = page.locator('tbody tr').filter({ hasText: 'John Doe' });
    await context.close();
});
 
test('Locate the first row in a table body', async ({ page, context }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Customers' }).click();
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toBeVisible();
    const rowText = await firstRow.textContent();
    console.log(rowText?.replace(/\s+/g, ' ').trim());
    await context.close();
});

test('Locate element based on relationship', async ({ page, context }) => {

    await page.goto('https://smarterp-wgaw.onrender.com/');
    await page.locator('input[name="username"]').fill('admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard\.html$/);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Customers' }).click();
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();
    const rowText = await firstRow.textContent();
    console.log(rowText?.replace(/\s+/g, ' ').trim());
    const editButton = firstRow.getByRole('button', { name: 'Edit' });
    await expect(editButton).toBeVisible();
    await editButton.click();
    await context.close();
});