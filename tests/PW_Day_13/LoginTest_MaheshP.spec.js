import { test } from '../../Fixtures/LoginFixture_MaheshP.js';
import { expect } from '@playwright/test';

test.describe('SmartERP Login Test', () => {

  test('Verify successful login with Admin creds', async ({ loginPage }) => {

    await loginPage.loginAsAdmin();
    await loginPage.verifyDashboardLoaded();

    // Assertions validation
    await expect(loginPage.page).toHaveURL(/dashboard/);
    await expect(loginPage.logoutButton).toBeVisible();
    console.log("Logged into application successfully using Admin Credentials");
  });
  
  test('Verify successful login with Trainer creds', async ({ loginPage }) => {

    await loginPage.loginAsTrainer();
    await loginPage.verifyDashboardLoaded();

    // Assertions validation
    await expect(loginPage.page).toHaveURL(/dashboard/);
    await expect(loginPage.logoutButton).toBeVisible();
    console.log("Logged into application successfully using Trainer Credentials");
  });

  test("Verify invalid login scenario", async({ loginPage }) => {
  await loginPage.login("admin", "adnim123");
  console.log("Validated the invalid logged in scenario");
  await loginPage.verifyErrorMsg();
  
  })


});