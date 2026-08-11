import { expect } from "@playwright/test";
import { BasePage } from "./BasePage_Akhila.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.loginButton = page.locator("button[type='submit']");
    }

    async launchApplication() {
        await this.navigate("https://smarterp-wgaw.onrender.com/");
        await this.page.waitForLoadState("networkidle");
    }

    async enterUsername(username) {
        await this.enterText(this.username, username);
    }

    async enterPassword(password) {
        await this.enterText(this.password, password);
    }

    async clickLogin() {
        await this.clickElement(this.loginButton);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async ValidAdminLogin() {
        await this.login("admin", "admin123");
    }

    async InvalidLogin() {
        await this.login("abcde", "fghij");
    }

    async verifyLoginElements() {
        await expect(this.username).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async verifySuccessfulLogin() {
        await expect(this.page).toHaveURL(/dashboard/i);
    }
}
