import { test, expect } from '@playwright/test';
import { loginToSmartERP, openDashboard, openPlayground, openCustomers } from '../helpers/smarterp';  

test('Login_Test', async ({ page }) => {

  // 1. Navigate to SmartERP
  await loginToSmartERP(page);
  console.log('Login successful, navigated to SmartERP dashboard');

});
  
  test('Verify Login Successful Message', async ({ page }) => {
  await loginToSmartERP(page);
  const successMessage = page.locator('#successMessage');
  await successMessage.waitFor({ state: 'visible' });
  await expect(successMessage).toBeVisible(); 
  console.log('Login successful message:' + await successMessage.textContent());
  await page.waitForTimeout(3000);
  
});

test('Verify Loading Symbol Disappears', async ({ page }) => {
  await loginToSmartERP(page);
  const loader = page.locator('.spinner');
  if (await loader.count() > 0) 
    {await expect(loader.first()).toBeHidden();
      console.log('Loading symbol got disappeared successfully');
    }

});


test('Validate JSON fields', async ({page}) => {

  const data = {
    id: 4567,
    name: 'tester',
    Email: 'test@omnicom',
    active: true,
    roles: ['QA', 'Admin'],
    date: '2026-07-30'
  };

  // 1. Validate ID field is present
  expect(data).toHaveProperty('id');

  // 2. Validate ID is a number
  expect(typeof data.id).toBe('number');

  // 3. Validate Name is a string
  expect(typeof data.name).toBe('string');

  // 4. Validate Email contains '@'
  expect(data.Email).toContain('@');

  // 5. Validate Active is Boolean
  expect(typeof data.active).toBe('boolean');

  // 6. Validate Date format YYYY-MM-DD using Regex
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  expect(data.date).toMatch(dateRegex);

  console.log('ID:', data.id);
  console.log('Name:', data.name);
  console.log('Email:', data.Email);
  console.log('Active:', data.active);
  console.log('Date:', data.date);

  console.log('All JSON validations passed successfully');
});


test('Verify_Database_Connected_System_Status_Test', async ({ page }) => {

  await loginToSmartERP(page);
  await openDashboard(page);
  // Locate System Status section
   const databaseStatus = page.locator('li', {hasText: 'Database Connected'});

    // Verify status is visible
    await expect(databaseStatus).toBeVisible();

    // Verify green check mark is present
    await expect(databaseStatus).toContainText('✅');

  console.log('Database connected status is displayed with green check');
});


test('Verify Customer Status dropdown values', async ({ page }) => {

    await loginToSmartERP(page);
    await openCustomers(page);

    const statusDropdown = page.locator('#statusFilter');

    // Verify all required values are present
    await expect(statusDropdown).toContainText('All Status');
    await expect(statusDropdown).toContainText('Active');
    await expect(statusDropdown).toContainText('Inactive');
    await expect(statusDropdown).toContainText('Suspended');

    console.log('All required status values are present in the dropdown');
});