import { test, expect } from '@playwright/test';


test('Mouse Hover', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page
  await page.getByText('Hover Me').hover(); // hover action
  await expect(page.getByText('Customer Details')).toBeVisible();
})

test('Drag & Drop', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page
  const drag = await page.getByText('Task 1');   // darggable element
  const drop = await page.getByText('Drop Here'); // to drop it here
  await drag.dragTo(drop);   // method for drag and drop
   await page.waitForTimeout(2000);
  await expect(drop).toContainText('Task 1');  

})

test('Mouse Movement', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page

    const mouseArea = page.locator("#mouseArea");
    const coordinateX = page.locator("#x");
    const coordinateY = page.locator("#y");
    const box = await mouseArea.boundingBox();
    console.log(box);
    const initialX = await coordinateX.textContent();
    const initialY = await coordinateY.textContent();
    console.log("Initial X:", await coordinateX.textContent());
    console.log("Initial Y:", await coordinateY.textContent());
    await mouseArea.hover();
    for (let i = 0; i < 5; i++) {
        await page.mouse.move(
        box.x + 50 + i * 20,
        box.y + 50 + i * 20
        );
    }
    console.log("After Move X:", await coordinateX.textContent());
    console.log("After Move Y:", await coordinateY.textContent());
    await page.waitForTimeout(1000);
    await expect(coordinateX).not.toHaveText(initialX);
    await expect(coordinateY).not.toHaveText(initialY);
})


test('Double Click', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page
  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await page.waitForTimeout(2000);
  await expect(page.getByText('Double Click Success')).toBeVisible();
  })

  test ('Right Click', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page
  const rightClick = await page.getByText('Right Click Here');
  await rightClick.click({ button: 'right' });
  await page.waitForTimeout(3000);
  await expect(page.getByText('Edit')).toBeVisible();
  await expect(page.getByText('Delete')).toBeVisible();
  await expect(page.getByText('Export')).toBeVisible();
  })
  
test ('Slider', async ({ page }) => {
  await page.goto('https://smarterp-wgaw.onrender.com/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard\.html$/)
  await page.getByText('🎮 Playground').click(); // navigating to the playground page.
  await page.locator('#slider').fill('75');
  await expect(page.locator('#slider')).toHaveValue('75');
})