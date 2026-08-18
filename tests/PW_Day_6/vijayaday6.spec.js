import{test,expect} from '@playwright/test'
import { loginToSmartERP } from '../helpers/smarterp.js'

test("CSS Selectors", async ({page})=>{
    await loginToSmartERP(page);
    await page.locator("#menuCustomers").click();
    const customerTable = page.locator("#customersTable");
    await expect(customerTable).toBeVisible();
    const toolbarButtons = await page.locator('.toolbar button').count();
    expect(toolbarButtons).toBeGreaterThan(0);
    const selectAllCustomersCheckbox = page.locator('input[type="checkbox"]#selectAllCustomers');
    await expect(selectAllCustomersCheckbox).toBeVisible();
})

test("XPath Selectors", async ({page})=>{
    await loginToSmartERP(page);
    await page.locator("//a[@id='menuCustomers']").click();
    const customerTable = page.locator("//table[@id='customersTable']");
    await expect(customerTable).toBeVisible();
    const navLinks = await page.locator('//nav//a').count();
    expect(navLinks).toBeGreaterThan(0);
    const addCustomerBtn = page.locator("//button[@id='addCustomerBtn']");
    await expect(addCustomerBtn).toBeVisible();
})

test("Built-in Locators", async ({page})=>{
    await loginToSmartERP(page);
    await page.getByRole("link",{name:"Customers"}).click();
    const addCustomerBtn = page.getByRole("button",{name:'+ Add Customer'});
    await expect(addCustomerBtn).toBeVisible();
    const customerHeadingText = page.getByText("Customer Management");
    await expect(customerHeadingText).toBeVisible();
})

test("Locator Chaining",async ({page})=>{
    await loginToSmartERP(page);
    await page.locator("#menuCustomers").click();
    const toolbar = page.locator('.toolbar');
    const buttonInToolbar = toolbar.locator('button');
    await expect(buttonInToolbar.first()).toBeVisible();
    const btncount = await buttonInToolbar.count();
    console.log(btncount);
    const customerTable = page.locator("#customersTable");
    const customerTableBody = customerTable.locator("tbody")
    const customerRows = customerTableBody.locator("tr");
    await expect(customerRows.first()).toBeVisible();
    const rowCount = await customerRows.count();
    console.log(rowCount);
})

test("Filtering", async ({page})=>{
    await loginToSmartERP(page);
    await page.locator("#menuCustomers").click();
    const addCustomerBtn = page.getByRole("button").filter({hasText:'+ Add Customer'})
    await expect(addCustomerBtn).toBeVisible();
    const rowwithJohn = page.getByRole("row").filter({hasText:"John"});
    await expect(rowwithJohn).toBeVisible();
})

test("Relative Locators", async ({page})=>{
    await loginToSmartERP(page);
    await page.locator("#menuCustomers").click();
    const customerTable = page.locator("#customersTable");
    const firstDataRow = customerTable.locator("tbody tr").first();
    await expect(firstDataRow).toBeVisible();
    const toolbarbuttons = page.locator(".toolbar > button");
    await expect(toolbarbuttons.nth(2)).toHaveText("Import CSV");
})
