import{test,expect} from '@playwright/test'

//Ilangovan_Day6.spec.js  
test('Locators using css',async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();

//1. Write a CSS selector to locate the Customers table by id.
const customertable=page.locator('#recentCustomersTable');
await expect(customertable).toBeVisible();

//Write a CSS selector to locate all buttons inside the toolbar.
const buttons =page.locator('.actions');

await expect(buttons).toBeEnabled();

//Write a CSS selector to locate a checkbox input with a specific type.

await page.locator('a#menuCustomers').click();
await page.locator('input[type="checkbox"]').check();

const checked=await page.locator('input[type="checkbox"]').isChecked();
console.log(checked);

})



test("Locators using xpath", async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('//input[@name="username"]').fill("admin");
await page.locator('//input[@name="password"]').fill("admin123");
await page.locator('//button[contains(text(),"Login")]').click();

//1. Write an XPath expression to locate the Customers table using its id.

const customertable=page.locator('//table[@id="recentCustomersTable"]');
await expect(customertable).toBeVisible();

//2. Write an XPath expression to locate all links inside the navigation bar.
const links = await page.locator('//div[@class="logo"]/following-sibling::nav/ul/li').count();
console.log(links);

//3. Write an XPath expression to locate a button by its id.


const xpathbutton =page.locator('//button[@id="logoutBtn"]');

await expect(xpathbutton).toBeEnabled();


})



test("Using builtin locators", async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.getByLabel('Username').fill("admin");
await page.getByLabel('Password').fill("admin123");
await page.getByRole('button',{name:'Login'}).click();

//1. Write a locator to find a button by its role.

const buttonstate=await page.getByRole('button',{name:'Add Customer'}).isEnabled;
console.log("button state: "+ buttonstate);

//2. Write a locator to find an input by its label.
await page.getByRole('link',{name:'Products'}).click();

await page.getByLabel('Barcode').fill("123321");
//3. Write a locator to find text on the page.
const text=await page.getByText('Product Management');
await expect(text).toBeVisible;
})


test("Using filters", async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.getByLabel('Username').fill("admin");
await page.getByLabel('Password').fill("admin123");
await page.getByRole('button',{name:'Login'}).click();

//1. Write a locator that filters buttons by text.

//Export Customers
const exbutton=await page.getByRole('button').filter({hasText:'Export Customers'});
await expect(exbutton).toBeEnabled();
//2. Write a locator that filters rows by text containing a specific name.
const name= page.locator('//table[@id="recentCustomersTable"]/tbody/tr/td[2]').filter({hasText:'Rahul'});
await expect(name).toHaveText('Rahul');

})

test("Using locator chaining", async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.getByLabel('Username').fill("admin");
await page.getByLabel('Password').fill("admin123");
await page.getByRole('button',{name:'Login'}).click();

//Create a parent locator for a toolbar and then chain a child button locator.

//div[@class="actions"]
const Quickactions= page.locator('//div[@class="actions"]');
const downloadbtn=Quickactions.locator('#downloadReportBtn');
await downloadbtn.click();

//Write an example where a table locator is chained to find its rows.
const table1=page.locator('//table[@id="recentCustomersTable"]/tbody');
const rows=table1.locator('tr');
await expect(rows).toHaveCount(5);




})


test("Using relative locators",async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.getByLabel('Username').fill("admin");
await page.getByLabel('Password').fill("admin123");
await page.getByRole('button',{name:'Login'}).click();

//1. Write an example of locating the first row in a table body.
const table2=page.locator('//table[@id="recentCustomersTable"]/tbody');
const firstrow=await table2.locator('tr').first();
console.log(await firstrow.textContent())


//2. Write an example of locating an element based on its relationship to another element.
const table3=page.locator('//table[@id="recentCustomersTable"]/tbody');
const thirdrow=table3.locator('tr').nth(2);
await expect(thirdrow).toContainText('John');

})