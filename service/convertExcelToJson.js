const xlsx = require('xlsx');

async function convertExcelToJson(workbook) {
    try {
        // Parse the uploaded Excel file
        // Assuming there's only one sheet in the Excel file
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        return { status: true, data: jsonData };
    } catch (error) {
        console.error("Catch block of convertExcelFunction =-=-=-=-=-=-=-=-=-=", error);
        return { status: false, data: [] };
    }
}

module.exports.convertExcelToJson = convertExcelToJson;