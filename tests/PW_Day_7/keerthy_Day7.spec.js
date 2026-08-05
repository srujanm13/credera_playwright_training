import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', {  waitUntil: 'domcontentloaded'
  });
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard.html');
  const playground = page.getByRole('link', {
    name: /Playground/
  });
  await playground.click();
  await expect(page.locator('h1')).toHaveText('Playwright Playground');
});

test('Handle Mouse Hover', async ({ page }) => {
  await page.locator('.hover-card').hover();
  await expect(page.locator('.tooltip')).toBeVisible();
  await expect(page.locator('.tooltip')).toHaveText('Customer Details');
});

test('Handle Drag and Drop', async ({ page }) => {
  await page.locator('#dragItem').dragTo(page.locator('#dropZone'));
});

test('Handle Mouse Movement and Double Click', async ({ page }) => {
  const mouseArea = page.locator('#mouseArea');
  await mouseArea.scrollIntoViewIfNeeded();
  const box = await mouseArea.boundingBox();
  if (!box) {
    throw new Error('Mouse area bounding box was not found');
  }
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.move(
    box.x + box.width / 2,
    box.y + box.height / 2,
    { steps: 10 }
  );
  await expect(page.locator('#x')).not.toHaveText('0');
  await expect(page.locator('#y')).not.toHaveText('0');
  await page.locator('#doubleBtn').dblclick();
  await expect(page.locator('#doubleMessage')).not.toHaveText('');
});

test('Handle Right Click and Slider', async ({ page }) => {
  const rightClickBox = page.locator('#rightClickBox');
  await rightClickBox.scrollIntoViewIfNeeded();
  await rightClickBox.click({ button: 'right' });
  await expect(page.locator('#contextMenu')).toBeVisible();
  const slider = page.locator('#slider');
  await slider.evaluate((element, value) => {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, '80');
  await expect(page.locator('#sliderValue')).toHaveText('80');
});

test('Handle Frame Navigation', async ({ page }) => {
  const frameStatus = page.locator('#frameStatus');
  const demoFrame = page.locator('#demoFrame');
  await expect(frameStatus).toHaveText('Viewing customers.html.');
  await page.locator('.frame-link[data-frame="orders.html"]').click();
  await expect(demoFrame).toHaveAttribute('src', 'orders.html');
  await expect(frameStatus).toHaveText('Viewing orders.html.');
  await page.locator('.frame-link[data-frame="reports.html"]').click();
  await expect(demoFrame).toHaveAttribute('src', 'reports.html');
  await expect(frameStatus).toHaveText('Viewing reports.html.');
  await page.locator('.frame-link[data-frame="customers.html"]').click();
  await expect(demoFrame).toHaveAttribute('src', 'customers.html');
  await expect(frameStatus).toHaveText('Viewing customers.html.');
});

test('Handle Popup Windows', async ({ page }) => {
  const windowStatus = page.locator('#windowStatus');
  await expect(windowStatus).toHaveText('No popup opened yet.');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#openWindowBtn').click()
  ]);
  await expect(windowStatus).not.toHaveText('No popup opened yet.');
  await popup.close();
  const [namedPopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#openNamedWindowBtn').click()
  ]);
  await expect(windowStatus).not.toHaveText('No popup opened yet.');
  await namedPopup.close();
});

test('Handle Tabs', async ({ page }) => {
  await expect(page.locator('#tab1')).toHaveClass(/active/);
  await page.locator('.tab-btn[data-tab="tab2"]').click();
  await expect(page.locator('#tab2')).toHaveClass(/active/);
  await expect(page.locator('#tab2')).toContainText('Track current orders');
  await page.locator('.tab-btn[data-tab="tab3"]').click();
  await expect(page.locator('#tab3')).toHaveClass(/active/);
  await expect(page.locator('#tab3')).toContainText('Inspect daily KPIs');
  await page.locator('.tab-btn[data-tab="tab1"]').click();
  await expect(page.locator('#tab1')).toHaveClass(/active/);
});

test('Handle JavaScript Alert', async ({ page }) => {
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
  await page.locator('#alertBtn').click();
  await expect(page.locator('#alertResult')).not.toHaveText('No alert interaction yet.');
});