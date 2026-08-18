import { test, expect } from '@playwright/test';

test('Interacting with Rich Text Editor inside Externaliframe', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/iframe', {
        waitUntil: 'domcontentloaded'
    });
    const iframe = page.frameLocator('iframe').first();
    const editor = iframe.locator('#tinymce');

    const expectedText = 'This is the sample text inside a frame element';

    await editor.clear();
    await editor.fill(expectedText);

    await expect(editor).toHaveText(expectedText);
});

test("Handling multiple Tabs/Windows ", async ({ page, context }) => {

    // Opening Hyundai homepage
  await page.goto('https://www.hyundai.com/in/en');

  // Listening for the new tab and then click "Request a Test Drive"
  const newTabPromise = context.waitForEvent('page');
  await page.getByText('Request a Test Drive').first().click();

  // Switching to the newly opened tab
  const newPage = await newTabPromise;

  // 4. Sending name in the Name field (NO SUBMISSION)
  const nameInput = newPage.getByPlaceholder(/name/i).first();
  await nameInput.fill('Test User');

  // Validating (Assert) the entered text value
  await expect(nameInput).toHaveValue('Test User');

  // Switching focus back to the main tab
  await page.bringToFront();

  // Clicking on "Blog" link
  await page.getByRole('link', { name: 'Blog' }).click();

  // Validating (Assert) the URL contains "blog"
  await expect(page).toHaveURL(/blog/i);
});