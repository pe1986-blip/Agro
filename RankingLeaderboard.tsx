
import React, { useMemo } from 'react';
import { Trophy, Medal, ChevronRight, TrendingUp, MapPin, Search } from 'lucide-react';
import { useRealTimeData } from './services/realTimeSyncService';
import { formatNumber } from './constants';

interface RankingLeaderboardProps {
    selectedCityId: number;
    onSelectCity: (id: number) => void;
}

const RankingLeaderboard: React.FC<RankingLeaderboardProps> = ({ selectedCityId, onSelectCity }) => {
    // Fixed: hook only returns { municipiosData, rankings, isLoading }.
    const { rankings, isLoading } = useRealTimeData();

    const getScoreColor = (score: number) => {
        if (score >= 7.5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 5.0) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy size={16} className="text-yellow-500" />;
        if (index === 1) return <Medal size={16} className="text-slate-400" />;
        if (index === 2) return <Medal size={16} className="text-amber-700" />;
        return <span className="text-[10px] font-black text-slate-400">#{index + 1}</span>;
    };

    if (isLoading) return (
        <div className="flex flex-col gap-4 p-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 w-full bg-slate-100 animate-pulse rounded-xl"></div>
            ))}
        </div>
    );

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden animate-fade-in">
            <div className="p-4 border-b bg-slate-50">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-600" />
                    Ranking de Prioridade
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Algoritmo RogerLens v3.5</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {rankings.map((op, index) => {
                    const isSelected = selectedCityId === op.municipio_id;
                    const scoreStyle = getScoreColor(op.score);

                    return (
                        <button
                            key={op.municipio_id}
                            onClick={() => onSelectCity(op.municipio_id)}
                            className={`w-full p-4 flex items-center gap-3 border-b border-slate-50 transition-all text-left group hover:bg-slate-50 ${isSelected ? 'bg-blue-50/50 ring-2 ring-inset ring-blue-500/20' : ''}`}
                        >
                            <div className="w-6 flex justify-center shrink-0">
                                {getRankIcon(index)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-black truncate ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {op.municipality.split(' (')[0]}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-0.5">
                                        <MapPin size={8} /> {op.municipality.split(' (')[1].replace(')', '')}
                                    </span>
                                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                    <span className="text-[9px] font-bold text-slate-500">Demanda: {op.factors.marketPotential}/10</span>
                                </div>
                            </div>

                            <div className={`px-2 py-1 rounded-lg border text-xs font-black shadow-sm shrink-0 transition-transform group-hover:scale-110 ${scoreStyle}`}>
                                {op.score.toFixed(1)}
                            </div>
                            
                            <ChevronRight size={14} className={`shrink-0 transition-all ${isSelected ? 'text-blue-500 translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                        </button>
                    );
                })}
            </div>

            <div className="p-3 bg-slate-900 text-white text-center">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Total Analisado</p>
                <p className="text-sm font-black">{rankings.length} MUNICÍPIOS</p>
            </div>
        </div>
    );
};

export default RankingLeaderboard;
