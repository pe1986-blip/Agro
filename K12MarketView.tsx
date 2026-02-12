
import React, { useMemo } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    ScatterChart, Scatter, ZAxis, Label, ReferenceLine
} from 'recharts';
import { School, GraduationCap, Target } from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { getFeederFunnel, getSchoolQualityMatrix } from './services/k12Service';
import { formatNumber } from './constants';

const COLORS = {
    Premium: '#10b981',   // Verde
    Standard: '#3b82f6',  // Azul
    Tecnica: '#f59e0b',   // Laranja
    Publica: '#94a3b8'    // Cinza
};

const CustomTooltipScatter = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-800 text-white p-3 rounded-lg shadow-xl text-xs z-50">
                <p className="font-bold text-sm mb-1">{data.name}</p>
                <p className="text-slate-300">{data.type}</p>
                <div className="border-t border-slate-600 mt-2 pt-2 space-y-1">
                    <p>Nota ENEM: <span className="font-bold text-yellow-400">{data.enemScore}</span></p>
                    <p>Mensalidade: <span className="font-bold text-emerald-400">R$ {data.tuition}</span></p>
                    <p>Alunos: {data.students}</p>
                </div>
            </div>
        );
    }
    return null;
};

const K12MarketView: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const funnelData = useMemo(() => getFeederFunnel(city), [city]);
    const schoolMatrix = useMemo(() => getSchoolQualityMatrix(city), [city]);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header / KPI Rápido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline Potencial</p>
                        <p className="text-2xl font-black text-slate-800">{formatNumber(funnelData[0].count)} <span className="text-sm font-bold text-slate-500">alunos (15-17)</span></p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Captação Premium</p>
                        <p className="text-2xl font-black text-emerald-700">{formatNumber(funnelData[3].count)} <span className="text-sm font-bold text-emerald-600">leads qualificados</span></p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                        <School size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Escolas no Radar</p>
                        <p className="text-2xl font-black text-slate-800">{schoolMatrix.length} <span className="text-sm font-bold text-slate-500">players chave</span></p>
                    </div>
                </div>
            </div>

            {/* Layout Principal: 2 Colunas Balanceadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* CARD 1: FUNIL DE ALUNOS */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Target size={18} className="text-blue-600"/> Funil de Alimentação (Feeder)
                    </h3>
                    {/* CONTAINER COM ALTURA EXPLÍCITA PARA EVITAR ERRO WIDTH(-1) */}
                    <div className="flex-1 w-full min-h-0 min-w-0 relative">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" width={140} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} interval={0} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={50}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 2: MATRIZ DE QUALIDADE (SCATTER) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <School size={18} className="text-emerald-600"/> Matriz de Qualidade Escolar
                        </h3>
                        <div className="flex flex-col gap-1 text-[8px] font-bold uppercase text-slate-400">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Premium</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Standard</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Pública</span>
                        </div>
                    </div>
                    {/* CONTAINER COM ALTURA EXPLÍCITA PARA EVITAR ERRO WIDTH(-1) */}
                    <div className="flex-1 w-full min-h-0 min-w-0 relative">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis type="number" dataKey="tuition" name="Mensalidade" unit="R$" domain={['auto', 'auto']}>
                                    <Label value="Mensalidade Estimada (R$)" offset={-10} position="insideBottom" style={{fontSize: 10, fill: '#94a3b8'}} />
                                </XAxis>
                                <YAxis type="number" dataKey="enemScore" name="Nota ENEM" domain={[400, 800]}>
                                    <Label value="Média ENEM" angle={-90} position="insideLeft" style={{fontSize: 10, fill: '#94a3b8'}} />
                                </YAxis>
                                <ZAxis type="number" dataKey="students" range={[50, 400]} name="Alunos" />
                                <Tooltip content={<CustomTooltipScatter />} cursor={{ strokeDasharray: '3 3' }} />
                                <ReferenceLine y={600} stroke="#cbd5e1" strokeDasharray="3 3" label={{ value: "Média Corte", position: 'insideBottomRight', fontSize: 10, fill: '#cbd5e1' }}/>
                                <Scatter data={schoolMatrix}>
                                    {schoolMatrix.map((entry, index) => {
                                        let color = COLORS.Publica;
                                        if (entry.type === 'Privada Premium') color = COLORS.Premium;
                                        if (entry.type === 'Privada Standard') color = COLORS.Standard;
                                        if (entry.type === 'Pública Técnica') color = COLORS.Tecnica;
                                        return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default K12MarketView;
