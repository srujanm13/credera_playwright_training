import { test, expect } from '@playwright/test';
test("css Selectors in playwright", async({page})=>{
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#menuCustomers').click();
  await page.waitForURL('**/customers.html');
  await expect(page.locator('table').first()).toBeVisible();
  const Buttons = await page.locator('.toolbar button').all();
  await page.locator('table tbody input[type="checkbox"]').first().check();
});

test("xpath Selectors in playwright", async({page})=>{
await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
await page.getByPlaceholder('Enter username').fill('admin');
await page.getByPlaceholder('Enter password').fill('admin123');
await page.getByRole('button', {name : 'Login'}).click();
await page.locator('xpath=//*[@id="menuCustomers"]').click(); 
await expect(page.locator('xpath=//table[@id="customersTable"]')).toBeVisible();
const links = await page.locator('xpath=//nav//a').all();
await page.locator("xpath = //*[@id='addCustomerBtn']").click(); 
})


test("General locators in playwright", async({page})=>{
await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
await page.getByPlaceholder('Enter username').fill('admin');
await page.getByPlaceholder('Enter password').fill('admin123');   
await page.getByRole('button', {name : 'Login'}).click(); 
await page.locator('xpath=//*[@id="menuCustomers"]').click();
await page.getByLabel('Rows per page').selectOption('10');
await expect(page.getByRole('heading', { name: 'Customer Management' })).toBeVisible(); 
})  

test("locator chaining in playwright", async({page})=>{
    await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder('Enter username').fill('admin');
    await page.getByPlaceholder('Enter password').fill('admin123');
    await page.getByRole('button', {name : 'Login'}).click();
    await page.locator('xpath=//*[@id="menuCustomers"]').click();
    const toolbar = page.locator('.toolbar');
    const addButton = toolbar.locator('button:has-text("Add Customer")'); 
    const specificRow = page.locator('xpath=//table//tr[td[contains(text(), "Priya")]]');
    await specificRow.locator('button:has-text("Edit")').click();
})

test("Relative playwright", async({page})=>{
    await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder('Enter username').fill('admin');
    await page.getByPlaceholder('Enter password').fill('admin123');
    await page.getByRole('button', {name : 'Login'}).click();
    await page.locator('xpath=//*[@id="menuCustomers"]').click();
    const firstRow = page.locator('table tbody tr').first(); 
    const editBtn = firstRow.locator('button:has-text("Edit")');
})