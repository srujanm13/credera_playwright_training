import {test,expect} from "@playwright/test";
import { loginToSmartERP, openPlayground } from "../helpers/smarterp";

test("Hover Action", async ({page})=>{
   //login
   await loginToSmartERP(page);
   //open playground
   await openPlayground(page);
   await page.locator(".hover-card").hover();
   await expect(page.locator(".tooltip")).toHaveText("Customer Details");
})

test("Drag & Drop", async ({page})=>{
   //login
   await loginToSmartERP(page);
   //open playground
   await openPlayground(page);
   await page.locator("#dragItem").dragTo(page.locator("#dropZone"));
   await expect(page.locator("#dropZone")).toHaveAttribute("style");
})

test("Mouse Coordinates", async ({page})=>{
    //login
    await loginToSmartERP(page);
    //open playground
    await openPlayground(page);
    const mouseArea = page.locator("#mouseArea");
    await mouseArea.scrollIntoViewIfNeeded();
    const box = await mouseArea.boundingBox();
    if (box) {
    await page.mouse.move(box.x + 80, box.y + 60);
    await expect(page.locator("#x")).toHaveText("78");
    await expect(page.locator("#y")).toHaveText("58");
    }
})

test("Double Click", async({page})=>{
    //login
    await loginToSmartERP(page);
    //open playground
    await openPlayground(page);
    await page.getByRole("button",{name:'Double Click Me'}).dblclick();
    await expect(page.locator("#doubleMessage")).toHaveText("Double Click Success");
})

test("Right Click", async ({page})=>{
    //login
    await loginToSmartERP(page);
    //open playground
    await openPlayground(page);
    await page.locator("#rightClickBox").click({button:'right'});
    await expect(page.locator("#contextMenu")).toHaveAttribute("style");
})

test("Slider", async ({page})=>{
    //login
    await loginToSmartERP(page);
    //open playground
    await openPlayground(page);
    await page.locator("#slider").fill("80");
    await(expect(page.locator("#slider"))).toHaveValue("80");
})

test("Upload", async ({page})=>{
    //login
    await loginToSmartERP(page);
    //open playground
    await openPlayground(page);
    await page.locator("#upload").setInputFiles(__filename);
    
    await page.locator('#upload').setInputFiles('tests/PW_Day_2/Sankalp_Day_7.spec.js');
    const fname=await page.locator('#fileName').textContent();
    console.log(fname);
})
