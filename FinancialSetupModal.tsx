
import React, { useState } from 'react';
import { 
    Calculator, TrendingUp, Target, Landmark, Percent, 
    ArrowRight, Lightbulb, FileText, CheckCircle2, RotateCcw,
    Zap
} from 'lucide-react';
import type { GlobalFinancialConfig } from './types';
import { FinancialRepository } from './services/persistenceService'; // NOVO IMPORT

interface FinancialSetupModalProps {
    onSave: (config: GlobalFinancialConfig) => void;
    defaultConfig?: Partial<GlobalFinancialConfig>;
}

const FinancialSetupModal: React.FC<FinancialSetupModalProps> = ({ onSave, defaultConfig }) => {
    const [step, setStep] = useState<1 | 2>(1);
    
    // Estado do Formulário
    const [title, setTitle] = useState(defaultConfig?.projectTitle || 'Novo Plano de Expansão');
    const [thesis, setThesis] = useState(defaultConfig?.strategicThesis || 'Consolidar liderança em praças de agronegócio high-tech.');
    
    // Macro
    const [inflation, setInflation] = useState(defaultConfig?.inflationRate || 4.5);
    const [realGain, setRealGain] = useState(defaultConfig?.realTuitionIncrease || 2.0);
    const [salaryGap, setSalaryGap] = useState(defaultConfig?.salaryAdjustmentGap || 1.0);
    const [cdi, setCdi] = useState(defaultConfig?.cdiRate || 10.5);
    const [badDebt, setBadDebt] = useState(defaultConfig?.badDebtRate || 3.5);
    const [taxRate, setTaxRate] = useState(defaultConfig?.incomeTaxRate || 34.0);
    const [wcCycle, setWcCycle] = useState(defaultConfig?.workingCapitalCycle || 30);
    
    const handleNext = () => setStep(2);
    
    const handleFinish = () => {
        onSave({
            projectTitle: title,
            strategicThesis: thesis,
            inflationRate: Number(inflation),
            realTuitionIncrease: Number(realGain),
            salaryAdjustmentGap: Number(salaryGap),
            cdiRate: Number(cdi),
            badDebtRate: Number(badDebt),
            incomeTaxRate: Number(taxRate),
            workingCapitalCycle: Number(wcCycle)
        });
    };

    const handleFactoryReset = async () => {
        if (confirm("ATENÇÃO: Isso apagará todas as simulações e dados financeiros salvos localmente. Deseja continuar?")) {
            await FinancialRepository.factoryReset(); // Usando Repository
            window.location.reload();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[3000] p-4 animate-fade-in">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
                
                {/* Header */}
                <div className="bg-slate-50 p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
                                <Calculator size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Financial Engine V8</h2>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Setup de Governança Financeira</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-green-500'}`}></div>
                        <div className={`w-8 h-1 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-200'}`}></div>
                    </div>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="text-purple-500" size={24}/>
                                <h3 className="text-lg font-bold text-slate-800">1. Arquitetura da Ambição</h3>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nome do Projeto</label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Ex: Plano Diretor 2030"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Tese Estratégica (North Star)</label>
                                <textarea 
                                    value={thesis}
                                    onChange={(e) => setThesis(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:ring-2 focus:ring-purple-500 outline-none h-32 resize-none"
                                    placeholder="Descreva a visão de longo prazo..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={handleFactoryReset}
                                    className="px-6 py-4 bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-100"
                                    title="Limpar todos os dados e reiniciar"
                                >
                                    <RotateCcw size={16}/> Reset
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                                >
                                    Definir Macroeconomia <ArrowRight size={16}/>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Landmark className="text-emerald-600" size={24}/>
                                    <h3 className="text-lg font-bold text-slate-800">2. Premissas Macroeconômicas</h3>
                                </div>
                                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                                    <Zap size={10}/> Projeção Ativa
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Inflação */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase mb-2">
                                        <TrendingUp size={14}/> IPCA Projetado (a.a.)
                                    </label>
                                    <div className="flex items-center">
                                        <input 
                                            type="number" step="0.1" 
                                            value={inflation} onChange={e => setInflation(Number(e.target.value))}
                                            className="w-full bg-transparent font-black text-2xl text-slate-800 outline-none"
                                        />
                                        <Percent size={16} className="text-slate-400"/>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 font-bold">Base para Custos Gerais</p>
                                </div>

                                {/* Ganho Real */}
                                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                    <label className="flex items-center gap-2 text-xs font-black text-emerald-700 uppercase mb-2">
                                        <TrendingUp size={14}/> Ganho Real Mensalidade
                                    </label>
                                    <div className="flex items-center">
                                        <input 
                                            type="number" step="0.1" 
                                            value={realGain} onChange={e => setRealGain(Number(e.target.value))}
                                            className="w-full bg-transparent font-black text-2xl text-emerald-700 outline-none"
                                        />
                                        <Percent size={16} className="text-emerald-500"/>
                                    </div>
                                    <p className="text-[10px] text-emerald-600 mt-1 font-bold">Acima da inflação (Receitas)</p>
                                </div>

                                {/* Inadimplência */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase mb-2">
                                        <FileText size={14}/> Inadimplência (PDM)
                                    </label>
                                    <div className="flex items-center">
                                        <input 
                                            type="number" step="0.1" 
                                            value={badDebt} onChange={e => setBadDebt(Number(e.target.value))}
                                            className="w-full bg-transparent font-black text-2xl text-red-500 outline-none"
                                        />
                                        <Percent size={16} className="text-slate-400"/>
                                    </div>
                                </div>

                                {/* Imposto Renda */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase mb-2">
                                        <Landmark size={14}/> Alíquota IRPJ/CSLL
                                    </label>
                                    <div className="flex items-center">
                                        <input 
                                            type="number" step="1" 
                                            value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                                            className="w-full bg-transparent font-black text-2xl text-slate-800 outline-none"
                                        />
                                        <Percent size={16} className="text-slate-400"/>
                                    </div>
                                </div>
                            </div>

                            {/* CDI, Salário e Capital de Giro */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">CDI / Taxa Livre</label>
                                    <div className="flex items-center gap-1">
                                        <input 
                                            type="number" value={cdi} onChange={e => setCdi(Number(e.target.value))}
                                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold"
                                        />
                                        <span className="text-xs font-bold text-slate-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-blue-500 uppercase">Dissídio Real</label>
                                    <div className="flex items-center gap-1">
                                        <input 
                                            type="number" value={salaryGap} onChange={e => setSalaryGap(Number(e.target.value))}
                                            className="w-full bg-blue-50 border border-blue-200 text-blue-700 rounded px-2 py-1 text-sm font-bold"
                                        />
                                        <span className="text-xs font-bold text-blue-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Ciclo de Caixa</label>
                                    <div className="flex items-center gap-1">
                                        <input 
                                            type="number" value={wcCycle} onChange={e => setWcCycle(Number(e.target.value))}
                                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold"
                                        />
                                        <span className="text-xs font-bold text-slate-500">dias</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200"
                                >
                                    Voltar
                                </button>
                                <button 
                                    onClick={handleFinish}
                                    className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                                >
                                    <CheckCircle2 size={18}/> Aplicar e Recalcular
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialSetupModal;
