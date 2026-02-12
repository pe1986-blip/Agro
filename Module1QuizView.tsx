
import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, ArrowRight, 
  BrainCircuit, MessageSquare, Lightbulb, GraduationCap 
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "De acordo com a teoria de Milton Santos aplicada ao nosso projeto, um território se define por 3 pilares fundamentais. Qual das opções abaixo NÃO é um deles?",
    options: [
      { id: 'a', text: "O Abrigo (proteção, cultura, vida social)" },
      { id: 'b', text: "O Recurso (terra, capital, trabalho)" },
      { id: 'c', text: "O Projeto (decisão política, visão de futuro)" },
      { id: 'd', text: "O Patrimônio (museus, história passada)" }
    ],
    correctId: 'd',
    explanation: "Correto! Embora a história seja importante, na tríade funcional de Milton Santos (Abrigo, Recurso, Projeto), o foco é na dinâmica ativa. 'Patrimônio' é uma consequência, não um motor de transformação territorial."
  },
  {
    id: 2,
    question: "Qual das seguintes definições melhor descreve Goiás como um 'território vocacionado' para a Ânima?",
    options: [
      { id: 'a', text: "Um estado que possui muita terra disponível para agricultura extensiva." },
      { id: 'b', text: "Um ecossistema integrado onde cadeias produtivas, inovação e governança já operam em sintonia." },
      { id: 'c', text: "Uma região com clima tropical favorável para duas safras anuais." },
      { id: 'd', text: "Um mercado consumidor com alta demanda por alimentos básicos." }
    ],
    correctId: 'b',
    explanation: "Exato. Terra e clima são apenas 'espaço geográfico'. O que torna Goiás um 'Território Vocacionado' é a densidade de relações: cooperativas fortes, tecnologia aplicada e uma cultura já voltada para o agronegócio."
  },
  {
    id: 3,
    question: "Na prática, como um 'campus vocacionado' ativa esse território?",
    options: [
      { id: 'a', text: "Trazendo mais alunos de fora para aumentar a população da cidade." },
      { id: 'b', text: "Conectando o aprendizado diretamente com os problemas reais das empresas e comunidades locais." },
      { id: 'c', text: "Construindo prédios modernos com laboratórios que imitam os da Europa." },
      { id: 'd', text: "Focando exclusivamente na publicação de artigos científicos teóricos." }
    ],
    correctId: 'b',
    explanation: "Perfeito. O campus funciona como um 'nó' na rede. Ele só ativa o território se o aluno estiver resolvendo dores reais (da usina, da fazenda, da cooperativa) durante o curso, e não apenas estudando teoria."
  }
];

const Module1QuizView: React.FC = () => {
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
    // Aqui poderia enviar para um backend
    setReflectionSent(true);
  };

  // --- TELA FINAL: REFLEXÃO ---
  if (isQuizFinished) {
    return (
      <div className="bg-slate-50 min-h-screen p-8 animate-fade-in flex justify-center">
        <div className="max-w-3xl w-full space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center">
            <div className="inline-flex p-4 bg-emerald-100 text-emerald-600 rounded-full mb-6">
              <BrainCircuit size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Consolidação de Aprendizado</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Você dominou os conceitos técnicos. Agora, vamos trazer isso para a <strong>sua realidade</strong>.
            </p>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <MessageSquare size={200} />
            </div>
            
            {!reflectionSent ? (
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Lightbulb className="text-yellow-400" /> Pergunta Reflexiva
                </h3>
                
                <p className="text-lg text-slate-200 mb-8 leading-relaxed font-serif italic">
                  "Você trabalha ou conhece alguém que trabalha na agropecuária ou agroindústria em Goiás (ou região MATOPIBA). 
                  <br/><br/>
                  Como um campus vocacionado — que traz a universidade <strong>PARA O TERRITÓRIO</strong> — seria diferente do que você vê agora na educação agrícola tradicional?"
                </p>

                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6 h-32 text-sm"
                  placeholder="Escreva sua reflexão aqui..."
                />

                <button 
                  onClick={handleReflectionSubmit}
                  disabled={!reflectionText.trim()}
                  className="bg-emerald-500 text-slate-900 font-black px-8 py-3 rounded-xl hover:bg-emerald-400 transition-all uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Registrar Reflexão <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="relative z-10 text-center py-10 animate-fade-in">
                <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-2">Reflexão Registrada</h3>
                <p className="text-slate-400 mb-8">Sua visão ajuda a construir a inteligência coletiva do projeto.</p>
                <div className="inline-block bg-white/10 px-6 py-3 rounded-lg border border-white/10 text-sm font-medium">
                  Módulo 1 Concluído com Sucesso
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
    <div className="bg-slate-50 min-h-screen p-6 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-2xl w-full">
        
        {/* Header Progress */}
        <div className="flex justify-between items-center mb-8 px-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Check de Conhecimento
          </span>
          <div className="flex gap-2">
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all ${idx === currentStep ? 'bg-blue-600 scale-125' : (idx < currentStep ? 'bg-emerald-400' : 'bg-slate-200')}`}
              ></div>
            ))}
            <div className="w-2 h-2 rounded-full bg-slate-200 border border-slate-300"></div> {/* Step final (reflexão) */}
          </div>
        </div>

        {/* Question Card */}
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

export default Module1QuizView;
