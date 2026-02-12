
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Briefcase, Zap, 
  LayoutDashboard, TrendingUp, GraduationCap,
  ListChecks, BarChart3,
  Coffee, Microscope, Check, Loader2, Ship, Filter, DollarSign,
  Building2, Package, Layers, Sparkles, Anchor, Lightbulb, Download,
  BrainCircuit, Star, Gavel, LayoutGrid
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
    Cell, LabelList, FunnelChart, Funnel 
} from 'recharts';
import { MUNICIPIOS_PERFIL, formatNumber } from './constants';
import type { MunicipioPerfil } from './types';
import { calculateGrowthOpportunity } from './growthOpportunityService';
import { calculateWagePremium } from './services/impactAnalysisService';

// Componentes de Conteúdo
import HubStrategyPanel from './HubStrategyPanel';
import CityPlaybookView from './CityPlaybookView';
import EconomicDeepDive from './EconomicDeepDive';
import EmploymentSankeyDiagram from './EmploymentSankey';
import StrategicHorizonView from './StrategicHorizonView';
import EcosystemTreemap from './EcosystemTreemap';
import PartnershipClusterMap from './PartnershipClusterMap';
import AgroTechSkillsRadar from './AgroTechSkillsRadar';
import RecommendedProgramsCarousel from './RecommendedProgramsCarousel';
import K12MarketView from './K12MarketView';
import SocialImpactDeepDive from './SocialImpactDeepDive';
import LearningArchitectureView from './LearningArchitectureView'; 
import CompetitionScatterWidget from './CompetitionScatterWidget';
import MarketSaturationMatrix from './MarketSaturationMatrix'; 
import AgroValueChainMatrix from './AgroValueChainMatrix'; 
import RankingScorecard from './RankingScorecard'; 
import PortfolioFragilityMatrix from './PortfolioFragilityMatrix';
import FinancialDeepDive from './FinancialPulseWidget'; 
import DevelopmentDeepDive from './DevelopmentDeepDive'; 
import ChatWidget from './ChatWidget'; 
import SkeletonLoader from './SkeletonLoader';
import SkillGapCanvas from './SkillGapCanvas';
import SkillImpactSimulator from './SkillImpactSimulator';
import DataQualityWidget from './DataQualityWidget';
import RegionalCatchmentMap from './RegionalCatchmentMap';
import { LifestyleRadarWidget, ScientificInnovationWidget, RealTimeJobsTicker } from './NewInsightsWidgets';
import ExportReportButton from './ExportReportButton';
import GoianiaGovernanceStructure from './GoianiaGovernanceStructure'; 
import GoianiaFinancialRoadmap from './GoianiaFinancialRoadmap'; 
import RegulatoryDeepDive from './RegulatoryDeepDive';
import RadialStructureView from './RadialStructureView';
import DemographicPulseWidget from './DemographicPulseWidget'; // NOVO IMPORT

interface CityDetailViewProps {
  cityId: number;
  onBack: () => void;
  onNavigate?: (tab: string, cityId?: number) => void;
}

const WagePremiumWidget = ({ city }: { city: MunicipioPerfil }) => {
    const data = useMemo(() => calculateWagePremium(city), [city]);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[400px]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-600"/> Prêmio Salarial da Educação
            </h4>
            <div className="flex-1 w-full min-h-0 min-w-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={data} layout="vertical" margin={{ left: 40, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="level" type="category" width={80} tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <RechartsTooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value: number) => [`R$ ${formatNumber(value)}`, 'Salário Médio']}
                        />
                        <Bar dataKey="salary" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : '#cbd5e1'} />
                            ))}
                            <LabelList dataKey="salary" position="right" formatter={(val: number) => `R$ ${formatNumber(val)}`} style={{fontSize: 11, fontWeight: 'bold', fill: '#475569'}} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                <TrendingUp size={16} className="text-emerald-600"/>
                <p className="text-[10px] text-emerald-800 leading-tight">
                    <strong>Argumento de Venda:</strong> Um curso técnico aumenta a renda em <span className="font-bold">{data[1].premium}%</span> sobre o ensino médio nesta região.
                </p>
            </div>
        </div>
    );
};

const SocialPyramidWidget = ({ city }: { city: MunicipioPerfil }) => {
    const data = useMemo(() => {
        const tam = city.demografia.populacao_18_24 || 0;
        const sam = (city.demografia.egressos_em_publica || 0) + (city.demografia.egressos_em_privada || 0);
        const som = Math.floor(sam * 0.15); 

        return [
            { value: tam, name: 'TAM', label: 'Pop. 18-24 Anos', fill: '#e2e8f0', desc: 'Mercado Total Endereçável' },
            { value: sam, name: 'SAM', label: 'Egressos Ensino Médio', fill: '#60a5fa', desc: 'Mercado Disponível' },
            { value: som, name: 'SOM', label: 'Potencial Captura', fill: '#1e3a8a', desc: 'Mercado Obtível' }
        ];
    }, [city]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload;
            return (
                <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs z-50 border border-slate-700">
                    <p className="font-black text-sm mb-1">{d.name}: {d.label}</p>
                    <p className="text-lg font-bold text-blue-300">{formatNumber(d.value)} <span className="text-[10px] text-slate-400 font-normal">alunos</span></p>
                    <p className="text-[10px] text-slate-400 mt-2 italic">{d.desc}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[400px]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Filter size={16} className="text-blue-600"/> Pirâmide de Mercado (TAM)
            </h4>
            <div className="flex-1 w-full min-h-0 min-w-0 relative flex items-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <FunnelChart>
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Funnel dataKey="value" data={data} isAnimationActive>
                            <LabelList position="right" fill="#475569" stroke="none" dataKey="name" style={{fontSize: 12, fontWeight: 900}} />
                            <LabelList position="center" fill="#fff" stroke="none" dataKey="value" formatter={(val: number) => formatNumber(val)} style={{fontSize: 11, fontWeight: 'bold'}}/>
                        </Funnel>
                    </FunnelChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-[9px] font-bold uppercase text-slate-500">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-200 rounded-full"></div> TAM (Total)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> SAM (Disponível)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-900 rounded-full"></div> SOM (Meta)</div>
            </div>
        </div>
    );
};

const VerdictHeader = ({ score, tier, city }: { score: number, tier: string, city: string }) => {
    const [status, setStatus] = useState<'idle' | 'approving' | 'approved'>('idle');

    const handleApprove = () => {
        setStatus('approving');
        setTimeout(() => setStatus('approved'), 2000);
    };

    let statusConfig = {
        bg: 'bg-slate-900',
        accent: 'text-blue-400',
        label: 'EM ANÁLISE',
        desc: 'Coletando mais dados para decisão.',
        action: 'Solicitar Estudo',
        canApprove: false
    };

    if (score >= 8.0) {
        statusConfig = {
            bg: 'bg-gradient-to-r from-emerald-900 to-slate-900',
            accent: 'text-emerald-400',
            label: 'ALTA ADERÊNCIA (PRIORIDADE)',
            desc: `Fundamentos sólidos e momento favorável. ${city} está pronta para um modelo Full-Campus ou Hub Regional.`,
            action: 'Aprovar CAPEX',
            canApprove: true
        };
    } else if (score >= 6.0) {
        statusConfig = {
            bg: 'bg-gradient-to-r from-blue-900 to-slate-900',
            accent: 'text-blue-400',
            label: 'OPORTUNIDADE TÁTICA',
            desc: `Bons fundamentos, mas requer estratégia específica. Recomendado iniciar com modelo leve (UA Avançada) ou parcerias B2B.`,
            action: 'Desenhar Piloto',
            canApprove: true
        };
    } else {
        statusConfig = {
            bg: 'bg-gradient-to-r from-slate-800 to-slate-900',
            accent: 'text-amber-400',
            label: 'MONITORAMENTO (HORIZONTE 2)',
            desc: `Mercado em maturação. Acompanhar indicadores de renda e demanda nos próximos 24 meses antes de entrada agressiva.`,
            action: 'Adicionar ao Radar',
            canApprove: false
        };
    }
    
    return (
        <div className={`rounded-[2.5rem] p-8 mb-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${statusConfig.bg}`}>
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <BarChart3 size={200} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-white/70`}>
                        Parecer do Comitê
                    </span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        Tier {tier}
                    </span>
                </div>
                <h2 className={`text-3xl font-black italic tracking-tighter uppercase mb-2 ${statusConfig.accent}`}>
                    {statusConfig.label}
                </h2>
                <p className="text-sm font-medium text-slate-300 max-w-xl leading-relaxed">
                    {statusConfig.desc}
                </p>
            </div>

            <div className="relative z-10 flex flex-col items-end min-w-[200px] border-l border-white/10 pl-8">
                <div className="text-right mb-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Score de Atratividade</p>
                    <div className="text-5xl font-black tracking-tighter text-white">{score.toFixed(1)}<span className="text-2xl text-slate-500">/10</span></div>
                </div>
                
                {status === 'idle' && (
                    <button 
                        onClick={handleApprove}
                        className={`bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${!statusConfig.canApprove ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {statusConfig.action} <ArrowLeft size={12} className="rotate-180"/>
                    </button>
                )}

                {status === 'approving' && (
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                        <Loader2 size={16} className="animate-spin text-white"/>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Processando...</span>
                    </div>
                )}

                {status === 'approved' && (
                    <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400">
                        <Check size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Fluxo Iniciado</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const CityDetailView: React.FC<CityDetailViewProps> = ({ cityId, onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'governance' | 'architecture' | 'economy' | 'ecosystem' | 'education' | 'innovation' | 'k12' | 'impact' | 'portfolio' | 'horizon' | 'playbook' | 'development' | 'regulation'>('scorecard');
  const [loading, setLoading] = useState(true);
  
  const city = useMemo(() => MUNICIPIOS_PERFIL.find(c => c.municipio_id === cityId), [cityId]);
  
  const opportunity = useMemo(() => {
      if (!city) return null;
      return calculateGrowthOpportunity(city);
  }, [city]);

  useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800); 
      return () => clearTimeout(timer);
  }, [cityId]);

  const getChatContext = (tab: string) => {
      if (!city) return "";
      switch (tab) {
          case 'economy': return "ESTAMOS NA ABA: ECONOMIA & FINANÇAS. FOCO: PIB, Renda, Crédito.";
          case 'education': return "ESTAMOS NA ABA: EDUCAÇÃO & CONCORRÊNCIA. FOCO: Market Share, Ticket Médio.";
          case 'portfolio': return "ESTAMOS NA ABA: PORTFÓLIO & PRODUTOS. FOCO: Sugestão de cursos.";
          case 'innovation': return "ESTAMOS NA ABA: INOVAÇÃO & CIÊNCIA. FOCO: Skills AgTech, Vagas.";
          case 'ecosystem': return "ESTAMOS NA ABA: ECOSSISTEMA. FOCO: Cadeia produtiva B2B e Lifestyle.";
          case 'regulation': return "ESTAMOS NA ABA: GOV & REGULAÇÃO. FOCO: Leis municipais, incentivos fiscais e atos oficiais.";
          case 'architecture': return "ESTAMOS NA ABA: ARQUITETURA ACADÊMICA. FOCO: Matriz Radial, Trilhas e Competências.";
          default: return "ESTAMOS NA ABA: VISÃO GERAL. FOCO: Resumo executivo.";
      }
  };

  const handleJumpToFinancial = () => {
      if (onNavigate && city) {
          onNavigate('financial', city.municipio_id);
      }
  };

  if (!city || !opportunity || loading) return <SkeletonLoader variant="detail" />;

  const isSede = city.tier === 'SEDE';

  const TabButton = ({ id, label, icon: Icon, isSpecial = false, isGovernance = false }: { id: typeof activeTab, label: string, icon: any, isSpecial?: boolean, isGovernance?: boolean }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`relative flex items-center gap-2 px-5 py-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === id 
            ? (isGovernance ? 'border-purple-600 text-purple-600 bg-purple-50' : (isSpecial ? 'border-slate-900 text-slate-900 bg-slate-50' : 'border-blue-600 text-blue-600 bg-blue-50/50'))
            : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
    >
        <Icon size={16} className={activeTab === id ? (isGovernance ? 'text-purple-600' : (isSpecial ? 'text-slate-900' : 'text-blue-600')) : 'text-slate-400'} />
        <span className={isSpecial ? 'uppercase tracking-widest' : ''}>{label}</span>
    </button>
  );

  return (
    <div className="bg-slate-50 h-full font-sans animate-fade-in relative z-50 flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-3 flex justify-between items-center shadow-sm shrink-0">
        <div className="flex items-center gap-6">
            <button onClick={onBack} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 font-bold text-xs uppercase tracking-widest border border-transparent hover:border-slate-200">
                <ArrowLeft size={14} /> Voltar
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                    {city.nome} 
                    <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] px-2 py-0.5 rounded-md shadow-sm align-middle">
                        {city.estado}
                    </span>
                    {isSede && (
                        <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-md shadow-sm align-middle flex items-center gap-1">
                            <Star size={10} fill="currentColor"/> SEDE
                        </span>
                    )}
                </h1>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Market Tier</p>
                <p className="text-sm font-black text-blue-600">{opportunity.tier}</p>
            </div>
            <ExportReportButton 
                elementId="city-detail-content" 
                filename={`Dossie_${city.nome}_${activeTab}`} 
                label="Baixar Dossiê"
                variant="primary"
            />
        </div>
      </header>

      {/* TABS */}
      <div className="bg-white border-b border-slate-200 px-8 shadow-sm overflow-x-auto shrink-0">
          <div className="flex w-full min-w-max items-center">
              <TabButton id="scorecard" label="Scorecard" icon={ListChecks} />
              
              {isSede && (
                <>
                    <div className="h-6 w-px bg-slate-200 mx-2"></div>
                    <TabButton id="governance" label="Estrutura de Governança" icon={BrainCircuit} isGovernance={true} />
                    <div className="h-6 w-px bg-slate-200 mx-2"></div>
                </>
              )}

              <TabButton id="architecture" label="Arquitetura Acadêmica" icon={LayoutGrid} />
              <TabButton id="economy" label="Economia" icon={TrendingUp} />
              <TabButton id="development" label="Desenvolvimento" icon={Building2} />
              <TabButton id="regulation" label="Gov & Regulação" icon={Gavel} />
              <TabButton id="ecosystem" label="Ecossistema" icon={Layers} />
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <TabButton id="education" label="Mercado Acadêmico" icon={GraduationCap} />
              <TabButton id="portfolio" label="Portfólio" icon={Package} />
              <TabButton id="innovation" label="Inovação" icon={Microscope} />
              <TabButton id="impact" label="Empregabilidade" icon={Briefcase} />
              <div className="flex-1"></div>
              <button 
                onClick={() => setActiveTab('playbook')}
                className={`ml-4 flex items-center gap-3 px-6 py-3 my-1 rounded-xl transition-all border-2 ${activeTab === 'playbook' ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}`}
              >
                  <LayoutDashboard size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Plano Estratégico</span>
              </button>
          </div>
      </div>

      {/* CONTENT */}
      <div id="city-detail-content" className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50 pb-32">
        <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Header Invisível para PDF */}
            <div className="hidden pdf-visible mb-8 border-b-4 border-slate-900 pb-4">
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Relatório Executivo: {city.nome}</h2>
                <p className="text-slate-500 font-medium text-sm mt-2">Gerado por RogerLens Intelligence • {new Date().toLocaleDateString()}</p>
            </div>

            {activeTab === 'scorecard' && (
                <div className="animate-fade-in space-y-8">
                    <VerdictHeader score={opportunity.score} tier={opportunity.tier} city={city.nome} />
                    
                    {/* NOVO WIDGET: DEMOGRAPHIC PULSE (Inserido aqui) */}
                    <div className="h-[280px]">
                        <DemographicPulseWidget city={city} />
                    </div>

                    <RankingScorecard city={city} opportunity={opportunity} />
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <HubStrategyPanel city={city} />
                    </div>
                    {/* FINANCIAL ROADMAP CONNECTED */}
                    <div className="h-[400px]">
                        <GoianiaFinancialRoadmap onNavigate={handleJumpToFinancial} />
                    </div>
                    <DataQualityWidget municipio={city} />
                </div>
            )}

            {activeTab === 'governance' && (
                <div className="animate-fade-in space-y-8">
                    <div className="flex items-center gap-4 mb-4">
                         <div className="p-3 bg-purple-600 rounded-2xl shadow-lg">
                            <BrainCircuit size={24} className="text-white"/>
                         </div>
                         <div>
                             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">O Cérebro da Operação</h2>
                             <p className="text-slate-500 text-sm font-medium">Estrutura de Governança Híbrida (Academia + Mercado)</p>
                         </div>
                    </div>
                    <GoianiaGovernanceStructure />
                </div>
            )}
            
            {activeTab === 'architecture' && (
                <div className="animate-fade-in space-y-8" id="architecture-section">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                            <LayoutGrid size={24} className="text-indigo-600"/> Arquitetura Pedagógica Local
                        </h2>
                    </div>
                    <RadialStructureView /> 
                </div>
            )}

            {activeTab === 'economy' && (
                <div className="space-y-8 animate-fade-in">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                                <DollarSign size={24} className="text-emerald-600"/> Pulso Financeiro & Crédito
                            </h2>
                            <ExportReportButton elementId="economy-section" filename={`Economia_${city.nome}`} label="PDF da Seção" className="hidden md:flex"/>
                        </div>
                        <div id="economy-section">
                            <FinancialDeepDive city={city} />
                        </div>
                    </div>
                    <div className="h-[800px]">
                        <EconomicDeepDive city={city} />
                    </div>
                </div>
            )}

            {activeTab === 'development' && (
                <div className="space-y-8 animate-fade-in" id="development-section">
                    <h2 className="text-xl font-black text-slate-800 uppercase flex items-center gap-2"><Building2 size={24} className="text-blue-600"/> Desenvolvimento</h2>
                    <DevelopmentDeepDive city={city} />
                </div>
            )}

            {activeTab === 'regulation' && (
                <div className="space-y-8 animate-fade-in" id="regulation-section">
                    <h2 className="text-xl font-black text-slate-800 uppercase flex items-center gap-2"><Gavel size={24} className="text-purple-600"/> Ambiente Regulatório</h2>
                    <RegulatoryDeepDive city={city} />
                </div>
            )}

            {activeTab === 'ecosystem' && (
                <div className="space-y-12 animate-fade-in" id="ecosystem-section">
                    <section>
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                            <div className="p-2 bg-slate-900 rounded-xl shadow-lg"><Building2 className="text-white" size={24} /></div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase">Cadeia Produtiva & B2B</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto"> {/* Changed to auto height */}
                            {/* TREEMAP FULL WIDTH ON MOBILE, SIDE-BY-SIDE ON DESKTOP IF DESIRED */}
                            {/* USER REQUESTED FULL WIDTH FOR TREEMAP, SO WE MOVE IT OUT OF GRID OR GIVE IT COL-SPAN-2 */}
                            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                <EcosystemTreemap selectedProfile={city} />
                            </div>
                            
                            {/* MATRIX AND PARTNERSHIP MAP BELOW */}
                             <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm h-[500px]">
                                <AgroValueChainMatrix city={city} />
                            </div>
                             <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm h-[500px]">
                                <PartnershipClusterMap municipality={city.nome} cityProfile={city} />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4 mt-12">
                            <div className="p-2 bg-pink-600 rounded-xl shadow-lg"><Coffee className="text-white" size={24} /></div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase">Lifestyle & Vivência</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-[400px]">
                                <LifestyleRadarWidget city={city} />
                            </div>
                            <div className="bg-pink-50 rounded-[2.5rem] border border-pink-100 p-8 flex flex-col justify-center items-center text-center">
                                <Coffee size={48} className="text-pink-400 mb-4" />
                                <h3 className="text-xl font-black text-pink-900 uppercase">Qualidade de Vida</h3>
                                <p className="text-sm text-pink-700 mt-2 max-w-md">Densidade de serviços indica ambiente favorável.</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {activeTab === 'education' && (
                <div className="space-y-8 animate-fade-in" id="education-section">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-800 uppercase">Cenário de Mercado</h2>
                        <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">{city.educacao.total_ies_ativas} IES Ativas</span>
                    </div>
                    {/* NOVO: K12MarketView INSERIDO AQUI */}
                    <div className="mb-8">
                         <K12MarketView city={city} />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                        <div className="h-full"><SocialPyramidWidget city={city} /></div>
                        <div className="h-full"><WagePremiumWidget city={city} /></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                        <div className="h-full"><PortfolioFragilityMatrix city={city} /></div>
                        <div className="h-full"><RegionalCatchmentMap city={city} /></div>
                    </div>
                    <div className="h-[500px] bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-2 overflow-hidden">
                        <CompetitionScatterWidget city={city} />
                    </div>
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <Ship size={200} className="text-white"/>
                        </div>
                        <div className="relative z-10 mb-8 flex items-center gap-4">
                            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg"><Ship size={24} className="text-white"/></div>
                            <h2 className="text-2xl font-black text-white uppercase">Matriz de Oportunidade (Blue Ocean)</h2>
                        </div>
                        <div className="h-[600px] w-full bg-white rounded-3xl overflow-hidden shadow-inner">
                            <MarketSaturationMatrix />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'innovation' && (
                <div className="space-y-8 animate-fade-in" id="innovation-section">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><AgroTechSkillsRadar municipality={city.nome} /></div>
                        <div className="lg:col-span-1"><ScientificInnovationWidget city={city} /></div>
                        <div className="lg:col-span-1"><RealTimeJobsTicker city={city} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm h-[600px]">
                        <SkillGapCanvas municipality={city.nome} selectedProfile={city} />
                    </div>
                </div>
            )}

            {activeTab === 'impact' && (
                <div className="space-y-8 animate-fade-in" id="impact-section">
                    <SocialImpactDeepDive city={city} />
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[700px]">
                        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full"><EmploymentSankeyDiagram selectedCityId={city.municipio_id} /></div>
                        <div className="xl:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm h-full overflow-hidden"><SkillImpactSimulator city={city} /></div>
                    </div>
                </div>
            )}

            {activeTab === 'playbook' && (
                <div className="animate-fade-in space-y-10" id="playbook-section">
                    <VerdictHeader score={opportunity.score} tier={opportunity.tier} city={city.nome} />
                    <CityPlaybookView city={city} />
                </div>
            )}
            
            {activeTab === 'horizon' && (
                <div id="horizon-section">
                    <StrategicHorizonView selectedProfile={city} />
                </div>
            )}
            
            {activeTab === 'k12' && (
                <div id="k12-section">
                    <K12MarketView city={city} />
                </div>
            )}
            
            {activeTab === 'portfolio' && (
                <div id="portfolio-section">
                    <LearningArchitectureView city={city} />
                </div>
            )}

        </div>

        <div className="flex justify-center py-8 opacity-50">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Zap size={12}/> Powered by RogerLens Intelligence Engine v4.5
            </div>
        </div>
      </div>

      <ChatWidget 
          contextPrompt={getChatContext(activeTab)} 
          initialMessage={`Estou analisando os dados de ${activeTab === 'scorecard' ? 'Visão Geral' : activeTab} de ${city.nome}. Como posso ajudar?`} 
          cityContext={city}
      />
    </div>
  );
};

export default CityDetailView;
