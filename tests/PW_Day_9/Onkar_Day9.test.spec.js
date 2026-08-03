import { test, expect } from '@playwright/test';
import { loginToSmartERP } from "../helpers/smarterp";

const BASE_URL = 'https://smarterp-wgaw.onrender.com/';
//1. Create a test demonstrating multiple wait strategies 
test('Assert Login Successful', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  //auto waiting
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard.html', { timeout: 10000 });    // WAIT STRATEGY: Explicitly wait for URL to change
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  await expect(page).toHaveURL(/dashboard\.html$/);
  console.log('Assertion passed: URL matches pattern');
// Network Idle State
  console.log("****Network Idle State********")
  await loginToSmartERP(page);
  await page.locator('#menuCustomers').click();    // Navigate to Customers page
  await page.waitForLoadState('networkidle', { timeout: 15000 });  // WAIT STRATEGY: Wait for network to be idle 
  await page.waitForLoadState('domcontentloaded'); // Wait for the table to be visible
  const customersTable = page.locator('table'); // Verify customers table is visible
  await expect(customersTable).toBeVisible();
  console.log('Customers table is visible');
  //Locator Auto-wait - Action item
  console.log("********Locator Auto-wait - Action item*********")
  await loginToSmartERP(page);
  await page.locator('#menuCustomers').click();
  await page.waitForLoadState('domcontentloaded');
  
  const searchInput = page.getByPlaceholder('Search customer...'); // WAIT STRATEGY: Locator auto-waits  
  await searchInput.fill('Rahul');
  await expect(searchInput).toHaveValue('Rahul');
})

//2.Verify the display of login successful message upon providing valid credentials and clicking on login

test('Assertion Login successful',async({page})=>{
await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
await page.getByPlaceholder('Enter username').fill('admin');
await page.getByPlaceholder('Enter password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
const successMessage = page.getByText('Login Successful...', { exact: true });
await expect(successMessage).toBeVisible({ timeout: 5000 });
})

//3.Ensure loading symbols disappear upon successful login  
test ('loading symbol assertion', async({page})=>{
await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click({timeout: 1000});
await page.waitForLoadState('load',{timeout: 1000});
})

//4.Verify the “Database connected” is present with a green check in System status 
test ('Database Assertion', async({page})=>{
await loginToSmartERP(page);
await expect(page).toHaveURL(/dashboard\.html$/);
const checkSymbol = await page.getByText('✅ Database Connected');
await expect(checkSymbol).toBeVisible();
})

//5.Ensure that the dropdown in customer's page should contain values – Active, Inactive,AllStatus,Suspended

test('Dropdown Assertion', async({page})=>{
await loginToSmartERP(page);
await expect(page).toHaveURL(/dashboard\.html$/);
await page.getByRole('link', { name: 'Customers' }).click();
await expect(page).toHaveURL(/customers\.html$/)
await page.waitForLoadState('networkidle', { timeout: 15000 });
const dropdown = page.getByRole('combobox').first();
await expect(dropdown).toBeVisible({ timeout: 10000 });
await dropdown.click();
// Get options
  const options = dropdown.locator('option');
  const optionCount = await options.count();
  
  const expectedValues = ['All Status', 'Active', 'Inactive', 'Suspended'];
  const foundValues = [];
  
  // Iterate through each option
  for (let i = 0; i < optionCount; i++) {
    const optionText = await options.nth(i).textContent();
    console.log(` Option ${i + 1}: "${optionText}"`);
    const cleanText = optionText?.trim() || '';
    foundValues.push(cleanText);
    console.log(`Option ${i + 1}: "${cleanText}"`);
  }
    
   // Verify all expected values are present
  expectedValues.forEach(expected => {
    const found = foundValues.some(val => 
      val.toLowerCase() === expected.toLowerCase()
    );
    expect(found).toBe(true);
  });
  console.log('PASS: All required dropdown values present');
  })
  test('validate json using asymmetric matechers', async()=>{
      const json = {
         "id": 4567,
         "name": 'tester',
         "Email": 'test@omnicom',
         "active": true,
         "roles": ['QA', 'Admin'],
         "date": '2026-07-30'
  };
  // Validate id field exists
        expect(json).toHaveProperty('id');
// Validate fields using asymmetric matchers
  expect(json).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      Email: expect.stringContaining('@'),
      active: expect.any(Boolean)
    })
  );

  // Validate date format YYYY-MM-DD
  expect(json.date).toEqual(
    expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
  );
});
