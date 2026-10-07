import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FileUploader } from './components/FileUploader';
import { SpreadsheetPreview } from './components/SpreadsheetPreview';
import { PDFSettingsPanel } from './components/PDFSettingsPanel';
import { PDFPreviewModal } from './components/PDFPreviewModal';
import { PdfToSheetView } from './components/PdfToSheetView';
import { HowItWorksModal } from './components/HowItWorksModal';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { ConversionFlowSteps } from './components/ConversionFlowSteps';
import { ParsedWorkbook, PDFConfig, GeneratedPDFResult, ConversionMode } from './types';
import { DEFAULT_PDF_CONFIG, generatePDF } from './utils/pdfGenerator';
import { parseSpreadsheetFile } from './utils/spreadsheetParser';
import { extractTablesFromPDF } from './utils/pdfTableExtractor';
import {
  createFinancialReportWorkbook,
  createSalesCSVWorkbook,
  generateSampleCanadianPDF,
} from './utils/sampleData';
import { Language, translations } from './i18n/translations';

export default function App() {
  // Language & Mode
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined' && navigator.language) {
      if (navigator.language.toLowerCase().startsWith('fr')) return 'fr';
    }
    return 'en';
  });

  const [mode, setMode] = useState<ConversionMode>('sheet-to-pdf');

  const t = translations[language];

  // Document state
  const [workbook, setWorkbook] = useState<ParsedWorkbook | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number>(1);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [config, setConfig] = useState<PDFConfig>(DEFAULT_PDF_CONFIG);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | undefined>(undefined);

  // PDF generation state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfResult, setPdfResult] = useState<GeneratedPDFResult | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // Update HTML title & lang on language change
  useEffect(() => {
    document.documentElement.lang = language === 'fr' ? 'fr-CA' : 'en-CA';
  }, [language]);

  // When a workbook is loaded, initialize column selections and sheet selections
  const setupWorkbookDefaults = (wb: ParsedWorkbook) => {
    const defaultCols: Record<string, string[]> = {};
    wb.sheets.forEach((s) => {
      defaultCols[s.name] = [...s.headers];
    });

    const docTitle = wb.fileName.replace(/\.[^/.]+$/, '').replace(/[_]/g, ' ');

    setConfig((prev) => ({
      ...prev,
      documentTitle: docTitle,
      selectedSheetNames: wb.sheets.map((s) => s.name),
      selectedColumnsBySheet: defaultCols,
      rowRangeStart: 1,
      rowRangeEnd: 0,
    }));
    setActiveSheetIndex(0);
    setFileErrorMessage(undefined);
  };

  // Handle uploaded file (Spreadsheet or PDF depending on mode)
  const handleFileSelected = async (file: File) => {
    setIsProcessingFile(true);
    setFileErrorMessage(undefined);

    try {
      const fileNameLower = file.name.toLowerCase();

      if (mode === 'pdf-to-sheet' || fileNameLower.endsWith('.pdf')) {
        // PDF to Spreadsheet mode
        if (!fileNameLower.endsWith('.pdf')) {
          setFileErrorMessage(t.errorUnsupportedFile);
          setIsProcessingFile(false);
          return;
        }

        const extractResult = await extractTablesFromPDF(file, file.name);
        if (extractResult.success && extractResult.workbook) {
          setMode('pdf-to-sheet');
          setWorkbook(extractResult.workbook);
          setPdfPageCount(extractResult.pageCount || 1);
          setupWorkbookDefaults(extractResult.workbook);
        } else {
          setFileErrorMessage(extractResult.errorMessage || t.errorPdfParseFailed);
        }
      } else {
        // Spreadsheet to PDF mode
        const result = await parseSpreadsheetFile(file);
        if (result.success && result.workbook) {
          setWorkbook(result.workbook);
          setupWorkbookDefaults(result.workbook);
        } else {
          setFileErrorMessage(result.errorMessage || t.errorCorruptedSpreadsheet);
        }
      }
    } catch (err: any) {
      console.error(err);
      setFileErrorMessage(t.errorCorruptedSpreadsheet);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Sample data loaders
  const handleLoadFinancialSample = () => {
    setIsProcessingFile(true);
    setTimeout(() => {
      const sampleWb = createFinancialReportWorkbook();
      setMode('sheet-to-pdf');
      setWorkbook(sampleWb);
      setupWorkbookDefaults(sampleWb);
      setIsProcessingFile(false);
    }, 200);
  };

  const handleLoadSalesSample = () => {
    setIsProcessingFile(true);
    setTimeout(() => {
      const sampleWb = createSalesCSVWorkbook();
      setMode('sheet-to-pdf');
      setWorkbook(sampleWb);
      setupWorkbookDefaults(sampleWb);
      setIsProcessingFile(false);
    }, 200);
  };

  const handleLoadPdfInvoiceSample = async () => {
    setIsProcessingFile(true);
    try {
      const samplePdfFile = generateSampleCanadianPDF();
      const extractResult = await extractTablesFromPDF(samplePdfFile, samplePdfFile.name);
      if (extractResult.success && extractResult.workbook) {
        setMode('pdf-to-sheet');
        setWorkbook(extractResult.workbook);
        setPdfPageCount(extractResult.pageCount || 1);
        setupWorkbookDefaults(extractResult.workbook);
      } else {
        setFileErrorMessage(extractResult.errorMessage || t.errorPdfParseFailed);
      }
    } catch (e) {
      console.error(e);
      setFileErrorMessage(t.errorPdfParseFailed);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Reset converter state
  const handleReset = () => {
    if (pdfResult?.blobUrl) {
      URL.revokeObjectURL(pdfResult.blobUrl);
    }
    setWorkbook(null);
    setPdfResult(null);
    setConfig(DEFAULT_PDF_CONFIG);
    setActiveSheetIndex(0);
    setFileErrorMessage(undefined);
  };

  const handleModeChange = (newMode: ConversionMode) => {
    handleReset();
    setMode(newMode);
  };

  // Column toggle
  const handleToggleColumn = (sheetName: string, columnName: string) => {
    const currentCols = config.selectedColumnsBySheet[sheetName] || [];
    let updatedCols: string[];
    if (currentCols.includes(columnName)) {
      if (currentCols.length > 1) {
        updatedCols = currentCols.filter((c) => c !== columnName);
      } else {
        updatedCols = currentCols;
      }
    } else {
      updatedCols = [...currentCols, columnName];
    }

    setConfig((prev) => ({
      ...prev,
      selectedColumnsBySheet: {
        ...prev.selectedColumnsBySheet,
        [sheetName]: updatedCols,
      },
    }));
  };

  const handleSelectAllColumns = (sheetName: string, all: boolean) => {
    const sheet = workbook?.sheets.find((s) => s.name === sheetName);
    if (!sheet) return;

    setConfig((prev) => ({
      ...prev,
      selectedColumnsBySheet: {
        ...prev.selectedColumnsBySheet,
        [sheetName]: all ? [...sheet.headers] : [sheet.headers[0]],
      },
    }));
  };

  // Convert to PDF
  const handleGeneratePDF = async () => {
    if (!workbook) return;

    setIsGeneratingPDF(true);
    try {
      const result = await generatePDF(workbook, config);
      setPdfResult(result);
    } catch (err: any) {
      console.error('PDF generation error:', err);
      setFileErrorMessage(t.errorCorruptedSpreadsheet);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const scrollToUpload = () => {
    uploadAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentStep = (): 1 | 2 | 3 | 4 | 5 => {
    if (pdfResult || (mode === 'pdf-to-sheet' && workbook)) return 5;
    if (isGeneratingPDF) return 4;
    if (workbook) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header with bilingual toggle and mode switcher */}
      <Header
        onOpenHowItWorks={() => setShowHowItWorks(true)}
        onReset={handleReset}
        hasFile={!!workbook}
        language={language}
        onLanguageChange={setLanguage}
        mode={mode}
        onModeChange={handleModeChange}
        t={t}
      />

      {/* Progress Steps Indicator */}
      <ConversionFlowSteps
        currentStep={getCurrentStep()}
        onStepClick={(step) => {
          if (step === 1) handleReset();
          if (step === 2 && pdfResult) setPdfResult(null);
        }}
        t={t}
      />

      {/* If NO workbook is loaded: show Landing Hero */}
      {!workbook && (
        <Hero
          onScrollToUpload={scrollToUpload}
          onOpenHowItWorks={() => setShowHowItWorks(true)}
          onLoadFinancialSample={handleLoadFinancialSample}
          onLoadSalesSample={handleLoadSalesSample}
          onLoadPdfInvoiceSample={handleLoadPdfInvoiceSample}
          isLoadingSample={isProcessingFile}
          t={t}
          mode={mode}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* File Upload Zone */}
        <div ref={uploadAreaRef} className="w-full">
          <FileUploader
            workbook={workbook}
            onFileSelected={handleFileSelected}
            onRemoveFile={handleReset}
            isProcessing={isProcessingFile}
            errorMessage={fileErrorMessage}
            onClearError={() => setFileErrorMessage(undefined)}
            t={t}
            mode={mode}
          />
        </div>

        {/* When spreadsheet is loaded: Show Dual Column Desktop Layout (Sheet to PDF) */}
        {workbook && mode === 'sheet-to-pdf' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Spreadsheet Interactive Table Preview */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    {t.spreadsheetPreviewTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t.spreadsheetPreviewSubtitle}
                  </p>
                </div>
              </div>

              <SpreadsheetPreview
                workbook={workbook}
                activeSheetIndex={activeSheetIndex}
                onSelectSheetIndex={setActiveSheetIndex}
                config={config}
                onToggleColumn={handleToggleColumn}
                onSelectAllColumns={handleSelectAllColumns}
                t={t}
              />
            </div>

            {/* Right Column: PDF Customization Settings */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
              <PDFSettingsPanel
                workbook={workbook}
                config={config}
                onChangeConfig={setConfig}
                onGeneratePDF={handleGeneratePDF}
                isGenerating={isGeneratingPDF}
                t={t}
              />
            </div>
          </div>
        )}

        {/* When PDF is loaded in PDF to Sheet mode: Show Extracted Tables & Direct Downloads */}
        {workbook && mode === 'pdf-to-sheet' && (
          <PdfToSheetView
            workbook={workbook}
            pageCount={pdfPageCount}
            t={t}
            onReset={handleReset}
          />
        )}

        {/* Features Showcase Section on Landing */}
        {!workbook && <FeaturesSection t={t} />}
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* PDF Result Preview Modal */}
      {pdfResult && (
        <PDFPreviewModal
          pdfResult={pdfResult}
          onClose={() => setPdfResult(null)}
          onReset={handleReset}
          t={t}
        />
      )}

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        t={t}
      />
    </div>
  );
}
