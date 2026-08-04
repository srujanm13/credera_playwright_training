import {test, expect, chromium} from '@playwright/test'
import { loginToSmartERP, openPlayground } from '../helpers/smarterp';

test("Handling Frames ", async ({page})=>{
    await loginToSmartERP(page);
    await openPlayground(page)
    const editor = page.frameLocator("#demoFrame").locator("#searchInput");
    await editor.fill("Rahul");
    await expect(editor).toHaveValue("Rahul");
})

test("Handling multiple Tabs/Windows ", async({page,context})=>{
    test.setTimeout(60000);
    await page.goto("https://www.hyundai.com/in/en",{waitUntil:"domcontentloaded"});
    await expect(page.getByLabel("testdrive")).toBeVisible();
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByLabel("testdrive").click()
    ])
    await newPage.waitForLoadState("domcontentloaded");
    const userName ="Mohit Patiyal"
    await newPage.locator("#name").fill(userName);
    await expect(newPage.locator("#name")).toHaveValue(userName);
    await newPage.close();
    await page.bringToFront();
    await page.locator("//*[@class='dep1 investor-menu']//a[@href='/in/en/blog']").click();
    await expect(page).toHaveURL(/blog/);
})