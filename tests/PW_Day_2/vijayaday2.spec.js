import pkg from 'exceljs';
const { Workbook } = pkg;
import { test, expect } from '@playwright/test';
import { loginToSmartERP, openCustomersPage } from '../helpers/smarterp.js';
import { promises as fs } from 'fs';
import { join } from 'path';


async function csvToXlsx(csvPath, xlsxPath) {
  const content = await fs.readFile(csvPath, 'utf8');
  const rows = content
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split(','));

  const workbook = new Workbook()
  const worksheet = workbook.addWorksheet('sheet1')

  rows.forEach((row) => worksheet.addRow(row));
  await workbook.xlsx.writeFile(xlsxPath);
}
async function xlsxToCsv(xlsxPath, csvPath) {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(xlsxPath);
  const worksheet = workbook.worksheets[0];

  const lines = [];
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const cells = row.values.slice(1).map((value) => {
      const text = value == null ? '' : String(value);
      if (/[",\r\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    });
    lines.push(cells.join(','));
  });

  await fs.writeFile(csvPath, lines.join('\n'), 'utf8');
}
async function writeExcelTest(searchText,replaceText,filePath)
{
    
  const workbook = new Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('sheet1');
  const output= await readExcel(worksheet,searchText);

  const cell = worksheet.getCell(output.row,output.column);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);

}
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}
// writing test to export the customers then update the id of a customer and import it back and assert if the customers table reflect the replaced id.
test('Upload download excel validation',async ({page})=>
{
  let searchtext ='1001'
  let replacetext ='1050'
  await loginToSmartERP(page)
  await openCustomersPage(page)
  await expect(page.locator('//tbody//tr[1]//td[2]')).toHaveText('1001');
  const downloadPromise = page.waitForEvent('download');
await page.getByRole('button', { name: 'Export CSV' }).click();

const download = await downloadPromise;

const downloadDir = join(process.cwd(), 'downloads');
await fs.mkdir(downloadDir, { recursive: true });

const csvPath = join(downloadDir, 'customers.csv');
await download.saveAs(csvPath);

const xlsxPath = join(downloadDir, 'customers.xlsx');
await csvToXlsx(csvPath, xlsxPath);
await writeExcelTest(searchtext,replacetext,xlsxPath);

const convertedCsvPath = join(downloadDir, `customers-converted-${Date.now()}.csv`);
await xlsxToCsv(xlsxPath, convertedCsvPath);

await page.getByRole('button', { name: 'Import CSV' }).click();
await page.locator('input[accept=".csv"]').setInputFiles(convertedCsvPath);
await page.locator('#rowsPerPage').selectOption("100")
await page.waitForTimeout(3000)
const idcolumn = page.locator('//tbody//tr//td[2]');
   const ids= await idcolumn.allTextContents()
   console.log(ids)
   expect(ids).toContain(replacetext);        

})
