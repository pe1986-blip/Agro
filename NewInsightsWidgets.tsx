
import React, { useMemo } from 'react';
import { 
    ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip
} from 'recharts';
import { 
    Coffee, Activity, Star, Microscope, Scroll, ExternalLink, MapPin, Database
} from 'lucide-react';
import { getLifestyleIndices, getScientificData } from './services/impactAnalysisService';
import type { MunicipioPerfil } from './types';

// --- WIDGET 1: RADAR DE LIFESTYLE (RFB) ---
export const LifestyleRadarWidget: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const data = useMemo(() => getLifestyleIndices(city), [city]);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-2 z-10">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Coffee size={18} className="text-pink-500"/> Lifestyle Index (RFB)
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">Densidade de Serviços B2C (Qualidade de Vida)</p>
                </div>
                <div className="bg-pink-50 text-pink-600 px-2 py-1 rounded text-[10px] font-black uppercase">
                    Fonte: CNPJs Ativos
                </div>
            </div>

            <div className="flex-1 min-h-[250px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="axis" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name={city.nome} dataKey="value" stroke="#ec4899" strokeWidth={3} fill="#ec4899" fillOpacity={0.2} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                            formatter={(value: number) => [`${value}/100`, 'Índice']}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Background Decor */}
            <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <Activity size={150} />
            </div>
        </div>
    );
};

// --- WIDGET 2: PAINEL DE CIÊNCIA (CAPES) ---
export const ScientificInnovationWidget: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const data = useMemo(() => getScientificData(city), [city]);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Microscope size={18} className="text-purple-600"/> Hub de Ciência (CAPES)
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">Pós-Graduação Stricto Sensu & Pesquisa</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${data.capes.programs > 5 ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                    {data.capes.tier}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center text-center">
                    <p className="text-3xl font-black text-slate-800">{data.capes.programs}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Programas Ativos</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center text-center">
                    <div className="flex items-center justify-center gap-1">
                        <p className="text-3xl font-black text-slate-800">{data.capes.avgGrade.toFixed(1)}</p>
                        <Star size={16} className="text-yellow-400 fill-yellow-400 mb-1"/>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Nota Média CAPES</p>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Áreas de Concentração</p>
                <div className="flex flex-wrap gap-2">
                    {data.capes.topAreas.map(area => (
                        <span key={area} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                            <Scroll size={12} className="text-purple-400"/> {area}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 3: TICKER DE VAGAS (HÍBRIDO) ---
export const RealTimeJobsTicker: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const data = useMemo(() => getScientificData(city).realTimeJobs, [city]);

    return (
        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Monitor Híbrido de Demanda
                    </h3>
                    <div className="flex gap-2 mt-1">
                        <span className="text-[9px] font-bold text-blue-300 bg-blue-900/40 px-1.5 py-0.5 rounded border border-blue-800">Caged/Gov (Real)</span>
                        <span className="text-[9px] font-bold text-pink-300 bg-pink-900/40 px-1.5 py-0.5 rounded border border-pink-800">LinkedIn (Futuro)</span>
                    </div>
                </div>
                <Database size={16} className="text-slate-600"/>
            </div>

            <div className="space-y-3 flex-1 overflow-hidden relative">
                {/* Gradiente para efeito de fade */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-900 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                
                <div className="space-y-3 animate-marquee-vertical">
                    {/* Duplicando lista para efeito infinito */}
                    {[...data, ...data, ...data].map((job, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-xs text-blue-300 group-hover:text-blue-200 transition-colors">{job.role}</h4>
                                <span className="text-[9px] font-black text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded">{job.salary}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                    <MapPin size={10}/> {job.company}
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-[8px] uppercase font-bold text-slate-500 bg-slate-800 px-1 rounded">{job.source}</span>
                                    <ExternalLink size={10} className="text-slate-500 group-hover:text-white transition-colors ml-1"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
