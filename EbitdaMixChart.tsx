import React, { useMemo } from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
    Cell, LabelList, CartesianGrid 
} from 'recharts';
import { SheetData, YEARS } from './types';
import { formatNumber } from './constants';
import { PieChart } from 'lucide-react';

interface EbitdaMixChartProps {
    sheets: SheetData[];
    filterType?: string;
}

const EbitdaMixChart: React.FC<EbitdaMixChartProps> = ({ sheets, filterType }) => {
    const data = useMemo(() => {
        let eligible = sheets.filter(s => s.type !== 'consolidated' && s.type !== 'team');
        if (filterType === 'territory') eligible = eligible.filter(s => s.type === 'unit');
        if (filterType === 'products') eligible = eligible.filter(s => s.type === 'product' || s.type === 'b2b_project');

        return eligible.map(s => {
            const ebitdaRow = s.rows.find(r => r.id === 'ebitda');
            const val = ebitdaRow ? ebitdaRow.values['ano5'] : 0;
            return {
                name: s.name,
                ebitda: parseFloat(val.toFixed(2)),
                color: s.type === 'unit' ? '#3b82f6' : (s.type === 'b2b_project' ? '#f59e0b' : '#8b5cf6')
            };
        }).sort((a, b) => b.ebitda - a.ebitda);
    }, [sheets, filterType]);

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="mb-8">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <PieChart size={20} className="text-blue-600"/> Mix de Contribuição EBITDA (Ano 5)
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Origem do lucro por frente de negócio</p>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 40, right: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={120} 
                            tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} 
                            axisLine={false} 
                            tickLine={false} 
                        />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            formatter={(val: number) => [`R$ ${val} MM`, 'EBITDA']}
                        />
                        <Bar dataKey="ebitda" radius={[0, 4, 4, 0]} barSize={30}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <LabelList 
                                dataKey="ebitda" 
                                position="right" 
                                formatter={(val: number) => `R$ ${val}M`} 
                                style={{fontSize: 11, fontWeight: 'bold', fill: '#475569'}} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EbitdaMixChart;