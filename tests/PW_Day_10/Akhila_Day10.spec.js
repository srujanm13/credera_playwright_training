import {test, expect} from '@playwright/test';

test('Handling Frames', async ({ page }) => {
  await page.goto('https://www.sreenidhirajakrishnan.com/practice#section-11');
  const allframes = await page.frames();
  console.log("No. of frames: " + allframes.length);
  const textLocator = await page.frameLocator('#section-11 iframe').locator('#iframe-input');
  await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
  await textLocator.fill('This is the sample text inside a frame element');
  await page.waitForTimeout(5000);
  await expect(textLocator).toHaveValue('This is the sample text inside a frame element');
})


test('Handling Multiple Windows', async ({ page, context }) => {
await page.goto('https://www.hyundai.com/in/en');
await expect(page.locator('h1').first()).toContainText('Hyundai Cars');
const [newPage] = await Promise.all([
context.waitForEvent('page'),
page.getByLabel('testdrive').click()
]);

await newPage.waitForLoadState();
await expect(newPage).toHaveURL(/request-a-test-drive/);
const nameField = newPage.locator('#name');
await nameField.fill('Akhila');
await expect(nameField).toHaveValue('Akhila');
await newPage.close();
await page.bringToFront();

await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
await page.getByRole('link', { name: 'Blog' }).click();
await expect(page).toHaveURL(/blog/);
});