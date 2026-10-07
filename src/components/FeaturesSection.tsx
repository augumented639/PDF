import React from 'react';
import {
  FileSpreadsheet,
  FileCheck,
  FileCode,
  Layers,
  Palette,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { Translations } from '../i18n/translations';

interface FeaturesSectionProps {
  t: Translations;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ t }) => {
  const features = [
    {
      icon: FileSpreadsheet,
      title: t.featCsvTitle,
      desc: t.featCsvDesc,
      badge: 'CSV',
    },
    {
      icon: FileCheck,
      title: t.featXlsTitle,
      desc: t.featXlsDesc,
      badge: 'XLS',
    },
    {
      icon: FileCode,
      title: t.featXlsxTitle,
      desc: t.featXlsxDesc,
      badge: 'XLSX',
    },
    {
      icon: FileDown,
      title: t.featPdfToSheetTitle,
      desc: t.featPdfToSheetDesc,
      badge: 'PDF ➔ Excel',
    },
    {
      icon: Layers,
      title: t.featMultiSheetTitle,
      desc: t.featMultiSheetDesc,
      badge: 'Multi-Sheet',
    },
    {
      icon: Palette,
      title: t.featCustomLayoutTitle,
      desc: t.featCustomLayoutDesc,
      badge: 'CAD $ / Layout',
    },
    {
      icon: ShieldCheck,
      title: t.featSecureTitle,
      desc: t.featSecureDesc,
      badge: 'Privacy 100%',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            {t.featuresHeadingTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            {t.featuresTitle}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 group-hover:border-blue-200 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
