
import React, { useState, useEffect } from 'react';
import { 
    Gavel, FileText, AlertTriangle, CheckCircle2, Search, 
    Filter, Calendar, ExternalLink, Scale, Building2, Globe
} from 'lucide-react';
import { getRegulatoryActs } from './services/regulatoryService';
import type { RegulatoryAct, MunicipioPerfil } from './types';
import SkeletonLoader from './SkeletonLoader';

interface RegulatoryDeepDiveProps {
    city: MunicipioPerfil;
}

const ActCard: React.FC<{ act: RegulatoryAct }> = ({ act }) => {
    const impactColor = {
        'High': 'border-l-4 border-l-red-500 bg-red-50/50',
        'Medium': 'border-l-4 border-l-amber-500 bg-amber-50/50',
        'Low': 'border-l-4 border-l-slate-300 bg-white'
    }[act.impactLevel];

    const sentimentIcon = {
        'Positive': <CheckCircle2 size={16} className="text-emerald-500" />,
        'Negative': <AlertTriangle size={16} className="text-red-500" />,
        'Neutral': <Scale size={16} className="text-slate-400" />
    }[act.sentiment];

    return (
        <div className={`p-4 rounded-xl border border-slate-200 shadow-sm mb-3 hover:shadow-md transition-all ${impactColor}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded text-white uppercase tracking-wider ${act.source === 'DOU' ? 'bg-blue-600' : (act.source === 'DOE' ? 'bg-purple-600' : 'bg-slate-600')}`}>
                        {act.source}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Calendar size={12}/> {new Date(act.date).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {sentimentIcon}
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{act.impactLevel} Impact</span>
                </div>
            </div>
            
            <h4 className="text-sm font-bold text-slate-800 mb-1 leading-snug">{act.title}</h4>
            <p className="text-xs text-slate-500 mb-3">{act.org}</p>
            
            <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs text-slate-600 italic leading-relaxed mb-3">
                "{act.summary}"
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {act.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
                <a 
                    href={act.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Buscar fonte original"
                >
                    Acessar Fonte <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

const RegulatoryThermometer: React.FC<{ acts: RegulatoryAct[] }> = ({ acts }) => {
    const high = acts.filter(a => a.impactLevel === 'High').length;
    const positive = acts.filter(a => a.sentiment === 'Positive').length;
    const negative = acts.filter(a => a.sentiment === 'Negative').length;
    
    // Score de 0 a 100 (Quanto mais alto, mais quente/ativo é o ambiente regulatório)
    const activityScore = Math.min(100, (acts.length * 5) + (high * 10));
    
    let status = "Estável";
    let color = "text-slate-500";
    if (activityScore > 70) { status = "Ebulição Regulatória"; color = "text-red-600"; }
    else if (activityScore > 40) { status = "Movimentação Moderada"; color = "text-amber-600"; }

    return (
        <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6 flex items-center justify-between shadow-xl">
            <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-2">
                    <Gavel size={16}/> Temperatura Política
                </h3>
                <p className={`text-2xl font-black ${color}`}>{status}</p>
            </div>
            <div className="flex gap-6 text-center">
                <div>
                    <span className="block text-2xl font-black">{acts.length}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Atos (30d)</span>
                </div>
                <div>
                    <span className="block text-2xl font-black text-emerald-400">{positive}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Favoráveis</span>
                </div>
                <div>
                    <span className="block text-2xl font-black text-red-400">{negative}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Riscos</span>
                </div>
            </div>
        </div>
    );
};

const RegulatoryDeepDive: React.FC<RegulatoryDeepDiveProps> = ({ city }) => {
    const [acts, setActs] = useState<RegulatoryAct[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'All' | 'High' | 'Positive'>('All');

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getRegulatoryActs(city.municipio_id);
            setActs(data);
            setLoading(false);
        };
        load();
    }, [city]);

    const filteredActs = acts.filter(a => {
        if (filter === 'High') return a.impactLevel === 'High';
        if (filter === 'Positive') return a.sentiment === 'Positive';
        return true;
    });

    if (loading) return <SkeletonLoader variant="card" className="h-[400px]" />;

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            
            {/* Header / Thermometer */}
            <RegulatoryThermometer acts={acts} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Feed */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                            <FileText size={20} className="text-blue-600"/> Diário Oficial (Feed)
                        </h3>
                        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                            <button onClick={() => setFilter('All')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${filter === 'All' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>Todos</button>
                            <button onClick={() => setFilter('High')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${filter === 'High' ? 'bg-red-50 text-red-600' : 'text-slate-400 hover:text-slate-600'}`}>Críticos</button>
                            <button onClick={() => setFilter('Positive')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${filter === 'Positive' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>Oportunidades</button>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 h-[600px] overflow-y-auto custom-scrollbar">
                        {filteredActs.length > 0 ? (
                            filteredActs.map(act => <ActCard key={act.id} act={act} />)
                        ) : (
                            <div className="text-center py-20 text-slate-400">Nenhum ato encontrado com este filtro.</div>
                        )}
                    </div>
                </div>

                {/* Sidebar Analysis */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Building2 size={14}/> Radar Municipal
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            A prefeitura de {city.nome} mostra tendência de <strong>incentivo à industrialização</strong>. O volume de atos relacionados a zoneamento e uso do solo cresceu 15% no último trimestre.
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Dica Tática</p>
                            <p className="text-xs text-slate-500">
                                Monitore as licitações de obras. Onde há obra viária, haverá expansão urbana e demanda por cursos presenciais.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Globe size={14}/> Sinais Federais
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                                <p className="text-xs text-slate-600">MEC aumentou rigor para novos cursos EAD.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <p className="text-xs text-slate-600">Plano Safra prioriza agricultura de baixo carbono.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegulatoryDeepDive;
