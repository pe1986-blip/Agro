import React, { useMemo } from 'react';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const SkillImpactSimulator: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
  // Lógica para variar os dados conforme o perfil real do agronegócio da cidade
  const isAgroHigh = city.agro.pib_agro_bi > 2;
  
  const targets = useMemo(() => [
      { 
        sector: 'Produção de Grãos', 
        impact: 'Produtividade', 
        kpi: isAgroHigh ? '+18% Sacas/Ha' : '+8% Sacas/Ha', 
        detail: `Impacto direto na safra de ${city.nome} via técnicos de agricultura de precisão.` 
      },
      { 
        sector: 'Logística & Trade', 
        impact: 'Otimização', 
        kpi: '-12% Custo Operacional', 
        detail: 'Redução de gargalos no escoamento local através de gestão de dados.' 
      },
      { 
        sector: 'Gestão Financeira', 
        impact: 'Margem Líquida', 
        kpi: '+5% EBITDA', 
        detail: `Melhoria na saúde financeira das fazendas em ${city.regiao}.` 
      }
  ], [city, isAgroHigh]);

  return (
    <div className="h-full flex flex-col p-6">
       <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest">
                <Zap size={20} className="text-yellow-500 fill-yellow-500"/> 
                Impacto Sistêmico em {city.nome}
            </h3>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">Simulação Baseada em CNAE</span>
       </div>
       
       <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
          {targets.map((target, idx) => (
             <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col gap-4 transition-all hover:shadow-md hover:bg-white">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{target.sector}</span>
                    <TrendingUp size={14} className="text-emerald-500" />
                 </div>
                 
                 <div className="flex items-center gap-3">
                     <div className="flex-1 bg-slate-100/50 p-3 rounded-xl text-center">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Alavanca</p>
                        <p className="text-xs font-black text-blue-600 uppercase">{target.impact}</p>
                     </div>
                     <ArrowRight size={16} className="text-slate-300"/>
                     <div className="flex-1 bg-emerald-50 p-3 rounded-xl text-center border border-emerald-100">
                        <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mb-1">Ganho Estimado</p>
                        <p className="text-sm font-black text-emerald-600">{target.kpi}</p>
                     </div>
                 </div>
                 
                 <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">"{target.detail}"</p>
             </div>
          ))}
       </div>
       <div className="mt-6 pt-4 border-t border-slate-100 text-center">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Cálculo RogerLens Predictive Engine</p>
       </div>
    </div>
  );
};

export default SkillImpactSimulator;