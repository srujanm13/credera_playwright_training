import { test, expect } from "../../fixtures/LoginFixture_Pranay";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.join(__dirname, "../../env/.env.pranay"),
});

test("Login with CommandPrompt", async ({ loginPage }) => {
  await loginPage.launchApplicationSmartErp();
  await loginPage.login(process.env.env_USERNAME, process.env.env_PASSWORD);
  await loginPage.verifyLoginSuccessful();
});

test("Login with EnvironmentFiles", async ({ loginPage }) => {
  await loginPage.launchApplicationSmartErp();
  await loginPage.login(process.env.env_USERNAME, process.env.env_PASSWORD);
  await loginPage.verifyLoginSuccessful();
});