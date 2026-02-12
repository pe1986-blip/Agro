
import React, { useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell, Legend
} from 'recharts';
import { Swords, Info, CheckCircle2, Waves, Trophy } from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { getCompetitionMatrix } from './services/impactAnalysisService';

const CompetitionScatterWidget: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    // Utiliza a service atualizada que retorna Array vazio se for Oceano Azul
    const data = useMemo(() => getCompetitionMatrix(city), [city]);
    const isBlueOcean = data.length === 0;

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload;
            return (
                <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs z-50">
                    <p className="font-bold text-sm mb-1 text-white border-b border-slate-700 pb-1">{d.name}</p>
                    <div className="space-y-1 mt-1">
                        <p className="flex justify-between gap-4"><span className="text-slate-400">Market Share:</span> <span className="font-bold text-blue-400">{(d.share || 0).toFixed(1)}%</span></p>
                        <p className="flex justify-between gap-4"><span className="text-slate-400">Ticket Médio:</span> <span className="font-bold text-emerald-400">R$ {d.ticket}</span></p>
                        <p className="flex justify-between gap-4"><span className="text-slate-400">Portfólio:</span> <span className="font-bold text-white">{d.courses} Cursos</span></p>
                        <p className="mt-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-800 px-1 rounded w-fit">{d.type}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full animate-fade-in relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Swords size={18} className="text-orange-600"/> Matriz de Concorrência
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Posicionamento: Preço (Ticket) vs. Domínio de Mercado (Share)</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <CheckCircle2 size={10} /> Dados Ativos
                    </span>
                    <div className="group relative">
                        <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-pointer"/>
                        <div className="absolute right-0 top-6 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl hidden group-hover:block z-50">
                            Dados baseados no Censo da Educação Superior (INEP) e levantamento de mensalidades locais.
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area: Chart or Blue Ocean State */}
            <div className="flex-1 w-full min-h-0 min-w-0 relative">
                {isBlueOcean ? (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 p-6 text-center">
                        <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                            <Waves size={48} className="text-blue-500 animate-pulse-slow" />
                        </div>
                        <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-2">
                            Detectado: Oceano Azul
                        </h3>
                        <p className="text-sm text-blue-700 max-w-xs leading-relaxed mb-6">
                            Esta cidade possui menos de 3 concorrentes relevantes. A saturação é mínima e a oportunidade de consolidação é imediata.
                        </p>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                                <Trophy size={16} className="text-yellow-500"/>
                                <span className="text-xs font-bold text-slate-700">Chance de Monopólio</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            
                            <XAxis type="number" dataKey="ticket" name="Ticket Médio" unit="R$" domain={['auto', 'auto']} tick={{fontSize: 10, fill: '#64748b'}}>
                                <Label value="Ticket Médio (R$)" offset={-15} position="insideBottom" style={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                            </XAxis>
                            
                            <YAxis type="number" dataKey="share" name="Market Share" unit="%" domain={[0, 100]} tick={{fontSize: 10, fill: '#64748b'}}>
                                <Label value="Market Share (%)" angle={-90} position="insideLeft" style={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                            </YAxis>
                            
                            <ZAxis type="number" dataKey="courses" range={[100, 1200]} name="Cursos" />
                            
                            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                            
                            <Scatter data={data}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} stroke={entry.color} strokeWidth={1} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Legend (Only show if not Blue Ocean) */}
            {!isBlueOcean && (
                <div className="mt-2 pt-3 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Grande Grupo</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Líder Regional</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Pública</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">EAD/Polo</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompetitionScatterWidget;
