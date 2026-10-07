export type Language = 'en' | 'fr';

export interface Translations {
  // Navigation & Header
  appTitle: string;
  appSubtitle: string;
  proBadge: string;
  securePrivacyBadge: string;
  howItWorks: string;
  startOver: string;
  modeSheetToPdf: string;
  modePdfToSheet: string;
  languageSelect: string;

  // Hero Section
  heroTitleSheetToPdfPrefix: string;
  heroTitleSheetToPdfHighlight: string;
  heroSubtitleSheetToPdf: string;

  heroTitlePdfToSheetPrefix: string;
  heroTitlePdfToSheetHighlight: string;
  heroSubtitlePdfToSheet: string;

  privacyPill: string;
  uploadSpreadsheetBtn: string;
  uploadPdfBtn: string;
  howItWorksBtn: string;
  trySampleNotice: string;
  sampleFinancialBtn: string;
  sampleSalesBtn: string;
  samplePdfInvoiceBtn: string;
  samplePdfReportBtn: string;

  badgeFormats: string;
  badgeMultiSheet: string;
  badgeSmartFit: string;
  badgeSecureNoUpload: string;

  // Conversion Flow Steps
  stepUpload: string;
  stepPreview: string;
  stepCustomize: string;
  stepConvert: string;
  stepDownload: string;

  // File Upload Area
  dropSpreadsheetHere: string;
  dropPdfHere: string;
  dropSubtext: string;
  browseFile: string;
  upTo50Mb: string;
  privacyGuaranteeNotice: string;
  parsedBadge: string;
  replaceFile: string;
  removeFile: string;
  readingFile: string;
  analyzingFile: string;

  // Spreadsheet Preview
  spreadsheetPreviewTitle: string;
  spreadsheetPreviewSubtitle: string;
  sheetsLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  columnsBtn: string;
  columnsToInclude: string;
  selectAll: string;
  deselectAll: string;
  zoomOut: string;
  zoomIn: string;
  noMatchingRows: string;
  tryClearingSearch: string;
  showingRowsOf: string;
  filteredBadge: string;
  columnsActive: string;
  tableTip: string;

  // PDF to Sheet Extractor Preview
  extractedDataTitle: string;
  extractedDataSubtitle: string;
  pagesFound: string;
  exportFormat: string;
  downloadCsv: string;
  downloadXlsx: string;
  downloadXls: string;
  detectedHeaders: string;
  extractingPdfNotice: string;

  // PDF Customization Panel
  pdfCustomizationTitle: string;
  pdfCustomizationSubtitle: string;
  tabLayout: string;
  tabBranding: string;
  tabStyling: string;
  tabScope: string;

  pageSizeLabel: string;
  widthMm: string;
  heightMm: string;
  orientationLabel: string;
  orientationAuto: string;
  orientationAutoDesc: string;
  orientationPortrait: string;
  orientationPortraitDesc: string;
  orientationLandscape: string;
  orientationLandscapeDesc: string;
  marginsLabel: string;
  fitToWidth: string;
  fitToWidthDesc: string;
  repeatHeader: string;
  repeatHeaderDesc: string;
  showGridlines: string;
  showGridlinesDesc: string;
  showRowNumbers: string;
  showRowNumbersDesc: string;
  showPageNumbers: string;
  showPageNumbersDesc: string;

  docTitleLabel: string;
  docTitlePlaceholder: string;
  docTitleHelp: string;
  companyLabel: string;
  companyPlaceholder: string;
  customHeaderLabel: string;
  customHeaderPlaceholder: string;
  customFooterLabel: string;
  customFooterPlaceholder: string;
  printDateLabel: string;
  customDatePlaceholder: string;

  tableColorTheme: string;
  headerBg: string;
  headerTextColor: string;
  altRowZebra: string;
  alternateRowsToggle: string;
  pdfFontLabel: string;
  tableFontSize: string;
  headerFontSize: string;
  cellPadding: string;
  textAlignLabel: string;
  numberAlignLabel: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  alignRightStd: string;

  sheetsToInclude: string;
  allSheets: string;
  currentSheet: string;
  specificSheets: string;
  selectWorksheets: string;
  printSheetNameHeading: string;
  printSheetNameDesc: string;
  rowRangeLabel: string;
  startRow: string;
  endRow: string;

  convertBtn: string;
  convertingBtn: string;
  clientSideGuarantee: string;

  // PDF Preview Modal
  readyBadge: string;
  pageCountSingular: string;
  pageCountPlural: string;
  vectorPdfBadge: string;
  downloadPdfBtn: string;
  printBtn: string;
  editSettingsBtn: string;
  convertAnotherFileBtn: string;
  directDownloadLink: string;
  previewSubtext: string;

  // Features Section
  featuresHeadingTag: string;
  featuresTitle: string;
  featuresSubtitle: string;

  featCsvTitle: string;
  featCsvDesc: string;
  featXlsTitle: string;
  featXlsDesc: string;
  featXlsxTitle: string;
  featXlsxDesc: string;
  featMultiSheetTitle: string;
  featMultiSheetDesc: string;
  featCustomLayoutTitle: string;
  featCustomLayoutDesc: string;
  featSecureTitle: string;
  featSecureDesc: string;
  featPdfToSheetTitle: string;
  featPdfToSheetDesc: string;

  // How It Works Modal
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  privacyGuaranteeTitle: string;
  privacyGuaranteeText: string;
  smartHandlingTitle: string;
  smartTip1: string;
  smartTip2: string;
  smartTip3: string;
  modalCloseBtn: string;

  // Footer
  footerDesc: string;
  footerRights: string;
  footerEngineered: string;

  // Error Messages
  errorUnsupportedFile: string;
  errorEmptyFile: string;
  errorExceedsSize: string;
  errorCorruptedSpreadsheet: string;
  errorNoDataFound: string;
  errorPasswordProtected: string;
  errorPdfParseFailed: string;
  errorNoTablesInPdf: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Sheet & PDF Studio',
    appSubtitle: 'Bi-directional Spreadsheet & PDF Converter',
    proBadge: 'Pro Converter • Canada & Global',
    securePrivacyBadge: '100% In-Browser Privacy',
    howItWorks: 'How It Works',
    startOver: 'Start Over',
    modeSheetToPdf: 'Sheet ➔ PDF',
    modePdfToSheet: 'PDF ➔ CSV / Excel',
    languageSelect: 'Language',

    heroTitleSheetToPdfPrefix: 'Convert CSV & Excel Files to ',
    heroTitleSheetToPdfHighlight: 'PDF Instantly',
    heroSubtitleSheetToPdf:
      'Transform your CSV, XLS and XLSX spreadsheets into professional, customizable PDF documents in seconds. Processed 100% in your browser.',

    heroTitlePdfToSheetPrefix: 'Convert PDF Tables to ',
    heroTitlePdfToSheetHighlight: 'CSV & Excel (XLSX)',
    heroSubtitlePdfToSheet:
      'Extract tabular data from PDF files and download clean, editable Excel (XLSX, XLS) or CSV spreadsheets with accurate columns.',

    privacyPill: 'Zero Server Uploads • 100% Client-Side Privacy • Canada & Global',
    uploadSpreadsheetBtn: 'Upload Spreadsheet',
    uploadPdfBtn: 'Upload PDF Document',
    howItWorksBtn: 'How It Works',
    trySampleNotice: "Don't have a file right now? Try an instant sample:",
    sampleFinancialBtn: 'Canadian Q1 Financial Report (.xlsx)',
    sampleSalesBtn: 'Global Sales Transactions (.csv)',
    samplePdfInvoiceBtn: 'Bilingual Canadian Invoice (.pdf)',
    samplePdfReportBtn: 'Financial Statement Tables (.pdf)',

    badgeFormats: 'CSV, XLS, XLSX & PDF',
    badgeMultiSheet: 'Multi-Sheet & Multi-Page',
    badgeSmartFit: 'Auto Column Scaling',
    badgeSecureNoUpload: 'Zero Data Uploaded',

    stepUpload: 'Upload',
    stepPreview: 'Preview',
    stepCustomize: 'Customize',
    stepConvert: 'Convert',
    stepDownload: 'Download',

    dropSpreadsheetHere: 'Drop your CSV or Excel file here',
    dropPdfHere: 'Drop your PDF file here to extract tables',
    dropSubtext: 'Drag & drop your document or click to browse from device',
    browseFile: 'Browse File',
    upTo50Mb: 'Up to 50MB',
    privacyGuaranteeNotice: 'Your files are processed securely in your browser and are never uploaded or shared.',
    parsedBadge: 'Parsed',
    replaceFile: 'Replace File',
    removeFile: 'Remove',
    readingFile: 'Reading & Parsing Document...',
    analyzingFile: 'Extracting worksheets, columns and data cells',

    spreadsheetPreviewTitle: 'Spreadsheet Data Preview',
    spreadsheetPreviewSubtitle: 'Live interactive view of worksheet data. Filter columns or sort rows before exporting.',
    sheetsLabel: 'Sheets:',
    searchPlaceholder: 'Search in table...',
    clearSearch: 'Clear',
    columnsBtn: 'Columns',
    columnsToInclude: 'Columns to include in PDF:',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    noMatchingRows: 'No matching spreadsheet rows found',
    tryClearingSearch: 'Try clearing your search query',
    showingRowsOf: 'Showing rows',
    filteredBadge: '(filtered)',
    columnsActive: 'columns active',
    tableTip: 'Click column headers to sort • Use checkboxes above to filter PDF columns',

    extractedDataTitle: 'Extracted PDF Table Data',
    extractedDataSubtitle: 'Review tabular data extracted from your PDF. Download directly as CSV, XLSX, or XLS.',
    pagesFound: 'pages analyzed',
    exportFormat: 'Export Extracted Spreadsheet:',
    downloadCsv: 'Download .CSV',
    downloadXlsx: 'Download .XLSX (Excel)',
    downloadXls: 'Download .XLS',
    detectedHeaders: 'Detected Columns:',
    extractingPdfNotice: 'Analyzing PDF text blocks, bounding boxes, and tabular rows...',

    pdfCustomizationTitle: 'PDF Customization',
    pdfCustomizationSubtitle: 'Configure page layout, typography & styling',
    tabLayout: 'Layout',
    tabBranding: 'Branding',
    tabStyling: 'Styling',
    tabScope: 'Scope',

    pageSizeLabel: 'Page Size',
    widthMm: 'Width (mm)',
    heightMm: 'Height (mm)',
    orientationLabel: 'Orientation',
    orientationAuto: 'Auto Detect',
    orientationAutoDesc: 'Smart fit',
    orientationPortrait: 'Portrait',
    orientationPortraitDesc: 'Tall layout',
    orientationLandscape: 'Landscape',
    orientationLandscapeDesc: 'Wide layout',
    marginsLabel: 'Page Margins',
    fitToWidth: 'Fit table to page width',
    fitToWidthDesc: 'Scales columns proportionally without cutoffs',
    repeatHeader: 'Repeat header on every page',
    repeatHeaderDesc: 'Keeps column titles visible across pages',
    showGridlines: 'Show cell borders & gridlines',
    showGridlinesDesc: 'Draws subtle lines between table cells',
    showRowNumbers: 'Include row number column (#)',
    showRowNumbersDesc: 'Adds an index counter at the left edge',
    showPageNumbers: 'Print page numbers',
    showPageNumbersDesc: 'Displays "Page X of Y" in document footer',

    docTitleLabel: 'Document Title',
    docTitlePlaceholder: 'e.g. Canadian Q1 Financial Report',
    docTitleHelp: 'Leave empty to use original file name',
    companyLabel: 'Company / Organization',
    companyPlaceholder: 'e.g. Acme Corp (Montréal, QC)',
    customHeaderLabel: 'Custom Header Subtitle',
    customHeaderPlaceholder: 'e.g. Confidential – Internal Business Use',
    customFooterLabel: 'Custom Footer Note',
    customFooterPlaceholder: 'e.g. Sheet to PDF Converter Canada',
    printDateLabel: 'Print Generation Date',
    customDatePlaceholder: 'Leave empty for current date (e.g. 2026-10-07)',

    tableColorTheme: 'Table Color Theme',
    headerBg: 'Header Background',
    headerTextColor: 'Header Text Color',
    altRowZebra: 'Alternate Row Zebra Color',
    alternateRowsToggle: 'Alternate row shading (zebra striping)',
    pdfFontLabel: 'PDF Font',
    tableFontSize: 'Table Font Size',
    headerFontSize: 'Header Font Size',
    cellPadding: 'Cell Padding',
    textAlignLabel: 'Text Alignment',
    numberAlignLabel: 'Number Alignment',
    alignLeft: 'Left Aligned',
    alignCenter: 'Centered',
    alignRight: 'Right Aligned',
    alignRightStd: 'Right Aligned (Standard)',

    sheetsToInclude: 'Sheets to Include in PDF',
    allSheets: 'All Sheets',
    currentSheet: 'Current Sheet',
    specificSheets: 'Specific Sheets',
    selectWorksheets: 'Select worksheets:',
    printSheetNameHeading: 'Print Sheet Name heading',
    printSheetNameDesc: 'Shows "Sheet: [Name]" at start of each worksheet',
    rowRangeLabel: 'Row Range (Optional)',
    startRow: 'Start Row',
    endRow: 'End Row (0 = All rows)',

    convertBtn: 'Convert to PDF',
    convertingBtn: 'Generating PDF...',
    clientSideGuarantee: 'Fast client-side vector rendering • No file size limits',

    readyBadge: 'Ready',
    pageCountSingular: 'Page',
    pageCountPlural: 'Pages',
    vectorPdfBadge: 'Vector PDF',
    downloadPdfBtn: 'Download PDF',
    printBtn: 'Print',
    editSettingsBtn: 'Edit Settings',
    convertAnotherFileBtn: 'Convert Another File',
    directDownloadLink: 'Direct Download Link',
    previewSubtext: 'High-fidelity table rendering • Crisp vector fonts on print',

    featuresHeadingTag: 'Bilingual & Secure Utility',
    featuresTitle: 'Complete Spreadsheet & PDF Dual-Engine',
    featuresSubtitle:
      'Engineered for Canada and international professionals to convert spreadsheets to PDF and extract PDF tables to Excel/CSV with complete privacy.',

    featCsvTitle: 'CSV to PDF',
    featCsvDesc: 'Instantly convert comma-separated values into clean, paginated PDF documents with zero data distortion.',
    featXlsTitle: 'XLS to PDF',
    featXlsDesc: 'Seamless compatibility with legacy Excel 97-2004 binary (.xls) spreadsheets, preserving numeric precision.',
    featXlsxTitle: 'XLSX to PDF',
    featXlsxDesc: 'Full support for modern OpenXML Excel (.xlsx) workbooks with multiple worksheets and date fields.',
    featPdfToSheetTitle: 'PDF to CSV & Excel',
    featPdfToSheetDesc: 'Extract tables from PDF files into editable spreadsheets (.csv, .xlsx, .xls) directly in your browser.',
    featMultiSheetTitle: 'Multi-Sheet & Multi-Page',
    featMultiSheetDesc: 'Combine multiple worksheets into a unified PDF with automatic page breaks and clear sheet headers.',
    featCustomLayoutTitle: 'Custom Canadian & Global Layouts',
    featCustomLayoutDesc: 'Letter, Legal, A4, A3 dimensions, bilingual metadata, CAD $ currencies, and customizable color themes.',
    featSecureTitle: '100% In-Browser Privacy',
    featSecureDesc: 'Your files are processed securely in your browser and are never uploaded or shared. Compliance-friendly.',

    howItWorksTitle: 'How Sheet & PDF Converter Works',
    step1Title: 'Select Mode & Upload File',
    step1Desc: 'Upload a spreadsheet (.csv, .xls, .xlsx) to generate a PDF, or upload a PDF to extract clean tabular data.',
    step2Title: 'Preview & Filter Data',
    step2Desc: 'Inspect data in an interactive table with real-time search, column visibility controls, and sorting.',
    step3Title: 'Customize Formatting',
    step3Desc: 'Adjust page orientation, margins, typography, repeating headers, and document titles.',
    step4Title: 'Instant Download',
    step4Desc: 'Download your crisp vector PDF or editable Excel/CSV spreadsheet immediately without creating an account.',
    privacyGuaranteeTitle: 'Strict Privacy & Data Security Guarantee',
    privacyGuaranteeText:
      'Unlike third-party cloud services that transmit sensitive files to remote servers, all conversions occur client-side inside your browser sandbox. No spreadsheet or PDF data is ever uploaded or retained.',
    smartHandlingTitle: 'Smart Table Handling Tips',
    smartTip1: 'Wide tables: Use Landscape or Auto Detect to prevent column clipping.',
    smartTip2: 'Long tables: Enable Repeat Header on every page for clean reading.',
    smartTip3: 'PDF Extraction: Automatically aligns columns and formats rows for Excel.',
    modalCloseBtn: 'Got it, let’s convert!',

    footerDesc: 'Free, Private & Secure Online Spreadsheet & PDF Conversion Utility',
    footerRights: 'Sheet to PDF Converter Canada. All conversions occur in your local browser sandbox.',
    footerEngineered: 'Engineered for high accuracy data formatting & bilingual Canadian support',

    errorUnsupportedFile: 'Unsupported file type. Please upload a valid .csv, .xls, .xlsx, or .pdf file.',
    errorEmptyFile: 'The uploaded file is empty (0 bytes). Please select a file containing data.',
    errorExceedsSize: 'The file exceeds the browser processing limit of 50MB. Please select a smaller file.',
    errorCorruptedSpreadsheet: 'Sorry, we couldn’t read this file. Please verify that the file is not corrupted.',
    errorNoDataFound: 'The document does not appear to contain any recognized tabular data.',
    errorPasswordProtected: 'This document is password-protected. Please remove password protection and try again.',
    errorPdfParseFailed: 'Failed to extract tables from this PDF document. Please verify the PDF contains selectable text.',
    errorNoTablesInPdf: 'No tabular rows or columns were detected in this PDF. Please check that the PDF contains structured table data.',
  },
  fr: {
    appTitle: 'Atelier Feuille & PDF',
    appSubtitle: 'Convertisseur bidirectionnel Feuille de calcul et PDF',
    proBadge: 'Convertisseur Pro • Canada & International',
    securePrivacyBadge: 'Confidentialité 100% dans le navigateur',
    howItWorks: 'Comment ça fonctionne',
    startOver: 'Recommencer',
    modeSheetToPdf: 'Feuille ➔ PDF',
    modePdfToSheet: 'PDF ➔ CSV / Excel',
    languageSelect: 'Langue',

    heroTitleSheetToPdfPrefix: 'Convertissez vos fichiers CSV et Excel en ',
    heroTitleSheetToPdfHighlight: 'PDF Instantanément',
    heroSubtitleSheetToPdf:
      'Transformez vos feuilles de calcul CSV, XLS et XLSX en documents PDF professionnels et personnalisés en quelques secondes. Traitement 100 % local dans votre navigateur.',

    heroTitlePdfToSheetPrefix: 'Convertissez vos tableaux PDF en ',
    heroTitlePdfToSheetHighlight: 'CSV & Excel (XLSX)',
    heroSubtitlePdfToSheet:
      'Extrayez les données tabulaires de vos documents PDF et téléchargez des feuilles de calcul Excel (XLSX, XLS) ou CSV éditables avec des colonnes précises.',

    privacyPill: 'Aucun téléversement sur serveur • Confidentialité totale • Canada & Mondial',
    uploadSpreadsheetBtn: 'Téléverser une feuille de calcul',
    uploadPdfBtn: 'Téléverser un document PDF',
    howItWorksBtn: 'Comment ça fonctionne',
    trySampleNotice: "Vous n'avez pas de fichier sous la main ? Essayez un exemple instantané :",
    sampleFinancialBtn: 'Rapport financier canadien T1 (.xlsx)',
    sampleSalesBtn: 'Transactions de ventes globales (.csv)',
    samplePdfInvoiceBtn: 'Facture bilingue canadienne (.pdf)',
    samplePdfReportBtn: 'Tableaux d’états financiers (.pdf)',

    badgeFormats: 'CSV, XLS, XLSX & PDF',
    badgeMultiSheet: 'Multi-feuilles & Multi-pages',
    badgeSmartFit: 'Ajustement auto des colonnes',
    badgeSecureNoUpload: 'Aucune donnée partagée',

    stepUpload: 'Téléversement',
    stepPreview: 'Aperçu',
    stepCustomize: 'Personnaliser',
    stepConvert: 'Convertir',
    stepDownload: 'Télécharger',

    dropSpreadsheetHere: 'Déposez votre fichier CSV ou Excel ici',
    dropPdfHere: 'Déposez votre fichier PDF ici pour extraire les tableaux',
    dropSubtext: 'Glissez-déposez votre document ou cliquez pour parcourir vos fichiers',
    browseFile: 'Parcourir les fichiers',
    upTo50Mb: "Jusqu'à 50 Mo",
    privacyGuaranteeNotice: 'Vos fichiers sont traités en toute sécurité dans votre navigateur et ne sont jamais partagés.',
    parsedBadge: 'Analysé',
    replaceFile: 'Remplacer le fichier',
    removeFile: 'Supprimer',
    readingFile: 'Lecture et analyse du document...',
    analyzingFile: 'Extraction des feuilles, colonnes et cellules de données',

    spreadsheetPreviewTitle: 'Aperçu de la feuille de calcul',
    spreadsheetPreviewSubtitle: 'Vue interactive des données. Filtrez les colonnes ou triez les lignes avant l’exportation.',
    sheetsLabel: 'Feuilles :',
    searchPlaceholder: 'Rechercher dans le tableau...',
    clearSearch: 'Effacer',
    columnsBtn: 'Colonnes',
    columnsToInclude: 'Colonnes à inclure dans le PDF :',
    selectAll: 'Tout sélectionner',
    deselectAll: 'Tout désélectionner',
    zoomOut: 'Zoom arrière',
    zoomIn: 'Zoom avant',
    noMatchingRows: 'Aucune ligne correspondante trouvée',
    tryClearingSearch: 'Essayez d’effacer votre terme de recherche',
    showingRowsOf: 'Affichage des lignes',
    filteredBadge: '(filtré)',
    columnsActive: 'colonnes actives',
    tableTip: 'Cliquez sur les en-têtes pour trier • Utilisez les cases pour filtrer les colonnes PDF',

    extractedDataTitle: 'Données tabulaires extraites du PDF',
    extractedDataSubtitle: 'Vérifiez le tableau extrait de votre PDF. Téléchargez directement en CSV, XLSX ou XLS.',
    pagesFound: 'pages analysées',
    exportFormat: 'Exporter la feuille de calcul extraite :',
    downloadCsv: 'Télécharger .CSV',
    downloadXlsx: 'Télécharger .XLSX (Excel)',
    downloadXls: 'Télécharger .XLS',
    detectedHeaders: 'Colonnes détectées :',
    extractingPdfNotice: 'Analyse des blocs de texte, alignements et lignes tabulaires...',

    pdfCustomizationTitle: 'Personnalisation du PDF',
    pdfCustomizationSubtitle: 'Configurez la mise en page, la typographie et le style',
    tabLayout: 'Mise en page',
    tabBranding: 'En-tête & Marque',
    tabStyling: 'Style',
    tabScope: 'Portée',

    pageSizeLabel: 'Format de page',
    widthMm: 'Largeur (mm)',
    heightMm: 'Hauteur (mm)',
    orientationLabel: 'Orientation',
    orientationAuto: 'Détection auto',
    orientationAutoDesc: 'Ajustement intelligent',
    orientationPortrait: 'Portrait',
    orientationPortraitDesc: 'Format vertical',
    orientationLandscape: 'Paysage',
    orientationLandscapeDesc: 'Format horizontal',
    marginsLabel: 'Marges de page',
    fitToWidth: 'Adapter le tableau à la largeur',
    fitToWidthDesc: 'Ajuste les colonnes proportionnellement sans coupure',
    repeatHeader: 'Répéter l’en-tête sur chaque page',
    repeatHeaderDesc: 'Garde les titres de colonnes visibles sur toutes les pages',
    showGridlines: 'Afficher le quadrillage des cellules',
    showGridlinesDesc: 'Trace des séparateurs subtils entre les cellules',
    showRowNumbers: 'Inclure la colonne numéro de ligne (#)',
    showRowNumbersDesc: 'Ajoute un compteur d’index sur le bord gauche',
    showPageNumbers: 'Afficher les numéros de page',
    showPageNumbersDesc: 'Affiche « Page X de Y » dans le pied de page',

    docTitleLabel: 'Titre du document',
    docTitlePlaceholder: 'ex. Rapport financier T1 – Canada',
    docTitleHelp: 'Laissez vide pour utiliser le nom du fichier original',
    companyLabel: 'Entreprise / Organisation',
    companyPlaceholder: 'ex. Compagnie Acme (Montréal, QC)',
    customHeaderLabel: 'Sous-titre d’en-tête personnalisé',
    customHeaderPlaceholder: 'ex. Confidentiel – Usage interne exclusif',
    customFooterLabel: 'Note de bas de page personnalisée',
    customFooterPlaceholder: 'ex. Convertisseur Feuille vers PDF Canada',
    printDateLabel: 'Imprimer la date de génération',
    customDatePlaceholder: 'Laissez vide pour la date du jour (ex. 2026-10-07)',

    tableColorTheme: 'Thème de couleur du tableau',
    headerBg: 'Arrière-plan d’en-tête',
    headerTextColor: 'Couleur du texte d’en-tête',
    altRowZebra: 'Couleur zébrée alternée',
    alternateRowsToggle: 'Alternance de couleur des lignes (zébrure)',
    pdfFontLabel: 'Police PDF',
    tableFontSize: 'Taille de police du tableau',
    headerFontSize: 'Taille de police d’en-tête',
    cellPadding: 'Espacement des cellules',
    textAlignLabel: 'Alignement du texte',
    numberAlignLabel: 'Alignement des nombres',
    alignLeft: 'Aligné à gauche',
    alignCenter: 'Centré',
    alignRight: 'Aligné à droite',
    alignRightStd: 'Aligné à droite (Standard)',

    sheetsToInclude: 'Feuilles à inclure dans le PDF',
    allSheets: 'Toutes les feuilles',
    currentSheet: 'Feuille actuelle',
    specificSheets: 'Feuilles spécifiques',
    selectWorksheets: 'Sélectionner les feuilles de calcul :',
    printSheetNameHeading: 'Imprimer le titre de la feuille',
    printSheetNameDesc: 'Affiche « Feuille : [Nom] » au début de chaque feuille',
    rowRangeLabel: 'Plage de lignes (Optionnel)',
    startRow: 'Ligne de début',
    endRow: 'Ligne de fin (0 = Toutes)',

    convertBtn: 'Convertir en PDF',
    convertingBtn: 'Génération du PDF...',
    clientSideGuarantee: 'Rendu vectoriel rapide et local • Aucune limite de taille',

    readyBadge: 'Prêt',
    pageCountSingular: 'Page',
    pageCountPlural: 'Pages',
    vectorPdfBadge: 'PDF Vectoriel',
    downloadPdfBtn: 'Télécharger le PDF',
    printBtn: 'Imprimer',
    editSettingsBtn: 'Modifier les paramètres',
    convertAnotherFileBtn: 'Convertir un autre fichier',
    directDownloadLink: 'Lien de téléchargement direct',
    previewSubtext: 'Rendu de tableau haute fidélité • Polices vectorielles nettes à l’impression',

    featuresHeadingTag: 'Utilitaire bilingue et sécurisé',
    featuresTitle: 'Moteur complet Feuille de calcul et PDF',
    featuresSubtitle:
      'Conçu pour les professionnels canadiens et internationaux pour convertir feuilles vers PDF et extraire des tableaux PDF vers Excel/CSV en toute confidentialité.',

    featCsvTitle: 'CSV vers PDF',
    featCsvDesc: 'Convertissez instantanément des données séparées par virgules en documents PDF clairs et paginés sans déformation.',
    featXlsTitle: 'XLS vers PDF',
    featXlsDesc: 'Compatibilité parfaite avec les anciennes feuilles Excel 97-2004 (.xls), préservant la précision des chiffres.',
    featXlsxTitle: 'XLSX vers PDF',
    featXlsxDesc: 'Prise en charge intégrale des classeurs Excel OpenXML (.xlsx) modernes avec plusieurs feuilles et dates.',
    featPdfToSheetTitle: 'PDF vers CSV & Excel',
    featPdfToSheetDesc: 'Extrayez les tableaux de vos fichiers PDF en feuilles de calcul éditables (.csv, .xlsx, .xls) directement dans votre navigateur.',
    featMultiSheetTitle: 'Multi-feuilles & Multi-pages',
    featMultiSheetDesc: 'Combinez plusieurs feuilles de calcul en un seul PDF structuré avec des sauts de page et titres nets.',
    featCustomLayoutTitle: 'Formats canadiens et internationaux',
    featCustomLayoutDesc: 'Formats Lettre, Légal, A4, A3, métadonnées bilingues, devises en dollars canadiens (CAD $) et thèmes élégants.',
    featSecureTitle: 'Confidentialité 100 % locale',
    featSecureDesc: 'Vos fichiers sont traités dans votre navigateur et ne sont jamais téléversés ni partagés. Idéal pour la conformité.',

    howItWorksTitle: 'Fonctionnement du Convertisseur Feuille & PDF',
    step1Title: 'Choisissez le mode & téléversez',
    step1Desc: 'Téléversez une feuille de calcul (.csv, .xls, .xlsx) pour créer un PDF, ou un PDF pour en extraire les données tabulaires.',
    step2Title: 'Aperçu & filtrage des données',
    step2Desc: 'Inspectez vos données dans un tableau dynamique avec recherche en temps réel, tri et sélection des colonnes.',
    step3Title: 'Personnalisez la mise en page',
    step3Desc: 'Ajustez l’orientation (paysage/portrait), les marges, la typographie, les en-têtes répétés et le titre.',
    step4Title: 'Téléchargement immédiat',
    step4Desc: 'Téléchargez immédiatement votre PDF vectoriel net ou votre fichier Excel/CSV sans création de compte.',
    privacyGuaranteeTitle: 'Garantie stricte de confidentialité et de sécurité',
    privacyGuaranteeText:
      'Contrairement aux services en ligne qui transmettent vos fichiers confidentiels à des serveurs distants, tous les calculs sont effectués localement dans votre navigateur. Aucune donnée ne quitte votre appareil.',
    smartHandlingTitle: 'Conseils pour les grands tableaux',
    smartTip1: 'Tableaux larges : Utilisez le mode Paysage ou Détection auto pour éviter de couper des colonnes.',
    smartTip2: 'Tableaux longs : Activez Répéter l’en-tête sur chaque page pour une lecture facile.',
    smartTip3: 'Extraction PDF : Aligne automatiquement les colonnes et formate les cellules pour Excel.',
    modalCloseBtn: 'Compris, commençons !',

    footerDesc: 'Utilitaire gratuit, privé et sécurisé de conversion de feuilles de calcul et PDF',
    footerRights: 'Convertisseur Feuille & PDF Canada. Toutes les conversions s’effectuent localement dans votre navigateur.',
    footerEngineered: 'Développé pour une haute précision des données et un support bilingue canadien complet',

    errorUnsupportedFile: 'Format de fichier non pris en charge. Veuillez fournir un fichier .csv, .xls, .xlsx ou .pdf.',
    errorEmptyFile: 'Le fichier sélectionné est vide (0 octet). Veuillez choisir un fichier contenant des données.',
    errorExceedsSize: 'Le fichier dépasse la limite de 50 Mo pour le navigateur. Veuillez utiliser un fichier plus compact.',
    errorCorruptedSpreadsheet: 'Désolé, impossible de lire ce fichier. Veuillez vérifier qu’il n’est pas endommagé.',
    errorNoDataFound: 'Le document ne semble contenir aucun tableau ou données exploitables.',
    errorPasswordProtected: 'Ce document est protégé par un mot de passe. Veuillez retirer la protection et réessayer.',
    errorPdfParseFailed: 'Échec de l’extraction des tableaux du PDF. Vérifiez que le document contient du texte sélectionnable.',
    errorNoTablesInPdf: 'Aucun tableau n’a été détecté dans ce document PDF. Assurez-vous qu’il s’agit d’un tableau structuré.',
  },
};
