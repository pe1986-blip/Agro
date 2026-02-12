
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Landmark, AlertTriangle, CheckCircle, TrendingUp, Sprout, ShoppingBag } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const COLORS = {
  Agro: '#16a34a',
  Indústria: '#f97316',
  Serviços: '#3b82f6',
  Governo: '#94a3b8'
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="900">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const EconomicMatrixWidget: React.FC<{ data: MunicipioPerfil }> = ({ data }) => {
  const comp = data.economia.pib_composicao;
  const chartData = [
    { name: 'Agropecuária', value: comp.agropecuaria_bi, color: COLORS.Agro },
    { name: 'Indústria', value: comp.industria_bi, color: COLORS.Indústria },
    { name: 'Serviços & Comércio', value: comp.servicos_bi, color: COLORS.Serviços },
    { name: 'Admin. Pública', value: comp.administracao_publica_bi, color: COLORS.Governo },
  ];

  return (
    // FIX: Removed bg-white, p-6, rounded-2xl to allow component to fill parent container cleanly
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <h3 className="text-xs font-bold text-gray-500 flex items-center gap-2 mb-2 uppercase tracking-wider pl-1">
        <Landmark size={14} className="text-slate-400"/> PIB Municipal: {data.nome}
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%" cy="50%"
              // FIX: Using percentages for responsive scaling
              innerRadius="60%" outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EconomicMatrixWidget;
