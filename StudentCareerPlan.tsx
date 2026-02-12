
import React from 'react';
import { 
  ShieldCheck, TrendingUp, MapPin, 
  Download, Share2, Briefcase, 
  GraduationCap, Target, ArrowLeft,
  Calendar, CheckCircle2, Sparkles,
  // Added missing icon imports to fix errors on lines 85, 99, 117, 123
  DollarSign, Tractor, ChevronRight
} from 'lucide-react';
import type { MunicipioPerfil } from './types';

interface StudentCareerPlanProps {
  city: MunicipioPerfil;
  planText: string;
  onBack: () => void;
}

const StudentCareerPlan: React.FC<StudentCareerPlanProps> = ({ city, planText, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fade-in overflow-hidden">
      
      {/* HEADER CONTROLS */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm shrink-0 z-50">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black transition-colors uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Novo Diagnóstico
        </button>
        <div className="flex items-center gap-3">
          <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors"><Share2 size={20}/></button>
          <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
            <Download size={18} /> Baixar Plano em PDF
          </button>
        </div>
      </header>

      {/* DOCUMENT PREVIEW */}
      <main className="flex-1 overflow-y-auto p-8 sm:p-16 flex justify-center bg-slate-200/50 custom-scrollbar">
        <div id="career-plan-doc" className="bg-white w-full max-w-[210mm] shadow-2xl rounded-[3rem] overflow-hidden flex flex-col p-12 sm:p-24 relative border border-slate-100">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <TrendingUp size={300} />
          </div>

          {/* TOP BAR */}
          <div className="flex justify-between items-start mb-20 border-b-4 border-slate-900 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Confidencial • RogerLens</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Plano de Blindagem <br/> de <span className="text-blue-600">Legado</span></h1>
              <div className="flex items-center gap-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <span className="flex items-center gap-2 border-r pr-4"><MapPin size={14}/> {city.nome} (Sede Operacional)</span>
                <span className="flex items-center gap-2"><Calendar size={14}/> Safra 2025/2026</span>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-[2rem] text-center min-w-[140px] shadow-2xl">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-lg font-black text-emerald-400 uppercase italic">Aprovado</p>
            </div>
          </div>

          {/* AI CONTENT */}
          <div className="space-y-12 mb-20">
            <div className="prose prose-slate max-w-none">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-blue-500" size={24} />
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Parecer Estratégico</h3>
                </div>
                <div className="text-xl text-slate-700 leading-relaxed font-medium text-justify italic">
                   {planText.split('\n\n').map((para, i) => (
                     <p key={i} className="mb-6">"{para}"</p>
                   ))}
                </div>
            </div>
          </div>

          {/* PRACTICAL MODULES (THE TRANSLATION) */}
          <div className="mb-20">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Target className="text-blue-600" /> O que você vai dominar na prática
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0"><DollarSign size={20}/></div>
                    <div>
                        <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Caixa no Capricho</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Saber se o boi ou o café está dando lucro real ou se você está trocando figurinha.</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 shrink-0"><Briefcase size={20}/></div>
                    <div>
                        <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Escudo Jurídico</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Como contratar e gerir gente no campo sem medo de processo trabalhista bobo.</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 shrink-0"><Tractor size={20}/></div>
                    <div>
                        <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Tecnologia que Paga</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Extrair 100% da inteligência dos drones e do GPS para reduzir custo de insumo.</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600 shrink-0"><GraduationCap size={20}/></div>
                    <div>
                        <h4 className="font-black text-slate-800 uppercase text-xs mb-1">Networking de Elite</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Trocar experiência com outros herdeiros que vivem os mesmos dilemas que você.</p>
                    </div>
                </div>
             </div>
          </div>

          {/* FOOTER CALL TO ACTION */}
          <div className="mt-auto bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-600/30 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Tractor size={120}/></div>
            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Pronto para assumir o comando?</h2>
                <p className="text-blue-100 font-bold text-sm opacity-80 uppercase tracking-widest">Garantir vaga na turma de 2026 em {city.nome}</p>
            </div>
            <button className="relative z-10 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 group">
                Reservar Vaga Agora <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">RogerLens Professional Education Engine v3.6 • Todos os direitos reservados</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentCareerPlan;
