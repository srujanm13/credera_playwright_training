import{test,expect} from '@playwright/test'

test("CSS Selectors", async ({page})=>{
    //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await page.locator("#menuCustomers").click();
    //customer table
    const customerTable = page.locator("#customersTable");
    await expect(customerTable).toBeVisible();
    //all buttons
    await page.locator('.toolbar button').all();
    //checkbox using type
    const selectAllCustomersCheckbox = page.locator('input[type="checkbox"]#selectAllCustomers');
    await expect(selectAllCustomersCheckbox).toBeVisible();
})

test("XPath Selectors", async ({page})=>{
    //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    await page.locator("//input[@id='username']").fill("admin");
    await page.locator("//input[@id='password']").fill("admin123");
    await page.locator("//button[@id='loginBtn']").click();
    await page.locator("//a[@id='menuCustomers']").click();
    //customer table
    const customerTable = page.locator("//table[@id='customersTable']");
    await expect(customerTable).toBeVisible();
    //all links
    await page.locator('//nav//a').all();
    //button using id
    const addCustomerBtn = page.locator("//button[@id='addCustomerBtn']");
    await expect(addCustomerBtn).toBeVisible();
})

test("Built-in Locators", async ({page})=>{
    //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    //input by Label
    await page.getByLabel('Username').fill("admin");
    await page.getByLabel('Password').fill("admin123");
    await page.getByRole("button",{name:"Login"}).click();
    await page.getByRole("link",{name:"Customers"}).click();
    //button
    const addCustomerBtn = page.getByRole("button",{name:'+ Add Customer'});
    await expect(addCustomerBtn).toBeVisible();
    //text on page
    const customerHeadingText = page.getByText("Customer Management");
    await expect(customerHeadingText).toBeVisible();
})

test("Locator Chaining",async ({page})=>{
     //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await page.locator("#menuCustomers").click();
    //Toolbar
    const toolbar = page.locator('.toolbar'); 
    const buttonInToolbar = toolbar.locator('button');
    await expect(buttonInToolbar.first()).toBeVisible();
    const btncount = await buttonInToolbar.count();
    console.log(btncount);  
    //Table rows
    const customerTable = page.locator("#customersTable");
    const customerTableBody = customerTable.locator("tbody")
    const customerRows = customerTableBody.locator("tr");
    await expect(customerRows.first()).toBeVisible();
    const rowCount = await customerRows.count();
    console.log(rowCount);
})

test("Filtering", async ({page})=>{
    //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await page.locator("#menuCustomers").click();
    //button with filter
    const addCustomerBtn = page.getByRole("button").filter({hasText:'+ Add Customer'})
    await expect(addCustomerBtn).toBeVisible();
    //row with filter
    const rowwithJohn = page.getByRole("row").filter({hasText:"John"});
    await expect(rowwithJohn).toBeVisible();
})

test("Relative Locators", async ({page})=>{
     //login
    await page.goto("https://smarterp-wgaw.onrender.com/", {waitUntil:"domcontentloaded"});
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
    await page.locator("#menuCustomers").click();
    //firstrow
    const customerTable = page.locator("#customersTable");
    const firstDataRow = customerTable.locator("tbody tr").first();
    await expect(firstDataRow).toBeVisible();
    //toolbar buttons
    const toolbarbuttons = page.locator(".toolbar > button");
    await expect(toolbarbuttons.nth(2)).toHaveText("Import CSV");
})