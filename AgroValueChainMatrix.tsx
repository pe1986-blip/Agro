
import React, { useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { Layers } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const COMPETENCIAS = [
  { id: 1, name: 'Bio & Sustentabilidade', label: 'Bio & ESG' },
  { id: 2, name: 'Operação Técnica', label: 'Técnico' },
  { id: 3, name: 'Gestão & Negócios', label: 'Gestão' },
  { id: 4, name: 'Tecnologia & Dados', label: 'Agro 4.0' },
];

const CADEIA = [
  { id: 1, name: 'Antes da Porteira', label: 'Insumos' },
  { id: 2, name: 'Dentro da Porteira', label: 'Produção' },
  { id: 3, name: 'Depois da Porteira', label: 'Indústria' },
];

const generateChainData = (city: MunicipioPerfil) => {
  const data = [];
  const comp = city.economia.pib_composicao;
  const total = comp.agropecuaria_bi + comp.industria_bi + comp.servicos_bi + comp.administracao_publica_bi;
  const wAgro = comp.agropecuaria_bi / (total || 1);
  const wInd = comp.industria_bi / (total || 1);
  const wServ = comp.servicos_bi / (total || 1);

  for (let x of CADEIA) {
    for (let y of COMPETENCIAS) {
      let demanda = 0;
      if (x.id === 1) demanda = (wServ * 40) + (wAgro * 20) + 20;
      if (x.id === 2) demanda = (wAgro * 90) + 10;
      if (x.id === 3) demanda = (wInd * 70) + (wServ * 30);
      if (y.id === 4) demanda *= 1.3;
      if (y.id === 1 && city.agro.nivel_tecnologico === 'Alto') demanda *= 1.2;

      let oferta = 30;
      if (x.id === 2 && y.id === 2) oferta = 85;
      if (y.id === 4) oferta = 15;

      const gap = demanda - oferta;
      let color = '#94a3b8'; 
      let status = 'Neutro';
      if (gap > 30) { color = '#2563eb'; status = 'Oportunidade Alta'; } 
      else if (gap > 10) { color = '#3b82f6'; status = 'Oportunidade Média'; } 
      else if (gap < -10) { color = '#ef4444'; status = 'Saturado'; } 

      data.push({
        x: x.id, y: y.id, z: Math.max(demanda * 10, 100),
        demanda: Math.round(demanda), oferta: Math.round(oferta),
        gap: Math.round(gap), status, color, labelX: x.name, labelY: y.name
      });
    }
  }
  return data;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs z-50">
        <p className="font-bold border-b border-slate-700 pb-1 mb-2">{d.labelX} + {d.labelY}</p>
        <p>Demanda: <span className="text-blue-400 font-bold">{d.demanda}%</span></p>
        <p>Oferta: <span className="text-orange-400 font-bold">{d.oferta}%</span></p>
        <p className="mt-1 pt-1 border-t border-slate-700 font-black text-white">{d.status}</p>
      </div>
    );
  }
  return null;
};

const AgroValueChainMatrix: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
  const data = useMemo(() => generateChainData(city), [city]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-full flex flex-col animate-fade-in relative overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
          <Layers size={20} className="text-blue-600"/>
          Matriz de Valor Agro
        </h3>
      </div>
      <div className="flex-1 w-full min-h-[350px] min-w-0 relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" dataKey="x" name="Etapa" domain={[0.5, 3.5]} ticks={[1, 2, 3]} tickFormatter={(val) => CADEIA[val-1]?.label} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} />
            <YAxis type="number" dataKey="y" name="Competência" domain={[0.5, 4.5]} ticks={[1, 2, 3, 4]} tickFormatter={(val) => COMPETENCIAS[val-1]?.label} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} width={80} />
            <ZAxis type="number" dataKey="z" range={[100, 1000]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgroValueChainMatrix;
