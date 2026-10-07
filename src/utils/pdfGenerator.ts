import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFConfig, ParsedWorkbook, ParsedSheet, GeneratedPDFResult } from '../types';

export const DEFAULT_PDF_CONFIG: PDFConfig = {
  pageSize: 'a4',
  customPageWidthMm: 210,
  customPageHeightMm: 297,
  orientation: 'auto',
  marginType: 'normal',
  customMarginMm: 15,

  fitToPageWidth: true,
  repeatHeader: true,
  showGridlines: true,
  showRowNumbers: true,
  showPageNumbers: true,

  documentTitle: '',
  companyName: '',
  headerText: '',
  footerText: '',
  showDate: true,
  customDateText: '',

  font: 'helvetica',
  fontSize: 8.5,
  headerFontSize: 9.5,
  cellPadding: 2.5,
  borderVisibility: true,
  textAlignment: 'left',
  numberAlignment: 'right',
  theme: 'corporate-blue',
  headerBgColor: '#1e40af',
  headerTextColor: '#ffffff',
  alternateRowBgColor: '#f8fafc',
  alternateRows: true,

  sheetSelectionMode: 'all',
  selectedSheetNames: [],
  selectedColumnsBySheet: {},
  rowRangeStart: 1,
  rowRangeEnd: 0,
  includeSheetTitle: true,
};

export const THEME_PALETTES: Record<string, { name: string; headerBg: string; headerText: string; altBg: string }> = {
  'corporate-blue': {
    name: 'Corporate Blue',
    headerBg: '#1e40af',
    headerText: '#ffffff',
    altBg: '#f0f7ff',
  },
  'slate-dark': {
    name: 'Modern Slate',
    headerBg: '#1e293b',
    headerText: '#ffffff',
    altBg: '#f8fafc',
  },
  'emerald': {
    name: 'Emerald Forest',
    headerBg: '#065f46',
    headerText: '#ffffff',
    altBg: '#f0fdf4',
  },
  'amber': {
    name: 'Amber Executive',
    headerBg: '#78350f',
    headerText: '#ffffff',
    altBg: '#fffbeb',
  },
  'crimson': {
    name: 'Crimson Burgundy',
    headerBg: '#881337',
    headerText: '#ffffff',
    altBg: '#fff1f2',
  },
  'minimal-mono': {
    name: 'Minimal Monochrome',
    headerBg: '#374151',
    headerText: '#ffffff',
    altBg: '#f9fafb',
  },
  'custom': {
    name: 'Custom Colors',
    headerBg: '#2563eb',
    headerText: '#ffffff',
    altBg: '#f8fafc',
  },
};

function getMarginMm(config: PDFConfig): number {
  switch (config.marginType) {
    case 'none':
      return 6;
    case 'narrow':
      return 10;
    case 'normal':
      return 15;
    case 'wide':
      return 22;
    case 'custom':
      return Math.max(4, config.customMarginMm || 15);
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return [30, 64, 175];
}

function isNumericValue(val: any): boolean {
  if (val === null || val === undefined || val === '') return false;
  const str = String(val).trim();
  // Strip currency symbols and commas
  const cleaned = str.replace(/[$€£¥%,]/g, '').trim();
  return !isNaN(Number(cleaned)) && cleaned.length > 0;
}

export async function generatePDF(
  workbook: ParsedWorkbook,
  config: PDFConfig,
  onProgress?: (progress: number, status: string) => void
): Promise<GeneratedPDFResult> {
  onProgress?.(10, 'Initializing PDF document configuration...');

  // 1. Determine sheets to include
  let sheetsToRender: ParsedSheet[] = [];
  if (config.sheetSelectionMode === 'current') {
    const currentSheet = workbook.sheets[workbook.activeSheetIndex] || workbook.sheets[0];
    if (currentSheet) sheetsToRender = [currentSheet];
  } else if (config.sheetSelectionMode === 'specific') {
    const names = new Set(config.selectedSheetNames);
    sheetsToRender = workbook.sheets.filter(s => names.has(s.name));
    if (sheetsToRender.length === 0) {
      sheetsToRender = [workbook.sheets[0]];
    }
  } else {
    // 'all'
    sheetsToRender = [...workbook.sheets];
  }

  // 2. Determine orientation
  // Calculate average or max column count across sheets to render
  const maxCols = Math.max(...sheetsToRender.map(s => {
    const selectedCols = config.selectedColumnsBySheet[s.name];
    return selectedCols ? selectedCols.length : s.headers.length;
  }), 1);

  let orientation: 'p' | 'l' = 'p';
  if (config.orientation === 'landscape') {
    orientation = 'l';
  } else if (config.orientation === 'portrait') {
    orientation = 'p';
  } else {
    // Auto: if max cols > 6 or width likely exceeds standard portrait
    orientation = maxCols > 6 ? 'l' : 'p';
  }

  // 3. Page format
  let format: string | [number, number] = config.pageSize;
  if (config.pageSize === 'custom') {
    format = [config.customPageWidthMm || 210, config.customPageHeightMm || 297];
  }

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format,
  });

  const margin = getMarginMm(config);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const printableWidth = pageWidth - margin * 2;

  // Colors
  const headerBgRgb = hexToRgb(config.headerBgColor);
  const headerTextRgb = hexToRgb(config.headerTextColor);
  const altBgRgb = hexToRgb(config.alternateRowBgColor);

  const docTitle = config.documentTitle.trim() || workbook.fileName.replace(/\.[^/.]+$/, '');
  const company = config.companyName.trim();
  const dateStr = config.showDate
    ? (config.customDateText.trim() || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
    : '';

  onProgress?.(30, 'Formatting tables and headers...');

  let isFirstSheet = true;

  // Loop through sheets
  for (let sIdx = 0; sIdx < sheetsToRender.length; sIdx++) {
    const sheet = sheetsToRender[sIdx];
    const progressPercent = Math.min(85, Math.round(30 + (sIdx / sheetsToRender.length) * 55));
    onProgress?.(progressPercent, `Rendering sheet "${sheet.name}" (${sIdx + 1}/${sheetsToRender.length})...`);

    if (!isFirstSheet) {
      doc.addPage(format, orientation);
    }
    isFirstSheet = false;

    // Filter columns
    const selectedCols = config.selectedColumnsBySheet[sheet.name] || sheet.headers;
    const colIndices = sheet.headers
      .map((header, idx) => ({ header, idx }))
      .filter(item => selectedCols.includes(item.header));

    // Fallback if all columns unselected
    const activeColIndices = colIndices.length > 0
      ? colIndices
      : sheet.headers.map((header, idx) => ({ header, idx }));

    // Prepare table headers
    const tableHeaders = activeColIndices.map(item => item.header);
    if (config.showRowNumbers) {
      tableHeaders.unshift('#');
    }

    // Filter rows
    let startRow = Math.max(1, config.rowRangeStart) - 1;
    let endRow = config.rowRangeEnd > 0 ? Math.min(config.rowRangeEnd, sheet.rows.length) : sheet.rows.length;
    if (startRow > endRow) startRow = 0;

    const slicedRows = sheet.rows.slice(startRow, endRow);

    // Format rows data
    const tableData: any[][] = slicedRows.map((row, rowIdx) => {
      const formattedRow = activeColIndices.map(col => {
        const cell = row[col.idx];
        if (cell === null || cell === undefined || cell === '') {
          return '';
        }
        return String(cell);
      });

      if (config.showRowNumbers) {
        formattedRow.unshift(String(startRow + rowIdx + 1));
      }
      return formattedRow;
    });

    // Start Y coordinate calculation
    let currentY = margin;

    // Draw Document Title and Header banner on first page of document or sheet
    const isDocStart = sIdx === 0;
    if (isDocStart) {
      // Header branding bar
      if (company || dateStr || config.headerText) {
        doc.setFont(config.font, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);

        const topHeaderY = currentY;
        if (company) {
          doc.text(company, margin, topHeaderY);
        }
        if (config.headerText) {
          doc.text(config.headerText, pageWidth / 2, topHeaderY, { align: 'center' });
        }
        if (dateStr) {
          doc.text(dateStr, pageWidth - margin, topHeaderY, { align: 'right' });
        }
        currentY += 6;
      }

      // Main Document Title
      if (docTitle) {
        doc.setFont(config.font, 'bold');
        doc.setFontSize(15);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(docTitle, margin, currentY + 3);
        currentY += 10;
      }
    }

    // Sheet Title (if multiple sheets or option checked)
    if (config.includeSheetTitle && (sheetsToRender.length > 1 || !docTitle)) {
      doc.setFont(config.font, 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59); // slate-800
      
      const sheetBadge = `Sheet: ${sheet.name}`;
      doc.text(sheetBadge, margin, currentY + 1);
      currentY += 6;
    }

    // AutoTable column styles (alignments & widths)
    const columnStyles: Record<number, any> = {};
    const colCountWithNum = tableHeaders.length;

    tableHeaders.forEach((_, colIndex) => {
      // Row numbers column
      if (config.showRowNumbers && colIndex === 0) {
        columnStyles[colIndex] = {
          halign: 'center',
          cellWidth: 10,
        };
        return;
      }

      // Check column values to infer if numeric
      const dataColIndex = config.showRowNumbers ? colIndex - 1 : colIndex;
      const isMostlyNumeric = slicedRows.slice(0, 15).every(row => {
        const val = row[activeColIndices[dataColIndex]?.idx];
        return val === null || val === undefined || val === '' || isNumericValue(val);
      }) && slicedRows.length > 0;

      columnStyles[colIndex] = {
        halign: isMostlyNumeric ? config.numberAlignment : config.textAlignment,
      };
    });

    // Run autoTable
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: currentY,
      margin: {
        top: margin + 6,
        bottom: margin + 8,
        left: margin,
        right: margin,
      },
      styles: {
        font: config.font,
        fontSize: config.fontSize,
        cellPadding: config.cellPadding,
        overflow: 'linebreak',
        lineColor: config.borderVisibility ? [226, 232, 240] : [255, 255, 255],
        lineWidth: config.borderVisibility ? 0.2 : 0,
        textColor: [30, 41, 59],
        valign: 'middle',
      },
      headStyles: {
        fillColor: headerBgRgb,
        textColor: headerTextRgb,
        font: config.font,
        fontStyle: 'bold',
        fontSize: config.headerFontSize,
        halign: 'center',
        valign: 'middle',
        lineWidth: config.borderVisibility ? 0.2 : 0,
        lineColor: [203, 213, 225],
      },
      alternateRowStyles: config.alternateRows
        ? {
            fillColor: altBgRgb,
          }
        : {},
      columnStyles,
      tableWidth: config.fitToPageWidth ? 'auto' : 'wrap',
      showHead: config.repeatHeader ? 'everyPage' : 'firstPage',
      pageBreak: 'auto',
      rowPageBreak: 'avoid',
      theme: config.showGridlines ? (config.alternateRows ? 'striped' : 'grid') : 'plain',
    });
  }

  onProgress?.(90, 'Adding page numbers and footers...');

  // 4. Global Footers and Page Numbers across all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont(config.font, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400

    const footerY = pageHeight - margin + 4;

    // Left footer text
    if (config.footerText) {
      doc.text(config.footerText, margin, footerY);
    } else if (company) {
      doc.text(company, margin, footerY);
    }

    // Right / Center Page numbering: "Page X of Y"
    if (config.showPageNumbers) {
      const pageStr = `Page ${i} of ${totalPages}`;
      doc.text(pageStr, pageWidth - margin, footerY, { align: 'right' });
    }
  }

  onProgress?.(98, 'Finalizing PDF output...');

  // Generate output blob
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const sanitizedFileName = (docTitle || workbook.fileName.replace(/\.[^/.]+$/, ''))
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 50) + '.pdf';

  onProgress?.(100, 'PDF generation complete!');

  return {
    blobUrl,
    blob: pdfBlob,
    fileName: sanitizedFileName,
    fileSizeBytes: pdfBlob.size,
    pageCount: totalPages,
    generatedAt: new Date(),
  };
}
