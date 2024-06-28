import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import csvParser from 'csv-parser';
import { DataRecord } from './schema';

const prisma = new PrismaClient();

function excelToCSV(inputFile: string, outputFolder: string) {
    const workbook = XLSX.readFile(inputFile);
    workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
        const outputFilePath = `${outputFolder}/${sheetName.replace(/[\s\/]+/g, '_')}.csv`;
        fs.writeFileSync(outputFilePath, csvOutput);
    });
}

async function csvToSQLite(csvFile: string) {
    const records: DataRecord[] = [];
    fs.createReadStream(csvFile)
        .pipe(csvParser())
        .on('data', (data: DataRecord) => records.push(data))
        .on('end', async () => {
            for (const record of records) {
                await prisma.user.create({ data: record });
            }
            console.log('CSV data has been uploaded to SQLite');
            await downloadDatabase('output.xlsx');
            await prisma.$disconnect();
        });
}

async function downloadDatabase(outputFile: string) {
    const users = await prisma.user.findMany();
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, outputFile);
    console.log('Database has been downloaded as Excel');
}

const inputFilePath = '../../../../bbd.xlsx';
const outputFolder = '../../../../csv_output';
const csvFilePath = '../../../../csv_output/Sheet1.csv';

excelToCSV(inputFilePath, outputFolder);
csvToSQLite(csvFilePath);



// import * as fs from 'fs';
// import * as XLSX from 'xlsx';
// import { PrismaClient } from '@prisma/client';
// import * as csvParser from 'csv-parser';
// import { DataRecord } from './schema'; // Asegúrate de que la ruta sea correcta

// export class Converter {
//     private prisma: PrismaClient;

//     constructor() {
//         this.prisma = new PrismaClient();
//     }

//     public excelToCSV(inputFile: string, outputFolder: string): void {
//         const workbook = XLSX.readFile(inputFile);

//         workbook.SheetNames.forEach((sheetName) => {
//             const worksheet = workbook.Sheets[sheetName];
//             const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
//             const outputFilePath = `${outputFolder}/${sheetName.replace(/[\s\/]+/g, '_')}.csv`;
//             fs.writeFileSync(outputFilePath, csvOutput);
//             console.log(`Converted ${sheetName} to CSV at ${outputFilePath}`);
//         });
//     }

//     public async csvToSQLite(csvFile: string): Promise<void> {
//         const records: DataRecord[] = [];

//         fs.createReadStream(csvFile)
//             .pipe(csvParser())
//             .on('data', (data: DataRecord) => records.push(data))
//             .on('end', async () => {
//                 for (const record of records) {
//                     await this.prisma.user.create({
//                         data: record,
//                     });
//                 }
//                 console.log('CSV data has been uploaded to SQLite');
//                 await this.prisma.$disconnect();
//             });
//     }
// }
