
import React, { useState } from 'react';
import { 
  BookOpen, Users, Map, Layout, ChevronRight, School, Globe, Swords, LayoutTemplate, BookOpenCheck 
} from 'lucide-react';

// Importação das Visões do Módulo
import AcademicTribesView from './AcademicTribesView';
import AgroTerritoryIntegrationView from './AgroTerritoryIntegrationView'; 
import AcademicTribesConflictView from './AcademicTribesConflictView'; 
import AcademicTerritoryMapView from './AcademicTerritoryMapView'; // NEW IMPORT
import Module3QuizView from './Module3QuizView'; // NEW IMPORT

// Placeholders para visões futuras (serão preenchidos com novos inputs)
const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[600px] text-slate-400 bg-slate-50 rounded-[3rem] m-8 border border-dashed border-slate-200">
        <School size={64} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-slate-500">{title}</h2>
        <p className="text-sm">Conteúdo em Desenvolvimento</p>
    </div>
);

type HubTab = 'concepts' | 'territories' | 'map' | 'conflicts' | 'quiz' | 'strategy' | 'cases';

const AcademicTribesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubTab>('concepts');

  const TABS = [
    { id: 'concepts', label: 'Tribos & Disciplinas', icon: BookOpen, desc: 'Becher & Trowler' },
    { id: 'territories', label: 'Novos Territórios', icon: Globe, desc: 'Do Disciplinar ao Produtivo' },
    { id: 'map', label: 'O Mapa do Campus', icon: LayoutTemplate, desc: 'Arquitetura de Núcleos' }, // NEW TAB
    { id: 'conflicts', label: 'Conflitos & Tradução', icon: Swords, desc: 'A Arte da Mediação' },
    { id: 'quiz', label: 'Consolidação', icon: BookOpenCheck, desc: 'Quiz & Reflexão' }, // NEW TAB
    { id: 'strategy', label: 'Estratégia de Integração', icon: Map, desc: 'Redesenhando Fronteiras' },
    { id: 'cases', label: 'Estudos de Caso', icon: Users, desc: 'Tribos em Ação' },
  ];

  const ActiveComponent = () => {
    switch (activeTab) {
      case 'concepts': return <AcademicTribesView />;
      case 'territories': return <AgroTerritoryIntegrationView />;
      case 'map': return <AcademicTerritoryMapView />; // CONNECTED
      case 'conflicts': return <AcademicTribesConflictView />;
      case 'quiz': return <Module3QuizView />; // CONNECTED
      case 'strategy': return <PlaceholderView title="Estratégia de Integração de Territórios" />;
      case 'cases': return <PlaceholderView title="Casos de Conflito e Colaboração" />;
      default: return <AcademicTribesView />;
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
                        Módulo 03
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                        <ChevronRight size={12}/> Sociologia Acadêmica
                    </span>
                </div>
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Users className="text-indigo-600" size={24}/> Tribos & Territórios
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

export default AcademicTribesHub;
