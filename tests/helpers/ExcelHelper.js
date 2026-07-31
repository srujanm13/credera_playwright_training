import { Workbook } from 'exceljs';

// Convert CSV to Excel
export async function csvToXlsx(csvPath, xlsxPath) {

    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('sheet1');

    const fs = await import('fs/promises');

    const content = await fs.readFile(csvPath, 'utf8');

    const rows = content
        .trim()
        .split(/\r?\n/)
        .map(row => row.split(','));

    rows.forEach(row => worksheet.addRow(row));

    await workbook.xlsx.writeFile(xlsxPath);
}

// Update customer ID
export async function updateCustomerId(filePath, oldId, newId) {

    const workbook = new Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('sheet1');

    worksheet.eachRow(row => {

        row.eachCell(cell => {

            if (String(cell.value) === oldId) {
                cell.value = newId;
            }

        });

    });

    await workbook.xlsx.writeFile(filePath);
}

// Convert Excel back to CSV
export async function xlsxToCsv(xlsxPath, csvPath) {

    const workbook = new Workbook();

    await workbook.xlsx.readFile(xlsxPath);

    const worksheet = workbook.getWorksheet('sheet1');

    const fs = await import('fs/promises');

    let csv = '';

    worksheet.eachRow(row => {

        csv += row.values.slice(1).join(',') + '\n';

    });

    await fs.writeFile(csvPath, csv);
}