import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileSpreadsheet, X, RefreshCw, AlertCircle, ShieldCheck, CheckCircle } from 'lucide-react';
import { ParsedWorkbook } from '../types';

interface FileUploaderProps {
  workbook: ParsedWorkbook | null;
  onFileSelected: (file: File) => void;
  onRemoveFile: () => void;
  isProcessing: boolean;
  errorMessage?: string;
  onClearError: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  workbook,
  onFileSelected,
  onRemoveFile,
  isProcessing,
  errorMessage,
  onClearError,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
      // Reset input value so re-selecting same file triggers change
      e.target.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCleanFileType = (fileName: string, mime: string): string => {
    const ext = fileName.split('.').pop()?.toUpperCase();
    if (ext) return `${ext} Spreadsheet`;
    if (mime.includes('csv')) return 'CSV File';
    if (mime.includes('spreadsheet') || mime.includes('excel')) return 'Excel Workbook';
    return 'Spreadsheet Document';
  };

  return (
    <div className="w-full">
      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-fade-in shadow-2xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <h4 className="font-semibold text-rose-900">Upload Notification</h4>
            <p className="mt-0.5 text-rose-700 leading-relaxed">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={onClearError}
            className="text-rose-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* When NO workbook loaded or replacing: Show Drag & Drop Zone */}
      {!workbook ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
            isDragging
              ? 'border-blue-500 bg-blue-50/70 scale-[1.005]'
              : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/70 shadow-xs'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
            onChange={handleFileChange}
            className="hidden"
            id="spreadsheet-file-input"
          />

          <div className="max-w-md mx-auto flex flex-col items-center">
            {/* Upload Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform ${
                isDragging
                  ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30'
                  : 'bg-blue-50 text-blue-600 group-hover:scale-105 group-hover:bg-blue-100'
              }`}
            >
              <UploadCloud className="w-8 h-8" />
            </div>

            {/* Prompt text */}
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              Drop your CSV or Excel file here
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Drag &amp; drop your spreadsheet or click to browse from device
            </p>

            {/* Browse Button */}
            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                Browse File
              </span>
            </div>

            {/* Supported format badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                .CSV
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                .XLS
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                .XLSX
              </span>
              <span className="text-xs text-slate-400 ml-1">Up to 50MB</span>
            </div>

            {/* Privacy notice */}
            <div className="mt-6 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-200/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your files are processed securely in your browser and are not shared.</span>
            </div>
          </div>

          {/* Processing overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-800">Reading &amp; Parsing Spreadsheet...</p>
              <p className="text-xs text-slate-500 mt-1">Analyzing worksheets, columns, and data types</p>
            </div>
          )}
        </div>
      ) : (
        /* Loaded File Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs transition-all">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-base truncate max-w-xs sm:max-w-md" title={workbook.fileName}>
                    {workbook.fileName}
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Parsed
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                  <span>{formatFileSize(workbook.fileSize)}</span>
                  <span>•</span>
                  <span>{getCleanFileType(workbook.fileName, workbook.fileType)}</span>
                  <span>•</span>
                  <span className="font-medium text-slate-700">
                    {workbook.sheets.length} {workbook.sheets.length === 1 ? 'Sheet' : 'Sheets'} ({workbook.sheets.reduce((a, s) => a + s.rows.length, 0)} total rows)
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Replace / Remove */}
            <div className="flex items-center gap-2 sm:self-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Replace with another file"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Replace File</span>
              </button>

              <button
                type="button"
                onClick={onRemoveFile}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
                title="Remove current spreadsheet"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
