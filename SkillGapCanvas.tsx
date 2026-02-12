
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Users, Briefcase, TrendingUp, AlertCircle, CheckCircle, X, HelpCircle, Zap, BrainCircuit, Leaf, Wrench, Factory, Truck, Sprout, DollarSign, GraduationCap, Droplets, Coffee, Tractor } from 'lucide-react';
import { useRealTimeData } from './services/realTimeSyncService';
import type { MunicipioPerfil } from './types';

// --- TYPES & CONFIG ---

interface SkillClusterDef {
    icon: React.ElementType;
    color: string;
    skills: string[];
}

type SkillClusterMap = Record<string, SkillClusterDef>;

interface SkillGapData {
    skillId: string;
    sector: string;
    gap: number; // -1 (Saturação Extrema) a 1 (Demanda Extrema)
    demandScore: number; // 0-100
    offerScore: number; // 0-100
    avgSalary: number;
    recommendation: string;
    urgency: 'Alta' | 'Média' | 'Baixa';
}

// Colunas: Cadeia de Valor (Fixas, pois a cadeia é padrão)
const SECTORS = [
    'Insumos & Bio',
    'Máquinas & Precisão',
    'Produção (Fazenda)',
    'Agroindústria',
    'Logística & Trading',
    'Serviços Financeiros'
];

// --- ENGINE DE VOCAÇÃO (ANTI-GENERALISMO) ---
// Retorna clusters de skills específicos para a realidade econômica da cidade

const getClustersByVocation = (city: MunicipioPerfil): SkillClusterMap => {
    // Detecta vocação primária (Fallback para 'Servicos' se não definido)
    // A lógica tenta inferir baseada em dados se o campo uso_terra for genérico
    let vocation = city.uso_terra || 'Misto';
    
    // Refinamento de vocação baseado em keywords do nome ou estado se necessário
    if (city.estado === 'MT' || city.estado === 'MS' || city.nome === 'Rio Verde' || city.nome === 'Balsas') vocation = 'Graos';
    if (city.nome === 'Petrolina' || city.nome === 'Juazeiro') vocation = 'Frutas';
    if (city.estado === 'SP' && city.agro.pib_agro_bi > 0.5) vocation = 'Cana';
    if ((city.estado === 'MG' || city.estado === 'ES') && !['Uberlândia', 'Uberaba'].includes(city.nome)) vocation = 'Cafe';
    if (city.nome === 'Chapecó' || city.nome === 'Toledo') vocation = 'Proteina';

    const baseClusters: SkillClusterMap = {
        'Gestão & Negócios': {
            icon: Briefcase,
            color: 'text-blue-700 bg-blue-50 border-blue-200',
            skills: ['Gestão de Custos', 'Sucessão Familiar', 'Comercialização', 'Gestão de Pessoas']
        }
    };

    switch (vocation) {
        case 'Graos': // Soja/Milho/Algodão (High Tech)
            return {
                'AgTech & Dados': {
                    icon: BrainCircuit,
                    color: 'text-purple-700 bg-purple-50 border-purple-200',
                    skills: ['Agricultura de Precisão', 'Mapas de Produtividade', 'Telemetria de Máquinas', 'Sistemas ERP Agro']
                },
                ...baseClusters,
                'Operação High-End': {
                    icon: Wrench,
                    color: 'text-orange-700 bg-orange-50 border-orange-200',
                    skills: ['Operação de Colheitadeiras', 'Aplicação Aérea (Drones)', 'Mecânica Diesel Avançada', 'Monitoramento de Pragas']
                },
                'Sustentabilidade': {
                    icon: Leaf,
                    color: 'text-green-700 bg-green-50 border-green-200',
                    skills: ['Manejo de Solo', 'Bioinsumos', 'Certificação RTRS', 'Licenciamento Ambiental']
                }
            };

        case 'Frutas': // Irrigado (Petrolina)
            return {
                'Tecnologia Hídrica': {
                    icon: Droplets,
                    color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
                    skills: ['Manejo de Irrigação', 'Fertirrigação', 'Automação de Bombas', 'Monitoramento Climático']
                },
                ...baseClusters,
                'Qualidade & Pós-Colheita': {
                    icon: Sprout,
                    color: 'text-rose-700 bg-rose-50 border-rose-200',
                    skills: ['Fisiologia Vegetal', 'Certificação GlobalGAP', 'Logística do Frio', 'Controle de Qualidade Export']
                },
                'Fitossanidade': {
                    icon: Leaf,
                    color: 'text-green-700 bg-green-50 border-green-200',
                    skills: ['Monitoramento de Pragas', 'Controle Biológico', 'Uso Seguro de Defensivos', 'Rastreabilidade']
                }
            };

        case 'Cafe': // Café (MG/ES)
            return {
                'Qualidade & Mercado': {
                    icon: Coffee,
                    color: 'text-amber-800 bg-amber-50 border-amber-200',
                    skills: ['Classificação e Degustação', 'Pós-Colheita (Secagem)', 'Mercado de Especiais', 'Barismo']
                },
                ...baseClusters,
                'Mecanização de Montanha': {
                    icon: Wrench,
                    color: 'text-orange-700 bg-orange-50 border-orange-200',
                    skills: ['Operação de Derriçadeiras', 'Manutenção de Terreiros', 'Irrigação Localizada', 'Poda Programada']
                },
                'Certificações': {
                    icon: CheckCircle,
                    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                    skills: ['Rainforest Alliance', 'Fair Trade', 'Rastreabilidade', 'Gestão Ambiental']
                }
            };

        case 'Cana': // Sucroenergético (SP)
            return {
                'Bioenergia & Indústria': {
                    icon: Zap,
                    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
                    skills: ['Processos Fermentativos', 'Cogeração de Energia', 'Automação Industrial 4.0', 'Manutenção Industrial']
                },
                ...baseClusters,
                'Logística de Corte': {
                    icon: Truck,
                    color: 'text-slate-700 bg-slate-50 border-slate-200',
                    skills: ['CTT (Corte, Transbordo)', 'Gestão de Frota', 'Otimização de Rotas', 'Manutenção Automotiva']
                },
                'Agronômico Canavieiro': {
                    icon: Sprout,
                    color: 'text-green-700 bg-green-50 border-green-200',
                    skills: ['Manejo Varietal', 'Plantio Mecanizado', 'Controle de Daninhas', 'Geoprocessamento']
                }
            };

        default: // Misto/Pecuária ou Genérico
            return {
                'Digitalização Básica': {
                    icon: BrainCircuit,
                    color: 'text-purple-700 bg-purple-50 border-purple-200',
                    skills: ['Uso de Tablets no Campo', 'Planilhas e Gestão', 'Conectividade Rural', 'Marketing Digital']
                },
                ...baseClusters,
                'Operacional Agro': {
                    icon: Tractor,
                    color: 'text-orange-700 bg-orange-50 border-orange-200',
                    skills: ['Operação de Tratores', 'Manutenção Básica', 'Aplicação de Defensivos', 'Sanidade Animal']
                },
                'Sustentabilidade': {
                    icon: Leaf,
                    color: 'text-green-700 bg-green-50 border-green-200',
                    skills: ['Cadastro Ambiental (CAR)', 'Recuperação de Pastagens', 'Bem-estar Animal', 'Legislação Trabalhista']
                }
            };
    }
};

// --- DYNAMIC ENGINE ---

const generateGapData = (city: MunicipioPerfil, clusters: SkillClusterMap): Record<string, Record<string, SkillGapData>> => {
    const data: Record<string, Record<string, SkillGapData>> = {};
    
    // Fatores de Multiplicação baseados no Perfil da Cidade
    const factors = {
        production: Math.log(city.pib_agro_bi + 1) * 1.5, 
        trade: Math.log(city.exportacoes_agro_usd_milhoes + 1) * 0.8,
        tech: (city.penetracao_ensino_superior_percent / 100) + (city.pib_total_bi > 10 ? 0.5 : 0),
        competition: Math.min(1, city.concorrentes_total / 60)
    };

    const seedRandom = (seedStr: string) => {
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
            hash |= 0;
        }
        return (Math.abs(hash) % 100) / 100;
    };

    Object.entries(clusters).forEach(([clusterName, clusterInfo]) => {
        clusterInfo.skills.forEach(skill => {
            if (!data[skill]) data[skill] = {};

            SECTORS.forEach(sector => {
                const seed = `${city.municipio_id}-${skill}-${sector}`;
                const rng = seedRandom(seed);

                // 1. Calcular Demanda (Lógica Refinada)
                let baseDemand = 30 + rng * 20;

                // Boosts Setoriais Específicos
                if (sector.includes('Produção') && factors.production > 2) baseDemand += 30;
                if (sector.includes('Máquinas') && (clusterName.includes('Operação') || clusterName.includes('Mecanização'))) baseDemand += 40 * factors.production;
                if (sector.includes('Logística') && factors.trade > 3) baseDemand += 35;
                if (skill.includes('Irrigação') && sector.includes('Produção')) baseDemand += 50; // Boost específico para Petrolina/Cristalina
                if (skill.includes('Café') && sector.includes('Agroindústria')) baseDemand += 45; // Boost para MG

                const demand = Math.min(100, baseDemand);

                // 2. Calcular Oferta
                let baseOffer = 20 + rng * 30;
                baseOffer += (baseOffer * factors.competition);
                
                // Penalidade de Oferta para skills muito específicas no interior
                if ((skill.includes('Dados') || skill.includes('ESG') || skill.includes('Hídrica')) && city.populacao_total < 150000) {
                    baseOffer *= 0.3; // Escassez real
                }

                const offer = Math.min(100, baseOffer);

                // 3. Gap Final
                const gapRaw = demand - offer;
                const gap = Math.max(-1, Math.min(1, gapRaw / 100));

                let recommendation = "Monitorar";
                let urgency: 'Alta' | 'Média' | 'Baixa' = 'Baixa';

                if (gap > 0.6) {
                    recommendation = "Lançar Especialização Técnica/MBA";
                    urgency = 'Alta';
                } else if (gap > 0.3) {
                    recommendation = "Curso de Extensão (40h)";
                    urgency = 'Média';
                } else if (gap > 0.1) {
                    recommendation = "Módulo na Graduação";
                    urgency = 'Baixa';
                } else if (gap < -0.2) {
                    recommendation = "Mercado Saturado";
                }

                const baseSalary = 2800;
                const salaryMultiplier = (1 + gap) * (clusterName.includes('Tech') ? 1.6 : 1) * (clusterName.includes('Gestão') ? 1.4 : 1);
                
                data[skill][sector] = {
                    skillId: skill,
                    sector,
                    gap,
                    demandScore: Math.round(demand),
                    offerScore: Math.round(offer),
                    avgSalary: Math.round(baseSalary * salaryMultiplier),
                    recommendation,
                    urgency
                };
            });
        });
    });

    return data;
};

// --- COMPONENT: BUBBLE ---

const GapBubble: React.FC<{ 
    data: SkillGapData; 
    isSelected: boolean; 
    onClick: () => void 
}> = ({ data, isSelected, onClick }) => {
    const size = Math.max(18, Math.min(55, (data.demandScore / 100) * 55));
    
    let colorClass = 'bg-gray-200 border-gray-400 opacity-60'; 
    if (data.gap > 0.5) colorClass = 'bg-green-500 border-green-700 animate-pulse-slow';
    else if (data.gap > 0.2) colorClass = 'bg-blue-400 border-blue-600';
    else if (data.gap < -0.1) colorClass = 'bg-red-300 border-red-500 opacity-50';
    
    return (
        <div className="flex items-center justify-center w-full h-16 hover:bg-gray-50/80 transition-colors cursor-pointer" onClick={onClick}>
            <div 
                className={`rounded-full border shadow-sm transition-all duration-300 relative group ${colorClass} ${isSelected ? 'ring-2 ring-offset-2 ring-purple-500 z-10 scale-110 opacity-100' : 'hover:scale-110 hover:opacity-100'}`}
                style={{ width: `${size}px`, height: `${size}px` }}
            >
            </div>
        </div>
    );
};

// --- COMPONENT: INSIGHT PANEL ---

const InsightPanel: React.FC<{ data: SkillGapData; onClose: () => void }> = ({ data, onClose }) => {
    const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="w-full md:w-80 bg-white border-l border-gray-200 p-5 flex flex-col h-full shadow-xl animate-fade-in z-20 absolute right-0 top-0 bottom-0 md:static">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{data.sector}</span>
                    <h3 className="font-bold text-gray-900 text-xl leading-tight mt-1">{data.skillId}</h3>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"><X size={20}/></button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {/* Gap Visualizer */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Índice de Escassez</span>
                        <span className={`text-sm font-bold ${data.gap > 0 ? 'text-green-600' : 'text-red-600'}`}>{(data.gap * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 bg-gradient-to-r from-red-500 via-gray-300 to-green-500 w-full opacity-40"></div>
                        <div 
                            className="absolute top-0 bottom-0 w-1.5 bg-gray-800 shadow-md transition-all duration-500 h-full" 
                            style={{ left: `${((data.gap + 1) / 2) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
                        <span>Saturado</span>
                        <span>Equilibrado</span>
                        <span>Escasso</span>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-bold uppercase flex items-center gap-1"><TrendingUp size={12}/> Demanda</p>
                        <p className="text-2xl font-bold text-blue-900 mt-1">{data.demandScore}</p>
                        <p className="text-[10px] text-blue-600/80">Vagas (Web + Caged)</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <p className="text-xs text-purple-600 font-bold uppercase flex items-center gap-1"><GraduationCap size={12}/> Oferta</p>
                        <p className="text-2xl font-bold text-purple-900 mt-1">{data.offerScore}</p>
                        <p className="text-[10px] text-purple-600/80">Egressos Locais</p>
                    </div>
                </div>

                {/* Actionable Insights */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${data.urgency === 'Alta' ? 'bg-red-500' : data.urgency === 'Média' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <h4 className="font-bold text-sm flex items-center gap-2 mb-3 text-gray-800">
                        <Zap size={16} className="text-yellow-500 fill-yellow-500" /> Recomendação Estratégica
                    </h4>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                        {data.recommendation}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                        Prioridade: <span className={`font-bold ${data.urgency === 'Alta' ? 'text-red-600' : 'text-gray-600'}`}>{data.urgency}</span>
                    </p>
                    
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Salário Inicial Est.:</span>
                        <span className="text-sm font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">{formatMoney(data.avgSalary)}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                    <BookOpen size={16}/> Criar Plano de Curso
                </button>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const SkillGapCanvas: React.FC<{ municipality: string; selectedProfile?: MunicipioPerfil }> = ({ municipality, selectedProfile: propSelectedProfile }) => {
    const { municipiosData } = useRealTimeData();
    const [gapData, setGapData] = useState<Record<string, Record<string, SkillGapData>>>({});
    const [clusters, setClusters] = useState<SkillClusterMap>({});
    const [selectedCell, setSelectedCell] = useState<{ skill: string, sector: string } | null>(null);

    const activeProfile = useMemo(() => {
        if (propSelectedProfile) return propSelectedProfile;
        return municipiosData.find(m => m.nome === municipality || municipality.includes(m.nome));
    }, [propSelectedProfile, municipality, municipiosData]);

    // Update clusters and data when profile changes
    useEffect(() => {
        if (activeProfile) {
            const newClusters = getClustersByVocation(activeProfile);
            setClusters(newClusters);
            setGapData(generateGapData(activeProfile, newClusters));
            setSelectedCell(null);
        }
    }, [activeProfile]);

    // Helper to get vocation name for UI
    const vocationName = useMemo(() => {
        if (!activeProfile) return 'Geral';
        const raw = activeProfile.uso_terra;
        if (raw === 'Graos') return 'Grãos & Commodities';
        if (raw === 'Cafe') return 'Café & Perenes';
        if (raw === 'Cana') return 'Sucroenergético';
        if (raw === 'Frutas') return 'Fruticultura Irrigada';
        return 'Agroindústria Geral';
    }, [activeProfile]);

    if (!activeProfile) return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    // Helpers to prevent icon render issues
    const Circle = ({size, className}: {size: number, className?: string}) => (
        <div className={`rounded-full border-2 border-current ${className}`} style={{width: size, height: size}}></div>
    );
    // Removed local Tractor component definition as it shadows import and is unused in JSX

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-[650px] overflow-hidden relative animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                     <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <BrainCircuit size={20} className="text-purple-600"/>
                        Matriz de Competências
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded border border-slate-300 uppercase">
                            Vocação: {vocationName}
                        </span>
                        <p className="text-xs text-gray-500">Skills customizadas pelo DNA produtivo</p>
                    </div>
                </div>
                
                {/* Legend */}
                <div className="flex gap-4 text-[10px] bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-600"></div> Oportunidade</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-blue-500"></div> Moderado</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-300 border border-red-400"></div> Saturado</div>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <span className="text-gray-400">Tamanho = Volume de Demanda</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Matrix Container */}
                <div className="flex-1 overflow-auto custom-scrollbar bg-white">
                    <table className="min-w-full divide-y divide-gray-200 border-separate border-spacing-0">
                        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-r border-gray-200 min-w-[180px] sticky left-0 z-20 backdrop-blur-sm bg-opacity-95">
                                    Cluster / Habilidade
                                </th>
                                {SECTORS.map(sector => {
                                    let Icon: React.ElementType = Circle;
                                    if(sector.includes('Insumos') || sector.includes('Máquinas')) Icon = Wrench;
                                    if(sector.includes('Produção')) Icon = Sprout;
                                    if(sector.includes('Indústria')) Icon = Factory;
                                    if(sector.includes('Logística')) Icon = Truck;
                                    if(sector.includes('Financeiros')) Icon = DollarSign;

                                    return (
                                        <th key={sector} className="p-2 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider bg-gray-50 border-b border-gray-200 min-w-[100px]">
                                            <div className="flex flex-col items-center gap-1">
                                                <Icon size={14} className="text-gray-400"/>
                                                {sector}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(clusters).map(([clusterName, clusterInfo]: [string, SkillClusterDef]) => (
                                <React.Fragment key={clusterName}>
                                    {/* Cluster Header Row */}
                                    <tr className={`${clusterInfo.color.split(' ')[1]}`}>
                                        <td colSpan={SECTORS.length + 1} className={`px-4 py-2 text-xs font-bold ${clusterInfo.color.split(' ')[0]} border-b border-gray-100 bg-opacity-30`}>
                                            <div className="flex items-center gap-2">
                                                <clusterInfo.icon size={14} />
                                                {clusterName}
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Skill Rows */}
                                    {clusterInfo.skills.map(skill => (
                                        <tr key={skill} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-100 sticky left-0 bg-white z-10 group-hover:bg-gray-50 border-b border-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                {skill}
                                            </td>
                                            {SECTORS.map(sector => {
                                                const cellData = gapData[skill]?.[sector];
                                                if (!cellData) return <td key={sector} className="border-b border-gray-50"></td>;
                                                
                                                return (
                                                    <td key={sector} className="p-1 border-r border-b border-gray-100 relative text-center">
                                                        <GapBubble 
                                                            data={cellData} 
                                                            isSelected={selectedCell?.skill === skill && selectedCell?.sector === sector}
                                                            onClick={() => setSelectedCell({ skill, sector })}
                                                        />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Insight Panel Slide-over */}
                {selectedCell && gapData[selectedCell.skill] && gapData[selectedCell.skill][selectedCell.sector] && (
                    <div className="flex-shrink-0 h-full border-l border-gray-200 shadow-2xl z-30">
                        <InsightPanel 
                            data={gapData[selectedCell.skill][selectedCell.sector]} 
                            onClose={() => setSelectedCell(null)} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillGapCanvas;
