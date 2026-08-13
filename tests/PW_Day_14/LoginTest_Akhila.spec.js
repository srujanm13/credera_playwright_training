import { test, expect } from "../../Fixtures/LoginFixture_Akhila.js";
import dtenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dtenv.config({
path: path.join(__dirname, '../../env/.env.Akhila')
});

test("Admin Login Test", async ({ loginPage }) => {
    await loginPage.launchApplication();
    
    console.log(path.join(__dirname, '../../env/.env.Akhila'));
    console.log(__dirname, __filename);
    console.log("uname =", process.env.uname);
    console.log("pswd =", process.env.pswd);
    await loginPage.login(process.env.uname, process.env.pswd); 
    await loginPage.verifySuccessfulLogin();
});
