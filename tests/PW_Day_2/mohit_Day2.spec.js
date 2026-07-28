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
    const box = await mouseArea.boundingBox();
    await mouseArea.hover();
    await page.mouse.move(box.x + 50, box.y + 50);
    const coordX = page.locator('//section//p//following::span[@id="x"]');
    const coordY = page.locator('//section//p//following::span[@id="y"]');
    await expect(coordX).toHaveText("630");
    await expect(coordY).toHaveText("90");
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
    await page.locator("#upload").setInputFiles("example.spec.js");
    await page.waitForTimeout(5000);
    await expect(page.locator("#upload")).toHaveValue(/example\.spec\.js/);
})