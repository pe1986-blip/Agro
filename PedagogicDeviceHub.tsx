
import React, { useState } from 'react';
import { 
  BookKey, RefreshCcw, BookOpenCheck, ChevronRight, School, 
  Settings, Scale, LayoutTemplate, LayoutGrid 
} from 'lucide-react';

// Importação das Visões
import BernsteinConceptView from './BernsteinConceptView';
import RecontextualizationCyclesView from './RecontextualizationCyclesView';
import ClassificationFramingView from './ClassificationFramingView';
import RadialMatrixView from './RadialMatrixView';
import RadialStructureView from './RadialStructureView'; // NEW IMPORT
import Module4QuizView from './Module4QuizView';

// Placeholders
const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[600px] text-slate-400 bg-slate-50 rounded-[3rem] m-8 border border-dashed border-slate-200">
        <School size={64} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-slate-500">{title}</h2>
        <p className="text-sm">Conteúdo em Desenvolvimento</p>
    </div>
);

type HubTab = 'structure' | 'bernstein' | 'cycles' | 'framing' | 'matrix' | 'evaluation' | 'quiz';

const PedagogicDeviceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubTab>('structure');

  const TABS = [
    { id: 'structure', label: 'Estrutura da Matriz', icon: LayoutGrid, desc: 'Núcleo, Trilhas e Jornada' }, // NEW TAB
    { id: 'bernstein', label: 'Conceito: Bernstein', icon: BookKey, desc: 'O Dispositivo Pedagógico' },
    { id: 'cycles', label: 'Os 3 Ciclos', icon: RefreshCcw, desc: 'Metodologia Ânima Agro' },
    { id: 'framing', label: 'Classif. & Enquadramento', icon: Scale, desc: 'Arquitetura de Controle' },
    { id: 'matrix', label: 'A Matriz (Teoria)', icon: LayoutTemplate, desc: 'Conexão Conceitual' },
    { id: 'evaluation', label: 'Regras de Avaliação', icon: Settings, desc: 'Critérios e Legitimação' },
    { id: 'quiz', label: 'Consolidação', icon: BookOpenCheck, desc: 'Quiz & Reflexão' },
  ];

  const ActiveComponent = () => {
    switch (activeTab) {
      case 'structure': return <RadialStructureView />; // CONNECTED
      case 'bernstein': return <BernsteinConceptView />;
      case 'cycles': return <RecontextualizationCyclesView />;
      case 'framing': return <ClassificationFramingView />;
      case 'matrix': return <RadialMatrixView />;
      case 'evaluation': return <PlaceholderView title="Avaliação: O Poder do Critério" />;
      case 'quiz': return <Module4QuizView />;
      default: return <RadialStructureView />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      
      {/* HEADER DO MÓDULO */}
      <div className="bg-white border-b border-slate-200 z-40 shrink-0">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        Módulo 04
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                        <ChevronRight size={12}/> Sociologia da Educação
                    </span>
                </div>
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <LayoutGrid className="text-indigo-600" size={24}/> Dispositivo Pedagógico & Matriz
                </h1>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as HubTab)}
                            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all min-w-[140px] border ${
                                isActive 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                                : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-0.5">
                                <Icon size={14} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                                <span className="text-[10px] font-black uppercase tracking-wide">{tab.label}</span>
                            </div>
                            <span className={`text-[8px] font-medium hidden md:block ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
                                {tab.desc}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0">
         <ActiveComponent />
      </div>

    </div>
  );
};

export default PedagogicDeviceHub;
