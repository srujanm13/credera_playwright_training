
import { test, expect } from "@playwright/test";

test("Scenario 1: Frame Handling", async ({ page, context }) => {
  await page.goto("https://docs.oracle.com/javase/8/docs/api/");
  const frame = page.frameLocator('frame[name="packageListFrame"]'); 
  await expect(frame.getByText("java.applet")).toBeVisible(); 
  await frame.getByText("java.applet").click(); 
  const frame2 = page.frameLocator('frame[name ="packageFrame"]'); 
  await expect(frame2.getByText("AppletContext")).toBeVisible(); 
  await frame2.getByText("AppletContext").click();
  const frame3 = page.frameLocator('frame[name ="classFrame"]'); 
  await expect(frame3.locator("h2")).toContainText("Interface AppletContext");
  await context.close();
});

test("Scenario 2 - Multiple Handlings", async ({ page, context }) => {
  await page.goto("https://www.hyundai.com/in/en", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1").first()).toContainText("Hyundai Cars");
  const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByLabel("testdrive").click()]);
  await expect(newPage).toHaveURL(/request-a-test-drive/);
  await newPage.waitForLoadState("domcontentloaded"); 
  await expect(newPage).toHaveURL(/request-a-test-drive/);
  const nameField = newPage.locator("#name");
  await nameField.fill("Vamsi Krishna");
  await expect(nameField).toHaveValue("Vamsi Krishna");
  await newPage.close(); 
  await page.bringToFront();
  await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/blog/);
  await context.close();
});