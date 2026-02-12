
import React, { useMemo, useState } from 'react';
import { 
    Users, Briefcase, GraduationCap, ArrowRight, Building2, 
    CheckCircle2, TrendingUp, AlertCircle, PieChart as PieIcon,
    Search, MapPin
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { MunicipioPerfil } from './types';
import { getDetailedSocialGap, getOpenPositionsBreakdown, getCorporateImpact, getSectorDistribution, JobPosition } from './services/socialGapService';
import { formatNumber } from './constants';
import SolutionArchitectModal from './SolutionArchitectModal';

const SocialImpactDeepDive: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const gapMetrics = useMemo(() => getDetailedSocialGap(city), [city]);
    const positions = useMemo(() => getOpenPositionsBreakdown(city), [city]);
    const companies = useMemo(() => getCorporateImpact(city), [city]);
    const sectors = useMemo(() => getSectorDistribution(city), [city]);

    // Estado para o Modal do Arquiteto
    const [selectedJobForArchitect, setSelectedJobForArchitect] = useState<JobPosition | null>(null);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            
            {/* MODAL DE ARQUITETURA DE SOLUÇÃO (Condicional) */}
            {selectedJobForArchitect && (
                <SolutionArchitectModal 
                    job={selectedJobForArchitect} 
                    cityProfile={city} // Passa o objeto completo para ter acesso aos dados econômicos/agro
                    onClose={() => setSelectedJobForArchitect(null)} 
                />
            )}

            {/* SEÇÃO 1: O DIAGNÓSTICO (MACRO) */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ... (Conteúdo visual mantido igual, apenas lógica do modal acima alterada) ... */}
                
                {/* KPI Card: Nem-Nem (Problema) */}
                <div className="bg-white p-6 rounded-[2rem] border border-rose-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={80} className="text-rose-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-rose-600">
                            <AlertCircle size={20} />
                            <h3 className="text-xs font-black uppercase tracking-widest">Capital Humano Ocioso</h3>
                        </div>
                        <p className="text-4xl font-black text-slate-800 mb-1">{formatNumber(gapMetrics.neetCount)}</p>
                        <p className="text-sm font-medium text-slate-500">Jovens (18-24) sem estudo/trabalho</p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-bold">
                            Risco Social Elevado
                        </div>
                    </div>
                </div>

                {/* KPI Card: Vagas (Oportunidade) */}
                <div className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={80} className="text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-emerald-600">
                            <TrendingUp size={20} />
                            <h3 className="text-xs font-black uppercase tracking-widest">Demanda Reprimida</h3>
                        </div>
                        <p className="text-4xl font-black text-slate-800 mb-1">{formatNumber(gapMetrics.openJobs)}</p>
                        <p className="text-sm font-medium text-slate-500">Postos de trabalho não preenchidos</p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                            Potencial de Absorção Imediata
                        </div>
                    </div>
                </div>

                {/* Gráfico de Setores */}
                <div className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <PieIcon size={14} className="text-blue-600"/> Onde estão as vagas?
                    </h3>
                    <div className="flex-1 min-h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={sectors} 
                                    cx="50%" cy="50%" 
                                    innerRadius={40} outerRadius={60} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {sectors.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => `${value}%`}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                />
                                <Legend 
                                    verticalAlign="middle" align="right" layout="vertical" 
                                    iconType="circle" iconSize={8}
                                    wrapperStyle={{ fontSize: '10px', fontWeight: 700, color: '#64748b' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2: A DEMANDA REAL (MATCHMAKING) */}
            <section>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Search size={20} className="text-blue-600"/>
                        Top Vagas Críticas na Região
                    </h2>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Baseado em Caged + LinkedIn</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {positions.map((job) => (
                        <div key={job.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-6">
                            
                            {/* Coluna da Vaga */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-black text-slate-800">{job.title}</h3>
                                    {job.demandLevel === 'Crítica' && (
                                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded border border-red-100 uppercase">Urgente</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1"><Briefcase size={14}/> {job.sector}</span>
                                    <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded"><Users size={14}/> Salário: {job.salary}</span>
                                </div>
                            </div>

                            {/* Coluna dos Gaps (Skills Faltantes) */}
                            <div className="flex-1 w-full md:w-auto">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                    <AlertCircle size={12} className="text-amber-500"/> O que falta no candidato?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {job.missingSkills.map(skill => (
                                        <span key={skill} className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Coluna da Solução (Curso) - BOTÃO DE AÇÃO */}
                            <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                <button 
                                    onClick={() => setSelectedJobForArchitect(job)}
                                    className="w-full md:w-auto flex items-center justify-between gap-4 bg-blue-600 hover:bg-blue-700 text-white p-1 pr-4 pl-1 rounded-xl transition-all group shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                                    title="Arquitetar Solução Pedagógica"
                                >
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <GraduationCap size={20} className="text-white"/>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-bold text-blue-200 uppercase tracking-wider">Criar Solução</p>
                                        <p className="text-xs font-black">{job.recommendedCourse}</p>
                                    </div>
                                    <ArrowRight size={16} className="text-blue-200 group-hover:translate-x-1 transition-transform"/>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

             {/* SEÇÃO 3: O ECOSSISTEMA (Mantido Igual) */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Building2 size={200} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
                            <CheckCircle2 size={24} className="text-white"/>
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Quem Contrata</h2>
                            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Parceiros de Empregabilidade em {city.nome}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {companies.map(comp => (
                            <div key={comp.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <h4 className="font-bold text-sm text-white mb-1">{comp.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">{comp.sector}</p>
                                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 w-fit px-2 py-1 rounded">
                                    <Users size={12}/> {comp.openRoles} vagas ativas
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default SocialImpactDeepDive;
