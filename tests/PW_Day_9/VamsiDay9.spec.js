
import { test, expect } from '@playwright/test';
import { loginToSmartERP, openCustomers } from '../helpers/smarterp';

test('Wait Strategies & JSON Validation', async ({ page, context }) => {

    await page.goto("https://smarterp-wgaw.onrender.com/", {  waitUntil: "load"
});
    await loginToSmartERP(page); 
    const loader = page.locator(".loading");
    await expect(loader).toBeHidden();
    await expect(page.locator("h2").first()).toHaveText("SmartERP");
    const json = {
        id: 4567,         
        name: "tester",    
        Email: "test@omnicom",  
        active: true,   
        roles: ["QA", "Admin"],    
        date: "2026-07-30"  
    };

    expect(typeof json.id).toBe("number");
    expect(typeof json.name).toBe("string");
    expect(json.Email).toContain("@");
    expect(typeof json.active).toBe("boolean");
    expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(json).toHaveProperty("id");
    await expect(page.getByText("✅ Database Connected")).toBeVisible();
    await openCustomers(page);
    const dropdown = page.locator("#statusFilter");
    const options = await dropdown.locator("option").allTextContents();
    const trimmedOptions = options.map(option => option.trim()); 
    await context.close();

});