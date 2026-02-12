
import React, { useMemo } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label, Cell } from 'recharts';
import { MUNICIPIOS_PERFIL } from './constants';
import { useRealTimeData } from './services/realTimeSyncService';

const CorrelationScatterPlot: React.FC<{ selectedCityId: number }> = ({ selectedCityId }) => {
    const data = useMemo(() => {
        return MUNICIPIOS_PERFIL.map(m => ({
            x: Number((m.agro.pib_agro_bi / m.populacao_total * 1000).toFixed(2)), 
            y: m.educacao.conceito_medio_enade || 3, 
            z: m.populacao_total, 
            name: m.nome,
            id: m.municipio_id,
            isSelected: m.municipio_id === selectedCityId
        }));
    }, [selectedCityId]);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-6">
             <h3 className="text-sm font-black text-slate-800 mb-6 text-center uppercase tracking-widest">
                 Correlação: Riqueza Agrícola vs. Qualidade da Educação
             </h3>
            <div style={{ height: 400 }} className="w-full min-w-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis type="number" dataKey="x" name="Riqueza" unit="k" domain={['auto', 'auto']}>
                             <Label value="PIB Agro per Capita (R$)" offset={-10} position="insideBottom" style={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Qualidade" domain={[0, 5]} tick={{fontSize: 10}}>
                            <Label value="Nota MEC/Enade" angle={-90} position="insideLeft" style={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}}/>
                        </YAxis>
                        <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Scatter data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.isSelected ? '#ef4444' : '#3b82f6'} 
                                    fillOpacity={entry.isSelected ? 1 : 0.4}
                                    stroke={entry.isSelected ? '#b91c1c' : 'none'}
                                    strokeWidth={entry.isSelected ? 2 : 0}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 opacity-40"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Outros Mercados</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest underline decoration-red-500 underline-offset-4">Município Selecionado</span>
                </div>
            </div>
        </div>
    );
};

export default CorrelationScatterPlot;
