
import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, MapPin, DollarSign, Target, 
  Users, Search, Megaphone, Building2, Briefcase, 
  Rocket, ArrowRight, LayoutTemplate, GraduationCap,
  Calculator, RefreshCw, BookOpen, Sprout, Factory, Scale, HeartPulse, Cpu, Truck,
  BarChart3, PieChart, TrendingUp, Activity, Sliders, Zap, Layers, Calendar, Microscope, Flag,
  AlertTriangle, Lightbulb, Handshake, Wrench, Globe, Leaf, Beaker, UserCheck, FileText, CheckSquare, Clock, Shield,
  Compass, LayoutGrid
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, LineChart, Line, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import FinancialViabilityStudio from './FinancialViabilityStudio';
import UnaValueCalculator from './UnaValueCalculator';
import ProfessorTurnaroundView from './ProfessorTurnaroundView';
import ImplementationRoadmapView from './ImplementationRoadmapView';

// --- DADOS DA MATRIZ DE VOCAÇÃO ---
const MATRIX_ROWS = [
    { 
        area: "Ciências Jurídicas (Direito)", 
        icon: Scale, 
        color: "text-purple-600",
        products: [
            { chain: "Antes", label: "Propriedade Intelectual", desc: "Patentes de sementes e biotecnologia." },
            { chain: "Dentro", label: "Regularização Fundiária", desc: "Clínica de CAR e contratos agrários." },
            { chain: "Depois", label: "Contratos Internacionais", desc: "Direito aduaneiro e exportação." }
        ]
    },
    { 
        area: "Engenharias & Tech", 
        icon: Cpu, 
        color: "text-blue-600",
        products: [
            { chain: "Antes", label: "Manutenção Preditiva", desc: "Sensores para maquinário pesado." },
            { chain: "Dentro", label: "Conectividade Rural", desc: "Projetos de IoT e infra de rede." },
            { chain: "Depois", label: "Automação Industrial", desc: "Otimização de plantas de processamento." }
        ]
    },
    { 
        area: "Saúde & Biológicas", 
        icon: HeartPulse, 
        color: "text-rose-600",
        products: [
            { chain: "Antes", label: "Genética & Melhoramento", desc: "Laboratório de sementes e mudas." },
            { chain: "Dentro", label: "Saúde do Trabalhador", desc: "Ergonomia e segurança no campo." },
            { chain: "Depois", label: "Segurança Alimentar", desc: "Controle de qualidade e certificação." }
        ]
    },
    { 
        area: "Gestão & Negócios", 
        icon: Briefcase, 
        color: "text-amber-600",
        products: [
            { chain: "Antes", label: "Análise de Crédito", desc: "Modelagem de risco para Barter." },
            { chain: "Dentro", label: "Sucessão Familiar", desc: "Governança e holding rural." },
            { chain: "Depois", label: "Trading & Hedge", desc: "Comercialização de commodities." }
        ]
    }
];

const KIT_ITEMS = [
    {
        title: "1. Branding & Posicionamento",
        icon: Megaphone,
        desc: "Enxoval visual da unidade (Fachada, Sala Agro). Evento de lançamento com autoridades."
    },
    {
        title: "2. Observatório (Inteligência)",
        icon: Search,
        desc: "Compra de dados (Conab, Clima), licenciamento de software e setup do Think Tank."
    },
    {
        title: "3. Headhunting Acadêmico",
        icon: GraduationCap,
        desc: "Contratação de 'Estrelas' do mercado (Agrônomo Chefe) para coordenar o núcleo."
    },
    {
        title: "4. Conselho Local",
        icon: Users,
        desc: "Governança com líderes locais. Jantares de relacionamento e curadoria."
    },
    {
        title: "5. Infraestrutura Estendida",
        icon: Building2,
        desc: "Adaptação de labs e convênios com fazendas-escola (transporte e seguro)."
    },
    {
        title: "6. Força de Vendas B2B",
        icon: Briefcase,
        desc: "Time comercial especializado (Consultores) com verba de representação."
    }
];

const PILOT_UNITS = [
    { name: "Una Jataí (GO)", reason: "Hub de Grãos consolidado. Forte presença de cooperativas." },
    { name: "Una Catalão (GO)", reason: "Polo mineral e maquinário (John Deere/Mitsubishi)." },
    { name: "Una Uberlândia (MG)", reason: "Polo logístico e sede de grandes tradings." },
    { name: "Una Pouso Alegre (MG)", reason: "Forte vocação industrial e logística no Sul de Minas." },
    { name: "Una Bom Despacho (MG)", reason: "Região com alta demanda por sucessão em pecuária e leite." }
];

// --- HELPER COMPONENTS ---

const MetricCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
            <p className="text-xs font-bold text-emerald-600">{sub}</p>
        </div>
    </div>
);

const MatrixCell = ({ item, color }: any) => (
    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group h-full flex flex-col cursor-default">
        <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${color}`}>{item.label}</p>
        <p className="text-xs text-slate-500 leading-tight group-hover:text-slate-700">{item.desc}</p>
    </div>
);

const CanvasCard = ({ title, icon: Icon, items, color, colSpan = "md:col-span-1" }: any) => (
    <div className={`bg-white p-5 rounded-2xl border ${color.border} shadow-sm hover:shadow-md transition-all ${colSpan}`}>
        <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
            <div className={`p-2 rounded-lg ${color.bg} ${color.text}`}>
                <Icon size={18} />
            </div>
            <h4 className={`text-sm font-black uppercase tracking-tight ${color.title}`}>{title}</h4>
        </div>
        <ul className="space-y-2">
            {items.map((item: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-600 font-medium flex items-start gap-2 leading-snug">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${color.dot}`}></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const VocationalImpactSimulator = () => {
    // --- ESTADOS (VARIÁVEIS DE ENTRADA) ---
    const [dualIntensity, setDualIntensity] = useState(30);       
    const [extensionVolume, setExtensionVolume] = useState(20);   
    const [scientificInit, setScientificInit] = useState(10);     
    const [animaLabProjects, setAnimaLabProjects] = useState(5);  
    const [facultyFit, setFacultyFit] = useState(40);             

    // Grupo 2
    const [partnersVolume, setPartnersVolume] = useState(15);     
    const [revenuePartners, setRevenuePartners] = useState(2);    
    
    // Grupo 3
    const [internshipRate, setInternshipRate] = useState(25);     
    const [alumniMentors, setAlumniMentors] = useState(10);       
    const [alumniSuccess, setAlumniSuccess] = useState(40);       

    const data = useMemo(() => {
        const brandAuthority = (scientificInit * 0.3) + (animaLabProjects * 0.4) + (extensionVolume * 0.2) + (facultyFit * 0.1);
        const employability = (internshipRate * 0.4) + (alumniSuccess * 0.4) + (facultyFit * 0.2);
        const retention = (dualIntensity * 0.5) + (alumniMentors * 1.5) + (extensionVolume * 0.2);
        const revenuePotential = Math.min(100, (revenuePartners * 8) + (animaLabProjects * 4)); 
        const territorialIntegration = Math.min(100, (partnersVolume * 2) + (dualIntensity * 0.4));

        return [
            { subject: 'Empregabilidade', A: Math.min(100, Math.round(employability)), fullMark: 100 },
            { subject: 'Autoridade (Marca)', A: Math.min(100, Math.round(brandAuthority)), fullMark: 100 },
            { subject: 'Retenção', A: Math.min(100, Math.round(retention)), fullMark: 100 },
            { subject: 'Receita B2B', A: Math.min(100, Math.round(revenuePotential)), fullMark: 100 },
            { subject: 'Integração', A: Math.min(100, Math.round(territorialIntegration)), fullMark: 100 },
        ];
    }, [
        dualIntensity, extensionVolume, scientificInit, animaLabProjects, facultyFit,
        partnersVolume, revenuePartners,
        internshipRate, alumniMentors, alumniSuccess
    ]);

    const intensityScore = Math.round(
        (data.reduce((acc, curr) => acc + curr.A, 0) / 5)
    );

    const SliderControl = ({ label, value, onChange, colorClass, icon: Icon, max = 100, unit = '%' }: any) => (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
                    <Icon size={12} className={colorClass.replace('accent-', 'text-').replace('500', '600')}/> {label}
                </label>
                <span className={`text-[10px] font-black ${colorClass.replace('accent-', 'text-').replace('500', '600')}`}>{value}{unit}</span>
            </div>
            <input 
                type="range" min="0" max={max} value={value} 
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${colorClass}`}
            />
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row overflow-hidden">
                <div className="lg:w-1/2 p-8 border-r border-slate-100 bg-slate-50/50 flex flex-col justify-center space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2 mb-1">
                            <Sliders size={20} className="text-blue-600"/> Arquitetura da Vocação
                        </h3>
                        <p className="text-xs text-slate-500">Ajuste as alavancas operacionais para projetar o impacto.</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[9px] font-black uppercase text-purple-400 tracking-widest border-b border-purple-100 pb-1">1. Acadêmico & P&D (O Motor)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <SliderControl label="Intensidade Dual" value={dualIntensity} onChange={setDualIntensity} colorClass="accent-purple-500" icon={Layers} />
                            <SliderControl label="Fit Docente" value={facultyFit} onChange={setFacultyFit} colorClass="accent-purple-500" icon={UserCheck} />
                            <SliderControl label="Vol. Iniciação Cient." value={scientificInit} onChange={setScientificInit} colorClass="accent-purple-400" icon={Microscope} />
                            <SliderControl label="Projetos Lab" value={animaLabProjects} onChange={setAnimaLabProjects} colorClass="accent-purple-600" icon={Beaker} max={20} unit=" un" />
                            <SliderControl label="Extensão" value={extensionVolume} onChange={setExtensionVolume} colorClass="accent-purple-400" icon={BookOpen} max={50} unit=" un" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest border-b border-blue-100 pb-1">2. Conexão com a Cadeia (O Combustível)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <SliderControl label="Total Parcerias" value={partnersVolume} onChange={setPartnersVolume} colorClass="accent-blue-500" icon={Handshake} max={50} unit=" un" />
                            <SliderControl label="Parcerias (Receita)" value={revenuePartners} onChange={setRevenuePartners} colorClass="accent-blue-600" icon={DollarSign} max={20} unit=" un" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[9px] font-black uppercase text-emerald-400 tracking-widest border-b border-emerald-100 pb-1">3. Carreira & Alumni (O Resultado)</p>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Corrected: setTargetValue changed to setInternshipRate to match state variable */}
                            <SliderControl label="Estágios" value={internshipRate} onChange={setInternshipRate} colorClass="accent-emerald-500" icon={Briefcase} />
                            <SliderControl label="Sucesso Alumni" value={alumniSuccess} onChange={setAlumniSuccess} colorClass="accent-emerald-600" icon={Rocket} />
                            <SliderControl label="Mentores Alumni" value={alumniMentors} onChange={setAlumniMentors} colorClass="accent-emerald-400" icon={Users} max={50} unit=" un" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4 relative flex flex-col items-center justify-center bg-white">
                    <div className="absolute top-6 left-6 z-10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full shadow-sm border border-slate-100">
                            <Activity size={12} /> Radar de Impacto
                        </span>
                    </div>
                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Performance" dataKey="A" stroke="#4f46e5" strokeWidth={3} fill="#6366f1" fillOpacity={0.5} />
                                <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="absolute bottom-6 right-6 text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Índice</p>
                        <p className="text-4xl font-black text-slate-800">{intensityScore}<span className="text-xl text-slate-400">/100</span></p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-300 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                        <Flag size={80} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-600 text-xs">01</div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Ano 1: Fundação</h4>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/><span>Formalizar <strong>{Math.ceil(partnersVolume/3)}</strong> parcerias.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/><span>Lançar <strong>{Math.ceil(extensionVolume/2)}</strong> projetos extensão.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/><span>Engajar <strong>{Math.ceil(alumniMentors/2)}</strong> mentores.</span></li>
                    </ul>
                </div>
                <div className="bg-white border border-blue-200 rounded-3xl p-6 relative overflow-hidden shadow-sm group hover:shadow-md transition-all">
                     <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform text-blue-600">
                        <TrendingUp size={80} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 text-xs">02</div>
                        <h4 className="font-bold text-blue-900 uppercase tracking-tight text-sm">Ano 2: Dualidade</h4>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5"/><span>Atingir <strong>{dualIntensity}%</strong> dual.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5"/><span>Entregar <strong>{Math.ceil(animaLabProjects/2)}</strong> projetos Lab.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5"/><span>Converter <strong>{revenuePartners}</strong> parceiros receita.</span></li>
                    </ul>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden text-white group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                        <Target size={80} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-black text-slate-900 text-xs">03</div>
                        <h4 className="font-bold text-white uppercase tracking-tight text-sm">Ano 3: Consolidação</h4>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-xs text-slate-300"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/><span>Atingir <strong>{internshipRate}%</strong> estágio.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-300"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/><span>Consolidar <strong>{alumniSuccess}%</strong> sucesso.</span></li>
                        <li className="flex items-start gap-2 text-xs text-slate-300"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/><span>Reconhecimento Hub.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ProjectCanvasTab = () => {
    const CANVAS_DATA = {
        justificativa: [
            "UNA tem baixa presença no agro (awareness ≈ 0/10).",
            "Lacunas na cadeia produtiva identificadas em pesquisa.",
            "Projeto busca posicionar a marca UNA no agro e desenvolver pessoas para o agronegócio.",
            "Estratégico para posicionar o ecossistema no setor mais dinâmico da economia."
        ],
        produto: [
            "Portfólio modular: graduação, pós, técnicos e cursos livres (Agro Executive, Pro).",
            "Branding territorial para unidades vocacionadas.",
            "Conselhos consultivos regionais.",
            "Observatório Municipal do Agro.",
            "Soluções B2B customizadas."
        ],
        stakeholders: [
            "Interno: Celso, Maristela, Rogério, Caroline (PMO), Karen, Pedro, Nara, Sâmia, Sol, Juliana, Renata.",
            "Externo: DATAGRO, Conselhos Locais."
        ],
        premissas: [
            "Implementação inicial na UNA como piloto.",
            "Orçamento definido após o forecast.",
            "Oferta de técnicos a partir de 2026.",
            "Focais dedicados por unidade.",
            "Adesão das unidades vocacionadas como prioridade."
        ],
        riscos: [
            "Execução: Dependência de validações, timing regulatório, complexidade política.",
            "Não Execução: Perda de oportunidade, baixo awareness, sem receita incremental."
        ],
        objSmart: [
            "Vocacionar 5 unidades (Catalão, Uberlândia, Jataí, Bom Despacho, Pouso Alegre) até dez/2026.",
            "Integrar 50% das graduações a projetos radiais até dez/2026.",
            "Criar 10 novos produtos até nov/2026.",
            "Fechar 3 parcerias estratégicas até dez/2026."
        ],
        requisitos: [
            "Pesquisa de mercado validada.",
            "Matrizes curriculares definidas.",
            "Aprovação regulatória.",
            "Plano de branding territorial.",
            "Engajamento de parceiros.",
            "Infraestrutura mínima."
        ],
        equipe: [
            "Coordenação PMO: Caroline",
            "Governança: Karen",
            "Conteúdo: Nara, Sâmia, Sol, Juliana, Renata",
            "Marketing: Rafa",
            "Focal: Sabrina, Nara, Celso, Maristela, Igor, Priscila"
        ],
        entregas: [
            "Estratégia e Governança (PM Canvas, KPIs).",
            "Portfólio e Produtos.",
            "Marketing e Branding.",
            "Infraestrutura e Operação.",
            "Capital Humano."
        ],
        timeline: [
            "Jan-Fev: Setup",
            "Fev-Mar: Conselhos e Branding",
            "Mar-Abr: Pilotos",
            "Mai-Jun: Medição e Escala"
        ],
        beneficios: [
            "Receita incremental.",
            "Fortalecimento da marca UNA no Agro.",
            "Parcerias estratégicas.",
            "Empregabilidade e conexão com mercado.",
            "Impacto socioeconômico regional."
        ],
        restricoes: [
            "Aprovação regulatória.",
            "Orçamento ao forecast.",
            "Infraestrutura existente.",
            "Disponibilidade de docentes."
        ],
        custos: [
            "A definir após forecast de impacto."
        ]
    };

    return (
        <div className="animate-fade-in space-y-8 pb-10">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] border border-slate-700 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Rocket size={200} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
                            Project Model Canvas
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-none mb-2">Projeto AGRO</h2>
                        <p className="text-slate-400 text-sm font-medium">Responsável: Performance e Expansão de Negócios • 14/01/2026</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-lg font-bold text-white">Em Planejamento</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-min">
                <div className="md:col-span-1 space-y-4">
                    <CanvasCard title="Justificativas (Passado)" icon={Compass} items={CANVAS_DATA.justificativa} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                    <CanvasCard title="Obj. SMART" icon={Target} items={CANVAS_DATA.objSmart} color={{ bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-white', iconColor: 'text-blue-600', title: 'text-blue-800', dot: 'bg-blue-400' }} />
                    <CanvasCard title="Benefícios (Futuro)" icon={TrendingUp} items={CANVAS_DATA.beneficios} color={{ bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-white', iconColor: 'text-emerald-600', title: 'text-emerald-800', dot: 'bg-emerald-400' }} />
                </div>
                <div className="md:col-span-1 space-y-4">
                    <CanvasCard title="Produto" icon={Layers} items={CANVAS_DATA.produto} color={{ bg: 'bg-indigo-50', border: 'border-indigo-100', iconBg: 'bg-white', iconColor: 'text-indigo-600', title: 'text-indigo-800', dot: 'bg-indigo-400' }} />
                    <CanvasCard title="Requisitos" icon={FileText} items={CANVAS_DATA.requisitos} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                </div>
                <div className="md:col-span-1 space-y-4">
                     <CanvasCard title="Stakeholders" icon={Users} items={CANVAS_DATA.stakeholders} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                    <CanvasCard title="Equipe" icon={UserCheck} items={CANVAS_DATA.equipe} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                    <CanvasCard title="Grupos de Entregas" icon={Layers} items={CANVAS_DATA.entregas} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                </div>
                <div className="md:col-span-1 space-y-4">
                    <CanvasCard title="Premissas" icon={CheckSquare} items={CANVAS_DATA.premissas} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                    <CanvasCard title="Restrições" icon={AlertTriangle} items={CANVAS_DATA.restricoes} color={{ bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-white', iconColor: 'text-amber-600', title: 'text-amber-800', dot: 'bg-amber-400' }} />
                </div>
                <div className="md:col-span-1 space-y-4">
                     <CanvasCard title="Riscos" icon={Shield} items={CANVAS_DATA.riscos} color={{ bg: 'bg-rose-50', border: 'border-rose-200', iconBg: 'bg-white', iconColor: 'text-rose-600', title: 'text-rose-800', dot: 'bg-rose-400' }} />
                    <CanvasCard title="Linha do Tempo" icon={Clock} items={CANVAS_DATA.timeline} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                    <CanvasCard title="Custos" icon={DollarSign} items={CANVAS_DATA.custos} color={{ bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-white', iconColor: 'text-slate-600', title: 'text-slate-700', dot: 'bg-slate-400' }} />
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
                Documentação Padrão: Projeto AGRO | Responsável: Performance e Expansão de Negócios | 14/01/2026
            </div>
        </div>
    );
};

const MetricsTab = () => (
    <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="Maturidade Territorial" value="72/100" sub="Alta Aderência" icon={Target} color={{ bg: 'bg-purple-50', text: 'text-purple-600' }} />
            <MetricCard title="Share Of Wallet (Agro)" value="12%" sub="+4.5% vs LY" icon={PieChart} color={{ bg: 'bg-blue-50', text: 'text-blue-600' }} />
            <MetricCard title="Receita B2B" value="R$ 1.2M" sub="Contratos Diretos" icon={Briefcase} color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
             <div className="min-h-[500px]">
                 <VocationalImpactSimulator />
             </div>
        </div>
    </div>
);

const ConceptTab = () => (
    <div className="space-y-12 animate-fade-in">
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sprout size={300} />
            </div>
            <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    Arquitetura Pedagógica
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-4">O Fim do Currículo Generalista</h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                    Uma "Una Vocacionada" não cria novos cursos do zero. Ela **recontextualiza** os cursos existentes (Direito, Psicologia, Engenharia) para resolverem dores específicas da cadeia produtiva local.
                </p>
            </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <LayoutTemplate size={24} className="text-indigo-600"/> Matriz de Evidências Vocacionadas
                </h3>
                <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Antes da Porteira</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Dentro da Porteira</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Depois da Porteira</span>
                </div>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-12 gap-4 mb-2 px-2">
                    <div className="col-span-3"></div>
                    <div className="col-span-3 text-center text-xs font-black text-orange-600 uppercase tracking-widest flex items-center justify-center gap-2 bg-orange-50 py-2 rounded-lg border border-orange-100">
                        <Briefcase size={12}/> Insumos & Serviços
                    </div>
                    <div className="col-span-3 text-center text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center justify-center gap-2 bg-emerald-50 py-2 rounded-lg border border-emerald-100">
                        <Sprout size={12}/> Produção
                    </div>
                    <div className="col-span-3 text-center text-xs font-black text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 bg-blue-50 py-2 rounded-lg border border-blue-100">
                        <Factory size={12}/> Indústria & Trade
                    </div>
                </div>
                {MATRIX_ROWS.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-4 items-stretch group">
                        <div className="col-span-3 flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 group-hover:border-slate-300 transition-colors shadow-sm">
                            <div className={`p-2 rounded-lg bg-slate-50 ${row.color}`}>
                                <row.icon size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 leading-tight">{row.area}</span>
                        </div>
                        <div className="col-span-3"><MatrixCell item={row.products[0]} color={row.color} /></div>
                        <div className="col-span-3"><MatrixCell item={row.products[1]} color={row.color} /></div>
                        <div className="col-span-3"><MatrixCell item={row.products[2]} color={row.color} /></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
                    <RefreshCw size={20} className="text-blue-600"/> O Motor de Aprendizagem
                </h3>
                <div className="space-y-6 relative">
                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-100"></div>
                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-slate-500 font-bold text-xs">1</div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Input (Território)</p>
                            <p className="text-sm font-bold text-slate-700">O Agente (ex: Sindicato Rural) traz uma dor real.</p>
                            <p className="text-xs text-slate-500 mt-1 italic">"Ninguém sabe calcular o custo do hectare."</p>
                        </div>
                    </div>
                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-indigo-600 font-bold text-xs">2</div>
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 w-full">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Processo (Academia)</p>
                            <p className="text-sm font-bold text-indigo-900">Professor transforma em Desafio de Extensão.</p>
                            <p className="text-xs text-indigo-700 mt-1 italic">Disciplina: Contabilidade de Custos.</p>
                        </div>
                    </div>
                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 text-emerald-600 font-bold text-xs">3</div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 w-full">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Output (Produto)</p>
                            <p className="text-sm font-bold text-emerald-900">Aluno entrega solução aplicável.</p>
                            <p className="text-xs text-emerald-700 mt-1 italic">Entrega: Dashboard de Custos para o produtor.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                        <GraduationCap size={100} />
                    </div>
                    <h4 className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-2">O Novo Professor</h4>
                    <h3 className="text-xl font-bold mb-4">De Palestrante para Curador</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Ele não "passa matéria". Ele faz a curadoria dos problemas do território e orienta os alunos na busca técnica della solução. Ele conecta a teoria à lama da bota.
                    </p>
                </div>
                <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                        <Rocket size={100} className="text-indigo-600" />
                    </div>
                    <h4 className="text-indigo-600 font-black uppercase tracking-widest text-xs mb-2">O Novo Aluno</h4>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">De Ouvinte para Consultor Jr.</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        Ele não estuda para "passar na prova". Ele estuda para entregar valor. Seu portfólio acadêmico é um currículo de projetos reais implementados na região.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const PlaybookTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {KIT_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                        <item.icon size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.title}</h4>
                    </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">{item.desc}</p>
            </div>
        ))}
    </div>
);

const TargetTab = () => (
    <div className="space-y-12 animate-fade-in">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <MapPin className="text-emerald-600"/> Geografia do Piloto
                </h3>
                <div className="space-y-4">
                    {PILOT_UNITS.map((unit, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{unit.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{unit.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Rocket size={200} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Meta do Piloto</h4>
                 <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                     Validar o modelo "Una Vocacionada" em 5 praças de alta densidade antes do rollout nacional.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/10 p-4 rounded-xl">
                         <p className="text-2xl font-black text-emerald-400">R$ 40MM</p>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Receita Incremental (5 Anos)</p>
                     </div>
                     <div className="bg-white/10 p-4 rounded-xl">
                         <p className="text-2xl font-black text-blue-400">25%</p>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Aumento Ticket Médio</p>
                     </div>
                 </div>
            </div>
        </div>

        {/* SEÇÃO INTEGRADA: O NOVO DOCENTE */}
        <div className="pt-12 border-t border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">O Fator Humano do Piloto</h2>
                <p className="text-sm text-slate-500 mt-2">O Turnaround da Carreira Docente como motor da transformação nas praças.</p>
            </div>
            <ProfessorTurnaroundView isEmbedded={true} />
        </div>
    </div>
);

const UnaAgroTacticalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'concept' | 'metrics' | 'kit' | 'targets' | 'calculator' | 'budget'>('canvas');

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
        <div className="bg-white border-b border-slate-200 pt-12 pb-16 px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Target size={12} /> Execução Tática
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Projeto <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Una Vocacionada</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Transformando unidades generalistas em centros de referência em agronegócio por meio de hiper-localização e conexão com a cadeia produtiva.
            </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
            <div className="flex justify-center mb-8">
                <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex overflow-x-auto max-w-full">
                    <button onClick={() => setActiveTab('canvas')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'canvas' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <LayoutTemplate size={14}/> Canvas do Projeto
                    </button>
                    <div className="w-px h-6 bg-slate-200 my-auto mx-1"></div>
                    <button onClick={() => setActiveTab('concept')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'concept' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Conceito Vocacionado
                    </button>
                    <button onClick={() => setActiveTab('metrics')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'metrics' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Metrificação & Valor
                    </button>
                    <button onClick={() => setActiveTab('kit')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'kit' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Kit de Transformação
                    </button>
                    <button onClick={() => setActiveTab('targets')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'targets' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Praças Piloto
                    </button>
                    <button onClick={() => setActiveTab('calculator')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Calculadora de Valor
                    </button>
                    <button onClick={() => setActiveTab('budget')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'budget' ? 'bg-gray-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        Orçamento (DRE)
                    </button>
                </div>
            </div>

            <div>
                {activeTab === 'canvas' && <ProjectCanvasTab />}
                {activeTab === 'concept' && <ConceptTab />}
                {activeTab === 'metrics' && <MetricsTab />}
                {activeTab === 'kit' && <PlaybookTab />}
                {activeTab === 'targets' && <TargetTab />}
                {activeTab === 'calculator' && <UnaValueCalculator />}
                {activeTab === 'budget' && (
                    <div className="animate-fade-in">
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 text-amber-800 text-sm font-medium text-center">
                            Esta DRE reflete o <strong>Delta Econômico</strong> do projeto: Investimentos vs. Receita Incremental.
                        </div>
                        <div className="h-[600px] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                             <FinancialViabilityStudio />
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default UnaAgroTacticalView;
