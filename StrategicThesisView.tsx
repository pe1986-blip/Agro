
import React, { useState } from 'react';
import { 
  BookOpen, Target, Layers, ArrowRight, Quote, Users, Building2,
  TrendingUp, Zap, Sprout, Factory, Truck, DollarSign,
  Activity, Search, Scale, AlertTriangle,
  Microscope, Heart, XCircle, MapPin, Lightbulb, GitMerge, 
  ShieldCheck, BrainCircuit, Rocket, Megaphone,
  Network, Landmark, FileText, ChevronRight, Menu,
  RefreshCw, CheckCircle2, Swords, Globe, Briefcase, Anchor,
  Calendar, Flag, BarChart3, Wallet, HelpCircle, Tractor, Leaf, Box,
  Database, Wrench, PenTool, Layout, Award, MessageSquare, AlertOctagon,
  Footprints, Coffee, Sun, Monitor, Ruler, Hash, Lock, Check, FileBarChart,
  X, FlaskConical, Construction, Wheat, Droplets, Beef, Clock, Compass, Gem, Repeat, MinusCircle
} from 'lucide-react';
import WhyAnimaAgroMap from './WhyAnimaAgroMap'; 
import AgroEnvironmentView from './AgroEnvironmentView'; 
import EducationalGapsView from './EducationalGapsView'; 
import AnimaStrategyView from './AnimaStrategyView'; 
import { MunicipioPerfil } from './types';
import { MUNICIPIOS_PERFIL } from './constants'; // Adicionado para fallback
import { generateMarketAnalysis } from './services/geminiService'; // Importação necessária

interface StrategicThesisViewProps {
    onNavigate?: (tab: string) => void;
    selectedProfile?: MunicipioPerfil; 
}

// --- COMPONENTES UI DE ALTO NÍVEL (DESIGN SYSTEM) ---

const ImpactHeader = ({ kicker, title, subtitle, color = "text-slate-900" }: { kicker: string, title: string, subtitle?: string, color?: string }) => (
    <div className="mb-10 mt-8 relative">
        <div className="absolute -left-6 top-1 w-1 h-12 bg-gradient-to-b from-blue-600 to-emerald-400 rounded-full"></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block font-sans">{kicker}</span>
        <h2 className={`text-3xl md:text-4xl font-serif font-bold leading-tight tracking-tight ${color} mb-3`}>
            {title}
        </h2>
        {subtitle && (
            <p className="text-sm md:text-base font-medium text-slate-500 max-w-2xl leading-relaxed">
                {subtitle}
            </p>
        )}
    </div>
);

const BigStat = ({ icon: Icon, value, label, sub }: any) => (
    <div className="flex flex-col p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Icon size={20} />
            </div>
            {sub && <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{sub}</span>}
        </div>
        <span className="text-3xl font-black text-slate-800 tracking-tight mb-1">{value}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
);

const QuoteBox = ({ children, author }: { children?: React.ReactNode, author?: string }) => (
    <div className="relative my-8 p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden">
        <div className="absolute top-4 left-6 text-emerald-500 opacity-30">
            <Quote size={48} />
        </div>
        <blockquote className="relative z-10 text-xl md:text-2xl font-serif italic text-slate-200 leading-relaxed text-center px-4">
            "{children}"
        </blockquote>
        {author && (
            <div className="relative z-10 text-center mt-4">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">— {author}</p>
            </div>
        )}
    </div>
);

const InsightBox = ({ title, children, icon: Icon, color = "blue" }: any) => {
    const styles: any = {
        blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", icon: "text-blue-600" },
        emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", icon: "text-emerald-600" },
        rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-900", icon: "text-rose-600" },
        slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", icon: "text-slate-500" },
        amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", icon: "text-amber-600" }
    };
    const s = styles[color];
    return (
        <div className={`p-6 rounded-2xl border ${s.bg} ${s.border} ${s.text} my-6 relative overflow-hidden`}>
            <div className="flex items-center gap-3 mb-3 relative z-10">
                {Icon && <div className="p-1.5 bg-white rounded-lg shadow-sm"><Icon size={16} className={s.icon} /></div>}
                <span className="font-black uppercase text-xs tracking-widest opacity-80">{title}</span>
            </div>
            <div className="text-sm leading-relaxed font-medium opacity-90 relative z-10 border-t border-black/5 pt-3">
                {children}
            </div>
        </div>
    );
};

const EvidenceFooter = ({ items }: { items: string[] }) => (
    <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <FileBarChart size={12}/> Evidências de Mercado
        </p>
        <ul className="space-y-1">
            {items.map((item, idx) => (
                <li key={idx} className="text-[10px] text-slate-500 font-mono flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">[{idx + 1}]</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const LiveFinancialSummary = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="p-12 bg-white rounded-[3rem] border border-slate-200 text-center shadow-xl">
        <div className="inline-flex p-6 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-3xl text-white mb-6 shadow-lg shadow-blue-500/30">
            <DollarSign size={48} />
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Painel Financeiro em Tempo Real</h3>
        <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed mb-8">
            Os dados financeiros detalhados (DRE, Fluxo de Caixa e Valuation) estão disponíveis no módulo dedicado.
        </p>
        <button 
            onClick={onNavigate}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
        >
            Acessar Financial Studio <ArrowRight size={14}/>
        </button>
    </div>
);

// --- COMPONENTES AUXILIARES PARA CAPÍTULOS ---

const ProductArchitecture = () => {
    // ... (Mantido igual)
    const products = [
        {
            title: "Imersões & Bootcamps",
            subtitle: "Curta Duração (40-80h)",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200",
            desc: "Ataque rápido em dores específicas (ex: Manutenção de Drones, Trading). Gatilho de entrada e receita rápida."
        },
        {
            title: "Dual Learning",
            subtitle: "Graduação Integrada",
            icon: Repeat,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            desc: "Modelo 50/50: Metade na IES, metade operando na empresa parceira. O aluno sai com 2 anos de experiência real."
        },
        {
            title: "Programas Trader",
            subtitle: "Deep Skills",
            icon: TrendingUp,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
            desc: "Formação de elite para a mesa de operações. Finanças, hedge e análise de commodities. Ticket alto."
        },
        {
            title: "Lifelong Premium",
            subtitle: "Pós & MBA Executivo",
            icon: Gem,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-200",
            desc: "Para o C-Level e Herdeiros. Governança familiar, sucessão e estratégia global. Networking de alto nível."
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {products.map((p, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${p.bg} ${p.border} hover:shadow-lg transition-all group`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 bg-white rounded-lg shadow-sm ${p.color}`}>
                            <p.icon size={20} />
                        </div>
                        <div>
                            <h4 className={`text-sm font-black uppercase tracking-tight ${p.color.replace('text-', 'text-slate-')}`}>{p.title}</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {p.desc}
                    </p>
                </div>
            ))}
        </div>
    );
};

const CronobiologyChart = () => {
    // ... (Mantido igual)
     const cycle = [
        { month: 'Set', crop: 'Prep. Solo', academic: 'Mecânica & Solos', color: 'bg-amber-500' },
        { month: 'Out', crop: 'Plantio', academic: 'Sementes & Operação', color: 'bg-emerald-500' },
        { month: 'Nov', crop: 'Manejo', academic: 'Fitossanidade', color: 'bg-emerald-600' },
        { month: 'Dez', crop: 'Maturação', academic: 'Monitoramento Dados', color: 'bg-blue-500' },
        { month: 'Jan', crop: 'Colheita', academic: 'Logística de Safra', color: 'bg-rose-500' },
        { month: 'Fev', crop: 'Venda', academic: 'Trading & Hedge', color: 'bg-purple-500' },
    ];

    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[600px] bg-slate-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-white">
                    <Clock size={200} />
                </div>
                
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2 relative z-10">
                    <RefreshCw size={16} className="text-emerald-400"/> Cronobiologia: O Sincronismo Safra-Aula
                </h4>

                <div className="grid grid-cols-6 gap-2 relative z-10">
                    {cycle.map((c, i) => (
                        <div key={i} className="flex flex-col gap-2 group">
                            <div className="text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.month}</span>
                            </div>
                            <div className={`p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:bg-white/10 group-hover:border-white/20 h-24 flex flex-col justify-center items-center text-center relative`}>
                                <div className={`absolute top-2 w-2 h-2 rounded-full ${c.color} animate-pulse`}></div>
                                <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Campo</span>
                                <span className="text-xs font-bold text-white leading-tight">{c.crop}</span>
                            </div>
                            <div className="h-8 w-px bg-slate-700 mx-auto group-hover:bg-emerald-500 transition-colors"></div>
                            <div className="p-3 rounded-xl border border-slate-700 bg-slate-800 transition-all group-hover:border-emerald-500/50 h-24 flex flex-col justify-center items-center text-center">
                                <span className="text-[9px] font-black text-emerald-600 uppercase mb-1">Aula</span>
                                <span className="text-xs font-bold text-emerald-300 leading-tight">{c.academic}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- CONTEÚDO DOS CAPÍTULOS ---

// 1. PREAMBLE
const ChapterPreamble = () => (
    // ... (Mantido igual)
    <div className="animate-fade-in space-y-12">
        <div className="text-center py-10 border-b border-slate-100">
            <span className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">Capítulo 01</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Contexto & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Propósito</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Por que uma instituição educacional de peso deve fazer uma aposta estratégica no Agronegócio neste exato momento histórico?
            </p>
        </div>
        
        {/* 1.1 O BRASIL NO ESPELHO */}
        <section>
            <ImpactHeader 
                kicker="1.1 CONTEXTO ESTRUTURAL" 
                title="O Brasil já é potência agrícola. Falta ser potência em educação agrícola em cadeia." 
                subtitle="Do ponto de vista de produção, o país está entre os líderes globais. Do ponto de vista de formação de vocacionada, ainda opera em modelo do século XX e tem uma distância entre os territórios econômico-produtivos e as experiências de aprendizagem."
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="prose prose-slate text-slate-600 text-base leading-relaxed">
                    <p>
                        Nas últimas décadas, o Brasil consolidou-se como um dos grandes pilares da segurança alimentar do planeta. Exporta grãos, carnes, café, biocombustíveis e fibras em escala que poucos países conseguem replicar. Em muitas cadeias, o país deixou de ser "promessa" para tornar-se infraestrutura sistêmica do abastecimento global.
                    </p>
                    <p>
                        Essa trajetória foi construída com tecnologia, empreendedorismo e capacidade de execução no campo. Máquinas autônomas, sementes geneticamente avançadas, sistemas de gestão de safra e uma complexa teia logística conectam fazendas no Centro-Oeste a portos e mercados globais em ciclos cada vez mais curtos.
                    </p>
                    <p>
                        Mas, à medida que o Brasil avança como potência produtiva, torna-se nítido um descompasso: a sofisticação tecnológica da porteira não foi acompanhada pela mesma sofisticação na formação de lideranças, gestores e formuladores de política pública. Ainda se forma, majoritariamente, o técnico de excelência — e não o estrategista capaz de enxergar e operar a cadeia produtiva como um sistema vivo.
                    </p>
                    <p className="font-bold text-slate-800 border-l-4 border-emerald-500 pl-4">
                        O resultado é um paradoxo: um agro de vanguarda em máquinas, biotecnologia e dados, ancorado em uma infraestrutura educacional que ainda funciona, em grande medida, sob premissas do século passado.
                    </p>
                </div>
                
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Rocket size={150} /></div>
                    <h4 className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-4">O Espelho Global</h4>
                    <p className="text-xl md:text-2xl font-serif italic text-slate-200 leading-relaxed">
                        "Se o Brasil já é indispensável para alimentar o mundo, a próxima fronteira é tornar-se igualmente indispensável em produzir inteligência, modelos de gestão e políticas que outros países queiram aprender e replicar."
                    </p>
                </div>
            </div>
        </section>

        {/* 1.2 CONVERGÊNCIA DE FORÇAS */}
        <section>
            <ImpactHeader 
                kicker="1.2 O TIMING" 
                title="A Convergência de Três Forças" 
                subtitle="Demanda por competências explodindo, tecnologias reconfigurando o jogo e o agro consolidado como agenda central de Estado."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="text-red-500" size={20}/>
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-widest">Força 1 — Déficit de Talentos</span>
                    </div>
                    <p className="text-3xl font-black text-slate-800 mb-1">148.000</p>
                    <p className="text-xs text-slate-600 font-medium">Profissionais faltando em Agricultura Digital nos próximos 2 anos, num contexto em que dados, sensores e IA passam a ser tão críticos quanto solo e clima.</p>
                </div>

                {/* Card 2 */}
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-3 mb-2">
                        <Factory className="text-amber-600" size={20}/>
                        <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Força 2 — Transformação Tecnológica</h4>
                    </div>
                    <p className="text-3xl font-black text-slate-800 mb-1">159 Vagas</p>
                    <p className="text-xs text-slate-600 font-medium">Abertas simultaneamente em Bioenergia apenas na Inpasa por falta de qualificação — em um setor em que etanol 2G, biogás e SAF já não são tese de futuro, mas operação corrente.</p>
                </div>

                {/* Card 3 */}
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                        <Landmark className="text-blue-600" size={20}/>
                        <h4 className="text-xs font-black text-blue-800 uppercase tracking-widest">Força 3 — Centralidade Política</h4>
                    </div>
                    <p className="text-3xl font-black text-slate-800 mb-1">Agenda #1</p>
                    <p className="text-xs text-slate-600 font-medium">Agro consolidado como prioridade estratégica nacional, pressionado por exigências de ESG, rastreabilidade, clima e comércio internacional — e um vácuo de interlocutores com visão integrada.</p>
                </div>
            </div>

            <div className="prose prose-slate text-slate-600 text-base leading-relaxed mb-8 max-w-none">
                <p>
                    Quando essas três forças se encontram — déficit massivo de talentos, aceleração tecnológica e centralidade política do agro — o sistema educacional tradicional entra em stress. O ciclo de desenho, aprovação e implementação de novos currículos em universidades clássicas simplesmente não acompanha o ritmo em que a realidade muda no campo, nos mercados e em Brasília.
                </p>
                <p className="font-bold text-slate-800 border-l-4 border-blue-500 pl-4">
                    É precisamente nesse intervalo entre a velocidade do agro e a velocidade da academia que se abre a janela estratégica para uma instituição educacional com capacidade de orquestração nacional e compromisso com aprendizagem viva.
                </p>
            </div>

            <EvidenceFooter items={[
                "Levantamento CNA/SENAR-PR (2022) sobre déficit de talentos digitais no agro brasileiro.",
                "Relatórios de RH da Inpasa e FS Bioenergia (2023-2024) e parceria emergencial com SENAI-MT para formação de quadros.",
                "Estudos acadêmicos sobre fragilidades de gestão em cooperativas agroindustriais e demandas regulatórias crescentes em ESG."
            ]} />
        </section>

        {/* 1.3 O PROPÓSITO ÂNIMA */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                        <BrainCircuit size={12} /> O Propósito Ânima no Agro
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Não é uma Faculdade.<br/>É uma Infraestrutura de Desenvolvimento a partir da educação em sinergia com o território.</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        A Ânima não entra no agro para adicionar mais um campus à paisagem. Entra para construir uma infraestrutura de tecnologia de desenvolvimento de pessoas que conecta, em tempo real, território, empresas, dados e pesquisa em um único metabolismo de aprendizagem.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Em vez de organizar o conhecimento em caixinhas disciplinares estáticas, a Ânima Agro trabalha a partir de problemas reais de cadeia produtiva — do plantio ao porto, da cooperativa à mesa de derivativos — e usa essa realidade como eixo em torno do qual orbitam competências técnicas, de dados, de gestão, de política pública e de ética/ESG.
                    </p>
                    
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Três Pilares Operacionais</h4>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-700"><strong>Operação viva:</strong> alunos trabalhando sobre dados e desafios reais de empresas-parceiras, não sobre casos fictícios. A cadeia produtiva endereça os problemas, os quais se tornam drives para aprendizagem.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-700"><strong>Matriz Curricular Radial:</strong> currículo organizado radialmente em torno de projetos de impacto, e não em trilhas lineares desconectadas.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-700"><strong>Rede nacional de clusters:</strong> conhecimento fluindo entre Goiânia, Mato Grosso, Oeste do Paraná, Minas e outras regiões, em vez de escolas isoladas por geografia ou cultura organizacional.</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm"><XCircle size={14} className="text-red-400"/></div>
                            <span className="text-xs font-medium text-slate-500 line-through decoration-slate-300">Currículo Estático por Disciplina</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm"><CheckCircle2 size={14} className="text-emerald-600"/></div>
                            <span className="text-xs font-bold text-slate-800">Projetos Reais como Eixo</span>
                        </div>
                        
                        <div className="w-full h-px bg-slate-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm"><XCircle size={14} className="text-red-400"/></div>
                            <span className="text-xs font-medium text-slate-500 line-through decoration-slate-300">Diploma como Fim em Si</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm"><CheckCircle2 size={14} className="text-emerald-600"/></div>
                            <span className="text-xs font-bold text-slate-800">Portfólio de Impacto & Empregabilidade</span>
                        </div>

                        <div className="w-full h-px bg-slate-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm"><XCircle size={14} className="text-red-400"/></div>
                            <span className="text-xs font-medium text-slate-500 line-through decoration-slate-300">Campus como Edifício</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm"><CheckCircle2 size={14} className="text-emerald-600"/></div>
                            <span className="text-xs font-bold text-slate-800">Campus como Plataforma Viva</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 1.3.5 DIAGNÓSTICO DE PRESENÇA */}
        <section>
            <ImpactHeader 
                kicker="1.3.5 DIAGNÓSTICO DE PRESENÇA" 
                title="A Ânima no Agro: Presença Real vs. Presença Necessária" 
                subtitle="Quando mapeamos nossa posição pela lógica da cadeia produtiva, territórios e stakeholders, o que encontramos é uma presença pontual — não sistêmica."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                
                {/* Card 1: Antes da Porteira */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden group hover:border-orange-200 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                         <FlaskConical size={100} className="text-orange-500" />
                    </div>
                    
                    <div className="mb-6 relative z-10">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4 border border-orange-100">
                            <FlaskConical size={24} />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Antes da Porteira</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Insumos, Tecnologia, P&D</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1 relative z-10">
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                            <span className="text-emerald-700 font-bold">Pesquisa em Biotecnologia (UNP):</span> Nanoemulsões, reprodução assistida, controle de parasitas.
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                            <span className="text-emerald-700 font-bold">Pesquisa em AgTech (UNISUL):</span> IA, Blockchain, economia circular.
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero parcerias estruturadas</span> com fabricantes de insumos (Syngenta, Bayer, Yara, Mosaic).
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero presença</span> em desenvolvimento de máquinas/sensores (John Deere, Jacto, Solinftec).
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero articulação</span> com startups de AgTech (Strider, Aegro, FieldView).
                        </li>
                    </ul>

                    <div className="mt-auto relative z-10">
                        <p className="text-[10px] text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                            "A Ânima produz conhecimento de ponta em biotecnologia e dados, mas esse conhecimento <strong>NÃO CHEGA</strong> nas empresas que desenvolvem insumos, máquinas ou plataformas digitais."
                        </p>
                    </div>
                </div>

                {/* Card 2: Dentro da Porteira */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden group hover:border-emerald-200 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                         <Tractor size={100} className="text-emerald-500" />
                    </div>
                    
                    <div className="mb-6 relative z-10">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                            <Tractor size={24} />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Dentro da Porteira</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Produção Agropecuária</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1 relative z-10">
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                            <span><span className="text-emerald-700 font-bold">Agronomia na UAM/UNA (1.338 alunos):</span> Campi em Piracicaba/SP e Jataí/GO.</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                            <span><span className="text-emerald-700 font-bold">Medicina Veterinária (30.351 alunos):</span> Mas foco massivo em <strong>pequenos animais</strong> (pet, clínica urbana).</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Baixíssima penetração</span> em grandes animais/produção (pecuária de corte, leiteira, suinocultura, avicultura).
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero articulação</span> com cooperativas agrícolas (Coamo, Cocamar, C.Vale, Copersucar, Coopercitrus).
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero relação estruturada</span> com grandes produtores rurais ou associações.
                        </li>
                    </ul>

                    <div className="mt-auto relative z-10">
                        <p className="text-[10px] text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                            "A Ânima forma agrônomos e veterinários, mas <strong>NÃO TEM PRESENÇA ORGÂNICA</strong> nas propriedades, cooperativas e associações que tomam decisões de manejo, investimento e inovação no campo."
                        </p>
                    </div>
                </div>

                {/* Card 3: Depois da Porteira */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                         <Construction size={100} className="text-blue-500" />
                    </div>
                    
                    <div className="mb-6 relative z-10">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
                            <Construction size={24} />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Depois da Porteira</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Agroindústria, Trading, Distribuição</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1 relative z-10">
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-600">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5"/>
                            <span><span className="text-emerald-700 font-bold">Direito do Agronegócio (510 alunos, Ebradi):</span> Único produto com reconhecimento corporativo.</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero MBA</span> em Gestão de Trading, Bioenergia, Indústria de Alimentos, Logística Agrícola.
                        </li>
                        <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero parcerias</span> com tradings (Cargill, Bunge, ADM, Amaggi).
                        </li>
                         <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero articulação</span> com usinas de bioenergia (Raízen, São Martinho, Inpasa, FS Bioenergia).
                        </li>
                         <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
                            <span className="text-red-700/80">Zero presença</span> em frigoríficos (JBS, Marfrig, BRF, Minerva), indústrias de alimentos.
                        </li>
                    </ul>

                    <div className="mt-auto relative z-10">
                        <p className="text-[10px] text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                            "A Ânima <strong>NÃO PARTICIPA</strong> da formação de gestores para agroindústria, trading e bioenergia — os segmentos de maior valor agregado e maior demanda por talentos qualificados."
                        </p>
                    </div>
                </div>

            </div>

             {/* Mapeamento Territorial & Cultura */}
             <div className="mt-12 mb-12">
                 <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Mapeamento por Território & Cultura Produtiva</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Centro-Oeste */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><Globe size={14} className="text-blue-500"/> Centro-Oeste</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-3">Grãos + Bioenergia</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Territórios:</strong> Goiânia, Rio Verde, Jataí (GO); Sorriso, Lucas do Rio Verde (MT); Dourados (MS).</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Culturas:</strong> Soja, milho, algodão, cana (etanol 2G).</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Stakeholders:</strong> Cooperativas (Comigo, Capal), tradings (Bunge, Amaggi), usinas (Jalles Machado, Inpasa).</p>
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><CheckCircle2 size={10} className="text-emerald-500"/> UNA Jataí (Agronomia)</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Ausente em Goiânia/MT/MS</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Zero parcerias com cooperativas/usinas locais</div>
                        </div>
                    </div>

                    {/* Sul */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><Globe size={14} className="text-blue-500"/> Sul</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-3">Cooperativismo + Proteína Animal</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Territórios:</strong> Oeste PR (Cascavel, Toledo); Oeste SC (Chapecó, Concórdia).</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Culturas:</strong> Grãos, suinocultura, avicultura, piscicultura.</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Stakeholders:</strong> Cooperativas (Coamo, C.Vale, Lar, Aurora), frigoríficos (BRF, Aurora).</p>
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><CheckCircle2 size={10} className="text-emerald-500"/> UNISUL (Veterinária), pesquisa PPGA sobre suinocultura/avicultura</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Ausente em Cascavel, Toledo</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Zero articulação com Coamo, C.Vale, Lar</div>
                        </div>
                    </div>

                     {/* Sudeste */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><Globe size={14} className="text-blue-500"/> Sudeste</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-3">Cana + Café + Citros</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Territórios:</strong> Interior SP (Ribeirão Preto, Piracicaba, Catanduva); Zona da Mata MG.</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Culturas:</strong> Cana (etanol), café especial, citros, pecuária leiteira.</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Stakeholders:</strong> Usinas (Raízen, São Martinho), cooperativas de café (Cooxupé), citros (Citrosuco).</p>
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><CheckCircle2 size={10} className="text-emerald-500"/> UAM Piracicaba / UNIBH</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Ausente em Ribeirão Preto, Piracicaba</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Zero parcerias com Raízen, São Martinho, Cooxupé</div>
                        </div>
                    </div>

                    {/* Nordeste */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><Globe size={14} className="text-blue-500"/> Nordeste</h4>
                        <p className="text-slate-500 text-[10px] uppercase font-black mb-3">Fruticultura + Carcinicultura</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Territórios:</strong> Vale do São Francisco (Petrolina/Juazeiro), Litoral (camarão).</p>
                        <p className="text-xs text-slate-600 mb-3"><strong>Culturas:</strong> Manga, uva, melão, coco, carcinicultura.</p>
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><CheckCircle2 size={10} className="text-emerald-500"/> UNP (Veterinária, Natal)</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Ausente em Petrolina, Juazeiro</div>
                             <div className="flex items-center gap-2 text-[10px] text-red-500"><XCircle size={10}/> Zero articulação com produtores de frutas/camarão</div>
                        </div>
                    </div>
                 </div>
             </div>

             {/* Stakeholder List & Veredito */}
             <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* Lista de Stakeholders */}
                 <div className="lg:col-span-2">
                     <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Stakeholders-Chave do Agro</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-slate-600">
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>1. Grandes Produtores Rurais / Fazendas Corporativas</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>2. Cooperativas Agrícolas (Coamo, C.Vale, Cocamar...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>3. Tradings / Processadores (Cargill, Bunge, ADM...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>4. Usinas de Bioenergia (Raízen, São Martinho...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>5. Frigoríficos / Proteína Animal (JBS, Marfrig, BRF...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>6. Indústria de Insumos (Syngenta, Bayer, Corteva...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>7. AgTechs / Plataformas Digitais (Strider, Aegro...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>8. Governo / Órgãos Reguladores</span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold"><AlertTriangle size={14}/> Frágil</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>9. Associações Setoriais (CNA, OCB, UNICA...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                        <div className="flex items-center justify-between p-2 border-b border-slate-100">
                            <span>10. Eventos-Chave (Tecnoshow, Agrishow...)</span>
                            <div className="flex items-center gap-1 text-red-500 font-bold"><XCircle size={14}/> Ausente</div>
                        </div>
                     </div>
                 </div>

                 {/* Veredito */}
                 <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl h-full flex flex-col justify-center shadow-sm">
                     <div className="flex items-center gap-2 mb-4 text-amber-800">
                         <AlertOctagon size={24} />
                         <h3 className="font-black uppercase tracking-tight text-sm">O Veredito: Presença Pontual, Não Sistêmica</h3>
                     </div>
                     <div className="text-xs text-slate-700 space-y-3 leading-relaxed font-medium">
                         <p>
                             Quando mapeamos a presença da Ânima pela lógica da cadeia produtiva, territórios e stakeholders, o diagnóstico é incômodo:
                         </p>
                         <ul className="space-y-1">
                             <li className="flex gap-2"><CheckCircle2 size={12} className="text-emerald-600 mt-0.5 shrink-0"/> Temos PESQUISA de qualidade (biotecnologia, sustentabilidade, dados)</li>
                             <li className="flex gap-2"><CheckCircle2 size={12} className="text-emerald-600 mt-0.5 shrink-0"/> Temos VOLUME de alunos (32k em Veterinária, 1.5k em Agronomia)</li>
                             <li className="flex gap-2"><CheckCircle2 size={12} className="text-emerald-600 mt-0.5 shrink-0"/> Temos UM produto consolidado (Direito do Agronegócio)</li>
                         </ul>
                         <p className="font-bold text-amber-900 mt-2">MAS:</p>
                         <ul className="space-y-1 text-rose-700">
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Essa pesquisa NÃO CHEGA nas empresas de insumos, AgTechs ou tradings</li>
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Esses alunos NÃO TRABALHAM com cooperativas, usinas ou grandes produtores</li>
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Não temos MBA em Bioenergia, Trading, Gestão de Cooperativas ou Agricultura Digital</li>
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Não participamos de NENHUM evento-chave do setor</li>
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Não temos parceria estruturada com NENHUMA cooperativa de peso</li>
                             <li className="flex gap-2"><XCircle size={12} className="mt-0.5 shrink-0"/> Não temos presença orgânica nos territórios de maior valor (Goiânia, MT, Oeste PR)</li>
                         </ul>
                         <p className="mt-4 pt-4 border-t border-amber-200 italic text-slate-600">
                             "A Ânima não parte do zero. Mas está posicionada nas <strong>BORDAS</strong> da cadeia produtiva — não no seu <strong>NÚCLEO OPERATIVO</strong>. A Ânima Agro é a travessia dessa periferia para o centro."
                         </p>
                     </div>
                 </div>

             </div>

        </section>

        {/* 1.4 GOIÂNIA & CONVITE */}
        <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center relative overflow-hidden shadow-2xl mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-emerald-900/50"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-4">Por que começar por Goiânia — e para onde essa jornada leva</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                    A escolha de Goiânia como praça central não é circunstancial. O entorno imediato conecta produção de grãos, logística, cooperativas, biocombustíveis e serviços financeiros especializados. É um ponto de encontro entre produtores, tradings, cooperativas, empresas de insumos, formuladores de política e instituições financeiras — um microcosmo do agro brasileiro contemporâneo.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-8 font-medium">
                    Começar aqui permite testar, em escala controlada, o modelo de operação viva, a Matriz Curricular Radial e a articulação com empresas-âncora e governo. A partir dessa prova de conceito, o desenho é de expansão em rede para outros clusters (Mato Grosso, Oeste do Paraná, Minas, interior de São Paulo), preservando o que funciona e ajustando o que for necessário em ciclos curtos.
                </p>

                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">O Convite à Jornada</h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    Começamos por Goiânia, mas a jornada vai além: 7 capítulos vão desdobrar ambiente, gaps, estratégia, metodologia e números. Este documento não é apenas um plano de negócios — é um convite para que conselheiros, board e parceiros sejam coautores da transformação da educação no setor mais vital do país.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Nos próximos capítulos: Sumário Executivo (Cap. 2), Metodologia (Cap. 3), O Ambiente do Agro (Cap. 4), Gaps Críticos (Cap. 5), A Estratégia Ânima (Cap. 6) e Financeiro (Cap. 7).
                </p>
            </div>
        </div>
    </div>
);

// 2. EXECUTIVE SUMMARY
const ChapterExecutiveSummary = ({ selectedProfile }: { selectedProfile?: MunicipioPerfil }) => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center py-10 border-b border-slate-100">
            <span className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">Capítulo 02</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Executive <br/><span className="text-slate-400">Summary</span>
            </h1>
            {selectedProfile && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs uppercase tracking-widest border border-emerald-200">
                    Foco: {selectedProfile.nome}
                </div>
            )}
        </div>

        <QuoteBox author="Hipótese Central do Projeto">
            Não será possível transformar o agronegócio brasileiro apenas através de cursos desconectados. O setor demanda um metabolismo permanente de aprendizagem conectado aos ciclos produtivos.
        </QuoteBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <ImpactHeader kicker="AMBIÇÃO" title="A Nova Fronteira" />
                <p className="text-slate-600 leading-relaxed mb-6">
                    Liderar o território das tecnologias de experiências de aprendizagem em cadeia, criando a ponte definitiva entre a academia e a produtividade no campo.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">Três Porteiras</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">Impacto Real</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">Think Tank</span>
                </div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Wallet className="text-emerald-600" size={20}/> Snapshot Financeiro (V8)
                </h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Capex (Sede + Rede)</span>
                        <span className="font-mono font-bold text-slate-800">R$ 35-45M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Receita (2030)</span>
                        <span className="font-mono font-bold text-blue-600">R$ 445M</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">EBIT (2030)</span>
                        <span className="font-mono font-bold text-emerald-600">R$ 113M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-black text-slate-800 uppercase">TIR (5 Anos)</span>
                        <span className="font-mono font-black text-2xl text-slate-900">52%</span>
                    </div>
                     <div className="pt-2">
                         <span className="text-[9px] text-slate-400 italic">
                             *Inclui Capex Sede, Tecnologia, Marketing de Lançamento e Capital de Giro até o Breakeven.
                         </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ChapterMethodology = () => (
    <div className="animate-fade-in space-y-12">
        <ImpactHeader kicker="CAPÍTULO 03" title="O Metabolismo de Aprendizagem" subtitle="Um Sistema Operacional Pedagógico que respira junto com o agro, rejeita a binaridade e garante impacto real." />
        
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Clock size={24} className="text-indigo-600"/> Sincronismo Temporal
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
                O ensino tradicional segue o calendário gregoriano e burocrático (semestres rígidos). O Agro segue o ciclo fenológico (safra, safrinha, entressafra) e econômico. A Ânima Agro sincroniza os dois: o aluno aprende a vender na época da venda, e a plantar na época do plantio.
            </p>
            
            <CronobiologyChart />
            
             <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
                    <Layout size={20} className="text-blue-600"/> Arquitetura de Produtos Vocacionados
                </h3>
                <p className="text-slate-500 mb-6 max-w-3xl">
                    A educação tradicional vende "Cursos de Graduação (4 anos)" e "Pós (18 meses)". O Agro precisa de formatos diferentes para resolver problemas de velocidade e profundidade variadas.
                </p>
                <ProductArchitecture />
            </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightBox title="1. Anti-Binaridade" icon={GitMerge} color="blue">
                <p>O mundo não é "Teoria" OU "Prática". É a fusão dos dois. O saber do professor (científico) e o saber do produtor (empírico) têm o mesmo peso na sala de aula.</p>
            </InsightBox>
            <InsightBox title="2. Cronobiologia" icon={Clock} color="emerald">
                <p>O currículo não é linear; é cíclico. Ele obedece ao tempo da natureza e do mercado, garantindo que o aprendizado seja imediatamente aplicável.</p>
            </InsightBox>
            <InsightBox title="3. Rastro de Impacto" icon={Target} color="rose">
                <p>Não medimos sucesso apenas por notas. Medimos por hectares impactados, custo reduzido e problemas reais resolvidos na empresa parceira.</p>
            </InsightBox>
        </div>
    </div>
);

// 4. O AMBIENTE
const ChapterEnvironment = ({ city }: { city?: MunicipioPerfil }) => {
    return <AgroEnvironmentView city={city} />; 
};

// 4.5. GAPS EDUCACIONAIS
const ChapterEducationalGaps = () => {
    return <EducationalGapsView />; 
};

// 5. A ESTRATÉGIA ÂNIMA (NOVO)
const ChapterAnimaStrategy = () => {
    return <AnimaStrategyView />;
};

// 8. CONSIDERAÇÕES FINAIS (AGORA CAPÍTULO 07)
const ChapterFinalConsiderations = () => (
    <div className="animate-fade-in space-y-12">
        <div className="text-center py-10">
            <Quote size={48} className="mx-auto text-emerald-500 mb-6 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                A Ânima Agro não é uma escola.<br/>É uma infraestrutura de país.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Estamos construindo a ponte que faltava entre o potencial do Brasil e a sua realização.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* QUADRO A: RISCOS DE EXECUÇÃO */}
            <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-200">
                <h4 className="font-black text-amber-900 uppercase text-sm mb-6 flex items-center gap-2">
                    <AlertOctagon size={20} className="text-amber-600"/> A. Riscos de Execução (Desafio de Fazer)
                </h4>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Desconexão de Marca</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Risco do reposicionamento da UNA não "colar" ou parecer artificial sem validação de campo intensa (pesquisa jan-fev).
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Evasão em Fronteira</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Dificuldade de reter alunos em regiões remotas (Matopiba/MT) sem uma proposta de valor híbrida robusta e suporte local.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Diluição Cultural</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Risco de perder a qualidade acadêmica ao integrar múltiplas unidades distantes sem uma governança central forte.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUADRO B: RISCOS DE NÃO EXECUÇÃO */}
            <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-200">
                <h4 className="font-black text-rose-900 uppercase text-sm mb-6 flex items-center gap-2">
                    <MinusCircle size={20} className="text-rose-600"/> B. Riscos de Omissão (Custo de Não Fazer)
                </h4>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Perda de Timing</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Concorrentes (Insper Agro, Agroboard, ANEFAC) consolidando a marca enquanto hesitamos. A janela de oportunidade é de 18 meses.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Receita na Mesa</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Deixar de capturar uma fatia do mercado de T&D Agro (estimado em R$ 8-12 bi/ano) e perder o bônus demográfico do interior.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 uppercase">Irrelevância Estratégica</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Continuar sendo uma IES generalista em regiões onde a única vocação que importa é o Agro, perdendo conexão com o tecido produtivo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl text-center mt-8">
            <h4 className="font-black text-emerald-400 uppercase text-sm mb-4 flex items-center justify-center gap-2">
                <Flag size={18}/> O Próximo Passo
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto">
                Validação imediata com stakeholders externos (CNA, MAPA) e início da estruturação do escritório em Goiânia.
            </p>
            <button className="w-full md:w-auto px-8 bg-emerald-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-emerald-400 transition-colors uppercase text-xs tracking-widest">
                Aprovar Plano Tático
            </button>
        </div>
    </div>
);

// ... (Restante do arquivo mantido: Estrutura do Tab Controller) ...

const StrategicThesisView: React.FC<StrategicThesisViewProps> = ({ onNavigate, selectedProfile }) => {
  const [activeTab, setActiveTab] = useState('preamble');

  const tabs = [
    { id: 'preamble', label: '1. Contexto & Propósito', component: <ChapterPreamble /> },
    { id: 'mindmap', label: '1.1 Mapa Mental: Por Quê?', component: <WhyAnimaAgroMap /> }, 
    { id: 'summary', label: '2. Executive Summary', component: <ChapterExecutiveSummary selectedProfile={selectedProfile} /> }, 
    { id: 'metodologia', label: '3. Metodologia', component: <ChapterMethodology /> }, 
    { id: 'environment', label: '4. O Ambiente Agro', component: <ChapterEnvironment city={selectedProfile} /> },
    { id: 'educational_gaps', label: '5. Gaps Críticos', component: <ChapterEducationalGaps /> },
    { id: 'anima_strategy', label: '6. A Estratégia Ânima', component: <ChapterAnimaStrategy /> }, // NEW TAB
    { id: 'financials', label: 'Financeiro (Live)', component: <LiveFinancialSummary onNavigate={() => onNavigate && onNavigate('financial')} /> }, 
    { id: 'final', label: '7. Veredito Final', component: <ChapterFinalConsiderations /> },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || <div/>;

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] relative overflow-hidden font-sans">

      {/* NEW TOP HEADER */}
      <div className="bg-white border-b border-slate-200 z-40 shrink-0 shadow-sm">
         <div className="px-6 py-4">
            {/* Upper Row: Title */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                         <BookOpen size={20} className="text-blue-600"/>
                     </div>
                     <div>
                         <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">RogerLens Strategy</h2>
                         <p className="text-xl font-serif font-bold text-slate-900 leading-none">Dossiê Estratégico</p>
                     </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    Documento Vivo v2.0
                </div>
            </div>

            {/* Lower Row: Navigation */}
            <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-hide border-t border-slate-100 pt-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap
                            ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-700'
                                : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}
                        `}
                    >
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
         </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative scroll-smooth bg-slate-50">
         <div className="max-w-5xl mx-auto p-8 md:p-12 min-h-full">
            {ActiveComponent}
            
            {/* Navigation Footer */}
            <div className="mt-24 pt-12 border-t border-slate-200 flex justify-between items-center text-slate-400">
                <span className="text-[10px] uppercase font-bold tracking-widest">Confidencial - Uso Interno</span>
                <span className="text-[10px] font-serif italic">Ânima Educação • Agro Strategy</span>
            </div>
         </div>
      </main>
    </div>
  );
};

export default StrategicThesisView;
