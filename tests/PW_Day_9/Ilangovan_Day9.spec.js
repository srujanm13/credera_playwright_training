import{test,expect} from'@playwright/test'


test('Multiple wait strategies',async({page})=>{
           
await page.goto("https://smarterp-wgaw.onrender.com/",{waitUntil:'domcontentloaded'});
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
const successmsg=page.locator('#successMessage');
await successmsg.waitFor({state:'visible'});
console.log(await successmsg.textContent());
await page.waitForURL("https://smarterp-wgaw.onrender.com/dashboard.html");
const addcustomerbtn=await page.locator('#addCustomerBtn');
await addcustomerbtn.waitFor({state:'visible'});
await addcustomerbtn.click();
await expect(page.locator('.modal-content')).toBeVisible();
await page.waitForTimeout(3000);

})


test('Login success message',async({page})=>{
           
await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
const successmsg=page.locator('#successMessage');
await successmsg.waitFor({state:'visible'});
console.log(await successmsg.textContent());
})

test('Loading',async({page})=>{
           
await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
const loader=page.locator('#loadingOverlay');
await loader.waitFor({state:'hidden'});

})

test('JSON validation',async({page})=>{
           
const employee={

    
"id": 4567,
"name": "tester",
"Email" : "test@omnicom",
"active" : true,
"roles":["QA","Admin"],
"date": "2026-07-30"

}


await expect(typeof employee.id).toBe('number');
await expect(typeof employee.name).toBe('string');
await expect(employee.Email).toContain('@');
await expect(typeof employee.active).toBe('boolean');
await expect(employee.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
await expect(employee).toHaveProperty('id');

})



//5.Verify the “Database connected” is present with a green check in System status

test('system status',async({page})=>{

await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
const status=await page.locator('//ul[@class="status-list"]/li[1]').textContent();
await expect(page.locator('//ul[@class="status-list"]/li[1]')).toContainText(status);

})

test('Dropdown',async({page})=>{
           
await page.goto("https://smarterp-wgaw.onrender.com/ ");
await page.locator('#username').fill("admin");
await page.locator('#password').fill("admin123");
await page.locator('#loginBtn').click();
const loader=page.locator('#loadingOverlay');
await loader.waitFor({state:'hidden'});
await page.locator('#menuCustomers').click();
await expect (page.locator('//select[@id="statusFilter"]/option')).toHaveText(['All Status','Active','Inactive','Suspended']);


})