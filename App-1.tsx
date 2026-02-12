import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Globe, Zap, Telescope, Menu } from 'lucide-react';

// Importa os serviços e dados
import { getAllOpportunities } from './growthOpportunityService';
import type { GrowthOpportunityScore } from './types';
import { MUNICIPIOS_PERFIL } from './constants';

// Importa os Componentes Corretos
import { GrowthOpportunityWidget } from './GrowthOpportunityWidget';
import GeographicSkillsHeatmap from './GeographicSkillsHeatmap'; // Correção: Usa o Mapa Real
import CityDetailView from './CityDetailView';

// --- COMPONENTES VISUAIS ---
const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-6 mt-8 mb-3 text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">
        {label}
    </div>
);

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group relative font-bold ${
      active 
        ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] z-10' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>}
    <Icon size={20} className={active ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
    <span className="tracking-wide uppercase text-[11px]">{label}</span>
  </button>
);

function App() {
  const [activeTab, setActiveTab] = useState<'radar' | 'geo'>('radar');
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [opportunities, setOpportunities] = useState<GrowthOpportunityScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Carrega os dados processados pelo growthOpportunityService
      const data = await getAllOpportunities(); 
      setOpportunities(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleCitySelect = (id: number) => {
    setSelectedCityId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR PRETA (ESTILO AGRO HUNTER) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1c] border-r border-white/5 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 pb-0">
            <div className="flex items-center gap-3 mb-1">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <LayoutDashboard size={18} className="text-white" />
                </div>
                <h1 className="text-2xl font-black text-white tracking-tighter italic">RogerLens</h1>
            </div>
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] pl-1">AGRO INTELLIGENCE V3.6</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1">
            <SectionLabel label="Expansão" />
            
            <div className="px-4 mb-2">
                <button 
                    onClick={() => { setActiveTab('radar'); setSelectedCityId(null); }}
                    className={`w-full py-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all border ${activeTab === 'radar' && !selectedCityId ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-900/40' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                    <div className={`p-2 rounded-full ${activeTab === 'radar' && !selectedCityId ? 'bg-white/20 text-white' : 'bg-black/20'}`}>
                        <Zap size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Radar Agro-Hunter</span>
                </button>
            </div>

            <NavItem 
                icon={Globe} 
                label="Lentes Geográficas" 
                active={activeTab === 'geo'} 
                onClick={() => { setActiveTab('geo'); setSelectedCityId(null); }} 
            />

            <SectionLabel label="Análise Profunda" />
            <NavItem icon={Zap} label="Sala de Guerra" active={false} onClick={() => {}} />
            <NavItem icon={Telescope} label="Horizonte 2030" active={false} onClick={() => {}} />
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50">
        <div className="md:hidden bg-[#0a0f1c] p-4 flex justify-between items-center sticky top-0 z-40">
           <span className="text-white font-bold">RogerLens V3.6</span>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white"><Menu /></button>
        </div>

        {selectedCityId ? (
            <CityDetailView cityId={selectedCityId} onBack={() => setSelectedCityId(null)} />
        ) : (
            <div className="h-full flex flex-col">
                {/* CABEÇALHO SÓ APARECE NO RADAR */}
                {activeTab === 'radar' && (
                    <div className="px-6 md:px-10 pt-10 pb-6">
                        <header className="flex justify-between items-end border-b border-slate-200 pb-6">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic mb-2">
                                    OPORTUNIDADES DE EXPANSÃO (V2.0)
                                </h2>
                                <p className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-full inline-block border border-red-100">
                                    🔴 VERSÃO FINAL: GOIÂNIA 10 ATIVO
                                </p>
                            </div>
                        </header>
                    </div>
                )}

                {/* ÁREA DE CONTEÚDO */}
                <div className="flex-1 px-6 md:px-10 pb-10">
                    {activeTab === 'radar' && (
                        <>
                            {loading ? (
                                <div className="flex justify-center items-center h-64 text-slate-400">Carregando Inteligência...</div>
                            ) : (
                                <GrowthOpportunityWidget 
                                    opportunities={opportunities} 
                                    onSelect={(op) => handleCitySelect(op.municipio_id)} 
                                />
                            )}
                        </>
                    )}

                    {/* CORREÇÃO DO MAPA AQUI: TELA CHEIA */}
                    {activeTab === 'geo' && (
                        <div className="h-[calc(100vh-100px)] -mx-6 -my-6 md:-mx-10 rounded-tl-3xl overflow-hidden border-l border-t border-slate-200 shadow-2xl">
                            <GeographicSkillsHeatmap 
                                onCompare={() => {}}
                                selectedCityId={selectedCityId || 0}
                                onSelectCity={handleCitySelect}
                            />
                        </div>
                    )}
                </div>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;