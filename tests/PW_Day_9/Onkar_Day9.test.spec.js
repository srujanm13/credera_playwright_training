import { test, expect } from '@playwright/test';
import { loginToSmartERP } from "../helpers/smarterp";

const BASE_URL = 'https://smarterp-wgaw.onrender.com/'; 
test('Assert Login Successful', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard.html', { timeout: 10000 });    
  const currentUrl = page.url();
  await expect(page).toHaveURL(/dashboard\.html$/);
  await loginToSmartERP(page);
  await page.locator('#menuCustomers').click();    
  await page.waitForLoadState('networkidle', { timeout: 15000 });   
  await page.waitForLoadState('domcontentloaded');
  const customersTable = page.locator('table'); 
  await expect(customersTable).toBeVisible();
  await loginToSmartERP(page);
  await page.locator('#menuCustomers').click();
  await page.waitForLoadState('domcontentloaded');
  const searchInput = page.getByPlaceholder('Search customer...'); // WAIT STRATEGY: Locator auto-waits  
  await searchInput.fill('Rahul');
  await expect(searchInput).toHaveValue('Rahul');
})

test('Assertion Login successful',async({page})=>{
await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
await page.getByPlaceholder('Enter username').fill('admin');
await page.getByPlaceholder('Enter password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
const successMessage = page.getByText('Login Successful...', { exact: true });
await expect(successMessage).toBeVisible({ timeout: 5000 });
})

test('loading symbol assertion', async({page})=>{
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click({timeout: 1000});
  await page.waitForLoadState('load',{timeout: 1000});
  const loadingSpinner = page.locator('.spinner, .loader, [class*="loading"], [class*="spinner"]').first();
  await expect(loadingSpinner).not.toBeVisible();
})
 
test ('Database Assertion', async({page})=>{
await loginToSmartERP(page);
await expect(page).toHaveURL(/dashboard\.html$/);
const checkSymbol = await page.getByText('✅ Database Connected');
await expect(checkSymbol).toBeVisible();
})

test('Dropdown Assertion', async({page})=>{
await loginToSmartERP(page);
await expect(page).toHaveURL(/dashboard\.html$/);
await page.getByRole('link', { name: 'Customers' }).click();
await expect(page).toHaveURL(/customers\.html$/)
await page.waitForLoadState('networkidle', { timeout: 15000 });
const dropdown = page.getByRole('combobox').first();
await expect(dropdown).toBeVisible({ timeout: 10000 });
await dropdown.click();
const options = dropdown.locator('option');
const optionCount = await options.count();  
const expectedValues = ['All Status', 'Active', 'Inactive', 'Suspended'];
const foundValues = [];
for (let i = 0; i < optionCount; i++) {
    const optionText = await options.nth(i).textContent();
    const cleanText = optionText?.trim() || '';
    foundValues.push(cleanText);
  }
    
  expectedValues.forEach(expected => {
    const found = foundValues.some(val => 
      val.toLowerCase() === expected.toLowerCase()
    );
    expect(found).toBe(true);
  });
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
  
        expect(json).toHaveProperty('id');
  expect(json).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      Email: expect.stringContaining('@'),
      active: expect.any(Boolean)
    })
  );

  expect(json.date).toEqual(
    expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
  );
});