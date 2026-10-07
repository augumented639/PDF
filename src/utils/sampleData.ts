import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ParsedWorkbook } from '../types';

export function createFinancialReportWorkbook(): ParsedWorkbook {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Canadian Regional Performance (Bilingual Q1)
  const q1Data = [
    ['Province / Region', 'Secteur d’activité', 'Budget Fixé ($ CAD)', 'Revenus Réels ($ CAD)', 'Écart ($ CAD)', 'Croissance %', 'Statut / Status'],
    ['Québec (Montréal)', 'Logiciels d’entreprise', 450000, 482500, 32500, '7.2%', 'Objectif dépassé'],
    ['Québec (Montréal)', 'Services infonuagiques (Cloud)', 320000, 314200, -5800, '-1.8%', 'Proche de la cible'],
    ['Ontario (Toronto)', 'Services professionnels', 380000, 395000, 15000, '3.9%', 'Objectif dépassé'],
    ['Ontario (Toronto)', 'Logiciels d’entreprise', 520000, 560000, 40000, '7.7%', 'Objectif dépassé'],
    ['Colombie-Britannique (Vancouver)', 'Technologies vertes & CleanTech', 290000, 310500, 20500, '7.1%', 'Objectif dépassé'],
    ['Alberta (Calgary & Edmonton)', 'Énergie & Systèmes de données', 340000, 342000, 2000, '0.6%', 'Conforme'],
    ['Provinces de l’Atlantique (Halifax)', 'Logistique maritime & TI', 185000, 192300, 7300, '3.9%', 'Objectif dépassé'],
    ['Manitoba & Saskatchewan', 'Agro-technologie numérique', 160000, 168400, 8400, '5.3%', 'Objectif dépassé'],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(q1Data);
  XLSX.utils.book_append_sheet(wb, ws1, 'Rapport T1 Canada');

  // Sheet 2: Department Budgets
  const budgetData = [
    ['Code Département', 'Nom du Service', 'Effectif', 'Budget Annuel ($ CAD)', 'Alloué T1 ($ CAD)', 'Dépensé T1 ($ CAD)', 'Solde Restant ($ CAD)'],
    ['TI-101', 'Plateforme & Développement', 38, 3800000, 950000, 921400, 2878600],
    ['PROD-201', 'Gestion de Produits & Design', 16, 1600000, 400000, 382000, 1218000],
    ['MKT-301', 'Marketing bilingue & Croissance', 22, 2200000, 550000, 542400, 1657600],
    ['VENTES-401', 'Ventes nationales & Comptes clés', 32, 3400000, 850000, 831100, 2568900],
    ['FIN-501', 'Finance, Conformité & Fiscalité', 12, 1400000, 350000, 341000, 1059000],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(budgetData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Budgets par Service');

  return parseWorkbookFromXlsx(wb, 'Rapport_Financier_Canadien_T1_2025.xlsx', 42500, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}

export function createSalesCSVWorkbook(): ParsedWorkbook {
  const wb = XLSX.utils.book_new();
  const salesData = [
    ['N° Transaction', 'Nom du Client / Client', 'Province', 'Unités', 'Prix Unitaire ($ CAD)', 'Rabais %', 'Total ($ CAD)', 'Mode de Paiement', 'Date de Commande'],
    ['TXN-CA-801', 'Technologies Boréale Inc.', 'QC', 8, 1450.00, '5%', 11020.00, 'Virement bancaire', '2025-03-01'],
    ['TXN-CA-802', 'Laurentian Health Group', 'ON', 15, 620.00, '0%', 9300.00, 'Carte corporative', '2025-03-02'],
    ['TXN-CA-803', 'Pacific Gateway Energy', 'BC', 12, 2100.00, '10%', 22680.00, 'Virement Interac', '2025-03-03'],
    ['TXN-CA-804', 'Distributions Saint-Laurent', 'QC', 25, 240.00, '0%', 6000.00, 'Prélèvement automatique', '2025-03-04'],
    ['TXN-CA-805', 'Prairie AgriTech Solutions', 'SK', 6, 3400.00, '8%', 18768.00, 'Virement bancaire', '2025-03-05'],
    ['TXN-CA-806', 'Atlantic Digital Media', 'NS', 10, 890.00, '5%', 8455.00, 'Carte corporative', '2025-03-06'],
    ['TXN-CA-807', 'Montréal Logiciels Coop', 'QC', 20, 1150.00, '12%', 20240.00, 'Virement bancaire', '2025-03-07'],
    ['TXN-CA-808', 'Calgary Cloud Logistics', 'AB', 14, 1850.00, '15%', 22015.00, 'Virement bancaire', '2025-03-08'],
  ];
  const ws = XLSX.utils.aoa_to_sheet(salesData);
  XLSX.utils.book_append_sheet(wb, ws, 'Ventes Canada 2025');

  return parseWorkbookFromXlsx(wb, 'Transactions_Ventes_Canada_2025.csv', 18400, 'text/csv');
}

// Generates a sample bilingual Canadian PDF invoice/table document for testing PDF -> Sheet
export function generateSampleCanadianPDF(): File {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
  });

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text('FACTURE COMMERCIALE / COMMERCIAL INVOICE', 15, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Solutions Numériques Canada Ltée — Montréal, QC & Toronto, ON', 15, 24);
  doc.text('TPS / GST: 849201928RT0001 | TVQ / QST: 1209384729TQ0001', 15, 29);
  doc.text('Date: 2025-03-15 | N° Facture: INV-CAN-2025-094', 15, 34);

  // Table Data
  const headers = ['Code Article', 'Description du Produit / Service', 'Quantité', 'Prix Unitaire ($ CAD)', 'Total ($ CAD)'];
  const body = [
    ['LIC-ENT-01', 'Licence d’entreprise Cloud Pro Canada (1 an)', '15', '1250.00', '18750.00'],
    ['SRV-INT-02', 'Services d’intégration système et conformité', '30', '165.00', '4950.00'],
    ['SEC-SOC-03', 'Audit de sécurité des données et chiffrement', '1', '3500.00', '3500.00'],
    ['SPT-PRE-04', 'Soutien technique bilingue 24/7 (Trimestre)', '3', '850.00', '2550.00'],
    ['FRM-ADM-05', 'Formation administrateurs et utilisateurs', '8', '350.00', '2800.00'],
    ['HST-CAN-06', 'Hébergement haute disponibilité (Centre de données Montréal)', '12', '450.00', '5400.00'],
  ];

  autoTable(doc, {
    head: [headers],
    body: body,
    startY: 42,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 3,
      textColor: [30, 41, 59],
    },
    headStyles: {
      fillColor: [30, 64, 175], // blue-800
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
  });

  // Summary table
  const finalY = (doc as any).lastAutoTable?.finalY || 130;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Sous-total / Subtotal: $37,950.00 CAD', 130, finalY + 10);
  doc.text('TPS / GST (5%): $1,897.50 CAD', 130, finalY + 15);
  doc.text('TVQ / QST (9.975%): $3,785.51 CAD', 130, finalY + 20);
  doc.setFont('helvetica', 'bold');
  doc.text('Total à payer / Total Due: $43,633.01 CAD', 130, finalY + 26);

  const pdfBlob = doc.output('blob');
  return new File([pdfBlob], 'Facture_Bilingue_Canada_2025.pdf', { type: 'application/pdf' });
}

export function parseWorkbookFromXlsx(wb: XLSX.WorkBook, fileName: string, fileSize: number, fileType: string): ParsedWorkbook {
  const sheets = wb.SheetNames.map((sheetName) => {
    const ws = wb.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false }) as (string | number | boolean | null)[][];
    
    if (!rawData || rawData.length === 0) {
      return {
        name: sheetName,
        headers: ['Column 1'],
        rows: [],
        totalRowCount: 0,
      };
    }

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
    const headers = rawHeaders.map((h, i) => {
      const str = String(h ?? '').trim();
      return str.length > 0 ? str : `Col ${i + 1}`;
    });

    const dataRows = rawData.slice(headerRowIdx + 1).filter(row => {
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
