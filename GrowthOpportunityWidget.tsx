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
  ChevronLeft,
  Building2,
  Rocket,
  Swords,
  Coins,
  Sprout,
  Lightbulb,
  Info,
  Wifi,
  Landmark,
  Microscope,
  Leaf
} from 'lucide-react';
import type { GrowthOpportunityScore, MarketTier, MarketPhase } from './types';
import { BRAZILIAN_STATES, MUNICIPIOS_PERFIL } from './constants';

interface GrowthOpportunityWidgetProps {
  opportunities: GrowthOpportunityScore[];
  onSelect: (opportunity: GrowthOpportunityScore) => void;
}

const tierColors: Record<string, string> = {
    'UNA': 'bg-purple-600 text-white border-purple-700 shadow-purple-200 shadow-lg',
    'SEDE': 'bg-slate-900 text-white border-slate-700',
    'P3': 'bg-blue-100 text-blue-700 border-blue-200',
    'P2': 'bg-teal-100 text-teal-700 border-teal-200',
    'P1': 'bg-orange-50 text-orange-700 border-orange-100',
};

const PHASE_CONFIG = {
    'Gold Rush': { icon: Rocket, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Gold Rush', desc: 'Crescimento acelerado e baixa concorrência.' },
    'Battlefield': { icon: Swords, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', label: 'Battlefield', desc: 'Alta demanda, mas guerra de preços intensa.' },
    'Cash Cow': { icon: Coins, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', label: 'Cash Cow', desc: 'Mercado maduro, alta renda e estabilidade.' },
    'Reinvention': { icon: Lightbulb, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', label: 'Reinvention', desc: 'Saturado. Exige novos produtos/nichos.' },
    'Early Stage': { icon: Sprout, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Early Stage', desc: 'Mercado incipiente com alto potencial futuro.' },
};

const PhaseBadge = ({ phase }: { phase: MarketPhase }) => {
    const style = PHASE_CONFIG[phase] || PHASE_CONFIG['Early Stage'];
    const Icon = style.icon;

    return (
        <div className={`group/badge relative flex items-center gap-1.5 px-2 py-1 rounded-md border ${style.bg} ${style.border} cursor-help`}>
            <Icon size={12} className={style.color} />
            <span className={`text-[9px] font-black uppercase tracking-wider ${style.color}`}>
                {style.label}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-10 text-center font-medium">
                {style.desc}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
            </div>
        </div>
    );
};

const MarketPhaseLegend = () => (
    <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-4">
            <Info size={14} className="text-slate-400"/>
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Glossário de Fases de Mercado</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(PHASE_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                return (
                    <div key={key} className="flex flex-col gap-1 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${config.bg}`}>
                                <Icon size={12} className={config.color}/>
                            </div>
                            <span className={`text-[10px] font-black uppercase ${config.color.replace('text-', 'text-opacity-80 text-')}`}>{config.label}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-tight">{config.desc}</p>
                    </div>
                );
            })}
        </div>
    </div>
);

type SmartFilterType = 'ALL' | 'HIGH_TECH' | 'CREDIT_EXPANSION' | 'DIGITAL_READY' | 'BLUE_OCEAN';

const SMART_FILTERS: Record<SmartFilterType, { label: string, icon: any, color: string }> = {
    'ALL': { label: 'Todos', icon: Filter, color: 'text-slate-600' },
    'HIGH_TECH': { label: 'Agro High-Tech', icon: Microscope, color: 'text-purple-600' },
    'CREDIT_EXPANSION': { label: 'Crédito Expansivo', icon: Landmark, color: 'text-emerald-600' },
    'DIGITAL_READY': { label: 'Digital Ready (5G)', icon: Wifi, color: 'text-blue-600' },
    'BLUE_OCEAN': { label: 'Oceano Azul', icon: Zap, color: 'text-cyan-600' },
};

export const GrowthOpportunityWidget: React.FC<GrowthOpportunityWidgetProps> = ({ opportunities, onSelect }) => {
  const [filterState, setFilterState] = useState('all');
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [smartFilter, setSmartFilter] = useState<SmartFilterType>('ALL');
  const [page, setPage] = useState(0);
  
  const itemsPerPage = 9;
  
  const filteredOpportunities = useMemo(() => {
      return opportunities.filter(opp => {
          // 1. Filtros Básicos
          const matchTier = filterTier === 'ALL' || opp.tier === filterTier;
          
          let matchGeo = true;
          if (filterState === 'AMAZONIA') {
              const profile = MUNICIPIOS_PERFIL.find(m => m.municipio_id === opp.municipio_id);
              matchGeo = profile?.isAmazoniaLegal === true;
          } else if (filterState !== 'all') {
              matchGeo = opp.municipality.includes(`(${filterState})`);
          }
          
          if (!matchTier || !matchGeo) return false;

          // 2. Smart Filters
          if (smartFilter === 'ALL') return true;

          const profile = MUNICIPIOS_PERFIL.find(m => m.municipio_id === opp.municipio_id);
          if (!profile) return false;

          if (smartFilter === 'HIGH_TECH') {
              return profile.agro.nivel_tecnologico === 'Alto' && profile.agro.pib_agro_bi > 1.0;
          }
          if (smartFilter === 'CREDIT_EXPANSION') {
              return (profile.economia.financas_agro?.credito_rural.razao_investimento || 0) > 30;
          }
          if (smartFilter === 'DIGITAL_READY') {
              return (profile.economia.macro_cenario?.competitividade.conectividade_rural_pct || 0) > 75;
          }
          if (smartFilter === 'BLUE_OCEAN') {
              return profile.educacao.total_ies_ativas <= 5 && profile.agro.pib_agro_bi > 1.0;
          }

          return true;
      });
  }, [opportunities, filterTier, filterState, smartFilter]);

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const currentData = filteredOpportunities.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const nextPage = () => setPage(p => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage(p => Math.max(p - 1, 0));

  React.useEffect(() => {
      setPage(0);
  }, [filterTier, filterState, smartFilter]);

  return (
    <div className="w-full">
      {/* Header Executivo Minimalista */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 pb-6 border-b border-slate-200">
          <div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                Radar de Expansão Estratégica
            </h3>
            <p className="text-slate-500 font-medium text-sm max-w-2xl leading-relaxed">
                Priorização de mercados baseada na convergência entre <span className="text-slate-800 font-bold">maturidade do agronegócio</span> e <span className="text-slate-800 font-bold">lacunas de capital humano</span>.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
             {/* Smart Filters Bar */}
             <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {(Object.entries(SMART_FILTERS) as [SmartFilterType, any][]).map(([key, config]) => {
                    const Icon = config.icon;
                    const isActive = smartFilter === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setSmartFilter(key)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                isActive 
                                ? 'bg-white text-slate-800 shadow-sm ring-1 ring-black/5' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                            }`}
                            title={config.label}
                        >
                            <Icon size={12} className={isActive ? config.color : 'text-slate-400'} />
                            <span className="hidden xl:inline">{config.label}</span>
                        </button>
                    );
                })}
             </div>

             <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <div className="px-4 py-2 border-r border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase block tracking-widest">Geografia</span>
                    <select 
                        value={filterState} 
                        onChange={e => setFilterState(e.target.value)} 
                        className="text-xs font-bold text-slate-800 outline-none bg-transparent cursor-pointer uppercase min-w-[80px]"
                    >
                        <option value="all">Nacional</option>
                        <option value="AMAZONIA" className="text-emerald-600 font-bold">🌱 Amazônia Legal</option>
                        {BRAZILIAN_STATES.map(s => <option key={s.uf} value={s.uf}>{s.name}</option>)}
                    </select>
                </div>

                <div className="px-4 py-2 border-r border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase block tracking-widest">Cluster (Tier)</span>
                    <select 
                        value={filterTier} 
                        onChange={e => setFilterTier(e.target.value)} 
                        className="text-xs font-bold text-slate-800 outline-none bg-transparent cursor-pointer uppercase min-w-[120px]"
                    >
                        <option value="ALL">Todos os Tiers</option>
                        <option value="UNA">Hubs UNA (Ativos)</option>
                        <option value="SEDE">Sedes (Novas)</option>
                        <option value="P3">UA P3 (Fortalezas)</option>
                        <option value="P2">UA P2 (Oportunidades)</option>
                        <option value="P1">UA P1 (Fronteiras)</option>
                    </select>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-1 px-2">
                        <button onClick={prevPage} disabled={page === 0} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"><ChevronLeft size={16}/></button>
                        <span className="text-xs font-bold text-slate-600 w-8 text-center">{page + 1}/{totalPages || 1}</span>
                        <button onClick={nextPage} disabled={page >= totalPages - 1} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 transition-colors"><ChevronRight size={16}/></button>
                    </div>
                )}
             </div>
          </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.length > 0 ? currentData.map((opp) => (
          <div 
            key={opp.municipio_id}
            onClick={() => onSelect(opp)}
            className={`group relative bg-white rounded-3xl p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col ${opp.isUnaHub ? 'border-purple-200 shadow-purple-100/50' : 'border-slate-200'}`}
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${tierColors[opp.tier] || 'bg-slate-100'}`}>
                            {opp.tier}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                            {opp.municipality.includes('(') ? opp.municipality.split('(')[1].replace(')', '') : 'BR'}
                        </span>
                        {MUNICIPIOS_PERFIL.find(m => m.municipio_id === opp.municipio_id)?.isAmazoniaLegal && (
                            <Leaf size={14} className="text-emerald-500" title="Amazônia Legal" />
                        )}
                    </div>
                    <PhaseBadge phase={opp.marketPhase} />
                </div>
                
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-xl shadow-inner ${opp.score >= 9 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : (opp.score >= 6 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-100')}`}>
                    {opp.score.toFixed(1)}
                </div>
            </div>

            {/* City Name */}
            <h4 className="text-xl font-black text-slate-800 mb-6 group-hover:text-blue-600 transition-colors truncate">
                {opp.municipality.split(' (')[0]}
            </h4>

            {/* Numeric Scorecard */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                        <Users size={10} className="text-rose-500"/> Talent Gap
                    </p>
                    <p className="text-lg font-black text-slate-800 leading-none">
                        {(opp.factors.talentGapScore * 10).toFixed(0)}<span className="text-[10px] text-slate-400 font-bold ml-0.5">/100</span>
                    </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                        <Zap size={10} className="text-emerald-500"/> AgroTech
                    </p>
                    <p className="text-lg font-black text-slate-800 leading-none">
                        {(opp.factors.agroTechIndex * 10).toFixed(0)}<span className="text-[10px] text-slate-400 font-bold ml-0.5">/100</span>
                    </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                        <TrendingUp size={10} className="text-blue-500"/> Potencial
                    </p>
                    <p className="text-lg font-black text-slate-800 leading-none">
                        {opp.factors.marketPotential.toFixed(1)}
                    </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                        <Target size={10} className="text-purple-500"/> Penetração
                    </p>
                    <p className="text-lg font-black text-slate-800 leading-none">
                        {opp.factors.penetrationRateVal ? opp.factors.penetrationRateVal.toFixed(0) : 0}<span className="text-[10px] text-slate-400 font-bold ml-0.5">%</span>
                    </p>
                </div>

            </div>

            {/* Reason Text */}
            <p className="mt-auto text-[10px] font-medium text-slate-400 italic border-t border-slate-100 pt-3 line-clamp-2">
                "{opp.reasoning}"
            </p>

            {/* Hover Action */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${opp.isUnaHub ? 'bg-purple-600' : 'bg-blue-600'}`}></div>
          </div>
        )) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <Filter size={48} className="mx-auto text-slate-300 mb-4"/>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Nenhum município encontrado com este filtro.</p>
                <button onClick={() => { setFilterState('all'); setFilterTier('ALL'); setSmartFilter('ALL'); }} className="mt-4 text-blue-600 font-black text-xs uppercase hover:underline">Limpar filtros</button>
            </div>
        )}
      </div>

      {/* LEGENDA DE FASES DE MERCADO */}
      <MarketPhaseLegend />
    </div>
  );
};