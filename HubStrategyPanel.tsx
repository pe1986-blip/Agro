
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import type { MunicipioPerfil } from './types';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs font-sans">
        <p className="font-bold text-indigo-300 uppercase mb-1">{label}</p>
        <p className="text-white text-lg font-black">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

const HubStrategyPanel: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
  // Dados Default para evitar crash se a cidade não tiver os dados de Hub
  const detalhes = city.hub_analise?.detalhes || {
    servicos_avancados: 50,
    sedes_corporativas: 40,
    conexoes_politicas: 30,
    eventos_networking: 30,
    educacao_premium_k12: 50,
    saude_complexidade: 50,
    mercado_luxo: 20
  };

  const data = [
    { subject: 'Serviços Avançados', A: detalhes.servicos_avancados, fullMark: 100 },
    { subject: 'Sedes Corporativas', A: detalhes.sedes_corporativas, fullMark: 100 },
    { subject: 'Política & Decisão', A: detalhes.conexoes_politicas, fullMark: 100 },
    { subject: 'Eventos & Network', A: detalhes.eventos_networking, fullMark: 100 },
    { subject: 'Educação Premium', A: detalhes.educacao_premium_k12, fullMark: 100 },
    { subject: 'Saúde Complexa', A: detalhes.saude_complexidade, fullMark: 100 },
    { subject: 'Mercado de Luxo', A: detalhes.mercado_luxo, fullMark: 100 },
  ];

  const score = city.hub_analise?.score_geral || 50;
  const classification = city.hub_analise?.classificacao || 'Em Desenvolvimento';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6">
        
        {/* COLUNA DA ESQUERDA: Métricas Principais */}
        <div className="flex flex-col justify-center gap-6 lg:col-span-1 border-r border-slate-100 pr-6">
            <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Classificação de Hub</p>
                <h3 className="text-3xl font-black text-slate-800 leading-tight">{classification}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${score}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{score}/100</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Pilar de Negócios</p>
                    <p className="text-xl font-black text-indigo-900">{city.hub_analise?.pilares?.negocios || 0}<span className="text-xs text-indigo-400 ml-1">/100</span></p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Pilar de Influência</p>
                    <p className="text-xl font-black text-purple-900">{city.hub_analise?.pilares?.influencia || 0}<span className="text-xs text-purple-400 ml-1">/100</span></p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Pilar de Lifestyle</p>
                    <p className="text-xl font-black text-emerald-900">{city.hub_analise?.pilares?.lifestyle || 0}<span className="text-xs text-emerald-400 ml-1">/100</span></p>
                </div>
            </div>
        </div>

        {/* COLUNA DA DIREITA: Radar Chart */}
        <div className="lg:col-span-2 h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Hub Score"
                        dataKey="A"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fill="#6366f1"
                        fillOpacity={0.4}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Hub Strategy Matrix v2.0
            </div>
        </div>
    </div>
  );
};

export default HubStrategyPanel;
