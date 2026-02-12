import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, Users, Target, 
  ArrowRight, ShieldCheck, Zap, Calculator,
  RefreshCw, Info, AlertCircle, Building2, Handshake,
  Wrench, Megaphone, Search, GraduationCap, Coins
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell, ComposedChart, Line
} from 'recharts';
// Added missing import for formatNumber
import { formatNumber } from './constants';

const UnaValueCalculator: React.FC = () => {
  // --- ESTADO DOS DRIVERS DE RECEITA ---
  const [baseRevenue, setBaseRevenue] = useState(10); // R$ MM
  const [ticketLift, setTicketLift] = useState(15); // % aumento ticket
  const [retentionGain, setRetentionGain] = useState(8); // % redução evasão
  const [b2bPotential, setB2bPotential] = useState(1.5); // R$ MM contratos B2B

  // --- ESTADO DO INVESTIMENTO (KIT) ---
  const [brandingCost, setBrandingCost] = useState(200); // R$ k
  const [intelCost, setIntelCost] = useState(150); // R$ k
  const [talentCost, setTalentCost] = useState(100); // R$ k
  const [infraCost, setInfraCost] = useState(300); // R$ k
  const [opexExtraMonthly, setOpexExtraMonthly] = useState(50); // R$ k (Conselho + Vendas)

  // --- CÁLCULOS TOTAIS ---
  const totalCapex = useMemo(() => {
    return (brandingCost + intelCost + talentCost + infraCost) / 1000; // Converte para MM
  }, [brandingCost, intelCost, talentCost, infraCost]);

  const yearlyOpexIncremental = (opexExtraMonthly * 12) / 1000; // MM

  const projectionData = useMemo(() => {
    const data = [];
    let accumFlow = -totalCapex;

    for (let year = 0; year <= 5; year++) {
      if (year === 0) {
        data.push({
          year: 'Setup',
          legado: baseRevenue,
          incremental: 0,
          total: baseRevenue,
          flow: -totalCapex,
          accum: accumFlow
        });
        continue;
      }

      // Progressão do Lift (Curva de Maturação: 40%, 70%, 90%, 100%, 105%)
      const maturationFactors = [0, 0.4, 0.7, 0.9, 1.0, 1.05];
      const factor = maturationFactors[year];
      
      const liftRevenue = baseRevenue * (ticketLift / 100) * factor;
      const retentionRevenue = baseRevenue * (retentionGain / 100) * factor;
      const b2bRev = b2bPotential * factor;

      const totalIncremental = liftRevenue + retentionRevenue + b2bRev;
      
      // No Ano 1 o Opex é parcial, do Ano 2 em diante é cheio
      const currentYearOpex = year === 1 ? yearlyOpexIncremental * 0.5 : yearlyOpexIncremental;
      const yearlyNetIncremental = totalIncremental - currentYearOpex;
      
      accumFlow += yearlyNetIncremental;

      data.push({
        year: `Ano ${year}`,
        legado: baseRevenue,
        incremental: parseFloat(totalIncremental.toFixed(2)),
        total: parseFloat((baseRevenue + totalIncremental).toFixed(2)),
        flow: parseFloat(yearlyNetIncremental.toFixed(2)),
        accum: parseFloat(accumFlow.toFixed(2))
      });
    }
    return data;
  }, [baseRevenue, ticketLift, retentionGain, b2bPotential, totalCapex, yearlyOpexIncremental]);

  const paybackYear = useMemo(() => {
    const found = projectionData.find(d => d.accum > 0);
    if (!found) return "> 5 anos";
    return found.year;
  }, [projectionData]);

  const finalROI = useMemo(() => {
    const finalAccum = projectionData[projectionData.length - 1].accum;
    return ((finalAccum / totalCapex) * 100).toFixed(0);
  }, [projectionData, totalCapex]);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* HEADER EXECUTIVO COM RESUMO DOS RESULTADOS */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Calculator size={220} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 w-fit animate-pulse">
               Simulador de Viabilidade V2.0
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              Una Vocacionada <span className="text-blue-500">Lift</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Calibre o investimento do Kit e os indicadores de performance para visualizar o impacto no EBITDA e o tempo de retorno da transformação.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Payback do Kit</p>
                <p className="text-3xl font-black text-emerald-400">{paybackYear}</p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ROI Est. (5 Anos)</p>
                <p className="text-3xl font-black text-blue-400">{finalROI}%</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[300px] w-full bg-white/5 rounded-[2.5rem] p-6 border border-white/5">
             <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} axisLine={false} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}
                    formatter={(val: number) => [`R$ ${val.toFixed(2)} MM`, '']}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold'}} />
                  <Bar dataKey="legado" name="Receita Base (Legado)" stackId="a" fill="#1e293b" barSize={50} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="incremental" name="Incremento Vocacionado" stackId="a" fill="#10b981" barSize={50} radius={[10, 10, 0, 0]} />
                  <Line type="monotone" dataKey="accum" name="Saldo Acumulado" stroke="#60a5fa" strokeWidth={4} dot={{ r: 6, fill: '#60a5fa', strokeWidth: 2, stroke: '#fff' }} />
                </ComposedChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUNA 1: SETUP DO INVESTIMENTO (CAPEX) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Coins size={16} className="text-slate-400"/> 1. Setup do Investimento (Kit)
            </h4>
            
            <div className="space-y-6">
                <InputGroup icon={Megaphone} label="Branding & Posicionamento" value={brandingCost} onChange={setBrandingCost} suffix="k" color="indigo" />
                <InputGroup icon={Search} label="Observatório & Inteligência" value={intelCost} onChange={setIntelCost} suffix="k" color="blue" />
                <InputGroup icon={GraduationCap} label="Headhunting & Acadêmico" value={talentCost} onChange={setTalentCost} suffix="k" color="purple" />
                <InputGroup icon={Building2} label="Infraestrutura & Labs" value={infraCost} onChange={setInfraCost} suffix="k" color="emerald" />
                
                <div className="pt-4 mt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-400 uppercase">Investimento Total Kit</span>
                        {/* Fixed missing formatNumber call */}
                        <span className="text-xl font-black text-slate-900">R$ {formatNumber(totalCapex)} MM</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] text-white border border-slate-800">
             <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manutenção (Opex Extra)</h4>
                <Zap size={14} className="text-yellow-400" />
             </div>
             <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-black text-white">R$ {opexExtraMonthly}k</span>
                <span className="text-xs font-bold text-slate-500 mb-1">/mês</span>
             </div>
             <input 
                type="range" min="10" max="200" step="10" 
                value={opexExtraMonthly} onChange={e => setOpexExtraMonthly(Number(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400" 
              />
              <p className="text-[10px] text-slate-500 mt-3 italic">Inclui Conselho Local e Consultores B2B.</p>
          </div>
        </div>

        {/* COLUNA 2: DRIVERS DE PERFORMANCE (LIFT) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">2. Calibração de Performance</h4>
                    <p className="text-sm text-slate-500">Ajuste a base e as alavancas de crescimento esperadas.</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Receita Base Unidade</span>
                    <span className="text-xl font-black text-blue-800">R$ {baseRevenue} MM</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Lado A: Drivers Principais */}
                <div className="space-y-10">
                    <SliderGroup 
                        label="Receita Líquida Atual (Base)" 
                        value={baseRevenue} 
                        onChange={setBaseRevenue} 
                        min={2} max={50} step={1} 
                        prefix="R$ " suffix=" MM" 
                        color="blue" 
                        help="Volume atual da unidade selecionada."
                    />
                    <SliderGroup 
                        label="Potencial B2B (Anual)" 
                        value={b2bPotential} 
                        onChange={setB2bPotential} 
                        min={0} max={10} step={0.5} 
                        prefix="R$ " suffix=" MM" 
                        color="amber" 
                        help="Estimativa de contratos corporativos novos."
                    />
                </div>

                {/* Lado B: Alavancas de Valor */}
                <div className="space-y-10">
                    <SliderGroup 
                        label="Prêmio de Ticket (Repricing)" 
                        value={ticketLift} 
                        onChange={setTicketLift} 
                        min={0} max={40} step={5} 
                        prefix="+" suffix="%" 
                        color="emerald" 
                        help="Ganho por percepção de valor e exclusividade."
                    />
                    <SliderGroup 
                        label="Ganho de Retenção (Hedge)" 
                        value={retentionGain} 
                        onChange={setRetentionGain} 
                        min={0} max={15} step={1} 
                        prefix="+" suffix="%" 
                        color="purple" 
                        help="Redução da evasão por adequação vocacional."
                    />
                </div>
            </div>
          </div>

          {/* INSIGHT FINAL */}
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] flex items-start gap-6">
             <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600">
                <TrendingUp size={32} />
             </div>
             <div>
                <h4 className="text-lg font-black text-emerald-900 uppercase tracking-tight mb-2">Efeito Multiplicador</h4>
                <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                    {/* Fixed missing formatNumber call */}
                    Ao investir <strong className="text-emerald-900">R$ {formatNumber(totalCapex)} MM</strong> no Kit de Transformação, a unidade deixa de ser uma commodity educacional. O incremento líquido projetado no Ano 3 é de <strong className="text-emerald-900">R$ {projectionData[3].flow} MM</strong>, gerando um payback de margem em menos de 2 anos após a maturação.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTES DE UI ---

const InputGroup = ({ icon: Icon, label, value, onChange, suffix, color }: any) => {
    const colors: any = {
        indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
        blue: 'text-blue-600 bg-blue-50 border-blue-100',
        purple: 'text-purple-600 bg-purple-50 border-purple-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    };

    return (
        <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${colors[color]}`}><Icon size={12}/></div>
                {label}
            </label>
            <div className="relative">
                <input 
                    type="number" 
                    value={value} 
                    onChange={e => onChange(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">{suffix}</span>
            </div>
        </div>
    );
};

const SliderGroup = ({ label, value, onChange, min, max, step, prefix, suffix, color, help }: any) => {
    const accentColors: any = {
        blue: 'accent-blue-600 text-blue-600',
        emerald: 'accent-emerald-600 text-emerald-600',
        amber: 'accent-amber-600 text-amber-600',
        purple: 'accent-purple-600 text-purple-600'
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-4">
                <div>
                    <label className="text-sm font-bold text-slate-700 block">{label}</label>
                    <p className="text-[10px] text-slate-400 font-medium">{help}</p>
                </div>
                <span className={`text-lg font-black ${accentColors[color].split(' ')[1]}`}>
                    {prefix}{value}{suffix}
                </span>
            </div>
            <input 
                type="range" min={min} max={max} step={step} 
                value={value} onChange={e => onChange(Number(e.target.value))}
                className={`w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer ${accentColors[color].split(' ')[0]}`} 
            />
        </div>
    );
};

export default UnaValueCalculator;