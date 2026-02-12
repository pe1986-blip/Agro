
import React from 'react';
import { 
    X, Smartphone, CheckCircle2, LifeBuoy, RefreshCw, 
    Zap, Target, Activity, Check, ArrowRight,
    LucideIcon, Fingerprint, Megaphone, Heart, Scale, 
    Leaf, Sun, Users, GraduationCap, Network, Award, Settings, Globe, Sprout,
    Plane, Languages, BookOpen
} from 'lucide-react';

// --- DADOS B7: MARCA & POSICIONAMENTO ---
const B7_DATA = {
  title: "B7: Marca & Posicionamento",
  subtitle: "A Reputação de Safra",
  definition: "Mede como o mundo vê o campus. Se o nome é sinônimo de excelência em agro, gerando preferência (Choice Share) e atração magnética de talentos e parceiros.",
  
  variables: [
    {
      id: "V7.1",
      title: "Brand Awareness (Setor)",
      desc: "% de reconhecimento espontâneo no setor agro.",
      tiers: { sede: "80%", p3: "70%", p2: "60%", p1: "40%" },
      benchmark: "MIT (99%), Tec Monterrey (80%+)"
    },
    {
      id: "V7.2",
      title: "Ranking Nacional (Agro)",
      desc: "Posição em rankings específicos (RUF/QS) de agronegócio.",
      tiers: { sede: "Top 1", p3: "Top 3", p2: "Top 5", p1: "Regional" },
      benchmark: "MIT (#1), Imperial (Top 10)"
    },
    {
      id: "V7.3",
      title: "Mídia Especializada",
      desc: "Menções qualificadas por trimestre em canais do setor.",
      tiers: { sede: "25+", p3: "15+", p2: "10+", p1: "5+" },
      benchmark: "Stanford (75+), Harven (15+)"
    },
    {
      id: "V7.4",
      title: "Choice Share (Preferência)",
      desc: "Entre aprovados, quantos escolhem a instituição.",
      tiers: { sede: "65%", p3: "55%", p2: "45%", p1: "35%" },
      benchmark: "Stanford (98%), Harven (75%)"
    },
    {
      id: "V7.5",
      title: "Credibilidade (Stakeholders)",
      desc: "Nota de reputação (1-10) entre parceiros e mercado.",
      tiers: { sede: "9.0", p3: "8.5", p2: "8.0", p1: "7.5" },
      benchmark: "Stanford (9.9), Uniandes (8.8)"
    },
    {
      id: "V7.6",
      title: "Case Studies Publicados",
      desc: "Produção de conhecimento aplicado e disseminado.",
      tiers: { sede: "8/ano", p3: "5/ano", p2: "3/ano", p1: "1/ano" },
      benchmark: "Stanford (150+), Harven (5+)"
    }
  ],

  process: [
    {
      step: 1,
      title: "Identidade & Narrativa",
      duration: "Branding",
      icon: Fingerprint,
      items: [
        "Definição do 'Tom de Voz' do Agro Tecnológico.",
        "Manual de Marca com aplicação consistente.",
        "Posicionamento claro: 'Onde a ciência vira safra'."
      ]
    },
    {
      step: 2,
      title: "Autoridade & PR",
      duration: "Reputação",
      icon: Megaphone,
      isHighlight: true,
      items: [
        "Assessoria de imprensa ativa (Tier 1).",
        "Docentes como fontes para jornais nacionais.",
        "Eventos proprietários que pautam o setor."
      ]
    },
    {
      step: 3,
      title: "Legado & Love Brand",
      duration: "Lealdade",
      icon: Heart,
      items: [
        "Alumni orgulhosos vestindo a camisa.",
        "Store in Campus (Merchandising desejado).",
        "NPS de Marca consolidado acima de 75."
      ]
    }
  ],

  metrics: [
    { label: "Brand Awareness", baseline: "60%", target: "80%" },
    { label: "Ranking Agro", baseline: "Top 3", target: "Top 1" },
    { label: "Menções Mídia/Tri", baseline: "10", target: "25" },
    { label: "Choice Share", baseline: "35%", target: "65%" },
    { label: "Credibilidade", baseline: "7.5", target: "9.0" },
    { label: "Google Trends", baseline: "500", target: "2.000" }
  ],
  
  interdependencies: [
    "B7 → B1: Marca forte reduz Custo de Aquisição (CAC) e atrai melhores alunos.",
    "B7 → B6: Grandes empresas só fazem parcerias com marcas que admiram.",
    "B7 → B3: Pesquisadores de ponta querem estar associados a marcas de prestígio.",
    "B7 → B10: Rankings internacionais exigem reconhecimento global da marca."
  ]
};

// --- DADOS B8: OPERAÇÃO & ZERO FRICÇÃO ---
const B8_DATA = {
  title: "B8: Operação & Zero Fricção",
  subtitle: "A Experiência Invisível e Fluida",
  definition: "Mede se o campus funciona como uma máquina bem azeitada onde aluno, parceiros e colaboradores conseguem fazer suas coisas sem obstáculos administrativos. Processos digitais, ágeis e transparentes, impulsionados por IA.",
  
  variables: [
    {
      id: "V8.1",
      title: "Tempo de Resposta (SLA)",
      desc: "Velocidade de resolução de demandas do aluno (Dúvidas/Secretaria).",
      tiers: { sede: "< 2h", p3: "< 4h", p2: "< 8h", p1: "24h" },
      benchmark: "Inteli (<2h), Tec Monterrey (<2h), Stanford (12h)"
    },
    {
      id: "V8.2",
      title: "Digitalização de Processos",
      desc: "% de serviços administrativos 100% online (Sem papel/presencial).",
      tiers: { sede: "100%", p3: "98%", p2: "95%", p1: "90%" },
      benchmark: "Inteli (100%), Imperial (99%)"
    },
    {
      id: "V8.3",
      title: "Automação (IA/RPA)",
      desc: "% de processos resolvidos via automação ou IA sem humano.",
      tiers: { sede: "60%", p3: "45%", p2: "30%", p1: "10%" },
      benchmark: "Stanford (75%), Imperial (70%)"
    },
    {
      id: "V8.4",
      title: "Índice Zero Fricção",
      desc: "Métrica composta de facilidade de uso (CES - Customer Effort Score).",
      tiers: { sede: "95%", p3: "90%", p2: "85%", p1: "80%" },
      benchmark: "Stanford (97%), Inteli (90%)"
    },
    {
      id: "V8.5",
      title: "NPS de Serviços (1-10)",
      desc: "Satisfação específica com suporte e infra de serviços.",
      tiers: { sede: "9.5", p3: "9.0", p2: "8.5", p1: "8.0" },
      benchmark: "Inteli (8.8), Tec Monterrey (8.7)"
    },
    {
      id: "V8.6",
      title: "Tempo de Matrícula",
      desc: "Tempo total desde o aceite até o acesso liberado (Onboarding).",
      tiers: { sede: "< 2h", p3: "< 4h", p2: "24h", p1: "48h" },
      benchmark: "Inteli (<2h), Tec Monterrey (24h)"
    }
  ],

  process: [
    {
      step: 1,
      title: "Autoatendimento (IA First)",
      duration: "Imediato",
      icon: Smartphone,
      items: [
        "App 'Minha Ânima' resolve 60% das demandas via IA.",
        "Dashboard de Progresso Acadêmico em tempo real.",
        "Renovação de matrícula em 1 clique."
      ]
    },
    {
      step: 2,
      title: "Matrícula Frictionless",
      duration: "< 2 Horas",
      icon: CheckCircle2,
      items: [
        "Assinatura de contrato digital.",
        "Liberação automática de sistemas (LMS, Library).",
        "Onboarding gamificado instantâneo."
      ]
    },
    {
      step: 3,
      title: "Suporte Nível 2 (Humanizado)",
      duration: "SLA < 4h",
      icon: LifeBuoy,
      items: [
        "Time de 'Sucesso do Aluno' para casos complexos.",
        "Sem filas físicas, agendamento digital.",
        "Resolução no primeiro contato (FCR) > 90%."
      ]
    },
    {
      step: 4,
      title: "Melhoria Contínua (Data-Driven)",
      duration: "Contínuo",
      icon: RefreshCw,
      isHighlight: true,
      items: [
        "Análise preditiva de gargalos operacionais.",
        "Feedback loop automático pós-atendimento.",
        "Comitê de Zero Fricção mensal."
      ]
    }
  ],

  metrics: [
    { label: "Tempo Resposta", baseline: "< 4h", target: "< 2h" },
    { label: "Digitalização", baseline: "95%", target: "100%" },
    { label: "Automação IA", baseline: "30%", target: "60%" },
    { label: "Zero Fricção", baseline: "85%", target: "95%" },
    { label: "NPS Serviços", baseline: "9.0", target: "9.5" },
    { label: "Matrícula Online", baseline: "48h", target: "< 4h" }
  ],
  
  interdependencies: [
    "B8 → B4: Processos invisíveis garantem foco total na aprendizagem (PBL).",
    "B8 → B7: Eficiência operacional eleva a percepção de marca tecnológica.",
    "B8 → B5: Agilidade na documentação acelera contratação de egressos.",
    "B8 → B9: Cultura de serviço serve de exemplo para os alunos."
  ]
};

// --- DADOS B9: CULTURA & VALORES ---
const B9_DATA = {
  title: "B9: Cultura & Valores Fundacionais",
  subtitle: "Raízes Profundas e Propósito Vivido",
  definition: "Mede se o campus não é só 'máquina de ensino', mas um lugar onde valores são vividos todos os dias. Se há propósito claro, responsabilidade socioambiental e ética enraizada.",
  
  variables: [
    {
      id: "V9.1",
      title: "Código de Ética Vivido",
      desc: "Adesão prática aos valores (não apenas papel).",
      tiers: { sede: "Vivido 100%", p3: "Vivido 90%", p2: "Vivido 80%", p1: "Documentado" },
      benchmark: "Stanford (Sim), EHL (Michelin Std)"
    },
    {
      id: "V9.2",
      title: "Mindset Setorial (1-10)",
      desc: "Alinhamento com a cultura do agronegócio e serviço.",
      tiers: { sede: "9.5", p3: "8.5", p2: "7.5", p1: "7.0" },
      benchmark: "EHL (Hospitality-first), Wageningen (Sustainability)"
    },
    {
      id: "V9.3",
      title: "Empatia com Comunidade (1-10)",
      desc: "Integração e retorno para a sociedade local.",
      tiers: { sede: "9.5", p3: "8.5", p2: "8.0", p1: "7.0" },
      benchmark: "Tec Monterrey (80% Voluntários), Stanford (100% Service)"
    },
    {
      id: "V9.4",
      title: "Sustentabilidade Real",
      desc: "Práticas ESG que vão além do compliance legal.",
      tiers: { sede: "Sim + Marca", p3: "Sim (Prático)", p2: "Compliance", p1: "Básico" },
      benchmark: "Wageningen (Cradle-to-Cradle), Stanford (Carbon Neutral)"
    },
    {
      id: "V9.5",
      title: "Alunos em Projeto Social",
      desc: "% de discentes engajados em extensão curricular.",
      tiers: { sede: "85%", p3: "70%", p2: "50%", p1: "20%" },
      benchmark: "Stanford (100%), Uniandes (80%)"
    },
    {
      id: "V9.6",
      title: "Transição Sustentável",
      desc: "Número de propriedades rurais apoiadas na transição verde.",
      tiers: { sede: "30+", p3: "15+", p2: "5+", p1: "0" },
      benchmark: "Wageningen (100+)"
    },
    {
        id: "V9.7",
        title: "Diversidade (Índice)",
        desc: "Representatividade e inclusão no corpo discente/docente.",
        tiers: { sede: "0.85", p3: "0.75", p2: "0.70", p1: "0.65" },
        benchmark: "Stanford (0.80), Babson (0.78)"
    }
  ],

  process: [
    {
      step: 1,
      title: "Onboarding de Valores",
      duration: "Semana 1",
      icon: Scale,
      items: [
        "Assinatura do Código de Honra (Cerimônia).",
        "Workshop 'DNA do Campo': Respeito e Trabalho.",
        "Integração com comunidades locais."
      ]
    },
    {
      step: 2,
      title: "Vivência de Impacto",
      duration: "Contínuo",
      icon: Heart,
      items: [
        "85% dos alunos em projetos sociais obrigatórios.",
        "Mentoria de valores com Alumni.",
        "Programas de diversidade e inclusão ativos."
      ]
    },
    {
      step: 3,
      title: "Sustentabilidade Aplicada",
      duration: "Projetos",
      icon: Leaf,
      items: [
        "Campus como laboratório vivo de ESG.",
        "Apoio a 30+ propriedades em transição sustentável.",
        "Certificações internacionais (B Corp / LEED)."
      ]
    },
    {
      step: 4,
      title: "Rituais de Cultura",
      duration: "Semestral",
      icon: Sun,
      isHighlight: true,
      items: [
        "Town Halls de transparência.",
        "Celebração de conquistas comunitárias.",
        "Reconhecimento de 'Embaixadores de Valores'."
      ]
    }
  ],

  metrics: [
    { label: "Mindset Setorial", baseline: "7.0", target: "9.5" },
    { label: "Empatia Comunidade", baseline: "7.0", target: "9.5" },
    { label: "Sustentabilidade", baseline: "Compliance", target: "Sim + Marca" },
    { label: "Alunos Social", baseline: "20%", target: "85%" },
    { label: "Diversidade", baseline: "0.65", target: "0.85" },
    { label: "Propriedades Apoio", baseline: "0", target: "30+" }
  ],
  
  interdependencies: [
    "B9 → B1: Cultura forte atrai alunos com fit (Seleção).",
    "B9 → B5: Soft skills e valores aumentam a empregabilidade.",
    "B9 → B7: Reputação ética fortalece a marca institucional.",
    "B9 → B6: Parceiros globais exigem padrões ESG elevados."
  ]
};

// --- DADOS B10: INTERNACIONALIZAÇÃO ---
const B10_DATA = {
  title: "B10: Internacionalização",
  subtitle: "Fronteiras Abertas e Conexão Mundo",
  definition: "Mede o grau de integração da instituição com o cenário global, não apenas enviando alunos para fora, mas trazendo o mundo para dentro (Internationalization at Home) e produzindo ciência de classe mundial.",
  
  variables: [
    {
      id: "V10.1",
      title: "Docentes Internacionais",
      desc: "% do corpo docente com origem ou carreira internacional.",
      tiers: { sede: "50%", p3: "40%", p2: "30%", p1: "15%" },
      benchmark: "Imperial (75%), EHL (70%), Stanford (70%)"
    },
    {
      id: "V10.2",
      title: "Alunos Internacionais",
      desc: "% do corpo discente de outras nacionalidades.",
      tiers: { sede: "45%", p3: "35%", p2: "25%", p1: "10%" },
      benchmark: "EHL (45%), Tec Monterrey (40%)"
    },
    {
      id: "V10.3",
      title: "Mobilidade (Intercâmbio)",
      desc: "% de alunos que participam de programas de mobilidade.",
      tiers: { sede: "60%", p3: "45%", p2: "20%", p1: "5%" },
      benchmark: "EHL (80%), MIT (60%), Stanford (55%)"
    },
    {
      id: "V10.4",
      title: "Parcerias Globais",
      desc: "Número de convênios ativos com IES de ponta (Top 500 QS).",
      tiers: { sede: "15", p3: "10", p2: "5", p1: "2" },
      benchmark: "Stanford (100+), Imperial (50+)"
    },
    {
      id: "V10.5",
      title: "Publicações Internacionais",
      desc: "% de papers publicados em revistas com qualis internacional.",
      tiers: { sede: "70%", p3: "60%", p2: "40%", p1: "20%" },
      benchmark: "MIT (95%), Stanford (95%), Duke (65%)"
    },
    {
        id: "V10.6",
        title: "Soft Power (Influência)",
        desc: "Participação em órgãos globais (FAO, UNESCO, Banco Mundial).",
        tiers: { sede: "Regional (LatAm)", p3: "Nacional", p2: "Local", p1: "N/A" },
        benchmark: "Stanford (Global), EHL (Regional Europa)"
    }
  ],

  process: [
    {
      step: 1,
      title: "Conexão Inicial",
      duration: "Ano 1",
      icon: Languages,
      items: [
        "Aulas de idiomas técnicos obrigatórias.",
        "Visiting Professors online.",
        "Semana Internacional do Agro (evento)."
      ]
    },
    {
      step: 2,
      title: "Mobilidade Ativa",
      duration: "Ano 2",
      icon: Plane,
      items: [
        "Dupla diplomação com parceiros estratégicos.",
        "Programas de férias no exterior (Study Tours).",
        "Atração de pesquisadores visitantes."
      ]
    },
    {
      step: 3,
      title: "Presença Global",
      duration: "Ano 3",
      icon: Globe,
      isHighlight: true,
      items: [
        "Hub físico internacional (Ex: Vale do Silício ou Europa).",
        "Projetos de pesquisa multicêntricos financiados.",
        "45% de alunos internacionais no campus sede."
      ]
    }
  ],

  metrics: [
    { label: "Docentes Int.", baseline: "30%", target: "50%" },
    { label: "Alunos Int.", baseline: "25%", target: "45%" },
    { label: "Intercâmbio", baseline: "20%", target: "60%" },
    { label: "Parcerias", baseline: "5", target: "15" },
    { label: "Publicações", baseline: "40%", target: "70%" },
    { label: "Conferências", baseline: "10", target: "30" }
  ],
  
  interdependencies: [
    "B10 → B7: Reconhecimento global eleva exponencialmente a marca.",
    "B10 → B3: Pesquisa de ponta só se faz com redes internacionais.",
    "B10 → B5: Egressos globais têm empregabilidade irrestrita.",
    "B10 → B6: Grandes players multinacionais buscam parceiros globais."
  ]
};

// --- MAPA DE DADOS ---
const DATA_MAP: Record<number, any> = {
    7: B7_DATA,
    8: B8_DATA,
    9: B9_DATA,
    10: B10_DATA
};

interface StandardDetailModalProps {
    standardId: number;
    onClose: () => void;
}

const StandardDetailModal: React.FC<StandardDetailModalProps> = ({ standardId, onClose }) => {
    // Select data based on standardId, defaulting to B9 if not found (or handle gracefully)
    const data = DATA_MAP[standardId] || B9_DATA; 

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[3000] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col relative" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="bg-slate-50 p-8 border-b border-slate-200 flex justify-between items-start shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-cyan-200">
                                Balizador {standardId < 10 ? `0${standardId}` : standardId}
                            </span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Padrão Premium</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{data.title}</h2>
                        <p className="text-slate-500 font-medium mt-1 text-sm max-w-2xl">{data.definition}</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                        {data.metrics.map((m: any, i: number) => (
                            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</span>
                                <span className="text-xl font-black text-slate-800">{m.baseline}</span>
                                <div className="w-full h-px bg-slate-100 my-2"></div>
                                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                                    <Target size={10} /> {m.target}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Variables Table */}
                    <div className="mb-10">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Activity size={18} className="text-blue-500"/> Variáveis de Controle
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.variables.map((v: any, i: number) => (
                                <div key={i} className="p-6 rounded-3xl border border-slate-200 hover:border-cyan-300 transition-all group bg-slate-50/50 hover:bg-white">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-black text-cyan-600 bg-cyan-50 px-2 py-1 rounded border border-cyan-100">{v.id}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-2">{v.title}</h4>
                                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{v.desc}</p>
                                    
                                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-slate-400">Sede</span>
                                            <span className="font-bold text-slate-800">{v.tiers.sede}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-bold text-slate-400">Polo P3</span>
                                            <span className="font-bold text-slate-700">{v.tiers.p3}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-200/50">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Benchmark Global</p>
                                        <p className="text-[10px] text-slate-600 font-medium">{v.benchmark}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process Flow */}
                    <div className="mb-10">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap size={18} className="text-yellow-500"/> Jornada de Implementação
                        </h3>
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 hidden md:block"></div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {data.process.map((step: any, i: number) => (
                                    <div key={i} className={`relative p-6 rounded-3xl border ${step.isHighlight ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-slate-200'} shadow-sm`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${step.isHighlight ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <step.icon size={20} />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{step.duration}</p>
                                        <ul className="space-y-1.5">
                                            {step.items.map((item: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-tight">
                                                    <Check size={12} className="text-emerald-500 shrink-0 mt-0.5"/> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Interdependencies */}
                    <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
                        <h3 className="text-sm font-black text-orange-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Network size={18}/> Conexões Sistêmicas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.interdependencies.map((dep: string, i: number) => (
                                <div key={i} className="bg-white/60 p-3 rounded-xl border border-orange-100 text-xs font-medium text-orange-900 flex items-start gap-2">
                                    <ArrowRight size={14} className="mt-0.5 shrink-0 text-orange-400"/>
                                    {dep}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StandardDetailModal;
