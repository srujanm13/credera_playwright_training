import { test } from "../../Fixtures/LoginFixture_mohit.js";
import { envConfig } from "../../envConfig.js";

test("Login using CLI parameters", async ({loginPage})=>{
    await loginPage.launchApplication();
    await loginPage.login(
        process.env.USERNAME,
        process.env.PASSWORD
    );
    await loginPage.verifyLoginSuccessful();
});

test("Verify Login Using Environment Configuration", async ({loginPage})=>{
    await loginPage.launchApplication();
    await loginPage.login(
        envConfig.username,
        envConfig.password
    );
    await loginPage.verifyLoginSuccessful();
});