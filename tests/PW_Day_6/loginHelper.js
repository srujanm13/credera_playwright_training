export async function loginToSmartERP(page) {
    await page.goto("https://smarterp-wgaw.onrender.com/", { waitUntil: "domcontentloaded" });
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("admin123");
    await page.locator("#loginBtn").click();
}
