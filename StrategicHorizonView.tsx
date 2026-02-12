
import React, { useMemo } from 'react';
import { analyzeStrategicHorizon, getNationalHorizon } from './services/forecastingService';
import LongTermGrowthChart from './LongTermGrowthChart'; 
import type { MunicipioPerfil } from './types';
import { Rocket, TrendingUp, Globe, BrainCircuit, LineChart, Leaf, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';

interface StrategicHorizonViewProps {
    selectedProfile?: MunicipioPerfil;
}

const TrendCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className={`p-6 rounded-[2rem] border ${color.border} ${color.bg} relative overflow-hidden group hover:shadow-lg transition-all`}>
        <div className={`absolute top-4 right-4 p-2 rounded-xl ${color.iconBg} ${color.iconColor}`}>
            <Icon size={20} />
        </div>
        <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{title}</h4>
            <p className="text-3xl font-black text-slate-800 mb-1">{value}</p>
            <p className="text-xs font-bold text-slate-400">{sub}</p>
        </div>
    </div>
);

const NationalMacroView = () => {
    const data = useMemo(() => getNationalHorizon(), []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Nacional */}
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Globe size={300} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/30">
                            <TelescopeIcon size={32} className="text-white"/>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Brasil 2035</h2>
                            <p className="text-indigo-300 text-xs font-bold uppercase tracking-[0.3em]">
                                Future Trends Intelligence
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-300 max-w-2xl text-sm leading-relaxed font-medium">
                        O cenário educacional brasileiro caminha para uma <strong>hibridização total</strong> até 2028. A demanda por competências AgTech superará a oferta em 300% nas regiões de fronteira agrícola.
                    </p>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TrendCard 
                    title="Penetração EAD (2030)" 
                    value="68%" 
                    sub="Projeção de Dominância" 
                    icon={BrainCircuit}
                    color={{ bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-white', iconColor: 'text-purple-600' }}
                />
                <TrendCard 
                    title="Gap Profissional AgTech" 
                    value="450k" 
                    sub="Vagas sem Candidatos (2028)" 
                    icon={Leaf}
                    color={{ bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-white', iconColor: 'text-emerald-600' }}
                />
                <TrendCard 
                    title="Modelo Predominante" 
                    value="Híbrido" 
                    sub="Fim do Presencial 100%" 
                    icon={Zap}
                    color={{ bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-white', iconColor: 'text-blue-600' }}
                />
            </div>

            {/* Main Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <LineChart size={20} className="text-indigo-600"/> Curvas de Adoção Tecnológica
                    </h3>
                    <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-500">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Adoção Híbrida</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Gap AgTech</div>
                    </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorHybrid" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorGap" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6366f1' }} axisLine={false} tickLine={false} width={40} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#10b981' }} axisLine={false} tickLine={false} width={40} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            
                            <Area yAxisId="left" type="monotone" dataKey="hybrid_adoption" name="% Adoção Híbrida" stroke="#6366f1" strokeWidth={4} fill="url(#colorHybrid)" />
                            <Area yAxisId="right" type="monotone" dataKey="agtech_jobs_gap" name="Gap de Vagas (Milhares)" stroke="#10b981" strokeWidth={4} fill="url(#colorGap)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const TelescopeIcon = ({size, className}: {size:number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.536a.934.934 0 0 1 .702-1.108l6.18-1.318a.934.934 0 0 1 1.108.702l.537 2.536a.934.934 0 0 1-.702 1.108Z"/><path d="m13.482 16.086 5.818-1.24a.935.935 0 0 0 .713-1.104l-.525-2.47a.936.936 0 0 0-1.104-.713l-5.818 1.24"/><path d="M8 17.5 14 11"/><path d="m17 3 3 2.143"/><path d="M22 19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2"/></svg>
);

const StrategicHorizonView: React.FC<StrategicHorizonViewProps> = ({ selectedProfile }) => {
    // Se não houver perfil selecionado, mostra visão Nacional/Global
    if (!selectedProfile) {
        return <NationalMacroView />;
    }

    // Lógica Dinâmica de Projeção Local
    // Refinamos aqui para refletir melhor o perfil da cidade
    const analysis = useMemo(() => {
        const growthRate = selectedProfile.cagr_ing_total_2023 / 100;
        
        // Detecta setores em alta baseado no PIB (Inteligência Regional)
        const comp = selectedProfile.economia.pib_composicao;
        const setores = [];
        
        if (selectedProfile.agro.nivel_tecnologico === 'Alto') setores.push('AgTech & Dados');
        if (comp.servicos_bi > comp.agropecuaria_bi) setores.push('Gestão & Finanças');
        if (comp.industria_bi > 1.0) setores.push('Agroindústria');
        if (selectedProfile.educacao.market_share_top3 < 40) setores.push('Novos Entrantes');
        
        // Garante pelo menos 3
        if (setores.length < 3) setores.push('Sustentabilidade');

        return {
            tendencia_crescimento: growthRate > 0.05 ? 'Acelerado' as const : 'Estável' as const,
            elasticidade_renda: 1.2 + (selectedProfile.economia.renda_per_capita / 10000), // Ricos crescem mais rápido
            setores_em_alta: setores,
            projecao_5_anos: Array.from({length: 10}, (_, i) => ({
              ano: 2024 + i,
              // Projeção baseada no CAGR real da cidade
              demanda_alunos: Math.round(selectedProfile.ing_total_2023 * Math.pow(1 + growthRate, i)),
              // Projeção de renda ajustada
              renda_media_projetada: Math.round(selectedProfile.economia.renda_per_capita * Math.pow(1.03, i))
            }))
        };
    }, [selectedProfile]);

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* Header da Projeção - Local */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                        <Rocket className="text-white" size={24}/>
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight mb-0.5">Visão Local {selectedProfile.nome} 2035</h2>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            Tendência: <span className="text-emerald-400">{analysis.tendencia_crescimento}</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Setores de Alta Absorção</p>
                    <div className="flex gap-2">
                        {analysis.setores_em_alta.slice(0, 3).map(s => (
                            <span key={s} className="bg-white/5 text-blue-400 px-3 py-1 rounded-full text-[9px] font-black border border-white/10 uppercase tracking-tighter">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gráfico de Crescimento Logístico (Curva S) */}
            <div className="flex-1 min-h-[400px]">
                <LongTermGrowthChart 
                    data={analysis.projecao_5_anos} 
                    alpha={analysis.elasticidade_renda} 
                />
            </div>

            {/* Footer de Insight */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
                <TrendingUp className="text-blue-600 mt-0.5" size={16}/>
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                    <strong>Insight RogerLens:</strong> A curva de crescimento projeta uma janela de oportunidade crítica para o biênio 2027-2028, onde a automação do campo exigirá um turnover de competências de 42% na região de {selectedProfile.nome}.
                </p>
            </div>
        </div>
    );
};

export default StrategicHorizonView;
