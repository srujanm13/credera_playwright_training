import { test, expect } from '@playwright/test';
import { loginToSmartERP, openPlayground } from '../helpers/smarterp';

test('Validate Playground Elements', async ({ page }) => {

    await loginToSmartERP(page);

    await openPlayground(page);

    // Validate the presence of the "Playground" heading
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Playwright Playground');


    //Hover button handling click event
     const hoverBtn = page.locator('text=Hover Me');
     await expect(hoverBtn).toBeVisible();
     await hoverBtn.hover();

    //drag and drop button handling click event
    const dragBtn = page.locator('#dragItem');
    const dropArea = page.locator('#dropZone');
    await expect(dragBtn).toBeVisible();
    await expect(dropArea).toBeVisible();
    await dragBtn.dragTo(dropArea);

//Move mouse here event handling click event
    const moveMouseBtn = page.locator('#mouseArea');
    await expect(moveMouseBtn).toBeVisible();
    await moveMouseBtn.hover();

//Double click button handling click event
    const doubleClickBtn = page.locator('#doubleBtn');
    await expect(doubleClickBtn).toBeVisible();
    await doubleClickBtn.dblclick();

    //Right click button handling click event
    const rightClickBtn = page.locator('#rightClickBox');
    await expect(rightClickBtn).toBeVisible();
    await rightClickBtn.click({ button: 'right' });

    //Slider button handling click event
    const slider = page.locator('input[type="range"]');
    await slider.fill('70');

    //File upload button handling click event
    await page.locator("#upload").setInputFiles("./tests/PW_Day_7/Akhila_Day7.spec.js");
    const filename = await page.locator("#fileName").textContent();
    console.log(filename);

})