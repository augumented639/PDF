import React, { useState } from 'react';
import {
  Settings,
  FileText,
  Palette,
  Sliders,
  Layers,
  FileDown,
  Check,
} from 'lucide-react';
import { PDFConfig, ParsedWorkbook, TableTheme, PageSize, PageOrientation, MarginOption } from '../types';
import { THEME_PALETTES } from '../utils/pdfGenerator';
import { Translations } from '../i18n/translations';

interface PDFSettingsPanelProps {
  workbook: ParsedWorkbook;
  config: PDFConfig;
  onChangeConfig: (newConfig: PDFConfig) => void;
  onGeneratePDF: () => void;
  isGenerating: boolean;
  t: Translations;
}

export const PDFSettingsPanel: React.FC<PDFSettingsPanelProps> = ({
  workbook,
  config,
  onChangeConfig,
  onGeneratePDF,
  isGenerating,
  t,
}) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'content' | 'styling' | 'branding'>('layout');

  const updateConfig = (partial: Partial<PDFConfig>) => {
    onChangeConfig({
      ...config,
      ...partial,
    });
  };

  const handleThemeSelect = (themeKey: TableTheme) => {
    const palette = THEME_PALETTES[themeKey];
    if (palette) {
      updateConfig({
        theme: themeKey,
        headerBgColor: palette.headerBg,
        headerTextColor: palette.headerText,
        alternateRowBgColor: palette.altBg,
      });
    }
  };

  const totalSheets = workbook.sheets.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t.pdfCustomizationTitle}</h3>
            <p className="text-[11px] text-slate-500">{t.pdfCustomizationSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 text-xs font-semibold p-1.5 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-2 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'layout'
              ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{t.tabLayout}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('branding')}
          className={`flex-1 py-2 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'branding'
              ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t.tabBranding}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('styling')}
          className={`flex-1 py-2 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'styling'
              ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{t.tabStyling}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'content'
              ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.tabScope}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-5 overflow-y-auto max-h-[520px] space-y-5 text-xs text-slate-700 flex-1 scrollbar-thin">
        {/* ===================== TAB 1: LAYOUT ===================== */}
        {activeTab === 'layout' && (
          <div className="space-y-4 animate-fade-in">
            {/* Page Size */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">{t.pageSizeLabel}</label>
              <div className="grid grid-cols-3 gap-2">
                {(['a4', 'letter', 'legal', 'a3', 'custom'] as PageSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updateConfig({ pageSize: size })}
                    className={`py-2 px-2.5 rounded-lg border font-medium uppercase text-center transition-all cursor-pointer ${
                      config.pageSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {config.pageSize === 'custom' && (
                <div className="grid grid-cols-2 gap-2 mt-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">{t.widthMm}</label>
                    <input
                      type="number"
                      min={50}
                      max={600}
                      value={config.customPageWidthMm}
                      onChange={(e) => updateConfig({ customPageWidthMm: Number(e.target.value) || 210 })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">{t.heightMm}</label>
                    <input
                      type="number"
                      min={50}
                      max={600}
                      value={config.customPageHeightMm}
                      onChange={(e) => updateConfig({ customPageHeightMm: Number(e.target.value) || 297 })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Orientation */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">{t.orientationLabel}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'auto', label: t.orientationAuto, desc: t.orientationAutoDesc },
                  { id: 'portrait', label: t.orientationPortrait, desc: t.orientationPortraitDesc },
                  { id: 'landscape', label: t.orientationLandscape, desc: t.orientationLandscapeDesc },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig({ orientation: item.id as PageOrientation })}
                    className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                      config.orientation === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Margins */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">{t.marginsLabel}</label>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'narrow', 'normal', 'wide'] as MarginOption[]).map((margin) => (
                  <button
                    key={margin}
                    type="button"
                    onClick={() => updateConfig({ marginType: margin })}
                    className={`py-2 px-1.5 rounded-lg border capitalize text-center transition-all cursor-pointer ${
                      config.marginType === margin
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {margin}
                  </button>
                ))}
              </div>
            </div>

            {/* PDF Layout Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.fitToPageWidth}
                  onChange={(e) => updateConfig({ fitToPageWidth: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-slate-800">{t.fitToWidth}</span>
                  <p className="text-[11px] text-slate-500">{t.fitToWidthDesc}</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.repeatHeader}
                  onChange={(e) => updateConfig({ repeatHeader: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-slate-800">{t.repeatHeader}</span>
                  <p className="text-[11px] text-slate-500">{t.repeatHeaderDesc}</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showGridlines}
                  onChange={(e) => updateConfig({ showGridlines: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-slate-800">{t.showGridlines}</span>
                  <p className="text-[11px] text-slate-500">{t.showGridlinesDesc}</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showRowNumbers}
                  onChange={(e) => updateConfig({ showRowNumbers: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-slate-800">{t.showRowNumbers}</span>
                  <p className="text-[11px] text-slate-500">{t.showRowNumbersDesc}</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showPageNumbers}
                  onChange={(e) => updateConfig({ showPageNumbers: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-slate-800">{t.showPageNumbers}</span>
                  <p className="text-[11px] text-slate-500">{t.showPageNumbersDesc}</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: BRANDING & HEADERS ===================== */}
        {activeTab === 'branding' && (
          <div className="space-y-4 animate-fade-in">
            {/* Document Title */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">{t.docTitleLabel}</label>
              <input
                type="text"
                placeholder={t.docTitlePlaceholder}
                value={config.documentTitle}
                onChange={(e) => updateConfig({ documentTitle: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">{t.docTitleHelp}</p>
            </div>

            {/* Company / Brand Name */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">{t.companyLabel}</label>
              <input
                type="text"
                placeholder={t.companyPlaceholder}
                value={config.companyName}
                onChange={(e) => updateConfig({ companyName: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Custom Header Text */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">{t.customHeaderLabel}</label>
              <input
                type="text"
                placeholder={t.customHeaderPlaceholder}
                value={config.headerText}
                onChange={(e) => updateConfig({ headerText: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Custom Footer Text */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">{t.customFooterLabel}</label>
              <input
                type="text"
                placeholder={t.customFooterPlaceholder}
                value={config.footerText}
                onChange={(e) => updateConfig({ footerText: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Date Configuration */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={config.showDate}
                  onChange={(e) => updateConfig({ showDate: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">{t.printDateLabel}</span>
              </label>

              {config.showDate && (
                <input
                  type="text"
                  placeholder={t.customDatePlaceholder}
                  value={config.customDateText}
                  onChange={(e) => updateConfig({ customDateText: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs"
                />
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: STYLING & COLORS ===================== */}
        {activeTab === 'styling' && (
          <div className="space-y-4 animate-fade-in">
            {/* Color Theme Presets */}
            <div>
              <label className="block font-semibold text-slate-800 mb-2">{t.tableColorTheme}</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(THEME_PALETTES).map(([key, val]) => {
                  const isSelected = config.theme === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleThemeSelect(key as TableTheme)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-md shrink-0 shadow-2xs border border-black/10"
                        style={{ backgroundColor: val.headerBg }}
                      />
                      <div className="flex-1 truncate">
                        <div className="font-semibold text-slate-800 truncate">{val.name}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{t.headerBg}</span>
                <input
                  type="color"
                  value={config.headerBgColor}
                  onChange={(e) =>
                    updateConfig({
                      headerBgColor: e.target.value,
                      theme: 'custom',
                    })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{t.headerTextColor}</span>
                <input
                  type="color"
                  value={config.headerTextColor}
                  onChange={(e) =>
                    updateConfig({
                      headerTextColor: e.target.value,
                      theme: 'custom',
                    })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{t.altRowZebra}</span>
                <input
                  type="color"
                  value={config.alternateRowBgColor}
                  onChange={(e) =>
                    updateConfig({
                      alternateRowBgColor: e.target.value,
                      theme: 'custom',
                    })
                  }
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Alternate Rows Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.alternateRows}
                onChange={(e) => updateConfig({ alternateRows: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold text-slate-800">{t.alternateRowsToggle}</span>
            </label>

            {/* Typography / Font selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">{t.pdfFontLabel}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'helvetica', label: 'Helvetica', desc: 'Sans-serif' },
                  { id: 'times', label: 'Times', desc: 'Classic serif' },
                  { id: 'courier', label: 'Courier', desc: 'Monospace' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => updateConfig({ font: f.id as any })}
                    className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                      config.font === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{f.label}</div>
                    <div className="text-[10px] text-slate-400">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Sizes & Padding Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{t.tableFontSize}</span>
                  <span className="font-bold text-blue-600">{config.fontSize} pt</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={13}
                  step={0.5}
                  value={config.fontSize}
                  onChange={(e) => updateConfig({ fontSize: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{t.headerFontSize}</span>
                  <span className="font-bold text-blue-600">{config.headerFontSize} pt</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={15}
                  step={0.5}
                  value={config.headerFontSize}
                  onChange={(e) => updateConfig({ headerFontSize: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{t.cellPadding}</span>
                  <span className="font-bold text-blue-600">{config.cellPadding} mm</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={0.5}
                  value={config.cellPadding}
                  onChange={(e) => updateConfig({ cellPadding: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Text & Number Alignments */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">{t.textAlignLabel}</label>
                <select
                  value={config.textAlignment}
                  onChange={(e) => updateConfig({ textAlignment: e.target.value as any })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs"
                >
                  <option value="left">{t.alignLeft}</option>
                  <option value="center">{t.alignCenter}</option>
                  <option value="right">{t.alignRight}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">{t.numberAlignLabel}</label>
                <select
                  value={config.numberAlignment}
                  onChange={(e) => updateConfig({ numberAlignment: e.target.value as any })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs"
                >
                  <option value="right">{t.alignRightStd}</option>
                  <option value="center">{t.alignCenter}</option>
                  <option value="left">{t.alignLeft}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: SHEET & ROW SCOPE ===================== */}
        {activeTab === 'content' && (
          <div className="space-y-4 animate-fade-in">
            {/* Sheet Selection Mode */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">{t.sheetsToInclude}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: t.allSheets, desc: `${totalSheets} sheets` },
                  { id: 'current', label: t.currentSheet, desc: workbook.sheets[workbook.activeSheetIndex]?.name },
                  { id: 'specific', label: t.specificSheets, desc: 'Custom pick' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig({ sheetSelectionMode: item.id as any })}
                    className={`py-2 px-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                      config.sheetSelectionMode === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Specific sheet selection checkboxes */}
              {config.sheetSelectionMode === 'specific' && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-700 block mb-1">{t.selectWorksheets}</span>
                  {workbook.sheets.map((s) => {
                    const isChecked = config.selectedSheetNames.includes(s.name);
                    return (
                      <label key={s.name} className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            let next: string[];
                            if (e.target.checked) {
                              next = [...config.selectedSheetNames, s.name];
                            } else {
                              next = config.selectedSheetNames.filter((name) => name !== s.name);
                            }
                            updateConfig({ selectedSheetNames: next });
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="font-medium text-slate-800">{s.name}</span>
                        <span className="text-slate-400">({s.rows.length} rows)</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Include Sheet Title Banner */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeSheetTitle}
                onChange={(e) => updateConfig({ includeSheetTitle: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-semibold text-slate-800">{t.printSheetNameHeading}</span>
                <p className="text-[11px] text-slate-500">{t.printSheetNameDesc}</p>
              </div>
            </label>

            {/* Row Range Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-800 mb-1">{t.rowRangeLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">{t.startRow}</span>
                  <input
                    type="number"
                    min={1}
                    value={config.rowRangeStart}
                    onChange={(e) => updateConfig({ rowRangeStart: Math.max(1, Number(e.target.value) || 1) })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">{t.endRow}</span>
                  <input
                    type="number"
                    min={0}
                    value={config.rowRangeEnd}
                    onChange={(e) => updateConfig({ rowRangeEnd: Math.max(0, Number(e.target.value) || 0) })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Convert CTA */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/90">
        <button
          type="button"
          disabled={isGenerating}
          onClick={onGeneratePDF}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t.convertingBtn}</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              <span>{t.convertBtn}</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-400 mt-2">
          {t.clientSideGuarantee}
        </p>
      </div>
    </div>
  );
};
