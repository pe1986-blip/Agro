
import React from 'react';
import { 
  ArrowDownCircle, ArrowUpCircle, Info, ShieldAlert, 
  TrendingDown, Zap, Factory, Microscope, LayoutGrid,
  Scale, AlertTriangle, Landmark, Leaf, Database, GraduationCap, Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, Cell 
} from 'recharts';

const ControlNode = ({ title, value, sub, icon: Icon, type }: any) => (
    <div className={`p-6 rounded-3xl border bg-white shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all ${type === 'vulnerability' ? 'border-rose-100' : 'border-blue-100'}`}>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${type === 'vulnerability' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${type === 'vulnerability' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                    {type === 'vulnerability' ? 'Risco' : 'Oportunidade'}
                </span>
            </div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-1">{title}</h4>
            <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
            <p className="text-xs font-bold text-slate-400">{sub}</p>
        </div>
        {/* Decor */}
        <div className={`absolute -right-4 -bottom-4 opacity-5 pointer-events-none ${type === 'vulnerability' ? 'text-rose-600' : 'text-blue-600'}`}>
            <Icon size={120} />
        </div>
    </div>
);

const ScissorChart = () => {
    const data = [
        { year: '2010', tech: 20, edu: 2 },
        { year: '2015', tech: 45, edu: 2 },
        { year: '2020', tech: 70, edu: 2 },
        { year: '2024', tech: 85, edu: 2.1 },
    ];

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Scale size={24} className="text-rose-600"/> O Gráfico de Tesoura
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Adoção de Tecnologia Agro 4.0 vs. Escolaridade Superior no Campo</p>
                </div>
                <div className="flex gap-4 text-[10px] font-black uppercase text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Tech Adoption</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Higher Edu</span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            formatter={(val) => [`${val}%`, '']}
                        />
                        <Bar dataKey="tech" name="Adoção Tecnologia" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        <Line type="monotone" dataKey="edu" name="Nível Superior" stroke="#f43f5e" strokeWidth={4} dot={{ r: 6, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6 bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 leading-relaxed">
                    <strong>Anomalia Sistêmica:</strong> Enquanto a frota de máquinas e o uso de biotecnologia escalaram 300% na última década, o índice de profissionais com nível superior estagnou. Operamos "F1" com mecânica de "fusca".
                </p>
            </div>
        </div>
    );
};

const SubordinationDiagram = () => (
    <div className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        <div className="relative z-10 text-center mb-12">
            <h3 className="text-2xl font-black uppercase tracking-widest text-emerald-400 mb-2">Anatomia da Subordinação</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Brasil: O gap entre a riqueza bruta exportada e a inteligência importada.</p>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-12">
            
            {/* Lado A: O Que Compramos */}
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-[2rem] bg-rose-600/20 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                    <ArrowDownCircle size={48} />
                </div>
                <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">Importamos <br/> Inteligência</h4>
                    <ul className="text-[10px] font-bold text-slate-500 uppercase mt-2 space-y-1">
                        <li>• Fertilizantes (85%)</li>
                        <li>• Defensivos & Patentes</li>
                        <li>• Sensores & Chips</li>
                        <li>• Softwares de Gestão</li>
                    </ul>
                </div>
            </div>

            {/* Centro: O Processador (Brasil) */}
            <div className="relative">
                <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-inner">
                    <Zap size={40} className="text-yellow-400 animate-pulse" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    DIT: Vala da Eficiência
                </div>
            </div>

            {/* Lado B: O Que Vendemos */}
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-[2rem] bg-emerald-600/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <ArrowUpCircle size={48} />
                </div>
                <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">Exportamos <br/> Volume</h4>
                    <ul className="text-[10px] font-bold text-slate-500 uppercase mt-2 space-y-1">
                        <li>• 120 Mi Toneladas Soja</li>
                        <li>• 50 Mi Toneladas Milho</li>
                        <li>• Proteína Bruta</li>
                        <li>• Celulose</li>
                    </ul>
                </div>
            </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-lg font-serif italic text-slate-300">
                "A Ânima Agro é o projeto para inverter essa seta. Criar a inteligência <strong>DENTRO</strong> da porteira."
            </p>
        </div>
    </div>
);

const SoberaniaWidget = () => (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm h-full flex flex-col">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <ShieldAlert size={18} className="text-amber-500"/> Alvos de Soberania (Plano 2050)
        </h3>
        
        <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500 uppercase">Dependência de Fertilizantes (Atual)</span>
                    <span className="text-rose-600">85%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500" style={{ width: '85%' }}></div>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500 uppercase">Meta de Autossuficiência (2050)</span>
                    <span className="text-emerald-600">55%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '55%' }}></div>
                </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Impacto Educacional</p>
                <p className="text-xs text-amber-900 font-medium">
                    Atingir essa meta exige formar <strong>5.000 novos especialistas</strong> em bioinsumos e mineração sustentável anualmente. Atualmente formamos menos de 400.
                </p>
            </div>
        </div>
    </div>
);

const LaborMarketDeepDive: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-12 pb-20">
            
            {/* LINHA 1: VÉRTICES DE CONTROLE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ControlNode 
                    title="Dependência Insumos" 
                    value="85%" 
                    sub="De fertilizantes são importados." 
                    icon={Database} 
                    type="vulnerability"
                />
                <ControlNode 
                    title="Déficit de Qualificação" 
                    value="82%" 
                    sub="Dos produtores relatam falta de técnicos." 
                    icon={GraduationCap} 
                    type="vulnerability"
                />
                <ControlNode 
                    title="Vácuo de AgTech" 
                    value="R$ 12 Bi" 
                    sub="Faturamento evadido para o exterior." 
                    /* icon={Cpu} fix: missing import added above */
                    icon={Cpu} 
                    type="vulnerability"
                />
            </div>

            {/* LINHA 2: O GRÁFICO DE TESOURA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <ScissorChart />
                </div>
                <div className="lg:col-span-4">
                    <SoberaniaWidget />
                </div>
            </div>

            {/* LINHA 3: DIAGRAMA DE SUBORDINAÇÃO */}
            <section>
                <SubordinationDiagram />
            </section>

            {/* RODAPÉ DE AUTORIDADE */}
            <div className="flex justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2">
                    <Landmark size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Fonte: Plano Nacional de Fertilizantes (2022)</span>
                </div>
                <div className="flex items-center gap-2">
                    <Microscope size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Fonte: IPEA / Vieira Filho (2023)</span>
                </div>
            </div>

        </div>
    );
};

export default LaborMarketDeepDive;
