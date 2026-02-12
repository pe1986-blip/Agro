
import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, ArrowRight, 
  BrainCircuit, MessageSquare, Lightbulb, GraduationCap, 
  BookOpenCheck
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Qual é o principal problema da universidade tradicional, segundo a crítica de Boaventura de Sousa Santos?",
    options: [
      { id: 'a', text: "Falta de recursos financeiros e laboratórios modernos." },
      { id: 'b', text: "Prédios antigos e infraestrutura inadequada." },
      { id: 'c', text: "Fragmentação entre disciplinas e desconexão com o mundo real (Monocultura do Saber)." },
      { id: 'd', text: "Professores mal preparados academicamente." }
    ],
    correctId: 'c',
    explanation: "Exato! O problema central não é técnico, é epistemológico. A universidade tradicional opera em 'silos' (departamentos isolados) e valida apenas o conhecimento científico, ignorando a complexidade dos problemas reais e outros tipos de saberes."
  },
  {
    id: 2,
    question: "O que define o conceito de 'Ecologia de Saberes'?",
    options: [
      { id: 'a', text: "O estudo biológico de ecossistemas naturais dentro do campus." },
      { id: 'b', text: "O reconhecimento de que múltiplos tipos de conhecimento (científico, tradicional, prático) são válidos e devem dialogar." },
      { id: 'c', text: "Um programa de educação ambiental focado apenas em agricultores familiares." },
      { id: 'd', text: "O estudo de plantas companheiras que vivem juntas na lavoura." }
    ],
    correctId: 'b',
    explanation: "Correto. A Ecologia de Saberes propõe uma 'democracia cognitiva'. O saber do cientista (rigor) é importante, mas o saber do produtor (prática) e o saber indígena (ancestralidade) também são vitais para resolver problemas complexos."
  },
  {
    id: 3,
    question: "Como a Ânima Agro se diferencia de uma 'Faculdade de Agronomia' tradicional com base nesses conceitos?",
    options: [
      { id: 'a', text: "Possui mais laboratórios de última geração que as concorrentes." },
      { id: 'b', text: "Integra disciplinas em problemas reais, traz empresas-âncora como co-educadoras e foca na emancipação do sujeito." },
      { id: 'c', text: "É mais exclusiva e possui mensalidades mais altas." },
      { id: 'd', text: "Tem um número maior de alunos em sala de aula." }
    ],
    correctId: 'b',
    explanation: "Perfeito. A Ânima Agro materializa a 'Universidade Nova' ao quebrar os muros da sala de aula. O 'professor' não é o único detentor do saber; a empresa parceira ensina, o problema real ensina, e o aluno aprende a conectar pontos (visão sistêmica) para transformar a realidade."
  }
];

const Module2QuizView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0-2: Quiz, 3: Reflection
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
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
    if (!reflectionText.trim()) return;
    setReflectionSent(true);
  };

  // --- TELA FINAL: REFLEXÃO ---
  if (isQuizFinished) {
    return (
      <div className="bg-slate-50 min-h-screen p-8 animate-fade-in flex justify-center pb-20">
        <div className="max-w-3xl w-full space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center">
            <div className="inline-flex p-4 bg-purple-100 text-purple-600 rounded-full mb-6">
              <BrainCircuit size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Módulo 02 Consolidado</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Você entendeu a teoria da Universidade Nova. Agora, vamos conectar isso com a <strong>sua vivência</strong>.
            </p>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <MessageSquare size={200} />
            </div>
            
            {!reflectionSent ? (
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Lightbulb className="text-yellow-400" /> Reflexão Pessoal
                </h3>
                
                <p className="text-lg text-slate-200 mb-8 leading-relaxed font-serif italic">
                  "Você já cursou ou conhece alguém que cursou educação superior (em agro ou qualquer área).
                  <br/><br/>
                  Como seria <strong>DIFERENTE</strong> sua experiência se aquela universidade tivesse funcionado como uma <strong>'Ecologia de Saberes'</strong> (professor + aluno + praticioner aprendendo juntos) ao invés de apenas transmissão de conteúdo?
                  <br/><br/>
                  Pense em 2-3 mudanças concretas."
                </p>

                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 h-40 text-sm"
                  placeholder="Ex: Eu teria aprendido a resolver problemas reais mais cedo; Teria feito networking com o mercado durante o curso..."
                />

                <button 
                  onClick={handleReflectionSubmit}
                  disabled={!reflectionText.trim()}
                  className="bg-purple-600 text-white font-black px-8 py-3 rounded-xl hover:bg-purple-500 transition-all uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Registrar Visão <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="relative z-10 text-center py-10 animate-fade-in">
                <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-2">Visão Registrada</h3>
                <p className="text-slate-400 mb-8">Essa mudança de mentalidade é o primeiro passo para construir a Universidade Nova.</p>
                <div className="inline-block bg-white/10 px-6 py-3 rounded-lg border border-white/10 text-sm font-medium">
                  Módulo 02 Finalizado com Sucesso
                </div>
              </div>
            )}
          </div>
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
            Check de Conhecimento • Módulo 02
          </span>
          <div className="flex gap-2">
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all ${idx === currentStep ? 'bg-purple-600 scale-125' : (idx < currentStep ? 'bg-emerald-400' : 'bg-slate-200')}`}
              ></div>
            ))}
            <div className="w-2 h-2 rounded-full bg-slate-200 border border-slate-300"></div> {/* Step final (reflexão) */}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                let stateClass = "border-slate-100 hover:border-purple-200 hover:bg-slate-50";
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

          {/* Feedback Section (Slide down) */}
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

export default Module2QuizView;
