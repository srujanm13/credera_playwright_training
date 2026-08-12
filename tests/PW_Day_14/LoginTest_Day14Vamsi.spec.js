import { test } from "../../Fixtures/LoginFixture_Vamsi.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env/.env.vamsi"
});

// CMD test
test("Login using CMD data", async ({ loginPage }) => {

    await loginPage.launchApplication();

    await loginPage.login(
        process.env.CMD_USERNAME,
        process.env.CMD_PASSWORD
    );

    await loginPage.verifySuccessfulLogin();
});

// ENV test
test("Login using ENV data", async ({ loginPage }) => {

    await loginPage.launchApplication();

    await loginPage.login(
        process.env.ENV_USERNAME,
        process.env.ENV_PASSWORD
    );

    await loginPage.verifySuccessfulLogin();
});