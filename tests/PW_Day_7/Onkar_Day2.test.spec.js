import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
// })


//css selectors
test("css Selectors in playwright", async({page})=>{
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  
  // Login flow
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  
  // Navigate to Customers
  await page.locator('#menuCustomers').click();
  
  // page load
  await page.waitForURL('**/customers.html');
  
  //  Locate Customers table by id
  await expect(page.locator('table').first()).toBeVisible();
  
  //  Locate all buttons in toolbar
  const Buttons = await page.locator('.toolbar button').all();
  console.log("Total buttons are  "  + Buttons.length);
  
  // : Locate checkbox with id 
  await page.locator('table tbody input[type="checkbox"]').first().check();
});


//xpath selectors
test("xpath Selectors in playwright", async({page})=>{
await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });

await page.getByPlaceholder('Enter username').fill('admin');

await page.getByPlaceholder('Enter password').fill('admin123');

await page.getByRole('button', {name : 'Login'}).click(); // login flow

await page.locator('xpath=//*[@id="menuCustomers"]').click(); // naviagtion to customers page

await expect(page.locator('xpath=//table[@id="customersTable"]')).toBeVisible();// Write a xpath to locate the Customers table by id.

const links = await page.locator('xpath=//nav//a').all();// XPath to locate all links inside the navigation bar.

console.log("the no of links are " + links.length);

await page.locator("xpath = //*[@id='addCustomerBtn']").click(); //Write an XPath expression to locate a button by its id.
})


//General Locators in Playwright
test("General locators in playwright", async({page})=>{
await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
await page.getByPlaceholder('Enter username').fill('admin');
await page.getByPlaceholder('Enter password').fill('admin123');   // login flow
await page.getByRole('button', {name : 'Login'}).click(); //write a Locator to find button by its role

await page.locator('xpath=//*[@id="menuCustomers"]').click(); 

await page.getByLabel('Rows per page').selectOption('10'); //Write a locator to find an input by its label.

 await expect(page.getByRole('heading', { name: 'Customer Management' })).toBeVisible(); //Write a locator to find text on the page.
})  


//Locator Chaining
test("locator chaining in playwright", async({page})=>{
    await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });

    await page.getByPlaceholder('Enter username').fill('admin');
    
    await page.getByPlaceholder('Enter password').fill('admin123');
    
    await page.getByRole('button', {name : 'Login'}).click(); // login flow

     await page.locator('xpath=//*[@id="menuCustomers"]').click();
//Create a parent locator for a toolbar and then chain a child button locator.
     const toolbar = page.locator('.toolbar');
     
     const addButton = toolbar.locator('button:has-text("Add Customer")'); // chaining the locators

//Write an example where a table locator is chained to find its rows.
     const specificRow = page.locator('xpath=//table//tr[td[contains(text(), "Priya")]]');

     await specificRow.locator('button:has-text("Edit")').click();
})

//Relative Locator
test("Relative playwright", async({page})=>{
    await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });

    await page.getByPlaceholder('Enter username').fill('admin');
    
    await page.getByPlaceholder('Enter password').fill('admin123');
    
    await page.getByRole('button', {name : 'Login'}).click(); // login flow

    await page.locator('xpath=//*[@id="menuCustomers"]').click();
//Write an example of locating the first row in a table body. 
    const firstRow = page.locator('table tbody tr').first(); // 
//Write an example of locating an element based on its relationship to another element. 
    const editBtn = firstRow.locator('button:has-text("Edit")');
})