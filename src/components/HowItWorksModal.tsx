import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">How Sheet to PDF Works</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-600 max-h-[75vh] overflow-y-auto scrollbar-thin">
          {/* Step by step */}
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Upload Spreadsheet</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Drag and drop any .CSV, .XLS, or .XLSX file. Our in-browser parser immediately interprets the worksheet columns, formulas, and data values.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Preview &amp; Filter Content</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Inspect your spreadsheet in the interactive data table. Search rows, toggle columns, sort values, and switch between multiple worksheets.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Customize Layout &amp; Design</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Select page dimensions (A4, A3, Letter, Legal), paper orientation (Portrait, Landscape, Auto-fit), fonts, repeating headers, zebra row shading, and custom headers/footers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Convert, Preview &amp; Download</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Generate the vector PDF in milliseconds. Preview the document in the interactive viewer, print directly, or download the clean file instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Box */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Strict Privacy &amp; Data Security Guarantee</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Unlike cloud conversion services that upload your confidential spreadsheet files to remote servers, Sheet to PDF processes 100% of your data client-side inside your browser via WebAssembly and JavaScript. No spreadsheet data ever leaves your device, and everything is wiped upon reset.
            </p>
          </div>

          {/* Smart Table Handling Tips */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Smart Handling for Large Tables
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Wide tables:</strong> Use <em>Landscape</em> or enable <em>Auto Detect</em> to avoid clipping columns.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Long tables:</strong> Enable <em>Repeat header on every page</em> for continuous reading clarity.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Multiple sheets:</strong> Choose <em>All Sheets</em> to combine everything into a single organized PDF.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            Got it, let’s convert!
          </button>
        </div>
      </div>
    </div>
  );
};
