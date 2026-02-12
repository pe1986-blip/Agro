
import React from 'react';
import { Calculator, Lock, AlertOctagon, ArrowRight } from 'lucide-react';

interface GoianiaFinancialRoadmapProps {
    onNavigate?: () => void;
}

const GoianiaFinancialRoadmap: React.FC<GoianiaFinancialRoadmapProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[2.5rem] border border-slate-200 border-dashed animate-fade-in text-center group">
      <div className="bg-indigo-100 p-6 rounded-full mb-6 text-indigo-600 shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform">
        <Calculator size={48} />
      </div>
      
      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
        Financial Studio <span className="text-indigo-600">V8</span> Connection
      </h2>
      
      <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
        O roadmap financeiro detalhado (DREs, Fases e KPIs) está totalmente processado pelo <strong>Financial Studio V8</strong>. Os dados reais de CAPEX e OPEX desta unidade já estão carregados na modelagem central.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg text-left mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
            <Lock size={18} className="text-emerald-500 mt-0.5"/>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Fase 1</p>
                <p className="text-sm font-black text-slate-800">Estruturação de Capex (Pronto)</p>
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
            <Lock size={18} className="text-emerald-500 mt-0.5"/>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Fase 2</p>
                <p className="text-sm font-black text-slate-800">Projeção de Matrículas (Pronto)</p>
            </div>
        </div>
      </div>

      <button 
        onClick={onNavigate}
        className="mt-4 flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
      >
        Acessar Modelagem Completa <ArrowRight size={14}/>
      </button>

      <div className="mt-8 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
        <AlertOctagon size={14} /> Dados Sincronizados
      </div>
    </div>
  );
};

export default GoianiaFinancialRoadmap;
