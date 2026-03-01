
import React, { useState, useMemo } from 'react';
import { 
  Factory, Sprout, Truck, MapPin, Target, 
  Briefcase, GraduationCap, AlertTriangle, 
  Database, Users, Globe, ChevronDown, ChevronUp,
  Cpu, Droplets, Zap, Building2, Anchor, Coffee, BarChart3, FileText
} from 'lucide-react';
// Correct Recharts import for ScatterChart
import { 
    ScatterChart as ReScatterChart, Scatter as ReScatter, XAxis as ReXAxis, YAxis as ReYAxis, 
    ZAxis as ReZAxis, CartesianGrid as ReCartesianGrid, Tooltip as ReTooltip, 
    ResponsiveContainer as ReResponsiveContainer, Cell as ReCell, Label as ReLabel,
    ReferenceLine
} from 'recharts';

import type { MunicipioPerfil } from './types';
import { MUNICIPIOS_PERFIL } from './constants';

interface AgroEnvironmentViewProps {
    city?: MunicipioPerfil;
}

// --- TYPES & DATA ---

const MACRO_STATS = [
    {
        label: "Representatividade PIB",
        value: "22% a 35%",
        source: "CEPEA/USP/ESALQ",
        context: "Do PIB Brasileiro total."
    },
    {
        label: "Força de Trabalho",
        value: "20% a 39%",
        source: "CEPEA/USP/ESALQ",
        context: "Do total de empregos no país."
    },
    {
        label: "Cresc. Produtividade (PTF)",
        value: "3,31% a.a.",
        source: "EMBRAPA / Vieira Filho (2023)",
        context: "Vs. 1,12% da média global (1975-2021)."
    },
    {
        label: "Saldo Comercial",
        value: "+40%",
        source: "Ministério da Economia",
        context: "Contribuição no saldo da balança."
    }
];

const GATE_DATA = [
    {
        id: 'antes',
        title: 'Antes da Porteira',
        subtitle: 'Insumos, Genética & Tecnologia',
        icon: Cpu,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        companies: ['Syngenta', 'Bayer', 'John Deere', 'Yara', 'Mosaic', 'Corteva'],
        competencies: ['Biotecnologia Avançada', 'Engenharia de Dados (AgTech)', 'P&D de Novos Materiais', 'Mecatrônica Agrícola'],
        pain: 'O Gap do "Bilinguismo": Faltam profissionais que falem a língua da biologia e a língua do código. O engenheiro de software não entende a fenologia da planta; o agrônomo não sabe programar em Python.'
    },
    {
        id: 'dentro',
        title: 'Dentro da Porteira',
        subtitle: 'Produção Agropecuária (A Fazenda)',
        icon: Sprout,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        companies: ['SLC Agrícola', 'Grupo Bom Futuro', 'Amaggi', 'Coamo', 'Cooxupé', 'Scheffer'],
        competencies: ['Gestão de Alta Performance', 'Agricultura de Precisão', 'Sucessão Familiar', 'Operação de Maquinário Autônomo'],
        pain: 'O Apagão Operacional: Existem tratores de R$ 2 milhões sendo operados com 20% de capacidade. Faltam 148 mil profissionais qualificados em agricultura digital (Fonte: CNA/Senar).'
    },
    {
        id: 'depois',
        title: 'Depois da Porteira',
        subtitle: 'Agroindústria, Logística & Trade',
        icon: Factory,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        companies: ['Raízen', 'JBS', 'Bunge', 'Cargill', 'Rumo', 'BRF'],
        competencies: ['Trading de Commodities', 'Logística Multimodal', 'Engenharia de Alimentos', 'Certificação ESG & Rastreabilidade'],
        pain: 'A Sofisticação Financeira: O gargalo saiu do campo e foi para a mesa de decisão. Faltam traders, gestores de risco (hedge) e auditores de carbono para o mercado internacional.'
    }
];

const CLUSTERS = [
    {
        id: 1,
        name: "Etanol de Milho & Grãos",
        region: "Mato Grosso (Norte/Médio-Norte)",
        cities: ["Lucas do Rio Verde", "Sinop", "Sorriso"],
        anchor: "Inpasa, FS Bioenergia, Amaggi",
        demand: "Engenharia de Bioprocessos, Manutenção Industrial.",
        urgency: "159 vagas abertas apenas na Inpasa (2024).",
        icon: Zap,
        color: "amber",
        matchKeys: ['MT', 'Sorriso', 'Sinop', 'Lucas', 'Milho']
    },
    {
        id: 2,
        name: "Sistema de Integração",
        region: "PR (Oeste) / SC (Oeste) / GO (Sudoeste)",
        cities: ["Cascavel", "Toledo", "Chapecó", "Rio Verde"],
        anchor: "BRF, Aurora, JBS, C.Vale",
        demand: "Sanidade Animal, Zootecnia de Precisão, Gestão de Integrados.",
        urgency: "Expansão de plantas frigoríficas exige +20% de técnicos/ano.",
        icon: Users,
        color: "emerald",
        matchKeys: ['PR', 'SC', 'Rio Verde', 'Chapecó', 'Toledo', 'Proteína']
    },
    {
        id: 3,
        name: "Bioenergia (Cana)",
        region: "São Paulo (Ribeirão) / GO (Sul) / MS",
        cities: ["Ribeirão Preto", "Piracicaba", "Rio Brilhante"],
        anchor: "Raízen, São Martinho, BP Bunge",
        demand: "Indústria 4.0, Automação, Gestão de CTT (Corte, Transbordo e Transporte).",
        urgency: "RenovaBio impulsiona demanda por certificadores.",
        icon: Factory,
        color: "purple",
        matchKeys: ['SP', 'Ribeirão', 'Piracicaba', 'Cana', 'Etanol']
    },
    {
        id: 4,
        name: "Nova Fronteira (MATOPIBA)",
        region: "BA / MA / TO / PI",
        cities: ["Luís Eduardo Magalhães", "Balsas", "Uruçuí"],
        anchor: "SLC, Schmidt, Horita",
        demand: "Agronomia de Cerrado, Abertura de Áreas, Infraestrutura Básica.",
        urgency: "Região com maior crescimento de área plantada do mundo.",
        icon: Globe,
        color: "orange",
        matchKeys: ['BA', 'MA', 'TO', 'PI', 'Matopiba', 'Balsas', 'LEM']
    },
    {
        id: 5,
        name: "Cafés Especiais",
        region: "Sul de Minas / Cerrado Mineiro",
        cities: ["Varginha", "Patrocínio", "Alfenas"],
        anchor: "Cooxupé, 3 Corações, Exportadoras",
        demand: "Classificação (Q-Grader), Comércio Exterior, Marketing de Origem.",
        urgency: "Premiumização exige gestão que o produtor tradicional não tem.",
        icon: Coffee, 
        color: "rose",
        matchKeys: ['MG', 'ES', 'Café', 'Varginha', 'Patrocínio']
    },
    {
        id: 6,
        name: "Fruticultura Irrigada",
        region: "Vale do São Francisco (PE/BA)",
        cities: ["Petrolina", "Juazeiro"],
        anchor: "Agrodan, GrandValle",
        demand: "Engenharia Hídrica, Logística do Frio, Certificação GlobalGAP.",
        urgency: "Exportação de manga/uva cresce 15% a.a. sem técnicos hidricos suficientes.",
        icon: Droplets,
        color: "cyan",
        matchKeys: ['PE', 'Petrolina', 'Juazeiro', 'Fruta']
    }
];

const TARGET_CITIES = [
    {
        name: "Goiânia (GO)",
        role: "Hub Central de Decisão",
        pop: "1.5M habitantes",
        clusters: ["Bioenergia", "Integração", "Serviços Financeiros"],
        why: "Não é apenas agro; é onde o dinheiro e a política do agro moram. Sede da Inpasa, da FAEG e das maiores bancas de advocacia agrária. Ideal para cursos de Gestão, Direito e Alta Tecnologia.",
        status: "Prioridade 1"
    },
    {
        name: "Cuiabá (MT)",
        role: "Capital do 'Brasil Soja'",
        pop: "650k habitantes",
        clusters: ["Grãos", "Pecuária", "Logística"],
        why: "Porta de entrada para o Nortão. Sede da Amaggi e Bom Futuro. Demanda brutal por formação executiva para sucessores de grandes grupos.",
        status: "Prioridade 1"
    },
    {
        name: "Cascavel/Toledo (PR)",
        role: "Capital do Cooperativismo",
        pop: "500k habitantes (Agregado)",
        clusters: ["Cooperativismo", "Proteína Animal"],
        why: "Berço das maiores cooperativas (Coopavel, C.Vale). Cultura de profissionalização técnica muito forte. Solo fértil para cursos técnicos e tecnológicos.",
        status: "Prioridade 2"
    }
];

// --- LOGIC HELPERS ---

const getDominantCluster = (city?: MunicipioPerfil) => {
    if (!city) return null;
    
    // Tenta casar keywords
    const match = CLUSTERS.find(c => {
        return c.matchKeys.some(key => 
            city.estado === key || 
            city.nome.includes(key) ||
            city.uso_terra?.includes(key)
        );
    });

    // Fallback genérico se for centro-oeste
    if (!match && city.regiao === 'Centro-Oeste') return CLUSTERS.find(c => c.id === 1);
    
    return match;
};

// --- COMPONENTS ---

const CrossFertilizationWidget = ({ city }: { city: MunicipioPerfil }) => {
    const data = useMemo(() => {
        return MUNICIPIOS_PERFIL.map(m => ({
            x: m.agro.pib_agro_bi, // Potência Agro
            y: m.educacao.total_ies_ativas, // Saturação Educacional
            z: m.populacao_total, // Tamanho
            name: m.nome,
            id: m.municipio_id,
            isTarget: m.municipio_id === city.municipio_id
        }));
    }, [city]);

    const targetPoint = data.find(d => d.isTarget);
    let analysis = "Mercado Equilibrado";
    if (targetPoint) {
        if (targetPoint.x > 2.0 && targetPoint.y < 5) analysis = "💎 OCEANO AZUL (Alta Riqueza / Baixa Oferta)";
        else if (targetPoint.x < 1.0 && targetPoint.y > 10) analysis = "🚩 ALERTA VERMELHO (Saturado)";
        else if (targetPoint.x > 2.0 && targetPoint.y > 15) analysis = "⚔️ BATALHA DE GIGANTES (Rico mas Saturado)";
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Target size={24} className="text-rose-500"/> Análise de Adubação Cruzada
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">Cruzamento: Riqueza do Agro (PIB) vs. Densidade Educacional (IES)</p>
                </div>
                <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg">
                    {analysis}
                </div>
            </div>

            <div className="h-[400px] w-full bg-slate-50 rounded-2xl border border-slate-100 p-4">
                <ReResponsiveContainer width="100%" height="100%">
                    <ReScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <ReCartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                        <ReXAxis type="number" dataKey="x" name="PIB Agro (Bi)" unit="Bi" tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}}>
                            <ReLabel value="Potência Agro (PIB Bi)" offset={-10} position="insideBottom" style={{fontSize: 10, fill: '#94a3b8', fontWeight: 900}} />
                        </ReXAxis>
                        <ReYAxis type="number" dataKey="y" name="IES Ativas" unit="IES" tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}}>
                            <ReLabel value="Saturação (Nº IES)" angle={-90} position="insideLeft" style={{fontSize: 10, fill: '#94a3b8', fontWeight: 900}} />
                        </ReYAxis>
                        <ReZAxis type="number" dataKey="z" range={[50, 400]} />
                        <ReTooltip cursor={{strokeDasharray: '3 3'}} content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const d = payload[0].payload;
                                return (
                                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs">
                                        <p className="font-bold border-b border-slate-700 pb-1 mb-1">{d.name}</p>
                                        <p>PIB Agro: R$ {d.x} Bi</p>
                                        <p>IES Ativas: {d.y}</p>
                                    </div>
                                );
                            }
                            return null;
                        }} />
                        <ReferenceLine x={2.0} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'ALTA RIQUEZA', fill: '#10b981', fontSize: 10 }} />
                        <ReferenceLine y={5} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'BAIXA COMPETIÇÃO', fill: '#3b82f6', fontSize: 10 }} />
                        
                        <ReScatter data={data} fill="#94a3b8">
                            {data.map((entry, index) => (
                                <ReCell 
                                    key={`cell-${index}`} 
                                    fill={entry.isTarget ? '#e11d48' : (entry.x > 2 && entry.y < 5 ? '#10b981' : '#cbd5e1')} 
                                    opacity={entry.isTarget ? 1 : 0.6}
                                />
                            ))}
                        </ReScatter>
                    </ReScatterChart>
                </ReResponsiveContainer>
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Hotspots (Alta Riqueza / Baixa Oferta)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Alvo Selecionado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300"></div> Outros Mercados</div>
            </div>
        </div>
    );
};

const MacroStatCard = ({ label, value, source, context }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{context}</p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-bold text-blue-600 uppercase">
            <FileText size={10} /> Fonte: {source}
        </div>
    </div>
);

const GateCard = ({ data }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`rounded-2xl border ${data.border} bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg ring-1 ring-offset-2 ring-' + data.color.split('-')[1] : 'shadow-sm hover:shadow-md'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-6 flex items-center justify-between text-left ${data.bg}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${data.color}`}>
                        <data.icon size={24} />
                    </div>
                    <div>
                        <h3 className={`text-lg font-black uppercase tracking-tight ${data.color}`}>{data.title}</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{data.subtitle}</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className={data.color}/> : <ChevronDown className="text-slate-400"/>}
            </button>

            {isOpen && (
                <div className="p-8 space-y-6 animate-fade-in">
                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Building2 size={12}/> Players Dominantes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {data.companies.map((c: string) => (
                                <span key={c} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <GraduationCap size={12}/> Competências Críticas
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.competencies.map((c: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                    <div className={`w-1.5 h-1.5 rounded-full ${data.bg.replace('bg-', 'bg-slate-400 ')}`}></div>
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`p-4 rounded-xl border-l-4 ${data.border.replace('border-', 'border-l-')} bg-slate-50/50`}>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-rose-500"/> O Problema Educacional
                        </h4>
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            "{data.pain}"
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const ClusterRow = ({ cluster, isDominant }: any) => {
    const colors: any = {
        amber: 'bg-amber-100 text-amber-700 border-amber-200',
        emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        purple: 'bg-purple-100 text-purple-700 border-purple-200',
        orange: 'bg-orange-100 text-orange-700 border-orange-200',
        rose: 'bg-rose-100 text-rose-700 border-rose-200',
        cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    };

    return (
        <div className={`group bg-white p-5 rounded-2xl border transition-all ${isDominant ? 'border-blue-500 shadow-xl ring-4 ring-blue-50 relative overflow-hidden' : 'border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md'}`}>
            {isDominant && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-widest z-10">
                    Vocação Local Detectada
                </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 relative z-0">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colors[cluster.color]}`}>
                        <cluster.icon size={20} />
                    </div>
                    <div>
                        <h4 className={`font-black text-sm uppercase ${isDominant ? 'text-blue-900' : 'text-slate-800'}`}>{cluster.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{cluster.region}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded border border-rose-100 uppercase tracking-widest">
                        Evidência de Demanda
                    </span>
                    <p className="text-xs font-bold text-slate-600 mt-1">{cluster.urgency}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50 text-xs">
                <div>
                    <span className="font-bold text-slate-400 block mb-1">Cidades-Núcleo</span>
                    <span className="text-slate-700">{cluster.cities.join(', ')}</span>
                </div>
                <div>
                    <span className="font-bold text-slate-400 block mb-1">Competência Chave</span>
                    <span className="text-slate-700 font-medium">{cluster.demand}</span>
                </div>
            </div>
        </div>
    );
};

const CityTargetCard = ({ city }: any) => (
    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <MapPin size={120} />
        </div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{city.name}</h3>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{city.role}</p>
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest">
                    {city.status}
                </span>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Users size={16} className="text-blue-400"/>
                    {city.pop}
                </div>
                <div className="flex flex-wrap gap-2">
                    {city.clusters.map((c: string) => (
                        <span key={c} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 uppercase font-bold">
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium border-l-2 border-emerald-500 pl-4">
                "{city.why}"
            </p>
        </div>
    </div>
);

const AgroEnvironmentView: React.FC<AgroEnvironmentViewProps> = ({ city }) => {
    // --- LÓGICA DE DETECÇÃO DE CLUSTER ---
    const dominantCluster = useMemo(() => getDominantCluster(city), [city]);
    
    // Reordena clusters para colocar o dominante primeiro
    const sortedClusters = useMemo(() => {
        if (!dominantCluster) return CLUSTERS;
        return [
            dominantCluster,
            ...CLUSTERS.filter(c => c.id !== dominantCluster.id)
        ];
    }, [dominantCluster]);

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
            
            {/* HERO */}
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-green-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Globe size={12} /> Contexto de Mercado
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        O Sistema Agroindustrial <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            {city ? `Local: ${city.nome}` : 'Brasileiro'}
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Para a Ânima, o Agro não é apenas "fazenda". Entendemos o setor como uma rede complexa. Não formamos apenas para a lavoura; formamos para o sistema.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-20">
                
                {/* 0. DADOS MACROECONÔMICOS */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Fundamentação Econômica</h2>
                            <p className="text-slate-500 text-sm font-medium">A magnitude do setor em números auditados.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MACRO_STATS.map((stat, idx) => (
                            <MacroStatCard key={idx} {...stat} />
                        ))}
                    </div>
                </section>

                {/* 1. AS 3 PORTEIRAS */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-emerald-600">
                            <Target size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Os 3 Vértices do Sistema</h2>
                            <p className="text-slate-500 text-sm font-medium">Onde a Ânima vai operar e quais dores vai resolver.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {GATE_DATA.map(gate => (
                            <GateCard key={gate.id} data={gate} />
                        ))}
                    </div>
                </section>

                {/* 2. GEOGRAFIA DA OPORTUNIDADE (CLUSTER DETECTOR) */}
                <section className="bg-slate-50 rounded-[3rem] border border-slate-200 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
                            Geografia da Oportunidade
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            O Brasil Agro é um arquipélago de ilhas de alta produtividade. Mapeamos os 6 clusters onde a densidade de empresas justifica o investimento.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortedClusters.map(cluster => (
                            <ClusterRow 
                                key={cluster.id} 
                                cluster={cluster} 
                                isDominant={dominantCluster?.id === cluster.id}
                            />
                        ))}
                    </div>
                </section>

                {/* 3. CROSS-FERTILIZATION (NOVO) */}
                {city && (
                    <section>
                         <CrossFertilizationWidget city={city} />
                    </section>
                )}

                {/* 4. CIDADES-ALVO */}
                {!city && (
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                                <Anchor className="text-blue-600" size={24}/> Beachheads (Cabeças de Ponte)
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TARGET_CITIES.map((cityData, idx) => (
                                <CityTargetCard key={idx} city={cityData} />
                            ))}
                        </div>
                    </section>
                )}

                {/* FOOTER NOTE */}
                <div className="text-center pb-12">
                    <p className="text-sm text-slate-400 font-serif italic max-w-2xl mx-auto">
                        "O sucesso da Ânima Agro depende da precisão cirúrgica de estar no cluster certo, com o produto certo para a porteira certa. Não é sobre volume genérico; é sobre relevância local."
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AgroEnvironmentView;
