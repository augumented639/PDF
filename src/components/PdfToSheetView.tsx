import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Layers,
  Search,
  CheckCircle,
  FileText,
  Table as TableIcon,
  RotateCcw,
} from 'lucide-react';
import { ParsedWorkbook } from '../types';
import { Translations } from '../i18n/translations';
import { downloadWorkbookAsFormat } from '../utils/pdfTableExtractor';

interface PdfToSheetViewProps {
  workbook: ParsedWorkbook;
  pageCount: number;
  t: Translations;
  onReset: () => void;
}

export const PdfToSheetView: React.FC<PdfToSheetViewProps> = ({
  workbook,
  pageCount,
  t,
  onReset,
}) => {
  const [activeSheetIdx, setActiveSheetIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const activeSheet = workbook.sheets[activeSheetIdx] || workbook.sheets[0];

  const filteredRows = (activeSheet?.rows || []).filter((row) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return row.some((cell) => cell !== null && cell !== undefined && String(cell).toLowerCase().includes(term));
  });

  const totalExtractedRows = workbook.sheets.reduce((acc, s) => acc + s.rows.length, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col space-y-6 p-6">
      {/* Top Banner with Stats & Download Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-100">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{t.extractedDataTitle}</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t.parsedBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {workbook.fileName} • {pageCount} {t.pagesFound} • {totalExtractedRows} {t.showingRowsOf.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download XLSX */}
          <button
            type="button"
            onClick={() => downloadWorkbookAsFormat(workbook, 'xlsx')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadXlsx}</span>
          </button>

          {/* Download CSV */}
          <button
            type="button"
            onClick={() => downloadWorkbookAsFormat(workbook, 'csv')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>{t.downloadCsv}</span>
          </button>

          {/* Download XLS */}
          <button
            type="button"
            onClick={() => downloadWorkbookAsFormat(workbook, 'xls')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <span>{t.downloadXls}</span>
          </button>

          {/* Start Over */}
          <button
            type="button"
            onClick={onReset}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title={t.startOver}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pages Tabs if multiple pages */}
      {workbook.sheets.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5" /> {t.sheetsLabel}
          </span>
          {workbook.sheets.map((sheet, idx) => {
            const isActive = idx === activeSheetIdx;
            return (
              <button
                key={sheet.name}
                type="button"
                onClick={() => setActiveSheetIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{sheet.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {sheet.rows.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Search & Columns Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{t.detectedHeaders}</span>{' '}
          {activeSheet?.headers.slice(0, 5).join(', ')}
          {activeSheet && activeSheet.headers.length > 5 && ` (+${activeSheet.headers.length - 5} more)`}
        </div>
      </div>

      {/* Extracted Table View */}
      <div className="relative overflow-auto max-h-[460px] border border-slate-200 rounded-xl bg-white scrollbar-thin">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="sticky top-0 z-20 bg-slate-100/95 backdrop-blur-xs border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3 text-center text-[11px] font-bold text-slate-500 border-r border-slate-200 w-12">
                #
              </th>
              {activeSheet?.headers.map((h, i) => (
                <th
                  key={i}
                  className="py-2.5 px-3.5 text-xs font-bold text-slate-700 border-r border-slate-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={(activeSheet?.headers.length || 0) + 1} className="py-12 text-center text-slate-400">
                  <TableIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="font-medium text-slate-600">{t.noMatchingRows}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.tryClearingSearch}</p>
                </td>
              </tr>
            ) : (
              filteredRows.map((row, rIdx) => {
                const isEven = rIdx % 2 === 0;
                return (
                  <tr key={rIdx} className={`hover:bg-blue-50/40 transition-colors ${isEven ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2 px-3 text-center text-[11px] font-mono text-slate-400 border-r border-slate-100 bg-slate-50/60">
                      {rIdx + 1}
                    </td>
                    {activeSheet.headers.map((_, colIdx) => {
                      const val = row[colIdx];
                      const isEmpty = val === null || val === undefined || val === '';
                      return (
                        <td key={colIdx} className="py-2 px-3.5 border-r border-slate-100 text-slate-800 whitespace-nowrap">
                          {isEmpty ? <span className="text-slate-300">—</span> : String(val)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
