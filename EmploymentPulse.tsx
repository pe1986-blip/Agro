
import React, { useMemo, useState } from 'react';
import { Calendar, Clock, TrendingUp, AlertCircle, Info } from 'lucide-react';

// --- TYPES ---
interface MonthlyData {
    year: number;
    month: number; // 1-12
    hires: number; // Volume de contratações
    intensity: number; // 0 a 4 (para escala de cor)
}

interface EmploymentPulseProps {
    municipality: string;
}

// --- MOCK DATA GENERATOR ---
// Simula ciclos reais do agro brasileiro baseados na cultura predominante
const getSeasonalityData = (city: string): MonthlyData[] => {
    const years = [2022, 2023, 2024];
    const data: MonthlyData[] = [];
    const normalizedCity = city.toLowerCase();

    let peakMonths = [2, 3]; // Default: Março (Colheita Soja)

    // Perfil: Cana-de-açúcar (Ex: Ribeirão Preto) - Safra começa Abril
    if (normalizedCity.includes('ribeirão') || normalizedCity.includes('piracicaba') || normalizedCity.includes('sertãozinho')) {
        peakMonths = [3, 4, 5]; 
    }
    // Perfil: Café (Ex: Patrocínio, Varginha) - Colheita Maio/Junho
    else if (normalizedCity.includes('patrocínio') || normalizedCity.includes('varginha') || normalizedCity.includes('pouso alegre')) {
        peakMonths = [5, 6, 7];
    }
    // Perfil: Grãos/Soja (Ex: Sorriso, Rio Verde) - Plantio Out/Nov, Colheita Fev/Mar
    else if (normalizedCity.includes('sorriso') || normalizedCity.includes('rio verde') || normalizedCity.includes('sinop') || normalizedCity.includes('balsas')) {
        peakMonths = [1, 2, 9, 10]; // Dois picos: Colheita e Plantio
    }
    // Perfil: Fruticultura (Ex: Petrolina) - Irrigado, ciclos mais longos
    else if (normalizedCity.includes('petrolina') || normalizedCity.includes('juazeiro')) {
         peakMonths = [6, 7, 8, 9];
    }

    years.forEach(year => {
        for (let m = 1; m <= 12; m++) {
            let baseHires = 50 + Math.random() * 30;
            
            // Aplica o pico sazonal
            if (peakMonths.includes(m)) {
                baseHires *= 2.5; // Explosão de vagas na safra
            } else if (peakMonths.includes(m - 1) || peakMonths.includes(m + 1)) {
                baseHires *= 1.5; // Meses adjacentes
            }

            // Adiciona variação anual (crescimento do mercado)
            if (year === 2024) baseHires *= 1.2;

            // Normaliza intensidade (0-4)
            let intensity = 0;
            if (baseHires > 150) intensity = 4;
            else if (baseHires > 100) intensity = 3;
            else if (baseHires > 80) intensity = 2;
            else if (baseHires > 60) intensity = 1;

            data.push({
                year,
                month: m,
                hires: Math.floor(baseHires),
                intensity
            });
        }
    });

    return data;
};

// --- HELPERS ---
const getMonthName = (m: number) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months[m - 1];
};

const getColorClass = (intensity: number) => {
    switch (intensity) {
        case 0: return 'bg-gray-100 text-gray-400 hover:bg-gray-200';
        case 1: return 'bg-green-200 text-green-800 hover:bg-green-300';
        case 2: return 'bg-green-400 text-white hover:bg-green-500';
        case 3: return 'bg-green-600 text-white hover:bg-green-700';
        case 4: return 'bg-green-800 text-white hover:bg-green-900';
        default: return 'bg-gray-100';
    }
};

// --- COMPONENT ---
const EmploymentPulse: React.FC<EmploymentPulseProps> = ({ municipality }) => {
    const [hoveredCell, setHoveredCell] = useState<MonthlyData | null>(null);
    const data = useMemo(() => getSeasonalityData(municipality), [municipality]);

    // Agrupar dados por ano para renderização
    const dataByYear = useMemo(() => {
        const grouped: Record<number, MonthlyData[]> = {};
        data.forEach(d => {
            if (!grouped[d.year]) grouped[d.year] = [];
            grouped[d.year].push(d);
        });
        return grouped;
    }, [data]);

    // Cálculo da Janela Ideal (Insight)
    const bestWindow = useMemo(() => {
        // Soma contratações por mês em todos os anos para achar o padrão
        const monthSums = new Array(13).fill(0);
        data.forEach(d => monthSums[d.month] += d.hires);
        
        // Acha o mês de maior contratação histórica
        let maxHires = 0;
        let bestMonthIndex = 1;
        for(let i=1; i<=12; i++) {
            if(monthSums[i] > maxHires) {
                maxHires = monthSums[i];
                bestMonthIndex = i;
            }
        }

        // A janela ideal é 1 mês ANTES do pico (para o aluno estar formado e pronto)
        let gradMonth = bestMonthIndex - 1;
        if (gradMonth === 0) gradMonth = 12; // Se pico é Jan, forma em Dez

        const monthName = new Date(2024, gradMonth - 1).toLocaleString('pt-BR', { month: 'long' });

        return {
            peakMonth: getMonthName(bestMonthIndex),
            gradMonth: getMonthName(gradMonth),
            gradMonthFull: monthName.charAt(0).toUpperCase() + monthName.slice(1)
        };
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 animate-fade-in h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-md font-bold text-gray-800 flex items-center gap-2">
                        <Calendar size={18} className="text-green-700" />
                        Sazonalidade de Contratações (Pulse)
                    </h3>
                    <p className="text-xs text-gray-500">Histórico de vagas abertas no Agro (CAGED)</p>
                </div>
                <div className="relative group">
                    <Info size={16} className="text-gray-400 cursor-pointer" />
                    <div className="absolute right-0 w-64 p-2 bg-slate-800 text-white text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Este gráfico mostra os meses de pico de contratação. O objetivo é alinhar o fim do semestre letivo com o início da safra para maximizar a empregabilidade.
                    </div>
                </div>
            </div>

            {/* INSIGHT BOX */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-start gap-3 shadow-sm">
                <div className="bg-white p-2 rounded-full shadow-sm text-green-600 mt-1">
                    <Clock size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-green-900">Sugestão de Calendário Acadêmico</h4>
                    <p className="text-xs text-green-800 mt-1">
                        O pico histórico de contratações ocorre em <strong>{bestWindow.peakMonth}</strong> (Safra/Início de Ciclo).
                    </p>
                    <p className="text-sm font-semibold text-green-900 mt-2 flex items-center gap-1">
                        <TrendingUp size={14} />
                        Janela Ideal de Formatura: <span className="uppercase underline decoration-green-500 decoration-2 underline-offset-2">{bestWindow.gradMonthFull}</span>
                    </p>
                </div>
            </div>

            {/* HEATMAP GRID */}
            <div className="flex-1 overflow-x-auto flex flex-col justify-center">
                <div className="min-w-[300px]">
                    {/* Header Meses */}
                    <div className="flex mb-2">
                        <div className="w-12"></div> {/* Spacer Ano */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex-1 text-center text-[10px] font-bold text-gray-400 uppercase">
                                {getMonthName(i + 1)}
                            </div>
                        ))}
                    </div>

                    {/* Linhas dos Anos */}
                    {Object.entries(dataByYear).reverse().map(([year, months]) => (
                        <div key={year} className="flex items-center mb-2 gap-1">
                            <div className="w-12 text-xs font-bold text-gray-500">{year}</div>
                            {(months as MonthlyData[]).map((m) => (
                                <div
                                    key={m.month}
                                    className={`flex-1 h-8 rounded-md flex items-center justify-center text-[10px] cursor-pointer transition-all relative ${getColorClass(m.intensity)} ${hoveredCell === m ? 'ring-2 ring-offset-1 ring-blue-400 z-10' : ''}`}
                                    onMouseEnter={() => setHoveredCell(m)}
                                    onMouseLeave={() => setHoveredCell(null)}
                                >
                                    {/* Tooltip Flutuante Local */}
                                    {hoveredCell === m && (
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs p-2 rounded shadow-lg z-20 w-32 text-center pointer-events-none">
                                            <p className="font-bold border-b border-slate-600 pb-1 mb-1">{getMonthName(m.month)}/{year}</p>
                                            <p className="text-green-400 font-bold">{m.hires} Vagas</p>
                                            <p className="text-[10px] text-gray-400">Nível {m.intensity}/4</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* LEGENDA */}
            <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-gray-500">
                <span>Menos Vagas</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></div>
                    <div className="w-3 h-3 rounded bg-green-200"></div>
                    <div className="w-3 h-3 rounded bg-green-400"></div>
                    <div className="w-3 h-3 rounded bg-green-600"></div>
                    <div className="w-3 h-3 rounded bg-green-800"></div>
                </div>
                <span>Mais Vagas</span>
            </div>
        </div>
    );
};

export default EmploymentPulse;
