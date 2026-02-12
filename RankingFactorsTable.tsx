
import React, { useState, useMemo, useEffect } from 'react';
import { 
    Info, Target, Cpu, Telescope, Users, Building2, 
    Scale, MapPin, GitBranch, ArrowRight, Zap, 
    Equal, Coins, Lock, HelpCircle, Table as TableIcon,
    BarChart3, Sprout, Search, Filter
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import type { MunicipioPerfil } from './types';
import { calculateGrowthOpportunity } from './growthOpportunityService';
import { MUNICIPIOS_PERFIL } from './constants';

// ... (Sub-components WeightPie, DetailRow, ScoreDNAChart mantidos iguais - omitidos para brevidade se não mudaram, mas como o XML exige full content, vou manter a estrutura segura)

const WeightPie = ({ label, percentage, color, icon: Icon }: any) => (
    <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex-1 min-w-[100px] transition-all duration-500 hover:scale-105">
        <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (175 * percentage) / 100} className={`${color} transition-all duration-1000`} />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center ${color}`}>
                <Icon size={20} />
            </div>
        </div>
        <div className="text-center">
            <span className="block text-xl font-black text-slate-800">{percentage}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
        </div>
    </div>
);

const DetailRow = ({ factor, metric, weight, score, rationale, icon: Icon }: any) => (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
        <td className="p-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all">
                    <Icon size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{factor}</span>
            </div>
        </td>
        <td className="p-4 text-xs text-slate-600 font-mono bg-slate-50/50">{metric}</td>
        <td className="p-4 text-center">
            <span className="text-xs font-black text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                {weight}
            </span>
        </td>
        <td className="p-4 text-center">
            <span className={`text-xs font-black px-2 py-1 rounded-md ${score >= 7 ? 'text-emerald-600 bg-emerald-50' : (score >= 5 ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50')}`}>
                {score.toFixed(1)}/10
            </span>
        </td>
        <td className="p-4 text-xs text-slate-500 italic max-w-xs">{rationale}</td>
    </tr>
);

const ScoreDNAChart = ({ opp }: { opp: any }) => {
    const data = [
        { name: 'Potencial Agro', score: opp.factors.scoreAgroSize, fill: '#10b981' },
        { name: 'Riqueza/Renda', score: opp.factors.scoreWealth, fill: '#f59e0b' },
        { name: 'Demografia K12', score: opp.factors.scoreK12Pipeline, fill: '#3b82f6' },
        { name: 'Power Pricing', score: opp.factors.scorePricingPower, fill: '#8b5cf6' },
        { name: 'Oceano Azul', score: opp.factors.scoreCompetition, fill: '#64748b' }
    ];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 40, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 10]} hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px' }} />
                    <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const RankingFactorsTable: React.FC<{ selectedProfile?: MunicipioPerfil }> = ({ selectedProfile: propProfile }) => {
    
    const [localProfileId, setLocalProfileId] = useState<number>(propProfile?.municipio_id || 5208707); // Default: Goiânia

    useEffect(() => {
        if (propProfile) {
            setLocalProfileId(propProfile.municipio_id);
        }
    }, [propProfile]);

    const activeProfile = useMemo(() => {
        return MUNICIPIOS_PERFIL.find(m => m.municipio_id === localProfileId);
    }, [localProfileId]);
    
    // CRASH GUARD: Se não encontrar o perfil (ex: ID antigo), usa o primeiro da lista ou null
    const safeProfile = activeProfile || MUNICIPIOS_PERFIL[0];

    const opportunity = useMemo(() => {
        if (!safeProfile) return null;
        return calculateGrowthOpportunity(safeProfile);
    }, [safeProfile]);

    if (!safeProfile || !opportunity) return <div className="p-10 text-center text-slate-400">Carregando dados da cidade...</div>;

    const isSede = safeProfile.tier === 'SEDE' || safeProfile.tier === 'UNA';

    return (
        <div className="mt-8 space-y-12 animate-fade-in pb-20">
            
            {/* HEADER COM TEXTO DINÂMICO & SELETOR */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shrink-0">
                        <Cpu size={24} className="text-white"/>
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Auditando Lógica para:</p>
                        <div className="relative group">
                            <select 
                                className="appearance-none bg-transparent text-2xl font-black text-slate-800 uppercase tracking-tighter outline-none cursor-pointer pr-8 w-full md:w-auto hover:text-blue-600 transition-colors"
                                value={localProfileId}
                                onChange={(e) => setLocalProfileId(Number(e.target.value))}
                            >
                                {MUNICIPIOS_PERFIL.map(city => (
                                    <option key={city.municipio_id} value={city.municipio_id}>
                                        {city.nome} ({city.estado})
                                    </option>
                                ))}
                            </select>
                            <Filter size={16} className="absolute right-0 top-1/2 -translate-x-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500"/>
                        </div>
                        
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                                Tier: {opportunity.tier}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-600 border border-blue-200 uppercase tracking-wider">
                                Score Final: {opportunity.score}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-600 border border-purple-200 uppercase tracking-wider">
                                Hub Score: {opportunity.hubScore}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="text-right pl-6 border-l border-slate-100 hidden md:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Modo do Algoritmo</p>
                    <p className={`text-sm font-black uppercase ${isSede ? 'text-purple-600' : 'text-emerald-600'}`}>
                        {isSede ? 'Consolidação (Valor)' : 'Expansão (Share)'}
                    </p>
                </div>
            </div>

            {/* SEÇÃO 1: VISUALIZAÇÃO INTERATIVA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                    <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2 mb-6">
                        <BarChart3 className="text-blue-600" size={20}/> 
                        Performance por Fator
                    </h4>
                    <ScoreDNAChart opp={opportunity} />
                    <p className="text-[10px] text-slate-400 text-center mt-4 italic">
                        {isSede 
                            ? "*Sedes são menos sensíveis à nota de Competição." 
                            : "*Para Expansão, a Competição alta derruba drasticamente a nota."}
                    </p>
                </section>

                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                    <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2 mb-6">
                        <Scale className="text-purple-600" size={20}/> 
                        Pesos da Nota Comercial
                    </h4>
                    
                    {isSede ? (
                        <div className="grid grid-cols-2 gap-4">
                            <WeightPie label="Renda (Ticket)" percentage={40} color="text-amber-500" icon={Coins} />
                            <WeightPie label="Serviços (Complex.)" percentage={30} color="text-purple-500" icon={Building2} />
                            <WeightPie label="Volume Alunos" percentage={20} color="text-blue-500" icon={Users} />
                            <WeightPie label="Agro Contexto" percentage={10} color="text-slate-400" icon={Sprout} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <WeightPie label="Potência Agro" percentage={50} color="text-emerald-500" icon={Sprout} />
                            <WeightPie label="Renda (Ticket)" percentage={30} color="text-amber-500" icon={Coins} />
                            <WeightPie label="Volume Alunos" percentage={20} color="text-blue-500" icon={Users} />
                            <div className="flex items-center justify-center p-2 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 text-center">
                                + Penalidade Alta de Concorrência
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* SEÇÃO 2: TABELA TÉCNICA DETALHADA */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <TableIcon className="text-slate-500" size={20}/> 
                        Detalhamento Técnico: {safeProfile.nome}
                    </h4>
                </div>
                
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                            <th className="p-4">Fator de Análise</th>
                            <th className="p-4">Dado Real (KPI)</th>
                            <th className="p-4 text-center">Peso Relativo</th>
                            <th className="p-4 text-center">Score (0-10)</th>
                            <th className="p-4">Diagnóstico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DetailRow 
                            factor="Tamanho do Mercado Agro" 
                            metric={`PIB Agro: R$ ${safeProfile.agro.pib_agro_bi} Bi`} 
                            weight={isSede ? "Baixo (10%)" : "CRÍTICO (50%)"} 
                            score={opportunity.factors.scoreAgroSize}
                            rationale={opportunity.factors.scoreAgroSize > 8 ? "Gigante do Agro." : "Mercado agro secundário."}
                            icon={Sprout} 
                        />
                        <DetailRow 
                            factor="Capacidade de Pagamento" 
                            metric={`Renda per Capita: R$ ${safeProfile.economia.renda_per_capita}`} 
                            weight={isSede ? "ALTO (40%)" : "Médio (30%)"} 
                            score={opportunity.factors.scoreWealth}
                            rationale={opportunity.factors.scoreWealth > 7 ? "Público Premium validado." : "Ticket sensível a preço."}
                            icon={Coins} 
                        />
                        <DetailRow 
                            factor="Competição (Oceano Azul)" 
                            metric={`${safeProfile.educacao.total_ies_ativas} IES Ativas`} 
                            weight={isSede ? "Baixo Impacto" : "ALTO IMPACTO"} 
                            score={opportunity.factors.scoreCompetition}
                            rationale={isSede ? "Saturação irrelevante para Sede." : (opportunity.factors.scoreCompetition < 5 ? "Alerta Vermelho: Saturado." : "Sinal Verde: Livre.")}
                            icon={Target} 
                        />
                        <DetailRow 
                            factor="Pricing Power (Ticket)" 
                            metric={`Ticket Est.: R$ ${safeProfile.metricas_estrategicas?.ticket_medio_estimado}`} 
                            weight="20% (Final)" 
                            score={opportunity.factors.scorePricingPower}
                            rationale="Capacidade de absorção de mensalidade."
                            icon={Equal} 
                        />
                    </tbody>
                </table>
            </section>

        </div>
    );
};

export default RankingFactorsTable;
