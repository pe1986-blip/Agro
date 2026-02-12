
import React, { useState, useMemo, useEffect } from 'react';
import { 
    X, BookOpen, Target, Layers, 
    CheckCircle2, Briefcase, GraduationCap, Zap, Save,
    DollarSign, Megaphone, Calculator, PieChart as PieIcon,
    PenTool, BrainCircuit, Heart, Sprout, TrendingUp,
    Activity, Sparkles, Loader2, RotateCcw
} from 'lucide-react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine
} from 'recharts';
import { PORTFOLIO_ARCHETYPES, generateCurriculumMatrix, DnaScore, CurriculumModule } from './services/portfolioService';
import { LearningAnalyticsService, ImpactProjection } from './services/learningAnalyticsService';
import { generateCurriculumStructure } from './services/geminiService';
import type { JobPosition } from './services/socialGapService';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';

interface SolutionArchitectModalProps {
    job?: JobPosition; 
    cityProfile: MunicipioPerfil; 
    onClose: () => void;
}

// --- VISUAL COMPONENTS ---

const FinkRadar = ({ dna, color }: { dna: DnaScore, color: string }) => {
    const data = [
      { subject: 'Conhecimento', A: dna.Teoria, fullMark: 100 },
      { subject: 'Aplicação', A: dna.Prática, fullMark: 100 },
      { subject: 'Integração', A: dna.Conexão, fullMark: 100 },
      { subject: 'Dim. Humana', A: dna.Humana || 50, fullMark: 100 },
      { subject: 'Cuidar (Caring)', A: dna.Cuidar || 50, fullMark: 100 },
      { subject: 'Aprender a Aprender', A: dna.Aprender || 50, fullMark: 100 },
    ];
  
    return (
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Taxonomia de Fink"
              dataKey="A"
              stroke={color}
              strokeWidth={3}
              fill={color}
              fillOpacity={0.4}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
};

const ImpactProjectionCard = ({ projection, isLoading }: { projection: ImpactProjection | null, isLoading: boolean }) => {
    if (isLoading) return <div className="p-10 text-center text-slate-400">Consultando Data Lake de Aprendizagem...</div>;
    if (!projection) return null;

    return (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={16} className="text-blue-600"/> Projeção de Impacto (LRS)
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                    <p className="text-[10px] uppercase text-slate-400 font-bold">Empregabilidade</p>
                    <p className="text-2xl font-black text-emerald-600">{projection.empregabilidade.toFixed(0)}%</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                    <p className="text-[10px] uppercase text-slate-400 font-bold">Bônus Salarial</p>
                    <p className="text-2xl font-black text-blue-600">+{projection.incrementoRenda.toFixed(0)}%</p>
                </div>
            </div>
            
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                 <p className="text-xs text-indigo-800 font-medium leading-relaxed italic">
                    "{projection.impactoTerritorial}"
                 </p>
            </div>
        </div>
    );
};

// --- LOGIC ---

const SolutionArchitectModal: React.FC<SolutionArchitectModalProps> = ({ job, cityProfile, onClose }) => {
    const [activeTab, setActiveTab] = useState<'methodology' | 'impact' | 'commercial'>('methodology');
    const [selectedArchetypeId, setSelectedArchetypeId] = useState('bootcamp');
    const [isSaving, setIsSaving] = useState(false);
    
    // State para o Data Lake
    const [impactProjection, setImpactProjection] = useState<ImpactProjection | null>(null);
    const [loadingImpact, setLoadingImpact] = useState(false);

    // State para IA Generativa da Ementa
    const [curriculumMatrix, setCurriculumMatrix] = useState<CurriculumModule[]>([]);
    const [isGeneratingMatrix, setIsGeneratingMatrix] = useState(false);
    const [isAiGenerated, setIsAiGenerated] = useState(false);

    const activeJob = useMemo(() => {
        if (job) return job;
        return {
            id: 'custom',
            title: 'Novo Produto Customizado',
            sector: 'Multisetorial',
            salary: '-',
            demandLevel: 'Média',
            missingSkills: ['Competências a definir'],
            recommendedCourse: 'Personalizado'
        } as JobPosition;
    }, [job]);

    // Initial Load of Static Matrix (Base)
    useEffect(() => {
        const initialMatrix = generateCurriculumMatrix(activeJob.title, selectedArchetypeId);
        setCurriculumMatrix(initialMatrix);
        setIsAiGenerated(false); // Reset AI flag on archetype change
    }, [activeJob.title, selectedArchetypeId]);

    // Fetch Impact Data when Job or City changes
    useEffect(() => {
        const fetchImpact = async () => {
            setLoadingImpact(true);
            try {
                const data = await LearningAnalyticsService.getImpactProjection(cityProfile, activeJob.sector);
                setImpactProjection(data);
            } catch (error) {
                console.error("Erro ao buscar impacto", error);
            } finally {
                setLoadingImpact(false);
            }
        };
        fetchImpact();
    }, [cityProfile, activeJob]);

    const selectedArchetype = useMemo(() => {
        return PORTFOLIO_ARCHETYPES.flatMap(g => g.items).find(i => i.id === selectedArchetypeId) || PORTFOLIO_ARCHETYPES[0].items[0];
    }, [selectedArchetypeId]);

    const categoryColor = useMemo(() => {
        const cat = PORTFOLIO_ARCHETYPES.find(g => g.items.some(i => i.id === selectedArchetypeId));
        return cat ? cat.color : '#3b82f6';
    }, [selectedArchetypeId]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            alert(`Solução "${selectedArchetype.name}" criada com metodologia ativa para ${cityProfile.nome}!`);
            setIsSaving(false);
            onClose();
        }, 1000);
    };

    const handleGenerateAI = async () => {
        setIsGeneratingMatrix(true);
        try {
            const aiMatrix = await generateCurriculumStructure(cityProfile, activeJob.title, selectedArchetype.name);
            if (aiMatrix && aiMatrix.length > 0) {
                setCurriculumMatrix(aiMatrix);
                setIsAiGenerated(true);
            } else {
                alert("A IA retornou um resultado vazio. Tente novamente.");
            }
        } catch (e) {
            console.error(e);
            alert("Erro ao gerar ementa. Verifique sua conexão ou a chave de API.");
        } finally {
            setIsGeneratingMatrix(false);
        }
    };

    const handleResetMatrix = () => {
        const initialMatrix = generateCurriculumMatrix(activeJob.title, selectedArchetypeId);
        setCurriculumMatrix(initialMatrix);
        setIsAiGenerated(false);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[2000] p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden border border-slate-200" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Metodologia Ânima Agro</span>
                            <span className="text-slate-400 text-xs">•</span>
                            <span className="text-slate-500 text-xs font-bold">Diagnóstico: {activeJob.title}</span>
                        </div>
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            Design Instrucional & Impacto
                        </h2>
                    </div>
                    
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setActiveTab('methodology')}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2 ${activeTab === 'methodology' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <BrainCircuit size={16}/> Metodologia (Fink/Neuro)
                        </button>
                        <button 
                            onClick={() => setActiveTab('impact')}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2 ${activeTab === 'impact' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <TrendingUp size={16}/> Impacto (LRS)
                        </button>
                         <button 
                            onClick={() => setActiveTab('commercial')}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2 ${activeTab === 'commercial' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <DollarSign size={16}/> Business Plan
                        </button>
                    </div>

                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} className="text-slate-400"/>
                    </button>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    
                    {/* --- ABA 1: METODOLOGIA (FINK + NEURO) --- */}
                    {activeTab === 'methodology' && (
                        <>
                            {/* LEFT: Configurator */}
                            <aside className="w-1/3 bg-slate-50 border-r border-slate-200 overflow-y-auto custom-scrollbar p-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Formato da Solução</h3>
                                <div className="space-y-4">
                                    {PORTFOLIO_ARCHETYPES.map(group => (
                                        <div key={group.title}>
                                            <h4 className="text-[10px] font-bold text-slate-500 mb-2">{group.title}</h4>
                                            <div className="space-y-2">
                                                {group.items.map(item => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => setSelectedArchetypeId(item.id)}
                                                        className={`w-full text-left p-3 rounded-xl border transition-all ${selectedArchetypeId === item.id ? 'bg-white border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200'}`}
                                                    >
                                                        <span className="text-xs font-bold block">{item.name}</span>
                                                        <span className="text-[10px] text-slate-400">{item.duration_mask}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </aside>

                            {/* RIGHT: Framework Visualizer */}
                            <main className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                             <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <Heart size={14} className="text-rose-500"/> Taxonomia de Fink
                                            </h4>
                                            <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Aprendizagem Significativa</span>
                                        </div>
                                        <FinkRadar dna={selectedArchetype.dna} color={categoryColor} />
                                    </div>

                                    <div className="flex flex-col justify-center space-y-4">
                                        <div className="p-5 rounded-2xl border-l-4 bg-emerald-50 border-emerald-500">
                                            <h4 className="text-sm font-bold text-emerald-900 mb-1">Dualidade (Academia + Trabalho)</h4>
                                            <p className="text-xs text-emerald-800 leading-relaxed">
                                                Este desenho curricular integra a teoria diretamente com a prática do {activeJob.sector}. 
                                                Os módulos 4 e 5 focam em "Learning by Doing" dentro das empresas parceiras.
                                            </p>
                                        </div>
                                        <div className="p-5 rounded-2xl border-l-4 bg-purple-50 border-purple-500">
                                            <h4 className="text-sm font-bold text-purple-900 mb-1">Neuroaprendizagem</h4>
                                            <p className="text-xs text-purple-800 leading-relaxed">
                                                Estruturado para respeitar o ciclo cognitivo: Conexão Emocional → Exploração Conceitual → Aplicação Prática → Metacognição.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                            <Layers size={16}/> Matriz Neuro-Pedagógica
                                        </h3>
                                        
                                        {!isAiGenerated ? (
                                            <button 
                                                onClick={handleGenerateAI}
                                                disabled={isGeneratingMatrix}
                                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                                            >
                                                {isGeneratingMatrix ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                Gerar Ementa com IA
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                                    <CheckCircle2 size={14}/> Ementa Gerada
                                                </span>
                                                <button 
                                                    onClick={handleResetMatrix}
                                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
                                                    title="Resetar"
                                                >
                                                    <RotateCcw size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        {isGeneratingMatrix ? (
                                            <div className="py-12 text-center text-slate-400 flex flex-col items-center">
                                                <Loader2 size={32} className="animate-spin text-purple-500 mb-3" />
                                                <p className="text-xs font-medium">Analisando o território de {cityProfile.nome}...</p>
                                                <p className="text-xs">Criando módulos específicos para {activeJob.title}</p>
                                            </div>
                                        ) : (
                                            curriculumMatrix.map((mod) => (
                                                <div key={mod.order} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isAiGenerated ? 'bg-purple-100 text-purple-700' : 'bg-slate-900 text-white'}`}>
                                                        {mod.order}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm text-slate-800">{mod.title}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{mod.neuroPhase}</span>
                                                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{mod.finkDimension}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-mono text-slate-500 font-bold">{mod.hours}h</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </main>
                        </>
                    )}

                    {/* --- ABA 2: IMPACTO (LAKE) --- */}
                    {activeTab === 'impact' && (
                        <div className="flex-1 bg-slate-50 p-8 flex flex-col items-center justify-center">
                            <div className="max-w-2xl w-full">
                                <h3 className="text-2xl font-black text-slate-800 text-center mb-2">Simulação de Impacto Social</h3>
                                <p className="text-center text-slate-500 mb-8">Baseado em dados históricos do Data Lake para o território de {cityProfile.nome}.</p>
                                
                                <ImpactProjectionCard projection={impactProjection} isLoading={loadingImpact} />
                                
                                <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h4 className="text-sm font-bold text-slate-800 mb-4">Evidências do Lake</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-xs text-slate-600">
                                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5"/>
                                            <span>Em cidades com perfil similar (Ex: Rio Verde), cursos focados em {activeJob.sector} aumentaram a retenção de talentos em 15% (Caged 2023).</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-xs text-slate-600">
                                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5"/>
                                            <span>A introdução de metodologia Dual reduziu o tempo de onboarding nas empresas parceiras de 6 meses para 2 meses.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- ABA 3: COMMERCIAL (SIMPLIFICADO PARA DEMO) --- */}
                    {activeTab === 'commercial' && (
                         <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center text-center">
                             <Calculator size={64} className="text-slate-200 mb-4"/>
                             <h3 className="text-xl font-bold text-slate-800">Módulo Financeiro</h3>
                             <p className="text-slate-500 max-w-md mt-2">
                                 A análise de Unit Economics e Viabilidade Financeira está conectada aos parâmetros deste arquétipo ({selectedArchetype.custo}).
                             </p>
                             <button onClick={handleSave} className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2">
                                <Save size={18}/> Aprovar Solução
                             </button>
                         </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SolutionArchitectModal;
