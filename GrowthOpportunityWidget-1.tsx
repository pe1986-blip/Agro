import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Zap,
  ChevronLeft
} from 'lucide-react';
import type { GrowthOpportunityScore, MarketTier } from './types';
import { BRAZILIAN_STATES } from './constants';

interface GrowthOpportunityWidgetProps {
  opportunities: GrowthOpportunityScore[];
  onSelect: (opportunity: GrowthOpportunityScore) => void;
}

const tierColors: Record<string, string> = {
    'SEDE': 'bg-purple-100 text-purple-700',
    'P3': 'bg-blue-100 text-blue-700',
    'P2': 'bg-teal-100 text-teal-700',
    'P1': 'bg-orange-100 text-orange-700',
};

export const GrowthOpportunityWidget: React.FC<GrowthOpportunityWidgetProps> = ({ opportunities, onSelect }) => {
  // Estado para os filtros
  const [filterState, setFilterState] = useState('all');
  const [filterTier, setFilterTier] = useState<string>('SEDE');
  const [page, setPage] = useState(0);
  
  const itemsPerPage = 3;
  
  const filteredOpportunities = useMemo(() => {
      return opportunities.filter(opp => {
          const matchTier = filterTier === 'ALL' || opp.tier === filterTier;
          const matchState = filterState === 'all' || opp.municipality.includes(`(${filterState})`);
          return matchTier && matchState;
      });
  }, [opportunities, filterTier, filterState]);

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const currentData = filteredOpportunities.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const nextPage = () => setPage(p => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage(p => Math.max(p - 1, 0));

  // Reset page when filters change
  React.useEffect(() => {
      setPage(0);
  }, [filterTier, filterState]);

  return (
    <div className="w-full">
      {/* Header do Widget com Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Target size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">
                    EXPANSION RADAR <span className="text-slate-300 text-xl not-italic">V3.0</span>
                </h3>
            </div>
            <p className="text-slate-500 font-medium text-sm">
                Onde a <span className="text-rose-500 font-bold">dor da contratação</span> encontra a <span className="text-blue-600 font-bold">maturidade tecnológica</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
             <div className="px-4 py-2 border-r border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase block">Estado</span>
                <select 
                    value={filterState} 
                    onChange={e => setFilterState(e.target.value)} 
                    className="text-xs font-bold text-slate-800 outline-none bg-transparent cursor-pointer uppercase"
                >
                    <option value="all">BRASIL</option>
                    {BRAZILIAN_STATES.map(s => <option key={s.uf} value={s.uf}>{s.name}</option>)}
                </select>
             </div>
             <div className="px-4 py-2 border-r border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase block">Porte/Tier</span>
                <select 
                    value={filterTier} 
                    onChange={e => setFilterTier(e.target.value)} 
                    className="text-xs font-bold text-slate-800 outline-none bg-transparent cursor-pointer uppercase"
                >
                    <option value="ALL">Todos</option>
                    <option value="SEDE">SEDE (HUBS)</option>
                    <option value="P3">P3 (FORTES)</option>
                    <option value="P2">P2 (MÉDIAS)</option>
                    <option value="P1">P1 (FRONTEIRA)</option>
                </select>
             </div>
             <div className="flex items-center gap-1 px-2">
                <button onClick={prevPage} disabled={page === 0} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"><ChevronLeft size={16}/></button>
                <span className="text-xs font-bold text-slate-600 w-8 text-center">{page + 1}/{totalPages || 1}</span>
                <button onClick={nextPage} disabled={page >= totalPages - 1} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"><ChevronRight size={16}/></button>
             </div>
          </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.length > 0 ? currentData.map((opp) => (
          <div 
            key={opp.municipio_id}
            onClick={() => onSelect(opp)}
            className="group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${tierColors[opp.tier] || 'bg-slate-100'}`}>
                        {opp.tier}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                        {opp.municipality.includes('(') ? opp.municipality.split('(')[1].replace(')', '') : 'BR'}
                    </span>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-xl shadow-inner ${opp.score >= 9 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                    {opp.score.toFixed(1)}
                </div>
            </div>

            {/* City Name */}
            <h4 className="text-xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition-colors">
                {opp.municipality.split(' (')[0]}
            </h4>

            {/* Metrics Bars */}
            <div className="space-y-4 mb-8">
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <span className="flex items-center gap-1"><Users size={12}/> Déficit de Talentos</span>
                        <span>{opp.factors.talentGapScore}/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${opp.factors.talentGapScore * 10}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <span className="flex items-center gap-1"><Zap size={12}/> Índice AgroTech</span>
                        <span>{opp.factors.agroTechIndex}/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${opp.factors.agroTechIndex * 10}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Potencial</p>
                    <p className="text-sm font-black text-slate-700">{opp.factors.marketPotential}/10</p>
                </div>
                <div className="flex-1 border-l border-slate-200 pl-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Penetração</p>
                    <p className="text-sm font-black text-slate-700">{opp.factors.penetrationRateVal ? opp.factors.penetrationRateVal.toFixed(0) : 0}%</p>
                </div>
            </div>

            {/* Reason Text */}
            <p className="mt-4 text-[10px] font-medium text-slate-400 italic border-t border-slate-100 pt-3 line-clamp-2">
                "{opp.reasoning}"
            </p>

            {/* Hover Action */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </div>
        )) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <Filter size={48} className="mx-auto text-slate-300 mb-4"/>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Nenhum município encontrado com este filtro.</p>
                <button onClick={() => { setFilterState('all'); setFilterTier('ALL'); }} className="mt-4 text-blue-600 font-black text-xs uppercase hover:underline">Limpar filtros</button>
            </div>
        )}
      </div>
    </div>
  );
};