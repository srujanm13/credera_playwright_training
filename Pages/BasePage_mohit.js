export class BasePage {
    
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async enterText(locator, text) {
        await locator.fill(text);
    }

    async clickElement(locator) {
        await locator.click();
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForElement(locator) {
        await locator.waitFor({
            state: "visible"
        });
    }
}