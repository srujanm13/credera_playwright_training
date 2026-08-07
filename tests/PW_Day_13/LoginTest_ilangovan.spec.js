import{test, expect} from '../../Fixtures/LoginFixture_ilangovan.js';

test('Verify successful login',async({loginPage})=>{

    await loginPage.navigate('https://smarterp-wgaw.onrender.com/');
    await loginPage.login('admin','admin123');
    await loginPage.loginSucessful();

});

test('Verify invalid login',async({loginPage})=>{

    await loginPage.navigate('https://smarterp-wgaw.onrender.com/');
    await loginPage.login('admin','adminnn');
    await loginPage.error();

});