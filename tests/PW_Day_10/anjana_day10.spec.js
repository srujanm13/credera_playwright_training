import { test, expect } from "@playwright/test";

test("Handle multiple frames in Oracle Java Docs", async ({ page }) => {
  await page.goto(
    "https://docs.oracle.com/javase/8/docs/api/index.html?overview-summary.html",
    { waitUntil: "domcontentloaded" },
  );
  console.log("Total Frames:", page.frames().length);
  expect(page.frames().length).not.toBe(0);
  const packageFrame = page.frameLocator('frame[name="packageListFrame"]');
  await packageFrame.getByText("java.applet").click();
  const classFrame = page.frameLocator('frame[name="packageFrame"]');
  await classFrame.getByRole("link", { name: "Applet", exact: true }).click();
  const classDocFrame = page.frameLocator('frame[name="classFrame"]');
  await expect(
    classDocFrame.getByRole("heading", {name: "Applet",exact: true,}),
  ).toBeVisible();
  await expect(classDocFrame.locator("body")).toContainText("Applet");
  console.log("Successfully navigated through all frames.");
});

test("Handling Multiple Tabs", async ({ page, context }) => {
  await page.goto("https://www.hyundai.com/in/en", {
    waitUntil: "domcontentloaded",
  });
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator('a[aria-label="testdrive"]').click(),
  ]);
  const nameField = newPage.locator('input[placeholder="Name"]');
  const expectedName = "John Doe";
  await nameField.fill(expectedName);
  await expect(nameField).toHaveValue(expectedName);
  await page.bringToFront();
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/blog/);
});
