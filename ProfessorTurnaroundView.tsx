
import React, { useState, useMemo } from 'react';
import { 
  Users, TrendingUp, DollarSign, 
  Briefcase, Globe, Rocket, CheckCircle2, 
  XCircle, GraduationCap, 
  Handshake, Zap, Target
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, LabelList
} from 'recharts';
import { formatNumber } from './constants';

const SimulatorCard = () => {
    const [baseSalary, setBaseSalary] = useState(6000); 
    const [studentSuccess, setStudentSuccess] = useState(85); 
    const [consultingProjects, setConsultingProjects] = useState(2); 

    const metrics = useMemo(() => {
        const successBonus = studentSuccess > 80 ? (studentSuccess - 80) * 250 : 0;
        const projectShare = consultingProjects * 40000 * 0.15;
        const totalIncome = baseSalary + successBonus + projectShare;
        
        return [
            { name: 'Salário Base (Dedicação)', value: baseSalary, fill: '#94a3b8' },
            { name: 'Sócio do Aluno (KPI)', value: successBonus, fill: '#10b981' },
            { name: 'Sócio da Ânima (B2B)', value: projectShare, fill: '#3b82f6' }
        ];
    }, [baseSalary, studentSuccess, consultingProjects]);

    const total = metrics.reduce((a, b) => a + b.value, 0);
    const increase = ((total / baseSalary) - 1) * 100;

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <DollarSign size={200} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 mb-2">
                            <Handshake className="text-emerald-400" size={28}/> Smart Contract Docente
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Simule o modelo de incentivos: o professor deixa de ser um "custo de entrega" para ser um impulsionador de receita e sucesso.
                        </p>
                    </div>

                    <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-slate-300 uppercase tracking-widest">Base Fixa</span>
                                <span className="text-white">R$ {formatNumber(baseSalary)}</span>
                            </div>
                            <input 
                                type="range" min="4000" max="15000" step="500"
                                value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-emerald-300 flex items-center gap-1 uppercase tracking-widest"><Users size={12}/> Sucesso (Empregabilidade)</span>
                                <span className="text-white">{studentSuccess}%</span>
                            </div>
                            <input 
                                type="range" min="50" max="100" step="1"
                                value={studentSuccess} onChange={(e) => setStudentSuccess(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-blue-300 flex items-center gap-1 uppercase tracking-widest"><Briefcase size={12}/> Projetos Consultoria</span>
                                <span className="text-white">{consultingProjects} un.</span>
                            </div>
                            <input 
                                type="range" min="0" max="10" step="1"
                                value={consultingProjects} onChange={(e) => setConsultingProjects(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics} layout="vertical" margin={{ left: 20, right: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 'bold' }} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                                    formatter={(value: number) => [`R$ ${formatNumber(value)}`, 'Ganhos']}
                                />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40}>
                                    {metrics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList dataKey="value" position="right" formatter={(val: number) => `R$ ${formatNumber(val)}`} style={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 flex items-center justify-between p-5 bg-white/10 rounded-2xl border border-white/10">
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Renda Total Projetada</p>
                            <p className="text-4xl font-black text-white">R$ {formatNumber(total)}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Incremento Variável</p>
                             <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-bold text-lg">
                                <TrendingUp size={16}/> +{increase.toFixed(0)}%
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProfessorTurnaroundViewProps {
  isEmbedded?: boolean;
}

const ProfessorTurnaroundView: React.FC<ProfessorTurnaroundViewProps> = ({ isEmbedded = false }) => {
  return (
    <div className={`bg-[#fcfbf9] font-sans animate-fade-in ${isEmbedded ? '' : 'min-h-screen pb-20'}`}>
        {!isEmbedded && (
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8 rounded-b-[3rem] shadow-sm mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        O Professor como Sócio do Impacto
                    </h1>
                </div>
            </div>
        )}

        <div className="max-w-6xl mx-auto space-y-20">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                        <XCircle className="text-rose-500" size={28}/> O Modelo Atual (Custo)
                    </h2>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm opacity-70">
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <p className="text-sm text-slate-600"><strong>Horista:</strong> Incentivo à aula longa e passiva.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <p className="text-sm text-slate-600"><strong>Isolado:</strong> Punido se tiver projetos no mercado.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={28}/> A Virada Ânima
                    </h2>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-200 shadow-xl">
                        <ul className="space-y-5">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm text-slate-800"><strong>Sócio B2B:</strong> Revenue share em consultorias.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm text-slate-800"><strong>Sócio do Sucesso:</strong> Bônus por empregabilidade da turma.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Simulador de Impacto na Renda</h2>
                    <p className="text-sm text-slate-500 mt-2">Como o alinhamento de incentivos dobra o valor da entrega.</p>
                </div>
                <SimulatorCard />
            </section>
        </div>
    </div>
  );
};

export default ProfessorTurnaroundView;
