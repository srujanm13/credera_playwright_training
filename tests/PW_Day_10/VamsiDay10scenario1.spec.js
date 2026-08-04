
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