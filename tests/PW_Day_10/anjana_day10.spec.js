import { test, expect } from "@playwright/test";

test("Handling Frames", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/iframe", {
    waitUntil: "domcontentloaded",
  });
  const frame = page.frameLocator("#mce_0_ifr");
  const editor = frame.locator("#tinymce");
  await editor.clear();
  const expectedText = "This is the sample text inside a frame element";
  await editor.fill(expectedText);
  await expect(editor).toHaveText(expectedText);
});

test.only("Handling Multiple Tabs", async ({ page, context }) => {
  await page.goto("https://www.hyundai.com/in/en", {
    waitUntil: "domcontentloaded",
  });
   // Open new tab
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator('a[aria-label="testdrive"]').click(),
  ]);

  // Enter name only 
  const nameField = newPage.locator('input[placeholder="Name"]');
  const expectedName = "John Doe";
  await nameField.fill(expectedName);
  await expect(nameField).toHaveValue(expectedName);

  // Switch back to main page
  await page.bringToFront();

  // Click Blog
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/blog/);
});