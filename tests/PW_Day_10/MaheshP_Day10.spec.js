import { test, expect, chromium } from "@playwright/test";
import { loginToSmartERP, openPlayground, openCustomers, openDashboard } from "../helpers/smarterp";

test("Scenario - 1 - Handle Frame Test", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/iframe");

    // Handle the frame
    const frameSection = await page.getByText("External IFrame: TinyMCE Editor");
    await frameSection.scrollIntoViewIfNeeded();

    const frame = await page.frameLocator(".tox-edit-area__iframe");
    await frame.locator("#tinymce").clear();
    await frame.locator("#tinymce").fill("This is the sample text inside a frame element");
    await expect(frame.locator("#tinymce")).toHaveText("This is the sample text inside a frame element");

    console.log("Content inside the frame : " + await frame.locator("#tinymce").textContent());
    console.log("Scenario - 1 is completed");
});


test("Scenario - 2 - Handling multiple Tabs/Windows", async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const homepage = await context.newPage(); 
    await homepage.goto("https://www.hyundai.com/in/en", { waitUntil: "domcontentloaded" });
    const testDriveLink = await homepage.locator("//*[@class='drive']");
    await  expect(testDriveLink).toBeVisible(); 
    const pagePromise = context.waitForEvent('page');  
    await testDriveLink.click();
    console.log("Clicked on link and redirected to new tab");
    const newPage = await pagePromise; 
    const salutionTitle = newPage.locator("#salutation-label");
    await salutionTitle.scrollIntoViewIfNeeded();
    await newPage.waitForTimeout(5000) 
    await newPage.waitForLoadState("domcontentloaded");
    await expect(salutionTitle).toBeVisible();
    console.log(await salutionTitle.textContent());
    const name = newPage.locator('#name');
    const userName ="Mahesh Polisetty";
    await name.fill(userName);
    await expect(name).toHaveValue(userName);
    console.log("Name entered : "+ await name.inputValue());   
    const modelDropdown = newPage.locator('#car');
    await modelDropdown.first().selectOption('IONIQ 5');
    expect(await modelDropdown.first().textContent()).toContain('IONIQ 5');
    await newPage.close();
    homepage.bringToFront();
    console.log("Returned to first window:", await homepage.title() );
    console.log("Multiple Handling Test is passed");

});