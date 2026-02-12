
import React, { useMemo, useState, useEffect } from 'react';
import { 
    AlertOctagon, Target, MapPin, TrendingUp, ShieldAlert, 
    Crosshair, Zap, Activity, Globe, ArrowRight, Eye,
    ExternalLink, Swords, X, CheckSquare, Square, Search,
    ShieldCheck, ChevronDown, Gavel
} from 'lucide-react';
import { MUNICIPIOS_PERFIL, formatNumber } from './constants';
import { calculateGrowthOpportunity } from './growthOpportunityService';
import type { MunicipioPerfil, RegulatoryAct } from './types';
import ComparativeDashboard from './ComparativeDashboard';
import GeographicSkillsHeatmap from './GeographicSkillsHeatmap';
import { getGlobalSignals } from './services/regulatoryService'; // NOVO IMPORT

interface GlobalWarRoomProps {
    onSelectCity: (id: number) => void;
    onNavigateToMap: () => void;
    initialComparisonIds?: number[];
}

const GlobalWarRoom: React.FC<GlobalWarRoomProps> = ({ onSelectCity, onNavigateToMap, initialComparisonIds }) => {
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [comparisonIds, setComparisonIds] = useState<number[]>([]);
    const [showBattle, setShowBattle] = useState(false);
    const [globalSignals, setGlobalSignals] = useState<RegulatoryAct[]>([]);
    const [isLoadingSignals, setIsLoadingSignals] = useState(true);

    // Auto-start battle if props provided
    useEffect(() => {
        if (initialComparisonIds && initialComparisonIds.length > 0) {
            setComparisonIds(initialComparisonIds);
            if (initialComparisonIds.length === 2) {
                setShowBattle(true);
            }
        }
    }, [initialComparisonIds]);

    // Load Signals
    useEffect(() => {
        const load = async () => {
            const signals = await getGlobalSignals();
            setGlobalSignals(signals);
            setIsLoadingSignals(false);
        };
        load();
    }, []);

    const handleCitySelection = (id: number) => {
        setSelectedCityId(id);
        onSelectCity(id);
    };

    // Inteligência: Separação de Alvos vs Unidades
    const intelData = useMemo(() => {
        const allCities = MUNICIPIOS_PERFIL.map(city => {
            const opp = calculateGrowthOpportunity(city);
            return { ...city, score: opp.score, tier: opp.tier };
        });

        // 1. Minhas Unidades (Defesa)
        const myUnits = allCities
            .filter(c => c.hasCampus || c.isUnaHub)
            .sort((a, b) => b.score - a.score);

        // 2. Alvos de Expansão (Ataque) - Exclui as unidades que já tenho
        const expansionTargets = allCities
            .filter(c => !c.hasCampus && !c.isUnaHub)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);
        
        // 3. Sleeper Cells (Oportunidades Escondidas)
        const sleeperCells = allCities
            .filter(c => !c.hasCampus && c.educacao.total_ies_ativas < 8 && c.agro.pib_agro_bi > 1.0)
            .sort((a, b) => b.agro.pib_agro_bi - a.agro.pib_agro_bi)
            .slice(0, 4);

        // 4. Zonas de Conflito (Onde o inimigo é forte e eu não estou)
        const highRiskZones = allCities
            .filter(c => !c.hasCampus && c.educacao.total_ies_ativas > 15)
            .sort((a, b) => b.educacao.total_ies_ativas - a.educacao.total_ies_ativas)
            .slice(0, 4);

        return { myUnits, expansionTargets, highRiskZones, sleeperCells, totalMarkets: allCities.length };
    }, []);

    const toggleComparison = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setComparisonIds(prev => {
            if (prev.includes(id)) return prev.filter(c => c !== id);
            if (prev.length >= 2) return [prev[1], id]; 
            return [...prev, id];
        });
    };

    const startBattle = () => {
        if (comparisonIds.length === 2) setShowBattle(true);
    };

    return (
        <div className="flex h-full bg-slate-950 text-white overflow-hidden animate-fade-in relative group">
            
            {/* PAINEL LATERAL ESQUERDO (LISTA DE COMANDO) */}
            <aside className="w-96 flex flex-col border-r border-white/10 bg-slate-950 z-20 shadow-2xl shrink-0">
                
                {/* Header Compacto */}
                <div className="p-5 border-b border-white/10 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse-slow">
                            <Crosshair size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black uppercase tracking-widest leading-none text-white">War Room</h1>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">
                                {intelData.totalMarkets} Alvos Ativos
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Scrollável */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                    
                    {/* Seção 1: Minhas Unidades (Friendly Forces) */}
                    {intelData.myUnits.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                                <ShieldCheck size={14} className="text-blue-500"/> Nossas Fortalezas
                            </h3>
                            <div className="space-y-2">
                                {intelData.myUnits.map(city => {
                                    const isSelected = selectedCityId === city.municipio_id;
                                    return (
                                        <div 
                                            key={city.municipio_id} 
                                            onClick={() => handleCitySelection(city.municipio_id)}
                                            className={`group relative border rounded-xl p-3 transition-all flex items-center justify-between cursor-pointer
                                                ${isSelected 
                                                    ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                                                    : 'bg-blue-900/10 border-blue-500/30 hover:bg-blue-900/20'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck size={16} className="text-blue-400 shrink-0"/>
                                                <div>
                                                    <p className="font-bold text-xs text-blue-100 group-hover:text-white">{city.nome}</p>
                                                    <p className="text-[9px] text-blue-300/60 uppercase font-bold">{city.tier} • Operação Ativa</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={(e) => toggleComparison(city.municipio_id, e)}
                                                    className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-white"
                                                >
                                                    {comparisonIds.includes(city.municipio_id) ? <CheckSquare size={14}/> : <Square size={14}/>}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Seção 2: Top Targets (Expansion) */}
                    <div>
                        <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                            <Target size={14}/> Alvos Prioritários
                        </h3>
                        <div className="space-y-2">
                            {intelData.expansionTargets.map((city, idx) => {
                                const isSelected = selectedCityId === city.municipio_id;
                                const isCompared = comparisonIds.includes(city.municipio_id);
                                return (
                                    <div 
                                        key={city.municipio_id} 
                                        onClick={() => handleCitySelection(city.municipio_id)}
                                        className={`group relative border rounded-xl p-3 transition-all flex items-center justify-between cursor-pointer
                                            ${isSelected 
                                                ? 'bg-amber-600/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                                                : 'bg-slate-900/50 border-white/5 hover:border-amber-500/30 hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`text-sm font-black ${isSelected ? 'text-amber-400' : 'text-slate-600 group-hover:text-slate-400'}`}>0{idx + 1}</div>
                                            <div>
                                                <p className="font-bold text-xs text-slate-200 group-hover:text-white">{city.nome}</p>
                                                <p className="text-[9px] text-slate-500 uppercase font-bold">{city.tier} • {city.estado}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-emerald-400">{city.score?.toFixed(1)}</span>
                                            <button 
                                                onClick={(e) => toggleComparison(city.municipio_id, e)}
                                                className={`p-1 rounded hover:bg-white/10 ${isCompared ? 'text-orange-400' : 'text-slate-600'}`}
                                            >
                                                {isCompared ? <CheckSquare size={14}/> : <Square size={14}/>}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Seção 3: Signal Radar (NOVO) */}
                    <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-1">
                            <Gavel size={14} className="text-red-500"/> Sismógrafo Regulatório
                        </h3>
                        <div className="space-y-3">
                            {isLoadingSignals ? (
                                <div className="text-center py-4 text-[10px] text-slate-500 animate-pulse">Buscando sinais...</div>
                            ) : (
                                globalSignals.slice(0, 5).map(signal => (
                                    <div key={signal.id} className="flex gap-3 items-start group p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${signal.impactLevel === 'High' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                                        <div>
                                            <p className="text-[10px] text-slate-300 leading-snug group-hover:text-white font-bold">
                                                {signal.title}
                                            </p>
                                            <p className="text-[9px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                                                {signal.summary}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 opacity-60">
                                                <span className="text-[8px] font-black uppercase text-blue-300">{signal.org}</span>
                                                <span className="text-[8px]">{new Date(signal.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

                {/* Footer de Ação */}
                {comparisonIds.length > 0 && (
                    <div className="p-4 border-t border-white/10 bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">{comparisonIds.length}/2 Selecionados</span>
                            <button onClick={() => setComparisonIds([])} className="text-[10px] text-slate-500 hover:text-white">Limpar</button>
                        </div>
                        <button 
                            onClick={startBattle}
                            disabled={comparisonIds.length !== 2}
                            className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                                ${comparisonIds.length === 2 
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20' 
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }
                            `}
                        >
                            <Swords size={14}/> Iniciar War Game
                        </button>
                    </div>
                )}
            </aside>

            {/* ÁREA PRINCIPAL: MAPA TÁTICO EMBARCADO */}
            <main className="flex-1 relative z-10 bg-slate-900 overflow-hidden">
                <GeographicSkillsHeatmap 
                    selectedCityId={selectedCityId || 0} 
                    onSelectCity={handleCitySelection}
                    onCompare={() => {}} 
                    hideSidebar={true} 
                />
                
                {/* Overlay de Status do Sistema */}
                <div className="absolute top-6 right-6 z-[40] flex flex-col gap-2 items-end pointer-events-none">
                    <span className="px-3 py-1.5 bg-slate-900/90 backdrop-blur border border-white/10 text-emerald-400 text-[10px] font-bold rounded-lg flex items-center gap-2 shadow-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                        SATÉLITE ONLINE
                    </span>
                </div>

                {/* TACTICAL OVERLAY (BATTLE MODE) */}
                <div 
                    className={`absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md transition-transform duration-500 ease-in-out flex flex-col ${showBattle ? 'translate-y-0' : 'translate-y-full'}`}
                >
                    <div className="w-full flex justify-center pt-2 pb-1 cursor-pointer" onClick={() => setShowBattle(false)}>
                        <div className="w-16 h-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"></div>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        <button 
                            onClick={() => setShowBattle(false)}
                            className="absolute top-6 right-8 z-[60] bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-white/10 hover:bg-slate-700 transition-all shadow-xl"
                            title="Fechar War Game"
                        >
                            <ChevronDown size={24} />
                        </button>

                        {showBattle && (
                            <ComparativeDashboard 
                                cities={MUNICIPIOS_PERFIL.filter(c => comparisonIds.includes(c.municipio_id))} 
                                onBack={() => setShowBattle(false)} 
                            />
                        )}
                    </div>
                </div>

            </main>

        </div>
    );
};

export default GlobalWarRoom;
