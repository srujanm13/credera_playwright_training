
//1. Please write tests handling all the elements on https://smarterp-wgaw.onrender.com/playground.html page on smartERP application.

  import { test, expect } from '@playwright/test';
  import { loginToSmartERP } from '../helpers/smartERP';

  test('Handle all elements', async ({ page }) => {

  // Login
  await loginToSmartERP(page);

  // Dashboard
  await expect(page.locator("h2").first()).toHaveText("SmartERP");
  //await expect(page.getByText("Dashboard")).toBeVisible();

  // Open Playground
  await expect(page.locator("#playgroundMenu")).toBeVisible();
  await page.locator("#playgroundMenu").click();

  // Playground title
  await expect(page.locator("h1").first()).toHaveText("Playwright Playground");

  // Hover
  const hoverButton = page.locator("text=Hover Me");
  await hoverButton.hover();
  const Hover1 = await page.locator("text=Hover Me").textContent();
  console.log(Hover1);

  // Drag and Drop
  const task1 = page.getByText("Task 1");
  const dropzone = page.locator("#dropZone");
  await expect(task1).toBeVisible();
  await expect(dropzone).toBeVisible();
  const drag = await task1.textContent();
  const drop = await dropzone.textContent();
  console.log(drag);
  console.log(drop);

  // Mouse Hover
  await page.getByText("Move Mouse Here").hover();
  //await page.mouse.move(insidebox.x+50, insidebox.y+40);

  // Double Click
  const doubleBtn = page.locator("#doubleBtn");
  await expect(doubleBtn).toBeVisible();
  await doubleBtn.dblclick();
  const message = await page.locator("#doubleMessage").textContent();
  console.log(message);


  // Right Click
  const rightClickButton = page.getByText("Right Click Here");
  await expect(rightClickButton).toBeVisible();
  await rightClickButton.click({ button: "right" });
  const RightClick = await page.locator("#rightClickBox").textContent();
  console.log(RightClick);

  // Slider
  const slider = await page.locator('input[type="range"]');
  await slider.evaluate(el => el.value = 90);  //el = range input element, el.value = slider current value, 90 = new value 
  const value = await slider.inputValue();
  console.log(value);  


  // File Upload

  await page.locator("#upload").setInputFiles("./tests/PW_Day_3/VamsiDay7.spec.js");
  const filename = await page.locator("#fileName").textContent();
  console.log(filename);

});


