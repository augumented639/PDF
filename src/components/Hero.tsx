import React from 'react';
import { UploadCloud, FileText, Sparkles, CheckCircle2, Shield, Layers, FileSpreadsheet } from 'lucide-react';

interface HeroProps {
  onScrollToUpload: () => void;
  onOpenHowItWorks: () => void;
  onLoadFinancialSample: () => void;
  onLoadSalesSample: () => void;
  isLoadingSample: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToUpload,
  onOpenHowItWorks,
  onLoadFinancialSample,
  onLoadSalesSample,
  isLoadingSample,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200/60">
      {/* Background Decorative subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Zero Server Uploads • 100% Private Client-Side Conversion</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Convert CSV &amp; Excel Files to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PDF Instantly</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transform your CSV, XLS and XLSX spreadsheets into professional PDF documents in seconds.
          Customize page orientation, repeating headers, fonts, and clean margins.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onScrollToUpload}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Spreadsheet</span>
          </button>

          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>How It Works</span>
          </button>
        </div>

        {/* Quick Sample Demo Loaders */}
        <div className="mt-7 pt-5 border-t border-slate-200/70 max-w-xl mx-auto">
          <p className="text-xs font-medium text-slate-500 mb-2.5">
            Don’t have a spreadsheet right now? Try an instant sample:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={isLoadingSample}
              onClick={onLoadFinancialSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-blue-600 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Multi-Sheet Financial Report (.xlsx)</span>
            </button>
            <button
              type="button"
              disabled={isLoadingSample}
              onClick={onLoadSalesSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-blue-600 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Global Sales Transactions (.csv)</span>
            </button>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto text-xs text-slate-600">
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>CSV, XLS &amp; XLSX</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Multi-Sheet Support</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Auto Column Scaling</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
            <Shield className="w-4 h-4 text-teal-600 shrink-0" />
            <span>No Data Uploaded</span>
          </div>
        </div>
      </div>
    </div>
  );
};
