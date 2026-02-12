
import React, { useState } from 'react';
import { 
  AlertTriangle, Sprout, Network, Sparkles, 
  Layout, BookOpen, ChevronRight, School, Landmark, 
  BookOpenCheck, Telescope, UserCheck
} from 'lucide-react';

// Importação das Visões do Módulo
import UniversityCrisisView from './UniversityCrisisView';
import EcologyOfKnowledgesView from './EcologyOfKnowledgesView'; 
import UfbaCaseStudyView from './UfbaCaseStudyView'; 
import AnimaAgroNewUniversityView from './AnimaAgroNewUniversityView';
import Module2QuizView from './Module2QuizView'; 
import SteapForcesView from './SteapForcesView'; // NEW IMPORT
import ProfessorTurnaroundView from './ProfessorTurnaroundView'; // NEW IMPORT

type HubTab = 'crisis' | 'steap' | 'ecology' | 'ufba' | 'role' | 'professor' | 'quiz';

const UniversityEcologiesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubTab>('crisis');

  const TABS = [
    { id: 'crisis', label: '13 Crises (Colapso)', icon: AlertTriangle, desc: 'Diagnóstico Sistêmico' },
    { id: 'steap', label: 'Forças STEAP', icon: Telescope, desc: 'Vetores de Mudança' },
    { id: 'ecology', label: 'Ecologia de Saberes', icon: Sprout, desc: 'Manifesto Boaventura' },
    { id: 'ufba', label: 'O Caso UFBA', icon: Landmark, desc: 'Naomar & Universidade Nova' },
    { id: 'role', label: 'Ânima Agro', icon: Sparkles, desc: 'O Novo Papel na Prática' },
    { id: 'professor', label: 'O Novo Docente', icon: UserCheck, desc: 'Carreira & Incentivos' }, // NEW TAB
    { id: 'quiz', label: 'Consolidação', icon: BookOpenCheck, desc: 'Quiz & Reflexão' },
  ];

  const ActiveComponent = () => {
    switch (activeTab) {
      case 'crisis': return <UniversityCrisisView />;
      case 'steap': return <SteapForcesView />;
      case 'ecology': return <EcologyOfKnowledgesView />;
      case 'ufba': return <UfbaCaseStudyView />;
      case 'role': return <AnimaAgroNewUniversityView />;
      case 'professor': return <ProfessorTurnaroundView />; // NEW VIEW
      case 'quiz': return <Module2QuizView />;
      default: return <UniversityCrisisView />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      
      {/* HEADER DO MÓDULO */}
      <div className="bg-white border-b border-slate-200 z-40 shrink-0">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-purple-100">
                        Módulo 02
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                        <ChevronRight size={12}/> Fundamentação Filosófica
                    </span>
                </div>
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <School className="text-purple-600" size={24}/> Universidade Nova
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
                            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all min-w-[120px] border ${
                                isActive 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                                : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-0.5">
                                <Icon size={14} className={isActive ? 'text-purple-400' : 'text-slate-400'} />
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

export default UniversityEcologiesHub;
