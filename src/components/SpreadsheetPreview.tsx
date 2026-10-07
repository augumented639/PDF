import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ZoomIn,
  ZoomOut,
  Layers,
  Filter,
  Eye,
  EyeOff,
  Hash,
  Table as TableIcon,
} from 'lucide-react';
import { ParsedWorkbook, ParsedSheet, PDFConfig } from '../types';
import { Translations } from '../i18n/translations';

interface SpreadsheetPreviewProps {
  workbook: ParsedWorkbook;
  activeSheetIndex: number;
  onSelectSheetIndex: (index: number) => void;
  config: PDFConfig;
  onToggleColumn: (sheetName: string, columnName: string) => void;
  onSelectAllColumns: (sheetName: string, all: boolean) => void;
  t: Translations;
}

type SortDirection = 'asc' | 'desc' | null;

export const SpreadsheetPreview: React.FC<SpreadsheetPreviewProps> = ({
  workbook,
  activeSheetIndex,
  onSelectSheetIndex,
  config,
  onToggleColumn,
  onSelectAllColumns,
  t,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColIndex, setSortColIndex] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showColumnFilter, setShowColumnFilter] = useState(false);

  const activeSheet: ParsedSheet | undefined = workbook.sheets[activeSheetIndex] || workbook.sheets[0];
  const sheetName = activeSheet?.name || 'Sheet1';

  // Get currently selected columns for this sheet
  const selectedColsForSheet: string[] = useMemo(() => {
    if (!activeSheet) return [];
    return config.selectedColumnsBySheet[sheetName] || activeSheet.headers;
  }, [config.selectedColumnsBySheet, sheetName, activeSheet]);

  // Handle sorting
  const handleSort = (colIdx: number) => {
    if (sortColIndex === colIdx) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortColIndex(null);
        setSortDirection(null);
      }
    } else {
      setSortColIndex(colIdx);
      setSortDirection('asc');
    }
  };

  // Filter and sort data rows
  const processedRows = useMemo(() => {
    if (!activeSheet) return [];
    let rows = [...activeSheet.rows];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      rows = rows.filter((row) =>
        row.some((cell) => cell !== null && cell !== undefined && String(cell).toLowerCase().includes(term))
      );
    }

    // Sort
    if (sortColIndex !== null && sortDirection !== null) {
      rows.sort((a, b) => {
        const valA = a[sortColIndex];
        const valB = b[sortColIndex];

        if (valA === valB) return 0;
        if (valA === null || valA === undefined || valA === '') return 1;
        if (valB === null || valB === undefined || valB === '') return -1;

        // Try numeric sort
        const cleanA = String(valA).replace(/[$€£¥%,]/g, '');
        const cleanB = String(valB).replace(/[$€£¥%,]/g, '');
        const numA = Number(cleanA);
        const numB = Number(cleanB);

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }

        const comp = String(valA).localeCompare(String(valB), undefined, { numeric: true });
        return sortDirection === 'asc' ? comp : -comp;
      });
    }

    return rows;
  }, [activeSheet, searchTerm, sortColIndex, sortDirection]);

  if (!activeSheet) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        No spreadsheet data available.
      </div>
    );
  }

  // Determine active columns (intersection of activeSheet.headers and selectedColsForSheet)
  const visibleHeaders = activeSheet.headers.map((header, idx) => ({
    header,
    originalIndex: idx,
    isVisible: selectedColsForSheet.includes(header),
  }));

  const allColumnsChecked = activeSheet.headers.length === selectedColsForSheet.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Top Header Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 space-y-3">
        {/* Multi-sheet selector tabs */}
        {workbook.sheets.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5" /> {t.sheetsLabel}
            </span>
            {workbook.sheets.map((sheet, idx) => {
              const isActive = idx === activeSheetIndex;
              return (
                <button
                  key={sheet.name}
                  type="button"
                  onClick={() => onSelectSheetIndex(idx)}
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

        {/* Search, Column Toggles, Zoom */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                {t.clearSearch}
              </button>
            )}
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2">
            {/* Column Visibility Filter Toggle */}
            <button
              type="button"
              onClick={() => setShowColumnFilter(!showColumnFilter)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                showColumnFilter
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Filter PDF columns"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{t.columnsBtn}</span>
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-700">
                {selectedColsForSheet.length}/{activeSheet.headers.length}
              </span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                disabled={zoomLevel <= 70}
                className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
                title={t.zoomOut}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-medium text-slate-600 min-w-[36px] text-center select-none">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                disabled={zoomLevel >= 130}
                className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
                title={t.zoomIn}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown / panel for Column selection checkboxes */}
        {showColumnFilter && (
          <div className="p-3 bg-white border border-blue-200/70 rounded-xl shadow-xs animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">{t.columnsToInclude}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectAllColumns(sheetName, !allColumnsChecked)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {allColumnsChecked ? t.deselectAll : t.selectAll}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
              {activeSheet.headers.map((header) => {
                const isSelected = selectedColsForSheet.includes(header);
                return (
                  <button
                    key={header}
                    type="button"
                    onClick={() => onToggleColumn(sheetName, header)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    }`}
                  >
                    {isSelected ? <Eye className="w-3 h-3 text-blue-600" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
                    <span>{header}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Spreadsheet Table Container with Horizontal & Vertical Scrolling and Frozen Header */}
      <div className="relative overflow-auto max-h-[500px] border-b border-slate-200 bg-white scrollbar-thin">
        <table
          className="w-full border-collapse text-left"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', minWidth: '100%' }}
        >
          {/* Frozen Sticky Header */}
          <thead className="sticky top-0 z-20 bg-slate-100/95 backdrop-blur-xs shadow-2xs border-b border-slate-300">
            <tr>
              {/* Row number header */}
              <th className="py-2.5 px-3 text-center text-[11px] font-bold text-slate-500 bg-slate-100 border-r border-slate-200 w-12 sticky left-0 z-30">
                <span className="flex items-center justify-center gap-0.5">
                  <Hash className="w-3 h-3 text-slate-400" />
                </span>
              </th>

              {visibleHeaders
                .filter((h) => h.isVisible)
                .map(({ header, originalIndex }) => {
                  const isSorted = sortColIndex === originalIndex;
                  return (
                    <th
                      key={header}
                      onClick={() => handleSort(originalIndex)}
                      className="py-2.5 px-3.5 text-xs font-bold text-slate-700 border-r border-slate-200 hover:bg-slate-200/70 transition-colors cursor-pointer select-none group whitespace-nowrap"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{header}</span>
                        <span className="text-slate-400 group-hover:text-slate-600">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  );
                })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {processedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleHeaders.filter((h) => h.isVisible).length + 1}
                  className="py-12 text-center text-slate-400"
                >
                  <TableIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="font-medium text-slate-600">{t.noMatchingRows}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.tryClearingSearch}</p>
                </td>
              </tr>
            ) : (
              processedRows.map((row, rIdx) => {
                const isEven = rIdx % 2 === 0;
                return (
                  <tr
                    key={rIdx}
                    className={`hover:bg-blue-50/50 transition-colors ${
                      isEven ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    {/* Row Index Number */}
                    <td className="py-2 px-3 text-center text-[11px] font-mono font-medium text-slate-400 bg-slate-50/80 border-r border-slate-200 sticky left-0 z-10">
                      {rIdx + 1}
                    </td>

                    {/* Cell values */}
                    {visibleHeaders
                      .filter((h) => h.isVisible)
                      .map(({ originalIndex }) => {
                        const cellVal = row[originalIndex];
                        const isEmpty = cellVal === null || cellVal === undefined || cellVal === '';
                        const isNumeric =
                          !isEmpty &&
                          !isNaN(Number(String(cellVal).replace(/[$€£¥%,]/g, ''))) &&
                          String(cellVal).trim() !== '';

                        return (
                          <td
                            key={originalIndex}
                            className={`py-2 px-3.5 border-r border-slate-100 text-slate-800 whitespace-nowrap ${
                              isNumeric ? 'text-right font-mono' : 'text-left'
                            }`}
                          >
                            {isEmpty ? (
                              <span className="text-slate-300 select-none">—</span>
                            ) : (
                              String(cellVal)
                            )}
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

      {/* Bottom Footer Info bar */}
      <div className="p-3 bg-slate-50/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700">
            {t.showingRowsOf} {processedRows.length} / {activeSheet.rows.length}
          </span>
          {searchTerm && <span className="text-blue-600 font-semibold">{t.filteredBadge}</span>}
          <span>•</span>
          <span>{visibleHeaders.filter((h) => h.isVisible).length} / {activeSheet.headers.length} {t.columnsActive}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {t.tableTip}
          </span>
        </div>
      </div>
    </div>
  );
};
