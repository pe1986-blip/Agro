
import React, { useState } from 'react';
import { 
  Building2, GraduationCap, Briefcase, BrainCircuit, 
  XCircle, CheckCircle2, Layers, Zap, Network, 
  Activity, TrendingUp, Anchor, LayoutGrid, 
  Scale, ArrowRight, Target, Users, Landmark,
  Monitor, Award, Cpu, BookOpen, RefreshCw
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// --- DADOS BASEADOS NO PDF "MATRIZES & PERCURSOS" ---

const RADIAL_PILLARS_DATA = [
  { subject: 'Inter-relações Claras', A: 100, fullMark: 100, desc: 'Visualização nítida das conexões entre saberes.' },
  { subject: 'Aprendizagem com Sentido', A: 100, fullMark: 100, desc: 'Centralidade no estudante e problemas reais.' },
  { subject: 'Flexibilidade (Trajetória)', A: 100, fullMark: 100, desc: 'Personalização e autonomia do percurso.' },
  { subject: 'Integração de Saberes', A: 100, fullMark: 100, desc: 'Interdisciplinaridade orgânica.' },
  { subject: 'Currículo Vivo', A: 100, fullMark: 100, desc: 'Adaptável às mudanças do mundo do trabalho.' },
  { subject: 'Foco em Competências', A: 100, fullMark: 100, desc: 'Saber fazer > Saber acumulado.' },
];

const ANIMA_COMPETENCIES = [
    { title: "Fluência Colaborativa", desc: "Trabalho em equipe e empatia." },
    { title: "Resolução de Problemas", desc: "Pensamento crítico e criativo." },
    { title: "Fluência Digital", desc: "Domínio tecnológico e dados." },
    { title: "Visão Sistêmica", desc: "Nexialismo e conexões complexas." },
    { title: "Cidadania Ativa", desc: "Ética e impacto social." }
];

// --- SUB-COMPONENTS ---

const ComparisonCard = ({ title, icon: Icon, pros, cons, color, subTitle }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${color.bg} ${color.text} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-wide">{title}</h3>
                <p className="text-[10px] text-slate-400 font-bold">{subTitle}</p>
            </div>
        </div>
        <div className="space-y-4 flex-1">
            <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <CheckCircle2 size={12}/> O que entregam
                </p>
                <ul className="text-xs text-slate-600 space-y-1 leading-snug">
                    {pros.map((p: string, i: number) => <li key={i}>• {p}</li>)}
                </ul>
            </div>
            <div>
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <XCircle size={12}/> Onde falham
                </p>
                <ul className="text-xs text-slate-600 space-y-1 leading-snug">
                    {cons.map((c: string, i: number) => <li key={i}>• {c}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

const LayerCard = ({ title, icon: Icon, items, role, color }: any) => (
    <div className={`relative overflow-hidden p-6 rounded-2xl border ${color.border} ${color.bg} flex-1`}>
        <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
                <h4 className={`text-lg font-black uppercase tracking-tight ${color.text}`}>{title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{role}</p>
            </div>
            <Icon size={24} className={color.text} />
        </div>
        <ul className="space-y-2 relative z-10">
            {items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <div className={`w-1.5 h-1.5 rounded-full ${color.dot}`}></div>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const RadialMatrixDiagram = () => (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 my-8">
        
        {/* Lado Esquerdo: O Gráfico Radar (Os 6 Pilares) */}
        <div className="relative w-full max-w-md aspect-square">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 z-10">
                Os 6 Pilares Estruturantes
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADIAL_PILLARS_DATA}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Matriz Radial"
                        dataKey="A"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fill="#6366f1"
                        fillOpacity={0.2}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px' }}
                        formatter={(val) => [`${val}%`, 'Aderência']}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>

        {/* Lado Direito: As Competências (O Miolo) */}
        <div className="flex-1 max-w-lg space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BrainCircuit size={16} className="text-indigo-600"/> Competências Ânima (Core)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ANIMA_COMPETENCIES.map((comp, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                            <div>
                                <p className="text-xs font-bold text-slate-700">{comp.title}</p>
                                <p className="text-[10px] text-slate-400 leading-tight">{comp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                 <h4 className="text-sm font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={16} className="text-emerald-600"/> Estrutura de Níveis
                </h4>
                <div className="space-y-3 relative">
                    {/* Linha conectora */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-emerald-200"></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-emerald-400 flex items-center justify-center text-[10px] font-black text-emerald-700">1</div>
                        <p className="text-xs font-medium text-emerald-900"><strong>Fundamental:</strong> Bases conceituais e visão holística.</p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                         <div className="w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-700">2</div>
                        <p className="text-xs font-medium text-emerald-900"><strong>Intermediário:</strong> Aplicação em contextos específicos.</p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                         <div className="w-6 h-6 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-[10px] font-black text-emerald-700">3</div>
                        <p className="text-xs font-medium text-emerald-900"><strong>Aprofundado:</strong> Resolução de problemas complexos e autonomia.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AnimaStrategyView: React.FC = () => {
    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
            
            {/* HERO */}
            <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Layers size={12} /> Modelo Proprietário
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                        Tecnologia de <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                            Desenvolvimento Humano
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Até aqui, diagnosticamos o gap. Agora, apresentamos a solução: um metabolismo educacional híbrido que não é universidade, nem consultoria, nem think tank. É a soma dos três.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 space-y-20">
                
                {/* 1. O PROBLEMA DOS MODELOS ATUAIS (ATUALIZADO) */}
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">O "Red Ocean" da Educação Agro</h2>
                        <p className="text-sm text-slate-500 mt-2">Por que as opções atuais não atendem a demanda complexa do setor.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                        
                        {/* CARD 1: PÚBLICAS */}
                        <ComparisonCard 
                            title="Públicas"
                            subTitle="ESALQ, UFV, UFRGS"
                            icon={Landmark}
                            color={{ bg: 'bg-slate-50', text: 'text-slate-600' }}
                            pros={['Foco Acadêmico', 'Pesquisa Stricto Sensu', 'Tradição Científica']}
                            cons={['Zero MBA Executivo Industrial', 'Currículo Rígido', 'Distância do Mercado']}
                        />

                        {/* CARD 2: EAD MASSA */}
                        <ComparisonCard 
                            title="EAD de Massa"
                            subTitle="SENAR, CNA, UNIVESP"
                            icon={Monitor}
                            color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                            pros={['Baixo Custo (R$ 133-300)', 'Gratuidade em alguns casos', 'Capilaridade']}
                            cons={['Baixa Adesão (Conectividade)', 'Conteúdo Genérico', 'Sem Mentoria']}
                        />

                        {/* CARD 3: PREMIUM */}
                        <ComparisonCard 
                            title="Instituições Premium"
                            subTitle="FGV, Insper, Harven"
                            icon={Award}
                            color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
                            pros={['Marca Forte', 'Networking Urbano', 'Infraestrutura de Luxo']}
                            cons={['Ticket Proibitivo (R$ 13k-22k)', 'Agro Generalista', 'Sem Nichos Críticos']}
                        />

                        {/* CARD 4: TRADICIONAIS */}
                        <ComparisonCard 
                            title="Privadas Regionais"
                            subTitle="Uniube, Unigran"
                            icon={Building2}
                            color={{ bg: 'bg-amber-50', text: 'text-amber-600' }}
                            pros={['Preço Médio (R$ 3.5k)', 'Presença Física Local']}
                            cons={['Qualidade Questionável', 'Marca Fraca', 'Excesso de Digital (Custo)']}
                        />

                        {/* CARD 5: AGTECHS */}
                        <ComparisonCard 
                            title="AgTechs & EdTechs"
                            subTitle="Agroadvance"
                            icon={Cpu}
                            color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
                            pros={['Produto Digital Ágil', 'Valor via "Grife" ESALQ']}
                            cons={['Navegação Isolada', 'Experiência Presencial Limitada', 'Sem escala de Campus']}
                        />
                    </div>
                </section>

                {/* 2. A PROPOSTA: O TERCEIRO ESPAÇO */}
                <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                        <Layers size={300} />
                    </div>

                    <div className="relative z-10 text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">O Sistema Ânima Agro</h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                            Uma estrutura integrada onde as camadas se retroalimentam. A credibilidade acadêmica sustenta a agilidade de mercado, que por sua vez financia a influência política.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <LayerCard 
                            title="1. Regulada"
                            role="Credibilidade & Base"
                            icon={GraduationCap}
                            color={{ bg: 'bg-white/10', border: 'border-white/10', text: 'text-blue-400', dot: 'bg-blue-400' }}
                            items={['MBAs Executivos', 'Pós-Graduação Formal', 'Certificação Acadêmica', 'Chancela Institucional']}
                        />
                        <LayerCard 
                            title="2. Continuada"
                            role="Volume & Velocidade"
                            icon={Zap}
                            color={{ bg: 'bg-white/10', border: 'border-white/10', text: 'text-emerald-400', dot: 'bg-emerald-400' }}
                            items={['Bootcamps Ágeis (2-12 sem)', 'Imersões Práticas', 'Cursos In-Company', 'Atualização Real-Time']}
                        />
                        <LayerCard 
                            title="3. Advocacy"
                            role="Impacto & Influência"
                            icon={Scale}
                            color={{ bg: 'bg-white/10', border: 'border-white/10', text: 'text-amber-400', dot: 'bg-amber-400' }}
                            items={['Policy Briefs', 'Pesquisa Aplicada', 'Seminários Setoriais', 'Influência Legislativa']}
                        />
                    </div>
                </section>

                {/* 3. POR QUE FUNCIONA (MECANISMOS) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">4 Mecanismos Estruturais</h2>
                            <p className="text-slate-500 text-sm font-medium">Os diferenciais operacionais do modelo.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit"><Zap size={24}/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Operação Viva</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    O campus não é simulação. Alunos trabalham em projetos reais de empresas parceiras, usando dados reais para resolver problemas concretos de produtividade ou gestão.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl h-fit"><Network size={24}/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Rede Integrada</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Multi-cluster. O aluno de etanol em Ribeirão aprende com o de grãos em Sorriso. O conhecimento flui entre os hubs, quebrando o isolamento geográfico.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex gap-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-fit"><Activity size={24}/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Metabolismo Contínuo</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Não esperamos 5 anos para mudar a grade. Algoritmos de Learning Analytics e IA ajustam o conteúdo mensalmente baseados no feedback do mercado.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-fit"><TrendingUp size={24}/></div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Impacto Mensurado</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Não prometemos "transformação". Medimos ROI, empregabilidade (90%+) e incremento de produtividade nas empresas parceiras.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. A MATRIZ RADIAL (ATUALIZADA) */}
                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden p-8 text-center">
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-4">
                            <LayoutGrid size={12} /> DNA Pedagógico
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">A Matriz Radial</h2>
                        <p className="text-slate-500 text-sm">
                            O backbone do sistema. Estruturado em <strong>6 Pilares</strong> e centrado nas <strong>Competências Ânima</strong>.
                        </p>
                    </div>
                    
                    <RadialMatrixDiagram />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto mt-8">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fase 1</span>
                            <p className="text-sm font-bold text-slate-800">Propósito (Wk 1-2)</p>
                            <p className="text-xs text-slate-500">Definição clara do problema.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fase 2</span>
                            <p className="text-sm font-bold text-slate-800">Diagnóstico (Wk 3-8)</p>
                            <p className="text-xs text-slate-500">Imersão e coleta de dados.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fase 3</span>
                            <p className="text-sm font-bold text-slate-800">Cocriação (Wk 9-16)</p>
                            <p className="text-xs text-slate-500">Solução iterativa com parceiro.</p>
                        </div>
                    </div>
                </section>

                {/* 5. GOVERNANÇA HÍBRIDA (ATUALIZADA) */}
                <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <Anchor size={28} className="text-blue-400" />
                                <h3 className="text-2xl font-black uppercase tracking-tight">Governança Híbrida</h3>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                Ânima Agro não se resume a uma IES clássica. É um <strong>Escritório de Expansão Permanente</strong> que é demandado para orquestrar, como uma vertical espiralada, a relação entre a academia (atual e em expansão territorial), o mercado (Empresas) e o estado (Governo).
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-slate-200">
                                    <CheckCircle2 size={16} className="text-emerald-400"/>
                                    Evita a burocracia acadêmica (Agilidade).
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-200">
                                    <CheckCircle2 size={16} className="text-emerald-400"/>
                                    Evita o isolamento de mercado (Credibilidade).
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-200">
                                    <CheckCircle2 size={16} className="text-emerald-400"/>
                                    Garante o interesse público (Advocacy).
                                </li>
                            </ul>
                        </div>
                        
                        <div className="flex-1 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                            <div className="mb-4">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">O Orquestrador</p>
                                <h4 className="text-xl font-black text-white">Escritório Ânima Agro</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                                <div className="bg-blue-600/80 p-3 rounded-xl text-white">IES (Acadêmico)</div>
                                <div className="bg-emerald-600/80 p-3 rounded-xl text-white">Empresas (Prática)</div>
                                <div className="bg-purple-600/80 p-3 rounded-xl text-white col-span-2">Governo (Regulação)</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FECHAMENTO */}
                <div className="text-center max-w-3xl mx-auto pb-12">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">A Mudança do Jogo</h2>
                    <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                        "Educação tradicional pensa: 'Formar o melhor agrônomo'.<br/>
                        Consultoria pensa: 'Resolver o problema de produção'.<br/>
                        <span className="text-indigo-600 font-black not-italic">Ânima Agro pensa: 'Formar líderes que resolvem problemas ENQUANTO aprendem'."</span>
                    </p>
                    
                    <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-emerald-700 transition-colors cursor-pointer">
                        Ver Roadmap Financeiro <ArrowRight size={14} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnimaStrategyView;
