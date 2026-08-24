import { Download, Printer, RotateCcw, Share2 } from 'lucide-react';

interface ToolbarProps {
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
  busy: boolean;
  shareSupported: boolean;
}

export function Toolbar({ onPrint, onDownload, onShare, onReset, busy, shareSupported }: ToolbarProps) {
  return (
    <div className="no-print flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div>
        <h1 className="text-sm font-semibold text-slate-800">DocuRx</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="hidden items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 sm:flex"
        >
          <Printer size={14} />
          Print
        </button>
        {shareSupported && (
          <button
            type="button"
            onClick={onShare}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <Share2 size={14} />
            Share
          </button>
        )}
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          aria-label={busy ? 'Generating PDF' : 'Download PDF'}
          title={busy ? 'Generating PDF' : 'Download PDF'}
          className="flex items-center justify-center rounded-md bg-teal-700 p-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50 sm:gap-1.5 sm:px-3 sm:py-1.5"
        >
          <Download size={14} />
          <span className="hidden sm:inline">{busy ? 'Generating…' : 'Download PDF'}</span>
        </button>
      </div>
    </div>
  );
}
