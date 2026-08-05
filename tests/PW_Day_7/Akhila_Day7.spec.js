import { test, expect } from '@playwright/test';
import { loginToSmartERP, openPlayground } from '../helpers/smarterp';

test('Validate the presence of the "Playground" heading', async ({ page, context }) => {
    test.setTimeout(60000);
    await loginToSmartERP(page);
    await openPlayground(page);
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Playwright Playground');
    await context.close();
});

test('Validate Hover button handling click event', async ({ page, context }) => {
    test.setTimeout(60000);
    await loginToSmartERP(page);
    await openPlayground(page);
     const hoverBtn = page.locator('text=Hover Me');
     await expect(hoverBtn).toBeVisible();
     await hoverBtn.hover();
     await context.close();
});

test('Validate drag and drop button handling click event', async ({ page, context }) => {
    test.setTimeout(60000);
    await loginToSmartERP(page);
    await openPlayground(page);
    const dragBtn = page.locator('#dragItem');
    const dropArea = page.locator('#dropZone');
    await expect(dragBtn).toBeVisible();
    await expect(dropArea).toBeVisible();
    await dragBtn.dragTo(dropArea);
    await context.close();
});

test('Validate Move mouse here event handling click event', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const moveMouseBtn = page.locator('#mouseArea');
    await expect(moveMouseBtn).toBeVisible();
    await moveMouseBtn.hover();
    await context.close();
});

test('Validate Double click button handling click event', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const doubleClickBtn = page.locator('#doubleBtn');
    await expect(doubleClickBtn).toBeVisible();
    await doubleClickBtn.dblclick();
    await context.close();
});

test('Validate Right click button handling click event', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const rightClickBtn = page.locator('#rightClickBox');
    await expect(rightClickBtn).toBeVisible();
    await rightClickBtn.click({ button: 'right' });
    await context.close();
});

test('Validate Slider button handling click event', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const slider = page.locator('input[type="range"]');
    await slider.fill('70');
    await context.close();
});

test('Validate File upload button handling click event', async ({ page, context }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    await page.locator("#upload").setInputFiles("./tests/PW_Day_7/Akhila_Day7.spec.js");
    const filename = await page.locator("#fileName").textContent();
    console.log(filename);
    await context.close();
})