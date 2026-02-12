
import React, { useMemo, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Cpu, Sprout, Droplets, LineChart, Truck, BrainCircuit, Info } from 'lucide-react';
import { MUNICIPIOS_PERFIL } from './constants';

// --- TYPES ---
interface TechProfile {
  subject: string;
  demanda: number; // Nível de exigência do mercado (0-100)
  oferta: number;  // Nível de ensino atual na região (0-100)
  fullMark: number;
}

interface AgroTechSkillsRadarProps {
  municipality: string;
}

// --- DATA GENERATION LOGIC ---
const getProfileByCity = (city: string): TechProfile[] => {
  const normalizedCity = city.toLowerCase();
  
  // Tenta encontrar dados reais para refinar a lógica
  const profile = MUNICIPIOS_PERFIL.find(m => normalizedCity.includes(m.nome.toLowerCase()));
  const isHighTech = profile?.agro.nivel_tecnologico === 'Alto';
  const region = profile?.regiao || 'Centro-Oeste';
  const state = profile?.estado || 'MT';

  // Lógica Baseada em Região/Vocação (Mais robusta)

  // 1. Grãos & Algodão (Centro-Oeste + MATOPIBA)
  if (region === 'Centro-Oeste' || state === 'BA' || state === 'MA' || state === 'PI' || state === 'TO') {
    return [
      { subject: 'Agricultura de Precisão (GPS)', demanda: isHighTech ? 95 : 80, oferta: 50, fullMark: 100 },
      { subject: 'Mecanização Pesada', demanda: 90, oferta: 40, fullMark: 100 },
      { subject: 'Monitoramento de Safra', demanda: 75, oferta: 30, fullMark: 100 },
      { subject: 'Gestão de Defensivos', demanda: 85, oferta: 60, fullMark: 100 },
      { subject: 'Conectividade Rural', demanda: isHighTech ? 80 : 60, oferta: 20, fullMark: 100 },
      { subject: 'Commodities Trading', demanda: 70, oferta: 30, fullMark: 100 },
    ];
  }

  // 2. Cana & Bioenergia (SP, MG, GO sul, MS sul)
  if (state === 'SP' || (state === 'MS' && normalizedCity.includes('dourados')) || normalizedCity.includes('uberaba')) {
    return [
      { subject: 'Automação Industrial', demanda: 95, oferta: 70, fullMark: 100 },
      { subject: 'Logística de Colheita', demanda: 90, oferta: 60, fullMark: 100 },
      { subject: 'Biotecnologia (Etanol)', demanda: 85, oferta: 65, fullMark: 100 },
      { subject: 'Drones de Pulverização', demanda: 70, oferta: 30, fullMark: 100 },
      { subject: 'Gestão de Frotas', demanda: 80, oferta: 50, fullMark: 100 },
      { subject: 'ESG & Crédito Carbono', demanda: 75, oferta: 20, fullMark: 100 },
    ];
  }

  // 3. Fruticultura Irrigada (Vale do São Francisco)
  if (normalizedCity.includes('petrolina') || normalizedCity.includes('juazeiro')) {
    return [
      { subject: 'Engenharia Hídrica', demanda: 100, oferta: 60, fullMark: 100 },
      { subject: 'Certificação Internacional', demanda: 95, oferta: 40, fullMark: 100 },
      { subject: 'Cadeia do Frio', demanda: 90, oferta: 30, fullMark: 100 },
      { subject: 'Fitossanidade', demanda: 85, oferta: 70, fullMark: 100 },
      { subject: 'Rastreabilidade (Blockchain)', demanda: 60, oferta: 10, fullMark: 100 },
      { subject: 'Logística de Exportação', demanda: 95, oferta: 50, fullMark: 100 },
    ];
  }

  // 4. Proteína Animal & Cooperativismo (Sul)
  if (region === 'Sul' || normalizedCity.includes('chapeco') || normalizedCity.includes('cascavel')) {
    return [
      { subject: 'Zootecnia de Precisão', demanda: 90, oferta: 70, fullMark: 100 },
      { subject: 'Ambiência & Climatização', demanda: 85, oferta: 50, fullMark: 100 },
      { subject: 'Gestão de Cooperativas', demanda: 80, oferta: 80, fullMark: 100 }, // Oferta alta no Sul
      { subject: 'Indústria 4.0 (Frigorífico)', demanda: 95, oferta: 40, fullMark: 100 },
      { subject: 'Energia Fotovoltaica/Biogás', demanda: 75, oferta: 30, fullMark: 100 },
      { subject: 'Sanidade Animal', demanda: 90, oferta: 85, fullMark: 100 },
    ];
  }

  // 5. Café (MG/ES)
  if (normalizedCity.includes('patrocínio') || normalizedCity.includes('varginha')) {
      return [
      { subject: 'Classificação de Grãos', demanda: 90, oferta: 70, fullMark: 100 },
      { subject: 'Mecanização de Montanha', demanda: 80, oferta: 30, fullMark: 100 },
      { subject: 'Barismo & Mercado Especial', demanda: 75, oferta: 40, fullMark: 100 },
      { subject: 'Irrigação de Precisão', demanda: 85, oferta: 50, fullMark: 100 },
      { subject: 'Certificações (Rainforest)', demanda: 90, oferta: 30, fullMark: 100 },
      { subject: 'Gestão Financeira', demanda: 70, oferta: 60, fullMark: 100 },
    ];
  }

  // Default (Genérico Tecnológico)
  return [
    { subject: 'Agricultura de Precisão', demanda: 70, oferta: 40, fullMark: 100 },
    { subject: 'Gestão de Dados', demanda: 80, oferta: 20, fullMark: 100 },
    { subject: 'Operação de Máquinas', demanda: 90, oferta: 60, fullMark: 100 },
    { subject: 'Sustentabilidade', demanda: 60, oferta: 30, fullMark: 100 },
    { subject: 'Finanças Rurais', demanda: 75, oferta: 50, fullMark: 100 },
    { subject: 'Inglês Técnico', demanda: 65, oferta: 30, fullMark: 100 },
  ];
};

const RecommendationCard: React.FC<{ data: TechProfile[] }> = ({ data }) => {
  // Encontrar o maior gap (Demanda - Oferta)
  const biggestGap = useMemo(() => {
    return [...data].sort((a, b) => (b.demanda - b.oferta) - (a.demanda - a.oferta))[0];
  }, [data]);

  if (!biggestGap) return null;

  const gapValue = biggestGap.demanda - biggestGap.oferta;

  // Mapear gap para sugestão de curso
  let suggestion = "";
  let icon = <BrainCircuit className="text-blue-600" />;

  if (biggestGap.subject.includes('Dados') || biggestGap.subject.includes('Blockchain')) {
    suggestion = "MBA em AgroData & Inteligência Artificial";
    icon = <Cpu className="text-purple-600" size={24} />;
  } else if (biggestGap.subject.includes('Automação') || biggestGap.subject.includes('Indústria')) {
    suggestion = "Tecnólogo em Mecanização e Robótica Agrícola";
    icon = <Truck className="text-orange-600" size={24} />;
  } else if (biggestGap.subject.includes('Hídrica') || biggestGap.subject.includes('Irrigação')) {
    suggestion = "Engenharia Hídrica com ênfase em Fertirrigação";
    icon = <Droplets className="text-blue-500" size={24} />;
  } else if (biggestGap.subject.includes('Precisão') || biggestGap.subject.includes('Drones')) {
    suggestion = "Curso de Extensão: Operação de Drones e Sensoriamento Remoto";
    icon = <LineChart className="text-green-600" size={24} />;
  } else {
    suggestion = `Especialização em ${biggestGap.subject}`;
    icon = <Sprout className="text-emerald-600" size={24} />;
  }

  return (
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-4 animate-fade-in">
      <div className="bg-white p-2 rounded-full shadow-sm">{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-blue-900">Oportunidade de Curso Identificada</h4>
        <p className="text-xs text-blue-700 mt-1">
          Detectamos um déficit de <strong>{gapValue}%</strong> em <strong>{biggestGap.subject}</strong>.
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-2">
          Sugestão de Abertura: <span className="text-blue-600 underline">{suggestion}</span>
        </p>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const demanda = payload[0].value;
    const oferta = payload[1].value;
    const gap = demanda - oferta;
    
    return (
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-xs z-50">
        <p className="font-bold text-sm mb-2 border-b border-slate-600 pb-1">{label}</p>
        <p className="text-blue-300">📡 Demanda (Mercado): <span className="font-bold text-white">{demanda}%</span></p>
        <p className="text-purple-300">🎓 Oferta (Ensino): <span className="font-bold text-white">{oferta}%</span></p>
        <div className={`mt-2 pt-1 border-t border-slate-600 font-bold ${gap > 20 ? 'text-green-400' : 'text-yellow-400'}`}>
          {gap > 0 ? `Gap de Oportunidade: +${gap}%` : 'Mercado Saturado'}
        </div>
      </div>
    );
  }
  return null;
};

export const AgroTechSkillsRadar: React.FC<AgroTechSkillsRadarProps> = ({ municipality }) => {
  const data = useMemo(() => getProfileByCity(municipality), [municipality]);
  const [hoverInfo, setHoverInfo] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
           <h3 className="text-md font-bold text-gray-800 flex items-center gap-2">
             Vocação Tecnológica (Hard Skills)
           </h3>
           <p className="text-xs text-gray-500">Comparativo: Exigência do Mercado vs. Grade Curricular Local</p>
        </div>
        <button 
          onMouseEnter={() => setHoverInfo(true)} 
          onMouseLeave={() => setHoverInfo(false)}
          className="text-gray-400 hover:text-blue-600 relative"
        >
          <Info size={18} />
          {hoverInfo && (
            <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-xs p-3 rounded shadow-xl z-50">
              Este gráfico cruza a vocação regional (Ex: Grãos no Centro-Oeste vs. Frutas no NE) com vagas de emprego e oferta educacional para identificar gaps de competência.
            </div>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-[300px] w-full min-w-0 relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid gridType="polygon" stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            
            <Radar
              name="Demanda de Mercado"
              dataKey="demanda"
              stroke="#2563eb"
              strokeWidth={3}
              fill="#3b82f6"
              fillOpacity={0.3}
            />
            <Radar
              name="Oferta de Ensino Atual"
              dataKey="oferta"
              stroke="#9333ea"
              strokeWidth={2}
              fill="#a855f7"
              fillOpacity={0.3}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <RecommendationCard data={data} />
    </div>
  );
};

export default AgroTechSkillsRadar;
