import { test, expect } from '@playwright/test';

// Scenario 1: Handling Frames

test("Handling Frames ", async ({ page }) => {
    // 1.Launch the URL
    await page.goto("https://practice.expandtesting.com/iframe", { waitUntil: 'domcontentloaded' });
    // 2.Locate the frame and fill the text area
    const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
    // 3. Enter the sample text inside the Rich Text Editor
    const input = "This is the sample text";
    await editor.fill(input);
    // 4. Assert that the RTE contains the expected text    
    await expect(editor).toHaveText(input);
})

// Scenario 2: Handling Multiple Tabs/Windows

test("Handling multiple Tabs/Windows ", async ({ page, context }) => {

    test.setTimeout(50000);
    // 1. Launch the URL
    await page.goto("https://www.hyundai.com/in/en", { waitUntil: "domcontentloaded" });
    // 2.Locate the element that opens a new tab/window and click on it
    await expect(page.getByLabel("testdrive")).toBeVisible();
    // 3. Wait for the new tab/window to open and switch to it
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByLabel("testdrive").click()
    ])
    // 4. Wait for the new Test Drive page to load
    await newPage.waitForLoadState("domcontentloaded");
    const userName = "Keerthy Arvind"
    // 5. Locate the Name field and enter the name
    await newPage.locator("#name").fill(userName);
    // 6. Assert that the entered name is correct
    await expect(newPage.locator("#name")).toHaveValue(userName);
    // 7. Close the new tab/window and switch back to the original page
    await newPage.close();
    // 8. Assert that the original page is still open and visible
    await page.bringToFront();
    //Click on the Blog link to open a new tab/window
    await page.locator("//*[@class='dep1 investor-menu']//a[@href='/in/en/blog']").click();
    await expect(page).toHaveURL(/blog/);
})