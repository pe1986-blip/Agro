import React, { useMemo } from 'react';
import { ArrowLeft, Download, Target, Briefcase } from 'lucide-react';
import { MUNICIPIOS_PERFIL } from './constants';
import HubStrategyPanel from './HubStrategyPanel';
import CityPlaybookView from './CityPlaybookView';

interface CityDetailViewProps {
  cityId: number;
  onBack: () => void;
}

const CityDetailView: React.FC<CityDetailViewProps> = ({ cityId, onBack }) => {
  const city = useMemo(() => MUNICIPIOS_PERFIL.find(c => c.municipio_id === cityId), [cityId]);

  if (!city) return <div className="p-10 text-center">Carregando dados...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in relative z-50">
      
      {/* HEADER BRANCO CLEAN */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 font-bold text-sm">
                <ArrowLeft size={18} /> Voltar
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div>
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    {city.nome} <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">{city.estado}</span>
                </h1>
            </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">
            <Download size={16} /> Baixar Dossiê
        </button>
      </header>

      <div className="max-w-[1400px] mx-auto p-8 space-y-10">
        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Target size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Estratégia de Hub</h2>
                    <p className="text-slate-500 text-sm">Análise de aderência para Sede Regional</p>
                </div>
            </div>
            <HubStrategyPanel city={city} />
        </section>

        <section>
            <div className="flex items-center gap-3 mb-6 px-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Briefcase size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Playbook de Execução</h2>
                    <p className="text-slate-500 text-sm">Diretrizes para o time de expansão</p>
                </div>
            </div>
            <CityPlaybookView city={city} />
        </section>
      </div>
    </div>
  );
};

export default CityDetailView;