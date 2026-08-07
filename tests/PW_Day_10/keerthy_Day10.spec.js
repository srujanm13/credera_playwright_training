import { test, expect } from '@playwright/test';

test('Handling External Frame for smarterp', async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/playground.html', {
        waitUntil: 'domcontentloaded'
    });
    const frame = page.frameLocator('#demoFrame');
    await expect(
        frame.locator('select').first()
    ).toBeVisible();
    await expect(
        page.locator('#frameStatus')
    ).toHaveText('Viewing Customer Records.');
});

test('Handling External Frame - Product Description', async ({ page }) => {
    await page.goto('https://smarterp-wgaw.onrender.com/playground.html', {
        waitUntil: 'domcontentloaded'
    });
    const iframe = page.locator('#demoFrame');
    await iframe.evaluate((element) => {
        element.src = 'products.html';
    });
    const frame = page.frameLocator('#demoFrame');
    const description = frame.locator('#description');
    await expect(description).toBeVisible();
    const descriptionText = 'Handling frame for product description';
    await description.fill(descriptionText);
    await expect(description).toHaveValue(descriptionText);
});
test("Handling multiple Tabs/Windows ", async ({ page, context }) => {
    await page.goto("https://www.hyundai.com/in/en", { waitUntil: "domcontentloaded" });
    await expect(page.getByLabel("testdrive")).toBeVisible();
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByLabel("testdrive").click()
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    const userName = "Keerthy Arvind"
    await newPage.locator("#name").fill(userName);
    await expect(newPage.locator("#name")).toHaveValue(userName);
    await newPage.close();
    await page.bringToFront();
    await page.locator("//*[@class='dep1 investor-menu']//a[@href='/in/en/blog']").click();
    await expect(page).toHaveURL(/blog/);
});