// import {test, expect} from '@playwright/test'
// const ExcelJs = require('exceljs');

// async function WriteExcelTest(searchText, replaceText, filePath){

//     const workbook = new ExcelJs.Workbook();
//     await workbook.xlsx.readFile(filePath)
//     const worksheet = workbook.getWorksheet('Sheet1')
//     readExcel(worksheet, searchText, replaceText);

// //     const cell = worksheet.getCell(3,2)
// //     cell.value = "Republic";
//     await workbook.xlsx.writeFile(filePath)

// }

// async function readExcel(worksheet, searchText,replaceText){
//     worksheet.eachRow((row, rowNumber)=>{
//         row.eachCell((cell, colNumber)=>{
//            console.log(cell.value);
//            if(cell.value === searchText){
//                console.log(rowNumber)
//                console.log(colNumber)

//             const cell = worksheet.getCell(rowNumber,colNumber)
//             cell.value = replaceText;
           
//            }
//         })
//     })
// }



// test('Upload download excel validation', async({page})=>{
//     const textSearch = 'Banana'
//     const changedValue = 'Republic'
//     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
//     const downloadPromise = page.waitForEvent('download');
//     await page.getByRole('button', {name:'Download'}).click();
//     await downloadPromise;
//     WriteExcelTest('Banana', 'Republic', "C:/Users/Dell/Downloads/download.xlsx");
//     await page.locator("#fileinput").click();
//     await page.locator("#fileinput").setInputFiles("Ifeanyi Akanwa/Downloads/download.xlsx");//to use this make sure the upload button has a "input type='file'" on your locator
//     const textLocator = await page.getByText(textSearch)
//     //const desiredRow = await page.getByRole('row').filter({has:textLocator})
//     await expect(textLocator).toContainText(changedValue);

// })
