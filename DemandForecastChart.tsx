
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { getDemandForecast, ForecastDataPoint } from './services/predictiveAnalyticsService';
import { Loader2, BrainCircuit } from 'lucide-react';

const DemandForecastChart: React.FC<{ municipalityId: number; sector: string }> = ({ municipalityId, sector }) => {
    const [data, setData] = useState<ForecastDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const forecast = await getDemandForecast(municipalityId, sector);
            setData(forecast);
            setLoading(false);
        };
        loadData();
    }, [municipalityId, sector]);

    if (loading) return <div className="h-[300px] flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" /></div>;

    const splitIndex = data.findIndex(d => d.isForecast);
    const forecastStartDate = data[splitIndex]?.date;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold text-gray-800 flex items-center gap-2">
                    <BrainCircuit size={18} className="text-purple-600"/>
                    Previsão de Demanda (IA - 12 Meses)
                </h3>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">Modelo Prophet/ARIMA</span>
            </div>
            
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{fontSize: 10}} tickFormatter={(val) => val.split('-')[1]} />
                        <YAxis tick={{fontSize: 10}} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none'}}
                            itemStyle={{color: '#fff'}}
                            labelFormatter={(label) => `Mês: ${label}`}
                        />
                        <Legend />
                        
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            name="Histórico"
                            stroke="#8884d8" 
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                            connectNulls
                        />
                        {forecastStartDate && (
                            <ReferenceLine x={forecastStartDate} stroke="red" strokeDasharray="3 3" label={{ value: "Hoje", position: 'insideTopRight', fill: 'red', fontSize: 10 }} />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 flex gap-4 text-xs text-gray-500 justify-center">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#8884d8] rounded"></div> Histórico Real (Caged)</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#82ca9d] rounded"></div> Tendência Projetada</div>
            </div>
        </div>
    );
};

export default DemandForecastChart;
