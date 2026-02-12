
import React, { useState } from 'react';
import { 
  Calendar, CheckSquare, ArrowRight, User, Building2, 
  Tractor, Landmark, GraduationCap, Clock, ShieldCheck, 
  Rocket, Filter, Eye, PlayCircle, HardHat
} from 'lucide-react';

type PersonaType = 'ALL' | 'EMPRESA' | 'PRODUTOR' | 'GOVERNO' | 'ESTUDANTE';

const ROADMAP_DATA = [
  {
    level: 1,
    title: "Nível 1: Observar & Conhecer",
    period: "0 a 30 Dias",
    commitment: "Baixo Risco",
    icon: Eye,
    color: "blue",
    desc: "Para céticos, curiosos ou quem ainda não tem mandato. O objetivo é entender a cultura sem assinar contratos.",
    generalActions: [
      "Participar de 1 seminário aberto online (Webinar Temático).",
      "Agendar conversa de diagnóstico (1h) com o time de parcerias.",
      "Assinar a newsletter de Inteligência de Mercado do Campus."
    ],
    personaActions: {
      'EMPRESA': [
        "Enviar um representante de RH/Inovação para visitar o Hub.",
        "Mapear internamente 3 dores de capacitação que não são atendidas hoje.",
        "Solicitar o 'Menu de Parcerias' para análise do board."
      ],
      'PRODUTOR': [
        "Visitar o Campus em dia de campo ou evento técnico.",
        "Conversar com um aluno atual sobre a experiência prática.",
        "Ler um 'Policy Brief' ou estudo de caso gerado pelo Think Tank."
      ],
      'GOVERNO': [
        "Receber o time institucional para apresentação do conceito 'Território'.",
        "Convidar um especialista da Ânima Agro para uma audiência técnica.",
        "Solicitar dados de um município específico para teste de consistência."
      ],
      'ESTUDANTE': [
        "Seguir os canais digitais e entrar na comunidade aberta (Discord/WhatsApp).",
        "Participar de uma aula magna aberta ou workshop gratuito.",
        "Fazer o teste de perfil 'Qual sua tribo no Agro?' no site."
      ]
    }
  },
  {
    level: 2,
    title: "Nível 2: Prototipar Junto",
    period: "30 a 90 Dias",
    commitment: "Médio Compromisso",
    icon: PlayCircle,
    color: "purple",
    desc: "Para quem quer testar a entrega. Projetos curtos, pilotos controlados e primeiras interações reais.",
    generalActions: [
      "Co-desenhar 1 bootcamp ou imersão temática de curta duração.",
      "Validar um escopo de projeto de P&D aplicada.",
      "Participar como ouvinte/convidado de um Conselho Consultivo."
    ],
    personaActions: {
      'EMPRESA': [
        "Rodar um 'Desafio de Inovação' (Hackathon) com alunos para resolver uma dor específica.",
        "Contratar uma turma fechada de curso de extensão (ex: ESG para fornecedores).",
        "Patrocinar um evento técnico focado na sua cadeia."
      ],
      'PRODUTOR': [
        "Inscrever um sucessor ou gerente em um curso de média duração.",
        "Ceder uma área da propriedade para um experimento de campo controlado.",
        "Entrar para o grupo de 'Mentores Práticos' de uma disciplina."
      ],
      'GOVERNO': [
        "Co-organizar um seminário de políticas públicas no campus.",
        "Encomendar um estudo diagnóstico específico sobre uma cadeia local.",
        "Capacitar uma turma de técnicos da secretaria em novas tecnologias."
      ],
      'ESTUDANTE': [
        "Matricular-se em um Bootcamp ou curso de extensão.",
        "Voluntariar-se para um projeto de pesquisa aplicada.",
        "Aplicar para o programa de embaixadores do campus."
      ]
    }
  },
  {
    level: 3,
    title: "Nível 3: Co-Construir o Campus",
    period: "90+ Dias (Longo Prazo)",
    commitment: "Alto Impacto",
    icon: HardHat, // ou Rocket
    color: "emerald",
    desc: "Para parceiros orgânicos. Alianças estratégicas, cadeiras em conselho e construção de legado.",
    generalActions: [
      "Assinar acordo de parceria estratégica (MOU Multi-anos).",
      "Investir financeiro/político em um Núcleo Vocacionado.",
      "Co-liderar a estratégia de uma cadeia produtiva dentro do campus."
    ],
    personaActions: {
      'EMPRESA': [
        "Estabelecer um 'Corporate Lab' fixo dentro do campus.",
        "Co-desenhar uma graduação ou MBA customizado (Company University).",
        "Tornar-se mantenedora de bolsas de estudo para talentos de baixa renda."
      ],
      'PRODUTOR': [
        "Assumir cadeira no Conselho Consultivo da Trilha (ex: Grãos).",
        "Tornar a propriedade uma 'Fazenda Sala de Aula' oficial.",
        "Investir diretamente em startups nascidas no Hub."
      ],
      'GOVERNO': [
        "Integrar o campus oficialmente à estratégia de desenvolvimento regional.",
        "Utilizar o Think Tank como braço oficial de inteligência de dados.",
        "Criar linhas de fomento específicas para projetos do ecossistema."
      ],
      'ESTUDANTE': [
        "Ingressar na Graduação ou Pós-Graduação completa.",
        "Liderar uma Liga Acadêmica ou Empresa Júnior.",
        "Fundar uma startup incubada no campus."
      ]
    }
  }
];

const ActionRoadmapView: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('ALL');

  const getPersonaStyle = (type: PersonaType) => {
      const base = "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border flex items-center gap-2";
      if (selectedPersona === type) {
          return `${base} bg-slate-800 text-white border-slate-800 shadow-lg scale-105`;
      }
      return `${base} bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700`;
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Calendar size={12} /> Plano de Voo
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Próximos 90 Dias: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    Seu Roteiro de Ação
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
                Se você chegou até aqui, já entendeu a visão. Agora é hora de decidir como — e com que intensidade — quer entrar nesse jogo.
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        
        {/* PERSONA FILTER */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 mb-12 flex flex-wrap justify-center gap-3">
            <button onClick={() => setSelectedPersona('ALL')} className={getPersonaStyle('ALL')}>
                <Filter size={14}/> Todos
            </button>
            <div className="w-px h-8 bg-slate-200 mx-2 hidden md:block"></div>
            <button onClick={() => setSelectedPersona('EMPRESA')} className={getPersonaStyle('EMPRESA')}>
                <Building2 size={14}/> Empresa
            </button>
            <button onClick={() => setSelectedPersona('PRODUTOR')} className={getPersonaStyle('PRODUTOR')}>
                <Tractor size={14}/> Produtor
            </button>
            <button onClick={() => setSelectedPersona('GOVERNO')} className={getPersonaStyle('GOVERNO')}>
                <Landmark size={14}/> Governo
            </button>
            <button onClick={() => setSelectedPersona('ESTUDANTE')} className={getPersonaStyle('ESTUDANTE')}>
                <GraduationCap size={14}/> Estudante
            </button>
        </div>

        {/* ROADMAP CARDS */}
        <div className="space-y-8">
            {ROADMAP_DATA.map((level) => (
                <div key={level.level} className={`bg-white rounded-[2.5rem] border overflow-hidden transition-all duration-500 hover:shadow-xl group ${level.level === 3 ? 'border-emerald-200' : 'border-slate-200'}`}>
                    
                    {/* Header do Nível */}
                    <div className={`p-8 flex flex-col md:flex-row gap-6 items-start ${level.level === 1 ? 'bg-blue-50/30' : level.level === 2 ? 'bg-purple-50/30' : 'bg-emerald-50/30'}`}>
                        <div className={`p-4 rounded-2xl shrink-0 ${level.level === 1 ? 'bg-blue-100 text-blue-600' : level.level === 2 ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            <level.icon size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white border border-slate-100 ${level.level === 1 ? 'text-blue-600' : level.level === 2 ? 'text-purple-600' : 'text-emerald-600'}`}>
                                    {level.period}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{level.commitment}</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{level.title}</h2>
                            <p className="text-slate-600 font-medium leading-relaxed">{level.desc}</p>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="p-8 border-t border-slate-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Ações Gerais (Sempre visíveis se ALL ou como base) */}
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckSquare size={14}/> Ações Imediatas (Base)
                                </h4>
                                <ul className="space-y-3">
                                    {level.generalActions.map((action, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ações Específicas (Filtradas) */}
                            <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-all duration-500 ${selectedPersona !== 'ALL' ? 'ring-2 ring-offset-2 ring-slate-200' : ''}`}>
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <User size={14} className="text-blue-500"/> 
                                    {selectedPersona === 'ALL' ? 'Exemplos por Perfil' : `Sua Lista (${selectedPersona})`}
                                </h4>
                                
                                <div className="space-y-4">
                                    {Object.entries(level.personaActions).map(([persona, actions]) => {
                                        if (selectedPersona !== 'ALL' && persona !== selectedPersona) return null;
                                        
                                        return (
                                            <div key={persona} className="group/persona">
                                                {selectedPersona === 'ALL' && (
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 group-hover/persona:text-blue-600 transition-colors">
                                                        Se você é {persona}...
                                                    </p>
                                                )}
                                                <ul className="space-y-2">
                                                    {(actions as string[]).map((action, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-600">
                                                            <ArrowRight size={12} className={`mt-0.5 shrink-0 ${selectedPersona === 'ALL' ? 'text-slate-300' : 'text-blue-500'}`} />
                                                            {action}
                                                        </li>
                                                    ))}
                                                </ul>
                                                {selectedPersona === 'ALL' && <div className="h-px bg-slate-200 w-full my-3 last:hidden"></div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            ))}
        </div>

        {/* FECHAMENTO */}
        <div className="mt-20 bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900 opacity-50"></div>
            <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <Rocket size={300} />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <ShieldCheck size={48} className="mx-auto text-emerald-400 mb-6" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-tight">
                    O Futuro Não Espera. <br/>
                    A Escolha é Sua.
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-10 font-medium">
                    Ninguém é obrigado a entrar no Nível 3 de cara. Você pode começar observando. 
                    Mas a transformação que queremos — do agro, da educação e da política — pede que alguns atores, 
                    em algum momento, escolham jogar esse jogo integralmente.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    Iniciar Minha Jornada Agora
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ActionRoadmapView;
