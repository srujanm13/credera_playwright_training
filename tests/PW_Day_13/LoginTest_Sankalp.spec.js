import {test,expect} from "../../Fixtures/LoginFixture_Sankalp.js";

test.describe("SMARTERP Login Test",() => {
  test("Verify trainer Login",async ({ loginPage }) => {
        await loginPage.launchSmartERP();
        await loginPage.verifyLoginPageLoaded();
        await loginPage.loginAsTrainer();
        await loginPage.verifyLoginSuccessful();
    });
    test("Verify Admin Login",async ({ loginPage }) => {
        await loginPage.launchSmartERP();
        await loginPage.verifyLoginPageLoaded();
        await loginPage.loginAsAdmin();
        await loginPage.verifyLoginSuccessful();
    });
});