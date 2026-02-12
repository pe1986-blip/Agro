
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Search } from 'lucide-react';
import { MUNICIPIOS_PERFIL, formatNumber } from './constants';
import type { MunicipioPerfil } from './types';
import L from 'leaflet';

// Ícones coloridos para diferenciar os mapas
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MiniMapCard = ({ city, color }: { city: MunicipioPerfil, color: string }) => (
    <div className={`absolute bottom-24 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border-l-4 shadow-xl z-[1000] ${color === 'blue' ? 'border-blue-500' : 'border-red-500'}`}>
        <h4 className="font-black text-sm uppercase text-slate-800 flex justify-between items-center">
            {city.nome} <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{city.estado}</span>
        </h4>
        <div className="grid grid-cols-3 gap-2 mt-3 text-center divide-x divide-slate-100">
            <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PIB Agro</p>
                <p className="text-sm font-black text-slate-800">R$ {city.pib_agro_bi}B</p>
            </div>
            <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">População</p>
                <p className="text-sm font-black text-slate-800">{formatNumber(city.populacao_total)}</p>
            </div>
            <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">IES</p>
                <p className="text-sm font-black text-slate-800">{city.educacao.total_ies_ativas}</p>
            </div>
        </div>
    </div>
);

const SplitMapComparison: React.FC = () => {
    // Inicializa com cidades diferentes para mostrar o contraste
    const [leftCityId, setLeftCityId] = useState<number>(MUNICIPIOS_PERFIL[0].municipio_id); // Ex: Goiânia
    const [rightCityId, setRightCityId] = useState<number>(MUNICIPIOS_PERFIL[2]?.municipio_id || MUNICIPIOS_PERFIL[0].municipio_id); // Ex: Sorriso

    const leftCity = MUNICIPIOS_PERFIL.find(c => c.municipio_id === leftCityId) || MUNICIPIOS_PERFIL[0];
    const rightCity = MUNICIPIOS_PERFIL.find(c => c.municipio_id === rightCityId) || MUNICIPIOS_PERFIL[0];

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 shadow-inner relative">
            
            {/* VS Badge Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-full font-black italic border-4 border-slate-50 shadow-2xl pointer-events-none">
                VS
            </div>

            {/* LEFT MAP (Blue) */}
            <div className="flex-1 relative border-r-2 border-white">
                <div className="absolute top-4 left-4 z-[1000] w-64">
                    <div className="relative group">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-700 transition-colors" />
                        <select 
                            value={leftCityId} 
                            onChange={(e) => setLeftCityId(Number(e.target.value))}
                            className="w-full bg-white/90 backdrop-blur pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-lg border border-blue-100 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all"
                        >
                            {MUNICIPIOS_PERFIL.map(city => (
                                <option key={city.municipio_id} value={city.municipio_id}>{city.nome} ({city.estado})</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <MapContainer 
                    key={`left-${leftCityId}`} 
                    center={[leftCity.latitude, leftCity.longitude]} 
                    zoom={10} 
                    style={{ height: '100%', width: '100%' }} 
                    zoomControl={false}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                    <Marker position={[leftCity.latitude, leftCity.longitude]} icon={blueIcon} />
                </MapContainer>
                
                <MiniMapCard city={leftCity} color="blue" />
            </div>

            {/* RIGHT MAP (Red) */}
            <div className="flex-1 relative border-l-2 border-white">
                <div className="absolute top-4 right-4 z-[1000] w-64">
                    <div className="relative group">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 group-hover:text-red-700 transition-colors" />
                        <select 
                            value={rightCityId} 
                            onChange={(e) => setRightCityId(Number(e.target.value))}
                            className="w-full bg-white/90 backdrop-blur pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-lg border border-red-100 outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer hover:bg-white transition-all"
                        >
                            {MUNICIPIOS_PERFIL.map(city => (
                                <option key={city.municipio_id} value={city.municipio_id}>{city.nome} ({city.estado})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <MapContainer 
                    key={`right-${rightCityId}`} 
                    center={[rightCity.latitude, rightCity.longitude]} 
                    zoom={10} 
                    style={{ height: '100%', width: '100%' }} 
                    zoomControl={false}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                    <Marker position={[rightCity.latitude, rightCity.longitude]} icon={redIcon} />
                </MapContainer>

                <MiniMapCard city={rightCity} color="red" />
            </div>
        </div>
    );
};

export default SplitMapComparison;
