import { test, expect } from '@playwright/test';

  test('Handle all elements in SmartERP', async ({ page }) => {

  // Logging into SmartERP application
  await page.goto('https://smarterp-wgaw.onrender.com/');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button:has-text("Login")').click();

  // Opening Playground link from the left navigation bar
  await page.locator("//a[@id='playgroundMenu']").click();


  // Validating Playground title
  await expect(page.locator("h1").first()).toHaveText("Playwright Playground");

  // Validating Hover functionality
  const hoverElement = page.locator("text=Hover Me");
  await hoverElement.hover();
  const hoverText = await page.locator("text=Hover Me").textContent();
  console.log(hoverText);

  // Validating Drag and Drop functionality
  const dragElement = page.locator("#dragItem");
  const dropElement = page.locator("#dropZone");
  await expect(dragElement).toBeVisible();
  await expect(dropElement).toBeVisible();
  // Dragging the element to the drop zone
  await dragElement.dragTo(dropElement);
  const dropText = await page.locator("#dropZone").textContent();
  console.log(dropText);


  // Validating Mouse Hover functionality
  await page.getByText("Move Mouse Here").hover();

  // Validating Double Click functionality
  const doubleClickBtn = page.locator("#doubleBtn");
  await doubleClickBtn.dblclick();
  const successMessage = await page.locator("#doubleMessage").textContent();
  console.log(successMessage);


  // Validating Right Click functionality
  const rightClickBtn = page.locator("#rightClickBox");
  await rightClickBtn.click({ button: "right" });
  const contextMenu = page.locator('//ul[@id="contextMenu"]').first();
  await expect(contextMenu).toBeVisible();

  // Validating Slider functionality
  const slider = await page.locator('//input[@type="range"]');
  await slider.evaluate(el => el.value = 75);  //el = range input element, el.value = slider current value, 90 = new value 
  const value = await slider.inputValue();
  console.log(value);  


  // Validating File Upload functionality

  await page.locator("input[type='file']").setInputFiles("./tests/PW_Day_7/Pranay_Day7.spec.js");
  const fileName = await page.locator("#fileName").textContent();
  console.log(fileName);

});