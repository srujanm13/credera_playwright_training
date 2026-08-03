import { test, expect } from "@playwright/test";

test("Scenario 2", async ({ page, context }) => {

    // Navigate to Hyundai home page
        await page.goto("https://www.hyundai.com/in/en", { waitUntil: "domcontentloaded" });

    // Verify Home page
        await expect(page.locator("h1").first()).toContainText("Hyundai Cars");

    // Click on "Request a Test Drive" and wait for new tab
        //await testDrive.scrollIntoViewIfNeeded();
        const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByLabel("testdrive").click()]);

    // Verify new tab URL
        await expect(newPage).toHaveURL(/request-a-test-drive/);
        await newPage.waitForLoadState("domcontentloaded"); // Wait for the new tab to load completely
        await expect(newPage).toHaveURL(/request-a-test-drive/); // Verify new tab URL contains "request-a-test-drive"

    // Enter Name in new tab
        const nameField = newPage.locator("#name");
        await nameField.fill("Vamsi Krishna");
        console.log("Entered Name:", await nameField.inputValue());
        await expect(nameField).toHaveValue("Vamsi Krishna");

    // Go back to Home page
        await newPage.close(); // Close the new tab
        await page.bringToFront(); // Bring the original page to the front

    // Click Blog
        await page.getByRole("link", { name: "Blog" }).click();

    // Verify Blog page
        await expect(page).toHaveURL(/blog/);

    });