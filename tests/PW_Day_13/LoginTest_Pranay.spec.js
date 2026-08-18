import { test } from '../../Fixtures/LoginFixture_Pranay';

test.describe('SMARTERP Login Test', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.launchApplicationSmartErp();
        await loginPage.verifyLoginPageLoaded();
    });

    test('Verify Trainer Login', async ({ loginPage }) => {
        await loginPage.loginAsTrainer();
        await loginPage.verifyLoginSuccessful();
    });

    test('Verify Admin Login', async ({ loginPage }) => {
        await loginPage.loginAsAdmin();
        await loginPage.verifyLoginSuccessful();
    });

    test('Verify Invalid Login', async ({ loginPage }) => {
        await loginPage.invalidlogin();
        await loginPage.verifyLoginFailed();
    });
});