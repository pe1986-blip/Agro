
import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, LabelList, Treemap, Cell
} from 'recharts';
import { 
    Activity, Globe, Anchor, Users, TrendingUp, AlertOctagon, Wallet
} from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';

const EconomicDNATreemap = ({ city }: { city: MunicipioPerfil }) => {
    const data = [
        { name: 'Agronegócio', size: city.economia.pib_composicao.agropecuaria_bi || 0, fill: '#16a34a' },
        { name: 'Serviços', size: city.economia.pib_composicao.servicos_bi || 0, fill: '#3b82f6' },
        { name: 'Indústria', size: city.economia.pib_composicao.industria_bi || 0, fill: '#f97316' },
        { name: 'Governo', size: city.economia.pib_composicao.administracao_publica_bi || 0, fill: '#94a3b8' }
    ].sort((a, b) => b.size - a.size);

    const CustomContent = (props: any) => {
        const { x, y, width, height, name, value } = props;
        const displayValue = value || 0; 
        return (
            <g>
                <rect x={x} y={y} width={width} height={height} style={{ fill: props.fill, stroke: '#fff', strokeWidth: 2, rx: 12 }} />
                {width > 60 && height > 40 && (
                    <>
                        <text x={x + 12} y={y + 24} fill="#fff" fontSize={14} fontWeight="900" style={{textTransform: 'uppercase'}}>{name}</text>
                        <text x={x + 12} y={y + 42} fill="#fff" fontSize={12} opacity={0.9} fontWeight="500">R$ {displayValue.toFixed(1)} Bi</text>
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[400px]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={16} className="text-indigo-600"/> DNA Econômico (Composição do PIB)
            </h4>
            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <Treemap data={data} dataKey="size" aspectRatio={4/3} stroke="#fff" content={<CustomContent />} />
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const SocialClassPyramid = ({ city }: { city: MunicipioPerfil }) => {
    // Dados do Critério Brasil (Simulados em constants.ts)
    const data = [
        { name: 'Classe A', value: city.economia.distribuicao_classes?.classe_a || 5, fill: '#fbbf24', label: 'R$ 22k+' },
        { name: 'Classe B', value: city.economia.distribuicao_classes?.classe_b || 15, fill: '#60a5fa', label: 'R$ 7k - 22k' },
        { name: 'Classe C', value: city.economia.distribuicao_classes?.classe_c || 45, fill: '#94a3b8', label: 'R$ 3k - 7k' },
        { name: 'Classe D/E', value: city.economia.distribuicao_classes?.classe_d_e || 35, fill: '#cbd5e1', label: '< R$ 3k' }
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[400px]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users size={16} className="text-blue-600"/> Estratificação Social (Critério Brasil)
            </h4>
            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={data} layout="vertical" margin={{ left: 40, right: 30, top: 10, bottom: 10 }} barCategoryGap={10}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <RechartsTooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value: number) => [`${value}%`, 'Domicílios']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="value" position="right" formatter={(val: number) => `${val}%`} style={{fontSize: 11, fontWeight: 'bold', fill: '#475569'}} />
                            <LabelList dataKey="label" position="insideLeft" style={{fontSize: 10, fontWeight: 'bold', fill: '#fff'}} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                <Anchor size={16} className="text-blue-600"/>
                <p className="text-[10px] text-blue-800 leading-tight">
                    <strong>Público Alvo Premium:</strong> {((city.economia.distribuicao_classes?.classe_a || 0) + (city.economia.distribuicao_classes?.classe_b || 0)).toFixed(1)}% dos lares têm renda para mensalidades acima de R$ 1.500.
                </p>
            </div>
        </div>
    );
};

const WageMassWidget = ({ city }: { city: MunicipioPerfil }) => {
    const data = city.economia.massa_salarial?.evolucao_3_anos || [
        { ano: 2022, valor: 100 }, { ano: 2023, valor: 110 }, { ano: 2024, valor: 120 }
    ];
    const growth = city.economia.massa_salarial?.crescimento_anual || 0;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[350px]">
            <div className="flex justify-between items-start mb-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Wallet size={16} className="text-emerald-600"/> Massa Salarial Real
                </h4>
                <span className={`text-[10px] font-black px-2 py-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-100`}>
                    +{growth}% a.a.
                </span>
            </div>
            
            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="ano" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${(val/1000).toFixed(0)}B`} />
                        <RechartsTooltip 
                            formatter={(value: number) => [`R$ ${(value/1000).toFixed(2)} Bi`, 'Massa Salarial']} 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                        />
                        <Area type="monotone" dataKey="valor" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWage)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-[9px] text-slate-400 text-center font-bold uppercase">Volume Total de Salários (CAGED + PNAD)</div>
        </div>
    );
};

const CreditRiskWidget = ({ city }: { city: MunicipioPerfil }) => {
    const risk = city.economia.risco_credito?.inadimplencia_pf || 30; // %
    const score = city.economia.risco_credito?.score_credito_medio || 600;

    // Escala de Risco (Inverso: Quanto menor a inadimplência, melhor)
    let riskColor = '#10b981'; // Green
    let riskLabel = 'Baixo Risco';
    if (risk > 35) { riskColor = '#ef4444'; riskLabel = 'Risco Crítico'; }
    else if (risk > 25) { riskColor = '#f59e0b'; riskLabel = 'Risco Moderado'; }

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between h-[350px]">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertOctagon size={16} className="text-amber-500"/> Termômetro de Crédito
            </h4>
            
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
                {/* Gauge Simulado para Inadimplência */}
                <div className="relative w-40 h-20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-100 rounded-t-full"></div>
                    <div 
                        className="absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom transition-all duration-1000"
                        style={{ 
                            backgroundColor: riskColor, 
                            transform: `rotate(${(risk / 50) * 180 - 180}deg)` // Mapeia 0-50% para 0-180 graus
                        }}
                    ></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-white rounded-t-full flex items-end justify-center pb-2">
                        <span className="text-2xl font-black text-slate-800">{risk}%</span>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-xs font-bold uppercase text-slate-500">Inadimplência Familiar</p>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-100 mt-1 inline-block text-slate-600`}>
                        {riskLabel}
                    </span>
                </div>

                {/* Score Médio */}
                <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Score Médio (Serasa Proxy)</span>
                    <span className="text-lg font-black text-blue-600">{score}</span>
                </div>
            </div>
        </div>
    );
};

const EconomicDeepDive: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    return (
        <div className="space-y-8 h-full overflow-y-auto pr-2 pb-10 custom-scrollbar animate-fade-in">
            
            {/* SEÇÃO 1: MACROECONOMIA & PIB (Destaque Principal) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EconomicDNATreemap city={city} />
                <SocialClassPyramid city={city} />
            </div>

            {/* SEÇÃO 2: ECONOMIA REAL (Dinheiro no Bolso) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <WageMassWidget city={city} />
                <CreditRiskWidget city={city} />
            </div>

        </div>
    );
};

export default EconomicDeepDive;
