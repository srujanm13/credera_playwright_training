const { test, expect } = require("../../Fixtures/LoginFixture_Keerthy.js");
const dotenv = require("dotenv");
dotenv.config({
    path: "env/.env.keerthy"
});

test("Login using CMD data", async ({ loginPage }) => {
    await loginPage.launchApplicationSmartErp();
    await loginPage.login(
        process.env.CMD_USERNAME,
        process.env.CMD_PASSWORD
    );
    await loginPage.verifyLoginSuccessful();
});

test("Login using ENV data", async ({ loginPage }) => {
    await loginPage.launchApplicationSmartErp();
    await loginPage.login(
        process.env.env_USERNAME,
        process.env.env_PASSWORD
    );
    await loginPage.verifyLoginSuccessful();
});