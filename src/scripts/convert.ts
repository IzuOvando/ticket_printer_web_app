import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import csvParser from 'csv-parser';
import { DataRecord } from '@/app/test/schema';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

function toCamelCase(str: string): string {
    return str.replace(/\s(.)/g, (_, group1: string) => group1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, (_, group1: string) => group1.toLowerCase());
}

function formatDate(value: number | string): string {
    // Assume the value is already identified as a date when this function is called
    if (typeof value === 'number') {
        // Convert Excel serial number to date
        const date = new Date(Date.UTC(0, 0, value - 1));
        return date.toISOString().slice(0, 10);
    }

    if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Return the value as is if it's not a recognized date format
    return String(value);
}


function excelToCSV(inputFile: string, outputFolder: string): string[] {
    const csvFilePaths: string[] = [];
    const workbook = XLSX.readFile(inputFile);

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet['!ref']) {
            console.error(`Sheet ${sheetName} is empty or malformed.`);
            return;
        }

        const range = XLSX.utils.decode_range(worksheet['!ref']);
        let csvOutput = '';
        let dateColumns = new Set<number>();  // To hold the indices of date columns

        // First pass: Identify headers and mark date columns
        if (range.s.r <= range.e.r) {
            let headerRow = [];
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const headerCellRef = XLSX.utils.encode_cell({ c: C, r: range.s.r });
                const headerCell = worksheet[headerCellRef];
                let headerValue = headerCell ? headerCell.v : '';
                headerRow.push(headerValue);
                if (headerValue && typeof headerValue === 'string' && headerValue.toLowerCase().includes('fecha')) {
                    dateColumns.add(C);  // Mark this column as a date column
                }
            }
            csvOutput += '"' + headerRow.map(toCamelCase).join('","') + '"\n'; // Process headers for CamelCase and write to CSV
        }

        // Process data rows
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            let row = [];
            let isRowEmpty = true;
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = { c: C, r: R };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                const cell = worksheet[cellRef];
                let cellValue = cell ? cell.v : '';
                if (cellValue) {
                    isRowEmpty = false;
                }
                if (dateColumns.has(C)) {
                    // Format cellValue as date if it's in a date column
                    cellValue = formatDate(cellValue);
                }
                row.push('"' + cellValue + '"');
            }
            if (isRowEmpty) break;  // Stop processing if the row is completely empty
            csvOutput += row.join(',') + '\n';
        }

        const outputFilePath = path.join(outputFolder, `${sheetName.replace(/[\s\/]+/g, '_')}.csv`);
        fs.writeFileSync(outputFilePath, csvOutput);
        csvFilePaths.push(outputFilePath);
    });

    return csvFilePaths;
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

// Usage
const rootPath = path.resolve(__dirname, '../../');
const inputFilePath = path.resolve(rootPath, 'bbd.xlsx');
const outputFolder = path.resolve(rootPath, 'csv_output');

const csvFilePaths: string[] = excelToCSV(inputFilePath, outputFolder);

// Asynchronously process each CSV file and handle them properly
async function processCSVFiles(csvFilePaths: string[]) {
    for (const csvFilePath of csvFilePaths) {
        await csvToSQLite(csvFilePath);
    }
}

processCSVFiles(csvFilePaths).then(() => {
    console.log('All CSV files have been processed.');
}).catch(error => {
    console.error('Error processing CSV files:', error);
});
