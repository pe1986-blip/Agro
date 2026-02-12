
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, Info } from 'lucide-react';

interface PenetrationGaugeProps {
  rate: number; // Valor percentual (0 a 100)
}

const PenetrationGauge: React.FC<PenetrationGaugeProps> = ({ rate }) => {
  // Lógica de Cores Invertida (Baixo é bom)
  let status = "Oceano Azul (Alta Oportunidade)";
  let color = "#10b981"; // Green
  let msg = "A demanda reprimida é gigantesca. Poucos concorrentes atendendo a população.";

  if (rate > 20) {
    status = "Mercado em Desenvolvimento";
    color = "#f59e0b"; // Amber
    msg = "O mercado começa a amadurecer. Exige posicionamento mais específico.";
  }
  if (rate > 40) {
    status = "Mercado Saturado";
    color = "#ef4444"; // Red
    msg = "Alta concorrência. Crescimento dependerá de roubar alunos de outras IES.";
  }

  const data = [
    { name: 'Penetração', value: rate },
    { name: 'Restante', value: 100 - rate },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center h-full">
      <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 mb-1 uppercase tracking-tighter">
        <Target size={18} className="text-blue-600"/> Taxa de Penetração Real
      </h3>
      <p className="text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-widest">Matrículas Totais / População Alvo (18-24)</p>

      <div className="relative w-full h-[140px] flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%" // Meia lua
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Valor Central */}
        <div className="absolute bottom-0 text-center">
            <span className="text-4xl font-black text-gray-800">{rate}%</span>
        </div>
      </div>

      <div className={`mt-4 px-4 py-2 rounded-lg text-xs font-bold border ${rate > 40 ? 'bg-red-50 border-red-200 text-red-700' : rate > 20 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
         {status}
      </div>
      
      <p className="text-[11px] text-gray-500 mt-3 leading-tight px-4 font-medium">
        {msg}
      </p>
    </div>
  );
};

export default PenetrationGauge;
