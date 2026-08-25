import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await  page.waitForTimeout(2000);
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#loginBtn').click();
  await  page.waitForTimeout(5000);
  console.log("Dashboard Page title is: " + await page.title());
  expect(await page.title()).toBe('SmartERP Dashboard');
  await page.locator('#menuCustomers').click();
});

test('CSS_Locators_Test', async ({ page }) => {
    await page.waitForTimeout(5000);
    const customerButton = page.locator('#menuCustomers');
    const allButtons = await page.locator('.toolbar button');
    const checkboxInput = page.locator('#selectAllCustomers');
    await page.waitForTimeout(5000);    await checkboxInput.click();
    console.log("Customer Table is visible: " + (await customerButton.isVisible()));
    console.log("All Buttons count: " + (await allButtons.count()));
    console.log("Checkbox Input is visible: " + (await checkboxInput.isVisible()));
});

test('XPath_Locators_Test', async ({ page }) => {
    await page.waitForTimeout(5000);
    const customerTable = page.locator('//table[@id="customersTable"]');
    const alllinks = await page.locator(('//nav/ul/li/a'));
    const button = page.locator('//input[@id="addCustomerBtn"]');
    console.log("Customer Table is visible: " + (await customerTable.isVisible()));
    console.log("All links count: " + (await alllinks.count()));
    console.log("Checkbox Input is visible: " + (await button.isVisible()));

});
  
test('Built-in_Locators_Test', async ({ page }) => {
    await page.waitForTimeout(5000);
    const refreshCTA = page.getByRole("button",{name:'Refresh'});
    await expect(refreshCTA).toBeVisible();
    console.log("Refresh CTA is visible: " + (await refreshCTA.isVisible()));
    const customerHeadingText = page.getByText("Customer Management");
    await expect(customerHeadingText).toBeVisible();
    console.log("Customer Heading Text is visible: " + (await customerHeadingText.isVisible()));
    
}); 

test("Locator Chaining_Test",async ({page})=>{
    await page.waitForTimeout(5000);
    const toolbar = page.locator('.toolbar'); 
    const buttonInToolbar = toolbar.locator('button');
    await expect(buttonInToolbar.first()).toBeVisible();
    const btncount = await buttonInToolbar.count();
    console.log(btncount);  
    const customerTable = page.locator("#customersTable");
    const customerTableBody = customerTable.locator("tbody")
    const customerRows = customerTableBody.locator("tr");
    await expect(customerRows.first()).toBeVisible();
    const rowscount = await customerRows.count();
    console.log("Total Rows count: " + rowscount);
})

test("Using_filters_Test", async({page})=>{
await page.waitForTimeout(5000);
const exportCTA  = await page.getByRole('button').filter({hasText:'Export CSV'});
await expect(exportCTA).toBeVisible();
//2. Write a locator that filters rows by text containing a specific name.
const name = page.locator('tbody tr:has-text("Rahul Sharma")');
console.log("Filtered Name locator: " + name);
// await expect(name).toHaveText('Rahul');
console.log("Name is visible: " + (await name.isVisible()));   

})

test("Relative_Locators_Test", async ({page})=>{
    await page.waitForTimeout(5000);
    const customerTable = page.locator("#customersTable");
    const firstDataRow = customerTable.locator("tbody tr").first();
    console.log("First Data Row is visible: " + (await firstDataRow.isVisible()));
    const toolbarbuttons = page.locator(".toolbar > button");
    console.log("Toolbar buttons count: " + (await toolbarbuttons.count()));
    console.log("Third Toolbar button text: " + await expect(toolbarbuttons.nth(2)).toHaveText('Import CSV'));       
  
}) 
