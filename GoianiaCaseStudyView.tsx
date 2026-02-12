
import React, { useState } from 'react';
import { 
  ArrowLeft, Building2, BrainCircuit, GraduationCap, 
  Briefcase, Network, Layout, Radio, Coffee, 
  Scale, FileText, Users, Microscope, Globe,
  ArrowRight, Zap, Telescope, DollarSign,
  Map, XCircle, CheckCircle, Flag, AlertTriangle, BookOpen
} from 'lucide-react';
import GoianiaCampusDesign from './GoianiaCampusDesign';
import GoianiaGovernanceStructure from './GoianiaGovernanceStructure';
import GoianiaFinancialRoadmap from './GoianiaFinancialRoadmap';
import GoianiaStrategicThesis from './GoianiaStrategicThesis';

interface GoianiaCaseStudyViewProps {
  onBack: () => void;
}

// --- DADOS DO BLOCO 1 ---

const GOIANIA_ECOSYSTEM = [
  {
    id: 'education',
    label: 'Educação',
    icon: GraduationCap,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20',
    border: 'border-blue-500/30',
    description: "Formação de elite focada na tomada de decisão.",
    items: [
      "Pós-Graduação Vocacionada (MBAs, Mestrados)",
      "Bootcamps & Imersões Táticas",
      "Dual Learning & Aprendizagem Vivencial",
      "Programas Trader & Mentoria Executiva"
    ]
  },
  {
    id: 'thinktank',
    label: 'Think Tank & Advocacy',
    icon: BrainCircuit,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20',
    border: 'border-purple-500/30',
    description: "Inteligência regulatória e influência política.",
    items: [
      "Pesquisa de Políticas Públicas (Núcleo Advocacy)",
      "Análise de Marcos Regulatórios (RenovaBio, CBIOs)",
      "Policy Briefs & Green Books",
      "Relações com Governo & Associações"
    ]
  },
  {
    id: 'operation',
    label: 'Operação Real',
    icon: Briefcase,
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/20',
    border: 'border-emerald-500/30',
    description: "Business hub ativo dentro do campus.",
    items: [
      "AgroMatch (Matching Talentos/Empresas)",
      "P&D Aplicada (Projetos com Empresas)",
      "Trading Lab (Simulador + Operações Reais)",
      "Consultoria em Cadeia Produtiva"
    ]
  },
  {
    id: 'connectors',
    label: 'Conectores & Rede',
    icon: Network,
    color: 'text-amber-400',
    bg: 'bg-amber-900/20',
    border: 'border-amber-500/30',
    description: "O tecido social e comercial do agronegócio.",
    items: [
      "Parcerias Estratégicas (6 Clusters Geográficos)",
      "Relacionamento com Stakeholders (Bancos, Tradings)",
      "Eventos Estratégicos & Networking C-Level",
      "Comunicação & Media Especializada"
    ]
  }
];

const BALIZADORES_ADAPTATION = [
  { id: 1, title: "Operação Viva", origin: "Alunos operam hotéis", goiania: "Alunos conduzem consultoria e trading real", icon: Zap },
  { id: 2, title: "Espaço Prototipagem", origin: "Cozinhas e Salões", goiania: "Labs: Digital Agro, Financeiro e Regulatório", icon: Microscope },
  { id: 3, title: "Residência Estudantil", origin: "92 quartos integrados", goiania: "Coliving p/ trainees e profissionais em transição", icon: Building2 },
  { id: 4, title: "Fóruns & Advocacy", origin: "Eventos sociais", goiania: "Câmaras Setoriais (Etanol, Soja, Crédito)", icon: Scale },
  { id: 5, title: "Infra Alimentar", origin: "Restaurante e Bar", goiania: "Labs de Análise Sensorial e Processamento", icon: Coffee },
  { id: 6, title: "Rooftop & Visão", origin: "Lazer e Contemplação", goiania: "Observatório de Tendências e Cenários", icon: Telescope },
  { id: 7, title: "Knowledge Center", origin: "Biblioteca Acervo", goiania: "Data Center: Legislação, AI e Analytics", icon: FileText },
  { id: 8, title: "Auditório & Fórum", origin: "Seminários", goiania: "Diálogos: CNA, OCB, Traders e Bancos", icon: Users },
  { id: 9, title: "Salas Multifunção", origin: "Salas de aula", goiania: "Salas de Negociação e Crise (War Rooms)", icon: Radio },
  { id: 10, title: "Conexão Externa", origin: "Visitantes Hotel", goiania: "Empresas-Âncoras e Consultoria in-situ", icon: Globe },
];

const GoianiaMarketLandscape = () => {
    const competitors = [
        { name: "Universidade Federal de Goiás (UFG)", type: "Pública", focus: "Generalista; Agronomia genérica" },
        { name: "PUC-GO", type: "Privada", focus: "Negócios, Engenharia, Saúde" },
        { name: "UniGoiás", type: "Privada", focus: "Negócios, Tecnologia" },
        { name: "Faculdade Alfredo Nasser", type: "Privada", focus: "Negócios" }
    ];

    const gaps = [
        "Nenhuma IES com foco vocacionado em agronegócio (vs. ESALQ em SP, UFV em MG)",
        "Nenhuma com infraestrutura premium e relacionamento direto com o setor",
        "Nenhuma com think tank de pesquisa aplicada"
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Map size={200} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Paisagem Educacional</h2>
                    <p className="text-slate-400 font-medium">Análise de saturação e posicionamento em Goiás</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Building2 size={20} className="text-slate-400"/> Players Estabelecidos
                    </h3>
                    
                    <div className="space-y-4">
                        {competitors.map((comp, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{comp.name}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{comp.focus}</p>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${comp.type === 'Pública' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                    {comp.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100 shadow-sm flex-1">
                        <h3 className="text-lg font-black text-rose-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-rose-500"/> Gaps Críticos Identificados
                        </h3>
                        <div className="space-y-4">
                            {gaps.map((gap, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <XCircle size={20} className="text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-sm font-bold text-rose-800 leading-snug">{gap}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 p-4 opacity-10">
                            <Flag size={100} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-emerald-100">Conclusão Estratégica</h4>
                            <p className="text-xl font-serif font-bold leading-relaxed">
                                "Goiás é mercado aberto. Ânima entra primeiro e define o padrão."
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                                <CheckCircle size={14} /> Blue Ocean Strategy
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const GoianiaCaseStudyView: React.FC<GoianiaCaseStudyViewProps> = ({ onBack }) => {
  const [activePillar, setActivePillar] = useState(GOIANIA_ECOSYSTEM[0]);
  const [viewMode, setViewMode] = useState<'thesis' | 'blueprint' | 'landscape' | 'campus' | 'governance' | 'financial' | 'balizadores'>('thesis');

  return (
    <div className="bg-slate-950 min-h-screen text-white animate-fade-in pb-20 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* HERO SECTION */}
      <header className="relative overflow-hidden border-b border-white/10 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
            <div className="flex justify-between items-start">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 uppercase tracking-widest transition-colors mb-8">
                    <ArrowLeft size={16} /> Voltar para Padrões
                </button>
                <div className="px-3 py-1 border border-emerald-500/50 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    Case Flagship • Sede Nacional
                </div>
            </div>
            
            <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                    Goiânia <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Agro Sede</span>
                </h1>
                <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl border-l-4 border-emerald-500 pl-6">
                    Não é apenas um campus. É o <strong>nó de decisão</strong> do agronegócio brasileiro. O Laboratório de Inteligência da Ânima no Campo.
                </p>
            </div>

            {/* STATUS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-white/10 pt-8">
                <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vocação</p>
                    <p className="text-sm font-bold text-white">Think Tank & Decisão</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">População</p>
                    <p className="text-sm font-bold text-white">1.5 Milhões (Epicentro)</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Conceito</p>
                    <p className="text-sm font-bold text-emerald-400">Laboratório Vivo (Cérebro da Rede)</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-sm font-bold text-white">Planejamento Tático</p>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
                <button 
                    onClick={() => setViewMode('thesis')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'thesis' ? 'border-emerald-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    <BookOpen size={14} className="inline mr-2" /> Tese Estratégica
                </button>
                <button 
                    onClick={() => setViewMode('blueprint')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'blueprint' ? 'border-emerald-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    1. Arquitetura
                </button>
                <button 
                    onClick={() => setViewMode('landscape')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'landscape' ? 'border-rose-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    2. Cenário & Competição
                </button>
                <button 
                    onClick={() => setViewMode('campus')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'campus' ? 'border-amber-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    3. Campus Premium
                </button>
                 <button 
                    onClick={() => setViewMode('governance')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'governance' ? 'border-purple-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    4. Governança
                </button>
                <button 
                    onClick={() => setViewMode('financial')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'financial' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    5. Financeiro
                </button>
                <button 
                    onClick={() => setViewMode('balizadores')}
                    className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${viewMode === 'balizadores' ? 'border-blue-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    6. Estrutura e Serviços
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* TESE ESTRATÉGICA (NOVA) */}
        {viewMode === 'thesis' && (
            <GoianiaStrategicThesis />
        )}

        {/* VIEW 1: BLUEPRINT DO ECOSSISTEMA */}
        {viewMode === 'blueprint' && (
            <div className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 px-2">Estrutura Funcional</h3>
                        {GOIANIA_ECOSYSTEM.map((item) => {
                            const isActive = activePillar.id === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActivePillar(item)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                                        isActive 
                                        ? `${item.bg} ${item.border} ring-1 ring-white/10` 
                                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`p-3 rounded-xl bg-slate-950 shadow-inner ${isActive ? item.color : 'text-slate-600'}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-black uppercase tracking-wide ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                {item.label}
                                            </h4>
                                            {isActive && <p className="text-[10px] text-slate-400 mt-1">{item.description}</p>}
                                        </div>
                                        {isActive && <ArrowRight className={`ml-auto ${item.color}`} size={16} />}
                                    </div>
                                    {isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.color.replace('text-', 'bg-')}`}></div>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-10 h-full relative overflow-hidden flex flex-col justify-center">
                            
                            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                                <activePillar.icon size={400} />
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-6">
                                    <Layout size={12} /> Pilar Estratégico Detalhado
                                </div>

                                <h2 className={`text-4xl font-black uppercase tracking-tight mb-4 ${activePillar.color}`}>
                                    {activePillar.label}
                                </h2>
                                <p className="text-lg text-slate-400 font-medium max-w-2xl mb-10 leading-relaxed">
                                    {activePillar.description} Esta unidade não opera isolada; ela alimenta e retroalimenta os outros núcleos do ecossistema.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activePillar.items.map((subItem, idx) => (
                                        <div key={idx} className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-start gap-4">
                                            <div className={`mt-1 w-2 h-2 rounded-full ${activePillar.color.replace('text-', 'bg-')}`}></div>
                                            <p className="text-sm font-bold text-slate-200 leading-snug">
                                                {subItem}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )}

        {viewMode === 'landscape' && (
            <GoianiaMarketLandscape />
        )}

        {viewMode === 'campus' && (
             <div className="animate-fade-in">
                <GoianiaCampusDesign />
            </div>
        )}

        {viewMode === 'governance' && (
             <div className="animate-fade-in">
                <GoianiaGovernanceStructure />
            </div>
        )}

        {viewMode === 'financial' && (
             <div className="animate-fade-in h-[600px]">
                <GoianiaFinancialRoadmap />
            </div>
        )}

        {viewMode === 'balizadores' && (
            <div className="animate-fade-in">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                        Adaptação de DNA
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                        Como transformamos os princípios de Hospitalidade de luxo (EHL) em uma máquina de eficiência para o Agronegócio (Goiânia).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BALIZADORES_ADAPTATION.map((item) => (
                        <div key={item.id} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-slate-600 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <item.icon size={80} />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <span className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                                    {item.id.toString().padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="pl-4 border-l-2 border-slate-700">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Origem (Hospitalidade)</p>
                                    <p className="text-sm text-slate-400 italic">"{item.origin}"</p>
                                </div>
                                
                                <div className="flex justify-center">
                                    <ArrowRight size={16} className="text-emerald-500 rotate-90 md:rotate-0" />
                                </div>

                                <div className="pl-4 border-l-2 border-emerald-500 bg-emerald-500/5 py-2 rounded-r-lg">
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Aplicação Goiânia</p>
                                    <p className="text-sm text-white font-bold">{item.goiania}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default GoianiaCaseStudyView;
