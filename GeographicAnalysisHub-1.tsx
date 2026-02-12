import React from 'react';
import GeographicSkillsHeatmap from './GeographicSkillsHeatmap';
import type { MunicipioPerfil } from './types';

interface GeographicAnalysisHubProps {
    municipality?: MunicipioPerfil;
    selectedCityId?: number;
    onSelectCity?: (id: number) => void;
}

const GeographicAnalysisHub: React.FC<GeographicAnalysisHubProps> = ({ municipality, selectedCityId, onSelectCity }) => {
  return (
    <div className="h-[750px] bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden animate-fade-in relative">
        <GeographicSkillsHeatmap 
            selectedCityId={selectedCityId || 0} 
            onSelectCity={onSelectCity || (() => {})}
            onCompare={() => console.log('Compare clicked')} 
        />
        {/* Overlay para Título se necessário, mas o Mapa já tem controles */}
        <div className="absolute top-6 left-6 z-[400] pointer-events-none">
            <h2 className="text-2xl font-black text-slate-900 bg-white/90 backdrop-blur px-6 py-2 rounded-2xl shadow-lg border border-white/20 uppercase tracking-tighter">
                Lentes Geográficas
            </h2>
        </div>
    </div>
  );
};

export default GeographicAnalysisHub;