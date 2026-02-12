
import React from 'react';
import { FileSpreadsheet, Layers, X, Download } from 'lucide-react';

interface ExportOptionsModalProps {
  onClose: () => void;
  onConfirm: (mode: 'current' | 'all') => void;
  currentSheetName: string;
}

const ExportOptionsModal: React.FC<ExportOptionsModalProps> = ({ onClose, onConfirm, currentSheetName }) => {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Download size={20} className="text-emerald-600"/> Exportar para Excel
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                <X size={18} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
            <p className="text-sm text-slate-500 mb-4">
                O arquivo gerado conterá <strong>fórmulas vivas</strong> e vínculos com as premissas macroeconômicas. Escolha o escopo da exportação:
            </p>

            <button 
                onClick={() => onConfirm('current')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group text-left"
            >
                <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    <FileSpreadsheet size={24} className="text-emerald-600"/>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Apenas DRE Atual</h4>
                    <p className="text-xs text-slate-500 mt-1">Exporta somente a aba <span className="font-bold text-emerald-600">"{currentSheetName}"</span> e a aba de premissas.</p>
                </div>
            </button>

            <button 
                onClick={() => onConfirm('all')}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-left"
            >
                <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    <Layers size={24} className="text-blue-600"/>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Modelagem Completa (Book)</h4>
                    <p className="text-xs text-slate-500 mt-1">Exporta <strong>todas as unidades</strong>, o consolidado e as premissas globais.</p>
                </div>
            </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Financial Studio V8 Engine
            </p>
        </div>
      </div>
    </div>
  );
};

export default ExportOptionsModal;
