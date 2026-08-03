import { test, expect } from '@playwright/test';

test.describe('Keerthy Day9 assignment', () => {

  //Login Before Each Test
  test.beforeEach(async ({ page }) => {

    test.setTimeout(50000);
    await page.goto('https://smarterp-wgaw.onrender.com/');

    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');

    await page.locator("button[type='submit']").click();

    await expect(
      page.getByText('Login Successful')
    ).toBeVisible();

    await page.waitForLoadState('networkidle');
  });

  //Verify Login Successful Message
  test('Verify Login Successful Message', async ({ page }) => {
    await expect(page.getByText('Login Successful')).toBeVisible();
  });

  //Verify Loading Symbol Disappears
  test('Verify Loading Symbol Disappears', async ({ page }) => {

    const loader = page.locator('.loading, .spinner, #loading');
    if (await loader.count() > 0) {
      await expect(loader.first()).toBeHidden();
    }
  });

  // Validate JSON Data
  test('Validate JSON Data', async () => {

    const json = {
      id: 2767,
      name: 'keerthy',
      Email: 'test@omnicom',
      active: true,
      roles: ['QA', 'Admin'],
      date: '2026-07-30'
    };

    expect(typeof json.id).toBe('number');
    expect(typeof json.name).toBe('string');
    expect(json.Email).toContain('@');
    expect(typeof json.active).toBe('boolean');
    expect(json.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(json).toHaveProperty('id');

  });

  //Verify Database Connected Message
  test('Verify Database Connected', async ({ page }) => {
    await expect(page.getByText('Database connected')).toBeVisible();

  });

  //Verify Customer Status Dropdown
  test('Verify Customer Status Dropdown', async ({ page }) => {

    await page.locator('#menuCustomers').click();

    const dropdown = page.locator('#statusFilter');

    await expect(dropdown).toBeVisible();

    const options = await dropdown.locator('option').allTextContents();

    const cleanedOptions = options.map(option => option.trim());

    console.log('Dropdown Options:', cleanedOptions);

    expect(cleanedOptions.length).toBeGreaterThan(0);

    expect(cleanedOptions).toEqual(
      expect.arrayContaining([
        'Active',
        'Inactive'
      ])
    );

  });
});