
import React from 'react';
import { 
  Zap, Users, Microscope, RefreshCw, TrendingUp, 
  XCircle, CheckCircle2, ArrowRight, Building2, 
  Lightbulb, Target, GraduationCap, Rocket
} from 'lucide-react';

const CYCLE_STEPS = [
  {
    id: 1,
    title: "Imersão Territorializada",
    subtitle: "O Choque de Realidade",
    icon: Building2,
    color: "bg-blue-600",
    text: "O aluno não começa na sala de aula; começa no chão de fábrica. Imagine um aluno de MBA em Bioenergia. Na Semana 1, ele não abre um livro; ele visita uma unidade da <strong>Raízen</strong>. Ele sente o cheiro da vinhaça, vê o gargalo da moenda e conversa com o engenheiro que está perdendo o sono por causa da eficiência da caldeira.",
    example: "Exemplo Real: Visita técnica focada em gargalos de Etanol 2G."
  },
  {
    id: 2,
    title: "Mentoria & Cocriação",
    subtitle: "O Fim do Professor Solitário",
    icon: Users,
    color: "bg-indigo-600",
    text: "O aluno é pareado com um 'Practitioner' (ex: um gestor de cooperativa). A tarefa não é 'estudar a teoria', é <strong>resolver um problema real</strong>. O professor acadêmico entra como suporte metodológico, mas o 'cliente' do projeto é o mentor do mercado.",
    example: "Desafio: 'Como aumentar a produtividade de fornecedores de cana de pequeno porte em 15%?'"
  },
  {
    id: 3,
    title: "Pesquisa-Ação",
    subtitle: "Inteligência Aplicada",
    icon: Microscope,
    color: "bg-purple-600",
    text: "Aqui nasce o valor. O aluno, o mentor e o professor trabalham para criar uma solução. Não é um TCC para pegar poeira na biblioteca; é um <strong>Policy Brief</strong>, um protótipo de software ou um novo processo de manejo.",
    example: "Output: Um plano de manejo integrado validado por dados da safra atual."
  },
  {
    id: 4,
    title: "Ciclo de Feedback",
    subtitle: "A Prova de Fogo",
    icon: RefreshCw,
    color: "bg-rose-600",
    text: "O resultado volta para a empresa. Um seminário onde a banca não são acadêmicos, são os diretores da empresa parceira. Eles criticam, validam e, frequentemente, perguntam: <em>'Quanto custa para implementar isso amanhã?'</em>.",
    example: "Resultado: A Raízen convida o grupo para pilotar a solução em uma unidade menor."
  },
  {
    id: 5,
    title: "Impacto Mensurável",
    subtitle: "O Legado",
    icon: TrendingUp,
    color: "bg-emerald-600",
    text: "O ciclo fecha com transformação. O aluno sai empregado ou promovido. A empresa melhora seu EBITDA. A região ganha competitividade. O Campus documenta o caso: <em>'200 produtores beneficiados'</em>.",
    example: "KPI: Redução de 5% no custo de insumos da cooperativa parceira."
  }
];

const ComparisonCard = ({ title, icon: Icon, items, type }: any) => (
  <div className={`flex-1 p-8 rounded-[2.5rem] border ${type === 'old' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800 text-white shadow-2xl relative overflow-hidden'}`}>
    {type === 'new' && (
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Zap size={200} />
        </div>
    )}
    
    <div className="flex items-center gap-4 mb-8 relative z-10">
      <div className={`p-4 rounded-2xl ${type === 'old' ? 'bg-slate-200 text-slate-500' : 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30'}`}>
        <Icon size={32} />
      </div>
      <div>
        <h3 className={`text-xl font-black uppercase tracking-tight ${type === 'old' ? 'text-slate-500' : 'text-white'}`}>{title}</h3>
        <p className={`text-xs font-bold uppercase tracking-widest ${type === 'old' ? 'text-slate-400' : 'text-emerald-400'}`}>
            {type === 'old' ? 'O Passado (Commodity)' : 'O Futuro (Ânima Agro)'}
        </p>
      </div>
    </div>

    <ul className="space-y-6 relative z-10">
      {items.map((item: string, idx: number) => (
        <li key={idx} className="flex items-start gap-4">
          {type === 'old' ? (
            <XCircle size={20} className="text-slate-300 mt-1 shrink-0" />
          ) : (
            <CheckCircle2 size={20} className="text-emerald-400 mt-1 shrink-0" />
          )}
          <span className={`text-sm font-medium leading-relaxed ${type === 'old' ? 'text-slate-500' : 'text-slate-200'}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const GoianiaCampusImpactNarrative: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans animate-fade-in pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-white pt-20 pb-24 px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Target size={12} /> Manifesto Pedagógico
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-8">
                O Campus não é um prédio.<br/>
                É um <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Catalisador</span>.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
                Esqueça as salas de aula enfileiradas. Em um território vocacionado, a universidade 
                funciona como um <strong>acelerador de partículas</strong>: colidindo alunos com problemas reais para gerar energia nova.
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        
        {/* 1. O CICLO DE ATIVAÇÃO */}
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl p-8 md:p-12 mb-20">
            <h2 className="text-2xl font-black text-slate-800 mb-12 flex items-center gap-3">
                <RefreshCw size={24} className="text-blue-600"/> O Ciclo de Ativação (5 Etapas)
            </h2>

            <div className="relative">
                {/* Linha Vertical Conectora */}
                <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 hidden md:block"></div>

                <div className="space-y-12">
                    {CYCLE_STEPS.map((step) => (
                        <div key={step.id} className="relative flex flex-col md:flex-row gap-8 group">
                            
                            {/* Icon Marker */}
                            <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white transition-transform group-hover:scale-110 ${step.color}`}>
                                <step.icon size={24} />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                                    {step.id}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-slate-50 rounded-3xl p-6 border border-slate-100 group-hover:border-slate-300 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{step.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{step.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-sm mb-4" dangerouslySetInnerHTML={{ __html: step.text }}></p>
                                
                                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3">
                                    <Lightbulb size={16} className="text-amber-500 mt-0.5 shrink-0"/>
                                    <p className="text-xs font-medium text-slate-700 italic">
                                        {step.example}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* 2. O CONTRASTE (OLD VS NEW) */}
        <div className="mb-20">
            <h2 className="text-center text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight">
                A Evolução da Espécie
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
                <ComparisonCard 
                    type="old"
                    title="Campus Tradicional"
                    icon={GraduationCap}
                    items={[
                        "Aluno passivo em sala de aula (ouvindo).",
                        "Professor acadêmico falando sobre agro (teoria).",
                        "Prova escrita bimestral para testar memória.",
                        "Gap de 6 meses a 1 ano após formatura até gerar valor real.",
                        "Diploma como fim."
                    ]}
                />
                
                <div className="hidden md:flex items-center justify-center">
                    <div className="p-4 bg-white rounded-full shadow-lg border border-slate-100 z-20">
                        <ArrowRight size={24} className="text-slate-400" />
                    </div>
                </div>

                <ComparisonCard 
                    type="new"
                    title="Campus Vocacionado"
                    icon={Rocket}
                    items={[
                        "Aluno ativo na usina e na fazenda (fazendo).",
                        "Practitioner + Professor co-ensinando (práxis).",
                        "Projeto real resolvendo dor da empresa parceira.",
                        "Aluno sai PRONTO: já conhece a indústria, já tem rede.",
                        "Impacto como fim."
                    ]}
                />
            </div>
        </div>

        {/* 3. REFLEXÃO FINAL */}
        <div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                    "Qual desses dois modelos produz os líderes que o Agro de 2030 precisa?"
                </h2>
                <p className="text-lg text-slate-300 mb-10 font-medium">
                    A resposta define não apenas o sucesso do campus, mas o futuro da produtividade nacional.
                </p>
                <div className="inline-flex items-center gap-3 text-emerald-400 font-bold uppercase text-xs tracking-[0.2em] border border-emerald-500/30 px-8 py-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 transition-all cursor-pointer">
                    Avançar para o Módulo 2 <ArrowRight size={14} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default GoianiaCampusImpactNarrative;
