import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, ReferenceLine, Area
} from 'recharts';
import { 
  Calculator, DollarSign, TrendingUp, Users, 
  Download, Settings, RefreshCcw, Building2, Wallet, AlertTriangle, Table, LayoutTemplate, Layers,
  Globe, ChevronRight, ChevronLeft, FileSpreadsheet, Anchor, Target, Upload, Save,
  Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, Shield, Sigma,
  Filter, Box, Megaphone, Coins, Percent, Zap, Package, MapPin, Trash2, ToggleRight, ToggleLeft,
  MessageSquare, GraduationCap, Factory, Network, CheckCircle2, Pause, Play, Database,
  ArrowUpRight, HeartPulse, Scale, Flame, Landmark, Hourglass, Clock
} from 'lucide-react';
import { formatNumber } from './constants';
import { YEAR_LABELS, YEARS } from './types';
import { 
  FinancialModelResult, 
  convertSheetToModelResult,
  generateSmartDefaults
} from './services/financialModelingService';
import { SheetData, generateFullProjectStructure, DEFAULT_HERITAGE, DEFAULT_GLOBAL_CONFIG } from './services/financialSheetFactory';
import { recalculateSheet, consolidateSheets } from './services/sheetCalculationService';
import { exportFinancialModelToExcel } from './services/excelExportService'; 
import FinancialSheetTable from './FinancialSheetTable';
import FinancialSetupModal from './FinancialSetupModal'; 
import ExportOptionsModal from './components/ExportOptionsModal'; 
import StrategicCanvas from './StrategicCanvas'; 
import FinancialWaterfallChart from './FinancialWaterfallChart'; 
import UnitEconomicsCard from './components/UnitEconomicsCard'; 
import EbitdaMixChart from './EbitdaMixChart';
import type { MunicipioPerfil, GlobalFinancialConfig, HeritageConfig, YearKey } from './types'; 
import { FinancialRepository } from './services/persistenceService';
import ChatWidget from './ChatWidget';

interface FinancialViabilityStudioProps {
  cityProfile?: MunicipioPerfil;
}

const KPICard = ({ label, value, sub, icon: Icon, color, trend, isPV }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
        {isPV && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter">VP</div>
        )}
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${color.bg} ${color.text}`}>
                <Icon size={18} />
            </div>
            {trend && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-black text-slate-800 tracking-tight">{value}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">{sub}</p>
        </div>
    </div>
);

const FinancialAssumptionFooter: React.FC<{ config: GlobalFinancialConfig | null }> = ({ config }) => {
    const activeConfig = config || DEFAULT_GLOBAL_CONFIG;
    const ipca = activeConfig.inflationRate;
    const cdi = activeConfig.cdiRate;
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-2 z-[100] shadow-2xl flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-6 pl-4">
                <div className="flex items-center gap-2">
                    <Shield size={12} className="text-emerald-500"/>
                    <span className="font-bold text-slate-300 uppercase tracking-widest">Premissas Macro (V9.1)</span>
                </div>
                <div className="flex items-center gap-4 border-l border-slate-700 pl-4">
                    <span>IPCA: <strong className="text-white">{ipca.toFixed(1)}%</strong></span>
                    <span>CDI: <strong className="text-white">{cdi.toFixed(1)}%</strong></span>
                    <span>WACC: <strong className="text-amber-400">{(cdi + 4.0).toFixed(1)}%</strong></span>
                </div>
            </div>
            <div className="flex items-center gap-4 pr-4">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-500">Cenário Base</span>
            </div>
        </div>
    );
};

const FinancialViabilityStudio: React.FC<FinancialViabilityStudioProps> = ({ cityProfile }) => {
  const [globalConfig, setGlobalConfig] = useState<GlobalFinancialConfig>(DEFAULT_GLOBAL_CONFIG);
  const [isSetupOpen, setIsSetupOpen] = useState(false); 
  const [isExportOpen, setIsExportOpen] = useState(false); 
  const [heritageConfig, setHeritageConfig] = useState<HeritageConfig>(DEFAULT_HERITAGE);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeViewId, setActiveViewId] = useState<string>('canvas'); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [consolidatedFilter, setConsolidatedFilter] = useState<'all' | 'territory' | 'products'>('all');
  const [includeSimulations, setIncludeSimulations] = useState(false); 
  
  // NOVO: Estado para alternar entre Nominal e Valor Presente
  const [isPVMode, setIsPVMode] = useState(false);

  useEffect(() => {
    const init = async () => {
        try {
            const loadedSheets = await FinancialRepository.loadSheets();
            const loadedConfig = await FinancialRepository.loadGlobalConfig();
            const loadedHeritage = await FinancialRepository.loadHeritage();
            
            if (loadedConfig) setGlobalConfig(loadedConfig);
            if (loadedHeritage) setHeritageConfig(loadedHeritage);
            
            const factoryStructure = generateFullProjectStructure();
            let finalSheets: SheetData[] = [];

            if (!loadedSheets || loadedSheets.length === 0) {
                finalSheets = factoryStructure;
            } else {
                finalSheets = [...loadedSheets];
                factoryStructure.forEach(fs => {
                    if (!finalSheets.find(ls => ls.id === fs.id)) {
                        finalSheets.push(fs);
                    }
                });
            }

            const calculated = finalSheets.map(s => recalculateSheet(s, loadedConfig || DEFAULT_GLOBAL_CONFIG));
            setSheets(calculated);
            setIsDataLoaded(true);
        } catch (error) {
            console.error("Erro fatal no carregamento do Financial Studio:", error);
            setSheets(generateFullProjectStructure().map(s => recalculateSheet(s, DEFAULT_GLOBAL_CONFIG)));
            setIsDataLoaded(true);
        }
    };
    init();
  }, []);

  useEffect(() => {
      if (isDataLoaded && sheets.length > 0) {
          FinancialRepository.saveSheets(sheets);
          FinancialRepository.saveHeritage(heritageConfig);
          FinancialRepository.saveGlobalConfig(globalConfig);
      }
  }, [sheets, heritageConfig, globalConfig, isDataLoaded]);

  const consolidatedSheet = useMemo(() => {
      if (!isDataLoaded || sheets.length === 0) return null;
      const eligible = includeSimulations ? sheets : sheets.filter(s => !s.isSimulation);
      let filterIds: string[] | undefined = undefined;
      let name = "Consolidado Total";
      
      if (consolidatedFilter === 'territory') {
          filterIds = eligible.filter(s => s.type === 'unit').map(s => s.id);
          name = "Σ Expansão Territorial";
      } else if (consolidatedFilter === 'products') {
          filterIds = eligible.filter(s => s.type === 'product' || s.type === 'b2b_project' || s.type === 'hybrid_course').map(s => s.id);
          name = "Σ Novos Produtos";
      } else {
          filterIds = eligible.map(s => s.id);
      }
      return consolidateSheets(sheets, filterIds, name);
  }, [sheets, consolidatedFilter, includeSimulations, isDataLoaded]);

  const activeResult: FinancialModelResult | null = useMemo(() => {
      if (!isDataLoaded) return null;
      const target = activeViewId === 'consolidado' ? consolidatedSheet : sheets.find(s => s.id === activeViewId);
      return target ? convertSheetToModelResult(target, globalConfig) : null;
  }, [activeViewId, consolidatedSheet, sheets, isDataLoaded, globalConfig]);

  const handleUpdateSheet = (updated: SheetData) => {
      const recalculated = recalculateSheet(updated, globalConfig);
      setSheets(prev => prev.map(s => s.id === recalculated.id ? recalculated : s));
  };

  const confirmExport = (mode: 'current' | 'all') => {
      const sheet = activeViewId === 'consolidado' ? consolidatedSheet : sheets.find(s => s.id === activeViewId);
      if (mode === 'current' && sheet) {
          exportFinancialModelToExcel([sheet], globalConfig, `DRE_${sheet.name}`, 'current');
      } else if (mode === 'all') {
          exportFinancialModelToExcel(sheets, globalConfig, 'Modelo_Financeiro_Completo', 'all');
      }
      setIsExportOpen(false);
  };

  const exportToJson = () => {
    const exportData = {
        modelName: "RogerLens Financial Model",
        version: "9.2",
        exportedAt: new Date().toISOString(),
        globalConfig,
        heritageConfig,
        sheets
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RogerLens_Financial_Data_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getSidebarIcon = (type: string, isSelected: boolean) => {
    const color = isSelected ? 'text-white' : 'text-slate-400';
    switch(type) {
        case 'unit': return <Building2 size={14} className={color}/>;
        case 'product': 
        case 'hybrid_course': return <Package size={14} className={color}/>;
        case 'b2b_project': return <Zap size={14} className={color}/>;
        case 'team': return <Users size={14} className={color}/>;
        case 'transformation_project': return <RefreshCcw size={14} className={color}/>;
        default: return <FileSpreadsheet size={14} className={color}/>;
    }
  };

  if (!isDataLoaded) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
            <Calculator size={48} className="text-slate-300 animate-bounce mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Carregando Inteligência Financeira...</p>
        </div>
      );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6 pb-24 animate-fade-in flex flex-col gap-6 relative overflow-hidden">
      {isSetupOpen && <FinancialSetupModal onSave={(c) => { setGlobalConfig(c); setIsSetupOpen(false); }} defaultConfig={globalConfig} />}
      {isExportOpen && <ExportOptionsModal onClose={() => setIsExportOpen(false)} onConfirm={confirmExport} currentSheetName={activeViewId === 'consolidado' ? 'Consolidado' : (sheets.find(s => s.id === activeViewId)?.name || '')} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg bg-indigo-900 shadow-indigo-900/20">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Financial Studio <span className="text-indigo-600">V9.2</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Business Case & Valuation</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button onClick={() => setIsSetupOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-slate-50 transition-all shadow-sm"><Settings size={16}/> Setup</button>
            <button onClick={exportToJson} className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-slate-200 transition-all shadow-sm" title="Baixar dados brutos em JSON"><Database size={16}/> JSON</button>
            <button onClick={() => setIsExportOpen(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30"><Download size={16}/> Export</button>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-220px)] overflow-hidden">
          <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} flex flex-col gap-6 shrink-0 bg-slate-900 rounded-[2rem] p-3 overflow-y-auto custom-scrollbar transition-all duration-300 shadow-2xl`}>
              <div className="px-3 py-2 flex justify-between items-center">
                  {!isSidebarCollapsed && <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Clusters DRE</span>}
                  <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 mx-auto">
                    {isSidebarCollapsed ? <PanelLeftOpen size={16}/> : <PanelLeftClose size={16}/>}
                  </button>
              </div>

              <div className="space-y-1">
                  <button onClick={() => setActiveViewId('canvas')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeViewId === 'canvas' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                      <Globe size={16}/> {!isSidebarCollapsed && "Strategic Canvas"}
                  </button>
                  <div className="space-y-0.5">
                    <button onClick={() => { setActiveViewId('consolidado'); setConsolidatedFilter('all'); }} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeViewId === 'consolidado' && consolidatedFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                        <Sigma size={16}/> {!isSidebarCollapsed && "Consolidado Total"}
                    </button>
                    {!isSidebarCollapsed && activeViewId === 'consolidado' && (
                        <div className="ml-8 space-y-1 mt-1 border-l border-white/10 pl-3">
                            <button onClick={() => setConsolidatedFilter('territory')} className={`text-[10px] uppercase font-black block py-1 transition-all ${consolidatedFilter === 'territory' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>Σ Território</button>
                            <button onClick={() => setConsolidatedFilter('products')} className={`text-[10px] uppercase font-black block py-1 transition-all ${consolidatedFilter === 'products' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>Σ Produtos</button>
                        </div>
                    )}
                  </div>
              </div>

              <div className="space-y-1">
                  {!isSidebarCollapsed && <p className="px-4 text-[9px] font-black text-slate-600 uppercase mb-2">Expansão Territorial</p>}
                  {sheets.filter(s => s.type === 'unit').map(sheet => (
                      <button key={sheet.id} onClick={() => setActiveViewId(sheet.id)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeViewId === sheet.id ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:bg-white/5'}`}>
                          {getSidebarIcon(sheet.type, activeViewId === sheet.id)}
                          {!isSidebarCollapsed && <span className="truncate">{sheet.name}</span>}
                      </button>
                  ))}
              </div>

              <div className="space-y-1">
                  {!isSidebarCollapsed && <p className="px-4 text-[9px] font-black text-slate-600 uppercase mb-2">Produtos & Serviços</p>}
                  {sheets.filter(s => s.type === 'product' || s.type === 'b2b_project' || s.type === 'hybrid_course').map(sheet => (
                      <button key={sheet.id} onClick={() => setActiveViewId(sheet.id)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeViewId === sheet.id ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:bg-white/5'}`}>
                          {getSidebarIcon(sheet.type, activeViewId === sheet.id)}
                          {!isSidebarCollapsed && <span className="truncate">{sheet.name}</span>}
                      </button>
                  ))}
              </div>

              <div className="space-y-1">
                  {!isSidebarCollapsed && <p className="px-4 text-[9px] font-black text-slate-600 uppercase mb-2">Estrutura & Projetos</p>}
                  {sheets.filter(s => s.type === 'team' || s.type === 'transformation_project').map(sheet => (
                      <button key={sheet.id} onClick={() => setActiveViewId(sheet.id)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeViewId === sheet.id ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:bg-white/5'}`}>
                          {getSidebarIcon(sheet.type, activeViewId === sheet.id)}
                          {!isSidebarCollapsed && <span className="truncate">{sheet.name}</span>}
                      </button>
                  ))}
              </div>
          </aside>

          <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
              {activeViewId === 'canvas' ? (
                  <StrategicCanvas heritage={heritageConfig} onUpdateHeritage={setHeritageConfig} sheets={sheets} onNavigateToDetail={setActiveViewId} onAddSheet={() => {}} />
              ) : (
                  <div className="space-y-8 animate-fade-in pb-12">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-8 gap-4">
                          <div>
                              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
                                  {activeViewId === 'consolidado' ? consolidatedSheet?.name : sheets.find(s => s.id === activeViewId)?.name}
                              </h2>
                              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit mt-1">
                                <CheckCircle2 size={12} className="text-emerald-500" /> Sincronizado V9.2
                              </div>
                          </div>

                          <div className="flex items-center gap-4">
                              {/* TOGGLE NOMINAL VS VALOR PRESENTE */}
                              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-inner">
                                  <span className={`text-[10px] font-black uppercase transition-colors ${!isPVMode ? 'text-slate-900' : 'text-slate-400'}`}>Nominal</span>
                                  <button 
                                      onClick={() => setIsPVMode(!isPVMode)}
                                      className="relative w-10 h-5 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300"
                                  >
                                      <div className={`w-3 h-3 bg-indigo-600 rounded-full shadow-md transform transition-transform ${isPVMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                  </button>
                                  <span className={`text-[10px] font-black uppercase transition-colors ${isPVMode ? 'text-indigo-600' : 'text-slate-400'}`}>Valor Presente</span>
                              </div>

                              {activeViewId === 'consolidado' && (
                                  <div className="bg-slate-100 p-1 rounded-xl flex gap-1 shadow-inner border border-slate-200">
                                      <button 
                                        onClick={() => setConsolidatedFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${consolidatedFilter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                      >
                                          Total
                                      </button>
                                      <button 
                                        onClick={() => setConsolidatedFilter('territory')}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${consolidatedFilter === 'territory' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                      >
                                          Expansão Territorial
                                      </button>
                                      <button 
                                        onClick={() => setConsolidatedFilter('products')}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${consolidatedFilter === 'products' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                      >
                                          Novos Produtos
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>

                      {activeResult ? (
                          <>
                            {/* DASHBOARD DE PERFORMANCE (KPI GRID) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <KPICard 
                                    label="TIR (IRR) Projeto" 
                                    value={`${activeResult.kpis.tir.toFixed(1)}%`} 
                                    sub="Taxa Interna de Retorno" 
                                    icon={TrendingUp} 
                                    color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
                                />
                                <KPICard 
                                    label={isPVMode ? "VPL (NPV)" : "Fluxo Acumulado"} 
                                    value={`R$ ${formatNumber((isPVMode ? activeResult.kpis.vpl : activeResult.kpis.cashFlowAccumFinal) / 1000000)}M`} 
                                    sub={isPVMode ? `Discount Rate: ${(globalConfig.cdiRate + 4).toFixed(1)}%` : "Resultado de 10 Anos"} 
                                    icon={isPVMode ? Landmark : Sigma} 
                                    color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                                    isPV={isPVMode}
                                />
                                <KPICard 
                                    label={isPVMode ? "RB 2030 (VP)" : "Receita Bruta (2030)"} 
                                    value={`R$ ${formatNumber((isPVMode ? activeResult.kpis.rb2030vp : activeResult.kpis.rb2030) / 1000000)}M`} 
                                    sub={isPVMode ? "Receita Bruta 2030 a Valor Presente" : "Faturamento Bruto Nominal"} 
                                    icon={Hourglass} 
                                    color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
                                    isPV={isPVMode}
                                />
                                <KPICard 
                                    label="Payback Estimado" 
                                    value={`${activeResult.kpis.paybackAnos.toFixed(1)} Anos`} 
                                    sub="Retorno do Capital Total" 
                                    icon={Clock} 
                                    color={{ bg: 'bg-amber-50', text: 'text-amber-600' }}
                                />
                                
                                {/* SEGUNDA LINHA DE KPIs ESTRATÉGICOS (CONSOLIDADO ONLY) */}
                                {activeViewId === 'consolidado' && (
                                    <>
                                        <KPICard 
                                            label={isPVMode ? "Capital Empregado (VP)" : "CAPEX + Cash Burn"} 
                                            value={`R$ ${formatNumber((isPVMode ? activeResult.kpis.totalProjectCostvp : activeResult.kpis.totalProjectCost) / 1000000)}M`} 
                                            sub="Custo Total da Estratégia" 
                                            icon={Flame} 
                                            color={{ bg: 'bg-rose-50', text: 'text-rose-600' }}
                                            isPV={isPVMode}
                                        />
                                        <KPICard 
                                            label={isPVMode ? "CAPEX (VP)" : "CAPEX (Nominal)"} 
                                            value={`R$ ${formatNumber((isPVMode ? activeResult.kpis.totalCapexvp : activeResult.kpis.totalCapex) / 1000000)}M`} 
                                            sub="Investimento em Ativos/Setup" 
                                            icon={Building2} 
                                            color={{ bg: 'bg-slate-50', text: 'text-slate-600' }}
                                            isPV={isPVMode}
                                        />
                                        <KPICard 
                                            label={isPVMode ? "Cash Burn (VP)" : "Cash Burn (Op.)"} 
                                            value={`R$ ${formatNumber((isPVMode ? activeResult.kpis.totalCashBurnvp : activeResult.kpis.totalCashBurn) / 1000000)}M`} 
                                            sub="Prejuízo Operacional até Breakeven" 
                                            icon={HeartPulse} 
                                            color={{ bg: 'bg-orange-50', text: 'text-orange-600' }}
                                            isPV={isPVMode}
                                        />
                                        <KPICard 
                                            label="Margem EBITDA LP" 
                                            value={`${activeResult.kpis.margemEbitdaLongoPrazo.toFixed(1)}%`} 
                                            sub="Maturidade (Ano 10)" 
                                            icon={Scale} 
                                            color={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }}
                                        />
                                    </>
                                )}
                            </div>

                            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                <FinancialSheetTable 
                                    sheet={activeViewId === 'consolidado' ? consolidatedSheet! : sheets.find(s => s.id === activeViewId)!} 
                                    onUpdate={handleUpdateSheet} 
                                    recalculate={(s) => recalculateSheet(s, globalConfig)}
                                    globalConfig={globalConfig}
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-[500px]">
                                    <FinancialWaterfallChart model={activeResult} />
                                </div>
                                
                                {activeViewId === 'consolidado' && (
                                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-[500px]">
                                        <EbitdaMixChart sheets={sheets} filterType={consolidatedFilter} />
                                    </div>
                                )}
                            </div>
                            
                            {activeViewId !== 'consolidado' && (
                                <div className="w-full mt-8">
                                    <UnitEconomicsCard sheet={sheets.find(s => s.id === activeViewId)!} />
                                </div>
                            )}
                          </>
                      ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20">
                              <AlertTriangle size={48} className="mb-4" />
                              <p className="font-bold">Selecione uma DRE para visualizar os dados.</p>
                          </div>
                      )}
                  </div>
              )}
          </main>
      </div>

      <FinancialAssumptionFooter config={globalConfig} />
      {activeResult && (
        <ChatWidget 
            initialMessage="Analisando o cenário financeiro consolidado..."
            contextPrompt={`DRE ATIVA: ${activeViewId}. TIR: ${activeResult.kpis.tir.toFixed(1)}%. VPL: R$ ${formatNumber(activeResult.kpis.vpl / 1000000)}M. Modo: ${isPVMode ? 'Valor Presente' : 'Nominal'}.`}
            buttonClassName="bottom-20 right-6"
        />
      )}
    </div>
  );
};

export default FinancialViabilityStudio;
