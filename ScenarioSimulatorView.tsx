
import React, { useState, useEffect } from 'react';
import { Loader2, Cpu, MapPin, BookOpen, DollarSign, Calendar, BarChart, CheckCircle, XCircle, Lightbulb, AlertTriangle, TrendingUp, Bot, ArrowRight, Shield, Target } from 'lucide-react';
import { MUNICIPIOS_PERFIL, formatNumber } from './constants';
import type { ScenarioAnalysisResult, MunicipioPerfil } from './types';
import { generateScenarioAnalysis } from './services/geminiService';
import ChatWidget from './ChatWidget';
import { useRealTimeData } from './services/realTimeSyncService';

// UI Components
interface InputFieldProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, icon, children }) => (
    <div className="mb-4">
        <label htmlFor={id} className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
            {icon}
            {label}
        </label>
        {children}
    </div>
);

const ScoreGauge = ({ score, category }: { score: number; category: string }) => {
    const getCategoryStyle = () => {
        switch (category) {
            case 'Alta': return { color: '#16a34a', bg: 'bg-green-50' };
            case 'Média': return { color: '#eab308', bg: 'bg-yellow-50' };
            case 'Baixa': return { color: '#ef4444', bg: 'bg-red-50' };
            default: return { color: '#6b7280', bg: 'bg-gray-50' };
        }
    };
    const style = getCategoryStyle();
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (score / 10) * circumference;

    return (
        <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl ${style.bg} border border-gray-100 shadow-sm`}>
            <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="64" cy="64" />
                    <circle
                        style={{ color: style.color }}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="64"
                        cy="64"
                        className="transition-all duration-1000 ease-in-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black" style={{ color: style.color }}>{score.toFixed(1)}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Score</span>
                </div>
            </div>
            <span className={`mt-2 text-lg font-bold px-4 py-1 rounded-full bg-white shadow-sm border border-gray-100`} style={{ color: style.color }}>
                {category} Viabilidade
            </span>
        </div>
    );
};

const SwotCard = ({ title, items, icon, color }: { title: string, items: string[], icon: React.ReactNode, color: string }) => (
    <div className={`p-4 rounded-xl border ${color} bg-opacity-50 h-full`}>
        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
            {icon} {title}
        </h4>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

interface ScenarioSimulatorViewProps {
    selectedProfile: MunicipioPerfil | null;
    municipiosData: MunicipioPerfil[];
}

const ScenarioSimulatorView: React.FC<ScenarioSimulatorViewProps> = ({ selectedProfile, municipiosData }) => {
    // Fixed: hook only returns { municipiosData, rankings, isLoading }. Get data from props.
    
    // Form State
    const [selectedCityId, setSelectedCityId] = useState<number>(selectedProfile?.municipio_id || municipiosData[0]?.municipio_id || 0);
    const [investmentType, setInvestmentType] = useState('Novo Campus');
    const [courseFocus, setCourseFocus] = useState('Agronegócio & Tecnologia');
    const [budget, setBudget] = useState('5000000');
    const [horizon, setHorizon] = useState('5 Anos');

    // Analysis State
    const [isLoadingSimulation, setIsLoadingSimulation] = useState(false);
    const [result, setResult] = useState<ScenarioAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Update local state when global profile changes
    useEffect(() => {
        if (selectedProfile) {
            setSelectedCityId(selectedProfile.municipio_id);
        }
    }, [selectedProfile]);

    const handleSimulation = async () => {
        setIsLoadingSimulation(true);
        setError(null);
        setResult(null);

        const city = municipiosData.find(m => m.municipio_id === Number(selectedCityId));
        
        if (!city) {
            setError("Selecione uma cidade válida.");
            setIsLoadingSimulation(false);
            return;
        }

        const prompt = `
        Atue como um analista de investimento sênior em educação. Realize uma análise de viabilidade detalhada para o seguinte cenário:
        
        CONTEXTO DO INVESTIMENTO:
        - Cidade: ${city.nome} (${city.estado})
        - Tipo de Expansão: ${investmentType}
        - Foco Acadêmico: ${courseFocus}
        - Investimento Inicial Disponível: R$ ${formatNumber(Number(budget))}
        - Horizonte de Planejamento: ${horizon}

        DADOS DA CIDADE (Use para fundamentar a análise):
        - População Total: ${formatNumber(city.demografia.populacao_total)}
        - PIB Total: R$ ${city.economia.pib_total_bi} Bi
        - PIB Agro: R$ ${city.agro.pib_agro_bi} Bi
        - Renda per Capita: R$ ${formatNumber(city.economia.renda_per_capita)}
        - Concorrência Atual: ${city.educacao.total_ies_ativas} IES ativas
        - Crescimento de Matrículas (CAGR): ${city.cagr_ing_total_2023}%
        - Taxa de Evasão Média: ${city.educacao.taxa_evasao_presencial}%

        Retorne um JSON estritamente com a estrutura solicitada (ScenarioAnalysisResult), contendo:
        1. Score de Viabilidade (0-10) e Categoria.
        2. Resumo Executivo.
        3. Análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças).
        4. Projeção Financeira (Breakeven, Alunos no Ano 1, Receita em 3 anos, ROI).
        5. Recomendação Estratégica Final.
        `;

        try {
            const analysis = await generateScenarioAnalysis(prompt);
            setResult(analysis);
        } catch (e: any) {
            setError(e.message || "Erro ao gerar simulação.");
        } finally {
            setIsLoadingSimulation(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto animate-fade-in">
            <div className="p-6 max-w-7xl mx-auto w-full">
                
                <header className="mb-8">
                    <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <Cpu className="text-purple-600" /> Simulador de Cenários com IA
                    </h1>
                    <p className="text-gray-600">Projete a viabilidade de novos investimentos utilizando a inteligência do RogerLens.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: CONFIGURATION */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-500"/> Configuração do Cenário
                            </h3>
                            
                            <InputField id="city" label="Município Alvo" icon={<MapPin size={16} className="text-gray-400"/>}>
                                <select 
                                    id="city" 
                                    value={selectedCityId} 
                                    onChange={(e) => setSelectedCityId(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                >
                                    {municipiosData.map(m => (
                                        <option key={m.municipio_id} value={m.municipio_id}>{m.nome} - {m.estado}</option>
                                    ))}
                                </select>
                            </InputField>

                            <InputField id="type" label="Modelo de Expansão" icon={<Building2 size={16} className="text-gray-400"/>}>
                                <select 
                                    id="type" 
                                    value={investmentType} 
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                >
                                    <option>Novo Campus Presencial</option>
                                    <option>Polo EAD Premium</option>
                                    <option>Hub de Inovação (Híbrido)</option>
                                    <option>Aquisição de IES Local (M&A)</option>
                                </select>
                            </InputField>

                            <InputField id="focus" label="Foco Acadêmico" icon={<BookOpen size={16} className="text-gray-400"/>}>
                                <select 
                                    id="focus" 
                                    value={courseFocus} 
                                    onChange={(e) => setCourseFocus(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                >
                                    <option>Agronegócio & Tecnologia</option>
                                    <option>Saúde & Medicina</option>
                                    <option>Direito & Gestão</option>
                                    <option>Engenharias & Indústria</option>
                                    <option>Generalista</option>
                                </select>
                            </InputField>

                            <div className="grid grid-cols-2 gap-4">
                                <InputField id="budget" label="Budget (R$)" icon={<DollarSign size={16} className="text-gray-400"/>}>
                                    <input 
                                        type="number" 
                                        id="budget"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                    />
                                </InputField>
                                <InputField id="horizon" label="Horizonte" icon={<Calendar size={16} className="text-gray-400"/>}>
                                    <select 
                                        id="horizon"
                                        value={horizon}
                                        onChange={(e) => setHorizon(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                                    >
                                        <option>3 Anos</option>
                                        <option>5 Anos</option>
                                        <option>10 Anos</option>
                                    </select>
                                </InputField>
                            </div>

                            <button 
                                onClick={handleSimulation} 
                                disabled={isLoadingSimulation}
                                className="w-full mt-4 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-purple-300"
                            >
                                {isLoadingSimulation ? <Loader2 className="animate-spin" /> : <Bot />}
                                {isLoadingSimulation ? 'Processando...' : 'Rodar Simulação IA'}
                            </button>
                        </div>
                        
                        {/* Dica */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                            <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={20}/>
                            <p className="text-sm text-blue-800">
                                <strong>Dica:</strong> Experimente mudar o "Foco Acadêmico" para ver como a IA reage à vocação econômica da cidade (ex: Agro em Sorriso vs. Serviços em Goiânia).
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: RESULTS */}
                    <div className="lg:col-span-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                                <XCircle size={24} />
                                <p>{error}</p>
                            </div>
                        )}

                        {!result && !isLoadingSimulation && !error && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-xl border-2 border-dashed border-gray-200 p-12">
                                <Cpu size={64} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium">Aguardando Simulação</p>
                                <p className="text-sm">Configure os parâmetros ao lado e inicie a análise.</p>
                            </div>
                        )}

                        {isLoadingSimulation && (
                            <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-12">
                                <Loader2 size={64} className="mb-6 animate-spin text-purple-600" />
                                <h3 className="text-xl font-bold text-gray-800">RogerLens está analisando...</h3>
                                <p className="text-gray-500 mt-2">Cruzando dados de {municipiosData.length} municípios com tendências de mercado.</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Top Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <ScoreGauge score={result.viability_score} category={result.viability_category} />
                                    </div>
                                    <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                                        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <TrendingUp className="text-blue-600"/> Resumo Executivo
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>
                                        
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                                            <div>
                                                <p className="text-gray-500 font-medium">Breakeven Estimado</p>
                                                <p className="text-xl font-black text-gray-800">{result.financial_projection.time_to_breakeven_months} Meses</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500 font-medium">ROI (3 Anos)</p>
                                                <p className="text-xl font-black text-green-600">{result.financial_projection.roi_three_years_percent}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SWOT Analysis */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SwotCard title="Pontos Fortes" items={result.strengths} icon={<CheckCircle size={18} className="text-green-600"/>} color="bg-green-50 border-green-200" />
                                    <SwotCard title="Pontos Fracos" items={result.weaknesses} icon={<AlertTriangle size={18} className="text-orange-600"/>} color="bg-orange-50 border-orange-200" />
                                    <SwotCard title="Oportunidades" items={result.opportunities} icon={<Lightbulb size={18} className="text-blue-600"/>} color="bg-blue-50 border-blue-200" />
                                    <SwotCard title="Ameaças" items={result.threats} icon={<Shield size={18} className="text-red-600"/>} color="bg-red-50 border-red-200" />
                                </div>

                                {/* Financial Projection */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <BarChart size={20} className="text-green-600"/> Projeção Financeira
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 font-bold uppercase">Alunos (Ano 1)</p>
                                            <p className="text-2xl font-black text-gray-800">{result.financial_projection.estimated_students_first_year}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 font-bold uppercase">Receita (3 Anos)</p>
                                            <p className="text-2xl font-black text-blue-600">R$ {formatNumber(result.financial_projection.estimated_revenue_three_years)}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 font-bold uppercase">Payback</p>
                                            <p className="text-2xl font-black text-purple-600">{(result.financial_projection.time_to_breakeven_months / 12).toFixed(1)} Anos</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Final Recommendation */}
                                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl text-white shadow-lg">
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <Target className="text-red-400"/> Recomendação Estratégica
                                    </h3>
                                    <p className="leading-relaxed opacity-90">{result.strategic_recommendation}</p>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
            {result && (
                <ChatWidget 
                    cityContext={municipiosData.find(m => m.municipio_id === Number(selectedCityId))}
                    contextPrompt={`O usuário acabou de rodar uma simulação de cenário para ${municipiosData.find(m => m.municipio_id === Number(selectedCityId))?.nome}. O resultado foi: Score ${result.viability_score}, Categoria ${result.viability_category}. Pontos fortes: ${result.strengths.join(', ')}.`}
                    initialMessage="A simulação está completa. Quer aprofundar algum ponto da análise financeira ou SWOT?"
                />
            )}
        </div>
    );
};

// Icon helpers needed for input fields above
import { Building2 } from 'lucide-react';

export default ScenarioSimulatorView;
