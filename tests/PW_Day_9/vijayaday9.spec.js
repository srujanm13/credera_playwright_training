
        // d. active boolean
        expect(typeof data.active).toBe("boolean");

        // e. date format YYYY-MM-DD
        expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        // f. id field present
        expect(data).toHaveProperty("id");

    });

    test('5 - Verify Database Connected with green check', async ({ page }) => {

        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");

        await expect(page.locator("text=Database connected")).toBeVisible();

        // Verify green icon/check
        const statusIcon = page.locator("text=Database connected").locator("..").locator("svg");

        await expect(statusIcon).toBeVisible();

    });

    test('6 - Verify Customer Status Dropdown Values', async ({ page }) => {

        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click("button[type='submit']");

        await page.click("text=Customers");

        const options = await page.locator("select option").allTextContents();

        const trimmed = options.map(o => o.trim()).filter(o => o.length > 0);
        expect(trimmed).toEqual([
            "All Status",
            "Active",
            "Inactive",
            "Suspended"
        ]);

    });

});