
import React from 'react';
import { 
    Target, TrendingUp, ShieldCheck, Zap, 
    PieChart, Activity, AlertCircle, CheckCircle2,
    ArrowUpRight, Users, Scale, Database, Rocket, DollarSign, Building2, Clock, Swords, Sprout, Coins, GraduationCap
} from 'lucide-react';
import type { MunicipioPerfil, GrowthOpportunityScore, MarketPhase } from './types';
import { formatNumber } from './constants';

interface RankingScorecardProps {
    city: MunicipioPerfil;
    opportunity: GrowthOpportunityScore;
}

interface ScoreRowProps {
    label: string;
    weightPct: number;
    score: number;
    valueDisplay: string;
    icon: React.ElementType;
    color: string;
    description: string;
}

const ScoreRow: React.FC<ScoreRowProps> = ({ 
    label, 
    weightPct, 
    score, 
    valueDisplay, 
    icon: Icon, 
    color,
    description 
}) => {
    const progress = Math.min(100, Math.max(0, score * 10));
    
    return (
        <div className="group p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all bg-white mb-3">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} ${color}`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">{label}</h4>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{description}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">Peso {weightPct}%</span>
                </div>
            </div>
            
            <div className="flex items-end justify-between mb-1 mt-3">
                <span className="text-xs font-bold text-slate-600">Dado Real: <span className="text-slate-900">{valueDisplay}</span></span>
                <span className={`text-sm font-black ${color}`}>{score.toFixed(1)}/10</span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`} 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

const HubCapacityIndicator = ({ score, tier }: { score: number, tier: string }) => {
    const percentage = Math.min(100, Math.max(0, score * 10));
    const isSede = tier === 'SEDE' || tier === 'UNA';
    
    return (
        <div className="bg-slate-900 rounded-2xl p-5 text-white mb-8 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Building2 size={80} />
            </div>
            <div className="flex justify-between items-end mb-2 relative z-10">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                        <Building2 size={16} /> Capacidade de Hub (Operacional)
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1">
                        Mede infraestrutura urbana, serviços e complexidade para sediar operações.
                    </p>
                </div>
                <div className="text-right">
                    <span className={`text-2xl font-black ${isSede ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {score.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500">/10</span>
                </div>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden relative z-10">
                <div 
                    className={`h-full transition-all duration-1000 ${isSede ? 'bg-emerald-500' : 'bg-slate-400'}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="mt-2 flex justify-between text-[9px] font-bold uppercase text-slate-500 relative z-10">
                <span>Polo Remoto</span>
                <span>Tier Atual: <span className="text-white">{tier}</span></span>
                <span>Sede Global</span>
            </div>
        </div>
    );
};

const RankingScorecard: React.FC<RankingScorecardProps> = ({ city, opportunity }) => {
    
    // --- 1. FUNDAMENTOS ---
    const fundamentals = [
        {
            label: "Pipeline K-12 (Funil)",
            weightPct: 35, 
            score: opportunity.factors.scorePop, // Agora usa score do K12
            valueDisplay: `${formatNumber(city.demografia.concluintes_em || 0)} Formandos/Ano`,
            icon: Users,
            color: "text-blue-600",
            description: "Demanda Qualificada (Egressos EM)"
        },
        {
            label: "Potencial Agro (Tamanho)",
            weightPct: 30, 
            score: opportunity.factors.scoreAgroSize,
            valueDisplay: `PIB Agro R$ ${city.agro.pib_agro_bi}B`,
            icon: Database,
            color: "text-emerald-600",
            description: "Riqueza do Setor Alvo"
        }
    ];

    // --- 2. SAÚDE DE MERCADO (NOVO PILAR) ---
    const marketHealth = [
        {
            label: "Qualidade Rival (IGC)",
            weightPct: 15,
            score: opportunity.factors.scoreRivalQuality,
            valueDisplay: `IGC Médio ${city.educacao.media_igc_top3?.toFixed(1)}`,
            icon: Scale,
            color: "text-amber-600",
            description: opportunity.tier === 'SEDE' ? "Validação de Mercado (Rival Forte é Bom)" : "Barreira de Entrada (Rival Forte é Ruim)"
        },
        {
            label: "Poder de Preço (Ticket)",
            weightPct: 15,
            score: opportunity.factors.scorePricingPower,
            valueDisplay: `R$ ${formatNumber(city.metricas_estrategicas?.ticket_medio_estimado || 0)}`,
            icon: DollarSign,
            color: "text-green-600",
            description: "Ticket Médio Estimado na Praça"
        },
        {
            label: "Momentum (Crescimento)",
            weightPct: 20, 
            score: opportunity.factors.scoreMomentum,
            valueDisplay: `CAGR Premium ${city.metricas_estrategicas?.cagr_premium_5y || 5}%`,
            icon: TrendingUp,
            color: "text-purple-600",
            description: "Velocidade de Expansão"
        }
    ];

    return (
        <div className="animate-fade-in">
            <HubCapacityIndicator score={opportunity.factors.hubPotentialScore} tier={opportunity.tier} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Coluna 1: Fundamentos */}
                <div>
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Target size={20} className="text-slate-600"/>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Fundamentos (50%)</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Volume de Demanda & Riqueza</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {fundamentals.map((metric, idx) => (
                            <ScoreRow 
                                key={idx}
                                label={metric.label}
                                weightPct={metric.weightPct}
                                score={metric.score}
                                valueDisplay={metric.valueDisplay}
                                icon={metric.icon}
                                color={metric.color}
                                description={metric.description}
                            />
                        ))}
                    </div>
                </div>

                {/* Coluna 2: Saúde do Mercado (Estratégia) */}
                <div>
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Activity size={20} className="text-blue-600"/>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Saúde do Mercado (50%)</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Qualidade, Preço & Concorrência</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {marketHealth.map((metric, idx) => (
                            <ScoreRow 
                                key={idx}
                                label={metric.label}
                                weightPct={metric.weightPct}
                                score={metric.score}
                                valueDisplay={metric.valueDisplay}
                                icon={metric.icon}
                                color={metric.color}
                                description={metric.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankingScorecard;
