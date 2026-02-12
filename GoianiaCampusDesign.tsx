
import React, { useState } from 'react';
import { 
  Layout, Bed, Zap, BookOpen, 
  Warehouse, Monitor, Key,
  Sun, Search, ArrowUp,
  Utensils, Sprout, Users, RefreshCw, Quote
} from 'lucide-react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

// --- DADOS DO BLOCO 2 ---

const ZONING_DISTRIBUTION = [
  { name: 'Educação', size: 2500, fill: '#3b82f6', desc: 'Salas, Labs, Simuladores' },
  { name: 'Operação Viva', size: 1500, fill: '#10b981', desc: 'Restaurante, Cozinha, Lounge' },
  { name: 'Residência', size: 1200, fill: '#f59e0b', desc: '152 Camas (Housing)' },
  { name: 'Think Tank', size: 1000, fill: '#8b5cf6', desc: 'Pesquisa e Redação' },
  { name: 'Infra/Back', size: 900, fill: '#64748b', desc: 'Tech, Storage, Laundry' },
  { name: 'Parking', size: 900, fill: '#94a3b8', desc: 'Fluxos e Vagas' },
  { name: 'Admin', size: 800, fill: '#cbd5e1', desc: 'Gestão e Suporte' },
  { name: 'Fóruns', size: 600, fill: '#e11d48', desc: 'Auditório e Negociação' },
];

const FLOOR_PLAN = [
    {
        level: "Rooftop",
        elevation: "Nível +6",
        area: "800m²",
        type: "Premium",
        icon: Sun,
        color: "bg-purple-600",
        description: "Espaço de contemplação e networking de alto nível.",
        zones: [
            { name: "Observatório Macro", area: "200m²", detail: "Painéis de commodities em tempo real e vista panorâmica." },
            { name: "Farm-to-Table Garden", area: "400m²", detail: "Horta didática e técnicas de plantio urbano." },
            { name: "Lounge Executivo", area: "200m²", detail: "Área VIP para reuniões com investidores e parceiros." }
        ]
    },
    {
        level: "Andar 5",
        elevation: "Residência II",
        area: "1.500m²",
        type: "Housing",
        icon: Bed,
        color: "bg-amber-500",
        description: "Alojamento estudantil superior com áreas de lazer.",
        zones: [
            { name: "Suítes Duplas (20)", area: "N/A", detail: "Acomodação premium para residentes." },
            { name: "Suítes Simples (16)", area: "N/A", detail: "Foco em privacidade e estudo individual." },
            { name: "Espaço Leisure", area: "300m²", detail: "Fitness, jogos e descompressão." }
        ]
    },
    {
        level: "Andar 4",
        elevation: "Residência I",
        area: "1.500m²",
        type: "Housing",
        icon: Bed,
        color: "bg-amber-500",
        description: "Coração da vida residencial e comunitária.",
        zones: [
            { name: "Suítes Duplas (40)", area: "N/A", detail: "Alta densidade residencial." },
            { name: "Suítes Simples (16)", area: "N/A", detail: "Staff e pesquisadores residentes." },
            { name: "Community Kitchen", area: "200m²", detail: "Cozinha compartilhada e dining." },
            { name: "Lounge Biblioteca", area: "300m²", detail: "Estudo noturno e convivência." }
        ]
    },
    {
        level: "Andar 3",
        elevation: "Think Tank",
        area: "1.200m²",
        type: "Strategic",
        icon: Zap,
        color: "bg-rose-600",
        description: "O cérebro da operação: eventos e inteligência.",
        zones: [
            { name: "Aula Magna (Auditório)", area: "350m²", detail: "150 pax. Palestras e seminários setoriais." },
            { name: "Núcleo de Produtos", area: "400m²", detail: "Design curricular e validação com o setor." },
            { name: "Fóruns Temáticos (4)", area: "400m²", detail: "Salas dedicadas: Etanol, Bioenergia, Café, Coop." }
        ]
    },
    {
        level: "Andar 2",
        elevation: "Skills Lab",
        area: "1.800m²",
        type: "Education",
        icon: Monitor,
        color: "bg-blue-600",
        description: "Simulação de ambientes profissionais reais.",
        zones: [
            { name: "Salas Skills-Based", area: "800m²", detail: "Trading Floor, Call Center Agrícola, Simulação Hoteleira." },
            { name: "Lab Regulatório", area: "300m²", detail: "Análise legislativa, compliance e advocacy." },
            { name: "Language Center", area: "300m²", detail: "Inglês, Mandarim e Espanhol para negócios." },
            { name: "Data Science Hub", area: "200m²", detail: "Informática avançada e modelagem." }
        ]
    },
    {
        level: "Andar 1",
        elevation: "Academy",
        area: "1.800m²",
        type: "Education",
        icon: BookOpen,
        color: "bg-blue-600",
        description: "Ensino teórico integrado à prática sensorial.",
        zones: [
            { name: "Salas Teóricas (8)", area: "520m²", detail: "Classes flexíveis para 25-50 alunos." },
            { name: "Tasting Room & Wine Lab", area: "200m²", detail: "Análise sensorial de cafés, vinhos e grãos." },
            { name: "Cozinha Demonstração", area: "150m²", detail: "Aulas show, food styling e processos." },
            { name: "Salas de Reunião", area: "400m²", detail: "Espaços para negociação e mediação." },
            { name: "Learning Hub", area: "250m²", detail: "Biblioteca moderna e quiet zones." }
        ]
    },
    {
        level: "Térreo",
        elevation: "Operação Viva",
        area: "1.800m²",
        type: "Operation",
        icon: Key,
        color: "bg-emerald-600",
        description: "A interface com o público e o mercado.",
        zones: [
            { name: "Restaurante Escola", area: "350m²", detail: "Operado por alunos. Aberto ao público." },
            { name: "Cozinha Central", area: "200m²", detail: "Produção industrial e laboratório culinário." },
            { name: "Núcleo Advocacy", area: "450m²", detail: "Escritórios open-space para projetos." },
            { name: "Lounge & Lobby", area: "400m²", detail: "Acolhimento e convivência informal." },
            { name: "Front Desk", area: "50m²", detail: "Recepção operada por alunos (prática)." }
        ]
    },
    {
        level: "Subsolo",
        elevation: "Back of House",
        area: "1.200m²",
        type: "Infra",
        icon: Warehouse,
        color: "bg-slate-600",
        description: "O suporte invisível que mantém a operação.",
        zones: [
            { name: "Lab de Grãos & Solos", area: "Integrado", detail: "Análise técnica pesada." },
            { name: "Storage & Logística", area: "Integrado", detail: "Recebimento de insumos e alimentos." },
            { name: "Parking", area: "50 vagas", detail: "Estacionamento operacional e docente." },
            { name: "Mecânica & Tech", area: "Integrado", detail: "Suporte de manutenção predial e agrícola." }
        ]
    }
];

const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, size } = props;
    if (width < 50 || height < 50) return null;
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} style={{ fill: props.fill, stroke: '#fff', strokeWidth: 2, rx: 6 }} />
            <text x={x + 10} y={y + 20} fill="#fff" fontSize={12} fontWeight="bold">{name}</text>
            <text x={x + 10} y={y + 35} fill="#fff" fontSize={10} opacity={0.8}>{size}m²</text>
        </g>
    );
};

const GoianiaCampusDesign: React.FC = () => {
    const [activeFloorIndex, setActiveFloorIndex] = useState(6); // Começa no Térreo (Index 6 no array invertido)
    const activeFloor = FLOOR_PLAN[activeFloorIndex];

    return (
        <div className="animate-fade-in space-y-12">
            
            {/* 0. MANIFESTO CONCEITUAL (NOVO) */}
            <section>
                <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-emerald-900/50">
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <Quote size={240} />
                    </div>
                    
                    <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            Vocação Declarada
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif italic font-medium leading-relaxed text-slate-100">
                            "Goiânia será a Sede Nacional onde a Ânima materializa sua promessa de educar transformando agronegócio. Aqui, tradição e futuro se encontram. Aqui, conhecimento vira impacto."
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-blue-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/50">
                                <Utensils size={20} className="text-white"/>
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-wide mb-2 text-blue-200">Operação Real</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Alunos aprendem operando. O restaurante premium não é apenas aula, é um negócio funcional com P&L real.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-emerald-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/50">
                                <Sprout size={20} className="text-white"/>
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-wide mb-2 text-emerald-200">Pesquisa Viva</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Hipóteses testadas em 100ha demonstrativos. O aluno acompanha o ciclo; o resultado vira conteúdo.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-amber-500 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-900/50">
                                <Users size={20} className="text-white"/>
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-wide mb-2 text-amber-200">Comunidade Ativa</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Produtores visitam, consomem e dialogam. O campus é o ponto de encontro do setor, não uma torre de marfim.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="p-3 bg-purple-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/50">
                                <RefreshCw size={20} className="text-white"/>
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-wide mb-2 text-purple-200">Fluxo Bidirecional</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                A Universidade aprende com a prática do setor tanto quanto o setor aprende com a teoria da Universidade.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 1. VISÃO GERAL DE ZONEAMENTO (TREEMAP) */}
            <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                            <Layout size={20} className="text-blue-600"/> Zoneamento Funcional (10.000m²)
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            Alocação estratégica baseada no framework de Hospitalidade adaptado para Agro.
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Densidade</span>
                        <p className="text-xl font-black text-slate-800">3.5m²<span className="text-xs text-slate-500 font-medium">/aluno</span></p>
                    </div>
                </div>
                
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                            data={ZONING_DISTRIBUTION}
                            dataKey="size"
                            aspectRatio={4 / 1}
                            stroke="#fff"
                            content={<CustomizedContent />}
                        >
                            <Tooltip content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs z-50">
                                            <p className="font-bold text-sm mb-1">{d.name}</p>
                                            <p className="text-emerald-400 font-mono font-bold">{d.size}m²</p>
                                            <p className="text-slate-400 mt-1">{d.desc}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }} />
                        </Treemap>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* 2. ARQUITETURA VERTICAL (STACK INTERATIVO) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                
                {/* COLUNA ESQUERDA: NAVIGATOR (ELEVADOR) */}
                <div className="lg:col-span-4 flex flex-col h-full bg-slate-50 rounded-[2.5rem] border border-slate-200 p-6 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-col justify-between p-4">
                        <div className="w-full h-px bg-slate-300"></div>
                        <div className="w-full h-px bg-slate-300"></div>
                        <div className="w-full h-px bg-slate-300"></div>
                    </div>
                    
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center flex items-center justify-center gap-2">
                        <ArrowUp size={14}/> Corte Transversal
                    </h3>
                    
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        {FLOOR_PLAN.map((floor, idx) => {
                            const isActive = idx === activeFloorIndex;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFloorIndex(idx)}
                                    className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 group flex items-center justify-between ${
                                        isActive 
                                        ? `bg-white border-blue-600 shadow-xl scale-105 z-10` 
                                        : 'bg-white/50 border-slate-200 hover:bg-white hover:border-blue-300 text-slate-400'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isActive ? floor.color + ' text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <floor.icon size={16} />
                                        </div>
                                        <div className="text-left">
                                            <span className={`text-[10px] font-black uppercase tracking-wider block ${isActive ? 'text-blue-900' : 'text-slate-500'}`}>
                                                {floor.level}
                                            </span>
                                            <span className={`text-xs font-bold ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                                                {floor.elevation}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {isActive && (
                                        <div className="absolute right-4 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* COLUNA DIREITA: DETALHE DO ANDAR (BLUEPRINT) */}
                <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
                    {/* Background Texture */}
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <activeFloor.icon size={300} />
                    </div>

                    <div className="relative z-10 flex-1">
                        {/* Header do Andar */}
                        <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${activeFloor.color} text-white shadow-lg`}>
                                        {activeFloor.level}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {activeFloor.type} Zone
                                    </span>
                                </div>
                                <h2 className="text-4xl font-black tracking-tight">{activeFloor.elevation}</h2>
                                <p className="text-slate-400 mt-2 max-w-md">{activeFloor.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Área Total</span>
                                <span className="text-3xl font-black text-emerald-400">{activeFloor.area}</span>
                            </div>
                        </div>

                        {/* Grid de Zonas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeFloor.zones.map((zone, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{zone.name}</h4>
                                        <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-slate-300">
                                            {zone.area}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        {zone.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer de Inspiração */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <Search size={14} className="text-blue-500" />
                        <span>
                            <strong className="text-slate-300">Lógica de Design:</strong> Adaptação direta do balizador de 
                            <span className="text-white mx-1 underline decoration-blue-500 decoration-2">Hospitalidade Premium</span> 
                            para garantir experiência imersiva.
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default GoianiaCampusDesign;
