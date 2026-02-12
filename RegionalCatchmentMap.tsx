
import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, useMap } from 'react-leaflet';
import { ArrowDownToLine, GraduationCap, School, Bus, MapPin, ArrowUpRight, AlertCircle } from 'lucide-react';
import type { MunicipioPerfil, CatchmentNode } from './types';
import L from 'leaflet';

// Ícone para o Polo (Azul)
const destIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-10 h-10 bg-blue-700 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white animate-bounce-slow">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// Ícone para o Hub de Destino (quando a cidade é pequena e exporta alunos)
const hubIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="w-8 h-8 bg-purple-700 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

// --- BASE DE DADOS DE SATÉLITES REAIS ---
// Mapeia cidades vizinhas reais para os principais hubs
const REAL_SATELLITES_DB: Record<string, Array<{name: string, dist: number, latOffset: number, lngOffset: number}>> = {
    'Goiânia': [
        { name: 'Aparecida de Goiânia', dist: 15, latOffset: -0.05, lngOffset: 0.02 },
        { name: 'Trindade', dist: 25, latOffset: 0.01, lngOffset: -0.15 },
        { name: 'Senador Canedo', dist: 18, latOffset: -0.03, lngOffset: 0.1 },
        { name: 'Goianira', dist: 30, latOffset: 0.08, lngOffset: -0.05 },
        { name: 'Anápolis', dist: 50, latOffset: 0.3, lngOffset: -0.05 } // Hub secundário
    ],
    'Rio Verde': [
        { name: 'Santa Helena de Goiás', dist: 35, latOffset: -0.15, lngOffset: -0.1 },
        { name: 'Jataí', dist: 90, latOffset: 0.05, lngOffset: -0.8 }, // Vizinho distante
        { name: 'Montividiu', dist: 45, latOffset: 0.2, lngOffset: 0.1 },
        { name: 'Santo Antônio da Barra', dist: 50, latOffset: -0.3, lngOffset: 0.1 }
    ],
    'Cuiabá': [
        { name: 'Várzea Grande', dist: 10, latOffset: -0.05, lngOffset: -0.05 },
        { name: 'Chapada dos Guimarães', dist: 65, latOffset: 0.2, lngOffset: 0.3 },
        { name: 'Santo Antônio', dist: 30, latOffset: -0.15, lngOffset: 0.1 }
    ],
    'Sorriso': [
        { name: 'Lucas do Rio Verde', dist: 60, latOffset: -0.4, lngOffset: -0.2 },
        { name: 'Nova Ubiratã', dist: 80, latOffset: 0.3, lngOffset: 0.4 },
        { name: 'Ipiranga do Norte', dist: 70, latOffset: 0.1, lngOffset: -0.5 }
    ]
};

// Mapa de Destino de Evasão para cidades pequenas (Onde a P1 manda seus alunos?)
const EVASION_DESTINATIONS: Record<string, {name: string, latOffset: number, lngOffset: number}> = {
    'MT': { name: 'Cuiabá (Capital)', latOffset: 1.5, lngOffset: 1.5 },
    'GO': { name: 'Goiânia (Capital)', latOffset: -1.2, lngOffset: 1.0 },
    'MS': { name: 'Campo Grande (Capital)', latOffset: 1.0, lngOffset: 1.0 },
    'PR': { name: 'Curitiba (Capital)', latOffset: 0.8, lngOffset: 1.5 },
    'MG': { name: 'Belo Horizonte (Capital)', latOffset: -1.0, lngOffset: 1.0 },
    'SP': { name: 'São Paulo (Capital)', latOffset: 0.5, lngOffset: 0.5 },
    'BA': { name: 'Salvador (Capital)', latOffset: 1.0, lngOffset: 2.0 },
};

// Componente para forçar o enquadramento automático
const MapAutoBounds = ({ nodes }: { nodes: CatchmentNode[] }) => {
    const map = useMap();
    useEffect(() => {
        const validCoords = nodes.filter(n => !isNaN(n.lat) && !isNaN(n.lng));
        if (validCoords.length > 0) {
            const bounds = L.latLngBounds(validCoords.map(n => [n.lat, n.lng]));
            map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
        }
    }, [nodes, map]);
    return null;
};

// Lógica de Modelo Gravitacional
const calculateFlow = (centerCity: MunicipioPerfil, viewMode: 'superior' | 'basico'): { nodes: CatchmentNode[], role: 'Hub' | 'Feeder', totalFlow: number } => {
    if (!centerCity.latitude || !centerCity.longitude) return { nodes: [], role: 'Hub', totalFlow: 0 };

    // 1. Determinar Papel na Rede (Hub vs Feeder)
    // Regra Rígida: P1 e P2 são Feeders (Exportam). Sedes e P3 são Hubs (Importam).
    const isHub = centerCity.tier === 'SEDE' || centerCity.tier === 'P3' || centerCity.demografia.populacao_total > 150000;
    const role = isHub ? 'Hub' : 'Feeder';

    let nodes: CatchmentNode[] = [];
    let totalFlow = 0;

    if (isHub) {
        // LÓGICA DE HUB (IMPORTAÇÃO)
        // Tenta usar satélites reais, se não, gera sintéticos APENAS se for um grande centro
        const realSatellites = REAL_SATELLITES_DB[centerCity.nome];
        
        if (realSatellites) {
            nodes = realSatellites.map((sat, i) => {
                const students = Math.floor(1000 / (sat.dist + 1) * (viewMode === 'superior' ? 1 : 2.5)); 
                totalFlow += students;
                return {
                    id: `sat-${i}`,
                    name: sat.name,
                    lat: centerCity.latitude + sat.latOffset,
                    lng: centerCity.longitude + sat.lngOffset,
                    students,
                    distanceKm: sat.dist,
                    type: 'Satelite'
                };
            });
        } else {
             // Se for P3/Sede mas não tiver satélites mapeados, mostra "Captação Local" em vez de inventar
             // Isso evita a alucinação de dados em cidades médias isoladas
             // NENHUM NÓ ADICIONADO. Apenas o centro.
        }
    } else {
        // LÓGICA DE FEEDER (EVASÃO)
        // Gera um vetor único para o Hub Estadual/Regional
        const dest = EVASION_DESTINATIONS[centerCity.estado] || EVASION_DESTINATIONS['MT'];
        
        // Simula a posição do Hub (apenas visual, relativo)
        const latHub = centerCity.latitude + dest.latOffset;
        const lngHub = centerCity.longitude + dest.lngOffset;
        
        // Estimativa de Evasão (30% dos concluintes vão embora)
        const outflow = Math.floor(centerCity.demografia.concluintes_em * 0.3); 
        totalFlow = outflow;

        nodes.push({
            id: 'magnet-hub',
            name: dest.name,
            lat: latHub,
            lng: lngHub,
            students: outflow,
            distanceKm: 200, // Distância simbólica média
            type: 'Polo' // Neste caso, o "Polo" é o destino externo
        });
    }

    return { nodes, role, totalFlow };
};

const RegionalCatchmentMap: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const [viewMode, setViewMode] = useState<'superior' | 'basico'>('superior');

    const { nodes: satellites, role, totalFlow } = useMemo(() => calculateFlow(city, viewMode), [city, viewMode]);
    const hasSatellites = satellites.length > 0;

    return (
        <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
            
            {/* TOOLBAR EXECUTIVA */}
            <div className="p-5 border-b bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        {role === 'Hub' ? <ArrowDownToLine size={20} className="text-blue-600"/> : <ArrowUpRight size={20} className="text-rose-500"/>}
                        {role === 'Hub' ? `Magnetismo de Captação` : `Risco de Evasão Regional`}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        {role === 'Hub' ? 'Polo Importador de Alunos' : 'Município Exportador de Talentos'}
                    </p>
                </div>
                
                <div className="flex bg-white rounded-2xl p-1 shadow-inner border border-slate-200">
                    <button 
                        onClick={() => setViewMode('superior')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${viewMode === 'superior' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <GraduationCap size={14}/> Superior
                    </button>
                    <button 
                        onClick={() => setViewMode('basico')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${viewMode === 'basico' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <School size={14}/> Básico
                    </button>
                </div>
            </div>

            {/* AREA DO MAPA */}
            <div className="flex-1 relative">
                <MapContainer 
                    center={[city.latitude, city.longitude]} 
                    zoom={9} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    scrollWheelZoom={false}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    
                    <MapAutoBounds nodes={[...satellites, { lat: city.latitude, lng: city.longitude, id: 'center', name: city.nome, students: 0, distanceKm: 0, type: 'Polo' }]} />

                    {satellites.map((node) => (
                        <React.Fragment key={node.id}>
                            {/* Linha de Fluxo */}
                            <Polyline 
                                positions={[[node.lat, node.lng], [city.latitude, city.longitude]]}
                                pathOptions={{
                                    color: role === 'Hub' ? '#2563eb' : '#f43f5e', // Azul (Importa) ou Vermelho (Exporta)
                                    weight: Math.max(2, node.students / 50),
                                    dashArray: '10, 15',
                                    opacity: 0.6,
                                    lineCap: 'round'
                                }}
                            />
                            
                            {/* Marcador do Satélite ou Destino */}
                            <CircleMarker
                                center={[node.lat, node.lng]}
                                radius={role === 'Hub' ? 4 + (node.students / 50) : 8} // Se Hub, satélites variam. Se Feeder, destino é grande.
                                pathOptions={{
                                    fillColor: role === 'Hub' ? '#3b82f6' : '#9333ea',
                                    color: 'white',
                                    weight: 2,
                                    fillOpacity: 0.8
                                }}
                            >
                                <Popup>
                                    <div className="p-1 text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">{role === 'Hub' ? 'Origem' : 'Destino da Evasão'}</p>
                                        <p className="font-bold text-slate-800">{node.name}</p>
                                        <div className="mt-2 pt-2 border-t border-slate-100">
                                            <p className="text-xs text-blue-600 font-bold">{node.students} Alunos</p>
                                            <p className="text-[9px] text-slate-400 uppercase font-black">Fluxo Estimado</p>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>

                            {/* Se for Feeder, mostrar ícone de Hub no destino */}
                            {role === 'Feeder' && (
                                <Marker position={[node.lat, node.lng]} icon={hubIcon}></Marker>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Marcador da Cidade Atual */}
                    <Marker position={[city.latitude, city.longitude]} icon={destIcon}>
                        <Popup>
                            <div className="text-center p-1">
                                <p className="text-[10px] font-black text-blue-600 uppercase">{role === 'Hub' ? 'Polo Receptor' : 'Cidade de Origem'}</p>
                                <p className="font-black text-lg text-slate-900">{city.nome}</p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* KPI OVERLAY */}
                <div className="absolute bottom-6 left-6 z-[400] flex flex-col gap-3">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-2xl flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${role === 'Hub' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                            <Bus size={24}/>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{role === 'Hub' ? 'Fluxo de Entrada' : 'Fluxo de Saída'}</p>
                            <p className="text-2xl font-black text-slate-900">{totalFlow > 0 ? totalFlow : '---'} <span className="text-xs font-bold text-slate-500">alunos/ano</span></p>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* LISTA DE SATÉLITES OU AVISO DE ISOLAMENTO */}
            <div className="bg-slate-50 p-6 border-t border-slate-200">
                {hasSatellites && role === 'Hub' ? (
                    <>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <MapPin size={12}/> Principais Cidades Fornecedoras
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {satellites.map(sat => (
                                <div key={sat.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <p className="font-bold text-slate-800 text-xs truncate" title={sat.name}>{sat.name}</p>
                                    <div className="mt-2 flex justify-between items-end">
                                        <span className="text-[10px] font-black text-blue-600">{sat.students} est.</span>
                                        <span className="text-[9px] font-bold text-slate-400">{sat.distanceKm}km</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : role === 'Hub' ? (
                    <div className="text-center py-4 text-slate-500 text-xs flex items-center justify-center gap-2">
                        <AlertCircle size={16} className="text-amber-500"/>
                        Captação predominantemente local. Baixo fluxo pendular detectado.
                    </div>
                ) : (
                    <div className="text-center py-4 text-slate-500 text-xs flex items-center justify-center gap-2">
                        <ArrowUpRight size={16} className="text-rose-500"/>
                        Mercado exportador. Alunos buscam centros maiores para graduação.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegionalCatchmentMap;
