
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Globe, Zap, Telescope, Menu, Database, 
  FileText, LogOut, Calculator, BookOpen, Star, Map, 
  Swords, Network, Layers, Cpu, School, Users, GitBranch, FileAudio,
  DoorOpen, CalendarCheck, PenTool, CheckCircle, ChevronLeft, ChevronRight,
  ArrowLeft, Compass, Briefcase
} from 'lucide-react';

// Importa os serviços e dados
import { getAllOpportunities } from './growthOpportunityService';
import type { GrowthOpportunityScore } from './growthOpportunityService';

// Importa os Componentes Corretos
import { GrowthOpportunityWidget } from './GrowthOpportunityWidget';
import GeographicAnalysisHub from './GeographicAnalysisHub'; 
import CityDetailView from './CityDetailView';
import GlobalWarRoom from './GlobalWarRoom';
import ArchitectureDiagram from './architecture';
import RankingFactorsTable from './RankingFactorsTable';
import StrategicHorizonView from './StrategicHorizonView';
import SkeletonLoader from './SkeletonLoader'; 
import LoginView from './LoginView'; 
import FinancialViabilityStudio from './FinancialViabilityStudio';
import StrategicThesisView from './StrategicThesisView';
import PremiumStandardsView from './PremiumStandardsView'; 
import TerritoryVocationalHub from './TerritoryVocationalHub'; 
import UniversityEcologiesHub from './UniversityEcologiesHub'; 
import AcademicTribesHub from './AcademicTribesHub'; 
import PedagogicDeviceHub from './PedagogicDeviceHub'; 
import SynthesisView from './SynthesisView'; 
import StrategicGateway from './StrategicGateway'; 
import StrategicDirectionView from './StrategicDirectionView'; 
import OperatingModelView from './OperatingModelView'; 

// --- COMPONENTES VISUAIS ---
const SectionLabel = ({ label, collapsed }: { label: string, collapsed?: boolean }) => (
    <div className={`px-6 mt-8 mb-3 text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase ${collapsed ? 'text-center px-2' : ''}`}>
        {collapsed ? '•' : label}
    </div>
);

const NavItem = ({ icon: Icon, label, active, onClick, collapsed }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-start px-4'} py-3 transition-all duration-200 group relative font-bold ${
      active 
        ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] z-10' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
    title={collapsed ? label : ''}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>}
    <Icon size={20} className={`shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
    {!collapsed && <span className="ml-3 tracking-wide uppercase text-[11px] truncate">{label}</span>}
  </button>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showGateway, setShowGateway] = useState(true); 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'radar' | 'geo' | 'war-room' | 'horizon' | 'architecture' | 'financial' | 'thesis' | 'standards' | 'synthesis' | 'territory-hub' | 'university-hub' | 'tribes' | 'pedagogic-device' | 'algorithm' | 'strategic-direction' | 'operating-model'>('radar');
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [battleIds, setBattleIds] = useState<number[]>([]); 
  const [opportunities, setOpportunities] = useState<GrowthOpportunityScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State específico para a aba interna de Strategic Direction
  const [strategicViewTab, setStrategicViewTab] = useState<'matrix' | 'portfolio'>('matrix');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getAllOpportunities(); 
      setOpportunities(data);
      setLoading(false);
    };
    if (isAuthenticated) {
        loadData();
    }
  }, [isAuthenticated]);

  const handleCitySelect = (id: number) => {
    setSelectedCityId(id);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setSelectedCityId(null);
      setActiveTab('radar');
      setShowGateway(true); 
  };

  const handleEnterFromGateway = (context: string) => {
      if (context === 'war-room') {
          // Lógica Especial: Se for "Hub Nacional", abre o War Room e seleciona Goiânia
          setActiveTab('war-room');
          const goianiaId = 5208707; // ID fixo de Goiânia
          setSelectedCityId(goianiaId); 
      } else if (context === 'strategic-portfolio') {
          // Lógica Especial: Abre Strategic Direction direto na aba de Portfólio
          setActiveTab('strategic-direction');
          setStrategicViewTab('portfolio');
      } else {
          setActiveTab(context as any);
          // Reseta a tab estratégica para o padrão se não for chamada explicitamente
          if (context === 'strategic-direction') {
             setStrategicViewTab('matrix');
          }
      }
      setShowGateway(false);
  };

  if (!isAuthenticated) {
      return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  if (showGateway) {
      return <StrategicGateway onEnter={handleEnterFromGateway} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#0a0f1c] border-r border-white/5 flex flex-col transition-all duration-300 md:relative 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        ${isSidebarCollapsed ? 'w-[5.5rem]' : 'w-72'}
      `}>
        {/* Toggle Button */}
        <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-9 bg-blue-600 text-white p-1 rounded-full border border-[#0a0f1c] shadow-lg hidden md:flex items-center justify-center hover:bg-blue-500 transition-colors z-50"
        >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className={`p-8 pb-0 ${isSidebarCollapsed ? 'px-4 text-center' : ''}`}>
            <div className={`flex items-center gap-3 mb-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="bg-blue-600 p-1.5 rounded-lg shrink-0 cursor-pointer" onClick={() => setShowGateway(true)} title="Voltar ao Início">
                    <LayoutDashboard size={18} className="text-white" />
                </div>
                {!isSidebarCollapsed && <h1 className="text-2xl font-black text-white tracking-tighter italic truncate">RogerLens</h1>}
            </div>
            {!isSidebarCollapsed && <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] pl-1 truncate">AGRO INTELLIGENCE V4.5</p>}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1 custom-scrollbar overflow-x-hidden">
            
            <div className="px-4 mb-4">
                <button 
                    onClick={() => setShowGateway(true)}
                    className={`w-full py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isSidebarCollapsed ? 'px-0' : ''}`}
                    title="Voltar para Home Estratégica"
                >
                    <ArrowLeft size={12} /> {!isSidebarCollapsed && "Home Strategy"}
                </button>
            </div>

            {/* NICHO 1: ESTRATÉGIA INSTITUCIONAL */}
            <SectionLabel label="Estratégia Institucional" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={BookOpen} label="Proposta Ânima no Agro" active={activeTab === 'thesis'} onClick={() => { setActiveTab('thesis'); setSelectedCityId(null); }} />
            
            <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={Compass} 
                label="Onde Jogamos (Foco)" 
                active={activeTab === 'strategic-direction'} 
                onClick={() => { 
                    setActiveTab('strategic-direction'); 
                    setStrategicViewTab('matrix'); // Reseta para a view padrão ao clicar no menu
                    setSelectedCityId(null); 
                }} 
            />
            <NavItem collapsed={isSidebarCollapsed} icon={Briefcase} label="Modelo Operacional" active={activeTab === 'operating-model'} onClick={() => { setActiveTab('operating-model'); setSelectedCityId(null); }} />

            <NavItem collapsed={isSidebarCollapsed} icon={Map} label="Território & Vocação" active={activeTab === 'territory-hub'} onClick={() => { setActiveTab('territory-hub'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={School} label="Universidade Nova" active={activeTab === 'university-hub'} onClick={() => { setActiveTab('university-hub'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Users} label="Tribos & Territórios" active={activeTab === 'tribes'} onClick={() => { setActiveTab('tribes'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={GitBranch} label="Dispositivo Pedagógico" active={activeTab === 'pedagogic-device'} onClick={() => { setActiveTab('pedagogic-device'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Star} label="Padrões Premium" active={activeTab === 'standards'} onClick={() => { setActiveTab('standards'); setSelectedCityId(null); }} />
            
            {/* SÍNTESE CONSOLIDADA */}
            <div className="my-2">
                <NavItem collapsed={isSidebarCollapsed} icon={FileAudio} label="Síntese Executiva" active={activeTab === 'synthesis'} onClick={() => { setActiveTab('synthesis'); setSelectedCityId(null); }} />
            </div>

            {/* NICHO 2: LENTE DE MERCADO */}
            <SectionLabel label="Inteligência de Mercado" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={Zap} label="Radar de Oportunidades" active={activeTab === 'radar'} onClick={() => { setActiveTab('radar'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Globe} label="Lentes Geográficas" active={activeTab === 'geo'} onClick={() => { setActiveTab('geo'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Swords} label="War Room Global" active={activeTab === 'war-room'} onClick={() => { setActiveTab('war-room'); setSelectedCityId(null); }} />

            {/* NICHO 3: MODELAGEM & TECH */}
            <SectionLabel label="Modelagem & Tecnologia" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={Calculator} label="Financial Studio V8" active={activeTab === 'financial'} onClick={() => { setActiveTab('financial'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Telescope} label="Horizonte 2035" active={activeTab === 'horizon'} onClick={() => { setActiveTab('horizon'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Network} label="Arquitetura de Dados" active={activeTab === 'architecture'} onClick={() => { setActiveTab('architecture'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Cpu} label="Algoritmo & Dados" active={activeTab === 'algorithm'} onClick={() => { setActiveTab('algorithm'); setSelectedCityId(null); }} />

        </nav>

        <div className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className={`flex items-center gap-3 text-slate-500 hover:text-white px-4 py-2 transition-colors text-xs font-bold uppercase tracking-widest w-full ${isSidebarCollapsed ? 'justify-center' : ''}`} title="Sair">
                <LogOut size={16} /> {!isSidebarCollapsed && "Encerrar Sessão"}
            </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-hidden relative bg-slate-50 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#0a0f1c] p-4 flex justify-between items-center shrink-0 z-40">
           <span className="text-white font-bold">RogerLens V4.5</span>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white"><Menu /></button>
        </div>

        {selectedCityId ? (
            <div className="flex-1 overflow-hidden h-full flex flex-col">
                <CityDetailView cityId={selectedCityId} onBack={() => setSelectedCityId(null)} />
            </div>
        ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 h-full"> 
                
                <div className="p-6 md:p-10 h-full flex flex-col">
                    
                    {/* --- NICHO 1: ESTRATÉGIA --- */}
                    {activeTab === 'thesis' && <StrategicThesisView />}
                    
                    {/* Passando o initialTab para controlar a abertura direta na aba Portfolio */}
                    {activeTab === 'strategic-direction' && <StrategicDirectionView initialTab={strategicViewTab} />}
                    
                    {activeTab === 'operating-model' && <OperatingModelView />}
                    
                    {activeTab === 'territory-hub' && (
                        <div className="h-full -m-6 md:-m-10">
                            <TerritoryVocationalHub />
                        </div>
                    )}

                    {activeTab === 'university-hub' && (
                        <div className="h-full -m-6 md:-m-10">
                            <UniversityEcologiesHub />
                        </div>
                    )}
                    
                    {activeTab === 'tribes' && (
                        <div className="h-full -m-6 md:-m-10">
                            <AcademicTribesHub />
                        </div>
                    )}

                    {activeTab === 'pedagogic-device' && (
                        <div className="h-full -m-6 md:-m-10">
                            <PedagogicDeviceHub />
                        </div>
                    )}
                    
                    {activeTab === 'standards' && <PremiumStandardsView />}

                    {activeTab === 'synthesis' && (
                        <div className="h-full -m-6 md:-m-10">
                             <SynthesisView />
                        </div>
                    )}

                    {/* --- NICHO 2: MERCADO --- */}
                    {activeTab === 'radar' && (
                        <>
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <SkeletonLoader variant="card" className="w-full max-w-4xl" />
                                </div>
                            ) : (
                                <GrowthOpportunityWidget 
                                    opportunities={opportunities} 
                                    onSelect={(op) => handleCitySelect(op.municipio_id)} 
                                />
                            )}
                        </>
                    )}

                    {activeTab === 'geo' && (
                        <GeographicAnalysisHub 
                            selectedCityId={selectedCityId || undefined} 
                            onSelectCity={handleCitySelect}
                            onCompare={(ids) => {
                                setBattleIds(ids);
                                setActiveTab('war-room');
                            }}
                        />
                    )}

                    {activeTab === 'war-room' && (
                        <GlobalWarRoom 
                            onSelectCity={handleCitySelect}
                            onNavigateToMap={() => setActiveTab('geo')}
                            initialComparisonIds={battleIds}
                        />
                    )}

                    {/* --- NICHO 3: TECH & FINANCE --- */}
                    {activeTab === 'financial' && <FinancialViabilityStudio />}

                    {activeTab === 'horizon' && (
                        <div className="h-full">
                            <StrategicHorizonView />
                        </div>
                    )}

                    {activeTab === 'architecture' && <ArchitectureDiagram />}

                    {activeTab === 'algorithm' && (
                         <div className="space-y-6">
                            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl border border-slate-700">
                                <h2 className="text-3xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
                                    <Cpu size={32} className="text-emerald-400"/> A "Caixa Preta" do Algoritmo
                                </h2>
                                <p className="text-slate-400 max-w-2xl font-medium">
                                    Abaixo detalhamos a lógica proprietária de rankeamento. Diferenciamos o peso dos fatores dependendo da vocação da cidade (Agro vs. Serviços).
                                </p>
                            </div>
                            <RankingFactorsTable />
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
