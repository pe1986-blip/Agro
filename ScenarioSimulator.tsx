
import React, { useState, useMemo, useEffect } from 'react';
import { Zap, DollarSign, Users, TrendingDown, TrendingUp as TrendingUpIcon, AlertTriangle, BrainCircuit } from 'lucide-react';
import { getPriceElasticity, ElasticityModel } from './services/predictiveAnalyticsService';
import { useRealTimeData } from './services/realTimeSyncService';

// --- TYPES ---
interface ScenarioMetrics {
    enrollmentChange: number; // %
    retentionChange: number; // %
    revenueChange: number; // %
}

interface Scenario {
    name: string;
    impact: number; // Multiplicador de impacto (0.5 a 1.5)
}

interface SimulatorState {
    agroPriceDrop: number; // Queda no preço da commodity (0-100)
    droughtSeverity: number; // Severidade da seca (0-100)
    tuitionChange: number; // Variação no preço da mensalidade (-20 a +20)
}

// --- CONFIG ---
const BASE_ENROLLMENT = 1200;
const BASE_RETENTION = 85; // %
const BASE_REVENUE_PER_STUDENT = 12000; // R$ Anual

const scenarios: Scenario[] = [
    { name: 'Base Case (Atual)', impact: 1.0 },
    { name: 'Pessimista (Risco Máximo)', impact: 0.85 },
    { name: 'Otimista (Previsão de Alta)', impact: 1.15 },
];

const formatPercentChange = (val: number) => {
    const sign = val >= 0 ? '+' : '';
    const color = val >= 0 ? 'text-green-600' : 'text-red-600';
    return (
        <span className={`${color} font-bold flex items-center gap-1`}>
            {val >= 0 ? <TrendingUpIcon size={16} /> : <TrendingDown size={16} />}
            {sign}{val.toFixed(1)}%
        </span>
    );
};

// --- CORE LOGIC: SIMULATOR MODEL ---
const runSimulation = (state: SimulatorState, base: number, elasticity: number): ScenarioMetrics => {
    // 1. Efeito da Queda de Preço e Seca (Risco do Agro):
    const agroImpactFactor = 1 - (state.agroPriceDrop * 0.002) - (state.droughtSeverity * 0.0015);
    
    // 2. Efeito do Preço (Elasticidade Dinâmica via ML):
    // Variação % do Preço * Coeficiente de Elasticidade
    const priceEffect = (state.tuitionChange / 100) * elasticity;
    const priceFactor = 1 + priceEffect;

    // 3. Matrícula Final
    const enrollmentChangeFactor = agroImpactFactor * priceFactor * base;
    const finalEnrollment = BASE_ENROLLMENT * enrollmentChangeFactor;
    
    // 4. Retenção
    const retentionChangeFactor = 1 - (state.tuitionChange * 0.005) - (state.droughtSeverity * 0.001);
    const finalRetention = BASE_RETENTION * retentionChangeFactor;

    // 5. Receita
    const finalRevenue = finalEnrollment * (BASE_REVENUE_PER_STUDENT * (1 + state.tuitionChange / 100));

    // Cálculo das % de Variação
    const enrollmentChange = ((finalEnrollment / BASE_ENROLLMENT) - 1) * 100;
    const retentionChange = (finalRetention - BASE_RETENTION) / BASE_RETENTION * 100;
    const revenueChange = ((finalRevenue / (BASE_ENROLLMENT * BASE_REVENUE_PER_STUDENT)) - 1) * 100;

    return { enrollmentChange, retentionChange, revenueChange };
};

// --- MAIN COMPONENT ---
const ScenarioSimulator: React.FC<{ selectedCityId: number }> = ({ selectedCityId }) => {
    // Fixed: hook only returns { municipiosData, rankings, isLoading }. Get selectedCityId from props.
    const [elasticityModel, setElasticityModel] = useState<ElasticityModel | null>(null);

    const [state, setState] = useState<SimulatorState>({
        agroPriceDrop: 30, 
        droughtSeverity: 40, 
        tuitionChange: 0, 
    });
    const [activeScenario, setActiveScenario] = useState<number>(0); 

    // Fetch elasticity when city changes
    useEffect(() => {
        const model = getPriceElasticity(selectedCityId);
        setElasticityModel(model);
    }, [selectedCityId]);

    const currentSimulation = useMemo(() => {
        const scenarioFactor = scenarios[activeScenario].impact;
        const elasticCoeff = elasticityModel?.coefficient || -1.0; // Fallback
        return runSimulation(state, scenarioFactor, elasticCoeff);
    }, [state, activeScenario, elasticityModel]);

    const handleSliderChange = (key: keyof SimulatorState, value: number) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="p-4 bg-gray-50 h-full overflow-y-auto animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-4">
                <Zap size={20} className="text-orange-600"/>
                Simulador de Cenários & Risco
            </h2>
            
            {elasticityModel && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-6 flex items-center justify-between max-w-3xl mx-auto">
                    <div className="flex items-center gap-2">
                        <BrainCircuit size={18} className="text-indigo-600"/>
                        <span className="text-sm text-indigo-800 font-semibold">IA de Elasticidade Ativa</span>
                    </div>
                    <div className="text-xs text-indigo-700">
                        Coeficiente Local: <strong>{elasticityModel.coefficient}</strong> ({elasticityModel.sensitivityLabel})
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Painel de Controles */}
                <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Drivers de Mercado</h3>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                             <label className="block text-sm font-semibold text-red-600">Queda no Preço do Agro</label>
                             <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">{state.agroPriceDrop}%</span>
                        </div>
                        <input
                            type="range" min="0" max="100" value={state.agroPriceDrop}
                            onChange={(e) => handleSliderChange('agroPriceDrop', Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                         <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><AlertTriangle size={12}/> Impacto na renda do produtor.</p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-orange-600">Risco Climático (Seca)</label>
                            <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2 py-1 rounded">{state.droughtSeverity}%</span>
                        </div>
                        <input
                            type="range" min="0" max="100" value={state.droughtSeverity}
                            onChange={(e) => handleSliderChange('droughtSeverity', Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                         <p className="text-xs text-gray-500 mt-1">Impacto na evasão estudantil.</p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-blue-600">Ajuste de Mensalidade</label>
                            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">{state.tuitionChange > 0 ? '+' : ''}{state.tuitionChange}%</span>
                        </div>
                        <input
                            type="range" min="-20" max="20" value={state.tuitionChange}
                            onChange={(e) => handleSliderChange('tuitionChange', Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                         <p className="text-xs text-gray-500 mt-1">
                             Sensibilidade prevista: <span className="font-bold">{elasticityModel?.sensitivityLabel}</span>
                         </p>
                    </div>
                </div>

                {/* Painel de Resultados */}
                <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Projeção ({scenarios[activeScenario].name})</h3>
                    
                    <div className="flex justify-between items-center mb-6 p-2 bg-gray-100 rounded-lg">
                        {scenarios.map((s, index) => (
                            <button 
                                key={s.name}
                                onClick={() => setActiveScenario(index)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${activeScenario === index ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Users size={18}/></div>
                                Variação de Matrículas
                            </div>
                            {formatPercentChange(currentSimulation.enrollmentChange)}
                        </div>
                        <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-full"><Zap size={18}/></div>
                                Variação de Retenção
                            </div>
                            {formatPercentChange(currentSimulation.retentionChange)}
                        </div>
                        <div className="p-4 border border-green-100 bg-green-50/50 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-3 text-sm text-green-800 font-bold">
                                <div className="p-2 bg-green-100 text-green-600 rounded-full"><DollarSign size={18}/></div>
                                Impacto na Receita
                            </div>
                            {formatPercentChange(currentSimulation.revenueChange)}
                        </div>
                    </div>

                    <p className="mt-6 text-xs text-gray-400 text-center">
                        *Projeções baseadas em aprendizado de máquina sobre dados históricos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScenarioSimulator;
