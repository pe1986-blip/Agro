
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, BarChart3, School, GitMerge, BrainCircuit, 
  XCircle, AlertOctagon, CheckCircle2, Target, Zap, Anchor,
  BookOpen, Plane, Users, TrendingUp, Microscope, Briefcase,
  LayoutGrid, ArrowRight, Star, GraduationCap, RefreshCw, Loader2,
  MapPin, Share2, Server, Radio, Database
} from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Cell, Label,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { SheetData, YEARS } from './types';
import { formatNumber } from './constants';
import { FinancialRepository } from './services/persistenceService';

// --- ARQUÉTIPOS E DADOS ESTÁTICOS DE PRODUTO ---
const PRODUCT_CATEGORIES = [
    { id: 'vivencia', label: 'Vivência & Aceleração', color: 'text-blue-600' },
    { id: 'carreira', label: 'Carreira & Conexão', color: 'text-purple-600' },
    { id: 'deep', label: 'Deep Skills (Técnico)', color: 'text-emerald-600' },
];

const PRODUCTS_DNA = [
    // VIVÊNCIA
    {
        id: 'imersao',
        category: 'vivencia',
        title: 'Imersão Vivencial',
        tag: 'Visão Sistêmica',
        icon: Target,
        desc: "Mergulho vivencial no conhecimento prático do setor agrário, onde o tempo comprimido potencializa a absorção de saberes enraizados na realidade concreta. Uma operação de respiração compartilhada entre teoria e prática, que transforma observador em agente.",
        radar: [
            { subject: 'Prática', A: 90 }, { subject: 'Teoria', A: 30 }, { subject: 'Conexão', A: 80 }, { subject: 'Inovação', A: 40 }, { subject: 'Mentoria', A: 50 }
        ]
    },
    {
        id: 'bootcamp',
        category: 'vivencia',
        title: 'Bootcamp Tático',
        tag: 'Mão na Massa',
        icon: Zap,
        desc: "Treinamento intensivo com foco em resultados práticos imediatos. Design desenhado para resolver dores operacionais específicas em curto prazo, eliminando o excesso acadêmico.",
        radar: [
            { subject: 'Prática', A: 95 }, { subject: 'Teoria', A: 20 }, { subject: 'Conexão', A: 40 }, { subject: 'Inovação', A: 60 }, { subject: 'Mentoria', A: 30 }
        ]
    },
    {
        id: 'viagem',
        category: 'vivencia',
        title: 'Viagem Internacional',
        tag: 'Benchmarking Global',
        icon: Plane,
        desc: "Abertura de horizontes para além das fronteiras, respiração de outras atmosferas inovadoras no setor. Desterritorialização do pensamento que amplia sensibilidade global e capacidade de adaptação criativa.",
        radar: [
            { subject: 'Prática', A: 40 }, { subject: 'Teoria', A: 30 }, { subject: 'Conexão', A: 100 }, { subject: 'Inovação', A: 90 }, { subject: 'Mentoria', A: 20 }
        ]
    },
    // CARREIRA
    {
        id: 'agromatch',
        category: 'carreira',
        title: 'AgroMatch (Lida Bruta)',
        tag: 'Empregabilidade',
        icon: Users,
        desc: "Programa de matching e desenvolvimento para o agronegócio. Operador de conexão entre formação e mercado de trabalho. Identifica talentos e os acelera para oportunidades viáveis, desenvolvendo liderança operativa.",
        radar: [
            { subject: 'Prática', A: 80 }, { subject: 'Teoria', A: 20 }, { subject: 'Conexão', A: 95 }, { subject: 'Inovação', A: 40 }, { subject: 'Mentoria', A: 40 }
        ]
    },
    {
        id: 'mentoria',
        category: 'carreira',
        title: 'Mentoria Executiva',
        tag: 'Aceleração Pessoal',
        icon: Star,
        desc: "Acompanhamento personalizado e estratégico, aquele diálogo one-to-one onde experiencial se compartilha e caminhos se iluminam. Acelerador de aprendizado através da sabedoria de quem já vivenciou plenamente o percurso.",
        radar: [
            { subject: 'Prática', A: 40 }, { subject: 'Teoria', A: 20 }, { subject: 'Conexão', A: 80 }, { subject: 'Inovação', A: 30 }, { subject: 'Mentoria', A: 100 }
        ]
    },
    // DEEP SKILLS
    {
        id: 'trader',
        category: 'deep',
        title: 'Programa Trader',
        tag: 'Competência Financeira',
        icon: TrendingUp,
        desc: "Construção de mentalidade operativa para o mercado agrário — aquela capaz de ler volatilidades, de antecipá-las e converter inteligência analítica em resultado tangível. Interseção entre conhecimento agrário e dinâmica de investimento.",
        radar: [
            { subject: 'Prática', A: 70 }, { subject: 'Teoria', A: 80 }, { subject: 'Conexão', A: 30 }, { subject: 'Inovação', A: 50 }, { subject: 'Mentoria', A: 30 }
        ]
    },
    {
        id: 'sucessao',
        category: 'deep',
        title: 'Programa Sucessão',
        tag: 'Governança Familiar',
        icon: Anchor,
        desc: "Transmissão ponderada de liderança e responsabilidade entre gerações. Estrutura que articula sabedoria acumulada com inovação necessária, garantindo que o legado institucional prossiga reinventado e revigorado.",
        radar: [
            { subject: 'Prática', A: 50 }, { subject: 'Teoria', A: 40 }, { subject: 'Conexão', A: 70 }, { subject: 'Inovação', A: 30 }, { subject: 'Mentoria', A: 90 }
        ]
    },
    {
        id: 'pd',
        category: 'deep',
        title: 'P&D Aplicado',
        tag: 'Ciência & Mercado',
        icon: Microscope,
        desc: "Programa de Pesquisa & Desenvolvimento aplicado ao agronegócio, focado em criar soluções inéditas e gerar resultados técnicos, científicos e mercadológicos, integrando experimentação prática, relatórios e inovação.",
        radar: [
            { subject: 'Prática', A: 60 }, { subject: 'Teoria', A: 80 }, { subject: 'Conexão', A: 50 }, { subject: 'Inovação', A: 100 }, { subject: 'Mentoria', A: 20 }
        ]
    },
    {
        id: 'pos',
        category: 'deep',
        title: 'Pós-Graduação',
        tag: 'Especialização',
        icon: GraduationCap,
        desc: "Especialização acadêmica avançada. Aprofundamento vertical em temas críticos, garantindo a chancela formal e o rigor técnico necessário para posições de alta complexidade.",
        radar: [
            { subject: 'Prática', A: 30 }, { subject: 'Teoria', A: 100 }, { subject: 'Conexão', A: 40 }, { subject: 'Inovação', A: 50 }, { subject: 'Mentoria', A: 20 }
        ]
    },
];

const RENUNCIAS = [
    "Não seremos uma 'faculdade de balcão' (commodities educacionais).",
    "Não competiremos por preço (Ticket Médio baixo).",
    "Não entraremos em cidades sem cluster produtivo definido.",
    "Não faremos pesquisa teórica desvinculada da aplicação industrial."
];

// --- LOGIC: DATA MAPPING ---

const getJitter = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
    return (Math.abs(hash) % 100) / 200; // 0.00 a 0.50
};

const mapSheetsToMatrix = (sheets: SheetData[]) => {
    return sheets
        .filter(s => s.type !== 'consolidated' && s.type !== 'team') 
        .map(sheet => {
            const rowEbitda = sheet.rows.find(r => r.id === 'ebitda');
            const rowRevenue = sheet.rows.find(r => r.id === 'grossRevenue');
            const rowCapex = sheet.rows.find(r => r.id === 'capexTotal');

            const ebitdaVal = rowEbitda ? rowEbitda.values['ano5'] : 0; 
            const revenueVal = rowRevenue ? rowRevenue.values['ano5'] : 0; 
            const capexVal = rowCapex ? (rowCapex.values['ano1'] + rowCapex.values['ano2']) : 0; 

            let impactScore = (ebitdaVal / 2) * 2.5; 
            impactScore += getJitter(sheet.id + 'y');
            impactScore = Math.min(9.5, Math.max(1, impactScore));

            let baseComplexity = 4;
            if (sheet.type === 'unit') baseComplexity = 6;
            if (sheet.type === 'b2b_project') baseComplexity = 8;
            // Fix: Updated comparison to handle 'product' and 'hybrid_course' with updated type union
            if (sheet.type === 'product' || sheet.type === 'hybrid_course') baseComplexity = 3;

            const capexScore = (capexVal / 2);
            let complexityScore = baseComplexity + capexScore;
            complexityScore += getJitter(sheet.id + 'x');
            complexityScore = Math.min(9.5, Math.max(1, complexityScore));

            const zVal = Math.max(100, revenueVal * 150); 

            let type = 'Strategic';
            let color = '#94a3b8';

            if (impactScore > 6 && complexityScore < 5) {
                type = 'Quick Win';
                color = '#3b82f6';
            } else if (impactScore > 7 && complexityScore >= 5) {
                type = 'Big Bet';
                color = '#10b981';
            } else if (impactScore < 4 && complexityScore < 4) {
                type = 'Fill-in';
                color = '#94a3b8';
            } else if (impactScore < 5 && complexityScore > 7) {
                type = 'Money Pit';
                color = '#ef4444';
            } else {
                type = 'Strategic';
                color = '#8b5cf6';
            }
            
            if (sheet.isSimulation) {
                color = '#f59e0b';
                type = 'Simulação';
            }

            return {
                id: sheet.id,
                name: sheet.name,
                x: parseFloat(complexityScore.toFixed(2)),
                y: parseFloat(impactScore.toFixed(2)),
                z: zVal,
                type,
                color,
                desc: `EBITDA A5: R$ ${formatNumber(ebitdaVal)}MM | Capex: R$ ${formatNumber(capexVal)}MM`,
                isSimulation: sheet.isSimulation
            };
        });
};

// --- COMPONENT: AGRO NETWORK MAP (VERSÃO FINAL DARK MODE) ---
const AgroNetworkMap = () => {
    // Coordenadas relativas (0-100%) para posicionamento no SVG
    const nodes = [
        { id: 'goiania', name: 'Goiânia (Sede)', x: 52, y: 55, type: 'hub', color: '#10b981', pulse: true }, // Centro-Oeste Central
        { id: 'cuiaba', name: 'Cuiabá', x: 38, y: 50, type: 'node', color: '#3b82f6', pulse: false }, // Oeste
        { id: 'cascavel', name: 'Cascavel/Toledo', x: 48, y: 80, type: 'node', color: '#f59e0b', pulse: false }, // Sul
        { id: 'uberlandia', name: 'Uberlândia', x: 58, y: 62, type: 'node', color: '#3b82f6', pulse: false }, // Sudeste
        { id: 'matopiba', name: 'Matopiba (LEM)', x: 62, y: 35, type: 'node', color: '#f59e0b', pulse: false }, // Norte/Nordeste
        { id: 'rio_verde', name: 'Rio Verde', x: 50, y: 58, type: 'node', color: '#8b5cf6', pulse: false }, // Perto de GYN
    ];

    const hub = nodes.find(n => n.id === 'goiania')!;

    return (
        <div className="bg-slate-950 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
            {/* Background Grid Sutil */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 h-full">
                
                {/* Lado Esquerdo: Painel de Controle da Rede */}
                <div className="lg:w-1/3 flex flex-col justify-center space-y-8 pointer-events-auto z-20">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 w-fit animate-pulse">
                            <Radio size={12} /> Rede Conectada
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
                            A Nave Mãe e <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Seus Nódulos</span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            Goiânia não opera isolada. Ela é o <strong>Think Tank</strong> que bombeia metodologia, dados e inteligência para as pontas operacionais.
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                         <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center gap-4 group hover:bg-emerald-900/30 transition-colors">
                             <div className="p-2 bg-emerald-500 rounded-lg text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                 <BrainCircuit size={20}/>
                             </div>
                             <div>
                                 <h4 className="text-sm font-black text-white uppercase tracking-wide">Goiânia (Central)</h4>
                                 <p className="text-[10px] text-emerald-400">Hub de Decisão, Política & Inovação</p>
                             </div>
                         </div>
                         
                         <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 flex items-center gap-4 group hover:bg-blue-900/30 transition-colors">
                             <div className="p-2 bg-blue-500 rounded-lg text-white">
                                 <Share2 size={20}/>
                             </div>
                             <div>
                                 <h4 className="text-sm font-black text-white uppercase tracking-wide">Nódulos Regionais</h4>
                                 <p className="text-[10px] text-blue-400">Replicação Tática & Capilaridade</p>
                             </div>
                         </div>

                         <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-500/30 flex items-center gap-4 group hover:bg-amber-900/30 transition-colors">
                             <div className="p-2 bg-amber-500 rounded-lg text-slate-900">
                                 <Database size={20}/>
                             </div>
                             <div>
                                 <h4 className="text-sm font-black text-white uppercase tracking-wide">Fluxo de Dados</h4>
                                 <p className="text-[10px] text-amber-400">Diagnóstico Local ↔ Solução Central</p>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Lado Direito: O Mapa Interativo */}
                <div className="flex-1 relative min-h-[500px] bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    
                    {/* SVG Layer para Mapa e Conexões */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>

                        {/* Silhouette do Brasil (Simplificada/Abstrata para efeito) */}
                        <path 
                            d="M30,10 L70,15 L90,40 L80,70 L50,90 L35,80 L20,50 L15,30 Z" 
                            fill="none" 
                            stroke="#1e293b" 
                            strokeWidth="0.5" 
                            opacity="0.5"
                        />

                        {/* Conexões (Synapses) */}
                        {nodes.filter(n => n.id !== 'goiania').map((node, i) => (
                            <g key={i}>
                                <line 
                                    x1={hub.x} y1={hub.y} 
                                    x2={node.x} y2={node.y} 
                                    stroke="url(#lineGradient)" 
                                    strokeWidth="0.3" 
                                    strokeDasharray="1 1"
                                    className="animate-pulse"
                                />
                                {/* Partícula de Dados viajando */}
                                <circle r="0.5" fill="#fff">
                                    <animateMotion 
                                        dur={`${2 + i * 0.5}s`} 
                                        repeatCount="indefinite"
                                        path={`M${hub.x},${hub.y} L${node.x},${node.y}`}
                                    />
                                </circle>
                            </g>
                        ))}
                    </svg>

                    {/* Nodes HTML (Interativos) */}
                    {nodes.map((node) => (
                        <div 
                            key={node.id}
                            className="absolute flex flex-col items-center group cursor-pointer"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            {/* Ping Animation para Hub */}
                            {node.pulse && (
                                <div className="absolute w-24 h-24 bg-emerald-500/20 rounded-full animate-ping pointer-events-none"></div>
                            )}

                            {/* O Ponto */}
                            <div 
                                className={`
                                    relative z-10 rounded-full border-2 border-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300
                                    ${node.type === 'hub' ? 'w-8 h-8 bg-emerald-500 hover:scale-125' : 'w-4 h-4 bg-white hover:scale-150 hover:bg-blue-400'}
                                `}
                                style={{ backgroundColor: node.type === 'hub' ? '#10b981' : node.color }}
                            >
                                {node.type === 'hub' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Target size={14} className="text-slate-900"/>
                                    </div>
                                )}
                            </div>

                            {/* Label */}
                            <div className={`
                                mt-3 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur border border-white/10 text-center transition-all duration-300
                                ${node.type === 'hub' ? 'scale-100 opacity-100' : 'scale-90 opacity-60 group-hover:scale-100 group-hover:opacity-100'}
                            `}>
                                <p className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${node.type === 'hub' ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {node.name}
                                </p>
                                {node.type === 'node' && (
                                    <p className="text-[8px] text-slate-500 font-bold hidden group-hover:block">Replicador</p>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            
            {/* Footer Connection */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-2">
                    <Server size={14} className="text-blue-500"/>
                    Integração via <strong>Modelo Operacional</strong>
                </span>
                <span className="hidden md:inline text-slate-700">|</span>
                <span>Diagnóstico Local (Ponta) <span className="text-emerald-500 mx-1">→</span> Processamento Central <span className="text-emerald-500 mx-1">→</span> Solução Distribuída</span>
            </div>
        </div>
    );
};


// --- COMPONENTE: MATRIZ ESTRATÉGICA (LIVE DATA) ---
const StrategicMatrixContent = ({ onNavigate }: { onNavigate?: (id: string) => void }) => {
    const [matrixData, setMatrixData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carrega do Repositório (Abstracted Storage)
        const loadData = async () => {
            try {
                const sheets = await FinancialRepository.loadSheets();
                const mapped = mapSheetsToMatrix(sheets);
                setMatrixData(mapped);
            } catch (e) {
                console.error("Erro ao carregar dados financeiros para matriz", e);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();
    }, []);

    const handleBubbleClick = (data: any) => {
        if (data && data.id && onNavigate) {
            onNavigate(data.id);
        }
    };

    return (
        <div className="space-y-16 animate-fade-in">
            
            {/* 0. REDE CONCEITUAL (NOVO) */}
            <section>
                <AgroNetworkMap />
            </section>

            {/* 1. O CONCEITO HÍBRIDO */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden p-8 md:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">O Modelo Híbrido: "Vertical Espiralizada"</h2>
                    <p className="text-slate-500 mt-2 text-sm max-w-2xl mx-auto">
                        Não somos apenas escola (isolamento) nem apenas consultoria (sem base). Somos a união de Aprendizagem e Relacionamento.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                    {/* Lado Esquerdo: Vertical */}
                    <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center opacity-80 hover:opacity-100 transition-all hover:shadow-md">
                        <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <School size={28} />
                        </div>
                        <h3 className="font-black text-slate-800 uppercase text-sm mb-2">A Vertical Clássica</h3>
                        <p className="text-xs text-slate-500 leading-relaxed px-4">
                            Focada em ensino, currículo e diploma. <br/>
                            <strong className="text-rose-500">Risco:</strong> Isolamento ("Torre de Marfim") e obsolescência.
                        </p>
                    </div>

                    {/* Centro: A Solução */}
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl z-10 shrink-0 animate-pulse-slow border-4 border-white">
                        <GitMerge size={32} />
                    </div>

                    {/* Lado Direito: Think Tank */}
                    <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center opacity-80 hover:opacity-100 transition-all hover:shadow-md">
                        <div className="w-14 h-14 mx-auto bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                            <BrainCircuit size={28} />
                        </div>
                        <h3 className="font-black text-slate-800 uppercase text-sm mb-2">O Think Tank</h3>
                        <p className="text-xs text-slate-500 leading-relaxed px-4">
                            Focado em influência, política e conexões. <br/>
                            <strong className="text-rose-500">Risco:</strong> Falta de receita recorrente e dependência.
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-center max-w-2xl mx-auto">
                    <p className="text-indigo-900 font-bold text-sm">
                        <span className="text-indigo-600 font-black uppercase tracking-widest block mb-2 text-xs">A Síntese Ânima</span>
                        "Uma espiral que respira. Usamos a base acadêmica para gerar autoridade técnica e o relacionamento do Think Tank para garantir a empregabilidade e a relevância política."
                    </p>
                </div>
            </section>

            {/* 2. MATRIZ DE PRIORIZAÇÃO (LIVE) */}
            <section>
                 <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                <BarChart3 className="text-emerald-600" size={24}/> Matriz de Apostas (Portfolio V8)
                            </h2>
                            {loading && <Loader2 className="animate-spin text-slate-400" size={20}/>}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                            Plotagem automática das viabilidades financeiras criadas no Financial Studio. <span className="font-bold text-emerald-600 cursor-pointer hover:underline">Clique nos pontos para editar.</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase text-slate-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Big Bets</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Quick Wins</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Simulações</span>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-4 h-[550px] relative">
                    {!loading && matrixData.length === 0 ? (
                         <div className="flex items-center justify-center h-full text-slate-400 font-bold">
                             Nenhum projeto financeiro criado. Vá ao Financial Studio.
                         </div>
                    ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 30, right: 30, bottom: 40, left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis type="number" dataKey="x" name="Complexidade" domain={[0, 10]} tickCount={10} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={{ stroke: '#cbd5e1' }}>
                                <Label value="Complexidade & Capex (Alta ->)" offset={-15} position="insideBottom" style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }} />
                            </XAxis>
                            <YAxis type="number" dataKey="y" name="Impacto" domain={[0, 10]} tickCount={10} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={{ stroke: '#cbd5e1' }}>
                                <Label value="Impacto EBITDA (Alto ^)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }} />
                            </YAxis>
                            <ZAxis type="number" dataKey="z" range={[400, 3000]} name="Ticket" />
                            <Tooltip 
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 text-xs z-50 min-w-[200px]">
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-black text-[10px] uppercase tracking-widest text-emerald-400">{d.type}</p>
                                                    {d.isSimulation && <span className="text-[9px] bg-amber-500 text-black px-1.5 rounded font-bold">SIMULAÇÃO</span>}
                                                </div>
                                                <p className="font-bold text-base mb-2 border-b border-slate-700 pb-2">{d.name}</p>
                                                <p className="text-slate-300 mb-3 leading-relaxed">{d.desc}</p>
                                                <div className="flex gap-4 text-[10px] font-mono text-slate-500 mb-2">
                                                    <span>Impacto: {d.y}</span>
                                                    <span>Complex.: {d.x}</span>
                                                </div>
                                                <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest border-t border-slate-700 pt-2">
                                                    Clique para editar DRE
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                            <ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                            <ReferenceLine x={9.5} y={9.5} label={{ value: 'TRANSFORMACIONAL', position: 'insideTopRight', fill: '#10b981', fontSize: 12, fontWeight: 900, opacity: 0.5 }} stroke="none" />
                            <ReferenceLine x={0.5} y={9.5} label={{ value: 'QUICK WINS', position: 'insideTopLeft', fill: '#3b82f6', fontSize: 12, fontWeight: 900, opacity: 0.5 }} stroke="none" />
                            <ReferenceLine x={9.5} y={0.5} label={{ value: 'BURACOS NEGROS', position: 'insideBottomRight', fill: '#ef4444', fontSize: 12, fontWeight: 900, opacity: 0.3 }} stroke="none" />
                            <Scatter 
                                data={matrixData} 
                                onClick={(point) => handleBubbleClick(point.payload)}
                                cursor="pointer"
                            >
                                {matrixData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} className="hover:opacity-80 transition-opacity"/>
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                    )}
                 </div>
            </section>

            {/* 3. RENÚNCIAS ESTRATÉGICAS */}
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <AlertOctagon size={200} />
                 </div>
                 
                 <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8 justify-center">
                        <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-900/50">
                            <XCircle size={32} />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">O Poder do "NÃO"</h2>
                    </div>
                    
                    <p className="text-center text-slate-300 text-lg mb-10 font-medium">
                        Para garantir a execução do que importa, declaramos explicitamente o que está fora do escopo estratégico.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {RENUNCIAS.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-medium text-slate-200">{item}</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>
        </div>
    );
};

// --- NOVO: CONTEÚDO DNA DO PRODUTO (ABA 2) ---
const ProductDnaContent = () => {
    const [selectedId, setSelectedId] = useState(PRODUCTS_DNA[0].id);
    
    const activeProduct = PRODUCTS_DNA.find(p => p.id === selectedId) || PRODUCTS_DNA[0];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-fade-in">
            
            {/* LEFT: Product Navigation */}
            <div className="lg:col-span-4 flex flex-col h-full space-y-6">
                {PRODUCT_CATEGORIES.map(cat => (
                    <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                        <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${cat.color} px-2`}>
                            {cat.label}
                        </h4>
                        <div className="space-y-1">
                            {PRODUCTS_DNA.filter(p => p.category === cat.id).map(prod => {
                                const isActive = prod.id === selectedId;
                                return (
                                    <button
                                        key={prod.id}
                                        onClick={() => setSelectedId(prod.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                                            isActive 
                                            ? 'bg-slate-900 text-white shadow-md' 
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span>{prod.title}</span>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Detail View */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 flex flex-col h-full relative overflow-hidden">
                {/* Background Deco */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <activeProduct.icon size={250} />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-slate-100 rounded-2xl text-slate-800">
                            <activeProduct.icon size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{activeProduct.title}</h2>
                            <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                                <Target size={12}/> 
                                <span className="text-xs font-bold uppercase tracking-wide">{activeProduct.tag}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl">
                        "{activeProduct.desc}"
                    </p>

                    <div className="mt-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <BrainCircuit size={20} className="text-indigo-600"/>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Radar Epistemológico</h3>
                        </div>
                        
                        <div className="h-[300px] w-full bg-slate-50 rounded-3xl border border-slate-100 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={activeProduct.radar}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="DNA"
                                        dataKey="A"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        fill="#6366f1"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontWeight: 'bold' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

interface StrategicDirectionViewProps {
  initialTab?: 'matrix' | 'portfolio';
  onNavigateToDetail?: (sheetId: string) => void;
}

const StrategicDirectionView: React.FC<StrategicDirectionViewProps> = ({ initialTab = 'matrix', onNavigateToDetail }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'portfolio'>(initialTab);
  
  // Atualiza o estado quando a prop muda
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in flex flex-col">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-8 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Compass size={12} /> Direcionamento Estratégico
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
                Onde Jogamos & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Como Vencemos
                </span>
            </h1>

            {/* TAB NAVIGATION */}
            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                    onClick={() => setActiveTab('matrix')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === 'matrix' 
                        ? 'bg-white text-indigo-600 shadow-md ring-1 ring-indigo-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <LayoutGrid size={14} /> Matriz Estratégica
                </button>
                <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === 'portfolio' 
                        ? 'bg-white text-emerald-600 shadow-md ring-1 ring-emerald-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <BookOpen size={14} /> Portfólio & DNA
                </button>
            </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 mt-12 w-full flex-1">
        {activeTab === 'matrix' ? <StrategicMatrixContent onNavigate={onNavigateToDetail} /> : <ProductDnaContent />}
      </div>
      
    </div>
  );
};

export default StrategicDirectionView;
