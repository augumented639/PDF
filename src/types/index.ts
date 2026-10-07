export interface ParsedSheet {
  name: string;
  headers: string[];
  rows: (string | number | boolean | null)[][];
  totalRowCount: number;
}

export interface ParsedWorkbook {
  fileName: string;
  fileSize: number;
  fileType: string;
  lastModified?: number;
  sheets: ParsedSheet[];
  activeSheetIndex: number;
}

export type PageSize = 'a4' | 'a3' | 'letter' | 'legal' | 'custom';
export type PageOrientation = 'portrait' | 'landscape' | 'auto';
export type MarginOption = 'none' | 'narrow' | 'normal' | 'wide' | 'custom';
export type SheetSelectionMode = 'current' | 'all' | 'specific';
export type Alignment = 'left' | 'center' | 'right';
export type TableTheme = 'corporate-blue' | 'slate-dark' | 'emerald' | 'amber' | 'crimson' | 'minimal-mono' | 'custom';
export type ConversionMode = 'sheet-to-pdf' | 'pdf-to-sheet';

export interface PDFConfig {
  // Page settings
  pageSize: PageSize;
  customPageWidthMm: number; // e.g. 210
  customPageHeightMm: number; // e.g. 297
  orientation: PageOrientation;
  marginType: MarginOption;
  customMarginMm: number; // in mm

  // Table Structure
  fitToPageWidth: boolean;
  repeatHeader: boolean;
  showGridlines: boolean;
  showRowNumbers: boolean;
  showPageNumbers: boolean;

  // Header, Footer & Branding
  documentTitle: string;
  companyName: string;
  headerText: string;
  footerText: string;
  showDate: boolean;
  customDateText: string;

  // Table Styling
  font: 'helvetica' | 'times' | 'courier';
  fontSize: number; // default 9
  headerFontSize: number; // default 10
  cellPadding: number; // default 3
  borderVisibility: boolean;
  textAlignment: Alignment;
  numberAlignment: Alignment;
  theme: TableTheme;
  headerBgColor: string;
  headerTextColor: string;
  alternateRowBgColor: string;
  alternateRows: boolean;

  // Sheet & Data Scope
  sheetSelectionMode: SheetSelectionMode;
  selectedSheetNames: string[];
  selectedColumnsBySheet: Record<string, string[]>; // sheetName -> string[]
  rowRangeStart: number; // 1-indexed
  rowRangeEnd: number; // 1-indexed, 0 means all
  includeSheetTitle: boolean;
}

export interface GenerationProgress {
  isGenerating: boolean;
  progressPercent: number;
  statusText: string;
  error?: string;
}

export interface GeneratedPDFResult {
  blobUrl: string;
  blob: Blob;
  fileName: string;
  fileSizeBytes: number;
  pageCount: number;
  generatedAt: Date;
}
