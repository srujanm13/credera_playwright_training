
import { expect } from "@playwright/test";
import { BasePage } from "./BasePage_Vamsi.js";
export class LoginPage extends BasePage {
    
    constructor(page) {
        super(page);

this.username = page.locator("#username");
this.password = page.locator("#password");
this.loginButton = page.locator("button[type='submit']");
}

async launchApplication() {
    await this.open("https://smarterp-wgaw.onrender.com/");

await this.page.waitForLoadState("networkidle");
}

async login(username, password) {
await this.enterText(this.username, username);
await this.enterText(this.password, password);
await this.click(this.loginButton);
}

async loginAsAdmin() {
await this.login("admin", "admin123");
}

async loginAsTrainer() {
await this.login("trainer", "trainer123");
}

async Invalid() {
    await this.login("Invalid", "invalid2");
}

async verifyLoginPage() {
await expect(this.username).toBeVisible();
await expect(this.password).toBeVisible();
await expect(this.loginButton).toBeVisible();
}

async verifySuccessfulLogin() {
await expect(this.page).toHaveURL(/dashboard/);
}
}