import React from 'react';
import { FileSpreadsheet, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Sheet to PDF Converter</span>
              <p className="text-slate-500 text-[11px]">Free, Private &amp; Secure Online Spreadsheet to PDF Utility</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Privacy</span>
            </div>
            <span>•</span>
            <span>Supports .CSV, .XLS, .XLSX</span>
            <span>•</span>
            <span>Unlimited Conversions</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Sheet to PDF Converter. All spreadsheet conversions occur in your local browser sandbox.</p>
          <p className="flex items-center gap-1">
            Engineered for high accuracy data formatting &amp; crisp vector prints
          </p>
        </div>
      </div>
    </footer>
  );
};
