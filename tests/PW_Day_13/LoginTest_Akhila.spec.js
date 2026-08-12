import { test, expect } from "../../Fixtures/LoginFixture_Akhila.js";

test("Admin Login", async ({ loginPage }) => {
    await loginPage.launchApplication();
    await loginPage.verifyLoginElements();
    await loginPage.ValidAdminLogin();
    await loginPage.verifySuccessfulLogin();
});

test("Invalid Login", async ({ loginPage }) => {
    await loginPage.launchApplication();
    await loginPage.verifyLoginElements();
    await loginPage.InvalidLogin();
});