
import React, { useState, useMemo } from 'react';
import { 
  Users, TrendingUp, Award, DollarSign, 
  Briefcase, Star, Globe, Rocket, CheckCircle2, 
  XCircle, BarChart3, PieChart, GraduationCap, 
  Handshake, Zap, Target
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, ReferenceLine, LabelList
} from 'recharts';
import { formatNumber } from './constants';

// --- DADOS DE BENCHMARK ---
const BENCHMARKS = [
    {
        university: "Wageningen University",
        country: "Holanda",
        model: "Part-time Practitioners",
        desc: "80% dos professores atuam na indústria de alimentos ou em institutos de pesquisa privados 3 dias por semana. A aula é o relato do que eles fizeram ontem na empresa.",
        icon: Zap,
        color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
        university: "Stanford",
        country: "EUA",
        model: "IP Share & Equity",
        desc: "Professores são incentivados a patentear e criar startups com alunos. A universidade fica com equity, o professor fica rico, o aluno sai empregado.",
        icon: Rocket,
        color: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
        university: "Mondragon",
        country: "Espanha",
        model: "Cooperativismo Docente",
        desc: "O professor é 'sócio-cooperado'. O salário flutua com o resultado da universidade e a empregabilidade dos egressos. Alinhamento total de incentivos.",
        icon: Users,
        color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
        university: "Tec de Monterrey",
        country: "México",
        model: "Professores de Impacto",
        desc: "Avaliação docente não é por paper publicado, mas por projetos de consultoria entregues com alunos para empresas da região.",
        icon: Target,
        color: "text-amber-600 bg-amber-50 border-amber-200"
    }
];

const SimulatorCard = () => {
    const [baseSalary, setBaseSalary] = useState(6000); // Fixo
    const [studentSuccess, setStudentSuccess] = useState(85); // % Empregabilidade (KPI)
    const [consultingProjects, setConsultingProjects] = useState(2); // Qtd Projetos B2B

    const metrics = useMemo(() => {
        const successBonus = studentSuccess > 80 ? (studentSuccess - 80) * 200 : 0;
        const projectRevenue = consultingProjects * 50000;
        const projectShare = projectRevenue * 0.15;
        const totalIncome = baseSalary + successBonus + projectShare;
        
        return [
            { name: 'Salário Base (Hora-Aula)', value: baseSalary, fill: '#94a3b8' },
            { name: 'Sócio do Aluno (KPI)', value: successBonus, fill: '#10b981' },
            { name: 'Sócio da Ânima (Projetos)', value: projectShare, fill: '#3b82f6' }
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
                            Simule como o professor deixa de ser "custo fixo" para ser "centro de receita" e parceiro.
                        </p>
                    </div>

                    <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-slate-300">Base Fixa (Dedicação)</span>
                                <span className="text-white">R$ {formatNumber(baseSalary)}</span>
                            </div>
                            <input 
                                type="range" min="4000" max="15000" step="500"
                                value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-emerald-300 flex items-center gap-1"><Users size={12}/> Sucesso do Aluno (Empregabilidade)</span>
                                <span className="text-white">{studentSuccess}%</span>
                            </div>
                            <input 
                                type="range" min="50" max="100" step="1"
                                value={studentSuccess} onChange={(e) => setStudentSuccess(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-blue-300 flex items-center gap-1"><Briefcase size={12}/> Projetos B2B Liderados</span>
                                <span className="text-white">{consultingProjects} Projetos</span>
                            </div>
                            <input 
                                type="range" min="0" max="10" step="1"
                                value={consultingProjects} onChange={(e) => setConsultingProjects(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
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
                                    formatter={(value: number) => [`R$ ${formatNumber(value)}`, 'Valor']}
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

                    <div className="mt-6 flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Renda Total Projetada</p>
                            <p className="text-3xl font-black text-white">R$ {formatNumber(total)}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Upside sobre Fixo</p>
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
        
        {/* HERO - Oculto se estiver embutido */}
        {!isEmbedded && (
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8 rounded-b-[3rem] shadow-sm mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-rose-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <CheckCircle2 size={12} /> A Resposta ao Colapso #3
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        O Renascimento da Carreira Docente
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        A universidade tradicional trata o professor como custo fixo de entrega. A Ânima Agro trata o professor como <strong>sócio do impacto</strong> e <strong>sócio do negócio</strong>.
                    </p>
                </div>
            </div>
        )}

        <div className={`max-w-6xl mx-auto px-6 space-y-20 ${isEmbedded ? 'py-4' : 'mt-10 relative z-10'}`}>
            
            {/* 1. O NOVO CONTRATO SOCIAL */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                        <XCircle className="text-rose-500" size={28}/> O Modelo Falido
                    </h2>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm opacity-70">
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <p className="text-sm text-slate-600"><strong>Horista Puro:</strong> Ganha por hora em sala. Incentivo à aula expositiva ineficiente.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <p className="text-sm text-slate-600"><strong>Isolado:</strong> Proibido ou desencorajado de ter negócios externos.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <p className="text-sm text-slate-600"><strong>Desalinhado:</strong> Salário fixo independente do sucesso do aluno.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={28}/> O Modelo Ânima Agro
                    </h2>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-4 -mt-4"></div>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm text-slate-800"><strong>Mentoria & Projetos:</strong> Ganha por entregar projetos reais (B2B).</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm text-slate-800"><strong>Conectado:</strong> Incentivado a trazer sua empresa para dentro do campus.</p>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm text-slate-800"><strong>Sócio do Sucesso:</strong> Variável agressiva atrelada ao sucesso real do aluno.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 2. SIMULADOR DE CARREIRA */}
            <section>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Prove o Valor</h2>
                    <p className="text-sm text-slate-500 mt-2">Como um professor pode dobrar sua renda no novo modelo.</p>
                </div>
                <SimulatorCard />
            </section>

            {/* 3. OS 3 ARQUÉTIPOS DOCENTES */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">O Mix do Corpo Docente</h2>
                        <p className="text-slate-500 text-sm font-medium">Ecossistema de perfis complementares.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit mb-4">
                            <GraduationCap size={24}/>
                        </div>
                        <h3 className="text-lg font-black text-indigo-900 uppercase mb-2">O Cientista</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">Garante o rigor metodológico e a publicação científica do Think Tank.</p>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-4">
                            <Briefcase size={24}/>
                        </div>
                        <h3 className="text-lg font-black text-emerald-900 uppercase mb-2">O Practitioner</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">Executivo da indústria ou produtor rural. Traz o problema e a porta de emprego.</p>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-md transition-all">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-4">
                            <Target size={24}/>
                        </div>
                        <h3 className="text-lg font-black text-amber-900 uppercase mb-2">O Mentor Ágil</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">Especialista em design thinking e gestão de projetos aplicados.</p>
                    </div>
                </div>
            </section>

            {/* 4. BENCHMARKS GLOBAIS */}
            <section className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-3">
                        <Globe size={24} className="text-blue-600"/> Referências Globais
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">Instituições de ponta que já operam na lógica de parceria.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {BENCHMARKS.map((bench, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 hover:shadow-md transition-all">
                            <div className={`p-3 rounded-xl h-fit ${bench.color}`}>
                                <bench.icon size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{bench.university} <span className="text-slate-400 font-normal">({bench.country})</span></h4>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{bench.model}</p>
                                <p className="text-xs text-slate-600 leading-relaxed">{bench.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
};

export default ProfessorTurnaroundView;
