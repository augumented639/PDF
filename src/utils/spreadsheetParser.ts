import * as XLSX from 'xlsx';
import { ParsedWorkbook } from '../types';
import { parseWorkbookFromXlsx } from './sampleData';

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB reasonable for in-browser client side

export interface ParseResult {
  success: boolean;
  workbook?: ParsedWorkbook;
  errorMessage?: string;
}

export async function parseSpreadsheetFile(file: File): Promise<ParseResult> {
  // File validation
  if (!file) {
    return {
      success: false,
      errorMessage: 'No file was provided for conversion.',
    };
  }

  const fileName = file.name.toLowerCase();
  const isCSV = fileName.endsWith('.csv');
  const isXLS = fileName.endsWith('.xls');
  const isXLSX = fileName.endsWith('.xlsx');

  if (!isCSV && !isXLS && !isXLSX) {
    return {
      success: false,
      errorMessage: `Unsupported file type: "${file.name}". Please upload a valid .csv, .xls, or .xlsx spreadsheet file.`,
    };
  }

  if (file.size === 0) {
    return {
      success: false,
      errorMessage: 'The selected spreadsheet file is empty (0 bytes). Please select a file containing tabular data.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      errorMessage: `The file exceeds the browser processing limit of 50MB (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please split your file or reduce row volume.`,
    };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Read workbook with xlsx
    // cellDates: true ensures dates are parsed nicely
    const workbook = XLSX.read(arrayBuffer, {
      type: 'array',
      cellDates: true,
      cellNF: true,
      cellText: true,
      raw: false, // get formatted text representations
    });

    if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
      return {
        success: false,
        errorMessage: 'Sorry, we couldn’t read any worksheets in this spreadsheet. Please verify that the file is not corrupted and try again.',
      };
    }

    const parsed = parseWorkbookFromXlsx(workbook, file.name, file.size, file.type);

    // Validate that at least one sheet has columns or rows
    const totalDataRows = parsed.sheets.reduce((acc, s) => acc + s.rows.length, 0);
    if (totalDataRows === 0 && parsed.sheets.every(s => s.headers.length === 1 && s.headers[0] === 'Empty')) {
      return {
        success: false,
        errorMessage: 'The uploaded spreadsheet does not appear to contain any data rows or recognized columns. Please verify that the file is not corrupted and try again.',
      };
    }

    return {
      success: true,
      workbook: parsed,
    };
  } catch (err: any) {
    console.error('Spreadsheet parse error:', err);
    let errorMsg = 'Sorry, we couldn’t read this spreadsheet. Please verify that the file is not corrupted and try again.';
    if (err && err.message && typeof err.message === 'string') {
      if (err.message.includes('password') || err.message.includes('encrypted')) {
        errorMsg = 'This spreadsheet is password-protected or encrypted. Please remove password protection before converting to PDF.';
      } else if (err.message.includes('Unsupported')) {
        errorMsg = 'This spreadsheet format is not currently supported or uses legacy features. Please re-save as a standard .xlsx or .csv and try again.';
      }
    }
    return {
      success: false,
      errorMessage: errorMsg,
    };
  }
}
