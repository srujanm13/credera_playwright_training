import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyURL(expectedURL) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async click(locator) {
    await locator.click();
  }

  async enterText(locator, text) {
    await locator.fill(text);
  }

  async verifyVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async verifyText(locator, text) {
    await expect(locator).toHaveText(text);
    console.log("Invalid error message: "+ await locator.textContent());
  }

  async waitPage(){
    await this.page.waitForTimeout(5000);
  }

}