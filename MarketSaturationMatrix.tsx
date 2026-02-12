
import React, { useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, Cell, Label, ZAxis 
} from 'recharts';
import { Target, Info } from 'lucide-react';
import { MUNICIPIOS_PERFIL } from './constants';

const MarketSaturationMatrix: React.FC = () => {
    const data = useMemo(() => {
        return MUNICIPIOS_PERFIL.map(city => ({
            name: city.nome,
            x: city.metricas_estrategicas?.penetracao_mercado || 30, // Eixo X: Penetração
            y: city.metricas_estrategicas?.indice_competitividade || 50, // Eixo Y: Concorrência
            z: city.metricas_estrategicas?.cagr_premium_5y || 5, // Tamanho Bolha: Crescimento
            tier: city.tier,
            id: city.municipio_id
        }));
    }, []);

    const midPenetration = 30; // 30% penetração
    const midCompetition = 50; // Índice 50

    return (
        <div className="w-full h-full flex flex-col p-6 bg-white relative">
            
            {/* Header Simplificado */}
            <div className="flex justify-between items-center mb-4 px-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Info size={14}/>
                    <span>Eixo X: Penetração de Mercado (%)</span>
                    <span className="mx-2">•</span>
                    <span>Eixo Y: Intensidade Competitiva (Score)</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    <Target size={14} className="text-emerald-500" /> 
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                        Target: Baixa Penetração + Baixa Concorrência
                    </span>
                </div>
            </div>

            {/* Chart Area Expandida */}
            <div className="flex-1 w-full min-h-0 min-w-0 relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <ScatterChart margin={{ top: 30, right: 60, bottom: 40, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        
                        <XAxis type="number" dataKey="x" name="Penetração" unit="%" domain={[0, 60]} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}}>
                            <Label value="Saturação de Mercado (Penetração %)" offset={-25} position="insideBottom" style={{fontSize: 12, fontWeight: 900, fill: '#94a3b8', textTransform: 'uppercase'}} />
                        </XAxis>
                        
                        <YAxis type="number" dataKey="y" name="Concorrência" domain={[0, 100]} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}}>
                            <Label value="Pressão Competitiva (Índice)" angle={-90} position="insideLeft" style={{fontSize: 12, fontWeight: 900, fill: '#94a3b8', textTransform: 'uppercase'}} offset={0} />
                        </YAxis>
                        
                        <ZAxis type="number" dataKey="z" range={[60, 600]} name="Crescimento (CAGR)" />
                        
                        {/* Tooltip Rico */}
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const d = payload[0].payload;
                                return (
                                    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 text-xs z-50 min-w-[220px]">
                                        <p className="font-black text-sm mb-3 text-white border-b border-slate-700 pb-2">{d.name}</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between"><span className="text-slate-400">Penetração:</span> <span className="font-bold text-blue-400">{d.x}%</span></div>
                                            <div className="flex justify-between"><span className="text-slate-400">Concorrência:</span> <span className="font-bold text-rose-400">{d.y}</span></div>
                                            <div className="flex justify-between border-t border-slate-800 pt-2"><span className="text-slate-400">Crescimento:</span> <span className="font-bold text-emerald-400">+{d.z}% a.a.</span></div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }} />
                        
                        {/* Quadrantes Visuais */}
                        <ReferenceLine x={midPenetration} stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" />
                        <ReferenceLine y={midCompetition} stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" />

                        {/* Labels Grandes de Fundo */}
                        <ReferenceLine y={95} x={5} label={{ position: 'insideTopRight', value: 'BATALHA DE PREÇO', fill: '#f59e0b', fontSize: 16, fontWeight: 900, opacity: 0.2 }} stroke="none" />
                        <ReferenceLine y={95} x={55} label={{ position: 'insideTopRight', value: 'OCEANO VERMELHO', fill: '#ef4444', fontSize: 16, fontWeight: 900, opacity: 0.2 }} stroke="none" />
                        <ReferenceLine y={5} x={5} label={{ position: 'insideBottomRight', value: 'OCEANO AZUL', fill: '#10b981', fontSize: 24, fontWeight: 900, opacity: 0.5 }} stroke="none" />
                        <ReferenceLine y={5} x={55} label={{ position: 'insideBottomRight', value: 'MERCADO MADURO', fill: '#3b82f6', fontSize: 16, fontWeight: 900, opacity: 0.2 }} stroke="none" />

                        <Scatter data={data}>
                            {data.map((entry, index) => {
                                let color = '#94a3b8';
                                if (entry.x < midPenetration && entry.y < midCompetition) color = '#10b981'; // Blue Ocean
                                else if (entry.x > midPenetration && entry.y > midCompetition) color = '#ef4444'; // Red Ocean
                                else if (entry.x < midPenetration && entry.y > midCompetition) color = '#f59e0b'; // Price War
                                else color = '#3b82f6'; // Mature

                                const opacity = entry.tier === 'SEDE' ? 1 : 0.7;
                                const stroke = entry.tier === 'SEDE' ? '#000' : 'white';
                                const strokeWidth = entry.tier === 'SEDE' ? 2 : 1;

                                return <Cell key={`cell-${index}`} fill={color} fillOpacity={opacity} stroke={stroke} strokeWidth={strokeWidth} />;
                            })}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Legend Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-center gap-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div> Alta Oportunidade</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></div> Mercado Saturado</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div> Maduro / Estável</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></div> Guerra de Preço</span>
                <span className="flex items-center gap-2 ml-4 border-l pl-6 border-slate-200"><div className="w-3 h-3 rounded-full border-2 border-black bg-transparent"></div> Sedes Atuais</span>
            </div>
        </div>
    );
};

export default MarketSaturationMatrix;
