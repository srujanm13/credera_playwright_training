import {test,expect} from "../Fixtures/LoginFixture_mohit.js";

test.describe("SMARTERP Login Module",() => {
    test("Verify Admin User Login",async ({ loginPage }) => {
        await loginPage.launchApplication();
        await loginPage.verifyLoginPageLoaded();
        await loginPage.loginAsAdmin();
        await loginPage.verifyLoginSuccessful();
    });
    test("Verify trainer User Login",async ({ loginPage }) => {
        await loginPage.launchApplication();
        await loginPage.verifyLoginPageLoaded();
        await loginPage.loginAsTrainer();
        await loginPage.verifyLoginSuccessful();
    });
});