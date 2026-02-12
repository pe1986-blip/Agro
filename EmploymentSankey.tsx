
import React, { useState, useMemo, useEffect } from 'react';
import { ResponsiveContainer, Sankey, Tooltip, Layer, PieChart, Pie, Cell, BarChart, XAxis, YAxis, Bar, Legend } from 'recharts';
import ChatWidget from './ChatWidget';
import { TrendingUp, Users, ChevronsRight, LogOut, Clock, Download, HelpCircle, Search, BarChart2, GraduationCap, Target, X, User, Cake, Wallet, Briefcase, Zap, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MUNICIPIOS_PERFIL, formatNumber } from './constants';
import { MunicipioPerfil } from './types';
import AlumniCareerSankey from './AlumniCareerSankey';
import ScenarioSimulator from './ScenarioSimulator';
import { calculateSocialGap } from './services/impactAnalysisService';

// --- CONFIG & TYPES ---
const PROGRAMS = ['Agronegócio', 'Tech', 'Business', 'Saúde', 'Educação'];
const STAGE_NAMES = ['Entrada', 'Técnico', 'Graduação', 'Especialização', 'MBA'];
const COLORS = {
    Entrada: '#3B82F6',
    Técnico: '#10B981',
    Graduação: '#F97316',
    Especialização: '#A855F7',
    MBA: '#EF4444',
    Evasão: '#9CA3AF',
};
const PIE_COLORS_GENDER = ['#3b82f6', '#fb7185'];
const PIE_COLORS_AGE = ['#14b8a6', '#f97316', '#a855f7', '#f59e0b'];

const FLOW_TABS = [
    { id: 'student', label: 'Fluxo de Alunos (Captação/Evasão)', icon: <Users size={18} /> },
    { id: 'alumni', label: 'Carreira (Alumni Tracking)', icon: <Briefcase size={18} /> },
    { id: 'simulator', label: 'Simulação de Risco', icon: <Zap size={18} /> },
];


const PROGRAM_PROFILES = {
    'Agronegócio': { 
        rates: [0.41, 0.43, 0.87, 0.83], 
        times: [4, 36, 9, 24] 
    },
    'Tech': { rates: [0.88, 0.75, 0.60, 0.50], times: [6, 48, 12, 24] },
    'Business': { rates: [0.75, 0.70, 0.55, 0.65], times: [3, 48, 12, 24] },
    'Saúde': { rates: [0.90, 0.85, 0.70, 0.60], times: [6, 72, 24, 24] },
    'Educação': { rates: [0.70, 0.65, 0.80, 0.75], times: [4, 48, 12, 18] }
};

interface SankeyNode {
    name: string;
    color: string;
    totalInflow?: number;
    dropoutFrom?: number;
}
interface SankeyData {
    nodes: SankeyNode[];
    links: { source: number; target: number; value: number; }[];
}

interface Metrics {
    totalConversionRate: number;
    totalStudents: number;
    highestDropoutStage: string;
    averageJourneyTime: number;
}

interface ModalData {
    node: SankeyNode;
    program: string;
    municipioName: string;
}

// --- DYNAMIC DATA GENERATION ---
const generateSankeyData = (municipioId: string, program: keyof typeof PROGRAM_PROFILES): { data: SankeyData, metrics: Metrics } => {
    let baseVolume = 0;
    const seed = municipioId === 'all' ? 9999 : parseInt(municipioId, 10);
    
    const rng = (offset: number) => {
        const x = Math.sin(seed + offset) * 10000;
        return x - Math.floor(x);
    };

    if (municipioId === 'all') {
        if (program === 'Agronegócio') {
            baseVolume = 33000;
        } else {
            baseVolume = MUNICIPIOS_PERFIL.reduce((sum, m) => sum + m.ing_total_2023, 0);
        }
    } else {
        const municipio = MUNICIPIOS_PERFIL.find(m => m.municipio_id === Number(municipioId));
        baseVolume = municipio ? municipio.ing_total_2023 * (1 + rng(1) * 0.5) : 2000; 
    }
    
    const profile = PROGRAM_PROFILES[program];
    
    const dynamicRates = profile.rates.map((rate, i) => {
        const variance = (rng(i + 10) * 0.15) - 0.075; 
        return Math.max(0.1, Math.min(0.99, rate + variance));
    });

    const dynamicTimes = profile.times.map((time, i) => {
        const variance = Math.floor(rng(i + 20) * 6) - 3; 
        return Math.max(1, time + variance);
    });

    const nodes: SankeyNode[] = [
        ...STAGE_NAMES.map(name => ({ name, color: COLORS[name as keyof typeof COLORS], totalInflow: 0, dropoutFrom: 0 })),
        { name: 'Evasão', color: COLORS['Evasão'], totalInflow: 0 }
    ];
    const links: SankeyData['links'] = [];
    
    let currentStudents = Math.round(baseVolume);
    nodes[0].totalInflow = currentStudents;

    let highestDropout = { stage: 'N/A', value: 0 };

    for (let i = 0; i < dynamicRates.length; i++) {
        const conversionRate = dynamicRates[i];
        const studentsProceeding = Math.round(currentStudents * conversionRate);
        const studentsDropping = currentStudents - studentsProceeding;
        
        nodes[i].dropoutFrom = studentsDropping;

        if (studentsDropping > highestDropout.value) {
            highestDropout = { stage: STAGE_NAMES[i], value: studentsDropping };
        }

        if (studentsProceeding > 0) {
            links.push({ source: i, target: i + 1, value: studentsProceeding });
            nodes[i+1].totalInflow = (nodes[i+1].totalInflow || 0) + studentsProceeding;
        }

        if (studentsDropping > 0) {
            links.push({ source: i, target: 5, value: studentsDropping });
             nodes[5].totalInflow = (nodes[5].totalInflow || 0) + studentsDropping;
        }
        
        currentStudents = studentsProceeding;
    }

    const finalStudents = currentStudents;
    const totalConversionRate = baseVolume > 0 ? (finalStudents / baseVolume) * 100 : 0;
    const highestDropoutStageNode = nodes.find(n => n.name === highestDropout.stage);
    const highestDropoutRate = highestDropoutStageNode && (highestDropoutStageNode.totalInflow ?? 0) > 0
        ? (highestDropout.value / (highestDropoutStageNode.totalInflow as number)) * 100 
        : 0;

    const metrics = {
        totalConversionRate,
        totalStudents: Math.round(baseVolume),
        highestDropoutStage: `${highestDropout.stage} (${highestDropoutRate.toFixed(1)}%)`,
        averageJourneyTime: dynamicTimes.reduce((a, b) => a + b, 0)
    };

    return { data: { nodes, links }, metrics };
};


// --- UI SUB-COMPONENTS ---

const SocialGapMonitor = ({ municipioId }: { municipioId: string }) => {
    const city = useMemo(() => {
        return municipioId === 'all' 
            ? MUNICIPIOS_PERFIL[0] 
            : MUNICIPIOS_PERFIL.find(m => m.municipio_id === Number(municipioId)) || MUNICIPIOS_PERFIL[0];
    }, [municipioId]);

    const gapData = useMemo(() => calculateSocialGap(city), [city]);

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Target size={16} className="text-blue-600"/> Monitor de Gap Social (18-24 anos)
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Nem-Nem Card */}
                <div className="flex-1 bg-rose-50 border border-rose-100 rounded-xl p-4 w-full relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute -right-4 -top-4 bg-rose-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-white rounded-lg text-rose-500 shadow-sm">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Jovens Sem Oportunidade</p>
                            <p className="text-2xl font-black text-rose-700">{formatNumber(gapData.neetCount)}</p>
                            <p className="text-xs text-rose-600 font-medium">Estimativa de "Nem-Nem"</p>
                        </div>
                    </div>
                </div>

                {/* Connector */}
                <div className="flex flex-col items-center justify-center shrink-0 text-slate-300">
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 mb-2">
                        A EDUCAÇÃO CONECTA
                    </div>
                    <ArrowRight size={24} className="text-slate-300 hidden md:block" />
                    <div className="w-px h-8 bg-slate-300 md:hidden"></div>
                </div>

                {/* Jobs Card */}
                <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-4 w-full relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute -right-4 -top-4 bg-emerald-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-white rounded-lg text-emerald-500 shadow-sm">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Vagas Buscando Talentos</p>
                            <p className="text-2xl font-black text-emerald-700">{formatNumber(gapData.openJobs)}</p>
                            <p className="text-xs text-emerald-600 font-medium">Postos Abertos (Agro/Serv.)</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const DrillDownModal: React.FC<{ data: ModalData; onClose: () => void; }> = ({ data, onClose }) => {
    const { node, program, municipioName } = data;
    const [activeTab, setActiveTab] = useState('demografia');

    const drillDownData = useMemo(() => {
        const seedStr = `${node.name}-${program}-${municipioName}`;
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            const char = seedStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        const seededRandom = (modifier: number) => {
            const x = Math.sin(hash + modifier) * 10000;
            return x - Math.floor(x);
        };

        const totalStudents = node.totalInflow || 1;
        const dropoutCount = node.dropoutFrom || (node.name === 'Evasão' ? totalStudents : 0);

        const genderData = [
            { name: 'Feminino', value: Math.round(totalStudents * (0.45 + seededRandom(1) * 0.1)) },
            { name: 'Masculino', value: Math.round(totalStudents * (0.55 - seededRandom(1) * 0.1)) },
        ];
        const ageData = [
            { name: '18-24', value: Math.round(totalStudents * (0.4 + seededRandom(2) * 0.2)) },
            { name: '25-34', value: Math.round(totalStudents * (0.3 + seededRandom(3) * 0.1)) },
            { name: '35-44', value: Math.round(totalStudents * (0.2 - seededRandom(4) * 0.1)) },
            { name: '45+', value: Math.round(totalStudents * (0.1 - seededRandom(5) * 0.05)) },
        ];
        const subgroupsData = [
            { name: 'Pagantes', value: Math.round(totalStudents * (0.6 + seededRandom(6) * 0.1)) },
            { name: 'Bolsistas', value: Math.round(totalStudents * (0.2 + seededRandom(7) * 0.1)) },
            { name: 'FIES', value: Math.round(totalStudents * (0.15 + seededRandom(8) * 0.05)) },
            { name: 'Outros', value: Math.round(totalStudents * (0.05 + seededRandom(9) * 0.02)) },
        ];
        const dropoutReasonsData = [
            { name: 'Financeiro', value: Math.round(dropoutCount * (0.4 + seededRandom(10) * 0.15)) },
            { name: 'Mudança de Carreira', value: Math.round(dropoutCount * (0.25 + seededRandom(11) * 0.1)) },
            { name: 'Desempenho Acadêmico', value: Math.round(dropoutCount * (0.2 + seededRandom(12) * 0.1)) },
            { name: 'Questões Pessoais', value: Math.round(dropoutCount * (0.15 - seededRandom(13) * 0.05)) },
        ];

        return { genderData, ageData, subgroupsData, dropoutReasonsData, dropoutCount };
    }, [node, program, municipioName]);

    const tabs = [
        { id: 'demografia', label: 'Demografia', icon: <User size={16}/> },
        { id: 'subgrupos', label: 'Subgrupos', icon: <Wallet size={16}/> },
        { id: 'evasao', label: 'Análise de Evasão', icon: <LogOut size={16}/>, disabled: drillDownData.dropoutCount === 0 },
    ];
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-3xl flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                           <div className="w-4 h-4 rounded-full" style={{backgroundColor: node.color}}></div>
                           Análise da Etapa: {node.name}
                        </h2>
                        <p className="text-sm text-gray-500">{program} em {municipioName}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </header>
                 <nav className="flex p-1 bg-gray-200">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} disabled={tab.disabled} className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold p-2 rounded-md transition-colors ${activeTab === tab.id ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 overflow-y-auto" style={{maxHeight: '60vh'}}>
                    {activeTab === 'demografia' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center h-[200px]">
                                <h3 className="font-semibold mb-2">Gênero</h3>
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                    <PieChart>
                                        <Pie data={drillDownData.genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                            {drillDownData.genderData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS_GENDER[index % PIE_COLORS_GENDER.length]} />)}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value} (${((Number(value) / (node.totalInflow || 1)) * 100).toFixed(0)}%)`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                             <div className="text-center h-[200px]">
                                <h3 className="font-semibold mb-2">Faixa Etária</h3>
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                    <PieChart>
                                        <Pie data={drillDownData.ageData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label>
                                             {drillDownData.ageData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS_AGE[index % PIE_COLORS_AGE.length]} />)}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value} (${((Number(value) / (node.totalInflow || 1)) * 100).toFixed(0)}%)`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                     {activeTab === 'subgrupos' && (
                        <div className="h-[250px]">
                            <h3 className="font-semibold mb-2 text-center">Composição dos Alunos</h3>
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <BarChart data={drillDownData.subgroupsData} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value) => `${value} (${((Number(value) / (node.totalInflow || 1)) * 100).toFixed(0)}%)`} />
                                    <Bar dataKey="value" fill="#3B82F6" label={{ position: 'right', fill: '#000', fontSize: 12 }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    {activeTab === 'evasao' && (
                        <div className="h-[250px]">
                            <h3 className="font-semibold mb-2 text-center">Principais Motivos de Evasão (Total: {drillDownData.dropoutCount.toLocaleString('pt-BR')})</h3>
                             <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <BarChart data={drillDownData.dropoutReasonsData} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value) => `${value} (${((Number(value) / (drillDownData.dropoutCount || 1)) * 100).toFixed(0)}%)`} />
                                    <Bar dataKey="value" fill="#EF4444" label={{ position: 'right', fill: '#000', fontSize: 12 }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0].payload) {
        const { source, target, value } = payload[0].payload;
        if (!source || !target) return null;
        const sourceTotal = source.totalInflow || 1;
        const rate = (value / sourceTotal) * 100;
        const isDropout = target.name === 'Evasão';

        return (
            <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-sm animate-fade-in">
                <p className="font-bold text-base mb-1">{`${source.name} → ${target.name}`}</p>
                <p><span className="font-semibold text-blue-400">Alunos no Fluxo:</span> {value.toLocaleString('pt-BR')}</p>
                <p>
                    <span className={`font-semibold ${isDropout ? 'text-red-400' : 'text-green-400'}`}>
                        {isDropout ? 'Taxa de Evasão:' : 'Taxa de Conversão:'}
                    </span> {rate.toFixed(1)}%
                </p>
            </div>
        );
    }
    return null;
};

const CustomNode = ({ x, y, width, height, index, payload, containerWidth, onNodeClick }: any) => {
    if (!payload) return null;
    const isOut = x + width + 6 > containerWidth;
    const totalInflowText = (payload.totalInflow ?? 0).toLocaleString('pt-BR');
    return (
        <Layer key={`CustomNode${index}`}>
            <rect x={x} y={y} width={width} height={height} fill={payload.color} onClick={() => onNodeClick(payload)} className="cursor-pointer" />
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 8 : x + width + 8}
                y={y + height / 2}
                fontSize="12"
                fontWeight="bold"
                fill="#374151"
                alignmentBaseline="middle"
                className="pointer-events-none"
            >
                {payload.name} ({totalInflowText})
            </text>
        </Layer>
    );
};

const MetricCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-4">
        <div className="text-blue-600 bg-blue-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const InfoBalloon = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute top-4 right-4 z-10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Informações sobre o gráfico"
      >
        <HelpCircle className="text-blue-600" size={24} />
      </button>
      {isOpen && (
        <div className="absolute top-12 right-0 w-72 p-4 bg-white border-2 border-blue-200 rounded-lg shadow-xl animate-fade-in">
          <h4 className="font-bold text-gray-800">O que é este gráfico?</h4>
          <p className="mt-2 text-xs text-gray-600">
            Este painel centraliza a análise de <strong>FLUXOS</strong>. Navegue pelas abas para ver desde a captação de alunos até a carreira de egressos e simulações de risco.
          </p>
        </div>
      )}
    </div>
  );
};

const UseCaseCard: React.FC<{ icon: React.ReactNode; title: string; description: string; color: string; }> = ({ icon, title, description, color }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start border-t-4 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: color }}>
            <div className="mb-3" style={{ color }}>{icon}</div>
            <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

const UseCasesGrid = () => {
    const cases = [
        { icon: <Search size={32} />, title: "Identificar Dropout", description: "Clique em 'Evasão' para ver os motivos agregados. Clique em 'Graduação' para ver por que alunos saem especificamente dessa etapa.", color: "#F97316" },
        { icon: <BarChart2 size={32} />, title: "Analisar Demografia", description: "O público de 'Especialização' é mais velho? Clique na etapa e veja a demografia para alinhar a comunicação e oferta de cursos.", color: "#10B981" },
        { icon: <GraduationCap size={32} />, title: "Otimizar Captação", description: "Se o público de 'Entrada' é majoritariamente de bolsistas, a estratégia de captação está correta? Use os dados de subgrupos para refinar o marketing.", color: "#3B82F6" },
        { icon: <Target size={32} />, title: "Planejamento Estratégico", description: "A evasão por motivos financeiros é alta no 'Técnico'? Crie programas de bolsa ou financiamento para essa etapa e melhore a retenção.", color: "#A855F7" }
    ];
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Casos de Uso - Insights com Drill-Down</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{cases.map(c => <UseCaseCard key={c.title} {...c} />)}</div>
        </div>
    );
};

const SankeyPanel: React.FC<{
    title: string;
    data: SankeyData;
    metrics: Metrics;
    selectedMunicipio: string;
    onMunicipioChange: (value: string) => void;
    allMunicipios: MunicipioPerfil[];
    onNodeClick: (node: SankeyNode) => void;
}> = ({ title, data, metrics, selectedMunicipio, onMunicipioChange, allMunicipios, onNodeClick }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg border flex flex-col gap-4 h-full">
            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">{title}</label>
                <select value={selectedMunicipio} onChange={e => onMunicipioChange(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
                    <option value="all">Todos os Municípios</option>
                    {allMunicipios.map(m => <option key={m.municipio_id} value={m.municipio_id}>{m.nome} ({m.estado})</option>)}
                </select>
            </div>

            <div className="w-full h-[400px] bg-white rounded-lg border p-2 relative min-w-0">
                <ResponsiveContainer width="100%" height="100%" minHeight={400} minWidth={0}>
                    <Sankey 
                        key={`${selectedMunicipio}-${data.links.length}`}
                        data={data} 
                        node={<CustomNode onNodeClick={onNodeClick} />} 
                        nodePadding={30} 
                        margin={{ left: 150, right: 150, top: 20, bottom: 20 }} 
                        link={{ stroke: '#D1D5DB', strokeOpacity: 0.6 }}
                    >
                        <Tooltip content={<CustomTooltip />} />
                    </Sankey>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <MetricCard icon={<ChevronsRight size={16}/>} label="Conversão Total" value={`${metrics.totalConversionRate?.toFixed(1) || 0}%`} />
                <MetricCard icon={<Users size={16}/>} label="Alunos Iniciais" value={metrics.totalStudents?.toLocaleString('pt-BR') || '0'} />
                <MetricCard icon={<LogOut size={16}/>} label="Maior Evasão" value={metrics.highestDropoutStage || 'N/A'} />
                <MetricCard icon={<Clock size={16}/>} label="Jornada Média" value={`${metrics.averageJourneyTime || 0} meses`} />
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
interface EmploymentSankeyDiagramProps {
    selectedCityId: number;
}

const EmploymentSankeyDiagram: React.FC<EmploymentSankeyDiagramProps> = ({ selectedCityId }) => {
    const [activeTab, setActiveTab] = useState(FLOW_TABS[0].id);
    const [selectedMunicipioA, setSelectedMunicipioA] = useState('all');
    const [selectedMunicipioB, setSelectedMunicipioB] = useState('3132404'); 
    const [selectedProgram, setSelectedProgram] = useState<keyof typeof PROGRAM_PROFILES>('Agronegócio');
    const [modalData, setModalData] = useState<ModalData | null>(null);

    const [{ data: dataA, metrics: metricsA }, setChartDataA] = useState<{ data: SankeyData, metrics: Metrics }>({ data: { nodes: [], links: [] }, metrics: {} as Metrics });
    const [{ data: dataB, metrics: metricsB }, setChartDataB] = useState<{ data: SankeyData, metrics: Metrics }>({ data: { nodes: [], links: [] }, metrics: {} as Metrics });
    
    const sortedMunicipios = useMemo(() => MUNICIPIOS_PERFIL.sort((a,b) => a.nome.localeCompare(b.nome)), []);

    useEffect(() => {
        setChartDataA(generateSankeyData(selectedMunicipioA, selectedProgram));
    }, [selectedMunicipioA, selectedProgram]);

    useEffect(() => {
        setChartDataB(generateSankeyData(selectedMunicipioB, selectedProgram));
    }, [selectedMunicipioB, selectedProgram]);
    
    const handleNodeClick = (node: SankeyNode, municipioId: string) => {
        const municipioName = municipioId === 'all' 
            ? 'Todos os Municípios' 
            : sortedMunicipios.find(m => m.municipio_id.toString() === municipioId)?.nome || 'N/A';
        setModalData({ node, program: selectedProgram, municipioName });
    };
    
    const handleExport = () => {
        alert("Dados para exportação do comparativo registrados no console.");
    };
    
    const municipioNameA = useMemo(() => selectedMunicipioA === 'all' 
        ? 'Todos os Municípios' 
        : sortedMunicipios.find(m => m.municipio_id.toString() === selectedMunicipioA)?.nome || 'N/A'
    , [selectedMunicipioA, sortedMunicipios]);

    const municipioNameB = useMemo(() => selectedMunicipioB === 'all' 
        ? 'Todos os Municípios' 
        : sortedMunicipios.find(m => m.municipio_id.toString() === selectedMunicipioB)?.nome || 'N/A'
    , [selectedMunicipioB, sortedMunicipios]);

    const chatContext = useMemo(() => `
Estou analisando um diagrama de Sankey sobre o fluxo de alunos.
O contexto da análise atual é:
- Programa: ${selectedProgram}
- Comparativo A (Município): ${municipioNameA}
- Comparativo B (Município): ${municipioNameB}

Métricas para A:
- Conversão Total: ${metricsA.totalConversionRate?.toFixed(1)}%
- Alunos Iniciais: ${metricsA.totalStudents?.toLocaleString('pt-BR')}
- Maior Evasão: ${metricsA.highestDropoutStage}
- Jornada Média: ${metricsA.averageJourneyTime} meses

Métricas para B:
- Conversão Total: ${metricsB.totalConversionRate?.toFixed(1)}%
- Alunos Iniciais: ${metricsB.totalStudents?.toLocaleString('pt-BR')}
- Maior Evasão: ${metricsB.highestDropoutStage}
- Jornada Média: ${metricsB.averageJourneyTime} meses
`, [selectedProgram, municipioNameA, municipioNameB, metricsA, metricsB]);

    // Sincroniza o dropdown A com a cidade global selecionada
    useEffect(() => {
        if (selectedCityId) {
            setSelectedMunicipioA(selectedCityId.toString());
        }
    }, [selectedCityId]);

    return (
        <div className="p-4 bg-gray-50 h-full overflow-y-auto animate-fade-in relative">
            {modalData && <DrillDownModal data={modalData} onClose={() => setModalData(null)} />}
            <InfoBalloon />
            <h2 className="text-xl font-bold text-gray-800 text-center flex items-center justify-center gap-2 mb-4">
                <TrendingUp /> Análise de Fluxos e Simulação
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">Navegue entre o fluxo de captação, o ciclo de carreira e a projeção de riscos.</p>

            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                    {FLOW_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="tab-content">
                {activeTab === 'student' && (
                    <>
                        {/* WIDGET NOVO: Social Gap Monitor */}
                        <SocialGapMonitor municipioId={selectedMunicipioA} />

                        <div className="p-3 bg-white rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label htmlFor="program-select" className="block text-sm font-semibold text-gray-700 mb-1">Programa (Ambos os gráficos)</label>
                                <select id="program-select" value={selectedProgram} onChange={e => setSelectedProgram(e.target.value as keyof typeof PROGRAM_PROFILES)} className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2">
                                    {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="self-end">
                                <button onClick={handleExport} className="w-full bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <Download size={16}/> Exportar Comparativo (PDF)
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-12">
                            <SankeyPanel
                                title="Comparativo A (Alvo)"
                                data={dataA}
                                metrics={metricsA}
                                selectedMunicipio={selectedMunicipioA}
                                onMunicipioChange={setSelectedMunicipioA}
                                allMunicipios={sortedMunicipios}
                                onNodeClick={(node) => handleNodeClick(node, selectedMunicipioA)}
                            />
                            <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                            <SankeyPanel
                                title="Comparativo B (Benchmark)"
                                data={dataB}
                                metrics={metricsB}
                                selectedMunicipio={selectedMunicipioB}
                                onMunicipioChange={setSelectedMunicipioB}
                                allMunicipios={sortedMunicipios}
                                onNodeClick={(node) => handleNodeClick(node, selectedMunicipioB)}
                            />
                        </div>
                        <div className="mt-8">
                             <UseCasesGrid />
                        </div>
                    </>
                )}

                {activeTab === 'alumni' && (
                    <div className="max-w-5xl mx-auto h-[600px] relative min-w-0">
                         <AlumniCareerSankey municipality={municipioNameA} />
                    </div>
                )}

                {activeTab === 'simulator' && (
                    <div className="max-w-6xl mx-auto h-[700px] relative min-w-0">
                         <ScenarioSimulator selectedCityId={selectedCityId} />
                    </div>
                )}
            </div>
            
            <ChatWidget
                contextPrompt={chatContext}
                initialMessage="Olá! Como posso ajudar a analisar este fluxo de alunos?"
            />
        </div>
    );
}

export default EmploymentSankeyDiagram;
