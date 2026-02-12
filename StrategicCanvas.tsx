import React, { useState, useMemo } from 'react';
import { 
    Target, TrendingUp, Layers, ArrowRight, DollarSign, 
    BarChart3, PieChart, ShieldCheck, MapPin, Edit3, Save,
    Plus, ChevronRight
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    ComposedChart, Line, Cell, Area, ReferenceLine, Legend 
} from 'recharts';
import { formatNumber } from './constants';
import { HeritageConfig, SheetData, ValuationSnapshot } from './types';
import { calculateConsolidatedValuation } from './services/financialModelingService';

interface StrategicCanvasProps {
    heritage: HeritageConfig;
    onUpdateHeritage: (config: HeritageConfig) => void;
    sheets: SheetData[];
    onNavigateToDetail: (sheetId: string) => void;
    onAddSheet: () => void;
}

const HeritageCard = ({ config, onUpdate }: { config: HeritageConfig, onUpdate: (c: HeritageConfig) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempConfig, setTempConfig] = useState(config);

    const handleSave = () => {
        onUpdate(tempConfig);
        setIsEditing(false);
    };

    const currentValuation = (tempConfig.currentRevenue * (tempConfig.currentEbitdaMargin/100)) * tempConfig.valuationMultiple;

    return (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <ShieldCheck size={120} />
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                            <ShieldCheck size={16}/> Business Atual (Heritage)
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">A base do valuation (Legado)</p>
                    </div>
                    <button 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`p-2 rounded-lg transition-colors ${isEditing ? 'bg-emerald-50 hover:bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                    >
                        {isEditing ? <Save size={16}/> : <Edit3 size={16}/>}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Receita Atual (Ano 0)</label>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={tempConfig.currentRevenue}
                                onChange={e => setTempConfig({...tempConfig, currentRevenue: Number(e.target.value)})}
                                className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm font-bold text-white"
                            />
                        ) : (
                            <p className="text-xl font-black">R$ {tempConfig.currentRevenue} MM</p>
                        )}
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Margem EBITDA</label>
                        {isEditing ? (
                            <div className="flex items-center gap-1">
                                <input 
                                    type="number" 
                                    value={tempConfig.currentEbitdaMargin}
                                    onChange={e => setTempConfig({...tempConfig, currentEbitdaMargin: Number(e.target.value)})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm font-bold text-white"
                                />
                                <span className="text-sm">%</span>
                            </div>
                        ) : (
                            <p className="text-xl font-black text-emerald-400">{tempConfig.currentEbitdaMargin}%</p>
                        )}
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Cresc. Orgânico</label>
                        {isEditing ? (
                            <div className="flex items-center gap-1">
                                <input 
                                    type="number" 
                                    value={tempConfig.organicGrowthRate}
                                    onChange={e => setTempConfig({...tempConfig, organicGrowthRate: Number(e.target.value)})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm font-bold text-white"
                                />
                                <span className="text-sm">%</span>
                            </div>
                        ) : (
                            <p className="text-xl font-black">{tempConfig.organicGrowthRate}% a.a.</p>
                        )}
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Múltiplo (Valuation)</label>
                        {isEditing ? (
                            <div className="flex items-center gap-1">
                                <input 
                                    type="number" 
                                    value={tempConfig.valuationMultiple}
                                    onChange={e => setTempConfig({...tempConfig, valuationMultiple: Number(e.target.value)})}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm font-bold text-white"
                                />
                                <span className="text-sm">x</span>
                            </div>
                        ) : (
                            <p className="text-xl font-black text-purple-400">{tempConfig.valuationMultiple}x</p>
                        )}
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Valuation Atual (Est.)</p>
                    <p className="text-3xl font-black text-white text-center">R$ {formatNumber(currentValuation)} MM</p>
                </div>
            </div>
        </div>
    );
};

const BreakdownTooltip = ({ active, payload, label, breakdown }: any) => {
    if (active && payload && payload.length) {
        const yearIndex = label - 2025;
        
        const breakdownData = breakdown.map((item: any) => ({
            name: item.sheetName,
            value: item.revenue[yearIndex] || 0
        })).sort((a: any, b: any) => b.value - a.value);

        return (
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-700 shadow-2xl min-w-[240px]">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                    Ano {label}
                </p>
                
                {payload.map((entry: any) => {
                    if (entry.name === "Valuation Total") {
                         return (
                            <div key={entry.name} className="flex justify-between items-center py-1 text-blue-400 font-bold border-t border-white/10 mt-2 pt-2">
                                <span>Valuation</span>
                                <span>R$ {formatNumber(entry.value/1000000)}M</span>
                            </div>
                         );
                    }

                    return (
                        <div key={entry.name} className="flex justify-between items-center py-0.5 text-xs">
                            <span style={{ color: entry.color }}>{entry.name}</span>
                            <span className="font-mono">R$ {formatNumber(entry.value/1000000)}M</span>
                        </div>
                    );
                })}
                
                <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-[9px] text-emerald-500 font-black uppercase mb-1">Nova Receita Detalhada</p>
                    <div className="space-y-1">
                        {breakdownData.slice(0, 5).map((item: any) => (
                             item.value > 0 && (
                                <div key={item.name} className="flex justify-between items-center text-[10px] text-slate-300">
                                    <span className="truncate w-32">{item.name}</span>
                                    <span className="font-mono text-emerald-400">R$ {formatNumber(item.value)}M</span>
                                </div>
                             )
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const StrategicCanvas: React.FC<StrategicCanvasProps> = ({ heritage, onUpdateHeritage, sheets, onNavigateToDetail, onAddSheet }) => {
    
    const { snapshots: valuationData, breakdown } = useMemo(() => {
        return calculateConsolidatedValuation(heritage, sheets, 10);
    }, [heritage, sheets]);

    const initialRevenue = valuationData[0]?.heritageRevenue || 0;
    const finalTotalRevenue = valuationData[valuationData.length - 1]?.totalRevenue || 0;
    const finalValuation = valuationData[valuationData.length - 1]?.totalValuation || 0;
    
    const cagrResult = initialRevenue > 0 && finalTotalRevenue > 0 
        ? Math.pow(finalTotalRevenue / initialRevenue, 1/10) - 1 
        : 0;

    return (
        <div className="animate-fade-in space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-700 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Target size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                <Target size={24} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Arquitetura da Ambição</h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Missão do Ecossistema</p>
                                <p className="text-xl font-medium leading-relaxed text-slate-200">
                                    "Ser a referência definitiva para a educação no agronegócio brasileiro, integrando tecnologia, gestão e sustentabilidade."
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Visão 2035 (North Star)</p>
                                <div className="flex gap-4">
                                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                                        <p className="text-2xl font-black">50</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400">Unidades</p>
                                    </div>
                                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                                        <p className="text-2xl font-black">R$ 1.5Bi</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400">Valuation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <HeritageCard config={heritage} onUpdate={onUpdateHeritage} />
            </div>

            <div>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                            <Layers size={20} className="text-blue-600"/> Motores de Crescimento
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Portfólio de Projetos de Expansão (DREs Individuais)</p>
                    </div>
                    <button 
                        onClick={onAddSheet}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/10"
                    >
                        <Plus size={14}/> Nova Frente
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sheets.filter(s => s.id !== 'consolidado' && s.type !== 'team').map(sheet => (
                        <div 
                            key={sheet.id}
                            onClick={() => onNavigateToDetail(sheet.id)}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${sheet.type === 'unit' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {sheet.type === 'unit' ? <MapPin size={18}/> : <DollarSign size={18}/>}
                                </div>
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors"/>
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{sheet.name}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{sheet.type === 'unit' ? 'Expansão Física' : 'Novo Produto'}</p>
                            
                            <div className="mt-4 flex gap-1 items-end h-8">
                                <div className="w-1/5 bg-slate-100 h-2 rounded-t"></div>
                                <div className="w-1/5 bg-slate-100 h-3 rounded-t"></div>
                                <div className="w-1/5 bg-blue-100 h-4 rounded-t group-hover:bg-blue-200"></div>
                                <div className="w-1/5 bg-blue-200 h-6 rounded-t group-hover:bg-blue-300"></div>
                                <div className="w-1/5 bg-blue-500 h-8 rounded-t group-hover:bg-blue-600"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                            <TrendingUp size={24} className="text-emerald-600"/> Curva de Criação de Valor (Receita)
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Acúmulo de Receita Líquida (Heritage + Expansão)</p>
                    </div>
                    <div className="flex gap-6 text-right">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Receita Base (Ano 0)</p>
                            <p className="text-xl font-black text-slate-700">R$ {formatNumber(initialRevenue/1_000_000)}M</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CAGR Consolidado</p>
                            <p className="text-xl font-black text-purple-600">{(cagrResult * 100).toFixed(1)}% a.a.</p>
                        </div>
                        <div className="pl-6 border-l border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valuation Futuro (Exit)</p>
                            <p className="text-2xl font-black text-blue-700">R$ {formatNumber(finalValuation/1_000_000)}M</p>
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={valuationData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                            <YAxis 
                                tickFormatter={(val) => `R$ ${(val/1000000).toFixed(0)}M`} 
                                tick={{fontSize: 12, fontWeight: 'bold'}} 
                                axisLine={false} 
                                tickLine={false} 
                            />
                            
                            <Tooltip 
                                content={<BreakdownTooltip breakdown={breakdown} />}
                                cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                            />
                            
                            <Legend verticalAlign="top" height={36}/>
                            
                            <Bar 
                                dataKey="heritageRevenue" 
                                name="Receita Base (Heritage)" 
                                stackId="a" 
                                fill="#1e293b" 
                                radius={[0, 0, 0, 0]} 
                                barSize={60} 
                            />
                            <Bar 
                                dataKey="expansionRevenue" 
                                name="Nova Receita (Expansão)" 
                                stackId="a" 
                                fill="#10b981" 
                                radius={[8, 8, 0, 0]} 
                                barSize={60} 
                            />
                            
                            <Line 
                                type="monotone" 
                                dataKey="totalValuation" 
                                name="Valuation Total" 
                                stroke="#3b82f6" 
                                strokeWidth={4} 
                                dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} 
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-900 rounded-sm"></div> Receita Heritage</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Receita Expansão</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Valuation Estimado</span>
                </div>
            </div>

        </div>
    );
};

export default StrategicCanvas;