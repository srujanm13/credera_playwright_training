import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  // 1. Login
  await page.goto('https://smarterp-wgaw.onrender.com/');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // 2. Wait for dashboard, then click into Playground
  await expect(page.getByText('Playground')).toBeVisible();
  await page.getByText('Playground').click();

  // 3. Confirm we're on the playground page
  await expect(page.locator('h1')).toHaveText('Playwright Playground');
});

test('Handle all Playground elements', async ({ page }) => {

  // 1. Hover
  await page.locator('.hover-card').hover();
  await expect(page.locator('.tooltip')).toBeVisible();
  await expect(page.locator('.tooltip')).toHaveText('Customer Details');

  // 2. Drag and Drop
  await page.locator('#dragItem').dragTo(page.locator('#dropZone'));

  // 3. Mouse Move
  const mouseArea = page.locator('#mouseArea');
  await mouseArea.scrollIntoViewIfNeeded();
  const box = await mouseArea.boundingBox();

  if (box) {
    await page.mouse.move(box.x, box.y);
    await page.mouse.move(
      box.x + box.width / 2,
      box.y + box.height / 2,
      { steps: 10 }
    );
  }
  await expect(page.locator('#x')).not.toHaveText('0');
  await expect(page.locator('#y')).not.toHaveText('0');

  // 4. Double Click
  await page.locator('#doubleBtn').dblclick();
  await expect(page.locator('#doubleMessage')).not.toHaveText('');

  // 5. Right Click
  await page.locator('#rightClickBox').click({
    button: 'right'
  });
  await expect(page.locator('#contextMenu')).toBeVisible();

  // 6. Slider
  const slider = page.locator('#slider');
  await slider.evaluate((el, value) => {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, '80');
  await expect(page.locator('#sliderValue')).toHaveText('80');

//   // 7. Upload File
//   const filePath = path.join(
//     process.cwd(),
//     'tests',
//     'testdata',
//     'sample.txt'
//   );
//   await page.locator('#upload').setInputFiles(filePath);
//   await expect(page.locator('#fileName')).toContainText('sample.txt');

  // 8. Frames
  const frameStatus = page.locator('#frameStatus');
  await expect(frameStatus).toHaveText('Viewing customers.html.');
  await page.locator('.frame-link[data-frame="orders.html"]').click();
  await expect(page.locator('#demoFrame')).toHaveAttribute('src', 'orders.html');
  await expect(frameStatus).toHaveText('Viewing orders.html.');
  await page.locator('.frame-link[data-frame="reports.html"]').click();
  await expect(page.locator('#demoFrame')).toHaveAttribute('src', 'reports.html');
  await expect(frameStatus).toHaveText('Viewing reports.html.');
  await page.locator('.frame-link[data-frame="customers.html"]').click();
  await expect(page.locator('#demoFrame')).toHaveAttribute('src', 'customers.html');
  await expect(frameStatus).toHaveText('Viewing customers.html.');

  // 9. Popup Windows
  const windowStatus = page.locator('#windowStatus');
  await expect(windowStatus).toHaveText('No popup opened yet.');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#openWindowBtn').click(),
  ]);
  await expect(windowStatus).not.toHaveText('No popup opened yet.');
  await popup.close();
  const [namedPopup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#openNamedWindowBtn').click(),
  ]);
  await expect(windowStatus).not.toHaveText('No popup opened yet.');
  await namedPopup.close();

  // 10. Tabs
  await expect(page.locator('#tab1')).toHaveClass(/active/);
  await page.locator('.tab-btn[data-tab="tab2"]').click();
  await expect(page.locator('#tab2')).toHaveClass(/active/);
  await expect(page.locator('#tab2')).toContainText('Track current orders');
  await page.locator('.tab-btn[data-tab="tab3"]').click();
  await expect(page.locator('#tab3')).toHaveClass(/active/);
  await expect(page.locator('#tab3')).toContainText('Inspect daily KPIs');
  await page.locator('.tab-btn[data-tab="tab1"]').click();
  await expect(page.locator('#tab1')).toHaveClass(/active/);

  // 11. Alerts
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
  await page.locator('#alertBtn').click();
  await expect(page.locator('#alertResult')).not.toHaveText('No alert interaction yet.');

});