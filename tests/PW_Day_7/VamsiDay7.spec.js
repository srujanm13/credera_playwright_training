
//1. Please write tests handling all the elements on https://smarterp-wgaw.onrender.com/playground.html page on smartERP application.

  import { test, expect } from '@playwright/test';
  import { loginToSmartERP, openPlayground  } from '../helpers/smarterp';

  test('Handle all elements', async ({ page }) => {
  await loginToSmartERP(page);
  await expect(page.locator("h2").first()).toHaveText("SmartERP");
  });

  test('Handle all elements on Playground page', async ({ page }) => {
  await loginToSmartERP(page);
  await expect(page.locator("#playgroundMenu")).toBeVisible();
  await page.locator("#playgroundMenu").click();
  await expect(page.locator("h1").first()).toHaveText("Playwright Playground");
  });

  test('Hoverbutton', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const hoverButton = page.locator("text=Hover Me");
  await hoverButton.hover();
  await hoverButton.hover();
  await expect(hoverButton).toBeVisible();
  const hoverButtonText = await page.locator("text=Hover Me").textContent();
  });

  test('Drag and Drop', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const task1 = page.getByText("Task 1");
  const dropZone = page.locator("#dropZone");
  await expect(task1).toBeVisible();
  await expect(dropZone).toBeVisible();
  await task1.dragTo(dropZone);
  await expect(dropZone).toContainText("Task 1");
  });

  test('Mouse Movement', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const moveMouseBtn = page.locator('#mouseArea');
  await expect(moveMouseBtn).toBeVisible();
  await moveMouseBtn.hover();
  await expect(page.locator("#x")).not.toHaveText("0");
  await expect(page.locator("#y")).not.toHaveText("0");
});

  test('Double Click', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const doubleBtn = page.locator("#doubleBtn");
  await expect(doubleBtn).toBeVisible();
  await doubleBtn.dblclick();
  const doubleClickMessage = await page.locator("#doubleMessage").textContent();
  await expect(page.locator("#doubleMessage")).toContainText("Double");
  });

  test('Right Click', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const rightClickButton = page.getByText("Right Click Here");
  await expect(rightClickButton).toBeVisible();
  await rightClickButton.click({ button: "right" });
  const rightClickMessage = await page.locator("#rightClickBox").textContent();
  await expect(page.locator("#rightClickBox")).toContainText("Right");
  });

  test('Slider', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const slider = page.locator('input[type="range"]');
  await slider.fill("90");
  const sliderValue = await slider.inputValue();
  await expect(slider).toHaveValue("90");
  });

  test('Tabs', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  await page.getByRole("heading", { name: "Tabs" }).scrollIntoViewIfNeeded();
  const customerTab = page.getByRole("button", { name: "Customer Tab" });
  await customerTab.click();
  await expect(customerTab).toHaveClass(/active/);
  const ordersTab = page.getByRole("button", { name: "Orders Tab" });
  await ordersTab.click();
  await expect(ordersTab).toHaveClass(/active/);
  const reportsTab = page.getByRole("button", { name: "Reports Tab" });
  await reportsTab.click();
  await expect(reportsTab).toHaveClass(/active/);
});