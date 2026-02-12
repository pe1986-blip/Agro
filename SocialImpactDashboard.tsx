
import React, { useMemo } from 'react';
import { calculateSocialROI } from './services/impactAnalysisService';
import { TrendingUp, Users, DollarSign, Sprout, Scale, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { MunicipioPerfil } from './types';

const ImpactCard = ({ title, value, unit, icon, color }: any) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${color.bg} ${color.text}`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-extrabold text-gray-800">{value}</span>
      <span className="text-xs font-medium text-gray-400">{unit}</span>
    </div>
  </div>
);

const SocialImpactDashboard: React.FC<{ municipio: MunicipioPerfil }> = ({ municipio }) => {
  const metrics = useMemo(() => calculateSocialROI(municipio), [municipio]);

  const chartData = [
    { name: 'Equidade', value: metrics.educationalEquityIndex, full: 100, color: '#6366f1' },
    { name: 'Retenção Rural', value: metrics.ruralExodusPreventionRate, full: 100, color: '#10b981' },
    { name: 'Produtividade', value: metrics.localProductivityGainPct * 5, full: 100, color: '#f59e0b' },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-lg animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
            <Heart size={24} className="text-pink-500" />
            ROI Social e Impacto Regional
          </h2>
          <p className="text-sm text-indigo-600 mt-1">Estimativa de retorno para a sociedade com base em expansão qualificada.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ImpactCard 
          title="Incremento no PIB" 
          value={metrics.gdpImpactMillions.toFixed(1)} 
          unit="M R$" 
          icon={<DollarSign size={20}/>} 
          color={{ bg: 'bg-green-100', text: 'text-green-600' }}
        />
        <ImpactCard 
          title="Empregos Gerados" 
          value={metrics.jobsGenerated} 
          unit="postos" 
          icon={<Users size={20}/>} 
          color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
        />
        <ImpactCard 
          title="Arrecadação Fiscal" 
          value={metrics.taxRevenueMillions.toFixed(1)} 
          unit="M R$" 
          icon={<TrendingUp size={20}/>} 
          color={{ bg: 'bg-orange-100', text: 'text-orange-600' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[250px]">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Scale size={16} className="text-indigo-500"/> Índice de Equidade e Retenção
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }} width={80} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-indigo-900 text-white p-5 rounded-xl flex flex-col justify-center relative overflow-hidden shadow-xl">
          <div className="absolute -right-6 -top-6 opacity-10">
            <Sprout size={120} />
          </div>
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Conclusão Executiva</p>
          <p className="text-lg font-medium leading-relaxed italic">
            "Este investimento em {municipio.nome} gera um retorno social equivalente a <span className="text-yellow-400 font-bold">R$ {(metrics.gdpImpactMillions/10).toFixed(1)}M</span> por cada 100 formados ao longo de 5 anos."
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialImpactDashboard;
