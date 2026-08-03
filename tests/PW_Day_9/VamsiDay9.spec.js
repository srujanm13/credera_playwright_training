
import { test, expect } from '@playwright/test';
import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

test('Wait Strategies & JSON Validation', async ({ page }) => {

  await page.goto("https://smarterp-wgaw.onrender.com/", {
    waitUntil: "load"
});
    //Login
    await loginToSmartERP(page); // Login to SmartERP application

// 2. Loader disappears
const loader = page.locator(".loading"); // Loader element locator
await expect(loader).toBeHidden();

// Dashboard
await expect(page.locator("h2").first()).toHaveText("SmartERP"); // Dashboard logo and title showing

console.log("Login successfully and wait strategies executed.");

    // 3. JSON Validation

    const json = {
        id: 4567,         // id field is a number
        name: "tester",    // name field is a string
        Email: "test@omnicom",  // Email field contains "@" symbol
        active: true,   // active field is a boolean
        roles: ["QA", "Admin"],    
        date: "2026-07-30"  // Date format: YYYY-MM-DD
    };

    // id
    expect(typeof json.id).toBe("number");

    // name
    expect(typeof json.name).toBe("string");

    // Email
    expect(json.Email).toContain("@");

    // Boolean
    expect(typeof json.active).toBe("boolean");

    // Date format
    expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // id field exists
    expect(json).toHaveProperty("id");


    // 4. Database Connected
await expect(page.getByText("✅ Database Connected")).toBeVisible();

    // 5. Customer Dropdown Values

    await openCustomers(page);
    const dropdown = page.locator("#statusFilter");
    const options = await dropdown.locator("option").allTextContents();
    const trimmedOptions = options.map(option => option.trim());  // Trim using to remove whitespaces from the options fields
    console.log(trimmedOptions);
});