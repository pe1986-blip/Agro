
import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import { Download, Loader2, Globe, ShieldCheck, Zap, Target, Layers } from 'lucide-react';
import L from 'leaflet';
import { MUNICIPIOS_PERFIL } from './constants';
import { exportElementAsPNG } from './services/reportService';

/**
 * ÂNIMA BRAND PALETTE - DARK STRATEGY EDITION
 * Magenta: #B51E84 (Potencial Agro)
 * Ciano: #42B4E4 (Unidade Ativa)
 * Laranja: #F58220 (Alvo Prioritário)
 * DeepBackground: #1a1526 (Deep Purple Brand)
 */

const opIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="relative group">
           <div class="absolute -inset-2 bg-[#42B4E4]/30 rounded-full blur-md group-hover:bg-[#42B4E4]/50 transition-all"></div>
           <div class="relative w-4 h-4 bg-[#42B4E4] rounded-full border-2 border-white shadow-[0_0_15px_rgba(66,180,228,0.9)] flex items-center justify-center text-white">
             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
           </div>
         </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10]
});

const targetIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div class="relative">
            <span class="absolute -inset-3 rounded-full bg-[#F58220] opacity-30 animate-ping"></span>
            <div class="relative w-8 h-8 bg-gradient-to-br from-[#F58220] to-[#F0483E] rounded-full border-2 border-white shadow-[0_0_20px_rgba(245,130,32,0.8)] flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

// --- LISTA COMPLETA DE UNIDADES ÂNIMA (TABELA FORNECIDA) ---
const STRATEGIC_NETWORK = [
    // MINAS GERAIS
    { name: "Belo Horizonte", uf: "MG", lat: -19.9167, lng: -43.9345, type: "operation" },
    { name: "Betim", uf: "MG", lat: -19.9677, lng: -44.1983, type: "operation" },
    { name: "Bom Despacho", uf: "MG", lat: -19.7360, lng: -45.2531, type: "operation" },
    { name: "Contagem", uf: "MG", lat: -19.9320, lng: -44.0537, type: "operation" },
    { name: "Divinópolis", uf: "MG", lat: -20.1450, lng: -44.8911, type: "operation" },
    { name: "Itabira", uf: "MG", lat: -19.6197, lng: -43.2269, type: "operation" },
    { name: "Pouso Alegre", uf: "MG", lat: -22.2287, lng: -45.9309, type: "operation" },
    { name: "Sete Lagoas", uf: "MG", lat: -19.4664, lng: -44.2467, type: "operation" },
    { name: "Uberlândia", uf: "MG", lat: -18.9186, lng: -48.2772, type: "operation" },
    { name: "Conselheiro Lafaiete", uf: "MG", lat: -20.6606, lng: -43.7850, type: "operation" },
    { name: "Vespasiano", uf: "MG", lat: -19.6917, lng: -43.9231, type: "operation" },

    // SÃO PAULO
    { name: "São Paulo", uf: "SP", lat: -23.5505, lng: -46.6333, type: "operation" },
    { name: "São José dos Campos", uf: "SP", lat: -23.2237, lng: -45.9009, type: "operation" },
    { name: "Piracicaba", uf: "SP", lat: -22.7233, lng: -47.6478, type: "operation" },

    // SANTA CATARINA
    { name: "Blumenau", uf: "SC", lat: -26.9194, lng: -49.0661, type: "operation" },
    { name: "Jaraguá do Sul", uf: "SC", lat: -26.4842, lng: -49.0844, type: "operation" },
    { name: "Joinville", uf: "SC", lat: -26.3044, lng: -48.8464, type: "operation" },
    { name: "São Bento do Sul", uf: "SC", lat: -26.2494, lng: -49.3794, type: "operation" },
    { name: "Tubarão", uf: "SC", lat: -28.4740, lng: -49.0245, type: "operation" },
    { name: "Florianópolis", uf: "SC", lat: -27.5954, lng: -48.5480, type: "operation" },
    { name: "Palhoça", uf: "SC", lat: -27.6470, lng: -48.6700, type: "operation" },
    { name: "Braço do Norte", uf: "SC", lat: -28.2747, lng: -49.1650, type: "operation" },
    { name: "Içara", uf: "SC", lat: -28.7125, lng: -49.3014, type: "operation" },
    { name: "Araranguá", uf: "SC", lat: -28.9356, lng: -49.4842, type: "operation" },

    // RIO GRANDE DO SUL
    { name: "Porto Alegre", uf: "RS", lat: -30.0346, lng: -51.2177, type: "operation" },
    { name: "Canoas", uf: "RS", lat: -29.9189, lng: -51.1789, type: "operation" },

    // GOIÁS
    { name: "Catalão", uf: "GO", lat: -18.1658, lng: -47.9463, type: "operation" },
    { name: "Itumbiara", uf: "GO", lat: -18.4147, lng: -49.2158, type: "operation" },
    { name: "Jataí", uf: "GO", lat: -17.8814, lng: -51.7144, type: "operation" },

    // BAHIA
    { name: "Salvador", uf: "BA", lat: -12.9777, lng: -38.5016, type: "operation" },
    { name: "Paripiranga", uf: "BA", lat: -10.6865, lng: -37.8631, type: "operation" },
    { name: "Jacobina", uf: "BA", lat: -11.1811, lng: -40.5139, type: "operation" },
    { name: "Senhor do Bonfim", uf: "BA", lat: -10.4608, lng: -40.1883, type: "operation" },
    { name: "Tucano", uf: "BA", lat: -10.9631, lng: -38.7886, type: "operation" },
    { name: "Irecê", uf: "BA", lat: -11.3042, lng: -41.8569, type: "operation" },
    { name: "Feira de Santana", uf: "BA", lat: -12.2733, lng: -38.9556, type: "operation" },

    // DEMAIS ESTADOS
    { name: "Curitiba", uf: "PR", lat: -25.4284, lng: -49.2733, type: "operation" },
    { name: "Natal", uf: "RN", lat: -5.7945, lng: -35.2110, type: "operation" },
    { name: "Recife", uf: "PE", lat: -8.0578, lng: -34.8829, type: "operation" },
    { name: "João Pessoa", uf: "PB", lat: -7.1195, lng: -34.8450, type: "operation" },
    { name: "Tucuruí", uf: "PA", lat: -3.7661, lng: -49.6725, type: "operation" },

    // ALVOS ESTRATÉGICOS (MANTIDOS)
    { name: "Luís Eduardo Magalhães", uf: "BA", lat: -12.0954, lng: -45.7974, type: "target" },
    { name: "Sorriso", uf: "MT", lat: -12.5425, lng: -55.7211, type: "target" },
    { name: "Lucas do Rio Verde", uf: "MT", lat: -13.0649, lng: -55.9189, type: "target" },
    { name: "Rio Verde", uf: "GO", lat: -17.7915, lng: -50.9191, type: "target" }
];

const MapController = () => {
    const map = useMap();
    useEffect(() => {
        map.setView([-15.5, -53.0], 4);
    }, [map]);
    return null;
};

const NetworkStrategyMap: React.FC = () => {
    const [layers, setLayers] = useState({ agro: true, operations: true, targets: true });
    const [isExporting, setIsExporting] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/codeforamerica/click_container/master/Cookie_Jar/brazil_geo.json')
            .then(res => {
                if (!res.ok) throw new Error('Erro Rede');
                return res.json();
            })
            .then(data => setGeoData(data))
            .catch(err => console.error("Erro GeoJSON:", err));
    }, []);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportElementAsPNG('map-hd-capture', `Estrategia_Rede_Anima_Completa`);
        } finally {
            setIsExporting(false);
        }
    };

    const agroCities = useMemo(() => MUNICIPIOS_PERFIL.filter(c => c.agro.pib_agro_bi > 0.5), []);
    const operations = useMemo(() => STRATEGIC_NETWORK.filter(n => n.type === 'operation'), []);
    const targets = useMemo(() => STRATEGIC_NETWORK.filter(n => n.type === 'target'), []);

    return (
        <div className="h-full flex flex-col bg-slate-950 relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            
            {/* PAINEL DE CONTROLE CONSOLIDADO (EVITA SOBREPOSIÇÃO) */}
            <div className="absolute top-6 left-6 z-[1000] w-80 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl pointer-events-auto">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <div className="p-2 bg-[#5B2D82] rounded-xl text-white shadow-lg shadow-purple-500/20">
                            <Globe size={18}/>
                        </div>
                        <div>
                           <h3 className="text-white font-black uppercase tracking-tighter text-sm leading-none">
                              Ânima Educação
                           </h3>
                           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Estratégia Nacional 2025</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <button onClick={() => setLayers(l => ({...l, agro: !l.agro}))} className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${layers.agro ? 'bg-[#B51E84]/20 border-[#B51E84]/40 text-[#B51E84]' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                            <div className="flex items-center gap-2">
                                <Zap size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Calor do Agro</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${layers.agro ? 'bg-[#B51E84] shadow-[0_0_10px_#B51E84]' : 'bg-slate-700'}`}></div>
                        </button>
                        
                        <button onClick={() => setLayers(l => ({...l, operations: !l.operations}))} className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${layers.operations ? 'bg-[#42B4E4]/20 border-[#42B4E4]/40 text-[#42B4E4]' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Ânima Ativa ({operations.length})</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${layers.operations ? 'bg-[#42B4E4] shadow-[0_0_10px_#42B4E4]' : 'bg-slate-700'}`}></div>
                        </button>
                        
                        <button onClick={() => setLayers(l => ({...l, targets: !l.targets}))} className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${layers.targets ? 'bg-[#F58220]/20 border-[#F58220]/40 text-[#F58220]' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                            <div className="flex items-center gap-2">
                                <Target size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Alvos Agro 2025</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${layers.targets ? 'bg-[#F58220] shadow-[0_0_10px_#F58220]' : 'bg-slate-700'}`}></div>
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5">
                         <div className="flex items-center gap-2 mb-4">
                              <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">Snapshot</p>
                         </div>
                         <button 
                            onClick={handleExport}
                            disabled={isExporting}
                            className="w-full bg-white text-slate-900 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isExporting ? <Loader2 size={14} className="animate-spin"/> : <Download size={14} />}
                            {isExporting ? 'Capturando...' : 'Exportar Mapa HD'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ÁREA DE CAPTURA - ÂNIMA DARK STYLE */}
            <div id="map-hd-capture" className="flex-1 w-full h-full relative bg-slate-950">
                <MapContainer 
                    center={[-15, -50]} 
                    zoom={4} 
                    style={{ height: '100%', width: '100%', background: '#020617' }} 
                    zoomControl={false}
                    preferCanvas={true}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                        opacity={0.4}
                    />
                    
                    {geoData && (
                        <GeoJSON 
                            data={geoData} 
                            style={{
                                color: "#000000",      // Borda preta sólida
                                weight: 4,             // Contorno forte
                                opacity: 1,
                                fillColor: "#1a1526",  // Roxo Profundo Brand
                                fillOpacity: 0.95
                            }}
                        />
                    )}
                    
                    <MapController />

                    {/* CAMADA 1: CALOR DO AGRO (Magenta Ânima) */}
                    {layers.agro && agroCities.map(city => (
                        <CircleMarker
                            key={`agro-${city.municipio_id}`}
                            center={[city.latitude, city.longitude]}
                            radius={Math.max(4, Math.log(city.agro.pib_agro_bi * 15) * 8)}
                            pathOptions={{
                                fillColor: '#B51E84',
                                color: '#B51E84',
                                weight: 0,
                                fillOpacity: 0.35
                            }}
                        />
                    ))}

                    {/* CAMADA 2: OPERAÇÃO ATUAL (Ciano Ânima) */}
                    {layers.operations && operations.map((unit, idx) => (
                        <Marker key={`op-${idx}`} position={[unit.lat, unit.lng]} icon={opIcon}>
                            <Popup className="dark-popup">
                                <div className="p-2">
                                    <h4 className="font-black text-slate-800 text-[10px] uppercase leading-none">{unit.name}</h4>
                                    <p className="text-[9px] text-blue-500 font-bold uppercase mt-1">Unidade Ativa • {unit.uf}</p>
                                    <div className="mt-2 h-1 w-full bg-[#42B4E4] rounded-full"></div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* CAMADA 3: ALVOS (Laranja Ânima) */}
                    {layers.targets && targets.map((target, idx) => (
                        <Marker key={`tg-${idx}`} position={[target.lat, target.lng]} icon={targetIcon} zIndexOffset={1000}>
                            <Popup className="dark-popup">
                                <div className="p-3">
                                    <h4 className="font-black text-[#F58220] text-sm italic uppercase tracking-tighter">{target.name}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">Prioridade Expansão Agro</p>
                                    <p className="text-[9px] text-[#5B2D82] font-medium mt-1 italic">Vácuo educacional detectado</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* CRÉDITOS & LEGENDA DISCRETA (BOTTOM RIGHT) */}
                <div className="absolute bottom-8 right-8 z-[1000] text-right pointer-events-none">
                    <div className="bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                        <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">RogerLens Engine v4.5 • Ânima Education</p>
                        <p className="text-[7px] text-slate-600 uppercase mt-0.5">Sincronizado via INEP/Caged/RFB em tempo real</p>
                    </div>
                </div>
            </div>

            <style>{`
                .dark-popup .leaflet-popup-content-wrapper {
                    background: rgba(255, 255, 255, 0.98) !important;
                    color: #1e293b !important;
                    border-radius: 1.25rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
                }
                .dark-popup .leaflet-popup-tip {
                    background: white !important;
                }
            `}</style>

        </div>
    );
};

export default NetworkStrategyMap;
