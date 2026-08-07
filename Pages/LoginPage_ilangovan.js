import { BasePage } from "./BasePage_ilangovan";
import { expect } from "@playwright/test";
export class LoginPage extends BasePage{

constructor(page){
    super(page);
    this.username =page.locator('#username');
    this.password =page.locator('#password');
    this.loginbutton =page.locator('#loginBtn');
    this.rememberme=page.locator('#rememberMe');
    this.errormessage=page.locator('#errorMessage');
}
  async login(username,password){
       await this.entertext(this.username,username);
       await this.entertext(this.password,password);
       await this.click(this.loginbutton);
  }

  async clearusername(){
    await this.username.clear();
  }

  async clearpassword(){
    await this.password.clear();
  }

  async selectrememberme(){
    await this.rememberme.check();   
}
  async currentpageURL(){
    await this.getCurrentUrl();   
}

  async loginSucessful(){
  await expect(this.page).toHaveURL(/dashboard/);
  await expect(this.page).toHaveTitle('SmartERP Dashboard');
}
  async error(){
    await expect(this.errormessage).toHaveText('Invalid username or password.');
 }
}