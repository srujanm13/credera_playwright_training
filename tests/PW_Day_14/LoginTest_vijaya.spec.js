import { test, expect } from "../../Fixtures/LoginFixture_vijaya.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.join(__dirname, "../../env/.env.vijaya"),
});

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
    await loginPage.login(process.env.env_USERNAME, process.env.env_PASSWORD);
    await loginPage.verifyLoginSuccessful();
});
