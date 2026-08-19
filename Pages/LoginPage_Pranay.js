import { expect } from '@playwright/test';
import { BasePage } from './BasePage_Pranay';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Enter username');
        this.passwordInput = page.getByPlaceholder('Enter password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    async launchApplicationSmartErp() {
        await this.navigate('https://smarterp-wgaw.onrender.com/');
    }
    async enterUsername(username) {
        await this.enterText(this.usernameInput, username);
    }
    async enterPassword(password) {
        await this.enterText(this.passwordInput, password);
    }
    async clickLogin() {
        await this.loginButton.click();
    }
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
    async invalidlogin() {
        await this.login('wrongUser', 'wrongPassword');
    }
    async loginAsTrainer() {
        await this.login('trainer', 'trainer123');
    }
    async loginAsAdmin() {
        await this.login('admin', 'admin123');
    }
    async verifyLoginSuccessful() {
        await expect(this.page).toHaveURL(/dashboard/i);
    }
    async verifyLoginFailed() {
        await expect(this.page).not.toHaveURL(/dashboard/i);
    }
    async verifyLoginPageLoaded() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}