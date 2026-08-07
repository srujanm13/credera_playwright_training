import { test, expect } from '@playwright/test';
import { loginToSmartERP, openPlayground } from "../helpers/smarterp";

test('Mouse Hover', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  await page.getByText('Hover Me').hover(); // hover action
  await expect(page.getByText('Customer Details')).toBeVisible();
})

test('Drag & Drop', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const drag = await page.getByText('Task 1');  
  const drop = await page.getByText('Drop Here'); 
  await drag.dragTo(drop);   
  await page.waitForTimeout(2000);
  await expect(drop).toContainText('Task 1');  
})

test('Mouse Movement', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const mouseArea = page.locator("#mouseArea");
  const coordinateX = page.locator("#x");
  const coordinateY = page.locator("#y");
  const initialX = await coordinateX.textContent();
  const initialY = await coordinateY.textContent();
  await mouseArea.scrollIntoViewIfNeeded();
  const box = await mouseArea.boundingBox();
  await mouseArea.hover();
  await page.waitForTimeout(500);
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(box.x + 50 + i * 20, box.y + 50 + i * 20);
    await page.waitForTimeout(300);
  }
    await page.waitForTimeout(1000);

const updatedX = await coordinateX.textContent();
const updatedY = await coordinateY.textContent();
expect(updatedY?.trim()).not.toBe(initialY?.trim());
});

test('Double Click', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const doubleClick = page.getByRole('button', { name: 'Double Click Me' })
  await doubleClick.dblclick();
  await expect(page.getByText('Double Click Success')).toBeVisible();
  })

test('Right Click', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  const rightClick = page.getByText('Right Click Here');
  await rightClick.click({ button: 'right' });
  const contextMenu = page.locator('ul').filter({ hasText: 'Edit' });
  await contextMenu.waitFor({ state: 'visible', timeout: 5000 });
  await expect(page.getByText('Edit')).toBeVisible();
  await expect(page.getByText('Delete')).toBeVisible();
  await expect(page.getByText('Export')).toBeVisible();
});
  
test ('Slider', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);
  await page.locator('#slider').fill('75');
  await expect(page.locator('#slider')).toHaveValue('75');
})