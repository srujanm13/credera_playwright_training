import { BasePage } from './BasePage_MaheshP.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

  constructor(page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.dashboardHeading = page.locator('h1');
    this.logoutButton = page.locator('.danger-btn');
    this.errormsg = page.locator('.error-message');
  
  }

  async openLoginPage() {
    await this.navigate('https://smarterp-wgaw.onrender.com/');
  }

  async login(user, pass) {
    await this.enterText(this.username, user);
    await this.enterText(this.password, pass);
    await this.click(this.loginButton);
  }


  async verifyDashboardLoaded() {
    await expect(this.dashboardHeading).toContainText('Dashboard');
    await this.verifyVisible(this.logoutButton);
    console.log("Successfully logged in and redirected to " + await this.page.title() + "page");
  }

  async loginAsAdmin() {
        await this.login("admin","admin123");
    }
  async loginAsTrainer() {
        await this.login("trainer","trainer123");
    }

   async verifyErrorMsg(){
       await this.verifyText(this.errormsg, 'Invalid username or password.');
   } 

}