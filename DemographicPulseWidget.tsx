
import React from 'react';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { Users, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';

const DemographicPulseWidget: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const history = city.demografia.historico_populacao || [];
    const cagr = city.demografia.cagr_populacao_5y || 0;
    const flux = city.demografia.saldo_migratorio || 'Neutro';

    // Determina o status visual
    let statusConfig = {
        icon: Minus,
        color: 'text-slate-500',
        bg: 'bg-slate-50',
        label: 'Estável',
        desc: 'Mercado Maduro',
        stroke: '#94a3b8'
    };

    if (cagr > 2.0) {
        statusConfig = { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Boom (Acelerado)', desc: 'Expansão de Fronteira', stroke: '#10b981' };
    } else if (cagr > 1.0) {
        statusConfig = { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Crescimento', desc: 'Orgânico Saudável', stroke: '#3b82f6' };
    } else if (cagr < 0) {
        statusConfig = { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', label: 'Retração', desc: 'Risco de Esvaziamento', stroke: '#ef4444' };
    }

    const migrationBadge = {
        'Atrator': { color: 'bg-emerald-100 text-emerald-800', text: 'Imã Populacional' },
        'Neutro': { color: 'bg-slate-100 text-slate-800', text: 'Saldo Equilibrado' },
        'Expulsor': { color: 'bg-red-100 text-red-800', text: 'Êxodo Ativo' }
    }[flux];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden group">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Users size={18} className={statusConfig.color}/> Vitalidade Demográfica
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className={`text-xs font-bold ${statusConfig.color}`}>{statusConfig.label}</p>
                        <span className="text-[10px] text-slate-400 font-medium">• {statusConfig.desc}</span>
                    </div>
                </div>
                
                <div className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${migrationBadge.color}`}>
                    {migrationBadge.text}
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={statusConfig.stroke} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={statusConfig.stroke} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="ano" tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                            formatter={(value: number) => [formatNumber(value), 'Habitantes']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="valor" 
                            stroke={statusConfig.stroke} 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorPop)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CAGR (5 Anos)</p>
                    <p className={`text-xl font-black ${statusConfig.color}`}>{cagr > 0 ? '+' : ''}{cagr.toFixed(2)}%<span className="text-xs text-slate-400"> a.a.</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">População Atual</p>
                    <p className="text-xl font-black text-slate-800">{formatNumber(city.demografia.populacao_total)}</p>
                </div>
            </div>

            {/* Insight Overlay on Hover */}
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Info size={32} className="text-white mb-4" />
                <p className="text-white text-sm font-medium leading-relaxed">
                    {cagr > 1.5 
                        ? "Alta demanda por expansão de infraestrutura. Risco de CAPEX baixo devido ao crescimento da base."
                        : (cagr < 0 
                            ? "Alerta Vermelho: População encolhendo. Evite grandes obras. Foque em EAD e nichos B2B." 
                            : "Mercado maduro. Crescimento virá de ganho de market share, não de volume orgânico.")}
                </p>
            </div>
        </div>
    );
};

export default DemographicPulseWidget;
