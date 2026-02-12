import React, { useState, useEffect } from 'react';
import { Users, ChevronRight, Tractor, Briefcase, Award, Laptop, CheckCircle, DollarSign, TrendingUp, Lightbulb } from 'lucide-react';
import { PERSONAS, getPersonaRecommendations } from './services/personaService';
import type { GrowthOpportunityScore, PersonaRecommendation } from './types';

const PersonaIcon = ({ icon, size = 24, className = "" }: { icon: string, size?: number, className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
        tractor: <Tractor size={size} className={className} />,
        briefcase: <Briefcase size={size} className={className} />,
        award: <Award size={size} className={className} />,
        laptop: <Laptop size={size} className={className} />
    };
    return <>{icons[icon] || <Users size={size} className={className} />}</>;
};

const StudentPersonaPanel: React.FC<{ opportunity: GrowthOpportunityScore }> = ({ opportunity }) => {
    const [selectedPersonaId, setSelectedPersonaId] = useState(PERSONAS[0].id);
    const [recommendation, setRecommendation] = useState<PersonaRecommendation | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecs = async () => {
            setIsLoading(true);
            const rec = await getPersonaRecommendations(selectedPersonaId, opportunity);
            setRecommendation(rec);
            setIsLoading(false);
        };
        fetchRecs();
    }, [selectedPersonaId, opportunity]);

    const activePersona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                    <Users size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Segmentação de Perfis de Alunos</h2>
                    <p className="text-sm text-gray-500">Recomendações personalizadas para diferentes personas na região.</p>
                </div>
            </div>

            {/* Persona Selector (Tabs/Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {PERSONAS.map(persona => (
                    <button
                        key={persona.id}
                        onClick={() => setSelectedPersonaId(persona.id)}
                        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                            selectedPersonaId === persona.id 
                            ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-105' 
                            : 'border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-white'
                        }`}
                    >
                        <div className={`p-2 rounded-full mb-2 ${selectedPersonaId === persona.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <PersonaIcon icon={persona.icon} size={20} />
                        </div>
                        <span className={`text-xs font-bold text-center ${selectedPersonaId === persona.id ? 'text-indigo-800' : 'text-gray-600'}`}>
                            {persona.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : recommendation ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column: Profile Summary */}
                    <div className="lg:col-span-1 bg-gray-50 rounded-xl p-5 border border-gray-100 h-fit">
                        <h3 className="font-bold text-gray-800 mb-2">{activePersona.name}</h3>
                        <p className="text-sm text-gray-600 italic mb-4">"{activePersona.tagline}"</p>
                        
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b pb-1">
                                <span className="text-gray-500">Idade:</span>
                                <span className="font-medium">{activePersona.ageRange}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                                <span className="text-gray-500">Renda:</span>
                                <span className="font-medium">{activePersona.incomeLevel}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                                <span className="text-gray-500">Prefere:</span>
                                <span className="font-medium badge bg-blue-100 text-blue-800 px-2 rounded text-xs">{activePersona.preferredModality}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Dores & Necessidades</h4>
                            <ul className="space-y-1">
                                {activePersona.painPoints.map((point, i) => (
                                    <li key={i} className="text-xs flex items-start gap-2 text-gray-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 className="text-xs font-bold text-yellow-800 flex items-center gap-1 mb-1">
                                <Lightbulb size={12}/> Ângulo de Marketing
                            </h4>
                            <p className="text-xs text-yellow-900 leading-snug">
                                {recommendation.marketingAngle}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Recommendations */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Top Programs */}
                        <div>
                            <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Award size={18} className="text-indigo-600"/> Programas Ideais
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {recommendation.bestPrograms.map(prog => (
                                    <div key={prog.id} className="bg-white p-3 rounded-lg border hover:shadow-md transition-shadow flex items-start gap-3">
                                        <div className="p-2 bg-indigo-50 rounded-md text-indigo-600">
                                            {/* Icon placeholder logic could go here */}
                                            <Award size={20}/>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 leading-tight">{prog.name}</h4>
                                            <p className="text-xs text-green-600 font-medium mt-1">Score: {prog.opportunityScore.toFixed(1)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Career Path (Path-to-Productivity) */}
                        <div>
                            <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <TrendingUp size={18} className="text-green-600"/> Jornada de Carreira
                            </h3>
                            <div className="flex flex-col md:flex-row gap-2">
                                {recommendation.careerPath.map((step, i) => (
                                    <div key={i} className="flex-1 bg-green-50 border border-green-100 p-3 rounded-lg relative">
                                        {i < recommendation.careerPath.length - 1 && (
                                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-green-300">
                                                <ChevronRight size={24} />
                                            </div>
                                        )}
                                        <span className="text-[10px] uppercase tracking-wide text-green-600 font-bold block mb-1">{step.stage}</span>
                                        <p className="text-sm font-bold text-gray-800">{step.role}</p>
                                        <p className="text-xs text-gray-500 mt-1">{step.duration}</p>
                                        <span className="inline-block mt-2 text-xs font-semibold bg-white text-green-700 px-2 py-0.5 rounded border border-green-200">
                                            {step.avgSalary}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Financing Options */}
                        <div>
                            <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <DollarSign size={18} className="text-orange-500"/> Financiamento & Bolsas
                            </h3>
                            <div className="space-y-2">
                                {recommendation.financing.map((option, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{option.name}</p>
                                            <p className="text-xs text-gray-500">{option.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                option.probability === 'Alta' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                Probabilidade: {option.probability}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StudentPersonaPanel;