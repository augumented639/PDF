import React from 'react';
import {
  FileSpreadsheet,
  ShieldCheck,
  HelpCircle,
  RotateCcw,
  Globe,
  ArrowRightLeft,
  FileDown,
  FileUp,
} from 'lucide-react';
import { Language, Translations } from '../i18n/translations';
import { ConversionMode } from '../types';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onReset: () => void;
  hasFile: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: ConversionMode;
  onModeChange: (mode: ConversionMode) => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onReset,
  hasFile,
  language,
  onLanguageChange,
  mode,
  onModeChange,
  t,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  {t.appTitle}
                </span>
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  {t.proBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Bi-directional Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onModeChange('sheet-to-pdf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mode === 'sheet-to-pdf'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>{t.modeSheetToPdf}</span>
            </button>

            <button
              type="button"
              onClick={() => onModeChange('pdf-to-sheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mode === 'pdf-to-sheet'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{t.modePdfToSheet}</span>
            </button>
          </div>

          {/* Language selector, privacy badge and Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector (Canada English & Français) */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-white text-blue-700 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="English (Canada / Global)"
              >
                <span>🇨🇦 EN</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'fr'
                    ? 'bg-white text-blue-700 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Français (Canada)"
              >
                <span>🇨🇦 FR</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.securePrivacyBadge}</span>
            </div>

            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">{t.howItWorks}</span>
            </button>

            {hasFile && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title={t.startOver}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.startOver}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
