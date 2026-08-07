export class BasePage{

constructor(page){
    this.page=page;
}

async navigate(url){
    await this.page.goto(url);
}

async click(locator){
    await locator.click();
}

async entertext(locator,value){
    await locator.fill(value);
}

async getCurrentUrl(locator,value){
    return await this.page.url();
}

async getTitle(){
    return await this.page.title();
}

async waitForElement(){
    await locator.waitFor({state:"visible"});
}

async clear(locator){
    await locator.clear();
}

async getText(locator){
   return await locator.textContent();
}
}