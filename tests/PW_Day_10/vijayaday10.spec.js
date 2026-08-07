import {test, expect, chromium} from '@playwright/test'
test.use({ browserName: 'chromium' });
import { loginToSmartERP, openPlayground } from '../helpers/smarterp';

test("Handling Frames ", async ({page})=>{
    await loginToSmartERP(page);
    await openPlayground(page)
    const editor = page.frameLocator("#demoFrame").locator("#searchInput");
    await editor.fill("John");
    await expect(editor).toHaveValue("John");
})

test("Handling multiple Tabs/Windows ", async({page,context})=>{
    await page.goto("https://www.hyundai.com/in/en",{waitUntil:"domcontentloaded"});
    await expect(page.getByLabel("testdrive")).toBeVisible();
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByLabel("testdrive").click()
    ])
    await newPage.waitForLoadState("domcontentloaded");
    const userName ="Vijaya"
    await newPage.locator("#name").fill(userName);
    await expect(newPage.locator("#name")).toHaveValue(userName);
    await newPage.close();
    await page.bringToFront();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/blog/);
})