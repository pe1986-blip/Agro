
import React, { useState } from 'react';
import { 
  AlertTriangle, Users, Factory, Zap, TrendingUp, 
  Search, XCircle, CheckCircle2, ArrowRight, BookOpen, 
  Target, GraduationCap, ChevronDown, ChevronUp, Layers,
  Briefcase, Tractor, Cpu, Anchor, FileBarChart, Microscope, ShieldAlert
} from 'lucide-react';
import LaborMarketDeepDive from './LaborMarketDeepDive';

// --- SUB-COMPONENT: PYRAMID LEVEL ---
const PyramidLevel = ({ level, width, zIndex }: any) => (
    <div 
        className={`relative mx-auto rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl ${width}`}
        style={{ zIndex }}
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${level.gradient} opacity-90`}></div>
        
        {/* Conteúdo */}
        <div className="relative p-6 md:p-8 text-white flex flex-col md:flex-row items-center gap-6">
            
            {/* Lado Esquerdo: O Problema */}
            <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0 md:pr-6">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <level.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{level.title}</h3>
                </div>
                <div className="text-3xl font-black mb-1">{level.stat}</div>
                <p className="text-xs font-medium text-white/80 uppercase tracking-widest">{level.statLabel}</p>
                
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    {level.companies.map((c: string) => (
                        <span key={c} className="px-2 py-1 bg-black/20 rounded text-[10px] font-bold uppercase backdrop-blur-sm">
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            {/* Lado Direito: A Solução */}
            <div className="flex-1 text-center md:text-left md:pl-2">
                <div className="mb-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Nível Recomendado</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {level.education.map((edu: string) => (
                            <span key={edu} className="px-3 py-1 bg-white text-slate-900 rounded-full text-xs font-bold shadow-sm">
                                {edu}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-1 flex items-center justify-center md:justify-start gap-1">
                        <Zap size={10} /> Solução Ânima
                    </p>
                    <p className="text-sm font-bold leading-tight">
                        {level.animaSolution}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const DemandPyramid = () => {
    const levels = [
        {
            title: "Liderança Estratégica",
            icon: Cpu,
            stat: "148.000",
            statLabel: "Profissionais Faltando (Digital)",
            companies: ["John Deere", "Syngenta", "Climate Corp"],
            education: ["MBA Executivo", "Mestrado Profissional"],
            animaSolution: "Agronomia + Data Science Integradas",
            gradient: "from-rose-600 to-red-500",
            width: "max-w-3xl"
        },
        {
            title: "Especialização de Cadeia",
            icon: Factory,
            stat: "Crítico",
            statLabel: "Gargalo em Bioenergia & Trading",
            companies: ["Inpasa (159 vagas)", "Cargill", "Cooxupé"],
            education: ["Pós-Graduação", "Bootcamps"],
            animaSolution: "MBAs Setoriais (Milho, Café, Trading)",
            gradient: "from-orange-500 to-amber-500",
            width: "max-w-4xl"
        },
        {
            title: "Base Operacional",
            icon: Tractor,
            stat: "Massivo",
            statLabel: "Déficit de Mão de Obra Técnica",
            companies: ["Usinas", "Fazendas", "Transportadoras"],
            education: ["Técnico", "Tecnólogo", "Extensão"],
            animaSolution: "Formação Híbrida em Escala & In-Company",
            gradient: "from-blue-600 to-indigo-600",
            width: "max-w-5xl"
        }
    ];

    return (
        <div className="py-12 space-y-4">
            {levels.map((level, idx) => (
                <PyramidLevel 
                    key={idx} 
                    level={level} 
                    width={level.width} 
                    zIndex={30 - idx} 
                />
            ))}
        </div>
    );
};

const GapCard = ({ id, title, subtitle, icon: Icon, stat, context, problem, solution, source, color }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={`rounded-[2rem] border ${color.border} bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-8`}>
            {/* Header */}
            <div 
                className={`p-6 md:p-8 cursor-pointer flex justify-between items-start ${color.bgHeader}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl ${color.iconBg} ${color.iconColor} shadow-sm shrink-0`}>
                        <Icon size={32} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white border ${color.border} ${color.textColor}`}>
                                Gap #{id}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Evidência de Mercado
                            </span>
                        </div>
                        <h3 className={`text-2xl font-black uppercase tracking-tight ${color.titleColor} mb-2`}>
                            {title}
                        </h3>
                        <p className="text-sm font-bold text-slate-600 max-w-2xl">
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className={color.textColor} />
                </div>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="p-8 border-t border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Coluna Esquerda: O Problema (Data Driven) */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* The Big Stat */}
                            <div className={`p-6 rounded-3xl ${color.statBg} border ${color.statBorder} relative overflow-hidden`}>
                                <div className="absolute right-0 top-0 p-6 opacity-10 pointer-events-none">
                                    <Icon size={120} className={color.textColor} />
                                </div>
                                <p className={`text-4xl md:text-5xl font-black ${color.statColor} mb-2 tracking-tighter`}>
                                    {stat.value}
                                </p>
                                <p className={`text-sm font-bold uppercase tracking-wide ${color.statTextColor}`}>
                                    {stat.label}
                                </p>
                                {source && (
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold opacity-60">
                                        <Search size={10} /> Fonte: {source}
                                    </div>
                                )}
                            </div>

                            {/* Narrative */}
                            <div className="prose prose-slate text-slate-600 text-sm leading-relaxed text-justify">
                                {context.map((paragraph: string, idx: number) => (
                                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                ))}
                            </div>

                            {/* The Gap Definition */}
                            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
                                <h4 className="text-xs font-black text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <XCircle size={14} /> O Ponto de Ruptura
                                </h4>
                                <p className="text-sm font-medium text-red-800">
                                    {problem}
                                </p>
                            </div>
                        </div>

                        {/* Coluna Direita: A Solução Ânima */}
                        <div className="lg:col-span-5 flex flex-col h-full">
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white h-full relative overflow-hidden shadow-2xl flex flex-col justify-center">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                    <CheckCircle2 size={150} />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                                        <Zap size={12} /> Resposta Ânima Agro
                                    </div>
                                    
                                    <h4 className="text-xl font-bold text-white mb-4">
                                        {solution.title}
                                    </h4>
                                    
                                    <p className="text-slate-300 text-sm leading-relaxed mb-8 border-l-2 border-emerald-500 pl-4">
                                        {solution.desc}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3">
                                        {solution.features.map((feat: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

const EducationalGapsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'talents' | 'structural'>('talents');

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
        
        {/* HERO HEADER */}
        <div className="bg-white border-b border-slate-200 pt-16 pb-12 px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-700 text-[10px] font-black uppercase tracking-widest mb-6">
                    <AlertTriangle size={12} /> Diagnóstico Crítico
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
                    Educação no Agro como <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                        Infraestrutura de Soberania
                    </span>
                </h1>
                
                {/* SUB-NAVEGAÇÃO */}
                <div className="flex justify-center gap-4 mt-8">
                    <button 
                        onClick={() => setActiveTab('talents')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'talents' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        <Users size={16}/> Gargalos de Talentos
                    </button>
                    <button 
                        onClick={() => setActiveTab('structural')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'structural' ? 'bg-rose-600 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        <ShieldAlert size={16}/> Vulnerabilidade Estruturante
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 relative z-10">
            {activeTab === 'talents' ? (
                <div className="animate-fade-in">
                    {/* ALERT BOX: SCHOOLING GAP */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-12 flex items-center gap-6">
                         <div className="p-4 bg-orange-100 text-orange-600 rounded-xl">
                            <FileBarChart size={32} />
                         </div>
                         <div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-1">O Gap de Escolaridade (Lima, 2019)</h3>
                            <p className="text-slate-600 text-sm font-medium">
                                Apenas <strong className="text-red-600">15%</strong> do pessoal ocupado no agro possui ensino superior, contra <strong className="text-emerald-600">27%</strong> na média nacional. O setor mais rico do país tem a mão de obra menos qualificada.
                            </p>
                         </div>
                    </div>

                    {/* PIRÂMIDE DE DEMANDA */}
                    <div className="mb-20">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">A Pirâmide de Demanda</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">Hierarquia de Necessidades do Setor</p>
                        </div>
                        <DemandPyramid />
                    </div>

                    {/* CARDS DETALHADOS (GAPS) */}
                    <div className="space-y-4">
                        <GapCard 
                            id="01"
                            title="A Bomba Demográfica Digital"
                            subtitle="O setor comprou a tecnologia, mas esqueceu de formar quem opera."
                            icon={Users}
                            color={{
                                border: 'border-slate-200', bgHeader: 'bg-white', iconBg: 'bg-red-50', iconColor: 'text-red-600',
                                textColor: 'text-red-600', titleColor: 'text-slate-900', 
                                statBg: 'bg-red-50', statBorder: 'border-red-100', statColor: 'text-red-700', statTextColor: 'text-red-800'
                            }}
                            stat={{ value: "148.000", label: "Profissionais Faltando em 10 Anos" }}
                            source="CNA / SENAR-PR (2022) - Levantamento de Carreiras Digitais"
                            context={[
                                "A agricultura brasileira vive um paradoxo tecnológico. Temos máquinas autônomas de R$ 3 milhões sendo operadas com 20% de sua capacidade analítica porque o operador sabe dirigir, mas não sabe interpretar dados.",
                                "As universidades públicas formam o agrônomo clássico: excelente em fisiologia vegetal e solos, mas analfabeto em Python, NDVI e gestão de dados massivos."
                            ]}
                            problem="Ninguém está formando o profissional híbrido (Bio + Data) na escala que o mercado exige."
                            solution={{
                                title: "Agronomia + Data Science Integradas",
                                desc: "Não é uma disciplina optativa. É o core do currículo. O aluno aprende a codar dentro da lavoura.",
                                features: ["Bootcamps de AgTech Obrigatórios", "Laboratórios de Dados Reais", "Certificação Dupla"]
                            }}
                        />
                        {/* Outros cards mantidos... */}
                    </div>
                </div>
            ) : (
                <LaborMarketDeepDive />
            )}
        </div>
    </div>
  );
};

export default EducationalGapsView;
