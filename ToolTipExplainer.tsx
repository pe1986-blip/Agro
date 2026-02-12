
import React from 'react';

interface ToolTipExplainerProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  value?: string;
}

const ToolTipExplainer: React.FC<ToolTipExplainerProps> = ({ icon, label, title, description, value }) => {
  return (
    <div className="relative group flex items-center bg-white p-2 rounded-lg border border-gray-200 shadow-sm w-full">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:border-blue-400 border-2 border-transparent transition-all flex-shrink-0">
        {icon}
      </div>
      <div className="ml-3 flex-grow min-w-0">
        <p className="text-sm font-semibold text-gray-700 truncate">{label}</p>
      </div>
      {value && <p className="text-sm font-bold text-gray-800 ml-2 flex-shrink-0">{value}</p>}

      {/* Tooltip Popup - Ajustado Z-Index e Posicionamento */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">
        <h4 className="font-bold text-sm mb-1 text-white">{title}</h4>
        <p className="text-gray-200 leading-relaxed">{description}</p>
        {/* Seta do Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
      </div>
    </div>
  );
};

export default ToolTipExplainer;
