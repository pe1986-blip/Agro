
import React, { useState, useMemo } from 'react';
import { Map as MapIcon, ArrowDownToLine, MousePointerClick, Truck, Columns, Layout, Network } from 'lucide-react';
import GeographicSkillsHeatmap from './GeographicSkillsHeatmap';
import RegionalCatchmentMap from './RegionalCatchmentMap';
import PartnershipClusterMap from './PartnershipClusterMap';
import SplitMapComparison from './SplitMapComparison';
import NetworkStrategyMap from './NetworkStrategyMap'; // NEW IMPORT
import { MUNICIPIOS_PERFIL } from './constants';
import type { MunicipioPerfil } from './types';

interface GeographicAnalysisHubProps {
    municipality?: MunicipioPerfil;
    selectedCityId?: number;
    onSelectCity?: (id: number) => void;
    onCompare?: (ids: number[]) => void;
}

type GeoViewMode = 'macro' | 'micro' | 'logistics' | 'split' | 'strategy';

const GeographicAnalysisHub: React.FC<GeographicAnalysisHubProps> = ({ selectedCityId, onSelectCity, onCompare }) => {
  const [viewMode, setViewMode] = useState<GeoViewMode>('macro');

  // Lógica de Segurança
  const activeCity = useMemo(() => {
      if (!selectedCityId) return MUNICIPIOS_PERFIL[0];
      const found = MUNICIPIOS_PERFIL.find(c => c.municipio_id === selectedCityId);
      return found || MUNICIPIOS_PERFIL[0];
  }, [selectedCityId]);

  return (
    <div className="h-[800px] bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden animate-fade-in flex flex-col group isolate">
        
        {/* --- TOOLBAR DE NAVEGAÇÃO (Topo Fixo) --- */}
        <div className="bg-white border-b border-slate-100 p-4 flex flex-col md:flex-row justify-between items-center gap-4 z-20 shadow-sm relative">
            
            {/* Lado Esquerdo: Identificação */}
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                    <Layout size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Análise Territorial</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <MousePointerClick size={10} />
                        <span>Foco: <span className="text-blue-600">{activeCity.nome}</span></span>
                    </div>
                </div>
            </div>

            {/* Centro/Direita: Seletor de Visão */}
            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
                <button
                    onClick={() => setViewMode('macro')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                        viewMode === 'macro' 
                        ? 'bg-white text-slate-900 shadow-md ring-1 ring-black/5' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <MapIcon size={14} /> Macro
                </button>

                <button
                    onClick={() => setViewMode('strategy')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                        viewMode === 'strategy' 
                        ? 'bg-slate-900 text-amber-400 shadow-md ring-1 ring-black/5' 
                        : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
                    }`}
                >
                    <Network size={14} /> Estratégia de Rede
                </button>
                
                <div className="w-px bg-slate-200 my-1 mx-1"></div>

                <button
                    onClick={() => setViewMode('micro')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                        viewMode === 'micro' 
                        ? 'bg-white text-blue-600 shadow-md ring-1 ring-blue-100' 
                        : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                >
                    <ArrowDownToLine size={14} /> Micro
                </button>

                <button
                    onClick={() => setViewMode('logistics')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                        viewMode === 'logistics' 
                        ? 'bg-white text-purple-600 shadow-md ring-1 ring-purple-100' 
                        : 'text-slate-400 hover:text-purple-600 hover:bg-slate-100'
                    }`}
                >
                    <Truck size={14} /> Infra
                </button>

                <div className="w-px bg-slate-200 my-1 mx-1"></div>

                <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        viewMode === 'split' 
                        ? 'bg-white text-orange-600 shadow-md ring-1 ring-orange-100' 
                        : 'text-slate-400 hover:text-orange-600 hover:bg-slate-100'
                    }`}
                    title="Comparar Regiões (Split View)"
                >
                    <Columns size={14} />
                </button>
            </div>
        </div>

        {/* --- ÁREA DE CONTEÚDO (Flex Grow) --- */}
        <div className="flex-1 w-full relative bg-slate-50 z-10 overflow-hidden">
            {viewMode === 'macro' && (
                <GeographicSkillsHeatmap 
                    selectedCityId={selectedCityId || 0} 
                    onSelectCity={onSelectCity || (() => {})}
                    onCompare={onCompare || (() => {})} 
                />
            )}

            {viewMode === 'strategy' && (
                <div className="w-full h-full p-4 md:p-6 bg-slate-100">
                    <NetworkStrategyMap />
                </div>
            )}
            
            {viewMode === 'micro' && (
                <div className="w-full h-full p-0">
                    <RegionalCatchmentMap city={activeCity} />
                </div>
            )}

            {viewMode === 'logistics' && (
                <div className="w-full h-full p-0">
                    <PartnershipClusterMap 
                        municipality={activeCity.nome} 
                        cityProfile={activeCity} 
                    />
                </div>
            )}

            {viewMode === 'split' && (
                <div className="w-full h-full p-0">
                    <SplitMapComparison />
                </div>
            )}
        </div>
    </div>
  );
};

export default GeographicAnalysisHub;
