import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Play, FileText, DoorOpen, Calendar, 
  PenTool, CheckCircle, ChevronRight, FileAudio,
  Building2, Globe, AlertTriangle, Network, Activity, 
  Layers, Wallet, Calculator, Target, Quote, Sprout, Zap,
  AlertCircle, TrendingUp, ShieldAlert, Check, LayoutGrid, Box, Sigma,
  Loader2, Pause
} from 'lucide-react';
import { 
    ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Legend, Bar 
} from 'recharts';

// Importação das Sub-visões
import FourDoorsView from './FourDoorsView';
import ActionRoadmapView from './ActionRoadmapView';
import FinalReflectionView from './FinalReflectionView';
import FinalQuizView from './FinalQuizView';
import BusinessModelCanvasView from './BusinessModelCanvasView';

// --- Imports Financeiros V8 ---
import { generateFullProjectStructure } from './services/financialSheetFactory';
import { consolidateSheets, recalculateSheet } from './services/sheetCalculationService';
import { convertSheetToModelResult, generateSmartDefaults } from './services/financialModelingService';
import { formatNumber, MUNICIPIOS_PERFIL } from './constants';
import { SheetData, MunicipioPerfil } from './types';
import { generateMarketAnalysis, generateAudioBriefing } from './services/geminiService';

// --- HELPER FUNCTIONS FOR AUDIO DECODING ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- COMPONENTES DO RESUMO EXECUTIVO ---

const IdeaCard = ({ number, title, icon: Icon, children }: any) => (
    <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Ideia</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {number}
            </div>
            <div className="w-px h-full bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>
        </div>
        <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    </div>
);

const AudioPlayer = ({ textToSpeak }: { textToSpeak: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        return () => {
            if (sourceNodeRef.current) sourceNodeRef.current.stop();
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    const handlePlay = async () => {
        if (isPlaying) {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current = null;
            }
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') await ctx.resume();
            let buffer = audioBuffer;
            if (!buffer) {
                const base64Audio = await generateAudioBriefing(textToSpeak);
                const bytes = decode(base64Audio);
                buffer = await decodeAudioData(bytes, ctx, 24000, 1);
                setAudioBuffer(buffer);
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.onended = () => setIsPlaying(false);
            source.start();
            sourceNodeRef.current = source;
            setIsPlaying(true);
        } catch (e) {
            console.error("Audio Playback Error:", e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-lg border border-slate-700">
            <button 
                onClick={handlePlay}
                disabled={isLoading}
                className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 hover:scale-105 transition-transform shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1"/>}
            </button>
            <div className="flex-1">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Áudio Briefing (IA)</p>
                <p className="text-sm font-medium text-white">{isLoading ? "Gerando áudio..." : isPlaying ? "Reproduzindo..." : "Ouvir Resumo Executivo"}</p>
                <div className="w-full h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                    <div className={`h-full bg-emerald-500 rounded-full transition-all duration-1000 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
};

const FinancialSnapshotWidget = ({ cityProfile }: { cityProfile?: MunicipioPerfil }) => {
    const financialData = useMemo(() => {
        try {
            const allSheets = generateFullProjectStructure().map(s => recalculateSheet(s, null));
            let cityResult = null;
            
            if (cityProfile) {
                const existingSheetId = `unit_${cityProfile.municipio_id}`;
                const existing = allSheets.find(s => s.id === existingSheetId);
                if (existing) {
                    cityResult = convertSheetToModelResult(existing);
                } else {
                    const defaults = generateSmartDefaults(cityProfile);
                    const revenueEst = defaults.alunosAno1 * 4 * defaults.mensalidadeInicial * 12; 
                    const ebitdaEst = revenueEst * 0.40;
                    cityResult = {
                        projecoes: Array(10).fill(null).map((_, i) => ({ ano: i+1, margemEbitda: 40, fluxoCaixaAcumulado: 0 })),
                        kpis: { paybackAnos: 3.5, vpl: 0, tir: 35, roi3anos: 150, ebitdaAno5: ebitdaEst, pontoEquilibrioAlunos: 300 }
                    } as any;
                }
            } else {
                 const goianiaSheet = allSheets.find(s => s.id === 'sede_goiania');
                 cityResult = goianiaSheet ? convertSheetToModelResult(goianiaSheet) : null;
            }
            
            const consolidatedSheet = consolidateSheets(allSheets);
            const totalResult = convertSheetToModelResult(consolidatedSheet);
            return { cityResult, totalResult };
        } catch (e) {
            console.error("Error generating snapshot:", e);
            return { cityResult: null, totalResult: null };
        }
    }, [cityProfile]);

    const { cityResult, totalResult } = financialData;
    if (!totalResult) return null;

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden mb-16 border border-slate-800">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Calculator size={300} />
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Wallet size={12} /> Financial Studio V8 Integration
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Viabilidade Econômica</h2>
                        <p className="text-slate-400 text-sm mt-1">Projeção de Maturidade (Ano 5) • {cityProfile ? cityProfile.nome : 'Hub Sede'} vs. Consolidado</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">EBITDA Consolidado (Ano 5)</p>
                        <p className="text-4xl font-black text-emerald-400">R$ {formatNumber(totalResult.kpis.ebitdaAno5 / 1000000)} MM</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                            <Building2 className="text-blue-400" size={20}/> {cityProfile ? cityProfile.nome : 'Goiânia'}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">EBITDA (Ano 5)</span>
                                <span className="font-mono font-bold text-white">R$ {formatNumber((cityResult?.kpis.ebitdaAno5 || 0) / 1000000)} MM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">ROI (3 Anos)</span>
                                <span className="font-mono font-bold text-white">{(cityResult?.kpis.roi3anos || 0).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                            <Globe className="text-purple-400" size={20}/> Visão Nacional
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-slate-400">EBITDA (Ano 5)</span>
                                <span className="font-mono font-bold text-white">R$ {formatNumber(totalResult.kpis.ebitdaAno5 / 1000000)} MM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Alavancagem ROI</span>
                                <span className="font-mono font-bold text-white">{(totalResult.kpis.roi3anos).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExecutiveSummaryContent = ({ selectedProfile }: { selectedProfile?: MunicipioPerfil }) => {
    const [dynamicSummary, setDynamicSummary] = useState<string | null>(null);
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        const fetchSummary = async () => {
            if (selectedProfile) {
                setLoadingSummary(true);
                const summary = await generateMarketAnalysis(
                    `Gere um "Parecer Tático do Relator" (max 150 palavras) para a cidade de ${selectedProfile.nome}. Foque em: Potencial Financeiro e Recomendação Final.`, 
                    selectedProfile
                );
                setDynamicSummary(summary);
                setLoadingSummary(false);
            }
        };
        fetchSummary();
    }, [selectedProfile]);

    const textForAudio = dynamicSummary 
        ? `Resumo Executivo para ${selectedProfile?.nome}. ${dynamicSummary}` 
        : "Resumo Executivo Institucional Ânima Agro. Nossa tese é liderar a educação no agronegócio.";

    return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans animate-fade-in">
        <div className="bg-white border-b border-slate-200 px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6">
                    <FileText size={12} /> Carta ao Stakeholder
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                    Resumo Executivo
                </h1>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
            <AudioPlayer textToSpeak={textForAudio} />
            {selectedProfile && (
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl mb-8 relative overflow-hidden border border-indigo-500/30">
                    <div className="relative z-10">
                        <h3 className="text-lg font-black uppercase tracking-widest text-emerald-400 mb-4">Parecer Tático: {selectedProfile.nome}</h3>
                        {loadingSummary ? <Loader2 className="animate-spin" size={20} /> : <p className="text-sm font-medium leading-relaxed">{dynamicSummary}</p>}
                    </div>
                </div>
            )}
            <FinancialSnapshotWidget cityProfile={selectedProfile} />
        </div>
    </div>
    );
};

type SynthesisTab = 'summary' | 'doors' | 'roadmap' | 'canvas' | 'quiz' | 'reflection';

const SynthesisView: React.FC<{ selectedProfile?: MunicipioPerfil }> = ({ selectedProfile }) => {
  const [activeTab, setActiveTab] = useState<SynthesisTab>('summary');
  const activeCity = selectedProfile || MUNICIPIOS_PERFIL[0];

  const TABS = [
    { id: 'summary', label: 'Resumo Executivo', icon: FileText, desc: 'A Tese em 5 min' },
    { id: 'canvas', label: 'Canvas de Negócio', icon: LayoutGrid, desc: 'Modelo & Riscos' },
    { id: 'doors', label: '4 Portas', icon: DoorOpen, desc: 'Seu Perfil' },
    { id: 'roadmap', label: 'Roteiro 90 Dias', icon: Calendar, desc: 'Plano de Voo' },
    { id: 'reflection', label: 'Reflexão', icon: PenTool, desc: 'Manifesto Pessoal' },
    { id: 'quiz', label: 'Micro-Quiz', icon: CheckCircle, desc: 'Consolidação' },
  ];

  const ActiveComponent = () => {
      switch(activeTab) {
          case 'summary': return <ExecutiveSummaryContent selectedProfile={selectedProfile} />;
          case 'canvas': return <BusinessModelCanvasView city={activeCity} />;
          case 'doors': return <FourDoorsView />;
          case 'roadmap': return <ActionRoadmapView />;
          case 'reflection': return <FinalReflectionView />;
          case 'quiz': return <FinalQuizView />;
          default: return <ExecutiveSummaryContent selectedProfile={selectedProfile} />;
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
        <div className="bg-white border-b border-slate-200 z-40 shrink-0">
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <FileAudio className="text-slate-700" size={24}/> Síntese Executiva
                    </h1>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as SynthesisTab)}
                            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all min-w-[100px] border ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                        >
                            <tab.icon size={14} className={activeTab === tab.id ? 'text-emerald-400' : 'text-slate-400'} />
                            <span className="text-[10px] font-black uppercase tracking-wide">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0 bg-[#fcfbf9]">
            <ActiveComponent />
        </div>
    </div>
  );
};

export default SynthesisView;
