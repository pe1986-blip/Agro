
import React, { useMemo, useState } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers, Briefcase, Factory, Sprout, Wrench, MapPin, CheckCircle2, FilterX, ArrowRight, TrendingUp } from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';

// --- TYPES & CONFIG ---
interface TreemapDataPoint {
    name: string;
    size: number;
    fill?: string;
    children?: TreemapDataPoint[];
    gapScore?: number;
    driver?: string;
    [key: string]: any; 
}

type AgroChain = 'Antes da Porteira' | 'Dentro da Porteira' | 'Depois da Porteira';

interface Company {
    id: number;
    name: string;
    cnaeProxy: string;
    chain: AgroChain;
    distanceKm: number;
    macroCluster: string;
    relatedMicroCluster: string; 
    impactDescription: string;
    category: string;
}

const CHAIN_STYLES: Record<AgroChain, { color: string, bg: string, border: string, icon: React.ElementType }> = {
    'Antes da Porteira': { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: Wrench },
    'Dentro da Porteira': { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', icon: Sprout },
    'Depois da Porteira': { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: Factory },
};

const STAGE_COLORS: Record<string, string> = {
    'A. CORE': '#10B981',      
    'B. FINANÇAS': '#3B82F6',  
    'C. GESTÃO': '#F59E0B',    
    'D. FUTURO': '#FF6347',    
    'E. LIDERANÇA': '#9370DB', 
    'F. RISCO': '#696969',     
    'G. INFRA': '#00CED1',     
};

const getGapColor = (score: number): string => {
    if (score > 75) return '#10B981'; // Green (High Op)
    if (score > 45) return '#F59E0B'; // Amber (Medium)
    return '#EF4444'; // Red (Low)
};

// --- REGIONAL INTELLIGENCE ENGINE (ANTI-GENERALISMO) ---
// Mapeamento preciso de players reais por vocação econômica e geografia

const VOCATION_PLAYERS: Record<string, Record<AgroChain, string[]>> = {
    'GRAOS_MT': { // Sorriso, Lucas, Sinop
        'Antes da Porteira': ['Bayer Cropscience', 'John Deere (Agro Baggio)', 'AgroAmazônia', 'Fiagril', 'Mosaic Fertilizantes'],
        'Dentro da Porteira': ['Grupo Bom Futuro', 'Amaggi Produção', 'SLC Agrícola', 'Grupo Scheffer', 'Fazenda Paiaguás'],
        'Depois da Porteira': ['Cargill', 'Bunge', 'FS Bioenergia (Etanol)', 'Rumo Logística', 'COFCO Intl']
    },
    'PROTEINA_SUL': { // Chapecó, Toledo, Rio Verde (Híbrido)
        'Antes da Porteira': ['Zoetis', 'DSM Nutrição', 'Agroceres PIC', 'Aviagen', 'Plasson Equipamentos'],
        'Dentro da Porteira': ['Granjas Integradas BRF', 'Produtores Aurora', 'Fazendas Suinícolas', 'Granja Faria'],
        'Depois da Porteira': ['Aurora Alimentos', 'BRF S.A.', 'JBS Foods', 'Seara', 'Ecofrigo']
    },
    'CANA_SP_GO': { // Ribeirão, Piracicaba, Rio Brilhante
        'Antes da Porteira': ['Ubyfol', 'Koppert Biologicals', 'Case IH', 'Sollus', 'Dedini Indústria'],
        'Dentro da Porteira': ['Raízen Agrícola', 'São Martinho', 'Tereos Açúcar', 'BP Bunge', 'Usina Alta Mogiana'],
        'Depois da Porteira': ['Copersucar', 'Cosan Logística', 'Rumo Malha Paulista', 'Raízen Energia', 'Biosev']
    },
    'CAFE_MG': { // Patrocínio, Varginha
        'Antes da Porteira': ['Palini & Alves', 'Pinhalense', 'Yara', 'Syngenta Café', 'Sicoob Credicaf'],
        'Dentro da Porteira': ['Fazenda Daterra', 'Grupo Montesanto', 'Produtores Cooxupé', 'Expocacer', 'Fazenda Sertãozinho'],
        'Depois da Porteira': ['Cooxupé Export', 'Minasul', 'Nespresso (Sourcing)', 'Stockler (Volcafe)', 'Armazéns Gerais']
    },
    'FRUTAS_NE': { // Petrolina, Juazeiro
        'Antes da Porteira': ['Netafim (Irrigação)', 'Valmont', 'Yara Brasil', 'Embrapa Semiárido'],
        'Dentro da Porteira': ['Agrodan', 'GrandValle', 'Special Fruit', 'Labrunier', 'Rio Sol'],
        'Depois da Porteira': ['Terminais de Carga (Terca)', 'Logística do Frio', 'Assoc. Valexport', 'Indústria de Sucos']
    },
    'DEFAULT': {
        'Antes da Porteira': ['Revenda Agrícola Local', 'Banco do Brasil', 'Cooperativa de Crédito', 'Loja Veterinária'],
        'Dentro da Porteira': ['Produtores Rurais Locais', 'Associação de Produtores', 'Sindicato Rural', 'Fazendas Regionais'],
        'Depois da Porteira': ['Armazéns Gerais', 'Supermercados Locais', 'Transportadora Regional', 'Agroindústria Local']
    }
};

const identifyVocationKey = (city: MunicipioPerfil): string => {
    const nome = city.nome;
    const estado = city.estado;
    const regiao = city.regiao;

    // Lógica de Detecção de Cluster
    if (['MT', 'MS', 'MA', 'PI', 'TO'].includes(estado)) {
        if (nome === 'Dourados' || nome === 'Rio Brilhante') return 'CANA_SP_GO'; // Exceção MS Cana
        return 'GRAOS_MT';
    }
    if (['SC', 'PR'].includes(estado) || nome === 'Rio Verde') return 'PROTEINA_SUL';
    if (estado === 'SP' || (estado === 'GO' && nome !== 'Rio Verde') || (estado === 'MG' && nome === 'Uberaba')) return 'CANA_SP_GO';
    if (estado === 'MG' || estado === 'ES') return 'CAFE_MG';
    if (regiao === 'Nordeste' && (nome === 'Petrolina' || nome === 'Juazeiro')) return 'FRUTAS_NE';
    
    return 'DEFAULT';
};

const generateCompanyData = (city: MunicipioPerfil): Company[] => {
    const vocationKey = identifyVocationKey(city);
    const players = VOCATION_PLAYERS[vocationKey];
    const companies: Company[] = [];
    let idCounter = 0;

    const chains: AgroChain[] = ['Antes da Porteira', 'Dentro da Porteira', 'Depois da Porteira'];

    chains.forEach(chain => {
        const names = players[chain];
        // Seleciona 4 empresas de cada elo da cadeia
        for (let i = 0; i < 4; i++) {
            const companyName = names[i % names.length];
            // Variação de distância baseada no elo
            let dist = 0;
            if (chain === 'Antes da Porteira') dist = 2 + Math.random() * 5; // Serviços na cidade
            if (chain === 'Dentro da Porteira') dist = 15 + Math.random() * 30; // Fazendas ao redor
            if (chain === 'Depois da Porteira') dist = 5 + Math.random() * 10; // Distrito industrial

            companies.push({
                id: idCounter++,
                name: companyName,
                chain: chain,
                category: "Parceiro Estratégico",
                cnaeProxy: "00.000.000/0000-00",
                distanceKm: Math.floor(dist),
                macroCluster: "Cluster Produtivo",
                relatedMicroCluster: "Cadeia de Valor",
                impactDescription: `Potencial empregador para ${chain}`
            });
        }
    });

    return companies;
};

// ... (Rest of component setup similar to before but utilizing the new logic)

const generateEcosystemData = (city: MunicipioPerfil): TreemapDataPoint[] => {
    // Ajuste fino dos scores baseado na vocação real
    const isHighTech = city.agro.nivel_tecnologico === 'Alto';
    const isExport = city.agro.exportacoes_valor_usd > 500000000;
    
    // Base Scores
    const data: TreemapDataPoint[] = [
        {
            name: 'A. CORE: Produção & Operação',
            size: 400 + (isHighTech ? 100 : 0),
            fill: STAGE_COLORS['A. CORE'],
            children: [
                { name: 'Máquinas & Manutenção', size: 100, gapScore: isHighTech ? 85 : 40 },
                { name: 'Produção Agrícola', size: 150, gapScore: 30 }, // Geralmente saturado de mão de obra básica
                { name: 'Zootecnia/Veterinária', size: 80, gapScore: 50 },
            ],
            gapScore: 0
        },
        {
            name: 'B. DEPOIS DA PORTEIRA: Indústria',
            size: 300 + (isExport ? 100 : 0),
            fill: STAGE_COLORS['C. GESTÃO'], // Using visual grouping color
            children: [
                { name: 'Agroindústria (Proc.)', size: 120, gapScore: 60 },
                { name: 'Logística & Supply', size: 100, gapScore: isExport ? 90 : 50 },
                { name: 'Qualidade & Certificação', size: 80, gapScore: isExport ? 95 : 40 },
            ],
            gapScore: 0
        },
        {
            name: 'C. ANTES DA PORTEIRA: Serviços',
            size: 250,
            fill: STAGE_COLORS['B. FINANÇAS'],
            children: [
                { name: 'Insumos & Vendas', size: 90, gapScore: 40 },
                { name: 'Crédito & Seguros', size: 80, gapScore: 75 },
                { name: 'AgTech & Dados', size: 80, gapScore: isHighTech ? 100 : 60 },
            ],
            gapScore: 0
        }
    ];

    return data.map(macro => {
        if (macro.children) {
             macro.children = macro.children.map(child => ({
                ...child,
                fill: getGapColor(child.gapScore || 0),
             }));
        }
        return macro;
    });
};

const CustomizedContent = (props: any) => {
    const { depth, x, y, width, height, fill, name, gapScore, onNodeClick, activeCluster } = props;
    if (depth !== 2) return null;
    const isActive = activeCluster === name;
    
    // Otimização visual para células pequenas
    if (width < 30 || height < 20) return <rect x={x} y={y} width={width} height={height} style={{ fill: fill, stroke: '#fff', strokeWidth: 1 }} />;

    return (
        <g onClick={() => onNodeClick(name)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={y} width={width} height={height} style={{ fill: isActive ? '#2563eb' : fill, stroke: isActive ? '#fcd34d' : '#FFF', strokeWidth: isActive ? 3 : 2, rx: 4, ry: 4, transition: 'all 0.3s ease' }} />
            {width > 60 && height > 35 && (
                <>
                    <text x={x + 6} y={y + 16} fill="#FFF" fontSize={11} fontWeight="bold" style={{ pointerEvents: 'none', textShadow: '0px 1px 2px rgba(0,0,0,0.6)' }}>
                        {name.split(' ')[0]} {/* Mostra só a primeira palavra se apertado */}
                    </text>
                    <text x={x + 6} y={y + 30} fill="#FFF" fontSize={10} style={{ pointerEvents: 'none', opacity: 0.9, textShadow: '0px 1px 2px rgba(0,0,0,0.6)' }}>
                        Gap: {Math.round(gapScore)}%
                    </text>
                </>
            )}
        </g>
    );
};

const EcosystemTreemap: React.FC<{ selectedProfile: MunicipioPerfil }> = ({ selectedProfile }) => {
    const [activeMicroCluster, setActiveMicroCluster] = useState<string | null>(null);

    const data = useMemo(() => generateEcosystemData(selectedProfile), [selectedProfile]);
    const companyData = useMemo(() => generateCompanyData(selectedProfile), [selectedProfile]);

    return (
        <div className="p-6 bg-white h-full overflow-y-auto animate-fade-in flex flex-col">
            <header className="mb-6 flex justify-between items-end">
                 <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Cadeia de Valor do Agro</h3>
                    <p className="text-lg font-black text-slate-800 uppercase tracking-tighter">Matriz de Beneficiários Locais (B2B)</p>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 uppercase">
                        Vocação: {identifyVocationKey(selectedProfile).replace('_', ' ')}
                    </span>
                 </div>
            </header>
            
            <div className="flex-1 min-h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap 
                        data={data} 
                        dataKey="size" 
                        stroke="#fff" 
                        content={<CustomizedContent onNodeClick={(n:string) => setActiveMicroCluster(n === activeMicroCluster ? null : n)} activeCluster={activeMicroCluster} />} 
                        isAnimationActive={true} 
                    />
                </ResponsiveContainer>
            </div>

            {/* List of Companies - CONTEXTUALIZADA E EXPANDIDA */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-600"/>
                        {activeMicroCluster ? `Players em: ${activeMicroCluster}` : 'Big Players da Região (Alvos B2B)'}
                    </h3>
                </div>

                {/* Grid expandido para 4 colunas em telas grandes já que agora ocupa full-width */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {companyData.slice(0, 8).map((company) => {
                        const style = CHAIN_STYLES[company.chain];
                        const Icon = style.icon;

                        return (
                            <div key={company.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <p className="font-black text-[11px] text-slate-800 truncate w-32" title={company.name}>{company.name}</p>
                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 ${style.bg} ${style.color}`}>
                                        <Icon size={8} /> {company.chain.split(' ')[0]}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-50">
                                    <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1"><MapPin size={10}/> {company.distanceKm}km</span>
                                    <span className="text-[9px] text-blue-600 font-bold cursor-pointer hover:underline">Ver CNPJ</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EcosystemTreemap;
