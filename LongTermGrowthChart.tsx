
import React, { useMemo } from 'react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ReferenceLine 
} from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import type { DataPointFuturo } from './types';

interface LongTermGrowthChartProps {
  data: DataPointFuturo[];
  alpha: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 text-xs">
        <p className="font-bold text-sm mb-2 text-slate-300">{label}</p>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-emerald-400 font-bold">Demanda Alunos: {payload[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-blue-400 font-bold">Índice Econômico: {payload[1].value} pts</span>
            </div>
        </div>
      </div>
    );
  }
  return null;
};

const LongTermGrowthChart: React.FC<LongTermGrowthChartProps> = ({ data, alpha }) => {
    const alphaLabel = useMemo(() => {
        if (alpha > 1.4) return { text: "Fase de Aceleração (Exponencial)", color: "text-emerald-600 bg-emerald-50" };
        if (alpha > 1.1) return { text: "Crescimento Sustentado (Linear)", color: "text-blue-600 bg-blue-50" };
        return { text: "Maturidade / Estabilidade (Plateau)", color: "text-amber-600 bg-amber-50" };
    }, [alpha]);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col animate-fade-in">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="text-indigo-600" size={20}/>
                        Horizonte Estratégico (10 Anos)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Curva em S baseada no Coeficiente Alpha.</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${alphaLabel.color}`}>
                    Alpha: {alpha.toFixed(2)}x • {alphaLabel.text}
                </div>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <defs>
                            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEcon" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="ano" tick={{fontSize: 11, fontWeight: 'bold', fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" orientation="left" tick={{fontSize: 11, fill: '#10b981'}} axisLine={false} tickLine={false} width={40}/>
                        <YAxis yAxisId="right" orientation="right" tick={{fontSize: 11, fill: '#3b82f6'}} axisLine={false} tickLine={false} width={40}/>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: '11px', fontWeight: '600', paddingTop: '10px'}}/>

                        <Area yAxisId="right" type="monotone" dataKey="renda_media_projetada" name="Index Econômico" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEcon)" strokeWidth={2} />
                        <Line yAxisId="left" type="monotone" dataKey="demanda_alunos" name="Demanda Alunos" stroke="#10b981" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: 'white'}} activeDot={{r: 6}} />
                        <ReferenceLine x={data[5]?.ano} stroke="#64748b" strokeDasharray="3 3" label={{ value: 'Alvo Tático (5y)', position: 'insideTopLeft', fontSize: 10, fill: '#64748b' }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <TrendingUp size={16} className="text-indigo-500 mt-0.5 shrink-0"/>
                <div>
                    <p className="text-xs font-bold text-slate-700">Interpretação Alpha</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                        A curva verde indica onde a demanda por qualificação descola do PIB local. 
                        Cidades com <span className="font-bold text-slate-700">Alpha &gt; 1.3</span> são ativos de alto crescimento para tese de consolidação educacional.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LongTermGrowthChart;
