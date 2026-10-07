import * as XLSX from 'xlsx';
import { ParsedWorkbook } from '../types';

export function createFinancialReportWorkbook(): ParsedWorkbook {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Q1 Revenue & Expenses
  const q1Data = [
    ['Region', 'Category', 'Target ($)', 'Actual ($)', 'Variance ($)', 'Growth %', 'Status', 'Quarter Date'],
    ['North America', 'Enterprise Software', 450000, 482500, 32500, '7.2%', 'Exceeded', '2025-03-31'],
    ['North America', 'Cloud Infrastructure', 320000, 314200, -5800, '-1.8%', 'Near Target', '2025-03-31'],
    ['North America', 'Professional Services', 180000, 205400, 25400, '14.1%', 'Exceeded', '2025-03-31'],
    ['Europe & UK', 'Enterprise Software', 380000, 395000, 15000, '3.9%', 'Exceeded', '2025-03-31'],
    ['Europe & UK', 'Cloud Infrastructure', 290000, 275800, -14200, '-4.9%', 'Below Target', '2025-03-31'],
    ['Europe & UK', 'Professional Services', 140000, 152300, 12300, '8.8%', 'Exceeded', '2025-03-31'],
    ['Asia-Pacific', 'Enterprise Software', 510000, 560000, 50000, '9.8%', 'Exceeded', '2025-03-31'],
    ['Asia-Pacific', 'Cloud Infrastructure', 340000, 362000, 22000, '6.5%', 'Exceeded', '2025-03-31'],
    ['Asia-Pacific', 'Professional Services', 210000, 225000, 15000, '7.1%', 'Exceeded', '2025-03-31'],
    ['Latin America', 'Enterprise Software', 190000, 184500, -5500, '-2.9%', 'Near Target', '2025-03-31'],
    ['Latin America', 'Cloud Infrastructure', 145000, 151200, 6200, '4.3%', 'Exceeded', '2025-03-31'],
    ['Latin America', 'Professional Services', 95000, 98100, 3100, '3.3%', 'Exceeded', '2025-03-31'],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(q1Data);
  XLSX.utils.book_append_sheet(wb, ws1, 'Q1 Regional Performance');

  // Sheet 2: Department Budgets
  const budgetData = [
    ['Department Code', 'Department Name', 'Headcount', 'Annual Budget ($)', 'Allocated Q1 ($)', 'Spent Q1 ($)', 'Remaining ($)'],
    ['ENG-101', 'Core Platform Engineering', 42, 4200000, 1050000, 985400, 3214600],
    ['PROD-201', 'Product & Design', 18, 1800000, 450000, 412000, 1388000],
    ['MKT-301', 'Growth & Marketing', 24, 2600000, 650000, 672400, 1927600],
    ['SALES-401', 'Global Sales & SDRs', 36, 3800000, 950000, 934100, 2865900],
    ['CS-501', 'Customer Success & Support', 28, 2200000, 550000, 518000, 1682000],
    ['OPS-601', 'People Ops & Administration', 12, 1250000, 312500, 298000, 952000],
    ['FIN-701', 'Finance & Legal Compliance', 10, 1400000, 350000, 342500, 1057500],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(budgetData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Department Budgets');

  // Sheet 3: Key Initiatives
  const initiativesData = [
    ['ID', 'Project Title', 'Owner', 'Priority', 'Start Date', 'Target Completion', 'Status'],
    ['INIT-01', 'AI Document Processing Engine', 'Dr. Sarah Chen', 'High', '2025-01-15', '2025-04-30', 'In Progress'],
    ['INIT-02', 'SOC 2 Type II Certification', 'Marcus Vance', 'Critical', '2025-01-05', '2025-03-25', 'Completed'],
    ['INIT-03', 'Mobile UI Modernization', 'Elena Rostova', 'Medium', '2025-02-01', '2025-05-15', 'In Progress'],
    ['INIT-04', 'Multi-Region DB Latency Fix', 'Kevin O’Connor', 'High', '2025-02-20', '2025-04-10', 'On Schedule'],
    ['INIT-05', 'Customer Self-Serve Portal', 'Priya Patel', 'Medium', '2025-03-01', '2025-06-30', 'Planning'],
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(initiativesData);
  XLSX.utils.book_append_sheet(wb, ws3, 'Strategic Initiatives');

  return parseWorkbookFromXlsx(wb, 'Company_Q1_Financial_Report.xlsx', 42500, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}

export function createSalesCSVWorkbook(): ParsedWorkbook {
  const wb = XLSX.utils.book_new();
  const salesData = [
    ['Transaction ID', 'Customer Name', 'Product SKU', 'Units', 'Unit Price ($)', 'Discount %', 'Total Amount ($)', 'Payment Method', 'Order Date'],
    ['TXN-9081', 'Apex Global Logistics', 'SKU-ENT-001', 5, 2400.00, '5%', 11400.00, 'Corporate Wire', '2025-03-01'],
    ['TXN-9082', 'Summit Health Systems', 'SKU-CLD-004', 12, 450.00, '0%', 5400.00, 'Credit Card', '2025-03-02'],
    ['TXN-9083', 'Horizon FinTech Partners', 'SKU-ENT-002', 8, 3100.00, '10%', 22320.00, 'Corporate Wire', '2025-03-03'],
    ['TXN-9084', 'Nordic Retail Group', 'SKU-SRV-009', 25, 180.00, '0%', 4500.00, 'Direct Debit', '2025-03-04'],
    ['TXN-9085', 'Pacific Rim Energy Corp', 'SKU-ENT-001', 15, 2400.00, '12%', 31680.00, 'Corporate Wire', '2025-03-05'],
    ['TXN-9086', 'Beacon Hill Media', 'SKU-CLD-002', 3, 850.00, '0%', 2550.00, 'Credit Card', '2025-03-06'],
    ['TXN-9087', 'Atlas Cyber Security', 'SKU-SRV-010', 40, 220.00, '15%', 7480.00, 'Corporate Wire', '2025-03-07'],
    ['TXN-9088', 'Cascade BioAnalytics', 'SKU-CLD-004', 6, 450.00, '0%', 2700.00, 'Credit Card', '2025-03-08'],
    ['TXN-9089', 'Zenith Manufacturing Ltd', 'SKU-ENT-003', 10, 4200.00, '8%', 38640.00, 'Corporate Wire', '2025-03-09'],
    ['TXN-9090', 'Vanguard Aerospace', 'SKU-ENT-001', 20, 2400.00, '15%', 40800.00, 'Corporate Wire', '2025-03-10'],
  ];
  const ws = XLSX.utils.aoa_to_sheet(salesData);
  XLSX.utils.book_append_sheet(wb, ws, 'Sales Transactions');

  return parseWorkbookFromXlsx(wb, 'Global_Sales_March_2025.csv', 18400, 'text/csv');
}

export function parseWorkbookFromXlsx(wb: XLSX.WorkBook, fileName: string, fileSize: number, fileType: string): ParsedWorkbook {
  const sheets = wb.SheetNames.map((sheetName) => {
    const ws = wb.Sheets[sheetName];
    // sheet_to_json with header: 1 gives array of arrays
    const rawData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false }) as (string | number | boolean | null)[][];
    
    if (!rawData || rawData.length === 0) {
      return {
        name: sheetName,
        headers: ['Column 1'],
        rows: [],
        totalRowCount: 0,
      };
    }

    // First non-empty row as header
    let headerRowIdx = 0;
    while (headerRowIdx < rawData.length && (!rawData[headerRowIdx] || rawData[headerRowIdx].length === 0 || rawData[headerRowIdx].every(c => c === '' || c === null || c === undefined))) {
      headerRowIdx++;
    }

    if (headerRowIdx >= rawData.length) {
      return {
        name: sheetName,
        headers: ['Empty'],
        rows: [],
        totalRowCount: 0,
      };
    }

    const rawHeaders = rawData[headerRowIdx] || [];
    // Clean headers and ensure no empty header names
    const headers = rawHeaders.map((h, i) => {
      const str = String(h ?? '').trim();
      return str.length > 0 ? str : `Col ${i + 1}`;
    });

    const dataRows = rawData.slice(headerRowIdx + 1).filter(row => {
      // Keep rows that have at least one cell with content
      return Array.isArray(row) && row.some(c => c !== '' && c !== null && c !== undefined);
    });

    return {
      name: sheetName,
      headers: headers.length > 0 ? headers : ['Data'],
      rows: dataRows,
      totalRowCount: dataRows.length,
    };
  });

  return {
    fileName,
    fileSize,
    fileType: fileType || (fileName.endsWith('.csv') ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    lastModified: Date.now(),
    sheets,
    activeSheetIndex: 0,
  };
}
