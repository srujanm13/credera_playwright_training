import { expect } from "@playwright/test";
import { BasePage } from "./BasePage_mohit.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("button[type='submit']");
    }
    async launchApplication() {
        await this.navigate("/");
    }
    async enterUsername(username) {
        await this.enterText(this.usernameInput,username);
    }
    async enterPassword(password) {
        await this.enterText(this.passwordInput,password);
    }
    
    async clickLogin() {
    await Promise.all([
        this.page.waitForURL(/dashboard/i),
        this.loginButton.click()
    ]);
}
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
    async loginAsAdmin() {
        await this.login("admin","admin123");
    }
    async loginAsTrainer() {
        await this.login("trainer","trainer123");
    }
    async verifyLoginSuccessful() {
        await expect(this.page).toHaveURL(/dashboard/i);
    }
    async verifyLoginPageLoaded() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}