
import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, LabelList } from 'recharts';
import { formatNumber } from './constants';
import { FinancialModelResult } from './services/financialModelingService';

interface WaterfallProps {
    model: FinancialModelResult | null;
}

const FinancialWaterfallChart: React.FC<WaterfallProps> = ({ model }) => {
    const [selectedYear, setSelectedYear] = useState<number>(5);

    const data = useMemo(() => {
        if (!model) return null;
        return model.projecoes.find(p => p.ano === selectedYear) || model.projecoes[4];
    }, [model, selectedYear]);

    const processedData = useMemo(() => {
        if (!data) return [];
        
        // Valores em Milhões para visualização
        const gross = data.receitaBruta / 1_000_000;
        const deductions = (data.descontos + data.impostos) / 1_000_000;
        const net = data.receitaLiquida / 1_000_000;
        const opex = (data.receitaLiquida - data.ebitda) / 1_000_000;
        const ebitda = data.ebitda / 1_000_000;

        // Lógica de "Base" para o efeito cascata (degraus)
        return [
            { name: 'Receita Bruta', base: 0, size: gross, val: gross, color: '#3b82f6' },
            { name: 'Deduções/Impostos', base: net, size: deductions, val: -deductions, color: '#ef4444' },
            { name: 'Receita Líquida', base: 0, size: net, val: net, color: '#6366f1' },
            { name: 'OPEX Total', base: Math.max(0, ebitda), size: opex, val: -opex, color: '#f97316' },
            { name: 'Resultado (EBITDA)', base: 0, size: Math.abs(ebitda), val: ebitda, color: ebitda >= 0 ? '#10b981' : '#ef4444' }
        ];
    }, [data]);

    if (!model || !data) return <div className="h-full flex items-center justify-center text-slate-400">Sem dados</div>;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">Geração de Valor & Fluxo de Margens</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Análise em Cascata - Valores em R$ MM</p>
                </div>
                <div className="flex bg-slate-200 p-1 rounded-xl gap-1">
                    {[1, 3, 5, 10].map(y => (
                        <button 
                            key={y} onClick={() => setSelectedYear(y)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${selectedYear === y ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Ano {y}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData} margin={{ top: 30, right: 50, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fontWeight: '900', fill: '#475569' }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fontWeight: '700', fill: '#94a3b8' }} 
                            tickFormatter={(v) => `R$${v}M`} 
                        />
                        <Tooltip 
                            cursor={{ fill: '#f1f5f9', opacity: 0.5 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700">
                                            <p className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2 border-b border-white/10 pb-2">{d.name}</p>
                                            <p className="font-mono text-lg font-bold">R$ {formatNumber(Math.abs(d.val))} MM</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="base" stackId="a" fill="transparent" />
                        <Bar dataKey="size" stackId="a" radius={[6, 6, 6, 6]} barSize={100}>
                            {processedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <LabelList 
                                dataKey="val" 
                                position="top" 
                                formatter={(v: number) => `R$ ${formatNumber(Math.abs(v))}M`} 
                                style={{ fontSize: 11, fontWeight: 900, fill: '#1e293b' }} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Receitas</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Saídas/Deduções</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Resultado Líquido</div>
            </div>
        </div>
    );
};

export default FinancialWaterfallChart;
