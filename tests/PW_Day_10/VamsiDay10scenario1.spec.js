
import { test, expect } from "@playwright/test";

test("Scenario 1", async ({ page }) => {

  // Navigate to the page
  await page.goto("https://practice.expandtesting.com/iframe");

  // Switch to the iframe
  const textField = page.frameLocator("#mce_0_ifr").locator("#tinymce"); 

  // Enter text
  const outputText = "This is the sample text inside a frame element";
  await textField.fill(outputText);
  console.log("Entered Text:", outputText);

  // Assertion
  await expect(textField).toHaveText(outputText);
});