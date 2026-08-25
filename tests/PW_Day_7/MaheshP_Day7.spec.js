import{test, expect} from '@playwright/test';
import path from 'path';
import { loginToSmartERP, openPlayground } from "../helpers/smarterp";

test('Mouse_Hover_Test', async ({ page }) => {
    //Go to smarterp login
    await loginToSmartERP(page);
    //Go to Open playground page
    await openPlayground(page);
    await page.locator('.hover-card').hover();
    await page.waitForTimeout(3000);
    await expect(page.locator('.hover-card')).toBeVisible();
    const tooltipmsg = await page.locator('.tooltip');
    expect(await tooltipmsg.textContent()).toBe('Customer Details');
    console.log("Mouse Hovered content: " + await tooltipmsg.textContent());
});

test('Drag_and_Drop_Test', async ({ page }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    await page.waitForTimeout(3000);
    await page.locator('#dragItem').dragTo(page.locator('#dropZone'));
    console.log("Drag and Drop functionality is working");
});

test('Mouse_Hover_X&Y_Coordiates_Test', async ({ page }) => {
    await loginToSmartERP(page);
    await openPlayground(page);
  const mouseArea = page.locator("#mouseArea");
  await mouseArea.scrollIntoViewIfNeeded();
  const box = await mouseArea.boundingBox();
  console.log(box);
  if (box){
    await page.mouse.move(box.x +1100, box.y + 40);
    console.log("Page scrolled to Mouse cordinate");
    await page.waitForTimeout(5000);
    await expect(page.locator("#x")).toHaveText("1098");
    await expect(page.locator("#y")).toHaveText("38");
    console.log("X coordinate: "+ await page.locator("#x").textContent());
    console.log("Y coordinate: "+ await page.locator("#y").textContent());
  }});

  test('Double_Click_Test', async ({page}) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    await page.getByRole("button",{name:'Double Click Me'}).dblclick();
    await page.waitForTimeout(5000);
    await expect(page.locator("#doubleMessage")).toHaveText("Double Click Success");
    console.log("Double click successful message: "+ await page.locator("#doubleMessage").textContent());
    
  }); 

  test('Right_Click_Test', async ({page}) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const rightMenu = await page.locator('#rightClickBox');
    await rightMenu.scrollIntoViewIfNeeded();
    await rightMenu.click({button:'right'});
    const menu=await page.locator('//ul[@id="contextMenu"]/li').allTextContents();
    console.log(menu);
    await expect(menu).toContain('Edit');
    await expect(menu).toEqual(['Edit','Delete','Export']);

  });

  test('Slider_Test', async ({page}) => {
    await loginToSmartERP(page);
    await openPlayground(page);
    const slider = page.locator('input[type="range"]');
    await slider.scrollIntoViewIfNeeded();

    // Change slider value and trigger events
    await slider.evaluate((element) => {
      element.value = '70';
      element.dispatchEvent(
          new Event('input', { bubbles: true })
          );

      element.dispatchEvent(
          new Event('change', { bubbles: true })
          );
    });
    // Verify slider itself
    await expect(slider).toHaveValue('70');
    await page.waitForTimeout(5000);
    console.log('Slider value:', await slider.inputValue());
  });


test('File_Upload_Test', async ({ page }) => {

    await loginToSmartERP(page);
    await openPlayground(page);

    // 4. Scroll to Upload section
    const uploadCTA = page.locator("#upload");

    await uploadCTA.scrollIntoViewIfNeeded();

   const filePath = 'C:\\Users\\mahesh.polisetty\\Downloads\\Sample.txt';

    // Locate Choose File control
    const fileInput = page.locator('input[type="file"]');
    await page.waitForTimeout(5000);
    // Upload the file
    await fileInput.setInputFiles(filePath);
    await page.waitForTimeout(5000);
    // Verify selected file
    await expect(fileInput).toHaveValue(/Sample\.txt/);
    await page.waitForTimeout(5000);

    console.log('File uploaded successfully');
});

test('Handle_iframes_Test', async ({ page }) => {

    await loginToSmartERP(page);
    await openPlayground(page); 

    // Scroll to Frames section
    await page.getByText('Frames', { exact: true }).scrollIntoViewIfNeeded();

   
    //await page.getByRole('button', { name: 'Customer Records' }).click();
    const allframes = await page.frames();
    console.log("Number of frames "+allframes.length);
    const erpFrame = await page.frameLocator('#demoFrame');
    console.log('Frames:', page.frames().map(f => f.url()));

    console.log('Customers count:', await erpFrame.getByText('Customers', { exact: true }).count());


    await page.waitForTimeout(3000);
    await erpFrame.getByText("Products").click();
    console.log("Products is clicked")
    // Verify Customers is clickable
    await page.waitForTimeout(3000);
    await erpFrame.getByText("Customers").click();
    console.log("CustomersMenu is clicked")
    await erpFrame.getByText('Orders', { exact: true }).click();
    console.log('Iframe elements handled successfully');
});

test('Handle windows_Test', async ({ page }) => {
  await loginToSmartERP( page);
  await openPlayground(page);
  // Popup
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator("#openWindowBtn").click()
  ]);

  await popup.waitForLoadState();
  console.log('Popup:', popup.url());
  console.log('Popup title:', await popup.title());
  // Work inside popup
  console.log(await popup.locator('body').innerText());
  await page.waitForTimeout(3000)
  await popup.getByText('Close Popup',{exact: true}).click();
  await page.waitForTimeout(3000)

  // Named/new window
  const [newWindow] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('button', { name: 'Open Named Window' }).click()
  ]);
 
  await newWindow.waitForLoadState();
  await page.waitForTimeout(5000)
  console.log('New window:', newWindow.url());
  console.log('Named window title:', await newWindow.title());
  console.log("New Window description: " + await newWindow.locator('body').innerText());
  await newWindow.close();
  await page.waitForTimeout(3000)
});


test('Handle_tabs_Test', async ({ page }) => {
  await loginToSmartERP( page);
  await openPlayground(page);

  // Customer Tab
  await page.getByRole('button', { name: 'Customer Tab' }).click();
  await expect(page.getByText('Customer Overview', { exact: true })).toBeVisible();


  // Orders Tab
  await page.getByRole('button', { name: 'Orders Tab' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('Orders Snapshot', { exact: true })).toBeVisible();

  // Reports Tab
  await page.getByRole('button', { name: 'Reports Tab' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('Reports Summary', { exact: true })).toBeVisible();

});
    

test('handle alerts, confirm and prompt', async ({ page }) => {
  await loginToSmartERP(page);
  await openPlayground(page);

  // Handle Alert
  page.once('dialog', async dialog => {
  console.log(`Alert message: ${dialog.message()}`);
  await dialog.accept(); // Clicks OK and closes the alert
});
  const alertButton = await page.getByRole('button', { name: 'Show Alert' });
  await alertButton.click();
  console.log("Alert successful message: "+ await page.locator("#alertResult").textContent());

  // Handle Confirm 
  page.once('dialog', async dialog => {
  console.log(`Confirm message: ${dialog.message()}`);
  await dialog.accept();  
});
  const confirmButton = await page.getByRole('button', { name: 'Show Confirm' });
  await confirmButton.click();
  console.log("Confirm successful message: "+ await page.locator("//*[@id='alertResult']").textContent());

  page.once('dialog', async dialog => {
  await dialog.dismiss();      
});
  await confirmButton.click();
  console.log("Dismiss successful message: "+ await page.locator("//*[@id='alertResult']").textContent());


  // Handle Prompt
  page.once('dialog', async dialog => {
  console.log(`Prompt message: ${dialog.message()}`);
  await dialog.accept('Test Prompt');
   
});
  const promptButton = await page.getByRole('button', { name: 'Show Prompt' });
  await promptButton.click();
  console.log("Prompt successful message: "+ await page.locator("#alertResult").textContent())

 
});