
import React, { useState } from 'react';
import { 
  Map, Compass, Handshake, Target, BookOpenCheck, 
  Layout, BookOpen, ChevronRight 
} from 'lucide-react';

// Importação das Visões do Módulo
import AgroTerritoryConceptView from './AgroTerritoryConceptView';
import GoianiaTerritoryMap from './GoianiaTerritoryMap';
import GoianiaStakeholdersView from './GoianiaStakeholdersView';
import GoianiaCampusImpactNarrative from './GoianiaCampusImpactNarrative';
import Module1QuizView from './Module1QuizView';

type HubTab = 'concept' | 'map' | 'stakeholders' | 'impact' | 'quiz';

const TerritoryVocationalHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubTab>('concept');

  const TABS = [
    { id: 'concept', label: 'Conceito & Teoria', icon: Map, desc: 'Fundamentação Milton Santos' },
    { id: 'map', label: 'Mapa Vocacional', icon: Compass, desc: 'Cadeias Produtivas GO' },
    { id: 'stakeholders', label: 'Stakeholders', icon: Handshake, desc: 'Grafo de Poder' },
    { id: 'impact', label: 'Narrativa de Impacto', icon: Target, desc: 'Ciclo Pedagógico' },
    { id: 'quiz', label: 'Consolidação', icon: BookOpenCheck, desc: 'Quiz & Reflexão' },
  ];

  const ActiveComponent = () => {
    switch (activeTab) {
      case 'concept': return <AgroTerritoryConceptView />;
      case 'map': return <GoianiaTerritoryMap />;
      case 'stakeholders': return <GoianiaStakeholdersView />;
      case 'impact': return <GoianiaCampusImpactNarrative />;
      case 'quiz': return <Module1QuizView />;
      default: return <AgroTerritoryConceptView />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      
      {/* HEADER DO MÓDULO */}
      <div className="bg-white border-b border-slate-200 z-40 shrink-0">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        Módulo 01
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                        <ChevronRight size={12}/> Planejamento Estratégico
                    </span>
                </div>
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Layout className="text-blue-600" size={24}/> Território & Vocação
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
                            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all min-w-[100px] border ${
                                isActive 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                                : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-0.5">
                                <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                                <span className="text-[10px] font-black uppercase tracking-wide">{tab.label}</span>
                            </div>
                            {/* Desktop only description */}
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

export default TerritoryVocationalHub;
