
import React, { useState } from 'react';
import { 
  Sun, BrainCircuit, Users, Mic, Zap, Heart, Activity, 
  Sprout, Coffee, Scale, Gavel, Anchor, ArrowRight, 
  LayoutGrid, BookOpen, Clock, CheckCircle2, XCircle, Leaf
} from 'lucide-react';
import MarinaJourneyView from './MarinaJourneyView'; // NEW IMPORT

// --- DADOS: NÍVEL 1 (NÚCLEO) ---
const CORE_COMPETENCIES = [
  {
    id: 'critical',
    title: 'Pensamento Crítico & Sistêmico',
    icon: BrainCircuit,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    definition: 'Capacidade de analisar problemas complexos reconhecendo múltiplas dimensões (técnica, econômica, ambiental).',
    evaluation: 'O aluno consegue identificar tradeoffs? Argumenta sobre decisões difíceis?'
  },
  {
    id: 'leadership',
    title: 'Liderança Colaborativa',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    definition: 'Capacidade de trabalhar em equipes multidisciplinares e liderar sem autoridade formal.',
    evaluation: 'Mentores citam o aluno como referência? A equipe confia nele?'
  },
  {
    id: 'communication',
    title: 'Comunicação Integrada',
    icon: Mic,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    definition: 'Traduzir conhecimento para públicos diferentes (agrônomo, economista, agricultor, jornalista).',
    evaluation: 'Consegue explicar um conceito complexo de forma clara em 3 minutos?'
  },
  {
    id: 'innovation',
    title: 'Inovação & Experimentação',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    definition: 'Capacidade de testar hipóteses, iterar rapidamente e aprender com fracassos.',
    evaluation: 'Trouxe proposta nova? Testou? Aprendeu com o erro?'
  },
  {
    id: 'ethics',
    title: 'Ética & Impacto Social',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    definition: 'Tomar decisões considerando o impacto profundo em stakeholders e na comunidade.',
    evaluation: 'Consegue articular valores? Faz as perguntas éticas difíceis?'
  },
  {
    id: 'agility',
    title: 'Agilidade & Adaptação',
    icon: Activity,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    definition: 'Capacidade de agir em contexto de incerteza e mudar de direção com rapidez.',
    evaluation: 'Consegue se adaptar e entregar quando o plano muda?'
  }
];

// --- DADOS: NÍVEL 2 (TRILHAS) ---
const TRACKS = [
  {
    id: 'etanol',
    title: 'Etanol & Bioenergia',
    icon: Zap,
    color: 'text-amber-600',
    context: 'Brasil exportador global; transição energética.',
    disciplines: ['Agronomia de Cana', 'Eng. Processos', 'Finanças Commodity', 'Legislação Renováveis'],
    problem: 'Como aumentar a competitividade em 10 anos mantendo viabilidade econômica e impacto ambiental positivo?'
  },
  {
    id: 'graos',
    title: 'Grãos & Proteínas',
    icon: Sprout,
    color: 'text-emerald-600',
    context: 'Maior volume de produção; volatilidade extrema.',
    disciplines: ['Genética', 'Logística', 'Trading', 'Regulação Exportação', 'Tech de Precisão'],
    problem: 'Como aumentar produtividade em 30% em 5 anos, reduzindo custos e impacto na biodiversidade?'
  },
  {
    id: 'coop',
    title: 'Cooperativismo & Familiar',
    icon: Users,
    color: 'text-blue-600',
    context: '80% dos produtores são pequenos/médios; exclusão tecnológica.',
    disciplines: ['Econ. Agrária', 'Sociologia', 'Tech Apropriada', 'Finanças Inclusivas'],
    problem: 'Como estruturar cooperativas que melhorem a renda em 40% mantendo a coesão social?'
  },
  {
    id: 'cafe',
    title: 'Cafés Especiais',
    icon: Coffee,
    color: 'text-rose-700',
    context: 'Oportunidade de subir valor (Commodity -> Specialty).',
    disciplines: ['Sensorial', 'Branding', 'Mkt Digital', 'Certificação', 'Supply Chain'],
    problem: 'Como transformar produtor de commodity em specialty, dobrando margens em 5 anos?'
  },
  {
    id: 'policy',
    title: 'Políticas & ESG',
    icon: Scale,
    color: 'text-slate-600',
    context: 'Redesenho do apoio ao agro; pressão global ESG.',
    disciplines: ['Economia Política', 'Direito Regulatório', 'Análise de Cenário', 'Comunicação Pública'],
    problem: 'Como desenhar políticas que incentivem a restauração de mata nativa mantendo a produção?'
  }
];

// --- DADOS: NÍVEL 3 (JORNADA) ---
const JOURNEY_STEPS = [
  {
    phase: 'Semestre 1',
    title: 'Propósito & Imersão',
    core: ['3 Seminários: História, Transição, Stakeholders'],
    extension: 'Visita a 3 usinas, conversa com executivos.',
    output: 'Statement de Propósito e Mapa de Stakeholders.'
  },
  {
    phase: 'Semestre 2-3',
    title: 'Diagnóstico & Análise',
    core: ['4 Módulos: Liderança, Sistêmico, Ética, Inovação'],
    extension: '8 semanas em usina como pesquisador residente.',
    output: 'Relatório de Diagnóstico com dados reais.'
  },
  {
    phase: 'Semestre 4',
    title: 'Cocriação & Inovação',
    core: ['2 Seminários: Implementação, Gestão de Mudança'],
    extension: 'Co-liderança de projeto piloto na usina.',
    output: 'Implementação de piloto, documentação de impacto.'
  }
];

// --- COMPONENTES VISUAIS ---

const CompetencyCard: React.FC<{ item: typeof CORE_COMPETENCIES[0] }> = ({ item }) => (
  <div className={`p-5 rounded-2xl border ${item.bg} ${item.border} hover:shadow-lg transition-all group`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg bg-white ${item.color} shadow-sm`}>
        <item.icon size={20} />
      </div>
      <h4 className={`font-black text-sm uppercase tracking-tight ${item.color}`}>{item.title}</h4>
    </div>
    <p className="text-xs text-slate-700 font-medium mb-3 leading-relaxed">
      {item.definition}
    </p>
    <div className="pt-3 border-t border-black/5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avaliação</p>
      <p className="text-xs text-slate-600 italic">"{item.evaluation}"</p>
    </div>
  </div>
);

const TrackCard = ({ track, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${
      isActive 
      ? 'bg-slate-900 border-slate-900 shadow-lg scale-[1.02]' 
      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }`}
  >
    <div className={`p-3 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
      <track.icon size={20} />
    </div>
    <div className="flex-1">
      <h4 className={`font-black text-sm uppercase tracking-wide ${isActive ? 'text-white' : 'text-slate-700'}`}>
        {track.title}
      </h4>
      <p className={`text-[10px] font-medium ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
        {isActive ? 'Visualizando Detalhes' : 'Clique para expandir'}
      </p>
    </div>
    {isActive && <ArrowRight size={16} className="text-emerald-400" />}
  </button>
);

const JourneyStep: React.FC<{ step: typeof JOURNEY_STEPS[0]; isLast: boolean }> = ({ step, isLast }) => (
  <div className="relative pl-8 pb-8 group">
    {!isLast && <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-slate-200 group-hover:bg-indigo-200 transition-colors"></div>}
    
    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 shadow-sm z-10"></div>
    
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-black text-slate-800">{step.title}</h4>
        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider">
          {step.phase}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><BookOpen size={10}/> Núcleo</p>
            <ul className="text-xs text-slate-700 space-y-1">
                {step.core.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
            <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 flex items-center gap-1"><Leaf size={10}/> Extensão (Prática)</p>
            <p className="text-xs text-emerald-900 font-medium">{step.extension}</p>
        </div>
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
            <p className="text-[10px] font-black text-amber-600 uppercase mb-1 flex items-center gap-1"><CheckCircle2 size={10}/> Resultado</p>
            <p className="text-xs text-amber-900 font-bold">{step.output}</p>
        </div>
      </div>
    </div>
  </div>
);

const ComparisonRow = ({ dim, trad, radial }: { dim: string, trad: string, radial: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors text-sm">
        <div className="p-4 font-bold text-slate-700 bg-slate-50/50">{dim}</div>
        <div className="p-4 text-slate-500 italic border-l border-slate-100 flex items-center gap-2">
            <XCircle size={14} className="text-red-300 shrink-0"/> {trad}
        </div>
        <div className="p-4 text-indigo-700 font-bold bg-indigo-50/30 border-l border-white flex items-center gap-2">
            <CheckCircle2 size={14} className="text-indigo-500 shrink-0"/> {radial}
        </div>
    </div>
);

// --- VIEW PRINCIPAL ---

const RadialStructureView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState('etanol');
  const [showMarina, setShowMarina] = useState(false); // STATE FOR TOGGLING MARINA VIEW
  const activeTrack = TRACKS.find(t => t.id === activeTrackId);

  // Renderiza a view da Marina se o estado for true
  if (showMarina) {
    return <MarinaJourneyView onBack={() => setShowMarina(false)} />;
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <LayoutGrid size={12} /> Arquitetura Pedagógica
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                Estrutura da Matriz Radial: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    Do Núcleo às Trilhas
                </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Se a universidade tradicional é um edifício com alas isoladas, a Matriz Radial é um <strong>Sistema Solar</strong>. Tudo expande a partir de um núcleo de competências em direção a trilhas temáticas vivas.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 space-y-20">
        
        {/* NÍVEL 1: NÚCLEO (COMPETÊNCIAS) */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-purple-600">
                    <Sun size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Nível 1: O Núcleo (Solar)</h2>
                    <p className="text-slate-500 text-sm font-medium">Competências transversais que todo aluno desenvolve, independente da trilha.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CORE_COMPETENCIES.map(comp => (
                    <CompetencyCard key={comp.id} item={comp} />
                ))}
            </div>
        </section>

        {/* NÍVEL 2: TRILHAS TEMÁTICAS */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Anchor size={200} />
            </div>

            <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-3 bg-slate-900 rounded-xl text-white">
                    <LayoutGrid size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Nível 2: Trilhas Temáticas</h2>
                    <p className="text-slate-500 text-sm font-medium">O aluno não escolhe disciplinas soltas. Ele escolhe uma <strong>Missão</strong>.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Menu Lateral */}
                <div className="lg:col-span-4 space-y-3">
                    {TRACKS.map(track => (
                        <TrackCard 
                            key={track.id} 
                            track={track} 
                            isActive={activeTrackId === track.id} 
                            onClick={() => setActiveTrackId(track.id)} 
                        />
                    ))}
                </div>

                {/* Detalhe da Trilha */}
                <div className="lg:col-span-8">
                    {activeTrack && (
                        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 h-full animate-fade-in">
                            <div className="flex items-center gap-3 mb-6">
                                <activeTrack.icon size={32} className={activeTrack.color} />
                                <h3 className="text-2xl font-black text-slate-800">{activeTrack.title}</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Problema Central (O Imã)</p>
                                    <p className="text-lg font-serif italic text-slate-700">"{activeTrack.problem}"</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contexto de Mercado</p>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{activeTrack.context}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Disciplinas Convergentes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {activeTrack.disciplines.map((d, i) => (
                                                <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* NÍVEL 3: PERCURSOS (JORNADA) */}
        <section>
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                    <Clock size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Nível 3: O Percurso Individualizado</h2>
                    <p className="text-slate-500 text-sm font-medium">Exemplo de Jornada na Trilha de <strong>Etanol</strong>.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                {JOURNEY_STEPS.map((step, idx) => (
                    <JourneyStep key={idx} step={step} isLast={idx === JOURNEY_STEPS.length - 1} />
                ))}
            </div>
        </section>

        {/* SÍNTESE: DESIGN THINKING */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden mb-12">
            <div className="bg-slate-900 p-10 text-white text-center">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4">O "Design Thinking" da Matriz</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                    A Matriz Radial não é uma grade curricular. É um sistema operacional. Veja a diferença estrutural.
                </p>
            </div>
            
            <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-50 p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <div>Dimensão</div>
                    <div>Currículo Tradicional</div>
                    <div className="text-indigo-600">Matriz Radial (Ânima)</div>
                </div>

                <ComparisonRow 
                    dim="Eixo Central" 
                    trad="Disciplinas Isoladas" 
                    radial="Competências + Trilhas"
                />
                <ComparisonRow 
                    dim="Sequência" 
                    trad="Linear (A → B → C)" 
                    radial="Espiral (Núcleo + Ciclos)"
                />
                <ComparisonRow 
                    dim="Integração" 
                    trad="Baixa (Departamentos)" 
                    radial="Alta (Trilhas Temáticas)"
                />
                <ComparisonRow 
                    dim="Orientação" 
                    trad="Conteúdo Teórico" 
                    radial="Competência + Impacto"
                />
                <ComparisonRow 
                    dim="Avaliação" 
                    trad="Prova Escrita" 
                    radial="Projeto Real Entregue"
                />
            </div>
        </section>

        {/* FECHAMENTO COM CTA PARA MARINA JOURNEY */}
        <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                "A Matriz Radial é uma MÁQUINA pedagógica. Não é aleatória. É um sistema integrado onde cada parte serve a um propósito claro: transformar o aluno em um agente de solução."
            </p>
            
            <button 
                onClick={() => setShowMarina(true)}
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl hover:bg-emerald-600 transition-colors cursor-pointer"
            >
                Ver Jornada Real: Caso Marina (18 Meses) <ArrowRight size={14} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default RadialStructureView;
