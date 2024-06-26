import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';
import csvParser from 'csv-parser';
import { DataRecord } from './schema';

const prisma = new PrismaClient();

/**
 * Converts all Excel sheets to individual CSV files.
 * @param inputFile Path to the input Excel file.
 * @param outputFolder Path to the folder where the CSV files will be saved.
 */
function excelToCSV(inputFile: string, outputFolder: string) {
    const workbook = XLSX.readFile(inputFile);

    workbook.SheetNames.forEach((sheetName) => {

        const worksheet = workbook.Sheets[sheetName];

        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

        const outputFilePath = `${outputFolder}/${sheetName.replace(/[\s\/]+/g, '_')}.csv`;

        fs.writeFileSync(outputFilePath, csvOutput);
    });
}

/**
 * Reads a CSV file and inserts its data into the SQLite database using Prisma.
 * @param csvFile Path to the CSV file.
 */
async function csvToSQLite(csvFile: string) {
    const records: { name: string; email: string }[] = [];

    fs.createReadStream(csvFile)
        .pipe(csvParser())
        .on('data', (data: DataRecord) => records.push(data))
        .on('end', async () => {
            for (const record of records) {
                await prisma.user.create({
                    data: {
                        name: record.name,
                        email: record.email,
                    },
                });
            }
            console.log('CSV data has been uploaded to SQLite');
            await prisma.$disconnect();
        });
}

excelToCSV('../../../../bbd.xlsx', '../../../../file.csv');

csvToSQLite('../../../../file.csv/Sheet1.csv');


// import * as fs from 'fs';
// import * as XLSX from 'xlsx';
// import { PrismaClient } from '@prisma/client';
// import * as csvParser from 'csv-parser';
// import { DataRecord } from './schema'; // Asegúrate de que la ruta sea correcta

// export class UploadData {
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
