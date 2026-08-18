class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  async navigateTo(url) {
    await this.page.goto(url,{
      waitUntil: "domcontentloaded"
    });
  }

  async verifyURL(expectedUrl) {
    await this.page.waitForURL(expectedUrl);
  }

  async fill(locator,text) {
    await locator.fill(text)
  }

async submit(locator) {
    await locator.click()
  }

  
}
export { BasePage}