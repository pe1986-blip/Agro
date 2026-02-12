
import React, { useState } from 'react';
import { 
  Feather, Compass, Sunrise, PenTool, 
  ArrowRight, CheckCircle2, Quote, Send 
} from 'lucide-react';

const QuestionBlock = ({ number, title, context, placeholder, value, onChange }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-8 transition-all hover:shadow-md hover:border-slate-200 group">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 font-serif font-bold italic group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                {number}
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
        </div>
        
        <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium pl-14 border-l-2 border-slate-100">
            {context}
        </p>

        <div className="pl-14">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all h-40 text-sm leading-relaxed resize-none font-medium"
                placeholder={placeholder}
            />
        </div>
    </div>
);

const FinalReflectionView: React.FC = () => {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [isCommitted, setIsCommitted] = useState(false);

  const handleCommit = () => {
      if (!answers.q1 || !answers.q2 || !answers.q3) {
          alert("Por favor, preencha suas reflexões antes de assinar o compromisso.");
          return;
      }
      setIsCommitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isCommitted) {
      return (
          <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              
              <div className="relative z-10 max-w-2xl">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse-slow">
                      <CheckCircle2 size={48} className="text-slate-900" />
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                      Compromisso <br/><span className="text-emerald-400">Registrado</span>
                  </h1>
                  
                  <p className="text-lg text-slate-300 leading-relaxed mb-12">
                      "O futuro não é um lugar para onde estamos indo, mas um lugar que estamos criando. O caminho para ele não é encontrado, mas construído."
                  </p>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-left space-y-6">
                      <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Seu Propósito</p>
                          <p className="text-sm text-white font-medium italic">"{answers.q1}"</p>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Seu Papel</p>
                          <p className="text-sm text-white font-medium italic">"{answers.q2}"</p>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Sua Entrega</p>
                          <p className="text-sm text-white font-medium italic">"{answers.q3}"</p>
                      </div>
                  </div>

                  <p className="mt-12 text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
                      Bem-vindo à Ânima Agro
                  </p>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
                <Feather size={12} /> Manifesto Pessoal
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
                Que Futuro de Agro <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
                    Você Topa Assinar Em Baixo?
                </span>
            </h1>
            <div className="prose prose-lg text-slate-500 mx-auto leading-relaxed">
                <p>
                    O agro brasileiro está diante de uma bifurcação histórica. Podemos replicar o que já fazemos bem (produtividade e volume) ou podemos nos reinventar como a potência que lidera a transição ecológica, social e tecnológica global.
                </p>
                <p>
                    A escolha não é abstrata; ela é feita por pessoas, em decisões concretas, todos os dias. A proposta da Ânima Agro é uma aposta explícita na segunda via. Mas uma instituição é feita de indivíduos. E a pergunta volta para você.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        
        {/* JOURNALING AREA */}
        
        <QuestionBlock 
            number="01"
            title="Sobre Propósito"
            context="Quando você olha para o ano de 2035, qual cenário você estaria disposto a olhar e dizer: 'isso valeu a pena'? Não o cenário provável, mas o cenário desejável pelo qual vale a pena lutar."
            placeholder="Eu gostaria de ver um agro que..."
            value={answers.q1}
            onChange={(v: string) => setAnswers({...answers, q1: v})}
        />

        <QuestionBlock 
            number="02"
            title="Sobre Papel"
            context="Dentro desse cenário de 2035, qual é o papel que você — não 'o setor', não 'o governo', mas você, CPF — se vê desempenhando? Que tipo de decisão ou liderança você quer contar para seus netos que exerceu?"
            placeholder="Eu me vejo atuando como..."
            value={answers.q2}
            onChange={(v: string) => setAnswers({...answers, q2: v})}
        />

        <QuestionBlock 
            number="03"
            title="Sobre Compromisso"
            context="Sonho sem execução é alucinação. O que você toparia colocar na mesa nos próximos 2 anos (tempo, atenção, reputação, recursos) para aproximar esse cenário da realidade?"
            placeholder="Estou disposto a investir..."
            value={answers.q3}
            onChange={(v: string) => setAnswers({...answers, q3: v})}
        />

        {/* CLOSING & CTA */}
        <div className="mt-16 bg-slate-900 text-white rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Sunrise size={200} />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <Quote size={48} className="mx-auto text-indigo-400 mb-6 opacity-50"/>
                <p className="text-xl md:text-2xl font-serif italic text-slate-200 leading-relaxed mb-10">
                    "Se a Ânima Agro faz sentido para você, este campus não é um lugar onde você apenas 'assiste aula'. É um lugar onde você assina compromissos com o futuro do Brasil — e cumpre."
                </p>
                
                <button 
                    onClick={handleCommit}
                    className="group relative inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/30"
                >
                    <PenTool size={16} className="text-slate-400 group-hover:text-white transition-colors"/>
                    Assinar Compromisso
                </button>
                
                <p className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    As portas estão abertas. A decisão é sua.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default FinalReflectionView;
