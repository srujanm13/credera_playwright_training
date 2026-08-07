export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async open(url) {
        await this.page.goto(url);
    }

    async enterText(locator, text) {
        await locator.fill(text);
    }

    async click(locator) {
        await locator.click();
    }

    async getTitle() {
        return await this.page.title();
    }

    async getURL() {
        return await this.page.url();
    }

}