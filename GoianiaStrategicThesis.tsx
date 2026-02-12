
import React from 'react';
import { 
  Network, BrainCircuit, Wallet, Heart, Scale, 
  ArrowRight, CheckCircle2, TrendingUp, DollarSign, 
  Globe, Zap, ShieldCheck, Gem, Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

const PILLARS = [
  {
    id: 'orchestrator',
    title: 'O Orquestrador de Ecossistemas',
    icon: Network,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20',
    border: 'border-blue-500/30',
    thesis: "Goiânia não produz grãos, ela produz conexões. Conectamos a pesquisa da UNP/Unisul com a demanda operacional de Rio Verde e Sorriso.",
    benefit: "Redução de 40% no tempo de 'Time-to-Market' de novas soluções educacionais."
  },
  {
    id: 'thinktank',
    title: 'Think Tank Autoral',
    icon: BrainCircuit,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20',
    border: 'border-purple-500/30',
    thesis: "Somos a voz técnica que pauta o setor. Geramos dados proprietários que servem de fundamentação para governo e associações.",
    benefit: "Aumento do ágio (Brand Equity) e autoridade institucional."
  },
  {
    id: 'monetization',
    title: 'Monetização Híbrida',
    icon: Wallet,
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/20',
    border: 'border-emerald-500/30',
    thesis: "Menor dependência de mensalidades individuais. Foco em Corporate Labs financiado por gigantes do setor (B2B).",
    benefit: "Receita recorrente e contratos de longo prazo (LTV elevado)."
  },
  {
    id: 'hospitality',
    title: 'Padrão EHL (Hospitalidade)',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-900/20',
    border: 'border-rose-500/30',
    thesis: "O aluno não 'estuda agro', ele vive em um ambiente de alto padrão que simula a excelência corporativa global.",
    benefit: "Poder de precificação (Ticket Médio Premium) e diferenciação total."
  }
];

const MONETIZATION_MIX = [
  { name: 'B2B Corporate', value: 45, color: '#10b981' },
  { name: 'Premium B2C', value: 35, color: '#3b82f6' },
  { name: 'Serviços de Intel', value: 20, color: '#8b5cf6' }
];

const ASSET_LIGHT_DATA = [
  { category: 'Modelo Tradicional', capex: 80, brain: 20 },
  { category: 'Ânima Agro Sede', capex: 30, brain: 70 }
];

const GoianiaStrategicThesis: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16 pb-20">
      
      {/* 1. MANIFESTO DE VALOR */}
      <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none text-emerald-400">
            <ShieldCheck size={300} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-6">Investment Memo</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-white leading-tight mb-8">
                "Não construímos custos de infraestrutura. <br/>
                Construímos ativos de inteligência territorial."
            </h3>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
                A Sede Nacional em Goiânia é a <strong>alavanca de múltiplo</strong> de todo o projeto. Ela justifica o posicionamento premium da UNA no campo e centraliza a captura de valor das cadeias produtivas de Goiás e Mato Grosso.
            </p>
        </div>
      </section>

      {/* 2. OS 4 PILARES DA TESE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((p) => (
          <div key={p.id} className={`p-8 rounded-[2.5rem] border ${p.bg} ${p.border} hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between h-full`}>
            <div className="mb-6">
                <div className={`p-3 rounded-xl bg-slate-950 shadow-lg w-fit mb-4 ${p.color}`}>
                    <p.icon size={28} />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">{p.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{p.thesis}</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Impacto no Valuation:</span>
                <span className="text-xs font-bold text-white">{p.benefit}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 3. DADOS DO RACIONAL (MIX E ASSET LIGHT) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MIX DE MONETIZAÇÃO */}
        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <DollarSign size={20}/>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Mix de Receita Estratégico</h3>
            </div>
            
            <div className="flex-1 min-h-[300px] flex items-center">
                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={MONETIZATION_MIX} 
                                cx="50%" cy="50%" 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {MONETIZATION_MIX.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-4">
                    {MONETIZATION_MIX.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase">{item.name}</p>
                                <p className="text-lg font-black text-white">{item.value}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-[10px] text-slate-500 italic mt-6 border-t border-white/5 pt-4">
                *Modelo desenhado para reduzir a exposição à inadimplência do aluno pessoa física.
            </p>
        </div>

        {/* ASSET LIGHT ESTRATÉGIA */}
        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <Layers size={20}/>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Relação CAPEX vs. INTELECTUAL</h3>
            </div>
            
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ASSET_LIGHT_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} axisLine={false} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                        <Bar dataKey="capex" name="Investimento em Ativos (Físico)" stackId="a" fill="#334155" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="brain" name="Investimento em Inteligência" stackId="a" fill="#10b981" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-[9px] font-black uppercase text-slate-500">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Infra (Capex)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Pessoas & Intel (Opex/Capex)</div>
            </div>
        </div>

      </section>

      {/* 4. VERDITO DO RELATOR */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 p-4 opacity-10">
            <Gem size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Conclusão: O Diferencial de Valuation</h3>
                <p className="text-lg font-medium leading-relaxed italic opacity-90">
                    "Ao retirar o peso do real estate através da parceria com a Construcap e injetar autoridade técnica proprietária, a Sede Nacional se torna um ativo de margem alta e risco mitigado. Goiânia é o porto seguro do projeto."
                </p>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl shrink-0 flex items-center gap-2">
                Simular Cenários <ArrowRight size={14}/>
            </button>
        </div>
      </div>

    </div>
  );
};

export default GoianiaStrategicThesis;
