import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage_anjana";

/**
 * @typedef {Object} MyFixtures
 * @property {LoginPage} loginPage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & MyFixtures, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPageObj = new LoginPage(page);
    await use(loginPageObj);
  },
});
export { test, expect };
