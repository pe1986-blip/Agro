
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip, Legend, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine, Label, Cell
} from 'recharts';
import { 
  Swords, Zap, AlertTriangle, ShieldCheck, TrendingUp, 
  ArrowLeft, MapPin, Target, BrainCircuit, Flag, Info, Loader2, Clock, Scale,
  DollarSign, Wifi, Users, Building
} from 'lucide-react';
import type { MunicipioPerfil, MarketPhase } from './types';
import { calculateGrowthOpportunity } from './growthOpportunityService';
import { formatNumber } from './constants';

interface VersusBattleProps {
  cities: MunicipioPerfil[];
  onBack: () => void;
}

// Cálculo de distância Haversine em Km
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

// Mapeamento de Fases para Eixo Numérico (Tempo de Mercado)
const PHASE_MAP: Record<MarketPhase, number> = {
    'Early Stage': 1,
    'Gold Rush': 2,
    'Battlefield': 3,
    'Cash Cow': 4,
    'Reinvention': 5
};

const PHASE_LABELS = {
    1: 'Emergente',
    2: 'Gold Rush (Expansão)',
    3: 'Batalha (Competitivo)',
    4: 'Cash Cow (Maduro)',
    5: 'Reinvenção (Saturado)'
};

const TrajectoryChart = ({ cityA, cityB }: { cityA: any, cityB: any }) => {
    const data = [
        { ...cityA, x: PHASE_MAP[cityA.phase as MarketPhase], y: cityA.score, z: 100, color: '#3b82f6' },
        { ...cityB, x: PHASE_MAP[cityB.phase as MarketPhase], y: cityB.score, z: 100, color: '#f59e0b' },
    ];

    return (
        <div className="h-[350px] w-full bg-white/5 rounded-2xl border border-white/10 p-4 relative">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock size={14} className="text-purple-500"/> Matriz de Trajetória (Tempo x Potência)
            </h4>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" dataKey="x" domain={[0, 6]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(val) => PHASE_LABELS[val as keyof typeof PHASE_LABELS]?.split(' ')[0] || ''} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}>
                        <Label value="Ciclo de Vida do Mercado (Maturidade)" offset={-20} position="insideBottom" style={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }} />
                    </XAxis>
                    <YAxis type="number" dataKey="y" domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 10 }}>
                        <Label value="Score Comercial (Potência)" angle={-90} position="insideLeft" style={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }} />
                    </YAxis>
                    <ZAxis type="number" dataKey="z" range={[100, 500]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                                <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
                                    <p className="font-bold text-white mb-1">{d.name}</p>
                                    <p className="text-slate-300">Fase: {d.phase}</p>
                                    <p className="text-slate-300">Score: {d.score.toFixed(1)}</p>
                                </div>
                            );
                        }
                        return null;
                    }}/>
                    <Scatter data={data}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Scatter>
                    <ReferenceLine segment={[{ x: 1, y: 4 }, { x: 5, y: 9 }]} stroke="#475569" strokeDasharray="5 5" />
                </ScatterChart>
            </ResponsiveContainer>
            
            <div className="absolute top-4 right-4 text-[9px] text-slate-500 font-bold bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                Quanto mais alto e à esquerda, maior o "Blue Ocean".
            </div>
        </div>
    );
};

// --- NOVO: TABELA DE COMPARAÇÃO DEEP DIVE (INTEGRAÇÃO FASE 3) ---
const ComparisonDeepDiveTable = ({ cityA, cityB }: { cityA: MunicipioPerfil, cityB: MunicipioPerfil }) => {
    const MetricRow = ({ label, icon: Icon, valA, valB, format = (v: any) => v, better = 'high' }: any) => {
        let isABetter = false;
        if (typeof valA === 'number' && typeof valB === 'number') {
            isABetter = better === 'high' ? valA > valB : valA < valB;
        }
        
        return (
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                <div className={`text-right font-mono text-sm ${isABetter ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    {format(valA)}
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    <Icon size={12} className="text-blue-500" /> {label}
                </div>
                <div className={`text-left font-mono text-sm ${!isABetter ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                    {format(valB)}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-900 rounded-[2rem] border border-white/10 p-6 mt-8">
            <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center justify-center gap-2">
                <Target size={16}/> Face-off: Indicadores de Profundidade
            </h3>
            
            {/* Seção Financeira */}
            <div className="mb-6">
                <div className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-3 text-center bg-blue-900/20 py-1 rounded">
                    Saúde Financeira & Crédito
                </div>
                <MetricRow 
                    label="% Investimento (Crédito)" 
                    icon={DollarSign} 
                    valA={cityA.economia.financas_agro?.credito_rural.razao_investimento || 0} 
                    valB={cityB.economia.financas_agro?.credito_rural.razao_investimento || 0} 
                    format={(v: number) => `${v}%`}
                />
                <MetricRow 
                    label="Alavancagem (Dívida/Patr.)" 
                    icon={Scale} 
                    valA={cityA.economia.financas_agro?.patrimonio.razao_divida_patrimonio || 0} 
                    valB={cityB.economia.financas_agro?.patrimonio.razao_divida_patrimonio || 0} 
                    format={(v: number) => `${(v * 100).toFixed(0)}%`}
                    better="low"
                />
                <MetricRow 
                    label="Valor da Terra (VTN)" 
                    icon={MapPin} 
                    valA={cityA.economia.financas_agro?.patrimonio.vtn_medio_ha || 0} 
                    valB={cityB.economia.financas_agro?.patrimonio.vtn_medio_ha || 0} 
                    format={(v: number) => `R$ ${formatNumber(v)}`}
                />
            </div>

            {/* Seção Estrutural */}
            <div>
                <div className="text-[9px] font-bold text-purple-500 uppercase tracking-widest mb-3 text-center bg-purple-900/20 py-1 rounded">
                    Desenvolvimento & Social
                </div>
                <MetricRow 
                    label="Conectividade Rural (4G)" 
                    icon={Wifi} 
                    valA={cityA.economia.macro_cenario?.competitividade.conectividade_rural_pct || 0} 
                    valB={cityB.economia.macro_cenario?.competitividade.conectividade_rural_pct || 0} 
                    format={(v: number) => `${v}%`}
                />
                <MetricRow 
                    label="Vulnerabilidade (CadÚnico)" 
                    icon={Users} 
                    valA={cityA.economia.macro_cenario?.social.vulnerabilidade_cadunico || 0} 
                    valB={cityB.economia.macro_cenario?.social.vulnerabilidade_cadunico || 0} 
                    format={(v: number) => `${v}%`}
                    better="low"
                />
                <MetricRow 
                    label="Tempo Abertura Empresa" 
                    icon={Building} 
                    valA={cityA.economia.macro_cenario?.competitividade.tempo_abertura_empresa_horas || 0} 
                    valB={cityB.economia.macro_cenario?.competitividade.tempo_abertura_empresa_horas || 0} 
                    format={(v: number) => `${v}h`}
                    better="low"
                />
            </div>
        </div>
    );
};

const VersusBattle: React.FC<VersusBattleProps> = ({ cities, onBack }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    const cityAData = calculateGrowthOpportunity(cities[0]);
    const cityBData = calculateGrowthOpportunity(cities[1] || cities[0]);

    const cityA = { ...cities[0], ...cityAData, phase: cityAData.marketPhase };
    const cityB = { ...cities[1] || cities[0], ...cityBData, phase: cityBData.marketPhase };

    useEffect(() => {
        const timer = setTimeout(() => setIsAnalyzing(false), 1500);
        return () => clearTimeout(timer);
    }, [cityA, cityB]);

    const battleIntel = useMemo(() => {
        const dist = haversine(cityA.latitude, cityA.longitude, cityB.latitude, cityB.longitude);
        const radiusA = cityA.populacao_total > 300000 ? 150 : 80;
        const radiusB = cityB.populacao_total > 300000 ? 150 : 80;
        const combinedRadius = radiusA + radiusB;
        const isCannibal = dist < combinedRadius;
        const overlapPct = isCannibal ? Math.round(((combinedRadius - dist) / combinedRadius) * 100) : 0;

        const phaseA = PHASE_MAP[cityA.phase as MarketPhase];
        const phaseB = PHASE_MAP[cityB.phase as MarketPhase];
        
        let narrative = "";
        
        // Lógica de narrativa enriquecida com dados novos
        const creditA = cityA.economia.financas_agro?.credito_rural.razao_investimento || 0;
        const creditB = cityB.economia.financas_agro?.credito_rural.razao_investimento || 0;
        
        const creditWinner = creditA > creditB ? cityA.nome : cityB.nome;
        const creditDiff = Math.abs(creditA - creditB);

        if (phaseA > phaseB) {
            narrative = `${cityA.nome} é um mercado maduro, exigindo defesa de share. ${cityB.nome} está em expansão acelerada. ${creditWinner} mostra maior apetite por tecnologia (${creditDiff.toFixed(0)}% mais crédito de investimento).`;
        } else if (phaseA < phaseB) {
            narrative = `${cityA.nome} apresenta janela "Gold Rush". ${cityB.nome} serve como Cash Cow. O perfil de crédito de ${creditWinner} indica modernização mais rápida do campo.`;
        } else {
            narrative = `Mercados em fase similar. A decisão deve pesar o Score Comercial (${cityA.score} vs ${cityB.score}) e a Conectividade Rural (${cityA.economia.macro_cenario?.competitividade.conectividade_rural_pct}% vs ${cityB.economia.macro_cenario?.competitividade.conectividade_rural_pct}%).`;
        }

        return { dist, isCannibal, overlapPct, narrative };
    }, [cityA, cityB]);

    const radarData = [
        { subject: 'Logística', A: 85, B: 65, fullMark: 100 },
        { subject: 'Renda Capita', A: (cityA.economia.renda_per_capita/4500)*100, B: (cityB.economia.renda_per_capita/4500)*100, fullMark: 100 },
        { subject: 'Tech Upside', A: 60, B: 95, fullMark: 100 },
        { subject: 'Market Share', A: cityA.educacao.market_share_top3, B: cityB.educacao.market_share_top3, fullMark: 100 },
        { subject: 'Evasão (Inv)', A: 100 - cityA.educacao.taxa_evasao_presencial, B: 100 - cityB.educacao.taxa_evasao_presencial, fullMark: 100 },
    ];

    if (isAnalyzing) return (
        <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-white animate-fade-in">
            <Loader2 size={64} className="animate-spin text-blue-500 mb-6" />
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Processando War Game...</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">Calculando Vetores de Ataque</p>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-transparent text-white overflow-y-auto custom-scrollbar animate-fade-in relative">
            
            {/* Battle Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-10 py-6 flex justify-between items-center shadow-2xl">
                {/* Botão de voltar removido pois o Overlay tem controle externo */}
                <div className="flex items-center gap-3 bg-blue-600/20 px-4 py-2 rounded-2xl border border-blue-500/30">
                    <Scale size={16} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Análise Relativa</span>
                </div>
                
                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <span className="block text-[10px] font-black text-blue-400 uppercase tracking-widest">Cidade A</span>
                        <span className="text-2xl font-black italic tracking-tighter text-blue-50">{cityA.nome}</span>
                        <span className="block text-[10px] font-bold text-slate-500">{cityA.phase}</span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-amber-600 p-0.5 shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse-slow">
                        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-black italic text-xl">VS</div>
                    </div>
                    <div className="text-left">
                        <span className="block text-[10px] font-black text-amber-400 uppercase tracking-widest">Cidade B</span>
                        <span className="text-2xl font-black italic tracking-tighter text-amber-50">{cityB.nome}</span>
                        <span className="block text-[10px] font-bold text-slate-500">{cityB.phase}</span>
                    </div>
                </div>
                
                <div className="w-[100px]"></div> {/* Spacer para centralizar */}
            </header>

            <div className="p-12 max-w-7xl mx-auto w-full space-y-12 pb-32">
                
                {/* AI REFEREE (The Verdict) */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-1 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Swords size={200} />
                    </div>
                    <div className="relative z-10 p-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shrink-0">
                            <BrainCircuit size={40} className="text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">Posicionamento Relativo</h2>
                            <p className="text-lg font-medium leading-relaxed italic text-slate-200">
                                "{battleIntel.narrative}"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Esquerda: Trajetória Estratégica (NOVO) */}
                    <div className="space-y-6">
                        <TrajectoryChart cityA={cityA} cityB={cityB} />
                        
                        {/* Cannibalization Alert */}
                        <div className={`p-6 rounded-3xl border flex items-center gap-6 transition-all duration-700 ${battleIntel.isCannibal ? 'bg-rose-500/10 border-rose-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
                            <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${battleIntel.isCannibal ? 'bg-rose-600/20 text-rose-400' : 'bg-blue-600/20 text-blue-400'}`}>
                                {battleIntel.isCannibal ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
                            </div>
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-[10px] mb-1 text-slate-400">
                                    Proximidade Geográfica
                                </h4>
                                <p className="text-sm font-bold text-slate-200 leading-tight">
                                    {battleIntel.isCannibal 
                                        ? `Risco de Canibalização: ${battleIntel.overlapPct}% de sobreposição de influência.`
                                        : `Mercados complementares. Distância segura de ${Math.round(battleIntel.dist)}km.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Direita: Tale of the Tape & Radar */}
                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-black/20 border-b border-white/5">
                                        <th className="p-4 text-center text-blue-400 font-black italic uppercase">{cityA.nome}</th>
                                        <th className="p-4 text-center text-slate-600 font-black uppercase text-[10px]">KPI</th>
                                        <th className="p-4 text-center text-amber-400 font-black italic uppercase">{cityB.nome}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <TapeRow label="Tier" valA={cityA.tier} valB={cityB.tier} advantage={cityA.score > cityB.score ? 'A' : 'B'} />
                                    <TapeRow label="PIB Agro" valA={`R$ ${cityA.pib_agro_bi}B`} valB={`R$ ${cityB.pib_agro_bi}B`} advantage={cityA.pib_agro_bi > cityB.pib_agro_bi ? 'A' : 'B'} />
                                    <TapeRow label="População Alvo" valA={`${(cityA.demografia.populacao_18_24/1000).toFixed(1)}k`} valB={`${(cityB.demografia.populacao_18_24/1000).toFixed(1)}k`} advantage={cityA.demografia.populacao_18_24 > cityB.demografia.populacao_18_24 ? 'A' : 'B'} />
                                    <TapeRow label="CAGR (Crescimento)" valA={`${cityA.cagr_ing_total_2023}%`} valB={`${cityB.cagr_ing_total_2023}%`} advantage={cityA.cagr_ing_total_2023 > cityB.cagr_ing_total_2023 ? 'A' : 'B'} />
                                </tbody>
                            </table>
                        </div>

                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: '900' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name={cityA.nome} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                                    <Radar name={cityB.nome} dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
                                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}/>
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* --- NOVA TABELA DE DEEP DIVE --- */}
                <ComparisonDeepDiveTable cityA={cityA} cityB={cityB} />

            </div>
        </div>
    );
};

const TapeRow = ({ label, valA, valB, advantage }: any) => (
    <tr className="hover:bg-white/5 transition-colors">
        <td className={`p-4 text-center font-bold ${advantage === 'A' ? 'text-white' : 'text-slate-500'}`}>{valA}</td>
        <td className="p-4 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{label}</td>
        <td className={`p-4 text-center font-bold ${advantage === 'B' ? 'text-white' : 'text-slate-500'}`}>{valB}</td>
    </tr>
);

export default VersusBattle;
