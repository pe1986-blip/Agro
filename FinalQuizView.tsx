
import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, ArrowRight, HelpCircle, 
  Target, Lightbulb, BrainCircuit, Rocket, Coffee, 
  Layout, ShieldCheck 
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Quando falamos em 'campus vocacionado do agro', estamos falando principalmente de:",
    options: [
      { id: 'a', text: "Um prédio moderno com muitos laboratórios de agronomia." },
      { id: 'b', text: "Um currículo acadêmico com algumas matérias optativas de agro." },
      { id: 'c', text: "Um arranjo que reorganiza universidade, empresas e território em torno de cadeias produtivas específicas." },
      { id: 'd', text: "Uma plataforma de cursos EAD para produtores rurais." }
    ],
    correctId: 'c',
    explanation: "Exato. Não é sobre o prédio ou a grade curricular isolada. É sobre a integração sistêmica onde o ensino acontece dentro da lógica da cadeia produtiva (etanol, grãos, proteína, etc.)."
  },
  {
    id: 2,
    question: "Na proposta Ânima Agro, 'território' significa:",
    options: [
      { id: 'a', text: "Apenas o mapa geográfico do estado de Goiás." },
      { id: 'b', text: "Somente a área física da fazenda ou usina." },
      { id: 'c', text: "O conjunto de espaços geográficos, produtivos e políticos onde as cadeias acontecem." },
      { id: 'd', text: "Uma metáfora poética sem consequências práticas." }
    ],
    correctId: 'c',
    explanation: "Perfeito. O território é vivo. Ele inclui o solo (recurso), a cultura local (abrigo) e as decisões de poder (projeto). É onde a vida e a economia se entrelaçam."
  },
  {
    id: 3,
    question: "A principal diferença deste modelo para um MBA tradicional é:",
    options: [
      { id: 'a', text: "A duração do curso ser mais curta." },
      { id: 'b', text: "A quantidade de livros teóricos lidos." },
      { id: 'c', text: "O aprendizado baseado na resolução de problemas reais de empresas parceiras, com impacto medido." },
      { id: 'd', text: "A cor das paredes das salas de aula." }
    ],
    correctId: 'c',
    explanation: "Correto. A chave é a 'Recontextualização'. O aluno não aprende para fazer uma prova; ele aprende resolvendo uma dor real de uma empresa-âncora ou cooperativa, gerando valor imediato."
  }
];

const POSITIONING_OPTIONS = [
  {
    id: 'observer',
    icon: Coffee,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    title: "Observar & Conhecer",
    text: "Quero continuar observando, entendendo melhor, sem compromisso por enquanto.",
    feedback: "Ótimo. O ecossistema é vasto. Recomendamos que você acompanhe nossos 'Policy Briefs' e participe dos eventos abertos para madurar a ideia."
  },
  {
    id: 'prototyper',
    icon: Lightbulb,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    title: "Prototipar Junto",
    text: "Quero testar algo pequeno (1 bootcamp, 1 projeto-piloto, 1 turma in-company).",
    feedback: "Excelente escolha. O 'Nível 2' é a melhor forma de validar a aderência sem grandes riscos. Vamos desenhar esse piloto."
  },
  {
    id: 'builder',
    icon: Rocket,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: "Co-Construir Agora",
    text: "Quero co-construir; preciso falar de parceria estratégica nos próximos 30 dias.",
    feedback: "Bem-vindo ao 'Nível 3'. Você entendeu a urgência e o potencial. Sua jornada de transformação do setor começa agora."
  },
  {
    id: 'thinker',
    icon: BrainCircuit,
    color: 'bg-slate-50 text-slate-700 border-slate-200',
    title: "Refletir com Calma",
    text: "Ainda não sei; preciso pensar com calma sobre onde me encaixo.",
    feedback: "Sem pressa. A mudança de paradigma é grande. Revise o 'Dispositivo Pedagógico' e a 'Estratégia de Hub' quando sentir necessidade."
  }
];

const FinalQuizView: React.FC = () => {
  const [step, setStep] = useState(0); // 0-2: Questions, 3: Positioning, 4: Final
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finalChoice, setFinalChoice] = useState<typeof POSITIONING_OPTIONS[0] | null>(null);

  const currentQuestion = QUESTIONS[step];
  const isQuizPhase = step < QUESTIONS.length;
  const isPositioningPhase = step === QUESTIONS.length;

  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOption(id);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setStep(prev => prev + 1);
  };

  const handlePositioningSelect = (option: typeof POSITIONING_OPTIONS[0]) => {
    setFinalChoice(option);
    setStep(prev => prev + 1);
  };

  // --- TELA FINAL: MENSAGEM DE ENCERRAMENTO ---
  if (finalChoice) {
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-8 animate-fade-in relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-2xl bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <div className="inline-flex p-4 bg-emerald-500 rounded-full text-slate-900 mb-6 shadow-lg shadow-emerald-500/30">
             <finalChoice.icon size={48} />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
            Posição Registrada: <span className="text-emerald-400">{finalChoice.title}</span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-8 font-medium">
            "{finalChoice.feedback}"
          </p>

          <div className="w-full h-px bg-white/10 mb-8"></div>

          <p className="text-sm text-slate-400 mb-8">
            Você completou o ciclo de onboarding estratégico da Ânima Agro. <br/>
            O mapa está traçado. A decisão é sua.
          </p>

          <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-xl">
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  // --- TELA DE QUIZ ---
  if (isQuizPhase) {
    const isCorrect = selectedOption === currentQuestion.correctId;

    return (
      <div className="bg-slate-50 min-h-screen p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="max-w-2xl w-full">
          
          <div className="flex justify-between items-center mb-8 px-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14}/> Check de Compreensão
            </span>
            <div className="flex gap-2">
              {QUESTIONS.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === step ? 'bg-blue-600 scale-125' : (idx < step ? 'bg-emerald-400' : 'bg-slate-200')}`}></div>
              ))}
              <div className="w-2 h-2 rounded-full bg-slate-200 border border-slate-300"></div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
            <div className="p-8 pb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  let stateClass = "border-slate-100 hover:border-blue-200 hover:bg-slate-50";
                  let icon = null;

                  if (isAnswered) {
                    if (opt.id === currentQuestion.correctId) {
                      stateClass = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500";
                      icon = <CheckCircle2 size={18} className="text-emerald-600" />;
                    } else if (opt.id === selectedOption) {
                      stateClass = "border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500";
                      icon = <XCircle size={18} className="text-rose-600" />;
                    } else {
                      stateClass = "border-slate-100 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center group ${stateClass}`}
                    >
                      <span className="text-sm font-medium">{opt.text}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>
            </div>

            {isAnswered && (
              <div className={`p-8 border-t animate-fade-in ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex gap-4">
                  <div className={`mt-1 ${isCorrect ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {isCorrect ? <CheckCircle2 size={24} /> : <Lightbulb size={24} />}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${isCorrect ? 'text-emerald-800' : 'text-slate-800'}`}>
                      {isCorrect ? "Correto!" : "Não exatamente..."}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {currentQuestion.explanation}
                    </p>
                    <button 
                      onClick={handleNext}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      Próxima <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!isAnswered && <div className="h-2 bg-slate-100 w-full mt-4"><div className="h-full bg-slate-200 w-1/3 rounded-r-full"></div></div>}
          </div>
        </div>
      </div>
    );
  }

  // --- TELA DE AUTO-POSICIONAMENTO ---
  return (
    <div className="bg-[#f8fafc] min-h-screen p-8 animate-fade-in flex justify-center pb-20">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Target size={12} /> Decisão Final
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                Como você sai desta jornada?
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Depois de conhecer o território, as tribos e o dispositivo pedagógico, qual frase melhor representa seu momento atual?
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSITIONING_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handlePositioningSelect(option)}
                    className={`text-left p-8 rounded-[2rem] border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group ${option.color} bg-opacity-10 border-opacity-50 hover:border-opacity-100 bg-white`}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${option.color.replace('border-', '').replace('text-', 'bg-').replace('200', '100')} text-opacity-100`}>
                            <option.icon size={32} />
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors group-hover:bg-current ${option.color.replace('bg-', 'border-').replace('text-', 'text-')}`}>
                            <ArrowRight size={16} className="text-current opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity" />
                        </div>
                    </div>
                    <h3 className="text-xl font-black mb-2 opacity-90">{option.title}</h3>
                    <p className="text-sm font-medium opacity-70 leading-relaxed">
                        "{option.text}"
                    </p>
                </button>
            ))}
        </div>

      </div>
    </div>
  );
};

export default FinalQuizView;
