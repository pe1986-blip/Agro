import React, { useState } from 'react';
import { 
  Building2, Tractor, Landmark, GraduationCap, 
  ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, 
  Briefcase, MousePointerClick, ChevronRight, TrendingUp 
} from 'lucide-react';

const PERSONAS = [
  {
    id: 'executive',
    label: 'Executivo(a) Âncora',
    role: 'Líder de Usina / Trading',
    icon: Building2,
    color: 'blue',
    theme: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      accent: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    content: {
      title: "Se você lidera uma gigante do agro que cresceu mais rápido que sua capacidade de formar gente...",
      context: "Você tem capital, tecnologia de ponta e um plano de expansão agressivo. O problema? Seus gerentes são ótimos técnicos, mas tropeçam na liderança. Você gasta milhões em consultorias externas que entregam PowerPoint e vão embora, levando o conhecimento junto. Seu RH sofre para atrair talentos dispostos a morar no interior, e a inovação aberta trava na burocracia interna.",
      solution: "A Ânima Agro atua como sua Universidade Corporativa 'in-situ'. Não vendemos cursos de prateleira; desenhamos programas in-company onde o 'TCC' é a resolução de um gargalo da sua operação (ex: eficiência energética ou logística). Seus executivos viram mentores, nossos alunos viram seu pipeline de talentos já testados na sua cultura.",
      gains: [
        "Pipeline de Sucessão: Estagiários e Trainees que já conhecem seu chão de fábrica.",
        "Retenção de Liderança: Oferecer MBA Executivo como benefício e ferramenta de engajamento.",
        "P&D Descentralizado: Use nossos labs para testar inovações que são arriscadas demais para a operação principal.",
        "Reputação ESG: Protagonismo na formação e desenvolvimento da região."
      ],
      cta: "Agende um diagnóstico de competências da sua liderança."
    }
  },
  {
    id: 'producer',
    label: 'Produtor(a) Rural',
    role: 'Agricultor / Liderança',
    icon: Tractor,
    color: 'emerald',
    theme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700'
    },
    content: {
      title: "Se você sabe produzir como ninguém, mas sente que a margem está escapando na gestão...",
      context: "Da porteira para dentro, sua fazenda é um exemplo. Da porteira para fora, o cenário é complexo. Você se preocupa com a sucessão familiar (seus filhos querem ficar?), não tem certeza se está usando os derivativos financeiros corretamente e sente que a tecnologia avança mais rápido do que sua capacidade de absorção. A solidão da decisão estratégica pesa.",
      solution: "O Campus é sua extensão de escritório. Você entra não apenas como aluno de trilhas curtas (Gestão, Finanças, Governança), mas como membro do ecossistema. Seus filhos fazem a graduação aqui, com projetos aplicados na SUA propriedade. Você acessa nossa rede de especialistas para validar decisões de investimento e tecnologia, sem o viés de vendedor.",
      gains: [
        "Plano de Sucessão: Preparar a próxima geração com técnica e mentalidade de dono.",
        "Blindagem Patrimonial: Acesso a conhecimento jurídico e financeiro de ponta.",
        "Networking Estratégico: Troca real com outros produtores e players da indústria.",
        "Curadoria Tecnológica: Saber o que comprar e o que ignorar em AgTech."
      ],
      cta: "Inscreva-se no próximo ciclo de Governança Familiar."
    }
  },
  {
    id: 'public',
    label: 'Gestor(a) Público',
    role: 'Secretário / Regulador',
    icon: Landmark,
    color: 'slate',
    theme: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-900',
      accent: 'text-slate-600',
      button: 'bg-slate-800 hover:bg-slate-900'
    },
    content: {
      title: "Se você desenha políticas públicas e precisa de evidências sólidas, não de opiniões...",
      context: "Você está na linha de frente da regulação e fomento (seja no MAPA, Secretaria Estadual ou Agência). A pressão é enorme: de um lado, a demanda produtiva; do outro, a exigência ambiental e social global. Faltam dados neutros, estudos de impacto local e um espaço seguro para diálogo entre setores que, muitas vezes, não se conversam.",
      solution: "O Think Tank da Ânima Agro é seu laboratório de políticas. Atuamos como um 'terceiro elemento' neutro. Co-criamos Policy Briefs baseados em dados reais do território. Oferecemos o campus como terreno neutro para audiências, workshops legislativos e capacitação técnica de servidores públicos em novas regulações (ex: Mercado de Carbono).",
      gains: [
        "Segurança Técnica: Políticas embasadas em dados acadêmicos rigorosos.",
        "Capilaridade: Acesso direto aos atores da cadeia para validação de normas.",
        "Legado Institucional: Formação de quadros técnicos do estado.",
        "Diálogo Multisetorial: Redução de atrito na implementação de novas leis."
      ],
      cta: "Proponha um tema para o nosso próximo Policy Lab."
    }
  },
  {
    id: 'student',
    label: 'Profissional em Transição',
    role: 'Estudante / Carreira',
    icon: GraduationCap,
    color: 'purple',
    theme: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-900',
      accent: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    content: {
      title: "Se você sente que sua carreira estagnou ou quer migrar para o setor que carrega o PIB...",
      context: "Você pode ser um engenheiro, advogado ou administrador. O mercado urbano corporativo parece saturado e distante do propósito. Você vê o Agro bombando, tecnologia, sustentabilidade, mas não sabe por onde entrar. Sente que falta 'chão de barro' no seu currículo e conexão com quem decide.",
      solution: "Você entra na jornada 'Marina'. Não é uma pós-graduação teórica de fim de semana. É um programa de Imersão & Transição. Você vai para o campo resolver problemas reais. Seu professor é um executivo do setor. Seu TCC é um projeto de consultoria. Nós te damos o 'sotaque' do agro e a rede de contatos que você não tem.",
      gains: [
        "Rebranding Profissional: De 'generalista' para 'especialista em agronegócio'.",
        "Portfólio Real: Sair com projetos implementados, não só notas.",
        "Network Acelerado: Acesso direto a decisores de empresas líderes.",
        "Empregabilidade: Curadoria para posições de média e alta gestão."
      ],
      cta: "Aplique para o processo seletivo da próxima turma."
    }
  }
];

const FourDoorsView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('executive');

  const activePersona = PERSONAS.find(p => p.id === selectedId) || PERSONAS[0];

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in flex flex-col">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-12">
        <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6">
                <MousePointerClick size={12} /> Navegação por Persona
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Eu Aqui Dentro: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
                    Sua Porta de Entrada
                </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                O ecossistema Ânima Agro não é tamanho único. Escolha seu perfil para entender a proposta de valor customizada para sua realidade.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            
            {/* SIDEBAR DE SELEÇÃO */}
            <div className="lg:col-span-4 flex flex-col gap-3">
                {PERSONAS.map((persona) => {
                    const isActive = selectedId === persona.id;
                    const Icon = persona.icon;
                    
                    return (
                        <button
                            key={persona.id}
                            onClick={() => setSelectedId(persona.id)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden ${
                                isActive 
                                ? `${persona.theme.bg} ${persona.theme.border} ring-1 ring-offset-2 ${persona.theme.accent} shadow-md` 
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-white shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'}`}>
                                <Icon size={24} className={isActive ? persona.theme.accent : ''} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className={`font-bold text-sm ${isActive ? persona.theme.text : 'text-slate-700'}`}>
                                    {persona.label}
                                </h3>
                                <p className={`text-xs truncate ${isActive ? 'opacity-80' : 'text-slate-400'}`}>
                                    {persona.role}
                                </p>
                            </div>
                            {isActive && <ChevronRight size={16} className={persona.theme.accent} />}
                        </button>
                    );
                })}
            </div>

            {/* CONTEÚDO PRINCIPAL (CARD) */}
            <div className="lg:col-span-8">
                <div className={`h-full bg-white rounded-[2.5rem] border shadow-xl p-8 md:p-12 relative overflow-hidden flex flex-col ${activePersona.theme.border}`}>
                    
                    {/* Background Icon */}
                    <div className={`absolute -right-6 -bottom-6 opacity-5 pointer-events-none transition-all duration-500`}>
                        <activePersona.icon size={350} className={activePersona.theme.accent} />
                    </div>

                    <div className="relative z-10">
                        {/* Header do Card */}
                        <div className="mb-8">
                            <h2 className={`text-2xl md:text-3xl font-black mb-4 leading-tight ${activePersona.theme.text}`}>
                                "{activePersona.content.title}"
                            </h2>
                            <div className="h-1 w-20 rounded-full bg-current opacity-20"></div>
                        </div>

                        {/* Corpo: Contexto & Solução */}
                        <div className="space-y-8 mb-10">
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={14}/> O Contexto
                                </h4>
                                <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                                    {activePersona.content.context}
                                </p>
                            </div>
                            
                            <div className={`p-6 rounded-2xl ${activePersona.theme.bg} border border-opacity-50 ${activePersona.theme.border}`}>
                                <h4 className={`text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 ${activePersona.theme.accent}`}>
                                    <Lightbulb size={14}/> Como a Ânima Agro entra
                                </h4>
                                <p className={`leading-relaxed font-medium text-sm md:text-base ${activePersona.theme.text}`}>
                                    {activePersona.content.solution}
                                </p>
                            </div>
                        </div>

                        {/* Ganhos (Bullets) */}
                        <div className="mb-10">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <TrendingUp size={14}/> Ganhos em 24 Meses
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activePersona.content.gains.map((gain, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${activePersona.theme.accent}`} />
                                        <span className="text-sm text-slate-600 font-medium leading-snug">{gain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <Briefcase size={20} className="text-slate-300" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próximo Passo</span>
                            </div>
                            <button className={`${activePersona.theme.button} text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg transition-all flex items-center gap-2 group w-full md:w-auto justify-center`}>
                                {activePersona.content.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default FourDoorsView;