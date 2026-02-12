
import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Label } from 'recharts';
import { Target } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const COLORS = {
  BlueOcean: '#10b981',   
  Battlefield: '#f59e0b', 
  Danger: '#ef4444',      
  Niche: '#3b82f6'        
};

interface SkillPoint {
  area: string;
  oferta: number;
  demanda: number;
  quadrante: string;
}

const generateData = (city: MunicipioPerfil): SkillPoint[] => {
  const comp = city.economia.pib_composicao;
  const total = comp.agropecuaria_bi + comp.industria_bi + comp.servicos_bi + comp.administracao_publica_bi;
  const areas = [
    { name: 'Agronomia',   baseD: (comp.agropecuaria_bi/total)*100 + 20, baseS: 70 },
    { name: 'Tecnologia',  baseD: 80, baseS: 30 },
    { name: 'Gestão',      baseD: (comp.servicos_bi/total)*100 + 10, baseS: 80 },
    { name: 'Direito',     baseD: 40, baseS: 90 },
    { name: 'Saúde',       baseD: 70, baseS: 50 },
    { name: 'Engenharia',  baseD: (comp.industria_bi/total)*100 + 30, baseS: 40 },
  ];
  return areas.map(a => {
    const demanda = Math.min(100, Math.max(10, a.baseD));
    const oferta = Math.min(100, Math.max(10, a.baseS));
    let quadrante = '';
    if (demanda > 50 && oferta < 50) quadrante = 'BlueOcean';
    else if (demanda > 50 && oferta >= 50) quadrante = 'Battlefield';
    else if (demanda <= 50 && oferta >= 50) quadrante = 'Danger';
    else quadrante = 'Niche';
    return { area: a.name, oferta, demanda, quadrante };
  });
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 text-white p-2 rounded shadow text-xs">
        <p className="font-bold">{data.area}</p>
        <p>Demanda: {data.demanda.toFixed(0)} | Oferta: {data.oferta.toFixed(0)}</p>
      </div>
    );
  }
  return null;
};

const StrategicAlignmentMatrix: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
  const data = useMemo(() => generateData(city), [city]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight mb-4">
        <Target size={20} className="text-purple-600"/> Matriz de Alinhamento
      </h3>
      <div className="flex-1 w-full min-h-[300px] min-w-0 relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="oferta" name="Oferta" domain={[0, 100]} tick={{fontSize: 10}}>
                <Label value="Saturação de Oferta" offset={-15} position="insideBottom" style={{fontSize: 10}} />
            </XAxis>
            <YAxis type="number" dataKey="demanda" name="Demanda" domain={[0, 100]} tick={{fontSize: 10}}>
                <Label value="Demanda Econômica" angle={-90} position="insideLeft" style={{fontSize: 10}} />
            </YAxis>
            <ZAxis range={[100, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <ReferenceLine x={50} stroke="#cbd5e1" />
            <ReferenceLine y={50} stroke="#cbd5e1" />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.quadrante as keyof typeof COLORS]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StrategicAlignmentMatrix;
