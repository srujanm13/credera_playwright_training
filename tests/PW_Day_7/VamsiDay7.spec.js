
//1. Please write tests handling all the elements on https://smarterp-wgaw.onrender.com/playground.html page on smartERP application.

  import { test, expect } from '@playwright/test';
  import { loginToSmartERP } from '../helpers/smarterp';

  test('Handle all elements', async ({ page, context }) => {
  await loginToSmartERP(page);
  await expect(page.locator("h2").first()).toHaveText("SmartERP");

  await expect(page.locator("#playgroundMenu")).toBeVisible();
  await page.locator("#playgroundMenu").click();
  await expect(page.locator("h1").first()).toHaveText("Playwright Playground");

  const hoverButton = page.locator("text=Hover Me");
  await hoverButton.hover();
  const Hover1 = await page.locator("text=Hover Me").textContent();
  console.log(Hover1);

  const task1 = page.getByText("Task 1");
  const dropzone = page.locator("#dropZone");
  await expect(task1).toBeVisible();
  await expect(dropzone).toBeVisible();
  const drag = await task1.textContent();
  const drop = await dropzone.textContent();
  console.log(drag);
  console.log(drop);

  
  await page.getByText("Move Mouse Here").hover();
  

  const doubleBtn = page.locator("#doubleBtn");
  await expect(doubleBtn).toBeVisible();
  await doubleBtn.dblclick();
  const message = await page.locator("#doubleMessage").textContent();
  console.log(message);


  const rightClickButton = page.getByText("Right Click Here");
  await expect(rightClickButton).toBeVisible();
  await rightClickButton.click({ button: "right" });
  const RightClick = await page.locator("#rightClickBox").textContent();
  console.log(RightClick);

  const slider = await page.locator('input[type="range"]');
  await slider.evaluate(el => el.value = 90);  //el = range input element, el.value = slider current value, 90 = new value 
  const value = await slider.inputValue();
  console.log(value);  


  await page.locator("#upload").setInputFiles("./tests/PW_Day_7/VamsiDay7.spec.js");
  const filename = await page.locator("#fileName").textContent();
  console.log(filename);

  await context.close();


});


