// Scenario 1 : Handling Frames 
// 1.Launch the Browser 
// 2.Navigate to URL:  https://practice.expandtesting.com/iframe 
// 3.Locate and Switch to  External Frame and enter the below text in RTE : “This is the sample text inside a frame element” 
import { test, expect } from '@playwright/test';
test ('Handling Frames', async({ page }) => {
    await page.goto('https://practice.expandtesting.com/iframe', { waitUntil: 'domcontentloaded' });

    const allFrames = await page.frames();
    console.log("total frames are :" , allFrames.length) // just to get used to the method

    const frameLocator = page.frameLocator('#mce_0_ifr') // locating Iframe
    const editorBody = frameLocator.locator('body'); // navigating to the body content
    await editorBody.click();
    await editorBody.type('This is the sample text inside a frame element');
    await expect(editorBody).toContainText("This is the sample text inside a frame element");
})
//Scenario 2 : Handling multiple Tabs/Windows
test('Hyundai Test Drive Form and Blog Navigation', async ({ page, context }) => {
  
  // Step 1: Launch browser and navigate to Hyundai website
  await page.goto('https://www.hyundai.com/in/en');
  console.log('✓ Step 1: Navigated to Hyundai India website');
  
  // Step 2 & 3: Click Request a Test Drive link - opens new tab
  const newPagePromise = context.waitForEvent('page');
  await page.locator('span:has-text("Request a Test Drive")').click();
  const testDrivePage = await newPagePromise;
  await testDrivePage.waitForLoadState('domcontentloaded');
  console.log('✓ Step 2-3: New tab opened for Test Drive');
  
  // Step 4: Enter name in Test Drive form
  const nameInput = testDrivePage.getByPlaceholder('Name');
  await nameInput.fill('John Doe');
  console.log('✓ Step 4: Name "John Doe" entered in Test Drive form');
  
  // Step 5: Perform assertion on the text entered
  await expect(nameInput).toHaveValue('John Doe');
  console.log('✓ Step 5: Assertion passed - Name entered correctly');
  
  // Step 6: Switch to the main page
  await page.bringToFront();
  console.log('✓ Step 6: Switched back to main Hyundai page');
  
  // Step 7: Click on Blog Link
  await page.getByRole('link', { name: /Blog/i }).click();
  await page.waitForLoadState('domcontentloaded');
  console.log('✓ Step 7: Clicked on Blog link');
  
  // Step 8: Perform assertion on URL to check if it contains "blog"
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  
  expect(currentUrl.toLowerCase()).toContain('blog');
  console.log('✓ Step 8: Assertion passed - URL contains "blog"');
  
  console.log('✓ Test completed successfully');
});
