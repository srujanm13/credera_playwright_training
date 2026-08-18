import { BasePage } from './BasePage_anjana'
import {expect} from '@playwright/test'
/**
 * @param {import('@playwright/test').Page} page
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('button[type="submit"]');
  }

  async launchSmarTerp() {
    await this.navigateTo("https://smarterp-wgaw.onrender.com/");
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.submit(this.loginButton);
  }

  async verifyUserIsLoggedIn() {
    await expect(this.page).toHaveTitle("SmartERP Dashboard");
  }
}
export { LoginPage };
