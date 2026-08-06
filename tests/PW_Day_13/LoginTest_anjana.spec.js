import {test, expect} from '../../fixtures/LoginFixture_anjana'

test("Login as Admin", async ({loginPage})=>{
await loginPage.launchSmarTerp()
await loginPage.login('admin', 'admin123')
await loginPage.verifyUserIsLoggedIn()
})

test("Login as trainer", async ({loginPage})=>{
await loginPage.launchSmarTerp()
await loginPage.login('trainer', 'trainer123')
await loginPage.verifyUserIsLoggedIn()
})