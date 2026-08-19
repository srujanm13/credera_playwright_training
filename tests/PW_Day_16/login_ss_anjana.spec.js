import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test("Login and save storage state", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator(".title")).toHaveText("Products");
  await page.context().storageState({
    path: "./tests/storage/sauceStorageState.json",
  });
});

test.describe("Tests using saved login", () => {
  test.use({
    storageState: "./tests/storage/sauceStorageState.json",
  });

  test("Verify Products page", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Add product to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });
});
