
import React, { useMemo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import { Building, Tractor, Users, MapPin, Briefcase, Truck, Sprout, ShoppingBag, Wrench, Factory, Route } from 'lucide-react';
import L from 'leaflet';
import { MUNICIPIOS_PERFIL } from './constants';
import type { MunicipioPerfil } from './types';

// --- TYPES ---
type ValueChainPosition = 'Antes da Porteira' | 'Dentro da Porteira' | 'Depois da Porteira';

interface Partner {
  id: number;
  name: string;
  position: ValueChainPosition;
  category: string;
  employees: number;
  lat: number;
  lng: number;
  distanceKm: number;
}

interface PartnershipClusterMapProps {
  municipality: string;
  cityProfile?: MunicipioPerfil;
}

// --- CONFIG ---
const iconPerson = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const getMarkerIcon = (position: ValueChainPosition) => {
    let color = 'blue';
    if (position === 'Antes da Porteira') color = 'orange';
    if (position === 'Dentro da Porteira') color = 'green';
    if (position === 'Depois da Porteira') color = 'red';

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

const TAXONOMY = {
    'Antes da Porteira': {
        'Insumos & Sementes': ['Bayer Crops', 'Corteva Agriscience', 'Syngenta', 'Yara Fertilizantes', 'AgroGalaxy'],
        'Maquinário & Revenda': ['John Deere Concessionária', 'Case IH Revenda', 'New Holland Dealer', 'AgroPeças'],
        'AgTech & Serviços': ['Solinftec', 'Climate FieldView', 'AgroDados Consultoria', 'Rural Bank', 'Drones & Maps']
    },
    'Dentro da Porteira': {
        'Produção Agrícola': ['Fazenda Santa Fé', 'Grupo Maggi', 'Fazenda Planalto', 'Agropecuária Futuro', 'Sementes Ouro', 'Grupo Bom Futuro', 'SLC Agrícola']
    },
    'Depois da Porteira': {
        'Agroindústria': ['BRF Processamento', 'JBS Unidade', 'Aurora Alimentos', 'Cargill Processing', 'Bunge Alimentos'],
        'Logística & Trading': ['Rumo Logística', 'VLI Multimodal', 'Coop. Transportes', 'Armazéns Gerais', 'Amaggi Export'],
        'Varejo & Consumo': ['Atacadão Distribuidora', 'Rede de Supermercados', 'Ceasa Regional']
    }
};

const generatePartners = (centerLat: number, centerLng: number, municipalityName: string): Partner[] => {
    const partners: Partner[] = [];
    let idCounter = 0;
    const seedStr = municipalityName;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
        seed += seedStr.charCodeAt(i);
    }
    const seededRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    const pickRandom = (arr: string[]) => arr[Math.floor(seededRandom() * arr.length)];

    const clusterConfig = [
        { pos: 'Antes da Porteira', count: 4 + Math.floor(seededRandom() * 4) },
        { pos: 'Dentro da Porteira', count: 5 + Math.floor(seededRandom() * 5) },
        { pos: 'Depois da Porteira', count: 3 + Math.floor(seededRandom() * 4) }
    ];

    clusterConfig.forEach(config => {
        for (let i = 0; i < config.count; i++) {
            const position = config.pos as ValueChainPosition;
            const categories = Object.keys(TAXONOMY[position as keyof typeof TAXONOMY]);
            const category = pickRandom(categories);
            const companies = TAXONOMY[position as keyof typeof TAXONOMY][category as keyof typeof TAXONOMY['Antes da Porteira']]; 
            const name = pickRandom(companies as string[]);
            const latOffset = (seededRandom() - 0.5) * 0.4; 
            const lngOffset = (seededRandom() - 0.5) * 0.4;
            const lat = centerLat + latOffset;
            const lng = centerLng + lngOffset;
            
            partners.push({
                id: idCounter++,
                name: `${name} ${String.fromCharCode(65 + i)}`,
                position,
                category,
                employees: Math.floor(seededRandom() * 600) + 20,
                lat,
                lng,
                distanceKm: Math.floor(Math.sqrt(latOffset*latOffset + lngOffset*lngOffset) * 111)
            });
        }
    });
    return partners;
};

// Gerador de Corredores Logísticos (Mock)
const generateLogisticsCorridors = (centerLat: number, centerLng: number) => {
    // Eixo Norte-Sul (Rodovia)
    const roadPoints: [number, number][] = [
        [centerLat + 0.5, centerLng - 0.1],
        [centerLat, centerLng],
        [centerLat - 0.5, centerLng + 0.1]
    ];
    // Eixo Leste-Oeste (Ferrovia ou Vicinal)
    const railPoints: [number, number][] = [
        [centerLat + 0.1, centerLng - 0.6],
        [centerLat - 0.05, centerLng],
        [centerLat - 0.15, centerLng + 0.6]
    ];
    return { roadPoints, railPoints };
};

const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 10);
    }, [center, map]);
    return null;
};

// --- MAIN COMPONENT ---
const PartnershipClusterMap: React.FC<PartnershipClusterMapProps> = ({ municipality, cityProfile }) => {
    const [showCorridors, setShowCorridors] = useState(true);

    const center: [number, number] = useMemo(() => {
        if (cityProfile) return [cityProfile.latitude, cityProfile.longitude];
        const cleanName = municipality.split(' (')[0].trim();
        const cityData = MUNICIPIOS_PERFIL.find(m => 
            m.nome.toLowerCase() === cleanName.toLowerCase() || 
            municipality.toLowerCase().includes(m.nome.toLowerCase())
        );
        if (cityData) return [cityData.latitude, cityData.longitude];
        return [-15.793889, -47.882778]; 
    }, [municipality, cityProfile]);

    const partners = useMemo(() => generatePartners(center[0], center[1], municipality), [center, municipality]);
    const corridors = useMemo(() => generateLogisticsCorridors(center[0], center[1]), [center]);

    const metrics = useMemo(() => {
        const totalVagas = partners.reduce((acc, p) => acc + (p.employees * 0.08), 0);
        const positionCounts = partners.reduce((acc, p) => {
            acc[p.position] = (acc[p.position] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return { totalVagas: Math.floor(totalVagas), positionCounts };
    }, [partners]);

    const sortedPartners = useMemo(() => [...partners].sort((a,b) => b.employees - a.employees).slice(0, 6), [partners]);

    return (
        <div className="bg-white rounded-[2rem] shadow-none border-0 flex flex-col h-full animate-fade-in overflow-hidden relative">
            
            {/* CONTROLS OVERLAY */}
            <div className="absolute top-4 right-4 z-[1000] flex gap-2">
                <button 
                    onClick={() => setShowCorridors(!showCorridors)}
                    className={`bg-white px-3 py-2 rounded-lg shadow-md text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${showCorridors ? 'text-blue-600 border-blue-200' : 'text-slate-400 border-slate-200'}`}
                >
                    <Route size={14} /> Corredores
                </button>
            </div>

            <div className="p-4 border-b bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                        <MapPin size={16} className="text-purple-600"/>
                        Ecossistema de Infraestrutura: {cityProfile ? cityProfile.nome : municipality.split(' (')[0]}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Raio de Influência Logística e Industrial (50km)</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-[9px] font-black rounded-md flex items-center gap-1 uppercase" title="Insumos, Máquinas, Serviços, Tecnologia">
                        <Wrench size={10}/> {metrics.positionCounts['Antes da Porteira'] || 0} Antes
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-black rounded-md flex items-center gap-1 uppercase" title="Fazendas, Produtores">
                        <Sprout size={10}/> {metrics.positionCounts['Dentro da Porteira'] || 0} Dentro
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-[9px] font-black rounded-md flex items-center gap-1 uppercase" title="Indústria, Logística, Varejo">
                        <Factory size={10}/> {metrics.positionCounts['Depois da Porteira'] || 0} Depois
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col lg:flex-row h-full overflow-hidden">
                {/* Map */}
                <div className="flex-1 h-[400px] lg:h-full relative z-0 min-h-[400px]">
                    <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%', minHeight: '400px' }} zoomControl={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />
                        <MapUpdater center={center} />
                        
                        <Circle 
                            center={center} 
                            radius={30000} 
                            pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.05, dashArray: '10, 10' }} 
                        />

                        {/* Corredores Logísticos */}
                        {showCorridors && (
                            <>
                                <Polyline positions={corridors.roadPoints} pathOptions={{ color: '#f59e0b', weight: 4, opacity: 0.7 }}>
                                    <Popup>Rodovia Principal (Eixo de Escoamento)</Popup>
                                </Polyline>
                                <Polyline positions={corridors.railPoints} pathOptions={{ color: '#374151', weight: 3, dashArray: '5, 10', opacity: 0.8 }}>
                                    <Popup>Ramal Ferroviário / Vicinal</Popup>
                                </Polyline>
                            </>
                        )}

                        <Marker position={center} icon={iconPerson}>
                            <Popup><strong>Nova Unidade Educacional</strong><br/>Hub Central em {municipality}</Popup>
                        </Marker>

                        {partners.map(partner => (
                            <Marker 
                                key={partner.id} 
                                position={[partner.lat, partner.lng]} 
                                icon={getMarkerIcon(partner.position)}
                            >
                                <Popup>
                                    <div className="text-sm min-w-[180px]">
                                        <div className={`text-[10px] font-bold uppercase mb-1 px-1.5 py-0.5 rounded w-fit text-white
                                            ${partner.position === 'Antes da Porteira' ? 'bg-orange-500' : 
                                              partner.position === 'Dentro da Porteira' ? 'bg-green-600' : 'bg-red-500'}`}>
                                            {partner.position}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-base leading-tight">{partner.name}</h4>
                                        <p className="text-xs text-blue-600 font-semibold mt-0.5">{partner.category}</p>
                                        
                                        <div className="mt-2 border-t pt-2 space-y-1">
                                            <p className="flex items-center gap-1 text-gray-600 text-xs"><Users size={12}/> ~{partner.employees} Funcionários</p>
                                            <p className="flex items-center gap-1 text-gray-800 text-xs font-bold"><Briefcase size={12}/> Potencial: {Math.floor(partner.employees * 0.08)} Estágios</p>
                                            <p className="text-[10px] text-gray-400 mt-1 text-right">{partner.distanceKm}km de distância</p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Sidebar Metrics */}
                <div className="w-full lg:w-72 bg-white p-4 border-l border-gray-200 overflow-y-auto lg:h-full custom-scrollbar z-10 shadow-xl">
                    <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest mb-4">Absorção de Mercado</h4>
                    
                    <div className="bg-slate-50 p-3 rounded-xl shadow-sm mb-3 border border-slate-100">
                        <p className="text-[9px] text-slate-500 uppercase tracking-wide font-black">Potencial de Vagas (Estágio/Jr)</p>
                        <p className="text-2xl font-black text-blue-700 mt-1">{metrics.totalVagas} <span className="text-[10px] font-bold text-slate-400 uppercase">vagas/ano</span></p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl shadow-sm mb-4 border border-slate-100">
                        <p className="text-[9px] text-slate-500 uppercase tracking-wide font-black mb-2">Distribuição na Cadeia</p>
                        <div className="space-y-2">
                            <div>
                                <div className="flex justify-between text-[9px] font-bold mb-1">
                                    <span className="text-orange-700 uppercase">Antes da Porteira</span>
                                    <span>{metrics.positionCounts['Antes da Porteira'] || 0}</span>
                                </div>
                                <div className="w-full bg-orange-100 h-1.5 rounded-full"><div className="bg-orange-500 h-1.5 rounded-full" style={{width: `${(metrics.positionCounts['Antes da Porteira'] / partners.length) * 100}%`}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[9px] font-bold mb-1">
                                    <span className="text-green-700 uppercase">Dentro da Porteira</span>
                                    <span>{metrics.positionCounts['Dentro da Porteira'] || 0}</span>
                                </div>
                                <div className="w-full bg-green-100 h-1.5 rounded-full"><div className="bg-green-600 h-1.5 rounded-full" style={{width: `${(metrics.positionCounts['Dentro da Porteira'] / partners.length) * 100}%`}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[9px] font-bold mb-1">
                                    <span className="text-red-700 uppercase">Depois da Porteira</span>
                                    <span>{metrics.positionCounts['Depois da Porteira'] || 0}</span>
                                </div>
                                <div className="w-full bg-red-100 h-1.5 rounded-full"><div className="bg-red-500 h-1.5 rounded-full" style={{width: `${(metrics.positionCounts['Depois da Porteira'] / partners.length) * 100}%`}}></div></div>
                            </div>
                        </div>
                    </div>

                    <h5 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mt-4 mb-2">Principais Empregadores</h5>
                    <ul className="space-y-2">
                        {sortedPartners.map(p => (
                            <li key={p.id} className="text-xs bg-white p-2 rounded-lg border border-slate-100 hover:shadow-md transition-all cursor-default">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-slate-700 truncate w-32" title={p.name}>{p.name}</span>
                                    <span className={`w-2 h-2 rounded-full mt-1 
                                        ${p.position === 'Antes da Porteira' ? 'bg-orange-500' : 
                                          p.position === 'Dentro da Porteira' ? 'bg-green-600' : 'bg-red-500'}`}></span>
                                </div>
                                <div className="flex justify-between mt-1 text-[9px] font-medium text-slate-500">
                                    <span>{p.category}</span>
                                    <span>{p.employees} func.</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PartnershipClusterMap;
