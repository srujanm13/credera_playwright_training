import { test, expect } from "../../Fixtures/LoginFixture_Vamsi.js";
test.describe("SMART ERP Login", () => {

    test("Verify Admin Login", async ({ loginPage }) => {
        await loginPage.launchApplication();
        await loginPage.verifyLoginPage();
        await loginPage.loginAsAdmin();
        await loginPage.verifySuccessfulLogin();
    });
    

    test("Verify Trainer Login", async ({ loginPage }) => {
        await loginPage.launchApplication(); 
        await loginPage.verifyLoginPage();
        await loginPage.loginAsTrainer();
        await loginPage.verifySuccessfulLogin();
    });
});
