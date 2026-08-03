import { test, expect } from "@playwright/test";
import path from "path";

test("Hover me", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  const hoverBtn = page.locator(".hover-card");
  await hoverBtn.hover();
  await expect(page.locator(".tooltip")).toBeVisible();
});

test("Drag and Drop", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  await page.locator("#dragItem").dragTo(page.locator("#dropZone"));
  await expect(page.locator("#dropZone")).toContainText("Task 1");
});

test("mouse coordinates", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  const mouseArea = page.locator("#mouseArea");
  await mouseArea.scrollIntoViewIfNeeded();
  const box = await mouseArea.boundingBox();
  if (box) {
    await page.mouse.move(box.x + 60, box.y + 40);
    await expect(page.locator("#x")).toHaveText("58");
    await expect(page.locator("#y")).toHaveText("38");
  }});

test("Double click", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  await page.getByRole("button", { name: "Double Click Me" }).dblclick();
  await expect(page.locator("#doubleMessage")).toHaveText(
    "Double Click Success",
  );
});

test("Right Click", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  const contextMenu = page.locator("#contextMenu");
  await page.locator("#rightClickBox").click({
    button: "right",
  });
  await expect(contextMenu).toHaveCSS("display", "block");
});

test("Slider", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  const slider = page.locator("#slider");
  await slider.fill("75");
  await expect(page.locator("#slider")).toHaveValue("75");
});

test("Upload", async ({ page }) => {
  // I have hit this url directly (login not required)
  await page.goto("https://smarterp-wgaw.onrender.com/playground.html");
  await expect(page).toHaveURL(/playground.html/);
  const filePath = path.join(__dirname, "../PW_Day_1/anjana_day1.spec.js");
  await page.locator("#upload").setInputFiles(filePath);
  await expect(page.locator("#upload")).toHaveValue(/anjana_day1\.spec\.js$/);
});