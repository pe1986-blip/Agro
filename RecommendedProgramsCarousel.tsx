import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Loader2, AlertTriangle, ChevronLeft, ChevronRight, GraduationCap, BarChart3, Briefcase, Tractor, Leaf, Cpu } from 'lucide-react';
import { getProgramRecommendations } from './programService';
import type { ProgramRecommendation, GrowthOpportunityScore } from './types';

// --- SUB-COMPONENTS ---

const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
  const percentage = (score / 10) * 100;
  let bgColor = 'bg-red-500';
  if (score >= 8) {
    bgColor = 'bg-green-500';
  } else if (score >= 5) {
    bgColor = 'bg-yellow-500';
  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const ProgramIcon: React.FC<{ icon: ProgramRecommendation['icon'] }> = ({ icon }) => {
    // Fix: Added 'leaf' and 'chip' properties to the icons mapping to match the updated ProgramRecommendation type
    const icons: Record<ProgramRecommendation['icon'], React.ReactNode> = {
        grad_cap: <GraduationCap size={24} className="text-blue-500" />,
        bar_chart: <BarChart3 size={24} className="text-purple-500" />,
        briefcase: <Briefcase size={24} className="text-amber-500" />,
        tractor: <Tractor size={24} className="text-green-500" />,
        leaf: <Leaf size={24} className="text-emerald-500" />,
        chip: <Cpu size={24} className="text-indigo-500" />,
    };
    return <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">{icons[icon]}</div>;
};


const ProgramCard: React.FC<{ program: ProgramRecommendation; onSelect: (program: ProgramRecommendation) => void; }> = ({ program, onSelect }) => {
  const gapColor = program.educationalGap > 0 ? 'text-green-600' : 'text-red-600';
  const gapSign = program.educationalGap > 0 ? '+' : '';

  return (
    <div className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] bg-white rounded-lg shadow-md border p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div>
            <header className="flex items-start justify-between">
                <ProgramIcon icon={program.icon} />
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{program.opportunityScore.toFixed(1)}</p>
                    <p className="text-xs text-gray-500 -mt-1">Score</p>
                </div>
            </header>
            
            <h3 className="text-md font-bold text-gray-800 leading-tight mb-2">{program.name}</h3>
            <ScoreBar score={program.opportunityScore} />

            <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                <div>
                    <p className="text-xs text-gray-500">Demanda Local</p>
                    <p className="font-semibold text-gray-800">{program.localDemand} vagas</p>
                </div>
                 <div>
                    <p className="text-xs text-gray-500">Oferta Atual</p>
                    <p className="font-semibold text-gray-800">{program.currentOffer} cursos</p>
                </div>
                 <div className="col-span-2">
                    <p className="text-xs text-gray-500">Gap Educacional</p>
                    <p className={`font-semibold text-lg ${gapColor}`}>{gapSign}{program.educationalGap} vagas</p>
                </div>
                 <div>
                    <p className="text-xs text-gray-500">Competição</p>
                    <p className="font-semibold text-gray-800">{program.competition} IES</p>
                </div>
                 <div>
                    <p className="text-xs text-gray-500">Duração Média</p>
                    <p className="font-semibold text-gray-800">{program.estimatedTime}</p>
                </div>
            </div>
        </div>

        <button 
          onClick={() => onSelect(program)}
          className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Ver Detalhes
        </button>
    </div>
  );
};

const CarouselLegend: React.FC = () => (
    <div className="mt-6 p-3 bg-white rounded-lg border text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-bold text-sm text-gray-800 mb-2">📊 Score de Oportunidade</h4>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span><strong className="text-gray-700">8-10:</strong> Alto potencial (baixa concorrência, alta demanda)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span><strong className="text-gray-700">5-7:</strong> Médio potencial (mercado balanceado)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span><strong className="text-gray-700">0-4:</strong> Baixo potencial (saturado ou pouca demanda)</span></div>
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800 mb-2">📈 Interpretação do GAP</h4>
                <p><strong className="text-green-600">Gap positivo (+):</strong> Mais demanda que oferta → <strong className="text-green-700">OPORTUNIDADE</strong></p>
                <p><strong className="text-red-600">Gap negativo (-):</strong> Mais oferta que demanda → <strong className="text-red-700">SATURADO</strong></p>
            </div>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
const RecommendedProgramsCarousel: React.FC<{ opportunity: GrowthOpportunityScore, onProgramSelect: (program: ProgramRecommendation) => void; }> = ({ opportunity, onProgramSelect }) => {
  const [programs, setPrograms] = useState<ProgramRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!opportunity) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await getProgramRecommendations(opportunity);
        setPrograms(result);
        setCurrentIndex(0);
      } catch (e: any) {
        setError(e.message || "Falha ao buscar recomendações.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [opportunity]);

  const cardsToShow = useMemo(() => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) return 1;
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return 2;
      return 3;
  }, []);
  
  const handleScroll = (direction: 'prev' | 'next') => {
      if (!scrollContainerRef.current) return;
      
      const newIndex = direction === 'prev' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(programs.length - cardsToShow, currentIndex + 1);
        
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // Corresponds to gap-4
      
      scrollContainerRef.current.scrollTo({
          left: newIndex * (cardWidth + gap),
          behavior: 'smooth',
      });
      setCurrentIndex(newIndex);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <p className="mt-2 text-sm text-gray-500">Analisando programas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 text-red-700 rounded-lg border border-red-200 p-4 text-center">
        <AlertTriangle size={32} className="mb-2" />
        <p className="font-semibold">Erro ao buscar recomendações</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div>
            <h2 className="text-xl font-bold text-gray-800">Programas Recomendados para {opportunity.municipality.split(' (')[0]}</h2>
            <p className="text-sm text-gray-500">Baseado em análise de demanda local e gaps educacionais.</p>
        </div>
        {programs.length > cardsToShow && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="text-sm text-gray-600 font-semibold">{currentIndex + cardsToShow}/{programs.length}</span>
                <button onClick={() => handleScroll('prev')} disabled={currentIndex === 0} className="p-1.5 rounded-md bg-white border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft size={16} />
                </button>
                <button onClick={() => handleScroll('next')} disabled={currentIndex >= programs.length - cardsToShow} className="p-1.5 rounded-md bg-white border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight size={16} />
                </button>
            </div>
        )}
      </header>

      <div className="relative">
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {programs.map(program => (
                    <ProgramCard key={program.id} program={program} onSelect={onProgramSelect} />
                ))}
          </div>
      </div>

      <CarouselLegend />
    </div>
  );
};

export default RecommendedProgramsCarousel;