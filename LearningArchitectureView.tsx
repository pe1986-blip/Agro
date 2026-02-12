
import React, { useState, useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Sector
} from 'recharts';
import { 
  Target, Rocket, Clock, Users, DollarSign, Layout, Award, MapPin, 
  Flame, ChevronDown, CheckCircle2, TrendingUp,
  Sparkles, Anchor, Lightbulb, Loader2, Download, Droplets, Factory, Sprout,
  Plus, Cpu, Wrench, Leaf, Tractor, RefreshCw, Handshake, Coffee, Beef, Warehouse,
  BrainCircuit, Heart, GraduationCap, Globe, Zap
} from 'lucide-react';
import { PORTFOLIO_ARCHETYPES, DnaScore, PortfolioItem } from './services/portfolioService';
import { generateThesisPDF } from './services/proposalGenerator';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';
import SolutionArchitectModal from './SolutionArchitectModal';
import { JobPosition } from './services/socialGapService';

// --- TYPES ---
interface ProcessedProduct extends PortfolioItem {
    fitScore: number;
    suggestedPrice: number;
    tags: { label: string; color: string }[];
    groupColor: string;
}

interface AcademicThesis {
    title: string;
    type: 'Premium' | 'Mass' | 'Niche';
    modality: string;
    price: number;
    reasoning: string;
    icon: any;
    color: string;
}

interface TerritoryConfig {
    name: string;
    icon: any;
    seasonalData: { name: string; months: string; value: number; fill: string; pain: string; audience: string; product: string }[];
    partnersData: { id: string; title: string; subtitle: string; icon: any; color: string; bg: string; border: string; partners: string[]; strategy: string; example: string }[];
}

// --- DADOS DINÂMICOS POR VOCAÇÃO (ANTI-GENERALISMO) ---

const TERRITORY_LOGIC: Record<string, TerritoryConfig> = {
    'GRAIN_BELT': { // Padrão Centro-Oeste / MATOPIBA
        name: 'Ciclo de Grãos (Soja/Milho)',
        icon: Sprout,
        seasonalData: [
            { name: 'Entressafra', months: 'Jun-Ago', value: 25, fill: '#64748b', pain: 'Planejamento & Custos', audience: 'Gestores/Sucessores', product: 'Gestão Financeira & Hedge' },
            { name: 'Plantio', months: 'Set-Nov', value: 25, fill: '#10b981', pain: 'Janela & Maquinário', audience: 'Operadores/Técnicos', product: 'Manutenção & Agricultura Precisão' },
            { name: 'Manejo', months: 'Dez-Fev', value: 25, fill: '#3b82f6', pain: 'Pragas & Doenças', audience: 'Agrônomos Campo', product: 'Monitoramento & Bioinsumos' },
            { name: 'Colheita', months: 'Mar-Mai', value: 25, fill: '#f59e0b', pain: 'Logística & Perda', audience: 'Líderes Operacionais', product: 'Logística de Safra & Pós-Colheita' },
        ],
        partnersData: [
            { id: 'antes', title: 'Antes da Porteira', subtitle: 'Insumos & Maquinário', icon: Cpu, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', partners: ['John Deere', 'Bayer', 'Syngenta', 'Solinftec'], strategy: 'Cursos Técnicos Co-Branded', example: 'Bootcamp Manutenção Drones' },
            { id: 'dentro', title: 'Dentro da Porteira', subtitle: 'Grandes Grupos', icon: Tractor, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', partners: ['SLC Agrícola', 'Bom Futuro', 'Scheffer', 'Amaggi'], strategy: 'Programas Trainee & Liderança', example: 'Academia de Líderes do Campo' },
            { id: 'depois', title: 'Depois da Porteira', subtitle: 'Trading & Logística', icon: Factory, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', partners: ['Cargill', 'Bunge', 'Rumo', 'COFCO'], strategy: 'MBAs Executivos', example: 'MBA em Trading & Derivativos' }
        ]
    },
    'COFFEE_VALLEY': { // Minas Gerais / Espírito Santo
        name: 'Ciclo do Café',
        icon: Coffee,
        seasonalData: [
            { name: 'Pós-Colheita', months: 'Ago-Out', value: 25, fill: '#f59e0b', pain: 'Beneficiamento & Venda', audience: 'Cafeicultores/Q-Graders', product: 'Classificação & Mercado Futuro' },
            { name: 'Florada', months: 'Nov-Jan', value: 25, fill: '#ec4899', pain: 'Pegamento & Nutrição', audience: 'Agrônomos', product: 'Nutrição Avançada de Cafezais' },
            { name: 'Granação', months: 'Fev-Abr', value: 25, fill: '#10b981', pain: 'Maturação & Pragas', audience: 'Gerentes Fazenda', product: 'Manejo Integrado (MIP)' },
            { name: 'Colheita', months: 'Mai-Jul', value: 25, fill: '#b45309', pain: 'Mão de Obra & Máquinas', audience: 'Operacional', product: 'Gestão de Colheita Mecanizada' },
        ],
        partnersData: [
            { id: 'antes', title: 'Insumos & Crédito', subtitle: 'Suporte', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', partners: ['Sicoob', 'Yara', 'Pinhalense', 'Palini & Alves'], strategy: 'Workshops Financeiros', example: 'Gestão de Custos no Café' },
            { id: 'dentro', title: 'Produção', subtitle: 'Fazendas & Coops', icon: Coffee, color: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200', partners: ['Cooxupé', 'Minasul', 'Fazenda Daterra', 'Expocacer'], strategy: 'Certificação & Qualidade', example: 'Formação de Q-Graders' },
            { id: 'depois', title: 'Exportação', subtitle: 'Mercado Global', icon: Globe, color: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-200', partners: ['Nespresso', 'Illy', 'Volcafe', 'Stockler'], strategy: 'Sustentabilidade ESG', example: 'Rastreabilidade e Carbono Zero' }
        ]
    },
    'CANA_ENERGY': { // São Paulo / Goiás Sul / MS
        name: 'Ciclo Sucroenergético',
        icon: Zap,
        seasonalData: [
            { name: 'Entressafra', months: 'Dez-Mar', value: 35, fill: '#64748b', pain: 'Manutenção Industrial', audience: 'Engenheiros/Mecânicos', product: 'Manutenção Preditiva 4.0' },
            { name: 'Início Safra', months: 'Abr-Jun', value: 20, fill: '#10b981', pain: 'Logística CTT', audience: 'Gestores Logísticos', product: 'Otimização de CTT (Corte/Transbordo)' },
            { name: 'Pico Moagem', months: 'Jul-Set', value: 25, fill: '#f59e0b', pain: 'Eficiência Industrial', audience: 'Gerentes Industriais', product: 'Gestão de Processos e Energia' },
            { name: 'Final Safra', months: 'Out-Nov', value: 20, fill: '#ef4444', pain: 'Plantio & Planejamento', audience: 'Agrícola', product: 'Planejamento de Plantio (Meiosi)' },
        ],
        partnersData: [
            { id: 'antes', title: 'Tecnologia', subtitle: 'Indústria 4.0', icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', partners: ['Sollus', 'Hexagon', 'Dedini', 'WEG'], strategy: 'Upskilling Técnico', example: 'Automação Industrial' },
            { id: 'dentro', title: 'Usinas', subtitle: 'Bioparques', icon: Factory, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', partners: ['Raízen', 'São Martinho', 'BP Bunge', 'Coruripe'], strategy: 'Universidade Corporativa', example: 'Liderança em Bioenergia' },
            { id: 'depois', title: 'Energia & Carbono', subtitle: 'Mercados', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', partners: ['Copersucar', 'Unica', 'RenovaBio', 'Cogen'], strategy: 'Regulação & Trading', example: 'Certificação de CBIOs' }
        ]
    },
    'PROTEIN_HUB': { // Oeste PR / SC / Sudoeste GO
        name: 'Ciclo Contínuo (Proteína)',
        icon: Beef,
        seasonalData: [
            { name: 'Sanidade', months: 'Q1 (Jan-Mar)', value: 25, fill: '#3b82f6', pain: 'Controle Sanitário', audience: 'Veterinários', product: 'Biosseguridade Avançada' },
            { name: 'Nutrição', months: 'Q2 (Abr-Jun)', value: 25, fill: '#f59e0b', pain: 'Custo Ração (Milho)', audience: 'Zootecnistas', product: 'Eficiência Nutricional' },
            { name: 'Ambiência', months: 'Q3 (Jul-Set)', value: 25, fill: '#10b981', pain: 'Bem-Estar Animal', audience: 'Produtores Integrados', product: 'Climatização e Automação' },
            { name: 'Mercado', months: 'Q4 (Out-Dez)', value: 25, fill: '#ef4444', pain: 'Exportação & Demanda', audience: 'Executivos', product: 'Mercados Internacionais' },
        ],
        partnersData: [
            { id: 'antes', title: 'Genética & Nutrição', subtitle: 'Insumos', icon: Sprout, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', partners: ['DSM', 'Cargill Nutron', 'Agroceres', 'Aviagen'], strategy: 'Atualização Técnica', example: 'Nutrição de Precisão' },
            { id: 'dentro', title: 'Integração', subtitle: 'Granjas & Frigoríficos', icon: Warehouse, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', partners: ['BRF', 'Aurora', 'Seara/JBS', 'C.Vale'], strategy: 'Escola de Integrados', example: 'Gestão da Propriedade Integrada' },
            { id: 'depois', title: 'Varejo Global', subtitle: 'Logística Frio', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', partners: ['Porto de Paranaguá', 'Maersk', 'ABPA', 'Embaixadas'], strategy: 'Compliance', example: 'HACCP e Normas Halal' }
        ]
    }
};

const getCityVocation = (city: MunicipioPerfil): TerritoryConfig => {
    // 1. Café (Minas e ES, exceto Triângulo Mineiro que é Grãos/Cana)
    if ((city.estado === 'MG' || city.estado === 'ES') && !['Uberlândia', 'Uberaba', 'Unaí'].includes(city.nome)) {
        return TERRITORY_LOGIC['COFFEE_VALLEY'];
    }
    // 2. Cana (SP, MS Sul, GO Sul)
    if (city.estado === 'SP' || city.nome === 'Ribeirão Preto' || city.nome === 'Piracicaba' || city.nome === 'Rio Brilhante' || city.nome === 'Quirinópolis') {
        return TERRITORY_LOGIC['CANA_ENERGY'];
    }
    // 3. Proteína (Oeste PR, SC, Rio Verde)
    if (['Chapecó', 'Toledo', 'Cascavel', 'Rio Verde', 'Concórdia'].includes(city.nome)) {
        return TERRITORY_LOGIC['PROTEIN_HUB'];
    }
    // 4. Default: Grãos (MT, MATOPIBA, GO Norte)
    return TERRITORY_LOGIC['GRAIN_BELT'];
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  return (
    <g>
      <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#1e293b" className="text-sm font-black uppercase tracking-widest">{payload.name}</text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#64748b" className="text-xs font-bold">{payload.months}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
    </g>
  );
};

// --- ENGINE 1: GERADOR DE TESES (A CAMADA DE INTELIGÊNCIA TERRITORIAL) ---
const generateAcademicTheses = (city: MunicipioPerfil): AcademicThesis[] => {
    const theses: AcademicThesis[] = [];
    const nome = city.nome;
    const estado = city.estado;
    
    // --- LÓGICA DE HIPER-SEGMENTAÇÃO ---
    const isProteinHub = ['Lucas do Rio Verde', 'Nova Mutum', 'Rio Verde', 'Chapecó', 'Toledo'].includes(nome);
    const isIrrigationHub = ['Paracatu', 'Cristalina', 'Unaí', 'Petrolina', 'Juazeiro'].includes(nome);
    const isGrainFrontier = ['Sorriso', 'Sinop', 'Luís Eduardo Magalhães', 'Balsas', 'Querência'].includes(nome);
    const isBioEnergyHub = ['Ribeirão Preto', 'Piracicaba', 'Sertãozinho', 'Dourados', 'Rio Brilhante'].includes(nome);

    // --- TESE 1: O CARRO CHEFE ---
    if (isProteinHub) {
        theses.push({
            title: "MBA Executivo em Gestão de Cadeias de Proteína Animal",
            type: "Premium",
            modality: "Híbrido (Imersões na Indústria)",
            price: 24000,
            reasoning: `Território dominado por grandes integradoras. A dor local não é plantar, é gerir a complexidade da transformação industrial da carne.`,
            icon: Factory,
            color: "bg-rose-600"
        });
    } else if (isIrrigationHub) {
        theses.push({
            title: "Pós-Graduação em Engenharia de Irrigação e Recursos Hídricos",
            type: "Premium",
            modality: "Presencial (Laboratório de Campo)",
            price: 18000,
            reasoning: `Área de alta densidade de pivôs. A gestão da água e energia é o fator crítico de sucesso para o produtor local.`,
            icon: Droplets,
            color: "bg-blue-500"
        });
    } else if (isGrainFrontier) {
        theses.push({
            title: "MBA em Mercados Agrícolas, Trading e Hedge",
            type: "Premium",
            modality: "Online ao Vivo",
            price: 28000,
            reasoning: `Capital do agronegócio exportador. A dor atual é comercializar e travar preços na bolsa.`,
            icon: Globe,
            color: "bg-emerald-600"
        });
    } else if (isBioEnergyHub) {
        theses.push({
            title: "Master em Gestão Bioenergética e Renováveis",
            type: "Premium",
            modality: "Híbrido",
            price: 22000,
            reasoning: "Hub sucroenergético. Demanda por executivos que entendam a transição do etanol para o biogás.",
            icon: Zap,
            color: "bg-amber-500"
        });
    } else {
        if (estado === 'MG') {
            theses.push({
                title: "MBA em Governança de Empresas Familiares Rurais",
                type: "Premium",
                modality: "Presencial",
                price: 16000,
                reasoning: "Cultura de empresas familiares tradicionais. Foco na sucessão pacífica.",
                icon: Anchor,
                color: "bg-indigo-600"
            });
        } else {
            theses.push({
                title: "Especialização em Gestão da Produção Eficiente",
                type: "Niche",
                modality: "100% Online",
                price: 6000,
                reasoning: "Profissionalização básica de produtores médios com foco em custos.",
                icon: TrendingUp,
                color: "bg-emerald-600"
            });
        }
    }

    // --- TESE 2: A SOLUÇÃO TÉCNICA ---
    if (city.agro.nivel_tecnologico === 'Alto') {
        theses.push({
            title: "Bootcamp: Manutenção de Maquinário Autônomo e Drones",
            type: "Niche",
            modality: "Presencial Intensivo",
            price: 4500,
            reasoning: `Faltam mecânicos especializados em eletrônica embarcada para o parque de máquinas de última geração.`,
            icon: Cpu, 
            color: "bg-purple-600"
        });
    } else {
        theses.push({
            title: "Formação Técnica em Agropecuária Digital",
            type: "Mass",
            modality: "Híbrido",
            price: 350,
            reasoning: "Demanda base para operadores que saibam usar softwares de gestão no campo.",
            icon: Wrench, 
            color: "bg-orange-600"
        });
    }

    // --- TESE 3: O FUTURO ---
    if (city.agro.exportacoes_valor_usd > 500_000_000) {
        theses.push({
            title: "Programa Avançado em ESG e Certificações Internacionais",
            type: "Niche",
            modality: "Online ao Vivo",
            price: 9000,
            reasoning: `Pressão exportadora por rastreabilidade e carbono neutro cria urgência por compliance.`,
            icon: Leaf,
            color: "bg-green-500"
        });
    } else {
        theses.push({
            title: "Hub de Empreendedorismo e Novos Negócios Rurais",
            type: "Niche",
            modality: "Presencial",
            price: 5000,
            reasoning: "Apoiar filhos de produtores que querem criar startups locais.",
            icon: Lightbulb,
            color: "bg-yellow-500"
        });
    }

    return theses;
};

// --- ENGINE 2: FIT CALCULATOR ---
const calculateProductFit = (product: PortfolioItem, city: MunicipioPerfil): Omit<ProcessedProduct, 'groupColor'> => {
    let score = 70;
    const tags: { label: string; color: string }[] = [];
    const income = city.economia.renda_per_capita;
    const isRich = income > 3500;
    const productCostLevel = product.custo.includes('Alto') ? 3 : (product.custo.includes('Médio') ? 2 : 1);

    if (city.regiao === 'Sul' && product.name.includes('Cooperativismo')) score += 20;
    if (city.agro.nivel_tecnologico === 'Alto' && product.name.includes('Tech')) score += 20;
    if (isRich && productCostLevel === 3) {
        score += 15;
        tags.push({ label: 'Alta Aderência de Renda', color: 'bg-green-100 text-green-700' });
    }
    
    // Adiciona tags metodológicas baseadas no DNA do produto
    if (product.dna.Humana > 70) tags.push({ label: 'Foco: Dimensão Humana', color: 'bg-rose-100 text-rose-700' });
    if (product.dna.Prática > 70) tags.push({ label: 'Dual Learning (Prático)', color: 'bg-blue-100 text-blue-700' });
    if (product.dna.Inovação > 70) tags.push({ label: 'Neuroaprendizagem', color: 'bg-purple-100 text-purple-700' });

    const incomeMultiplier = income / 2500;
    let basePrice = 5000; 
    if (product.custo.includes('Alto')) basePrice = 20000;
    if (product.custo.includes('Baixo')) basePrice = 800;
    
    const suggestedPrice = basePrice * (0.8 + (incomeMultiplier * 0.2));

    return {
        ...product,
        fitScore: Math.min(100, Math.max(0, score)),
        suggestedPrice,
        tags
    };
};

const ThesisCard: React.FC<{ thesis: AcademicThesis, city: MunicipioPerfil }> = ({ thesis, city }) => {
    const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');

    const handleGenerate = async () => {
        setStatus('generating');
        await new Promise(r => setTimeout(r, 500));
        await generateThesisPDF(city, thesis);
        setStatus('done');
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 relative flex flex-col h-full">
            <div className={`h-2 w-full ${thesis.color}`}></div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${thesis.color} text-white shadow-lg`}>
                        <thesis.icon size={24} />
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Sugerido</span>
                        <span className="text-xl font-black text-slate-800">R$ {formatNumber(thesis.price)}</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <span className={`inline-block px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider mb-2 ${thesis.type === 'Premium' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                        Tese {thesis.type}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                        {thesis.title}
                    </h3>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                        <Sparkles size={10} className="text-yellow-500"/> Inteligência Territorial
                    </p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        "{thesis.reasoning}"
                    </p>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 font-bold mb-4">
                    <span className="flex items-center gap-1"><Clock size={14}/> {thesis.modality}</span>
                </div>

                <button 
                    onClick={handleGenerate}
                    disabled={status === 'generating'}
                    className={`w-full py-3 text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-xl
                        ${status === 'done' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-blue-600'}
                    `}
                >
                    {status === 'generating' ? (
                        <><Loader2 size={14} className="animate-spin"/> Gerando PDF...</>
                    ) : status === 'done' ? (
                        <><CheckCircle2 size={14}/> Proposta Salva!</>
                    ) : (
                        <><Download size={14}/> Baixar Estrutura PDF</>
                    )}
                </button>
            </div>
        </div>
    );
};

const MiniDNAChart = ({ dna, color }: { dna: DnaScore, color: string }) => {
    // Mapeia para o Radar de Fink (simplificado para visualização no card)
    const data = [
      { subject: 'Conh.', A: dna.Teoria, fullMark: 100 },
      { subject: 'Apl.', A: dna.Prática, fullMark: 100 },
      { subject: 'Int.', A: dna.Conexão, fullMark: 100 },
      { subject: 'Hum.', A: dna.Humana || 50, fullMark: 100 },
      { subject: 'Meta.', A: dna.Aprender || 50, fullMark: 100 },
    ];
  
    return (
      <div className="w-full h-[140px] pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3"/>
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 8, fontWeight: 700 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="DNA"
              dataKey="A"
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
};

// --- COMPONENTE: MANDALA SAZONAL (DINÂMICA) ---
const SeasonalMandala: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Obtém os dados baseados na vocação da cidade
    const territory = useMemo(() => getCityVocation(city), [city]);
    const activePhase = territory.seasonalData[activeIndex];

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            {/* Esquerda: Mandala */}
            <div className="w-full md:w-1/2 relative h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={territory.seasonalData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            onClick={(_, index) => setActiveIndex(index)}
                            cursor="pointer"
                        >
                            {territory.seasonalData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="white" strokeWidth={2} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex flex-col items-center">
                    <territory.icon size={24} className="mb-1" />
                    <span className="text-[8px] font-black uppercase text-slate-300">Ciclo</span>
                </div>
            </div>

            {/* Direita: Insights Dinâmicos */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                             <territory.icon size={12}/> {territory.name}
                        </p>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{activePhase.name}</h3>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{activePhase.months}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Target size={16} className="text-rose-600" />
                            <h4 className="text-xs font-black text-rose-800 uppercase tracking-wide">A Dor do Momento</h4>
                        </div>
                        <p className="text-sm font-medium text-rose-700">{activePhase.pain}</p>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={16} className="text-emerald-600" />
                            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wide">Produto Recomendado</h4>
                        </div>
                        <p className="text-sm font-bold text-emerald-900">{activePhase.product}</p>
                        <p className="text-[10px] text-emerald-600 mt-1 uppercase tracking-wider font-bold">Alvo: {activePhase.audience}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENTE: MATRIZ DE PARCEIROS (DINÂMICA) ---
const ValueChainPartners: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const territory = useMemo(() => getCityVocation(city), [city]);

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
                <Handshake size={20} className="text-blue-600" /> Matriz de Parcerias: {territory.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {territory.partnersData.map((gate) => (
                    <div key={gate.id} className={`p-6 rounded-2xl border ${gate.bg} ${gate.border} hover:shadow-md transition-all`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg bg-white shadow-sm ${gate.color}`}>
                                <gate.icon size={20} />
                            </div>
                            <div>
                                <h4 className={`text-sm font-black uppercase ${gate.color}`}>{gate.title}</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{gate.subtitle}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Parceiros Alvo (Tier 1)</p>
                                <div className="flex flex-wrap gap-2">
                                    {gate.partners.map(p => (
                                        <span key={p} className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-black/5">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estratégia</span>
                                    <Zap size={10} className={gate.color.replace('text-', 'text-opacity-80 text-')} />
                                </div>
                                <p className="text-xs font-bold text-slate-700">{gate.strategy}</p>
                                <p className="text-[10px] text-slate-500 italic mt-1">Ex: {gate.example}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductCard: React.FC<{ item: ProcessedProduct; color: string; onOpen: () => void }> = ({ item, color, onOpen }) => {
    return (
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group relative ${item.fitScore > 80 ? 'border-blue-200 shadow-md hover:shadow-lg' : 'border-slate-100 opacity-80 hover:opacity-100'}`}>
            {item.fitScore > 85 && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-bl-xl uppercase tracking-widest z-10">High Fit</div>
            )}
            <div className="p-5 flex flex-col h-full relative">
                
                {/* Visual Header with DNA */}
                <div className="mb-4 relative">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-slate-800 text-sm leading-tight w-3/4">{item.name}</h4>
                        <div className="text-right">
                            <span className={`block text-lg font-black ${item.fitScore > 80 ? 'text-emerald-600' : 'text-slate-400'}`}>{item.fitScore}%</span>
                        </div>
                    </div>
                    
                    {/* Integrated Mini Chart */}
                    <div className="h-32 -mx-4">
                         <MiniDNAChart dna={item.dna} color={color} />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((t,i) => (
                            <span key={i} className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide border ${t.color.replace('text-', 'border-').replace('700', '200')} ${t.color}`}>
                                {t.label}
                            </span>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
                </div>
                
                <div className="mt-auto pt-3 border-t border-slate-50">
                    <div className="flex justify-between items-center">
                        <div>
                             <p className="text-[9px] text-slate-400 font-bold uppercase">Valor Sugerido</p>
                             <span className="text-xs font-black text-slate-700">R$ {formatNumber(item.suggestedPrice)}</span>
                        </div>
                        <button 
                            onClick={onOpen}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg"
                        >
                            Ver Matriz <ChevronDown size={12}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LearningArchitectureView: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
  const [filter, setFilter] = useState<'ALL' | 'HIGH'>('HIGH');
  
  // Estado para armazenar o produto selecionado para o modal
  const [selectedProduct, setSelectedProduct] = useState<ProcessedProduct | null>(null);

  const academicTheses = useMemo(() => generateAcademicTheses(city), [city]);

  const catalogProducts = useMemo(() => {
      const allItems = PORTFOLIO_ARCHETYPES.flatMap(group => 
          group.items.map(item => ({ ...calculateProductFit(item, city), groupColor: group.color }))
      );
      return allItems.sort((a, b) => b.fitScore - a.fitScore);
  }, [city]);

  const displayedCatalog = filter === 'HIGH' ? catalogProducts.filter(p => p.fitScore > 60) : catalogProducts;

  if (!city) return <div>Carregando Engine...</div>;

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      
      {/* MODAL (Condicional) */}
      {selectedProduct && (
          <SolutionArchitectModal 
              // Adaptador: Transforma o ProductItem em JobPosition (mock para o modal funcionar)
              job={{
                  id: selectedProduct.id,
                  title: selectedProduct.name,
                  sector: 'Educacional',
                  salary: '-',
                  demandLevel: 'Alta',
                  missingSkills: [],
                  recommendedCourse: selectedProduct.name
              }}
              cityProfile={city} 
              onClose={() => setSelectedProduct(null)} 
          />
      )}

      {/* SEÇÃO 1: OPPORTUNITIES ENGINE (AS TESES) */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-2xl shadow-lg">
                    <Sparkles className="text-yellow-400" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Oportunidades Alpha</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        Produtos exclusivos baseados no DNA Territorial de {city.nome}
                    </p>
                </div>
            </div>
            
            {/* BOTÃO NOVO: CRIAÇÃO LIVRE */}
            <button 
                onClick={() => setSelectedProduct({
                    id: 'custom_new',
                    name: 'Novo Produto Customizado',
                    description: 'Crie uma solução do zero.',
                    fitScore: 100,
                    suggestedPrice: 0,
                    tags: [],
                    groupColor: '#000',
                    duration_mask: '-',
                    dna: { Prática: 50, Conexão: 50, Inovação: 50, Teoria: 50, Mentoria: 50, Humana: 50, Cuidar: 50, Aprender: 50 },
                    publico: '-', formato: '-', metodologia: '-', intensidade: 'Moderada', ambiente: '-', entrega_principal: '-', avaliacao: '-', custo: '-'
                })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-1"
            >
                <Plus size={16}/> Criar Produto do Zero
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicTheses.map((thesis, idx) => (
                <ThesisCard key={idx} thesis={thesis} city={city} />
            ))}
        </div>
      </section>

      {/* SEÇÃO 2: LÓGICA DA CADEIA (DINÂMICA POR TERRITÓRIO) */}
      <section>
          <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-900 rounded-2xl shadow-lg">
                  <RefreshCw className="text-emerald-400" size={24} />
              </div>
              <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Lógica da Cadeia (Supply Chain Logic)</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                      Inteligência Sazonal & Parcerias Estratégicas
                  </p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Coluna Esquerda: Mandala Dinâmica */}
              <div className="lg:col-span-5">
                  <SeasonalMandala city={city} />
              </div>
              
              {/* Coluna Direita: Matriz de Parceiros Dinâmica */}
              <div className="lg:col-span-7">
                  <ValueChainPartners city={city} />
              </div>
          </div>
      </section>

      {/* SEÇÃO 3: CATÁLOGO INTELIGENTE (FIT ENGINE) - UPDATED VISUALS */}
      <section className="bg-slate-50 rounded-[3rem] p-8 border border-slate-200">
        <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                    <Layout className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Soluções Metodológicas (Fit Score)</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        Catálogo ordenado por aderência ao DNA da cidade e metodologias ativas.
                    </p>
                </div>
            </div>
            
            <div className="bg-white p-1 rounded-lg border border-slate-200 flex gap-1">
                <button onClick={() => setFilter('HIGH')} className={`px-3 py-1.5 rounded text-[10px] font-black uppercase transition-all ${filter === 'HIGH' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>Top Fit</button>
                <button onClick={() => setFilter('ALL')} className={`px-3 py-1.5 rounded text-[10px] font-black uppercase transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>Todos</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedCatalog.map((product) => (
                <ProductCard 
                    key={product.id} 
                    item={product} 
                    color={product.groupColor} 
                    onOpen={() => setSelectedProduct(product)} // Conecta o clique ao state do modal
                />
            ))}
        </div>
      </section>

    </div>
  );
};

export default LearningArchitectureView;
