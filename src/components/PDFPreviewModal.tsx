import React, { useRef } from 'react';
import {
  Download,
  Printer,
  RotateCcw,
  Sliders,
  CheckCircle2,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { GeneratedPDFResult } from '../types';
import { Translations } from '../i18n/translations';

interface PDFPreviewModalProps {
  pdfResult: GeneratedPDFResult | null;
  onClose: () => void;
  onReset: () => void;
  t: Translations;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  pdfResult,
  onClose,
  onReset,
  t,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!pdfResult) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfResult.blobUrl;
    link.download = pdfResult.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      } catch (err) {
        window.open(pdfResult.blobUrl, '_blank');
      }
    } else {
      window.open(pdfResult.blobUrl, '_blank');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'Ko', 'Mo', 'Go'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base leading-tight truncate max-w-xs sm:max-w-md">
                  {pdfResult.fileName}
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {t.readyBadge}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>
                  {pdfResult.pageCount} {pdfResult.pageCount === 1 ? t.pageCountSingular : t.pageCountPlural}
                </span>
                <span>•</span>
                <span>{formatFileSize(pdfResult.fileSizeBytes)}</span>
                <span>•</span>
                <span>{t.vectorPdfBadge}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Download PDF button */}
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadPdfBtn}</span>
            </button>

            {/* Print PDF button */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              title={t.printBtn}
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{t.printBtn}</span>
            </button>

            {/* Close / Edit settings */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title={t.editSettingsBtn}
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">{t.editSettingsBtn}</span>
            </button>

            {/* Close X */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-200/80 relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
          <iframe
            ref={iframeRef}
            src={`${pdfResult.blobUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full rounded-xl bg-white shadow-lg border border-slate-300"
            title="Generated PDF Preview"
          />
        </div>

        {/* Bottom Bar with auxiliary actions */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>{t.previewSubtext}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.convertAnotherFileBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              {t.directDownloadLink}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
