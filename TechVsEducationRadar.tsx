
import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { MUNICIPIOS_PERFIL } from './constants';
import { Info } from 'lucide-react';

interface TechVsEducationRadarProps {
  municipality: string;
}

const normalize = (val: number, min: number, max: number) => {
    return Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
};

const generateDataFromProfile = (municipalityName: string) => {
    const city = MUNICIPIOS_PERFIL.find(m => m.nome === municipalityName || municipalityName.includes(m.nome)) || MUNICIPIOS_PERFIL[0];
    const techScore = normalize(city.pib_agro_bi, 0.5, 10); 

    let securityScore = 60; 
    if (city.regiao === 'Centro-Oeste') securityScore += 25;
    if (city.regiao === 'Sul') securityScore += 15;
    if (city.nome === 'Petrolina' || city.nome === 'Juazeiro') securityScore += 30; 
    securityScore = Math.min(100, securityScore);

    const qualifScore = normalize(Math.log(city.ing_total_2023 || 1000), Math.log(1000), Math.log(50000));
    const rdScore = normalize((city.conceito_enade_medio || 3) * (city.idh || 0.7), 2.0, 4.5);

    return [
        { subject: 'Tecnologia no Campo', municipio: Math.round(techScore), mediaBrasil: 45, fullMark: 100 },
        { subject: 'Segurança Climática', municipio: Math.round(securityScore), mediaBrasil: 60, fullMark: 100 },
        { subject: 'Volume de Qualificação', municipio: Math.round(qualifScore), mediaBrasil: 50, fullMark: 100 },
        { subject: 'P&D e Inovação', municipio: Math.round(rdScore), mediaBrasil: 40, fullMark: 100 },
    ];
};

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-xs z-50">
        <p className="font-bold text-sm mb-2 border-b border-slate-600 pb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex justify-between gap-4 mb-1">
            <span style={{ color: p.color }} className="font-semibold">{p.name}:</span>
            <span>{p.value}/100</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TechVsEducationRadar: React.FC<TechVsEducationRadarProps> = ({ municipality }) => {
    const data = useMemo(() => generateDataFromProfile(municipality), [municipality]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 min-h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid gridType="polygon" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Radar name={municipality} dataKey="municipio" stroke="#8884d8" strokeWidth={2} fill="#8884d8" fillOpacity={0.5} />
                        <Radar name="Média Brasil" dataKey="mediaBrasil" stroke="#82ca9d" strokeWidth={2} fill="#82ca9d" fillOpacity={0.2} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-2 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <Info size={12} className="text-purple-600"/> Legenda dos Vértices:
                </h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-gray-600">
                    <div><span className="font-bold block text-gray-800">Tecnologia:</span> % de Área Irrigada e Maquinário.</div>
                    <div><span className="font-bold block text-gray-800">Segurança:</span> Estabilidade climática (ZARC) e Risco.</div>
                    <div><span className="font-bold block text-gray-800">Qualificação:</span> Volume de alunos e cursos ofertados.</div>
                    <div><span className="font-bold block text-gray-800">P&D:</span> Nota Enade e Projetos de Pesquisa.</div>
                </div>
            </div>
        </div>
    );
};

export default TechVsEducationRadar;
