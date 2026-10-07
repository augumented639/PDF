import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FileUploader } from './components/FileUploader';
import { SpreadsheetPreview } from './components/SpreadsheetPreview';
import { PDFSettingsPanel } from './components/PDFSettingsPanel';
import { PDFPreviewModal } from './components/PDFPreviewModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { ConversionFlowSteps } from './components/ConversionFlowSteps';
import { ParsedWorkbook, PDFConfig, GeneratedPDFResult } from './types';
import { DEFAULT_PDF_CONFIG, generatePDF } from './utils/pdfGenerator';
import { parseSpreadsheetFile } from './utils/spreadsheetParser';
import { createFinancialReportWorkbook, createSalesCSVWorkbook } from './utils/sampleData';

export default function App() {
  const [workbook, setWorkbook] = useState<ParsedWorkbook | null>(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [config, setConfig] = useState<PDFConfig>(DEFAULT_PDF_CONFIG);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | undefined>(undefined);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfResult, setPdfResult] = useState<GeneratedPDFResult | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const uploadAreaRef = useRef<HTMLDivElement>(null);

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

  // Handle uploaded file
  const handleFileSelected = async (file: File) => {
    setIsProcessingFile(true);
    setFileErrorMessage(undefined);

    try {
      const result = await parseSpreadsheetFile(file);
      if (result.success && result.workbook) {
        setWorkbook(result.workbook);
        setupWorkbookDefaults(result.workbook);
      } else {
        setFileErrorMessage(
          result.errorMessage ||
            'Sorry, we couldn’t read this spreadsheet. Please verify that the file is not corrupted and try again.'
        );
      }
    } catch (err: any) {
      console.error(err);
      setFileErrorMessage('Sorry, an unexpected error occurred while parsing the file. Please try again.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Sample data loaders
  const handleLoadFinancialSample = () => {
    setIsProcessingFile(true);
    setTimeout(() => {
      const sampleWb = createFinancialReportWorkbook();
      setWorkbook(sampleWb);
      setupWorkbookDefaults(sampleWb);
      setIsProcessingFile(false);
    }, 200);
  };

  const handleLoadSalesSample = () => {
    setIsProcessingFile(true);
    setTimeout(() => {
      const sampleWb = createSalesCSVWorkbook();
      setWorkbook(sampleWb);
      setupWorkbookDefaults(sampleWb);
      setIsProcessingFile(false);
    }, 200);
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

  // Column toggle
  const handleToggleColumn = (sheetName: string, columnName: string) => {
    const currentCols = config.selectedColumnsBySheet[sheetName] || [];
    let updatedCols: string[];
    if (currentCols.includes(columnName)) {
      // Don't allow unselecting all columns completely
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
      setFileErrorMessage(
        'Sorry, we encountered an issue generating the PDF. Please check your margin or font settings and try again.'
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const scrollToUpload = () => {
    uploadAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Determine current step for progress indicator
  const getCurrentStep = (): 1 | 2 | 3 | 4 | 5 => {
    if (pdfResult) return 5;
    if (isGeneratingPDF) return 4;
    if (workbook) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header */}
      <Header
        onOpenHowItWorks={() => setShowHowItWorks(true)}
        onReset={handleReset}
        hasFile={!!workbook}
      />

      {/* Progress Steps Indicator */}
      <ConversionFlowSteps
        currentStep={getCurrentStep()}
        onStepClick={(step) => {
          if (step === 1) handleReset();
          if (step === 2 && pdfResult) setPdfResult(null);
        }}
      />

      {/* If NO workbook is loaded: show Landing Hero */}
      {!workbook && (
        <Hero
          onScrollToUpload={scrollToUpload}
          onOpenHowItWorks={() => setShowHowItWorks(true)}
          onLoadFinancialSample={handleLoadFinancialSample}
          onLoadSalesSample={handleLoadSalesSample}
          isLoadingSample={isProcessingFile}
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
          />
        </div>

        {/* When spreadsheet is loaded: Show Dual Column Desktop Layout */}
        {workbook && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Spreadsheet Interactive Table Preview */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Spreadsheet Data Preview</h2>
                  <p className="text-xs text-slate-500">
                    Live view of worksheet data. Filter columns or sort rows before exporting.
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
              />
            </div>
          </div>
        )}

        {/* Features Showcase Section on Landing */}
        {!workbook && <FeaturesSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* PDF Result Preview Modal */}
      {pdfResult && (
        <PDFPreviewModal
          pdfResult={pdfResult}
          onClose={() => setPdfResult(null)}
          onReset={handleReset}
        />
      )}

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  );
}
