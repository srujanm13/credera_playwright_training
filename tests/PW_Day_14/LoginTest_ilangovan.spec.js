import{test, expect} from '../../Fixtures/LoginFixture_ilangovan.js';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config({path:path.join(__dirname,'../../env/.env.ilangovan')})

test('credentials from env file',async({loginPage})=>{
    await loginPage.navigate('https://smarterp-wgaw.onrender.com/');
    await loginPage.login(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    await loginPage.loginSucessful();
});

test('credentials from cmd',async({loginPage})=>{
    await loginPage.navigate('https://smarterp-wgaw.onrender.com/');
    await loginPage.login(process.env.CMD_USERNAME, process.env.CMD_PASSWORD);
    await loginPage.loginSucessful();
});