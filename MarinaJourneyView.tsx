
import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, ArrowLeft, CheckCircle2, 
  FileText, Zap, Users, TrendingUp, AlertTriangle, 
  Target, Award, Briefcase, ChevronDown, ChevronUp,
  Lightbulb, Microscope, ArrowRight, Rocket
} from 'lucide-react';

// --- INTERFACES ---

interface ContentItem {
  type: 'core' | 'extension' | 'elective' | 'artifact';
  title: string;
  week: string;
  desc: string;
  highlight?: boolean;
  details?: string[];
  artifact?: {
    name: string;
    text: string;
  };
  project?: {
    title: string;
    constraint: string;
    action: string;
    outcome: string;
  };
}

interface Semester {
  id: number;
  title: string;
  period: string;
  theme: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  content: ContentItem[];
}

// --- DADOS DA JORNADA ---

const PROFILE_BEFORE = {
  role: "Engenheira Agrônoma",
  company: "Fazenda de Cana (RJ)",
  salary: "R$ 8.000",
  mindset: "Focada na produção agrícola (Porteira Adentro).",
  network: "Limitada a produtores locais (~20 contatos)."
};

const PROFILE_AFTER = {
  role: "Diretora de Inovação & Eficiência",
  company: "Raízen (Grupo)",
  salary: "R$ 10.400 (+30%)",
  mindset: "Visão sistêmica (Cana → Indústria → Carbono → Mercado).",
  network: "Expansiva (Executivos, Pesquisadores, Governo - 100+)."
};

const SEMESTERS: Semester[] = [
  {
    id: 1,
    title: "Semestre 1: Propósito & Orientação",
    period: "Jan - Mar 2027",
    theme: "O Despertar Sistêmico",
    color: "border-blue-500",
    bg: "bg-blue-50",
    icon: Target,
    content: [
      {
        type: 'core',
        title: "O Choque de Realidade",
        week: "Semana 1-3",
        desc: "Marina entra achando que sabe tudo de cana. Em 3 semanas, descobre que não sabe nada de Etanol Global.",
        details: [
          "Debate acalorado com executivo de petróleo sobre o futuro dos combustíveis.",
          "Percebe que eficiência na fazenda é inútil sem logística e regulação.",
          "Insight: 'Eu era uma excelente técnica, mas uma péssima estrategista'."
        ]
      },
      {
        type: 'extension',
        title: "Ciclo 1: A Busca do Propósito",
        week: "Semana 4-8",
        desc: "Visitas cruzadas (Fazenda x Usina x Governo). Marina precisa definir seu 'Statement'.",
        artifact: {
          name: "Statement de Propósito",
          text: "\"Meu objetivo é levar inovação de eficiência energética do laboratório para a planta industrial, impactando 100+ milhões de litros. Não quero apenas produzir cana; quero produzir energia limpa competitiva.\""
        }
      },
      {
        type: 'elective',
        title: "Deep Dive Técnico",
        week: "Semana 9-12",
        desc: "Marina escolhe aprofundar em Fisiologia da Cana para entender os limites biológicos da matéria-prima antes de entrar na indústria."
      }
    ]
  },
  {
    id: 2,
    title: "Semestre 2-3: Diagnóstico & Inovação",
    period: "Abr - Set 2027",
    theme: "Mão na Massa (A Usina)",
    color: "border-purple-500",
    bg: "bg-purple-50",
    icon: Microscope,
    content: [
      {
        type: 'core',
        title: "Pensamento Sistêmico",
        week: "Semana 1-4",
        desc: "Workshop de Liderança em Incerteza. Marina mapeia o feedback loop entre preço do açúcar e manutenção da caldeira."
      },
      {
        type: 'extension',
        title: "Ciclo 2: O Pesquisador-Aprendiz",
        week: "Jun - Ago",
        desc: "Marina é alocada na Raízen Rio Verde. Mentor: Gerente de Operações.",
        highlight: true,
        project: {
          title: "Desafio: Reduzir Intensidade Energética em 15%",
          constraint: "Budget máximo de R$ 2MM.",
          action: "Marina faz auditoria térmica e descobre perda de 20% de calor na destilaria. Propõe solução híbrida: 'Heat Recovery' + Ajuste de Caldeira.",
          outcome: "Apresentação para o board. Projeto aprovado para piloto."
        }
      },
      {
        type: 'elective',
        title: "Toolkit: Carbon Markets",
        week: "Paralelo",
        desc: "Aula sobre créditos de carbono. Marina calcula que seu projeto não só economiza energia, mas gera R$ 37k/ano em créditos de carbono. O projeto se paga mais rápido."
      }
    ]
  },
  {
    id: 3,
    title: "Semestre 4: Cocriação & Impacto",
    period: "Out 27 - Mar 28",
    theme: "Execução & Legado",
    color: "border-emerald-500",
    bg: "bg-emerald-50",
    icon: Rocket,
    content: [
      {
        type: 'core',
        title: "A Arte da Implementação",
        week: "Semana 1-3",
        desc: "Não basta ter a ideia. Tem que fazer acontecer no chão de fábrica, vencendo a resistência dos operadores antigos."
      },
      {
        type: 'extension',
        title: "Ciclo 3: O Piloto Real",
        week: "Out - Jan",
        desc: "Marina lidera a instalação do trocador de calor.",
        highlight: true,
        project: {
            title: "Execução & Crise",
            constraint: "O equipamento falha no primeiro teste. Vazamento.",
            action: "Marina não chama o consultor. Ela desce para a planta com o engenheiro, suja a mão de graxa, identifica o erro de montagem e corrige.",
            outcome: "Sucesso. Economia de 7 MWh/1000L. Meta batida."
        }
      },
      {
        type: 'artifact',
        title: "O Legado",
        week: "Fev - Mar",
        desc: "Marina publica o case: 'De Diagnóstico a Impacto: Heat Recovery em Etanol'.",
        artifact: {
          name: "Oferta de Emprego",
          text: "Raízen cria cargo de 'Diretora de Eficiência Energética' para ela escalar a solução para outras 8 usinas."
        }
      }
    ]
  }
];

// --- COMPONENTES ---

const ArtifactCard = ({ name, text }: { name: string, text: string }) => (
    <div className="bg-white p-4 rounded-xl border-l-4 border-slate-400 shadow-sm mt-3 relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-10">
            <FileText size={40} />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{name}</span>
        <p className="text-sm font-serif italic text-slate-700 leading-relaxed">"{text}"</p>
    </div>
);

const ProjectCard = ({ project }: { project: NonNullable<ContentItem['project']> }) => (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl mt-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={80} />
        </div>
        <h4 className="text-emerald-400 font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
            <Zap size={14}/> Projeto Real
        </h4>
        <h3 className="text-lg font-bold mb-3">{project.title}</h3>
        
        <div className="space-y-3 text-sm">
            <div className="flex gap-3">
                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/>
                <p><span className="text-slate-400 font-bold">Restrição:</span> {project.constraint}</p>
            </div>
            <div className="flex gap-3">
                <Users size={16} className="text-blue-400 shrink-0 mt-0.5"/>
                <p><span className="text-slate-400 font-bold">Ação:</span> {project.action}</p>
            </div>
            <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>
                <p><span className="text-slate-400 font-bold">Resultado:</span> {project.outcome}</p>
            </div>
        </div>
    </div>
);

const TimelineBlock: React.FC<{ semester: Semester }> = ({ semester }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`relative pl-8 md:pl-12 pb-12 border-l-2 ${semester.color} last:border-0`}>
            {/* Dot */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${semester.color}`}></div>
            
            <div className="mb-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-200 uppercase tracking-wider">
                        {semester.period}
                    </span>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{semester.title}</h2>
                </div>
                <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                    {isOpen ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    Foco: <span className="text-slate-700 font-bold">{semester.theme}</span>
                </p>
            </div>

            {isOpen && (
                <div className="space-y-6 animate-fade-in">
                    {semester.content.map((item, idx) => (
                        <div key={idx} className={`p-5 rounded-2xl border ${item.highlight ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100'} hover:shadow-md transition-shadow`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                    item.type === 'core' ? 'bg-blue-100 text-blue-700' : 
                                    item.type === 'extension' ? 'bg-emerald-100 text-emerald-700' : 
                                    'bg-amber-100 text-amber-700'
                                }`}>
                                    {item.type === 'core' ? 'Núcleo' : item.type === 'extension' ? 'Extensão' : 'Eletiva'}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">{item.week}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            
                            {item.details && (
                                <ul className="mt-3 space-y-1 pl-4 border-l-2 border-slate-200">
                                    {item.details.map((d, i) => (
                                        <li key={i} className="text-xs text-slate-500">• {d}</li>
                                    ))}
                                </ul>
                            )}

                            {item.artifact && <ArtifactCard {...item.artifact} />}
                            {item.project && <ProjectCard project={item.project} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ComparisonTable = () => (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">O Salto de Carreira</h3>
            <p className="text-slate-400 text-sm">Comparativo Direto: Jan 2027 vs. Abr 2028</p>
        </div>
        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest p-4 text-center">
            <div>Dimensão</div>
            <div>Antes (A Técnica)</div>
            <div className="text-emerald-600">Depois (A Líder)</div>
        </div>
        {[
            { dim: 'Propósito', before: '"Trabalho com cana, não sei bem porquê."', after: '"Lidero a transição energética via etanol."' },
            { dim: 'Visão', before: 'Focada na fazenda (Local).', after: 'Sistêmica (Campo + Indústria + Mercado).' },
            { dim: 'Rede', before: '20 produtores vizinhos.', after: '100+ (Executivos, Pesquisadores, Governo).' },
            { dim: 'Impacto', before: 'Operacional (Dia a dia).', after: 'Estratégico (R$ 2MM de Capex gerido).' },
            { dim: 'Salário', before: 'R$ 8.000', after: 'R$ 10.400 (+ Cargo de Diretoria)' }
        ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors text-sm">
                <div className="font-bold text-slate-700 flex items-center justify-center">{row.dim}</div>
                <div className="text-slate-500 text-center italic px-2 border-x border-slate-100 flex items-center justify-center">{row.before}</div>
                <div className="text-emerald-700 font-bold text-center px-2 flex items-center justify-center">{row.after}</div>
            </div>
        ))}
    </div>
);

const MarinaJourneyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in relative z-50">
        
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
            <button onClick={onBack} className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} /> Voltar à Matriz
            </button>
            <div className="text-right">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Estudo de Caso</span>
                <span className="text-sm font-bold text-slate-800">A Jornada de Marina</span>
            </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
            
            {/* INTRO PROFILE */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 items-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-xl shrink-0 overflow-hidden">
                     {/* Placeholder Avatar */}
                     <User size={64} className="text-slate-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Marina S.</h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                        Engenheira agrônoma com 8 anos de campo. Tecnicamente excelente, mas estagnada na operação. Entrou no MBA para virar <strong>gestora de inovação</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">MBA Etanol & Bioenergia</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Turma 2027</span>
                    </div>
                </div>
            </div>

            {/* TIMELINE */}
            <div className="mb-20">
                {SEMESTERS.map(sem => (
                    <TimelineBlock key={sem.id} semester={sem} />
                ))}
            </div>

            {/* TRANSFORMAÇÃO (ANTES/DEPOIS) */}
            <div className="mb-20">
                <div className="text-center mb-10">
                    <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4 shadow-sm">
                        <TrendingUp size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">O Resultado</h2>
                    <p className="text-slate-500 mt-2">A transformação tangível após 18 meses de imersão.</p>
                </div>
                <ComparisonTable />
            </div>

            {/* FECHAMENTO */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Lightbulb size={200} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-6">
                        "Não foi uma aula sobre etanol. Foi a construção da minha carreira como inovadora."
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
                        A história de Marina não é exceção; é o padrão do Campus Vocacionado. 
                        Onde a teoria encontra a prática, a liderança nasce.
                    </p>
                    <button onClick={onBack} className="bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2">
                        Ver Estrutura do Curso <ArrowRight size={14}/>
                    </button>
                </div>
            </div>

        </div>
    </div>
  );
};

export default MarinaJourneyView;
