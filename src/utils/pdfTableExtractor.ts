import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import { ParsedSheet, ParsedWorkbook } from '../types';

// Set worker source for pdfjs-dist
// In Vite/modern browsers, pointing to CDN matching pdfjsLib.version or unpkg worker ensures reliable operation without worker bundle issues
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

interface TextItemWithPos {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PDFExtractionResult {
  success: boolean;
  workbook?: ParsedWorkbook;
  pageCount?: number;
  errorMessage?: string;
}

export async function extractTablesFromPDF(file: File | Blob, fileName: string): Promise<PDFExtractionResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      useSystemFonts: true,
    });

    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) {
      return {
        success: false,
        errorMessage: 'The PDF document does not contain any readable pages.',
      };
    }

    const sheets: ParsedSheet[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items: TextItemWithPos[] = [];

      for (const item of textContent.items) {
        if ('str' in item && typeof item.str === 'string') {
          const str = item.str.trim();
          if (str.length > 0) {
            const transform = item.transform; // [scaleX, skewY, skewX, scaleY, x, y]
            items.push({
              text: item.str,
              x: transform[4],
              y: transform[5],
              width: item.width || 0,
              height: item.height || 0,
            });
          }
        }
      }

      if (items.length === 0) {
        // Page has no text (e.g. scanned image or blank)
        continue;
      }

      // Group items into rows by Y coordinate
      // PDF coordinates have Y=0 at bottom, increasing upwards
      // Sort items descending by Y (top to bottom)
      items.sort((a, b) => b.y - a.y);

      const ROW_Y_TOLERANCE = 5.0; // Points tolerance for same line
      const rawRows: TextItemWithPos[][] = [];
      let currentRow: TextItemWithPos[] = [];
      let currentY = items[0].y;

      for (const item of items) {
        if (Math.abs(item.y - currentY) <= ROW_Y_TOLERANCE) {
          currentRow.push(item);
        } else {
          if (currentRow.length > 0) {
            // Sort items in this row left to right (by X)
            currentRow.sort((a, b) => a.x - b.x);
            rawRows.push(currentRow);
          }
          currentRow = [item];
          currentY = item.y;
        }
      }
      if (currentRow.length > 0) {
        currentRow.sort((a, b) => a.x - b.x);
        rawRows.push(currentRow);
      }

      if (rawRows.length === 0) continue;

      // Extract column boundaries or cluster columns
      // Find row with max items or analyze column alignments
      const stringRows = rawRows.map(row => {
        // Merge tokens that are extremely close horizontally (space separated words)
        const cells: string[] = [];
        let currentCell = '';
        let lastRight = -1;

        for (const token of row) {
          const gap = token.x - lastRight;
          // If gap is small (under 8 points), it's part of the same cell/phrase
          if (lastRight >= 0 && gap < 8.0) {
            currentCell += (currentCell.endsWith(' ') || token.text.startsWith(' ') ? '' : ' ') + token.text;
          } else {
            if (currentCell.trim().length > 0) {
              cells.push(currentCell.trim());
            }
            currentCell = token.text;
          }
          lastRight = token.x + token.width;
        }
        if (currentCell.trim().length > 0) {
          cells.push(currentCell.trim());
        }
        return cells;
      }).filter(r => r.length > 0);

      // Determine header row (first row with multiple columns)
      let headerIdx = stringRows.findIndex(r => r.length >= 2);
      if (headerIdx === -1) headerIdx = 0;

      const rawHeaders = stringRows[headerIdx] || ['Col 1'];
      const headers = rawHeaders.map((h, i) => (h && h.trim().length > 0 ? h.trim() : `Column ${i + 1}`));
      const dataRows = stringRows.slice(headerIdx + 1);

      // Pad rows to match headers length
      const normalizedRows = dataRows.map(r => {
        const rowData: (string | number | boolean | null)[] = [];
        for (let i = 0; i < headers.length; i++) {
          rowData.push(r[i] !== undefined ? r[i] : '');
        }
        return rowData;
      });

      sheets.push({
        name: `Page ${pageNum}`,
        headers,
        rows: normalizedRows,
        totalRowCount: normalizedRows.length,
      });
    }

    if (sheets.length === 0) {
      return {
        success: false,
        errorMessage: 'No readable text or tabular structures could be found in this PDF document. Scanned images without OCR cannot be converted to spreadsheets.',
      };
    }

    const workbook: ParsedWorkbook = {
      fileName,
      fileSize: file.size,
      fileType: 'application/pdf',
      lastModified: Date.now(),
      sheets,
      activeSheetIndex: 0,
    };

    return {
      success: true,
      workbook,
      pageCount: numPages,
    };
  } catch (err: any) {
    console.error('PDF extraction error:', err);
    return {
      success: false,
      errorMessage: err?.message || 'Failed to parse and extract data from the PDF file.',
    };
  }
}

// Download helpers for extracted tables
export function downloadWorkbookAsFormat(workbook: ParsedWorkbook, format: 'csv' | 'xlsx' | 'xls') {
  const wb = XLSX.utils.book_new();

  workbook.sheets.forEach(sheet => {
    const sheetData = [sheet.headers, ...sheet.rows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, sheet.name.substring(0, 31)); // 31 chars max in Excel
  });

  const baseName = workbook.fileName.replace(/\.[^/.]+$/, '');
  const outFileName = `${baseName}_converted.${format}`;

  if (format === 'csv') {
    // Export active or first sheet to CSV
    const activeSheet = workbook.sheets[workbook.activeSheetIndex] || workbook.sheets[0];
    const sheetData = [activeSheet.headers, ...activeSheet.rows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const csvContent = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, outFileName);
  } else if (format === 'xlsx') {
    XLSX.writeFile(wb, outFileName, { bookType: 'xlsx' });
  } else if (format === 'xls') {
    XLSX.writeFile(wb, outFileName, { bookType: 'biff8' });
  }
}

function triggerDownload(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
