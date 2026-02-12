
import React, { useMemo, useState, useEffect } from 'react';
import { 
    Target, TrendingUp, ShieldCheck, Zap, 
    BrainCircuit, Handshake, Lightbulb,
    Anchor, Users, Globe, ChevronDown,
    CheckCircle2, AlertTriangle, Layers, Rocket,
    Calendar, FileText, Settings, Flag, Microscope, Megaphone,
    Calculator, DollarSign, Percent, Circle, CheckCircle, RefreshCw,
    Gem, Tractor, Factory, BookOpen, Share2, Search, Sprout, Award, Building2
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend 
} from 'recharts';
import type { MunicipioPerfil } from './types';
import { calculateGrowthOpportunity } from './growthOpportunityService';
import ExportReportButton from './ExportReportButton';
import { formatNumber } from './constants';

// --- ENGINES DE SIMULAÇÃO ESTRATÉGICA ---

// 0. Engine de Narrativa (A Alma do Negócio)
const generateStrategicNarrative = (city: MunicipioPerfil) => {
    const servicos = city.economia.pib_composicao.servicos_bi;
    const agro = city.economia.pib_composicao.agropecuaria_bi;
    const renda = city.economia.renda_per_capita;

    // Tese: Agroluxo (Goiânia, Ribeirão Preto, Cuiabá)
    if (servicos > agro * 5 && renda > 3000) {
        return {
            title: "Capital do Agroluxo",
            headline: `${city.nome} não é onde se ganha o dinheiro do agro; é onde ele é gasto.`,
            thesis: `Enquanto o campo vizinho produz a riqueza bruta, ${city.nome} captura o valor através de serviços de alta complexidade. A oportunidade aqui não é ensinar a plantar, é ensinar a gerir o patrimônio, blindar a sucessão e sofisticar o investimento. O aluno não quer botina; quer o escritório da holding.`,
            tag: "High-End Service Hub",
            icon: Gem,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-200"
        };
    }
    
    // Tese: Fronteira de Produção (Sorriso, LEM, Balsas)
    if (agro > servicos || agro > 2.0) {
        return {
            title: "Motor Produtivo Puro",
            headline: `${city.nome} é o chão de fábrica do PIB brasileiro.`,
            thesis: `Aqui a dor é operacional e logística. O dinheiro está enterrado na terra e na máquina. A oportunidade é técnica e tecnológica: formar quem opera a máquina de R$ 2 milhões e quem gerencia o dado agronômico. O aluno precisa de eficiência imediata para a safra seguinte.`,
            tag: "Production Powerhouse",
            icon: Tractor,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200"
        };
    }

    // Tese: Hub Logístico/Industrial (Rio Verde, Rondonópolis)
    if (city.economia.pib_composicao.industria_bi > 1.0) {
        return {
            title: "Nó Agroindustrial",
            headline: `${city.nome} é onde a commodity vira produto.`,
            thesis: `A vocação aqui é a transformação. Processamento de grãos, esmagamento, proteína animal. A demanda é por engenheiros, gestores de processos e especialistas em supply chain. O ensino precisa conectar o campo à fábrica.`,
            tag: "Industrial Hub",
            icon: Factory,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200"
        };
    }

    // Default
    return {
        title: "Polo Regional em Ascensão",
        headline: `${city.nome} centraliza a demanda da microrregião.`,
        thesis: `Mercado em desenvolvimento que começa a demandar profissionalização. A estratégia é ocupar o espaço deixado por IES generalistas com cursos focados na vocação local.`,
        tag: "Emerging Market",
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200"
    };
};

// 1. Engine Blue Ocean (Strategy Canvas)
const generateStrategyCanvas = (city: MunicipioPerfil) => {
    const isSede = city.tier === 'SEDE';
    const hasHighConnectivity = (city.economia.macro_cenario?.competitividade.conectividade_rural_pct || 0) > 70;
    
    return [
        { fator: 'Preço (Ticket)', mercado: 80, nos: isSede ? 85 : 60 },
        { fator: 'Infraestrutura Física', mercado: 90, nos: 50 }, // Ânima foca em Labs leves, não prédios pesados
        { fator: 'Conexão c/ Mercado', mercado: 30, nos: 95 }, // Diferencial Bernstein (Prática)
        { fator: 'Tecnologia Aplicada', mercado: 40, nos: 90 },
        { fator: 'Flexibilidade (Matriz)', mercado: 20, nos: 95 }, // Matriz Radial
        { fator: 'Empregabilidade', mercado: 50, nos: 90 },
    ];
};

// 2. Engine Cultural
const generateCulturalMap = (city: MunicipioPerfil) => {
    const region = city.regiao;
    let comunicacao = 70, lideranca = 80, decisao = 60, confianca = 40;

    if (region === 'Centro-Oeste' || region === 'Norte') {
        comunicacao = 90; lideranca = 20; decisao = 30; confianca = 10;
    } else if (region === 'Nordeste') {
        comunicacao = 20; lideranca = 40; confianca = 5;
    }
    return { comunicacao, lideranca, decisao, confianca };
};

// 3. Engine Stakeholders (Knowledge Ecology)
// Agora mapeia o TIPO de saber que o parceiro traz
const generateKnowledgeEcology = (city: MunicipioPerfil) => {
    const pibAgro = city.agro.pib_agro_bi;
    const isServiceHub = city.economia.pib_composicao.servicos_bi > city.economia.pib_composicao.agropecuaria_bi;
    
    // Mapeamento de Parceiros Reais (Simulado)
    const partners = [
        { name: "Sindicato Rural", practical: 95, scientific: 20, type: 'Prático' },
        { name: "EMBRAPA/Inst. Pesquisa", practical: 40, scientific: 100, type: 'Científico' },
        { name: "Cooperativa Local", practical: 90, scientific: 50, type: 'Híbrido' },
        { name: "Prefeitura (Sec. Agric.)", practical: 30, scientific: 20, type: 'Político' },
        { name: "Multinacional (Insumos)", practical: 80, scientific: 90, type: 'Tecnológico' }
    ];
    
    return partners;
};

// 4. Engine Tática (Horizontes Pedagógicos)
const generatePedagogicalTactics = (city: MunicipioPerfil) => {
    const isAgroHighTech = city.agro.nivel_tecnologico === 'Alto';
    
    const context = {
        partner: isAgroHighTech ? "Hubs AgTech & Revendas" : "Cooperativa & Sindicato",
        project: isAgroHighTech ? "Monitoramento de Safra 4.0" : "Gestão de Custos da Propriedade",
        lab: isAgroHighTech ? "Lab de Dados & Drones" : "Escritório Modelo de Gestão",
    };

    return [
        {
            id: 'h1',
            title: 'CICLO 1: DIAGNÓSTICO & RECONTEXTUALIZAÇÃO',
            period: 'Meses 0-6',
            objective: 'Instalar o Dispositivo Pedagógico e mapear dores reais.',
            status: 'Fundação',
            color: 'border-l-4 border-indigo-500',
            icon: Search,
            actions: [
                { id: 'a1', type: 'Pedagógico', job: 'Mapeamento de Saberes Locais', how: `Entrevistas com ${context.partner} para definir currículo.`, kpi: 'Matriz Radial desenhada.', owner: 'Coord. Acadêmico' },
                { id: 'a2', type: 'Relacionamento', job: 'Acordo de "Dual Learning"', how: `Formalizar empresas onde alunos farão a prática.`, kpi: '3 Parceiros Âncora.', owner: 'Dir. Unidade' },
                { id: 'a3', type: 'Produto', job: 'Curso de Extensão (Isca)', how: `Resolver dor imediata: "${context.project}".`, kpi: '30 alunos matriculados.', owner: 'Mkt Local' }
            ]
        },
        {
            id: 'h2',
            title: 'CICLO 2: COCRIAÇÃO & ATIVAÇÃO',
            period: 'Meses 6-18',
            objective: `Rodar a Matriz Radial com alunos em campo.`,
            status: 'Operação',
            color: 'border-l-4 border-emerald-500',
            icon: Sprout,
            actions: [
                { id: 'a4', type: 'Pedagógico', job: 'Início dos Projetos Aplicados', how: 'Alunos dentro das empresas resolvendo problemas.', kpi: '5 projetos entregues.', owner: 'Mentores' },
                { id: 'a5', type: 'Infraestrutura', job: 'Ativação do Lab Vivo', how: `Inauguração do ${context.lab}.`, kpi: '100% uso pelos alunos.', owner: 'Ops' },
                { id: 'a6', type: 'Institucional', job: 'Fórum de Devolutiva', how: `Apresentação dos resultados para a sociedade.`, kpi: 'Presença do Prefeito/Líderes.', owner: 'Relacionamento' }
            ]
        },
        {
            id: 'h3',
            title: 'CICLO 3: EMANCIPAÇÃO & LEGADO',
            period: 'Meses 18-36',
            objective: 'Consolidar a autoridade técnica e política.',
            status: 'Visão',
            color: 'border-l-4 border-amber-500',
            icon: Award,
            actions: [
                { id: 'a7', type: 'Think Tank', job: 'Publicação de Policy Briefs', how: 'Transformar dados dos projetos em inteligência de mercado.', kpi: 'Citação na mídia local.', owner: 'Head Think Tank' },
                { id: 'a8', type: 'Expansão', job: 'Certificação de Impacto', how: `Selo de qualidade para ${context.partner}.`, kpi: 'Receita B2B recorrente.', owner: 'Novos Negócios' }
            ]
        }
    ];
};

// --- COMPONENTES ---

const NarrativeCard = ({ city }: { city: MunicipioPerfil }) => {
    const narrative = useMemo(() => generateStrategicNarrative(city), [city]);
    const Icon = narrative.icon;

    return (
        <div className={`rounded-[2rem] p-8 relative overflow-hidden border ${narrative.border} ${narrative.bg} shadow-sm mb-8`}>
            <div className={`absolute top-0 right-0 p-8 opacity-10 pointer-events-none ${narrative.color}`}>
                <Icon size={200} />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${narrative.color}`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-black uppercase tracking-tight ${narrative.color}`}>
                            {narrative.title}
                        </h2>
                        <span className={`text-[10px] font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded ${narrative.color.replace('text-', 'text-opacity-80 text-')}`}>
                            Vocação Territorial
                        </span>
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 leading-relaxed mb-4">
                    "{narrative.headline}"
                </h3>
                
                <p className="text-slate-600 font-medium leading-relaxed max-w-3xl border-l-4 border-white pl-6">
                    {narrative.thesis}
                </p>
            </div>
        </div>
    );
};

const RecontextualizationEngine = ({ city }: { city: MunicipioPerfil }) => {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-blue-600">
                <RefreshCw size={150} />
            </div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
                    <RefreshCw size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Motor de Recontextualização</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Think Tank: Do Global para o Local</p>
                </div>
            </div>

            <div className="space-y-6 flex-1 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-700">
                        <Globe size={18} />
                        <h4 className="font-black uppercase text-xs tracking-wide">1. Tendência Global (Ciência)</h4>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm text-blue-900 font-medium">
                        "Mercado de Carbono e Rastreabilidade (ESG) exigidos pela União Europeia."
                    </div>
                </div>

                <div className="flex justify-center -my-2 text-slate-300">
                    <ChevronDown size={20} />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-700">
                        <BrainCircuit size={18} />
                        <h4 className="font-black uppercase text-xs tracking-wide">2. Tradução Pedagógica (Matriz)</h4>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-sm text-purple-900 font-medium">
                        "Criação de disciplina 'Certificação de Propriedades' dentro da trilha de Gestão."
                    </div>
                </div>

                <div className="flex justify-center -my-2 text-slate-300">
                    <ChevronDown size={20} />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <Sprout size={18} />
                        <h4 className="font-black uppercase text-xs tracking-wide">3. Aplicação Local (Prática)</h4>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-sm text-emerald-900 font-medium">
                        "Alunos auditam 5 fazendas em {city.nome} para adequação ao CAR e RenovaBio."
                    </div>
                </div>
            </div>
        </div>
    );
};

const KnowledgeEcologyWidget = ({ city }: { city: MunicipioPerfil }) => {
    const partners = useMemo(() => generateKnowledgeEcology(city), [city]);
    
    // Prepara dados para o Radar: 2 eixos (Prático vs Científico)
    // Para simplificar no radar, vamos criar métricas sintéticas de "Potencial Pedagógico"
    const data = partners.map(p => ({
        subject: p.name.split(' ')[0], // Nome curto
        Pratico: p.practical,
        Cientifico: p.scientific,
        fullMark: 100
    }));

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
            <div className="mb-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Users size={18} className="text-purple-600"/> Ecologia de Saberes
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">Mapeamento de Parceiros Docentes</p>
            </div>
            
            <div className="flex-1 w-full min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Saber Prático (Campo)" dataKey="Pratico" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.3} />
                        <Radar name="Saber Científico (Academia)" dataKey="Cientifico" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} />
                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium italic">
                    "O currículo nasce da tensão entre o saber científico e o prático."
                </p>
            </div>
        </div>
    );
};

const StrategyCanvas = ({ city }: { city: MunicipioPerfil }) => {
    const data = useMemo(() => generateStrategyCanvas(city), [city]);
    
    return (
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <Anchor size={20} className="text-emerald-400"/> Diferenciação Pedagógica
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Nossa Proposta de Valor</p>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="fator" stroke="#94a3b8" tick={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ fontWeight: 'bold' }}
                        />
                        <Line type="monotone" dataKey="mercado" stroke="#64748b" strokeWidth={2} dot={{ r: 4, fill: '#64748b' }} name="Faculdade Padrão" />
                        <Line type="monotone" dataKey="nos" stroke="#34d399" strokeWidth={4} dot={{ r: 6, fill: '#34d399', strokeWidth: 2, stroke: '#fff' }} name="Ânima Agro" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                <Target className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Ponto de Vitória:</strong> Invertemos a lógica. Menos prédio, mais <strong>conexão</strong>. Menos aula expositiva, mais <strong>matriz flexível</strong>.
                </p>
            </div>
        </div>
    );
};

const FinancialSandbox = ({ city }: { city: MunicipioPerfil }) => {
    // Defaults baseados no Tier
    const defaults = useMemo(() => {
        if (city.tier === 'SEDE') return { capex: 15, students: 400, ticket: 1200 };
        if (city.tier === 'P3') return { capex: 6, students: 200, ticket: 900 };
        return { capex: 3, students: 120, ticket: 600 };
    }, [city]);

    const [capex, setCapex] = useState(defaults.capex);
    const [students, setStudents] = useState(defaults.students);
    const [ticket, setTicket] = useState(defaults.ticket);

    // Cálculos em tempo real com lógica de "Dual Learning"
    // Bônus de Receita B2B: Se tiver muitos alunos, assume-se contratos corporativos (15% extra)
    const b2bRevenue = (students * ticket * 12) * 0.15; 
    const revenueYearly = ((students * ticket * 12) + b2bRevenue) / 1000000; // Em Milhões
    
    const opexRatio = 0.60; // Margem melhor por causa da estrutura leve (parceiros)
    const ebitda = revenueYearly * (1 - opexRatio);
    const paybackYears = capex / (ebitda || 1); 
    
    const formatMoney = (val: number) => `R$ ${val.toFixed(1)}M`;

    return (
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-700 shadow-xl text-white h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                    <Calculator size={20} className="text-emerald-400"/> Modelo de Viabilidade
                </h3>
                <RefreshCw size={14} className="text-slate-400 cursor-pointer hover:text-white" onClick={() => { setCapex(defaults.capex); setStudents(defaults.students); setTicket(defaults.ticket); }}/>
            </div>

            <div className="flex-1 space-y-6">
                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-slate-400">CAPEX (Milhões)</span>
                            <span className="text-white">R$ {capex}M</span>
                        </div>
                        <input type="range" min="1" max="30" step="0.5" value={capex} onChange={e => setCapex(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-slate-400">Alunos (Maturação)</span>
                            <span className="text-white">{students}</span>
                        </div>
                        <input type="range" min="50" max="1000" step="10" value={students} onChange={e => setStudents(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-slate-400">Ticket Médio (Mensal)</span>
                            <span className="text-white">R$ {ticket}</span>
                        </div>
                        <input type="range" min="300" max="3000" step="50" value={ticket} onChange={e => setTicket(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                    </div>
                </div>

                <div className="w-full h-px bg-slate-700"></div>

                {/* Outputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase">Receita Total (inc. B2B)</p>
                        <p className="text-lg font-black text-white">{formatMoney(revenueYearly)}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase">EBITDA (40%)</p>
                        <p className="text-lg font-black text-emerald-400">{formatMoney(ebitda)}</p>
                    </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center justify-between ${paybackYears < 4 ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Payback Estimado</p>
                        <p className={`text-2xl font-black ${paybackYears < 4 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {paybackYears.toFixed(1)} <span className="text-sm">Anos</span>
                        </p>
                    </div>
                    <div className="text-right">
                         <span className="block text-[9px] font-bold text-slate-500 uppercase">Modelo Leve</span>
                         <span className="text-xs text-white">Parcerias reduzem Capex</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TACTICAL MATRIX COM ESTADO ---
const TacticalOperationsMatrix = ({ city }: { city: MunicipioPerfil }) => {
    const horizons = useMemo(() => generatePedagogicalTactics(city), [city]);
    const [openHorizon, setOpenHorizon] = useState<string | null>('h1');
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleHorizon = (id: string) => {
        setOpenHorizon(prev => prev === id ? null : id);
    };

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const calculateProgress = (actionIds: string[]) => {
        const total = actionIds.length;
        const checked = actionIds.filter(id => checkedItems[id]).length;
        return total > 0 ? (checked / total) * 100 : 0;
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'Pedagógico': return <BookOpen size={14} className="text-indigo-600"/>;
            case 'Think Tank': return <BrainCircuit size={14} className="text-purple-600"/>;
            case 'Produto': return <Zap size={14} className="text-yellow-600"/>;
            case 'Relacionamento': return <Handshake size={14} className="text-blue-600"/>;
            case 'Infraestrutura': return <Building2 size={14} className="text-slate-600"/>;
            case 'Institucional': return <Flag size={14} className="text-rose-600"/>;
            case 'Expansão': return <Rocket size={14} className="text-orange-600"/>;
            default: return <Target size={14} className="text-slate-600"/>;
        }
    };

    return (
        <div className="space-y-6">
            {horizons.map((horizon) => {
                const progress = calculateProgress(horizon.actions.map(a => a.id));
                const isComplete = progress === 100;

                return (
                    <div key={horizon.id} className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${horizon.color}`}>
                        
                        <button 
                            onClick={() => toggleHorizon(horizon.id)}
                            className="w-full p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors relative"
                        >
                            <div className="absolute bottom-0 left-0 h-1 bg-slate-200 w-full">
                                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 border rounded-xl shadow-sm text-slate-700 ${isComplete ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-white border-slate-100'}`}>
                                        {isComplete ? <CheckCircle2 size={24} /> : <horizon.icon size={24} />}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">{horizon.title}</h3>
                                            <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider">{horizon.period}</span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-500">{horizon.objective}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-400">{Math.round(progress)}%</span>
                                    <div className={`p-1 rounded-full transition-transform ${openHorizon === horizon.id ? 'rotate-180 bg-slate-200' : 'bg-transparent'}`}>
                                        <ChevronDown size={20} className="text-slate-400"/>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {openHorizon === horizon.id && (
                            <div className="p-6 border-t border-slate-100 bg-white animate-fade-in">
                                <div className="grid grid-cols-1 gap-4">
                                    {horizon.actions.map((action) => (
                                        <div 
                                            key={action.id} 
                                            onClick={() => toggleCheck(action.id)}
                                            className={`flex flex-col md:flex-row gap-4 p-4 rounded-xl border transition-all group cursor-pointer 
                                                ${checkedItems[action.id] ? 'bg-emerald-50/50 border-emerald-100 opacity-70' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'}`}
                                        >
                                            <div className="flex items-center justify-center pl-2">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checkedItems[action.id] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
                                                    {checkedItems[action.id] && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                            </div>

                                            <div className="md:w-48 shrink-0 flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    {getTypeIcon(action.type)}
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{action.type}</span>
                                                </div>
                                                <div className="mt-auto">
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Responsável</p>
                                                    <p className="text-xs font-bold text-slate-700">{action.owner}</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 border-l border-slate-100 pl-4 md:border-l-2 md:pl-6">
                                                <h4 className={`text-sm font-black mb-2 flex items-center gap-2 ${checkedItems[action.id] ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                    {action.job}
                                                </h4>
                                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                    <span className="font-bold text-blue-600">Dispositivo:</span> {action.how}
                                                </p>
                                            </div>

                                            <div className="md:w-64 shrink-0 bg-slate-50 rounded-lg p-3 border border-slate-100 flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-1 text-emerald-600">
                                                    <Flag size={12} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">KPI Pedagógico</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-700 leading-snug">
                                                    {action.kpi}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const CityPlaybookView: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    return (
        <div id="city-playbook-content" className="space-y-12 animate-fade-in pb-20 relative">
            
            {/* Header Visível Apenas no PDF/Impressão */}
            <div className="hidden pdf-visible mb-8 border-b-4 border-red-600 pb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Plano Tático: {city.nome}</h1>
                    <span className="text-xs font-bold text-red-600 uppercase border border-red-600 px-3 py-1 rounded">Confidencial</span>
                </div>
                <p className="text-slate-500 font-medium text-sm mt-2">Implementação do Modelo de Ecologia de Saberes</p>
            </div>

            {/* Barra de Ações (Visível apenas na tela) */}
            <div className="flex justify-end mb-4">
                <ExportReportButton 
                    elementId="city-playbook-content" 
                    filename={`Playbook_Pedagogico_${city.nome}`} 
                    label="Baixar Plano Tático (PDF)"
                    variant="primary"
                />
            </div>
            
            {/* NOVO BLOCO: NARRATIVA ESTRATÉGICA (O GERADOR DE TESE) */}
            <section>
                <div className="mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-900 rounded-full"></div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">0. Identidade do Território (Narrativa)</h2>
                </div>
                <NarrativeCard city={city} />
            </section>

            {/* SEÇÃO 1: DIFERENCIAÇÃO COMPETITIVA */}
            <section>
                <div className="mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">1. Diferenciação Competitiva (Blue Ocean)</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <StrategyCanvas city={city} />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 h-full flex flex-col justify-center items-center text-center">
                            <Target size={48} className="text-slate-300 mb-4"/>
                            <p className="text-sm font-bold text-slate-700 mb-2">Nosso "Fator X"</p>
                            <p className="text-xs text-slate-500 italic">"Enquanto eles vendem diploma, nós entregamos conexão com a cadeia produtiva."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2: A MÁQUINA DE RECONTEXTUALIZAÇÃO (THINK TANK) */}
            <section>
                <div className="mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">2. Dispositivo Pedagógico (Think Tank)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[500px]">
                    <div className="md:col-span-2">
                        <RecontextualizationEngine city={city} />
                    </div>
                    <div className="md:col-span-1">
                        <KnowledgeEcologyWidget city={city} />
                    </div>
                </div>
            </section>

            {/* SEÇÃO 3: MATRIZ DE EXECUÇÃO TÁTICA */}
            <section className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-600/20">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Jornada de Implantação</h2>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Os 3 Ciclos de Ativação do Território</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <Settings size={14} className="text-slate-400"/>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Contexto: {city.agro.nivel_tecnologico === 'Alto' ? 'Agro High-Tech' : 'Hub Regional'}</span>
                    </div>
                </div>
                
                <TacticalOperationsMatrix city={city} />
            </section>
            
            {/* SEÇÃO 4: VIABILIDADE FINANCEIRA */}
             <section>
                <div className="mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">4. Viabilidade Econômica (Dual Learning)</h2>
                </div>
                <div className="h-[400px]">
                     <FinancialSandbox city={city} />
                </div>
            </section>

        </div>
    );
};

export default CityPlaybookView;
