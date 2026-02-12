import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Globe, Zap, Telescope, Menu, Database, 
  FileText, LogOut, Calculator, BookOpen, Star, Map, 
  Swords, Network, Layers, Cpu, School, Users, GitBranch, FileAudio,
  DoorOpen, CalendarCheck, PenTool, CheckCircle, ChevronLeft, ChevronRight,
  ArrowLeft, Compass, Briefcase, MapPin, Target, RefreshCw
} from 'lucide-react';

// Importa os serviços e dados
import { getAllOpportunities } from './growthOpportunityService';
import type { GrowthOpportunityScore } from './growthOpportunityService';
import { MUNICIPIOS_PERFIL } from './constants';

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
import UnaAgroTacticalView from './UnaAgroTacticalView'; 
import GoianiaCaseStudyView from './GoianiaCaseStudyView'; 

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
  
  const [activeTab, setActiveTab] = useState<'radar' | 'geo' | 'war-room' | 'horizon' | 'architecture' | 'financial' | 'thesis' | 'standards' | 'synthesis' | 'territory-hub' | 'university-hub' | 'tribes' | 'pedagogic-device' | 'algorithm' | 'strategic-direction' | 'operating-model' | 'una-vocacionada' | 'hub-nacional'>('radar');
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [battleIds, setBattleIds] = useState<number[]>([]); 
  const [opportunities, setOpportunities] = useState<GrowthOpportunityScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [strategicViewTab, setStrategicViewTab] = useState<'matrix' | 'portfolio'>('matrix');

  const selectedProfile = React.useMemo(() => {
    return MUNICIPIOS_PERFIL.find(c => c.municipio_id === selectedCityId) || null;
  }, [selectedCityId]);

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
          // Lógica do Gateway para War Room
          setActiveTab('war-room');
          const goianiaId = 5208707; 
          setSelectedCityId(goianiaId); 
      } else if (context === 'strategic-portfolio') {
          setActiveTab('strategic-direction');
          setStrategicViewTab('portfolio');
      } else if (context === 'territory-hub') { 
           setActiveTab('una-vocacionada');
      } else {
          setActiveTab(context as any);
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
  
  const isDetailMode = selectedCityId !== null && activeTab === 'radar';

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#0a0f1c] border-r border-white/5 flex flex-col transition-all duration-300 md:relative 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        ${isSidebarCollapsed ? 'w-[5.5rem]' : 'w-72'}
      `}>
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
        
        {!isSidebarCollapsed && selectedCityId && (
            <div className="mx-6 mt-6 p-3 bg-blue-900/40 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <div className="text-center w-full">
                    <p className="text-[9px] font-bold text-blue-400 uppercase">Contexto Ativo</p>
                    <div className="flex items-center justify-between mt-1">
                         <p className="text-sm font-bold text-white truncate max-w-[140px]">{selectedProfile?.nome}</p>
                         <button onClick={() => setSelectedCityId(null)} className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white" title="Limpar Seleção">
                            <LogOut size={12} />
                        </button>
                    </div>
                </div>
            </div>
        )}

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

            {/* 1. ESTRATÉGIA INSTITUCIONAL */}
            <SectionLabel label="Estratégia Institucional" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={BookOpen} label="Proposta Ânima no Agro" active={activeTab === 'thesis'} onClick={() => { setActiveTab('thesis'); setSelectedCityId(null); }} />
            
            <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={Compass} 
                label="Onde Jogamos (Foco)" 
                active={activeTab === 'strategic-direction' && strategicViewTab === 'matrix'} 
                onClick={() => { 
                    setActiveTab('strategic-direction'); 
                    setStrategicViewTab('matrix'); 
                    setSelectedCityId(null); 
                }} 
            />
            <NavItem collapsed={isSidebarCollapsed} icon={Briefcase} label="Modelo Operacional" active={activeTab === 'operating-model'} onClick={() => { setActiveTab('operating-model'); setSelectedCityId(null); }} />

            {/* 2. METODOLOGIA & ACADÊMICO */}
            <SectionLabel label="Metodologia & Acadêmico" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={Map} label="Território & Vocação" active={activeTab === 'territory-hub'} onClick={() => { setActiveTab('territory-hub'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={School} label="Universidade Nova" active={activeTab === 'university-hub'} onClick={() => { setActiveTab('university-hub'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Users} label="Tribos & Territórios" active={activeTab === 'tribes'} onClick={() => { setActiveTab('tribes'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={GitBranch} label="Dispositivo Pedagógico" active={activeTab === 'pedagogic-device'} onClick={() => { setActiveTab('pedagogic-device'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Star} label="Padrões Premium" active={activeTab === 'standards'} onClick={() => { setActiveTab('standards'); setSelectedCityId(null); }} />
            
            {/* 3. EXECUÇÃO TÁTICA (RESTAURADO) */}
            <SectionLabel label="Execução Tática" collapsed={isSidebarCollapsed} />
            <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={Target} 
                label="Hub Nacional (Sede)" 
                active={activeTab === 'hub-nacional'} 
                onClick={() => { 
                     setActiveTab('hub-nacional'); 
                     setSelectedCityId(null);
                }} 
            />
            <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={RefreshCw} 
                label="Una Vocacionada" 
                active={activeTab === 'una-vocacionada'} 
                onClick={() => { setActiveTab('una-vocacionada'); setSelectedCityId(null); }} 
            />
            <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={Globe} 
                label="Novas Fronteiras" 
                active={activeTab === 'radar' && selectedCityId === null} 
                onClick={() => { 
                    setActiveTab('radar'); 
                    setSelectedCityId(null); 
                }} 
            />
             <NavItem 
                collapsed={isSidebarCollapsed} 
                icon={Briefcase} 
                label="Portfólio & Produtos" 
                active={activeTab === 'strategic-direction' && strategicViewTab === 'portfolio'} 
                onClick={() => { 
                    setActiveTab('strategic-direction'); 
                    setStrategicViewTab('portfolio'); 
                }} 
            />
            
            {/* SÍNTESE CONSOLIDADA */}
            <div className="my-2">
                <NavItem collapsed={isSidebarCollapsed} icon={FileAudio} label="Síntese Executiva" active={activeTab === 'synthesis'} onClick={() => { setActiveTab('synthesis'); setSelectedCityId(null); }} />
            </div>

            {/* 4. INTELIGÊNCIA DE MERCADO */}
            <SectionLabel label="Inteligência de Mercado" collapsed={isSidebarCollapsed} />
            <NavItem collapsed={isSidebarCollapsed} icon={Zap} label="Radar de Oportunidades" active={activeTab === 'radar' && selectedCityId !== null} onClick={() => { setActiveTab('radar'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Globe} label="Lentes Geográficas" active={activeTab === 'geo'} onClick={() => { setActiveTab('geo'); setSelectedCityId(null); }} />
            <NavItem collapsed={isSidebarCollapsed} icon={Swords} label="War Room Global" active={activeTab === 'war-room'} onClick={() => { setActiveTab('war-room'); setSelectedCityId(null); }} />

            {/* 5. MODELAGEM & TECH */}
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

        {/* --- CONTEXT BAR (Se cidade selecionada e não em modo Detail) --- */}
        {!isDetailMode && selectedProfile && (
            <div className="bg-indigo-600 text-white px-6 py-2 flex items-center justify-between shadow-md shrink-0 z-30">
                <div className="flex items-center gap-3">
                    <MapPin size={16} />
                    <span className="text-sm font-bold">Modo Contextual: <span className="underline">{selectedProfile.nome} ({selectedProfile.estado})</span></span>
                </div>
                <button 
                    onClick={() => { setActiveTab('radar'); }}
                    className="text-[10px] font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                >
                    Voltar ao Detalhe
                </button>
            </div>
        )}

        {isDetailMode ? (
            <div className="flex-1 overflow-hidden h-full flex flex-col">
                <CityDetailView 
                    cityId={selectedCityId!} 
                    onBack={() => setSelectedCityId(null)} 
                    onNavigate={(tab, id) => {
                        setActiveTab(tab as any);
                        if (id) setSelectedCityId(id);
                    }}
                />
            </div>
        ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 h-full"> 
                
                <div className="p-6 md:p-10 h-full flex flex-col">
                    
                    {/* --- NICHO 1: ESTRATÉGIA --- */}
                    {activeTab === 'thesis' && <div className="h-full -m-6 md:-m-10"><StrategicThesisView selectedProfile={selectedProfile || undefined} /></div>}
                    
                    {/* Passando o initialTab para controlar a abertura direta na aba Portfolio */}
                    {activeTab === 'strategic-direction' && (
                        <div className="h-full -m-6 md:-m-10">
                            <StrategicDirectionView initialTab={strategicViewTab} />
                        </div>
                    )}
                    
                    {activeTab === 'operating-model' && <div className="h-full -m-6 md:-m-10"><OperatingModelView /></div>}
                    
                    {/* VISÕES DE EXECUÇÃO TÁTICA (AGORA ACESSÍVEIS) */}
                    {activeTab === 'una-vocacionada' && <div className="h-full -m-6 md:-m-10"><UnaAgroTacticalView /></div>}
                    
                    {activeTab === 'hub-nacional' && (
                         <div className="h-full -m-6 md:-m-10">
                            <GoianiaCaseStudyView onBack={() => setActiveTab('radar')} />
                        </div>
                    )}

                    {activeTab === 'territory-hub' && <div className="h-full -m-6 md:-m-10"><TerritoryVocationalHub /></div>}
                    {activeTab === 'university-hub' && <div className="h-full -m-6 md:-m-10"><UniversityEcologiesHub /></div>}
                    {activeTab === 'tribes' && <div className="h-full -m-6 md:-m-10"><AcademicTribesHub /></div>}
                    {activeTab === 'pedagogic-device' && <div className="h-full -m-6 md:-m-10"><PedagogicDeviceHub /></div>}
                    {activeTab === 'standards' && <div className="h-full -m-6 md:-m-10"><PremiumStandardsView /></div>}
                    
                    {activeTab === 'synthesis' && (
                        <div className="h-full -m-6 md:-m-10">
                             <SynthesisView selectedProfile={selectedProfile || undefined} />
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
                        <div className="h-full -m-6 md:-m-10">
                            <GlobalWarRoom 
                                onSelectCity={handleCitySelect}
                                onNavigateToMap={() => setActiveTab('geo')}
                                initialComparisonIds={battleIds}
                            />
                        </div>
                    )}

                    {/* --- NICHO 3: TECH & FINANCE --- */}
                    {activeTab === 'financial' && <div className="h-full -m-6 md:-m-10"><FinancialViabilityStudio cityProfile={selectedProfile || undefined} /></div>}

                    {activeTab === 'horizon' && (
                        <div className="h-full">
                            <StrategicHorizonView selectedProfile={selectedProfile || undefined} />
                        </div>
                    )}

                    {activeTab === 'architecture' && <div className="h-full -m-6 md:-m-10"><ArchitectureDiagram /></div>}

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
                            <RankingFactorsTable selectedProfile={selectedProfile || undefined} />
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