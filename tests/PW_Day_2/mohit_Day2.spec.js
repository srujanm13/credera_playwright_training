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
    const coordX = page.locator("#x");
    const coordY = page.locator("#y");
    const box = await mouseArea.boundingBox();
    console.log(box);
    const initialX = await coordX.textContent();
    const initialY = await coordY.textContent();
    console.log("Initial X:", await coordX.textContent());
    console.log("Initial Y:", await coordY.textContent());
    await mouseArea.hover();
    for (let i = 0; i < 5; i++) {
        await page.mouse.move(
        box.x + 50 + i * 20,
        box.y + 50 + i * 20
        );
    }
    console.log("After Move X:", await coordX.textContent());
    console.log("After Move Y:", await coordY.textContent());
    await expect(coordX).not.toHaveText(initialX);
    await expect(coordY).not.toHaveText(initialY);
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
    await expect(page.locator("#upload")).toHaveValue(/mohit_Day2\.spec\.js/);
})