
import React, { useState, useMemo } from 'react';
import { 
  Tractor, TrendingUp, ShieldAlert, Users, 
  ArrowRight, Mic, Play, CheckCircle2, 
  DollarSign, Briefcase, GraduationCap, MapPin,
  ChevronRight, BrainCircuit, Heart
} from 'lucide-react';
import { generateMarketAnalysis } from './services/geminiService';
import type { MunicipioPerfil } from './types';

// Fix: icon property now explicitly expects a ReactElement that accepts a 'size' prop
interface PainPoint {
  id: string;
  label: string;
  icon: React.ReactElement<{ size?: number }>;
  description: string;
}

const PAIN_POINTS: PainPoint[] = [
  { id: 'profit', label: 'Lucro Sumindo', icon: <DollarSign />, description: 'A gente colhe bem, mas no fim da safra o dinheiro some e ninguém sabe onde.' },
  { id: 'labor', label: 'Mão de Obra', icon: <Users />, description: 'Dificuldade de achar peão de confiança ou gente que entenda de tecnologia.' },
  { id: 'tech', label: 'Tecnologia Travada', icon: <Tractor />, description: 'O maquinário é novo, mas a gente só usa 20% do que o GPS e o drone oferecem.' },
  { id: 'succession', label: 'Briga na Família', icon: <ShieldAlert />, description: 'Hora de profissionalizar a sucessão para o herdeiro não quebrar o que o avô construiu.' }
];

const LegacyDiagnostic: React.FC<{ 
  city: MunicipioPerfil, 
  onFinish: (plan: string) => void,
  onCancel: () => void 
}> = ({ city, onFinish, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedPain, setSelectedPain] = useState<PainPoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnostic = async (pain: PainPoint) => {
    setSelectedPain(pain);
    setIsLoading(true);
    
    const prompt = `
      CONTEXTO: Aluno herdeiro da cidade de ${city.nome} (${city.estado}).
      DOR PRINCIPAL: ${pain.label} - ${pain.description}.
      
      TAREFA: Gere um "Plano de Blindagem de Legado" em 3 parágrafos curtos.
      REGRAS: 
      1. Use linguagem de produtor rural (safra, porteira, DRE, lucro, patrimônio).
      2. NUNCA use termos acadêmicos como "matriz curricular" ou "ementa".
      3. No primeiro parágrafo, valide a dor dele com dados da cidade (PIB Agro de ${city.pib_agro_bi}B).
      4. No segundo, sugira a solução focada em MBA ou Curso Técnico.
      5. No terceiro, dê um "tapa de realidade" sobre o futuro da fazenda se ele não estudar.
    `;

    try {
      const result = await generateMarketAnalysis(prompt, city);
      onFinish(result);
    } catch (err) {
      onFinish("Houve um erro no seu diagnóstico, mas pela minha análise, você precisa focar em Gestão Financeira IMEDIATAMENTE.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950 flex flex-col items-center justify-center p-6 sm:p-10 animate-fade-in overflow-y-auto">
      <div className="max-w-4xl w-full">
        
        {/* STEP HEADER */}
        <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <BrainCircuit size={28} />
                </div>
                <div>
                    <h1 className="text-white font-black uppercase tracking-tighter text-2xl leading-none">The Legacy Diagnostic</h1>
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">RogerLens B2C Engine</p>
                </div>
            </div>
            <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Sair</button>
        </div>

        {step === 1 && (
            <div className="space-y-10 animate-fade-in">
                <div className="space-y-4">
                    <h2 className="text-4xl sm:text-6xl text-white font-black tracking-tighter leading-none">
                        Onde dói na <span className="text-blue-500">porteira</span> hoje?
                    </h2>
                    <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl">
                        Renato, para não perdermos tempo, selecione o problema real que tira o sono da sua família em <span className="text-white underline decoration-blue-500 underline-offset-8">{city.nome}</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {PAIN_POINTS.map(pain => (
                        <button 
                            key={pain.id}
                            onClick={() => handleDiagnostic(pain)}
                            className="group text-left p-6 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                {/* Fix: React.cloneElement correctly typed via PainPoint icon override */}
                                {React.cloneElement(pain.icon, { size: 100 })}
                            </div>
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {pain.icon}
                            </div>
                            <h3 className="text-white font-black text-xl mb-2 uppercase italic tracking-tighter">{pain.label}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200">{pain.description}</p>
                        </button>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
                        <Mic className="text-blue-500 animate-pulse" />
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Prefere falar? Segure para gravar um áudio</span>
                    </div>
                </div>
            </div>
        )}

        {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-8 animate-pulse py-20">
                <div className="relative">
                    <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Tractor size={48} className="text-blue-500 animate-bounce" />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">Cruzando Dados da Fazenda</h3>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">Calculando Viabilidade do seu Legado...</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default LegacyDiagnostic;
