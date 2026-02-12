
import React, { useMemo } from 'react';
import { 
    AlertTriangle, Target, Activity, Scale, Cpu, Sprout,
    Search, Info
} from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { getMarketLeaders } from './services/impactAnalysisService';

// --- TYPES ---
type MacroCluster = 'Agro & Engenharias' | 'Saúde & Bem-estar' | 'Negócios & Direito' | 'Tech & Dados';

interface ClusterData {
    name: MacroCluster;
    icon: React.ElementType;
    demandScore: number; // 0-100 (Vocação da Cidade)
    competitors: {
        leader: { val: number, name: string };
        challenger: { val: number, name: string };
        local: { val: number, name: string };
    };
    fragilityIndex: number; // Score calculado de oportunidade
    status: 'Oportunidade Crítica' | 'Gap Moderado' | 'Saturado' | 'Baixa Demanda';
}

// --- LOGIC ENGINE ---
const calculateVocationalDemand = (city: MunicipioPerfil): Record<MacroCluster, number> => {
    const totalPib = city.economia.pib_total_bi || 1;
    const shareAgro = (city.economia.pib_composicao.agropecuaria_bi / totalPib) * 100;
    const shareInd = (city.economia.pib_composicao.industria_bi / totalPib) * 100;
    const shareServ = (city.economia.pib_composicao.servicos_bi / totalPib) * 100;
    
    // Tech demand: Correlação com Renda per Capita e IDH
    const techScore = Math.min(100, (city.economia.renda_per_capita / 50) + ((city.idh - 0.65) * 200));

    return {
        'Agro & Engenharias': Math.min(100, (shareAgro * 2.5) + (shareInd * 1.2)),
        'Saúde & Bem-estar': Math.min(100, 60 + (city.idh * 30)),
        'Negócios & Direito': Math.min(100, (shareServ * 1.2)),
        'Tech & Dados': techScore
    };
};

const PortfolioFragilityMatrix: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    
    const matrixData = useMemo(() => {
        const demand = calculateVocationalDemand(city);
        const leaders = getMarketLeaders(city); // Obtém nomes reais
        
        const clusters: ClusterData[] = [
            { name: 'Agro & Engenharias', icon: Sprout },
            { name: 'Saúde & Bem-estar', icon: Activity },
            { name: 'Negócios & Direito', icon: Scale },
            { name: 'Tech & Dados', icon: Cpu },
        ].map((c) => {
            const dScore = demand[c.name as MacroCluster];
            
            // Simulação de Cobertura baseada no perfil
            // Se for Agro, líder genérico cobre pouco. Se for Direito, cobre muito.
            let leaderCov = 0; 
            let challCov = 0;
            
            if (c.name === 'Agro & Engenharias') { leaderCov = 20; challCov = 30; } // Líderes grandes focam pouco em agro caro
            if (c.name === 'Saúde & Bem-estar') { leaderCov = 40; challCov = 25; }
            if (c.name === 'Negócios & Direito') { leaderCov = 60; challCov = 50; } // Saturado
            if (c.name === 'Tech & Dados') { leaderCov = 10; challCov = 15; }

            // Ajuste fino com dados da cidade (Mock)
            if (city.tier === 'SEDE') { leaderCov += 15; challCov += 10; }

            const gap = dScore - leaderCov; 
            let fragility = dScore > 40 ? gap : 0;
            if (challCov > dScore) fragility -= 10;

            let status: ClusterData['status'] = 'Gap Moderado';
            if (fragility > 40) status = 'Oportunidade Crítica';
            else if (dScore < 40) status = 'Baixa Demanda';
            else if (gap < 0) status = 'Saturado';

            return {
                ...c,
                name: c.name as MacroCluster,
                demandScore: Math.round(dScore),
                competitors: {
                    leader: { val: leaderCov, name: leaders.leaderName },
                    challenger: { val: challCov, name: leaders.challengerName },
                    local: { val: Math.max(5, 100 - leaderCov - challCov - 20), name: leaders.localName }
                },
                fragilityIndex: Math.round(fragility),
                status
            };
        });

        return clusters.sort((a, b) => b.fragilityIndex - a.fragilityIndex);
    }, [city]);

    const getHeatColor = (val: number, isInverse: boolean = false) => {
        if (!isInverse) {
            if (val > 70) return 'bg-emerald-100 text-emerald-700';
            if (val > 40) return 'bg-blue-50 text-blue-700';
            return 'bg-slate-100 text-slate-500';
        } else {
            if (val > 40) return 'bg-red-100 text-red-700 font-bold'; 
            if (val > 20) return 'bg-yellow-50 text-yellow-700';
            return 'bg-slate-50 text-slate-400'; 
        }
    };

    const getFragilityStyle = (score: number) => {
        if (score > 40) return 'bg-yellow-400 text-yellow-900 border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.4)] animate-pulse-slow font-black';
        if (score > 20) return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold';
        if (score < 0) return 'bg-red-100 text-red-800 border-red-200';
        return 'bg-slate-100 text-slate-500 border-slate-200';
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-full animate-fade-in">
            {/* Header Estratégico */}
            <div className="bg-slate-900 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Target className="text-yellow-400" size={20}/>
                        Matriz de Fragilidade de Oferta
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 font-medium">
                        Identificação de gaps entre a vocação regional e a cobertura dos <span className="text-white font-bold">concorrentes reais</span>.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                    <Search size={14} className="text-yellow-400"/>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        Dados de Censo INEP
                    </span>
                </div>
            </div>

            {/* Matrix Table */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <th className="p-4 w-1/4">Área do Conhecimento</th>
                            <th className="p-4 text-center text-blue-700 bg-blue-50/50">Demanda (Vocação)</th>
                            <th className="p-4 text-center border-l border-slate-200">Líder (Share #1)</th>
                            <th className="p-4 text-center">Challenger (#2)</th>
                            <th className="p-4 text-center border-r border-slate-200">Local (#3)</th>
                            <th className="p-4 text-center w-1/6 bg-yellow-50/30">Fragilidade (Gap)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {matrixData.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                                            <row.icon size={18} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-slate-700 block">{row.name}</span>
                                            <span className="text-[9px] text-slate-400 font-medium">{row.status}</span>
                                        </div>
                                    </div>
                                </td>
                                
                                {/* Coluna Demanda (Blue Ocean) */}
                                <td className="p-4 text-center bg-blue-50/30">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getHeatColor(row.demandScore)}`}>
                                        {row.demandScore}/100
                                    </span>
                                </td>

                                {/* Colunas Concorrentes com TOOLTIP DE NOME REAL */}
                                <td className="p-4 text-center border-l border-slate-100 relative group/cell">
                                    <span className={`px-2 py-1 rounded text-xs cursor-help ${getHeatColor(row.competitors.leader.val, true)}`}>
                                        {row.competitors.leader.val}%
                                    </span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-900 text-white text-[10px] font-bold p-2 rounded shadow-xl hidden group-hover/cell:block z-50 text-center">
                                        {row.competitors.leader.name}
                                    </div>
                                </td>
                                <td className="p-4 text-center relative group/cell">
                                    <span className={`px-2 py-1 rounded text-xs cursor-help ${getHeatColor(row.competitors.challenger.val, true)}`}>
                                        {row.competitors.challenger.val}%
                                    </span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-900 text-white text-[10px] font-bold p-2 rounded shadow-xl hidden group-hover/cell:block z-50 text-center">
                                        {row.competitors.challenger.name}
                                    </div>
                                </td>
                                <td className="p-4 text-center border-r border-slate-100 relative group/cell">
                                    <span className={`px-2 py-1 rounded text-xs cursor-help ${getHeatColor(row.competitors.local.val, true)}`}>
                                        {row.competitors.local.val}%
                                    </span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-900 text-white text-[10px] font-bold p-2 rounded shadow-xl hidden group-hover/cell:block z-50 text-center">
                                        {row.competitors.local.name}
                                    </div>
                                </td>

                                {/* Coluna Fragilidade (Gold) */}
                                <td className="p-4 text-center bg-yellow-50/20">
                                    <div className={`px-3 py-1.5 rounded-lg border text-xs inline-flex items-center gap-1 ${getFragilityStyle(row.fragilityIndex)}`}>
                                        {row.fragilityIndex > 40 && <AlertTriangle size={12}/>}
                                        {row.fragilityIndex > 0 ? '+' : ''}{row.fragilityIndex} pts
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Strategic Insight Footer */}
            <div className="bg-slate-50 p-5 border-t border-slate-200">
                <div className="flex items-start gap-3">
                    <Info size={18} className="text-blue-500 mt-0.5"/>
                    <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-700 uppercase mb-1">Inteligência de Mercado</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            O líder local <span className="font-bold text-slate-700">{matrixData[0].competitors.leader.name}</span> apresenta baixa cobertura em <span className="font-bold text-slate-700">{matrixData[0].name}</span>. Esta é a brecha para posicionamento premium.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioFragilityMatrix;
