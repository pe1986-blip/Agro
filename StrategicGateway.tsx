
import React, { useState } from 'react';
import { 
  Landmark, RefreshCw, Map as MapIcon, Layers, 
  ArrowRight, Target, Globe, Zap, ChevronRight, Sprout,
  Briefcase, BookOpen
} from 'lucide-react';
import ProjectCharterModal from './ProjectCharterModal';

interface StrategicGatewayProps {
  onEnter: (context: string) => void;
}

const PILLARS = [
  {
    id: 'goiania',
    title: 'Hub Nacional',
    subtitle: 'A Capital do Agroluxo',
    context: 'war-room', 
    icon: Target,
    color: 'emerald',
    gradient: 'from-emerald-900 to-slate-900',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    description: "Goiânia não é fazenda; é a Faria Lima do Cerrado. Onde o dinheiro do agro vira serviço, decisão e lifestyle. A sede definitiva para a Ânima Agro.",
    stats: "Goiânia • Rio Verde • Jataí"
  },
  {
    id: 'una',
    title: 'Transformação UNA',
    subtitle: 'Vocação & Identidade',
    context: 'territory-hub',
    icon: RefreshCw,
    color: 'indigo',
    gradient: 'from-indigo-900 to-slate-900',
    accent: 'text-indigo-400',
    border: 'border-indigo-500/30',
    description: "Reconfiguração das unidades atuais. Virada de chave curricular e mercadológica para capturar a identidade local e sair da commodity.",
    stats: "Modelagem Acadêmica • Ecologia de Saberes"
  },
  {
    id: 'expansao',
    title: 'Fronteiras',
    subtitle: 'Expansão Territorial',
    context: 'radar',
    icon: MapIcon,
    color: 'blue',
    gradient: 'from-blue-900 to-slate-900',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    description: "A conquista de novos territórios. Identificação e captura de praças órfãs de ensino de qualidade no cinturão do agro.",
    stats: "Mato Grosso • Matopiba • Paraná"
  },
  {
    id: 'produtos',
    title: 'Portfólio',
    subtitle: 'Arquitetura de Produtos',
    context: 'strategic-portfolio',
    icon: Layers,
    color: 'amber',
    gradient: 'from-amber-900 to-slate-900',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    description: "Além da graduação. Soluções educacionais desenhadas para dores específicas da cadeia (Bioenergia, Trading, ESG).",
    stats: "Matriz Radial • Ciclos de Aprendizagem"
  }
];

const StrategicGateway: React.FC<StrategicGatewayProps> = ({ onEnter }) => {
  const [activeId, setActiveId] = useState<string | null>('goiania'); 
  const [showCharter, setShowCharter] = useState(false);

  const handlePillarClick = (pillarId: string, context: string) => {
      if (pillarId === 'goiania') {
          setShowCharter(true);
      } else {
          onEnter(context);
      }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col font-sans animate-fade-in">
      
      {/* MODAL DE CHARTER (GOIÂNIA) */}
      {showCharter && (
          <ProjectCharterModal 
              onClose={() => setShowCharter(false)}
              onProceed={() => {
                  setShowCharter(false);
                  onEnter('war-room');
              }}
          />
      )}

      {/* Background Abstract Map */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Goias_Meso_Micro_Municip.svg/1200px-Goias_Meso_Micro_Municip.svg.png')] bg-cover bg-center mix-blend-overlay grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950"></div>
      </div>

      {/* Título Watermark (Fundo Gigante) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <h1 className="text-[12vw] font-black text-white opacity-[0.03] tracking-tighter leading-none whitespace-nowrap">
            ÂNIMA AGRO
        </h1>
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-slate-950 to-transparent">
        <div className="flex items-center gap-4">
           {/* Logo Icon */}
           <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
              <Sprout className="text-emerald-400" size={24} />
           </div>
           
           {/* Brand Text */}
           <div>
             <h1 className="text-2xl font-serif font-bold text-white tracking-wide leading-none flex items-center gap-2">
                Ânima<span className="text-emerald-500">Agro</span>
             </h1>
             <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-700 pr-2">
                    RogerLens Intelligence
                </span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    v4.5
                </span>
             </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
              onClick={() => onEnter('operating-model')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest backdrop-blur-md"
            >
              <Briefcase size={14}/> Modelo Operacional
            </button>
            <button 
              onClick={() => onEnter('thesis')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest backdrop-blur-md"
            >
              <BookOpen size={14}/> Dossiê & Metodologia
            </button>
            <button 
              onClick={() => onEnter('radar')}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600 border border-blue-500 hover:bg-blue-500 transition-all text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-blue-900/50"
            >
              Acesso Geral <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </header>

      {/* Pillars Container */}
      <main className="flex-1 flex flex-col md:flex-row relative z-10 px-4 pb-4 gap-2 md:gap-0">
        {PILLARS.map((pillar) => {
          const isActive = activeId === pillar.id;
          
          return (
            <div 
              key={pillar.id}
              onMouseEnter={() => setActiveId(pillar.id)}
              onClick={() => handlePillarClick(pillar.id, pillar.context)}
              className={`
                relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer group overflow-hidden
                flex flex-col justify-end
                ${isActive ? 'md:flex-[3] bg-opacity-100' : 'md:flex-1 bg-opacity-40 hover:bg-opacity-60'}
                border-r border-white/5 last:border-r-0 md:first:rounded-l-3xl md:last:rounded-r-3xl
                rounded-xl md:rounded-none mb-2 md:mb-0
              `}
            >
              {/* Background Gradient & Image */}
              <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-60'}`}></div>
              <div className={`absolute inset-0 bg-slate-950 transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-60 group-hover:opacity-40'}`}></div>
              
              {/* Content Wrapper */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                
                {/* Top Icon */}
                <div className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'}`}>
                   <div className={`w-14 h-14 rounded-2xl border ${pillar.border} bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl`}>
                      <pillar.icon size={28} className={pillar.accent} />
                   </div>
                   <h2 className={`text-3xl md:text-5xl font-serif font-black text-white leading-tight mb-2 uppercase tracking-tight`}>
                     {pillar.title}
                   </h2>
                   <p className={`text-xs font-bold uppercase tracking-[0.2em] ${pillar.accent}`}>
                     {pillar.subtitle}
                   </p>
                </div>

                {/* Description (Active State) */}
                <div className={`
                  space-y-6 transition-all duration-500 delay-100 overflow-hidden
                  ${isActive ? 'opacity-100 max-h-[500px] translate-y-0' : 'opacity-0 max-h-0 translate-y-8'} 
                `}>
                   <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                   <p className="text-lg text-slate-200 font-medium leading-relaxed max-w-lg">
                     {pillar.description}
                   </p>
                   
                   <div className="flex items-center gap-4">
                      <div className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-[10px] font-black text-slate-300 uppercase tracking-wider backdrop-blur-sm">
                        {pillar.stats}
                      </div>
                   </div>

                   <button className={`
                      flex items-center gap-3 px-8 py-4 rounded-xl 
                      bg-white text-slate-900 font-bold uppercase text-xs tracking-widest 
                      hover:scale-105 transition-transform shadow-2xl shadow-white/10
                   `}>
                      {pillar.id === 'goiania' ? 'Ver Dossiê da Sede' : 'Explorar Frente'} <ArrowRight size={14} />
                   </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors pointer-events-none ${isActive ? 'bg-white/5' : ''}`}></div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 px-8 flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest border-t border-white/5 bg-slate-950">
        <div className="flex items-center gap-2">
            <Globe size={12} />
            <span>Ecossistema Ânima Agro • 2025</span>
        </div>
        <div className="flex items-center gap-4">
            <span>Confidencial</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>Uso Interno</span>
        </div>
      </footer>

    </div>
  );
};

export default StrategicGateway;
