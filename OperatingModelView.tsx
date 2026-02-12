
import React from 'react';
import { 
  Briefcase, Users, Megaphone, ShoppingBag, 
  Target, Calendar, ArrowRight,
  Layout, ShieldCheck, BarChart3,
  GitBranch, CheckCircle2, Cpu, Activity,
  Layers, Search, RefreshCw, Zap, TrendingUp,
  BrainCircuit, Database, Server, Code
} from 'lucide-react';

// --- DADOS CAMADA 3: OS 4 NÚCLEOS HÍBRIDOS ---
const NUCLEI_DATA = [
    {
        id: 'aprendizagem',
        title: 'Núcleo 1: Aprendizagem (VPA)',
        icon: BrainCircuitIcon,
        role: 'Qualidade & Relevância',
        desc: 'Desenha, valida e documenta experiências. Interface com IES vocacionadas.',
        kpis: ['NPS de Experiência', 'Taxa de Conclusão', 'Validação Técnica'],
        color: { bg: 'bg-indigo-50', border: 'border-indigo-100', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', title: 'text-indigo-900', dot: 'bg-indigo-500' }
    },
    {
        id: 'advocacy',
        title: 'Núcleo 2: Advocacy',
        icon: ShieldCheck,
        role: 'Posicionamento & Credibilidade',
        desc: 'Influencia políticas públicas. Engaja com CNA, MAPA, EMBRAPA. Publica Policy Briefs.',
        kpis: ['Citações em Mídia', 'Presença em Conselhos', 'Impacto Regulatório'],
        color: { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', title: 'text-amber-900', dot: 'bg-amber-500' }
    },
    {
        id: 'relacionamento',
        title: 'Núcleo 3: Financeiro - Comercial',
        icon: HandshakeIcon,
        role: 'Viabilidade & Parcerias',
        desc: 'Gerencia parceiros (John Deere, Bayer). Estrutura modelos de receita e revenue share.',
        kpis: ['Receita B2B', 'Novos Contratos', 'LTV do Parceiro'],
        color: { bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', title: 'text-emerald-900', dot: 'bg-emerald-500' }
    },
    {
        id: 'marca',
        title: 'Núcleo 4: Marca',
        icon: Megaphone,
        role: 'Reconhecimento & Legitimidade',
        desc: 'Constrói narrativa e storytelling. Publica relatórios de impacto ("Green Book").',
        kpis: ['Share of Voice', 'Engajamento', 'Brand Equity'],
        color: { bg: 'bg-rose-50', border: 'border-rose-100', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', title: 'text-rose-900', dot: 'bg-rose-500' }
    }
];

// --- DADOS CAMADA 2: WORKFLOW DE TRANSFORMAÇÃO ---
const WORKFLOW_STEPS = [
    { id: 1, title: 'Mapeamento', desc: 'Status Quo do Agente', detail: 'Captura conhecimento prévio e histórico.' },
    { id: 2, title: 'Integração', desc: 'Gap Analysis', detail: 'Cruza perfil individual com estado da arte da cadeia.' },
    { id: 3, title: 'Design', desc: 'Experiência Hiperpersonalizada', detail: 'Cria trilha única com IA agnóstica.' },
    { id: 4, title: 'Fator Diferença', desc: 'Diagnóstico de Dados', detail: 'Identifica ganhos práticos e mensuráveis.' },
    { id: 5, title: 'Lifetime', desc: 'Ciclos Renovados', detail: 'Acompanhamento vitalício e renovação.' }
];

// --- DADOS CAMADA 4: TECH STACK ---
const TECH_STACK_DATA = [
    { title: 'LMS Proprietário', icon: MonitorIcon, desc: 'Plataforma adaptativa que gerencia a trilha do aluno e integra conteúdos de parceiros.', status: 'Core' },
    { title: 'CRM de Relacionamento', icon: Users, desc: 'Gestão 360º de alunos, parceiros B2B e mentores em um único data lake.', status: 'Growth' },
    { title: 'IA Generativa (RogerLens)', icon: BrainCircuit, desc: 'Motor de inteligência que analisa dados de mercado e sugere rotas de aprendizagem.', status: 'Intelligence' },
    { title: 'App de Campo', icon: Zap, desc: 'Ferramenta mobile para coleta de dados em projetos práticos nas fazendas.', status: 'Field' }
];

// --- DADOS CAMADA 6: FASEAMENTO ---
const PHASES_DATA = [
    { phase: 'Fase 1', title: 'Estruturação', duration: '3 Meses', focus: 'Setup, hiring, processos, taxonomia, IA design.', result: 'Design Operacional Definido', status: 'done' },
    { phase: 'Fase 2', title: 'Pilotagem', duration: '9 Meses', focus: '8 frentes-produtos, aprendizado, testes em campo.', result: 'Prova de Conceito Validada', status: 'pending' },
    { phase: 'Fase 3', title: 'Expansão', duration: '6 Meses', focus: 'Entrada em 6 praças estratégicas, início de escala.', result: 'Rede Consolidada', status: 'pending' },
    { phase: 'Fase 4', title: 'Consolidação', duration: '8 Meses', focus: 'Avaliação de impacto, sustentabilidade, institucionalização.', result: 'Modelo Permanente', status: 'pending' }
];

// --- ICONS HELPERS ---
function BrainCircuitIcon(props: any) { return <BrainCircuit {...props} />; }
function HandshakeIcon(props: any) { return <Briefcase {...props} />; }
function MonitorIcon(props: any) { return <Layout {...props} />; }

const WorkflowCard = ({ step }: any) => (
    // FIX: Added mt-4 to container to prevent clipping of absolute top element
    <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative group hover:-translate-y-1 transition-transform min-w-[200px] mt-4">
        <div className="absolute -top-3 left-4 w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-lg z-10">
            {step.id}
        </div>
        <div className="mt-4">
            <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
            <p className="text-xs font-black text-blue-600 uppercase tracking-wide mb-2">{step.desc}</p>
            <p className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-100 pt-2">
                {step.detail}
            </p>
        </div>
        {step.id < 5 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 bg-slate-50 border border-slate-200 rounded-full z-20 flex items-center justify-center text-slate-400">
                <ArrowRight size={12} />
            </div>
        )}
    </div>
);

const NucleusCard = ({ data }: any) => (
    <div className={`p-6 rounded-3xl border ${data.color.bg} ${data.color.border} relative group hover:shadow-lg transition-all h-full`}>
        <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${data.color.iconBg} ${data.color.iconColor}`}>
                <data.icon size={24} />
            </div>
            <div>
                <h4 className={`text-lg font-black uppercase tracking-tight ${data.color.title}`}>{data.title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{data.role}</p>
            </div>
        </div>
        
        <p className="mb-6 text-sm font-medium text-slate-600 leading-relaxed">
            {data.desc}
        </p>

        <div className="pt-4 border-t border-black/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Responsabilidade</p>
            <ul className="space-y-1">
                {data.kpis.map((kpi: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${data.color.dot}`}></div>
                        {kpi}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const TechStackCard = ({ data }: any) => (
    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col h-full hover:bg-slate-750 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-700 rounded-lg text-blue-400">
                <data.icon size={20} />
            </div>
            <span className="text-[10px] font-bold bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700 uppercase">{data.status}</span>
        </div>
        <h4 className="font-bold text-white text-sm mb-2">{data.title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{data.desc}</p>
    </div>
);

const ImpactEngine = () => (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 p-12 opacity-10 pointer-events-none">
            <BarChart3 size={250} />
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-900/50">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Camada 5: Mensuração de Impacto</h3>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        Learning Analytics & IA
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Antes (Input)</p>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                        Captura do estado inicial: produtividade atual, gaps de conhecimento e métricas de desempenho.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">Durante (Process)</p>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                        Rastreamento de dados da experiência: engajamento, comportamento e aplicação prática.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Depois (Output)</p>
                    <p className="text-sm font-bold text-white leading-relaxed">
                        Variação real mensurável: <br/>
                        <span className="text-emerald-400">↑ Produção</span> <span className="text-emerald-400">↓ Custos</span>
                    </p>
                </div>
            </div>

            <div className="mt-8 bg-white/10 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                <Zap size={16} className="text-yellow-400 mt-1 shrink-0"/>
                <p className="text-xs text-slate-300 italic">
                    "Exemplo Prático: Produtor faz bootcamp de agricultura de precisão -> passa a usar visibilidade de solo -> reduz defensivos em 23% -> economiza R$ 15k/safra. Impacto atribuído à educação."
                </p>
            </div>
        </div>
    </div>
);

const RoadmapPhase = ({ data }: any) => (
    <div className="flex gap-4 group">
        <div className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all ${data.status === 'done' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            <div className="w-0.5 flex-1 bg-slate-200 group-last:bg-transparent min-h-[60px]"></div>
        </div>
        <div className="pb-8">
            <div className="flex items-center gap-3 mb-1">
                <h5 className="font-bold text-slate-800 text-sm">{data.title}</h5>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wide">{data.phase} • {data.duration}</span>
            </div>
            <p className="text-xs text-slate-600 mb-2">{data.focus}</p>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                <CheckCircle2 size={10} /> {data.result}
            </div>
        </div>
    </div>
);

const OperatingModelView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Briefcase size={12} /> Modelo Operacional
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Arquitetura de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    Execução & Transformação
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Não é apenas uma declaração de intenção. É um sistema integrado de 6 camadas que transforma conhecimento em performance mensurável no campo.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 space-y-16">
        
        {/* CAMADA 2: WORKFLOW DE TRANSFORMAÇÃO */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-blue-600">
                    <RefreshCw size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Camada 2: O Workflow (5 Etapas)</h2>
                    <p className="text-slate-500 text-sm font-medium">Mecanismo que distingue educação de "tecnologia de desenvolvimento".</p>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4 pt-2">
                {WORKFLOW_STEPS.map(step => <WorkflowCard key={step.id} step={step} />)}
            </div>
        </section>

        {/* CAMADA 3: OS 4 NÚCLEOS */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-purple-600">
                    <Layout size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Camada 3: Núcleos Operacionais</h2>
                    <p className="text-slate-500 text-sm font-medium">Estrutura do Escritório de Expansão Permanente.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {NUCLEI_DATA.map(nucleus => <NucleusCard key={nucleus.id} data={nucleus} />)}
            </div>
        </section>

        {/* CAMADA 4: TECH STACK (RESTORED) */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-xl overflow-hidden relative">
             <div className="absolute left-0 bottom-0 p-12 opacity-5 pointer-events-none">
                <Cpu size={250} />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/50">
                        <Server size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Camada 4: Infraestrutura Tecnológica</h2>
                        <p className="text-blue-300 text-sm font-medium">O Sistema Operacional que conecta os Núcleos e mede o Impacto.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TECH_STACK_DATA.map((stack, idx) => (
                        <TechStackCard key={idx} data={stack} />
                    ))}
                </div>
             </div>
        </section>

        {/* CAMADA 5: IMPACT ENGINE */}
        <section>
            <ImpactEngine />
        </section>

        {/* CAMADA 6: ROADMAP (FASEAMENTO) */}
        <section className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4">
                        <Calendar size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4">Camada 6: Faseamento (24 Meses)</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                        Processo estruturado de implementação. Transição de "estrutura de expansão" para "estrutura de operação permanente".
                    </p>
                </div>

                <div className="lg:w-2/3 border-l border-slate-100 pl-8 md:pl-12 pt-2">
                    {PHASES_DATA.map((phase, idx) => <RoadmapPhase key={idx} data={phase} />)}
                </div>
            </div>
        </section>

        {/* SÍNTESE FINAL: A FÓRMULA */}
        <div className="bg-slate-900 rounded-[2rem] p-8 text-center border-t-4 border-emerald-500 shadow-2xl">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6">Síntese do Como</h4>
            <div className="text-lg md:text-2xl font-serif italic text-white leading-relaxed max-w-4xl mx-auto">
                "Aprendizagem Personalizada (IA) <span className="text-slate-500">+</span> Sincronização com Ciclos <span className="text-slate-500">+</span> 4 Núcleos Híbridos <span className="text-slate-500">+</span> Responsabilidade por Impacto <span className="text-emerald-400">= Uma Empresa de Tecnologia de Desenvolvimento de Pessoas."</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default OperatingModelView;
