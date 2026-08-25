import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage_MaheshP.js';

export const test = base.extend({

  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    

    await use(loginPage);
  }

});
export{ expect };