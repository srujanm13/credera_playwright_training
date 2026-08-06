import { test, expect } from '@playwright/test';
test ('Handling Frames', async({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.locator("//a[@id='playgroundMenu']").click();
  const frameLocator = await page.frameLocator('#demoFrame')
  const searchBox = frameLocator.getByRole('textbox', { name: 'Search customer...' });
  await searchBox.click()
  await searchBox.type('Rahul');
  await expect(searchBox).toHaveValue('Rahul');
})

test('Hyundai Test Drive Form and Blog Navigation', async ({ page, context }) => {
  await page.goto('https://www.hyundai.com/in/en');
  const newPagePromise = context.waitForEvent('page');
  await page.locator('span:has-text("Request a Test Drive")').click();
  const testDrivePage = await newPagePromise;
  await testDrivePage.waitForLoadState('domcontentloaded');
  const nameInput = testDrivePage.getByPlaceholder('Name');
  await nameInput.fill('John Doe');
  await expect(nameInput).toHaveValue('John Doe');
  await page.bringToFront();
  await page.getByRole('link', { name: /Blog/i }).click();
  await page.waitForLoadState('domcontentloaded');
  const currentUrl = page.url();
  expect(currentUrl.toLowerCase()).toContain('blog');
});
