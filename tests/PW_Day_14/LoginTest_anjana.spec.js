import { test, expect } from "../../fixtures/LoginFixture_anjana.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.join(__dirname, "../../env/.env.anjana"),
});

test("Login with CMD", async ({ loginPage }) => {
  await loginPage.launchSmarTerp();
  await loginPage.login(process.env.cmd_username, process.env.cmd_password);
  await loginPage.verifyUserIsLoggedIn();
});

test("Login with env file", async ({ loginPage }) => {
  await loginPage.launchSmarTerp();
  await loginPage.login(process.env.env_USERNAME, process.env.env_PASSWORD);
  await loginPage.verifyUserIsLoggedIn();
});
