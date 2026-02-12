import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker, GeoJSON } from 'react-leaflet';
import { Loader2, Search, CheckSquare, Square, TrendingUp, Shield, Truck, Sprout, GraduationCap, Layers, Globe, FileText, Wifi, Landmark, Clock, Filter, ShieldCheck, Leaf } from 'lucide-react';
import { useRealTimeData } from './services/realTimeSyncService';
import { getAgroDataForMunicipio } from './agroService';
import { MUNICIPIOS_PERFIL } from './constants';
import type { MunicipioPerfil } from './types';
import L from 'leaflet';

// Ícone para Concorrentes
const competitorIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -28],
    shadowSize: [32, 32]
});

// Ícone para Nossas Unidades (Friendly Forces)
const friendlyIcon = new L.DivIcon({
    className: 'bg-transparent',
    html: `<div class="w-8 h-8 bg-blue-600 rounded-lg border-2 border-white shadow-xl flex items-center justify-center text-white relative">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

interface EnrichedData extends MunicipioPerfil {
  compliancePct: number;
  totalCarProperties: number;
  score: number;
  factors: any;
  reasoning: string;
}

type LensType = 'opportunity' | 'risk' | 'logistics' | 'car' | 'credit' | 'connectivity';
type MapStyle = 'dark' | 'satellite' | 'light';

const LENS_CONFIG: Record<LensType, { label: string, icon: React.ReactNode, color: string }> = {
    opportunity: { label: 'POTENCIAL 2030', icon: <TrendingUp size={14}/>, color: '#3b82f6' },
    risk: { label: 'RISCO CLIMÁTICO', icon: <Shield size={14}/>, color: '#f59e0b' },
    logistics: { label: 'LOGÍSTICA & PIB', icon: <Truck size={14}/>, color: '#8b5cf6' },
    car: { label: 'CONFORMIDADE CAR', icon: <Sprout size={14}/>, color: '#10b981' },
    credit: { label: 'CRÉDITO (INVEST.)', icon: <Landmark size={14}/>, color: '#0ea5e9' }, 
    connectivity: { label: 'CONECTIVIDADE', icon: <Wifi size={14}/>, color: '#ec4899' }
};

const MAP_STYLES: Record<MapStyle, { url: string, attribution: string, label: string }> = {
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; CartoDB',
        label: 'Dark Data'
    },
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri',
        label: 'Satélite'
    },
    light: {
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; CartoDB',
        label: 'Clean Light'
    }
};

const getMetricValue = (item: EnrichedData, lens: LensType, yearOffset: number): number => {
    const growthFactor = 1 + (yearOffset * (item.cagr_ing_total_2023 / 100));
    
    switch(lens) {
        case 'opportunity': return Math.min(10, item.score * (1 + (yearOffset * 0.02))); 
        case 'risk': return item.factors.competitionRisk; 
        case 'logistics': return item.pib_agro_bi * growthFactor;
        case 'car': return Math.min(100, item.compliancePct + (yearOffset * 1.5));
        case 'credit': return item.economia.financas_agro?.credito_rural.razao_investimento || 0; 
        case 'connectivity': return item.economia.macro_cenario?.competitividade.conectividade_rural_pct || 0; 
    }
};

const getMarkerColor = (value: number, lens: LensType): string => {
    if (lens === 'opportunity') {
        if (value >= 8.5) return '#10b981';
        if (value >= 7.0) return '#3b82f6';
        if (value >= 5.0) return '#f59e0b';
        return '#ef4444';
    }
    if (lens === 'risk') {
        if (value > 7) return '#ef4444';
        if (value > 4) return '#f59e0b';
        return '#10b981';
    }
    if (lens === 'car' || lens === 'connectivity') {
        if (value > 80) return '#10b981';
        if (value > 50) return '#f59e0b';
        return '#ef4444';
    }
    if (lens === 'credit') {
        if (value > 40) return '#10b981'; 
        if (value > 20) return '#3b82f6';
        return '#94a3b8'; 
    }
    if (lens === 'logistics') {
        if (value > 5) return '#7c3aed';
        if (value > 2) return '#a78bfa';
        return '#ddd6fe';
    }
    return '#3b82f6';
};

const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        if (center && !isNaN(center[0])) {
            map.flyTo(center, zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
};

const generateCompetitors = (city: MunicipioPerfil) => {
    const count = Math.min(5, Math.ceil(city.educacao.total_ies_ativas / 5));
    const competitors = [];
    for(let i=0; i<count; i++) {
        const lat = city.latitude + (Math.random() - 0.5) * 0.05;
        const lng = city.longitude + (Math.random() - 0.5) * 0.05;
        competitors.push({ id: `comp-${city.municipio_id}-${i}`, lat, lng, name: `IES Concorrente ${i+1}` });
    }
    return competitors;
};

interface GeographicSkillsHeatmapProps {
  onCompare: (ids: number[]) => void;
  selectedCityId: number;
  onSelectCity: (id: number) => void;
  hideSidebar?: boolean; 
}

const GeographicSkillsHeatmap: React.FC<GeographicSkillsHeatmapProps> = ({ onCompare, selectedCityId, onSelectCity, hideSidebar = false }) => {
    const { rankings, municipiosData } = useRealTimeData();
    const [enrichedData, setEnrichedData] = useState<EnrichedData[]>([]);
    const [isLoadingEnrichment, setIsLoadingEnrichment] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [comparisonIds, setComparisonIds] = useState<number[]>([]);
    const [activeLens, setActiveLens] = useState<LensType>('opportunity');
    const [currentMapStyle, setCurrentMapStyle] = useState<MapStyle>('dark');
    const [geoData, setGeoData] = useState<any>(null);
    
    const [currentYear, setCurrentYear] = useState(2024);
    const [showCompetitors, setShowCompetitors] = useState(false);
    const [vocationFilter, setVocationFilter] = useState('Todas');

    // Carrega GeoJSON do Brasil para contraste visual - FONTE ESTÁVEL
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/codeforamerica/click_container/master/Cookie_Jar/brazil_geo.json')
            .then(res => {
                if (!res.ok) throw new Error('Falha no GeoJSON');
                return res.json();
            })
            .then(data => setGeoData(data))
            .catch(err => console.warn("Erro ao carregar GeoJSON do Brasil:", err));
    }, []);

    useEffect(() => {
        if (!rankings.length || !municipiosData.length) return;

        const enrichData = async () => {
            setIsLoadingEnrichment(true);
            const enrichedPromises = rankings.map(async (op) => {
                const profile = municipiosData.find(m => m.municipio_id === op.municipio_id);
                if (!profile) return null;
                const agroData = await getAgroDataForMunicipio(op.municipio_id); 
                return {
                    ...profile,
                    score: op.score,
                    factors: op.factors,
                    reasoning: op.reasoning,
                    compliancePct: agroData?.conformidade_ambiental_pct || 0,
                    totalCarProperties: agroData?.car_propriedades_cadastradas || 0,
                };
            });
            const resolved = await Promise.all(enrichedPromises);
            setEnrichedData(resolved.filter((item): item is EnrichedData => item !== null));
            setIsLoadingEnrichment(false);
        };
        enrichData();
    }, [rankings, municipiosData]);

    const yearOffset = currentYear - 2024;

    const filteredData = useMemo(() => {
        return enrichedData.filter(d => {
            const matchesSearch = d.nome.toLowerCase().includes(searchTerm.toLowerCase());
            
            let matchesVocation = true;
            if (vocationFilter !== 'Todas') {
                if (vocationFilter === 'Amazonia') {
                    matchesVocation = d.isAmazoniaLegal === true;
                } else if (vocationFilter === 'Grãos') {
                    matchesVocation = d.agro.nivel_tecnologico === 'Alto' && d.regiao === 'Centro-Oeste';
                } 
                else if (vocationFilter === 'Pecuária') {
                    matchesVocation = d.regiao === 'Centro-Oeste' && d.agro.nivel_tecnologico !== 'Alto';
                }
                else if (vocationFilter === 'Cana & Energia') {
                    matchesVocation = (d.estado === 'SP' || d.estado === 'GO' || d.estado === 'MS') && d.agro.pib_agro_bi > 0.5;
                }
            }

            return matchesSearch && matchesVocation;
        });
    }, [enrichedData, searchTerm, vocationFilter]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => getMetricValue(b, activeLens, yearOffset) - getMetricValue(a, activeLens, yearOffset));
    }, [filteredData, activeLens, yearOffset]);

    const mapCenter: [number, number] = useMemo(() => {
        const active = enrichedData.find(d => d.municipio_id === selectedCityId);
        return active ? [active.latitude, active.longitude] : [-14.235, -51.9253];
    }, [enrichedData, selectedCityId]);

    const activeCompetitors = useMemo(() => {
        if (!showCompetitors) return [];
        return filteredData.flatMap(city => generateCompetitors(city));
    }, [showCompetitors, filteredData]);

    return (
        <div className="flex h-full bg-white relative">
            
            {/* LENS SELECTOR */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 pointer-events-auto max-w-full overflow-x-auto px-4 scrollbar-hide">
                <div className="flex bg-slate-900/90 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl gap-1">
                    {(Object.entries(LENS_CONFIG) as [LensType, any][]).map(([key, cfg]) => (
                        <button
                            key={key}
                            onClick={() => setActiveLens(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeLens === key ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {cfg.icon} <span className="hidden lg:inline">{cfg.label}</span>
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={() => setShowCompetitors(!showCompetitors)}
                    className={`p-2.5 rounded-full border shadow-xl transition-all ${showCompetitors ? 'bg-red-600 text-white border-red-500' : 'bg-white text-slate-400 border-slate-200 hover:text-red-500'}`}
                    title="Exibir Concorrentes"
                >
                    <GraduationCap size={16} />
                </button>

                <button 
                    onClick={() => setCurrentMapStyle(prev => prev === 'dark' ? 'satellite' : (prev === 'satellite' ? 'light' : 'dark'))}
                    className="p-2.5 rounded-full bg-white text-slate-600 border border-slate-200 shadow-xl hover:bg-slate-50 transition-all"
                    title={`Estilo do Mapa: ${MAP_STYLES[currentMapStyle].label}`}
                >
                    {currentMapStyle === 'satellite' ? <Globe size={16} className="text-blue-600"/> : <Layers size={16}/>}
                </button>
            </div>

            {!hideSidebar && (
            <aside className="w-85 bg-white border-r flex flex-col h-full z-10 shadow-2xl relative">
                <div className="p-6 border-b bg-slate-50/50">
                    <div className="relative mb-4">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input 
                            type="text" placeholder="Filtrar cidade..." value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-4 bg-white p-1 rounded-lg border border-slate-200">
                        <Filter size={14} className="text-slate-400 ml-2"/>
                        <select 
                            value={vocationFilter}
                            onChange={(e) => setVocationFilter(e.target.value)}
                            className="w-full bg-transparent text-xs font-bold text-slate-600 outline-none py-1 cursor-pointer"
                        >
                            <option value="Todas">Todas as Vocações</option>
                            <option value="Amazonia" className="text-emerald-600 font-black">🌱 Amazônia Legal</option>
                            <optgroup label="Grandes Culturas">
                                <option value="Grãos">🌱 Grãos & Tecnologia</option>
                                <option value="Cana & Energia">⚡ Cana & Bioenergia</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ranking Ativo</span>
                        <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full">{sortedData.length} Unidades</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {isLoadingEnrichment ? (
                        <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={32}/></div>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {sortedData.map(item => {
                                const isGlobal = selectedCityId === item.municipio_id;
                                const isComparing = comparisonIds.includes(item.municipio_id);
                                const value = getMetricValue(item, activeLens, yearOffset);
                                const color = getMarkerColor(value, activeLens);

                                return (
                                    <li 
                                        key={item.municipio_id}
                                        onClick={() => onSelectCity(item.municipio_id)}
                                        className={`p-4 cursor-pointer transition-all border-l-4 group ${isGlobal ? 'bg-blue-50/50 border-blue-600 ring-1 ring-inset ring-blue-500/10' : 'border-transparent hover:bg-slate-50'}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    {item.hasCampus && <ShieldCheck size={14} className="text-blue-500 shrink-0"/>}
                                                    <h4 className={`font-black text-xs uppercase tracking-tight truncate ${isGlobal ? 'text-blue-900' : 'text-slate-800'}`}>{item.nome}</h4>
                                                    {item.isAmazoniaLegal && <Leaf size={12} className="text-emerald-500 shrink-0"/>}
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">{item.reasoning}</p>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-1">
                                                <span className="text-base font-black tracking-tighter" style={{ color }}>
                                                    {activeLens === 'car' || activeLens === 'credit' || activeLens === 'connectivity' ? `${Math.round(value)}%` : value.toFixed(1)}
                                                </span>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setComparisonIds(prev => prev.includes(item.municipio_id) ? prev.filter(id => id !== item.municipio_id) : [...prev, item.municipio_id]); }}
                                                    className={`p-1 rounded-md transition-colors ${isComparing ? 'text-orange-500 bg-orange-50' : 'text-slate-300 hover:text-blue-500'}`}
                                                >
                                                    {isComparing ? <CheckSquare size={14}/> : <Square size={14}/>}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {comparisonIds.length > 0 && (
                    <div className="p-4 bg-slate-900 border-t border-white/10 animate-fade-in">
                        <button 
                            onClick={() => onCompare(comparisonIds)}
                            className="w-full bg-blue-600 text-white font-black py-3 rounded-xl shadow-xl shadow-blue-600/30 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                        >
                            <CheckSquare size={14}/> Comparar {comparisonIds.length} Cidades
                        </button>
                    </div>
                )}
            </aside>
            )}

            <main className="flex-1 relative bg-slate-100 z-0">
                <MapContainer center={mapCenter} zoom={4} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer 
                        url={MAP_STYLES[currentMapStyle].url} 
                        attribution={MAP_STYLES[currentMapStyle].attribution}
                    />
                    
                    {geoData && (
                        <GeoJSON 
                            data={geoData} 
                            style={{
                                color: "#0f172a",
                                weight: 2.5,
                                opacity: 0.3,
                                fillColor: "#1e293b",
                                fillOpacity: 0.8
                            }}
                        />
                    )}

                    <MapController center={mapCenter} zoom={selectedCityId ? 10 : 4} />
                    
                    {sortedData.map(item => {
                         const value = getMetricValue(item, activeLens, yearOffset);
                         const color = getMarkerColor(value, activeLens);
                         const isGlobal = selectedCityId === item.municipio_id;
                         const isComparing = comparisonIds.includes(item.municipio_id);
                         
                         const baseRadius = isGlobal ? 8 : 3; 
                         const isPercentage = ['car', 'credit', 'connectivity'].includes(activeLens);
                         const scaleFactor = isPercentage ? 0.08 : 0.5; 
                         const radius = Math.max(3, baseRadius + (value * scaleFactor));

                         if (item.hasCampus || item.isUnaHub) {
                             return (
                                <Marker
                                    key={item.municipio_id}
                                    position={[item.latitude, item.longitude]}
                                    icon={friendlyIcon}
                                    eventHandlers={{ click: () => onSelectCity(item.municipio_id) }}
                                >
                                    <Popup>
                                        <div className="p-1 min-w-[120px]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ShieldCheck size={16} className="text-blue-600"/>
                                                <div className="font-black text-slate-900 uppercase text-xs">Unidade Ativa</div>
                                            </div>
                                            <div className="font-bold text-slate-700 text-sm">{item.nome}</div>
                                            {item.isAmazoniaLegal && (
                                                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold mt-1">
                                                    <Leaf size={10}/> Amazônia Legal
                                                </div>
                                            )}
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onSelectCity(item.municipio_id); }}
                                                className="w-full mt-2 bg-blue-600 text-white text-[9px] font-bold uppercase py-1.5 rounded hover:bg-blue-700 flex items-center justify-center gap-1"
                                            >
                                                <FileText size={10}/> Ver Performance
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                             );
                         }

                         return (
                            <CircleMarker
                                key={item.municipio_id}
                                center={[item.latitude, item.longitude]}
                                pathOptions={{ 
                                    color: isComparing ? '#f59e0b' : (isGlobal ? '#fff' : color), 
                                    fillColor: color, 
                                    fillOpacity: 0.8,
                                    weight: isGlobal || isComparing ? 3 : 1
                                }}
                                radius={radius}
                                eventHandlers={{ click: () => onSelectCity(item.municipio_id) }}
                            >
                                <Popup>
                                    <div className="p-2 text-center min-w-[150px]">
                                        <div className="font-black text-slate-900 uppercase text-xs mb-1">
                                            {item.nome}
                                            {item.isAmazoniaLegal && <Leaf size={14} className="inline ml-1 text-emerald-500" />}
                                        </div>
                                        <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest border-t pt-1 mt-1 mb-2">
                                            {LENS_CONFIG[activeLens].label}: {isPercentage ? `${value.toFixed(0)}%` : value.toFixed(1)}
                                        </div>
                                        {item.isAmazoniaLegal && (
                                            <div className="mb-2 bg-emerald-50 border border-emerald-100 p-1.5 rounded text-[9px] font-medium text-emerald-800">
                                                Requer Compliance Ambiental Estrito (CAR/ESG)
                                            </div>
                                        )}
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onSelectCity(item.municipio_id); }}
                                            className="w-full bg-slate-900 text-white text-[9px] font-bold uppercase py-1.5 rounded hover:bg-slate-700 flex items-center justify-center gap-1"
                                        >
                                            <FileText size={10}/> Abrir Dossiê
                                        </button>
                                    </div>
                                </Popup>
                            </CircleMarker>
                         );
                    })}

                    {showCompetitors && activeCompetitors.map((comp, idx) => (
                        <Marker 
                            key={idx}
                            position={[comp.lat, comp.lng]} 
                            icon={competitorIcon}
                        >
                            <Popup>
                                <div className="text-[10px] font-bold text-red-600 uppercase">{comp.name}</div>
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>
            </main>

            {/* LEGENDA TÁTICA ATUALIZADA */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-2xl pointer-events-auto">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Legenda Estratégica</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-lg bg-blue-600 border border-white"></div>
                        <span className="text-[10px] font-bold text-slate-700 uppercase">Unidade Ânima Ativa</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Leaf size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Amazônia Legal (CAR Rigoroso)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Oportunidade Alvo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeographicSkillsHeatmap;