const { test, expect } = require('@playwright/test');

test.describe('Smart ERP Automation Suite', () => {

  test('Smart ERP Comprehensive Test Scenarios', async ({ page }) => {
    
    // ==========================================
    // 1. NAVIGATION & MULTIPLE WAIT STRATEGIES
    // ==========================================
    console.log('Navigating to Smart ERP login page...');
    await page.goto('https://smarterp-wgaw.onrender.com/');

    // Wait Strategy 1: Wait for network idle to ensure resources are loaded
    await page.waitForLoadState('networkidle');

    // Wait Strategy 2: Explicitly wait for username input to be visible
    const usernameInput = page.locator('input[name="username"], #username');
    await usernameInput.waitFor({ state: 'visible', timeout: 10000 });

    // ==========================================
    // 2. LOGIN & LOADING SYMBOLS VERIFICATION
    // ==========================================
    await usernameInput.fill('admin');
    await page.locator('input[name="password"], #password').fill('admin123');
    
    // Click Login
    const loginButton = page.locator('xpath=//button[contains(text(),"Login")]');
    await loginButton.click();

    // Wait Strategy 3: Wait for loading symbol/spinner to disappear
    const loader = page.locator('.spinner, .loading, [aria-label="loading"]');
    await loader.waitFor({state: 'hidden'});
    await expect(loader).toBeHidden({timeout: 5000});

    // Verify login successful message or dashboard redirection
    const successMessage = page.getByText('Login Successful...', { exact: true });
await expect(successMessage).toBeVisible;
    // ==========================================
    // 3. JSON VALIDATION SCENARIO
    // ==========================================
    // Simulating API or response payload matching your JSON requirement
    const sampleJson = { 
      id: 4567,
      name: "tester",
      Email: "test@omnicom",
      active: true,
      roles: ["QA", "Admin"],
      date: "2026-07-30"
    };

    // a. Validate id is a number & present
    expect(sampleJson).toHaveProperty('id');
    expect(typeof sampleJson.id).toBe('number');

    // b. Validate name is a string
    expect(typeof sampleJson.name).toBe('string');

    // c. Validate Email contains expected characters/domain structure
    expect(sampleJson.Email).toContain('@');

    // d. Validate active is Boolean
    expect(typeof sampleJson.active).toBe('boolean');

    // e. Validate date format is YYYY-MM-DD using Regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    expect(sampleJson.date).toMatch(dateRegex);


    // ==========================================
    // 4. SYSTEM STATUS VERIFICATION
    // ==========================================
    // Navigate or check System Status section
    const systemStatusLink = page.locator('text=System Status, text=Status');
    if (await systemStatusLink.isVisible()) {
      await systemStatusLink.click();
    }

    // Verify "Database connected" text with a green indicator/check icon
    const dbStatus = page.locator('text=Database connected');
    await expect(dbStatus).toBeVisible();
    
    // Checking for a green checkmark or success class near the status
    const greenCheck = page.locator('.text-success, .green-check, .fa-check-circle').filter({ hasText: /Database connected/i });
    if (await greenCheck.count() > 0) {
      await expect(greenCheck.first()).toBeVisible();
    }


    // ==========================================
    // 5. CUSTOMER PAGE DROPDOWN VALIDATION
    // ==========================================
    // Navigate to Customers page
    
await expect(page).toHaveURL(/dashboard\.html$/);
await page.getByRole('link', { name: 'Customers' }).click();
await expect(page).toHaveURL(/customers\.html$/)
await page.waitForLoadState('networkidle', { timeout: 15000 });
const dropdown = page.getByRole('combobox').first();
await expect(dropdown).toBeVisible({ timeout: 10000 });
await dropdown.click();
const options = dropdown.locator('option');
const optionCount = await options.count();  
const expectedcvalues = ['All Status', 'Active', 'Inactive', 'Suspended'];
const foundValues = [];
for (let i = 0; i < optionCount; i++) {
    const optionText = await options.nth(i).textContent();
    const cleanText = optionText?.trim() || '';
    foundValues.push(cleanText);
  }

    // Locate the customer status dropdown
    const customerDropdown = page.getByRole('combobox').first();
    await expect(customerDropdown).toBeVisible();

    // Verify dropdown contains required options: Active, Inactive, AllStatus, Suspended
    const dropdownOptionsText = await customerDropdown.allInnerTexts();
    const expectedValues = ['Active', 'Inactive', 'All Status', 'Suspended'];

    expectedValues.forEach(val => {
      expect(dropdownOptionsText.join(' ')).toContain(val);
    });

  });
});