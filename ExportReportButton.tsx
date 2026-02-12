
import React, { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';
import { generateExecutiveReport } from './services/reportService';

interface ExportReportButtonProps {
  elementId: string;
  filename: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const ExportReportButton: React.FC<ExportReportButtonProps> = ({ 
    elementId, 
    filename, 
    label = 'PDF', 
    className = '',
    variant = 'secondary'
}) => {
  const [status, setStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

  const handleExport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('exporting');
    try {
      await new Promise(r => setTimeout(r, 500)); // UI delay
      await generateExecutiveReport(elementId, filename);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const baseStyles = "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm";
  
  const variants = {
      primary: "bg-slate-900 text-white hover:bg-slate-800",
      secondary: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600",
      ghost: "bg-transparent text-slate-400 hover:text-blue-600 hover:bg-blue-50"
  };

  const statusStyles = {
      success: "bg-emerald-100 text-emerald-700 border-emerald-200",
      error: "bg-red-100 text-red-700 border-red-200",
      exporting: "bg-blue-50 text-blue-600 border-blue-200"
  };

  const activeStyle = status === 'idle' ? variants[variant] : statusStyles[status];

  return (
    <button
      onClick={handleExport}
      disabled={status === 'exporting'}
      className={`${baseStyles} ${activeStyle} ${className}`}
      title="Baixar dossiê executivo completo"
    >
      {status === 'exporting' ? (
        <Loader2 size={12} className="animate-spin" />
      ) : status === 'success' ? (
        <Check size={12} />
      ) : (
        <Download size={12} />
      )}
      <span>{status === 'exporting' ? 'Gerando Dossiê...' : status === 'success' ? 'Salvo' : status === 'error' ? 'Erro' : label}</span>
    </button>
  );
};

export default ExportReportButton;
