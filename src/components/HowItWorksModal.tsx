import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Translations } from '../i18n/translations';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, t }) => {
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
            <h3 className="text-base font-bold text-slate-900">{t.howItWorksTitle}</h3>
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
                <h4 className="font-bold text-slate-900 text-sm">{t.step1Title}</h4>
                <p className="text-xs text-slate-600 mt-1">{t.step1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.step2Title}</h4>
                <p className="text-xs text-slate-600 mt-1">{t.step2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.step3Title}</h4>
                <p className="text-xs text-slate-600 mt-1">{t.step3Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t.step4Title}</h4>
                <p className="text-xs text-slate-600 mt-1">{t.step4Desc}</p>
              </div>
            </div>
          </div>

          {/* Privacy Box */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{t.privacyGuaranteeTitle}</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              {t.privacyGuaranteeText}
            </p>
          </div>

          {/* Smart Table Handling Tips */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              {t.smartHandlingTitle}
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t.smartTip1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t.smartTip2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t.smartTip3}</span>
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
            {t.modalCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
