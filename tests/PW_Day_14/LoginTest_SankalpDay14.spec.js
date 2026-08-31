import { test, expect } from "../../fixtures/LoginFixture_Sankalp.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.join(__dirname, "../../env/.env.Sankalp"),
});

test("Login using CMD", async ({loginPage})=>{
    test.setTimeout(50000);
    await loginPage.launchSmartERP();
    await loginPage.login(
        process.env.USERNAME,
        process.env.PASSWORD
    );
    await loginPage.verifyLoginSuccessful();
});

test("Verify Login Using ENV File", async ({loginPage})=>{
    test.setTimeout(50000);
    await loginPage.launchSmartERP();
    await loginPage.login(process.env.env_USERNAME, process.env.env_PASSWORD);
    await loginPage.verifyLoginSuccessful();
});