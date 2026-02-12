
import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, ArrowRight, 
  BrainCircuit, MessageSquare, Lightbulb, GraduationCap, 
  BookOpenCheck, Layers, RefreshCw
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "De acordo com Bernstein, o que é 'recontextualização' de conhecimento?",
    options: [
      { id: 'a', text: "Memorizar informações complexas para provas padronizadas." },
      { id: 'b', text: "Traduzir o conhecimento de um campo (ex: ciência) para outro (ex: educação) ganhando relevância prática." },
      { id: 'c', text: "Simplificar conceitos difíceis ('dumbing down') para que qualquer aluno entenda." },
      { id: 'd', text: "Usar exemplos aleatórios para ilustrar uma teoria abstrata." }
    ],
    correctId: 'b',
    explanation: "Exato! Recontextualização NÃO é simplificação. É uma tradução que muda a natureza do conhecimento: ele deixa de ser puramente 'científico' (universal) para se tornar 'pedagógico' (encarnado e relevante para aquele contexto)."
  },
  {
    id: 2,
    question: "Nos 3 Ciclos de Extensão do campus agro, como eles se alinham aos pilares de Bernstein?",
    options: [
      { id: 'a', text: "Propósito = Produção | Diagnóstico = Recontextualização | Cocriação = Avaliação" },
      { id: 'b', text: "Propósito = Avaliação | Diagnóstico = Produção | Cocriação = Recontextualização" },
      { id: 'c', text: "Propósito = Recontextualização | Diagnóstico = Avaliação | Cocriação = Produção" },
      { id: 'd', text: "Não há correspondência clara; são metodologias opostas." }
    ],
    correctId: 'a',
    explanation: "Perfeito. Ciclo 1 (Propósito) produz o sentido e o 'porquê' (Produção). Ciclo 2 (Diagnóstico) traduz a realidade em dados e aprendizado (Recontextualização). Ciclo 3 (Cocriação) aplica e testa o impacto (Avaliação)."
  },
  {
    id: 3,
    question: "A Matriz Radial usa 'Classificação Fraca' e 'Enquadramento Moderado'. O que isso significa na prática?",
    options: [
      { id: 'a', text: "Disciplinas não têm rigor e o aluno faz o que quer sem orientação." },
      { id: 'b', text: "Integração disciplinar em torno de problemas reais; aluno lidera com suporte estruturado." },
      { id: 'c', text: "Não há estrutura curricular; tudo é caótico e orgânico." },
      { id: 'd', text: "O professor tem controle total do conteúdo, mas as disciplinas conversam entre si." }
    ],
    correctId: 'b',
    explanation: "Correto. Classificação Fraca = Integração (quebrar silos). Enquadramento Moderado = Agência do aluno (ele pilota, mas o professor dá o mapa e o suporte)."
  }
];

const Module4QuizView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0-2: Quiz, 3: Reflection
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Reflection States
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflectionSent, setReflectionSent] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const isQuizFinished = currentStep >= QUESTIONS.length;

  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOption(id);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentStep(prev => prev + 1);
  };

  const handleReflectionSubmit = () => {
    if (!reflection1.trim() || !reflection2.trim()) return;
    setReflectionSent(true);
  };

  // --- TELA FINAL: REFLEXÃO & IDENTIDADE ---
  if (isQuizFinished) {
    return (
      <div className="bg-slate-50 min-h-screen p-8 animate-fade-in flex justify-center pb-20">
        <div className="max-w-4xl w-full space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center">
            <div className="inline-flex p-4 bg-indigo-100 text-indigo-600 rounded-full mb-6">
              <Layers size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Consolidação do Dispositivo</h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Você dominou a teoria de Bernstein e a estrutura da Matriz Radial. 
              Agora, conecte essa engenharia pedagógica à sua experiência real.
            </p>
          </div>

          {!reflectionSent ? (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-lg space-y-12">
              
              {/* Pergunta 1: Recontextualização Pessoal */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <RefreshCw size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">1. Sua Experiência de Recontextualização</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed font-medium">
                  Pense em uma experiência marcante de aprendizado (na universidade ou trabalho). 
                  O conhecimento foi <strong>traduzido</strong> para fazer sentido no seu contexto, ou foi apenas transmitido de forma abstrata?
                </p>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm resize-none"
                  placeholder="Ex: Na faculdade, aprendi cálculo puro e não via sentido. Só fui entender a aplicação quando precisei dimensionar uma bomba hidráulica na fazenda..."
                />
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* Pergunta 2: Ciclos de Aprendizagem */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">2. Acompanhamento do Aprendizado</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed font-medium">
                  Imagine que você lidera um projeto agro hoje. Qual dos 3 ciclos seria mais vital para você neste momento e por quê?
                  <br/>
                  <span className="text-xs text-slate-500 block mt-2 ml-4">
                  • Ciclo 1: Propósito & Impacto (Entender o porquê)<br/>
                  • Ciclo 2: Diagnóstico Imersivo (Ler a realidade)<br/>
                  • Ciclo 3: Cocriação de Solução (Resolver junto)
                  </span>
                </p>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32 text-sm resize-none"
                  placeholder="Ex: Para mim, o Ciclo 2 é crucial. Muitas vezes tentamos resolver problemas (Ciclo 3) sem ter feito um diagnóstico profundo da realidade..."
                />
              </div>

              <button 
                onClick={handleReflectionSubmit}
                disabled={!reflection1.trim() || !reflection2.trim()}
                className="w-full bg-slate-900 text-white font-black px-8 py-4 rounded-xl hover:bg-slate-800 transition-all uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                Registrar Minha Jornada <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl animate-fade-in">
              <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <GraduationCap size={200} />
              </div>
              <div className="relative z-10">
                <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Ciclo Completo</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Você conectou a teoria de Bernstein à prática da Matriz Radial e à sua própria vivência.
                    <br/>
                    Agora você enxerga a educação não como transmissão, mas como <strong>engenharia de transformação</strong>.
                </p>
                <div className="inline-block bg-white/10 px-8 py-3 rounded-xl border border-white/10 text-sm font-bold uppercase tracking-widest text-emerald-400">
                  Módulo 04 Finalizado
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- TELA DE QUIZ ---
  const isCorrect = selectedOption === currentQuestion.correctId;

  return (
    <div className="bg-slate-50 min-h-screen p-6 flex flex-col items-center justify-center animate-fade-in pb-20">
      <div className="max-w-2xl w-full">
        
        {/* Header Progress */}
        <div className="flex justify-between items-center mb-8 px-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Check de Conhecimento • Dispositivo Pedagógico
          </span>
          <div className="flex gap-2">
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all ${idx === currentStep ? 'bg-indigo-600 scale-125' : (idx < currentStep ? 'bg-emerald-400' : 'bg-slate-200')}`}
              ></div>
            ))}
            <div className="w-2 h-2 rounded-full bg-slate-200 border border-slate-300"></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                let stateClass = "border-slate-100 hover:border-indigo-200 hover:bg-slate-50";
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

          {/* Feedback Section */}
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
                    {isQuizFinished ? 'Ir para Reflexão' : 'Próxima Questão'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {!isAnswered && (
             <div className="h-2 bg-slate-100 w-full mt-4">
               <div className="h-full bg-slate-200 w-1/3 rounded-r-full"></div>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Module4QuizView;
