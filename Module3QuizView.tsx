
import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, ArrowRight, 
  BrainCircuit, MessageSquare, Lightbulb, GraduationCap, 
  Compass, Feather
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Segundo Becher & Trowler, o que define as 'tribos acadêmicas'?",
    options: [
      { id: 'a', text: "Grupos de alunos que se sentam juntos na sala de aula." },
      { id: 'b', text: "Grupos de pesquisadores que compartilham uma disciplina, valores, linguagem e critérios de 'bom conhecimento'." },
      { id: 'c', text: "Comunidades locais que vivem no entorno da universidade." },
      { id: 'd', text: "Grupos de estudo informais formados no diretório acadêmico." }
    ],
    correctId: 'b',
    explanation: "Exato! Uma 'tribo' não é apenas um grupo de pessoas; é uma cultura. Agrônomos e Advogados têm 'ídolos' diferentes, jargões diferentes e formas distintas de ver o mundo."
  },
  {
    id: 2,
    question: "Um 'território disciplinar' é melhor descrito como:",
    options: [
      { id: 'a', text: "A fazenda experimental onde os alunos fazem estágio." },
      { id: 'b', text: "A cidade geográfica onde a universidade está localizada." },
      { id: 'c', text: "O espaço simbólico e institucional (departamento, currículo) onde uma disciplina exerce autoridade." },
      { id: 'd', text: "O laboratório de informática do campus." }
    ],
    correctId: 'c',
    explanation: "Perfeito. O território é onde a tribo 'manda'. É a grade curricular que eles defendem, o orçamento do departamento e as fronteiras do que consideram 'sua área'."
  },
  {
    id: 3,
    question: "No campus vocacionado do agro, qual passa a ser o território principal de organização do conhecimento?",
    options: [
      { id: 'a', text: "Apenas a disciplina isolada do professor." },
      { id: 'b', text: "A cadeia produtiva (ex: Etanol, Grãos), onde disciplinas se misturam para resolver problemas." },
      { id: 'c', text: "Apenas o limite municipal da cidade sede." },
      { id: 'd', text: "A sala de aula teórica tradicional." }
    ],
    correctId: 'b',
    explanation: "Isso mesmo! O território deixa de ser o 'Departamento de Química' e passa a ser a 'Cadeia de Bioenergia'. Nesse novo território, químicos, agrônomos e economistas precisam coabitar."
  }
];

const Module3QuizView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0-2: Quiz, 3: Reflection
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Reflection States
  const [tribeText, setTribeText] = useState('');
  const [territoryText, setTerritoryText] = useState('');
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
    if (!tribeText.trim() || !territoryText.trim()) return;
    setReflectionSent(true);
  };

  // --- TELA FINAL: REFLEXÃO & IDENTIDADE ---
  if (isQuizFinished) {
    return (
      <div className="bg-slate-50 min-h-screen p-8 animate-fade-in flex justify-center pb-20">
        <div className="max-w-4xl w-full space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl text-center">
            <div className="inline-flex p-4 bg-indigo-100 text-indigo-600 rounded-full mb-6">
              <Compass size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Módulo 03: Identidade & Território</h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Você mapeou as tribos. Agora, é hora de se posicionar no mapa. 
              Para atuar no Campus Vocacionado, você precisa saber de onde vem e para onde vai.
            </p>
          </div>

          {!reflectionSent ? (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-lg space-y-12">
              
              {/* Pergunta 1: Tribo */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Feather size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">1. Sua Tribo de Origem</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Se você tivesse que se identificar com uma 'tribo' hoje, qual seria? 
                  (Ex: Agronomia, Direito, Tech, Gestão, Comunicação). Como essa tribo costuma enxergar o agro?
                </p>
                <textarea
                  value={tribeText}
                  onChange={(e) => setTribeText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm resize-none"
                  placeholder="Ex: Eu sou da tribo Tech. Nós vemos o agro como um grande banco de dados a ser otimizado, mas às vezes ignoramos a biologia..."
                />
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* Pergunta 2: Território */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">2. Seu Território Vocacionado</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Em qual <strong>Território Vocacionado</strong> você gostaria de atuar dentro de um campus como o Ânima Agro? 
                  (Ex: Etanol & Bioenergia, Grãos & Proteínas, Cooperativismo, Dados & Agrotech). Que problema real você quer ajudar a resolver ali?
                </p>
                <textarea
                  value={territoryText}
                  onChange={(e) => setTerritoryText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32 text-sm resize-none"
                  placeholder="Ex: Quero atuar em Bioenergia. O problema é a certificação do carbono para o RenovaBio..."
                />
              </div>

              <button 
                onClick={handleReflectionSubmit}
                disabled={!tribeText.trim() || !territoryText.trim()}
                className="w-full bg-slate-900 text-white font-black px-8 py-4 rounded-xl hover:bg-slate-800 transition-all uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                Consolidar Meu Perfil <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl animate-fade-in">
              <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <GraduationCap size={200} />
              </div>
              <div className="relative z-10">
                <CheckCircle2 size={64} className="text-emerald-400 mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Perfil Mapeado</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Você reconheceu sua origem e definiu seu destino. <br/>
                    Um <strong>"Embaixador de Territórios"</strong> não abandona sua tribo, mas aprende a falar a língua das outras para construir o futuro.
                </p>
                <div className="inline-block bg-white/10 px-8 py-3 rounded-xl border border-white/10 text-sm font-bold uppercase tracking-widest text-emerald-400">
                  Módulo 03 Concluído
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
            Conceitos-Chave • Tribos & Territórios
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

export default Module3QuizView;
