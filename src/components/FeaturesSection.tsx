import React from 'react';
import {
  FileSpreadsheet,
  FileCheck,
  FileCode,
  Layers,
  Palette,
  ShieldCheck,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileSpreadsheet,
      color: 'blue',
      title: 'CSV to PDF',
      desc: 'Instantly convert comma-separated values into clean, paginated, and formatted PDF documents with zero data distortion.',
      badge: 'Lightweight & Fast',
    },
    {
      icon: FileCheck,
      color: 'emerald',
      title: 'XLS to PDF',
      desc: 'Seamless compatibility with legacy Excel 97-2004 binary (.xls) workbooks, preserving formatting and data formulas accurately.',
      badge: 'Legacy Support',
    },
    {
      icon: FileCode,
      color: 'indigo',
      title: 'XLSX to PDF',
      desc: 'Full support for modern OpenXML Excel (.xlsx) workbooks, handling multiple sheets, date fields, and high-precision numbers.',
      badge: 'Modern Excel',
    },
    {
      icon: Layers,
      color: 'purple',
      title: 'Multi-Sheet Support',
      desc: 'Convert multiple worksheets into a unified PDF file or pick specific tabs. Automatic page breaks between sheets with clear titles.',
      badge: 'Batch Worksheets',
    },
    {
      icon: Palette,
      color: 'amber',
      title: 'Custom PDF Layout',
      desc: 'Tailor page orientation (portrait/landscape), paper sizes (A4, Letter, A3, Legal), fonts, zebra striping, and cell margins.',
      badge: 'Design Freedom',
    },
    {
      icon: ShieldCheck,
      color: 'teal',
      title: 'Secure Processing',
      desc: 'Your files are processed securely and are not shared. Everything runs 100% client-side in your web browser with zero server uploads.',
      badge: 'Zero Telemetry',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Enterprise Grade Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Comprehensive Spreadsheet to PDF Conversion
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Built from the ground up to handle wide columns, massive row counts, and professional PDF output directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 group-hover:border-blue-200 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
