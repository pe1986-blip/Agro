
import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend, Cell, ReferenceLine } from 'recharts';
import { DollarSign, HelpCircle, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import type { MunicipioPerfil } from './types';

// --- TYPES & CONFIG ---
interface CourseROI {
  courseName: string;
  tuition: number; // Mensalidade (R$)
  salary: number; // Salário Inicial Médio (R$)
  irse: number; // Indice de Retorno Salarial (Salário / Mensalidade)
  category: 'Agro & Natureza' | 'Tecnologia' | 'Gestão & Negócios';
  relevance: 'High' | 'Medium' | 'Low'; // Para destacar visualmente
}

const CATEGORY_COLORS: Record<string, string> = {
  'Agro & Natureza': '#10B981', // Green
  'Tecnologia': '#3B82F6',       // Blue
  'Gestão & Negócios': '#F59E0B', // Amber
};

interface ReturnOnInvestmentChartProps {
    municipalityName: string;
    cityProfile?: MunicipioPerfil; // Agora opcional, mas idealmente passado
    avgSalary?: number;
    avgTuition?: number;
}

// --- DYNAMIC ENGINE ---
const generateROIData = (city: MunicipioPerfil | undefined, cityName: string, avgSalary?: number, avgTuition?: number): CourseROI[] => {
    // Fallback values se o perfil não vier completo
    const pibAgro = city?.pib_agro_bi || 1.0;
    const exports = city?.exportacoes_agro_usd_milhoes || 100;
    const population = city?.populacao_total || 50000;
    const idh = city?.idh || 0.7;
    const rendaMedia = city?.renda_per_capita_municipal || 2500;

    // --- CÁLCULO DE MULTIPLICADORES DE VOCAÇÃO ---
    
    // 1. Fator Agro: Impulsiona salários de Agronomia/Vet
    // Cidades como Sorriso (PIB > 5bi) terão multiplicador alto (1.4x)
    const agroMultiplier = 1 + Math.min(0.5, Math.log10(pibAgro + 1) * 0.25);

    // 2. Fator Tech/Serviços: Impulsiona Tech (Metrópoles)
    // Baseado em população e IDH
    const techMultiplier = 0.9 + (population > 300000 ? 0.3 : 0) + ((idh - 0.7) * 1.5);

    // 3. Fator Negócios/Logística: Impulsiona Gestão
    // Baseado em exportações (volume de trade)
    const businessMultiplier = 1 + Math.min(0.4, Math.log10(exports + 1) * 0.08);

    // 4. Fator Custo (Mensalidade):
    // Cidades mais ricas cobram mais caro
    const costFactor = 0.8 + (rendaMedia / 4000) * 0.4; // Varia de 0.8 a 1.2

    // Base para cálculos (R$)
    const baseTuition = avgTuition || (800 * costFactor); 
    const baseSalary = avgSalary || 2800; // Salário Jr Base Brasil

    // Helper de aleatoriedade consistente
    const seed = cityName.length; 
    const rng = (mod: number) => 0.9 + ((seed * mod) % 20) / 100; // 0.9 a 1.1

    const courses: CourseROI[] = [
        // --- AGRO & NATUREZA ---
        { 
            courseName: 'Eng. Agronômica', 
            category: 'Agro & Natureza',
            tuition: baseTuition * 1.5 * rng(1), 
            salary: baseSalary * 1.4 * agroMultiplier * rng(2),
            irse: 0, relevance: agroMultiplier > 1.2 ? 'High' : 'Medium'
        },
        { 
            courseName: 'Medicina Veterinária', 
            category: 'Agro & Natureza',
            tuition: baseTuition * 1.8 * rng(3), 
            salary: baseSalary * 1.3 * agroMultiplier * rng(4),
            irse: 0, relevance: 'Medium'
        },
        { 
            courseName: 'Zootecnia', 
            category: 'Agro & Natureza',
            tuition: baseTuition * 1.1 * rng(5), 
            salary: baseSalary * 1.1 * agroMultiplier * rng(6),
            irse: 0, relevance: 'Medium'
        },

        // --- TECNOLOGIA ---
        { 
            courseName: 'AgTech & Dados', 
            category: 'Tecnologia',
            tuition: baseTuition * 1.2 * rng(7), 
            salary: baseSalary * 1.5 * techMultiplier * Math.max(1, agroMultiplier * 0.8) * rng(8), // Tech Agro paga bem
            irse: 0, relevance: 'High'
        },
        { 
            courseName: 'Sistemas de Informação', 
            category: 'Tecnologia',
            tuition: baseTuition * 1.0 * rng(9), 
            salary: baseSalary * 1.3 * techMultiplier * rng(10),
            irse: 0, relevance: 'Medium'
        },

        // --- GESTÃO & NEGÓCIOS ---
        { 
            courseName: 'Gestão do Agronegócio', 
            category: 'Gestão & Negócios',
            tuition: baseTuition * 0.7 * rng(11), // Curso mais barato (Tecnólogo)
            salary: baseSalary * 1.1 * businessMultiplier * rng(12),
            irse: 0, relevance: 'Medium'
        },
        { 
            courseName: 'Comércio Exterior', 
            category: 'Gestão & Negócios',
            tuition: baseTuition * 0.9 * rng(13), 
            salary: baseSalary * 1.2 * businessMultiplier * (exports > 500 ? 1.3 : 1) * rng(14), // Boom em cidades exportadoras
            irse: 0, relevance: 'High'
        },
        { 
            courseName: 'Contabilidade Rural', 
            category: 'Gestão & Negócios',
            tuition: baseTuition * 0.8 * rng(15), 
            salary: baseSalary * 1.15 * businessMultiplier * rng(16),
            irse: 0, relevance: 'Low'
        }
    ];

    // Calcular IRSE final
    return courses.map(c => ({
        ...c,
        irse: c.salary / c.tuition,
        // Arredondar valores para display
        salary: Math.round(c.salary),
        tuition: Math.round(c.tuition)
    }));
};

// --- CUSTOM COMPONENTS ---

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-sm animate-fade-in z-50">
                <p className="font-bold text-base mb-1">{data.courseName}</p>
                <p><span className="font-semibold text-green-400">Salário Médio (Y):</span> R$ {data.salary.toLocaleString('pt-BR')}</p>
                <p><span className="font-semibold text-blue-400">Mensalidade (X):</span> R$ {data.tuition.toLocaleString('pt-BR')}</p>
                <p className="mt-1 pt-1 border-t border-slate-600"><span className="font-bold text-yellow-400">IRSE (Retorno):</span> {data.irse.toFixed(1)}x</p>
            </div>
        );
    }
    return null;
};


// --- MAIN COMPONENT ---
const ReturnOnInvestmentChart: React.FC<ReturnOnInvestmentChartProps> = ({ municipalityName, cityProfile, avgSalary, avgTuition }) => {
    const data = useMemo(() => generateROIData(cityProfile, municipalityName, avgSalary, avgTuition), [cityProfile, municipalityName, avgSalary, avgTuition]);
    
    // Define os eixos de referência (médias)
    const midTuition = data.reduce((sum, d) => sum + d.tuition, 0) / data.length;
    const midSalary = data.reduce((sum, d) => sum + d.salary, 0) / data.length;

    // Segmenta os dados por categoria para a função Scatter do Recharts
    const groupedData = useMemo(() => {
        return data.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = [];
            acc[curr.category].push(curr);
            return acc;
        }, {} as Record<string, CourseROI[]>);
    }, [data]);
    
    // Ranges para os eixos (garante margem visual)
    const tuitionMax = Math.ceil(Math.max(...data.map(d => d.tuition)) * 1.2);
    const salaryMax = Math.ceil(Math.max(...data.map(d => d.salary)) * 1.15);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md h-full flex flex-col animate-fade-in border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                 <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <DollarSign size={20} className="text-yellow-600"/>
                        IRSE: Retorno Salarial (Dinâmico)
                    </h2>
                 </div>
                 <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    <Info size={12}/>
                    <span>Dados ajustados pelo PIB local</span>
                 </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">
                Cursos no topo esquerdo (Verde) entregam maior retorno financeiro para o aluno nesta cidade.
            </p>
            
            <div className="flex-1 w-full h-[380px] relative min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                        
                        <XAxis 
                          type="number" 
                          dataKey="tuition" 
                          name="Mensalidade" 
                          domain={[0, tuitionMax]}
                          tickFormatter={(val) => `R$${val}`}
                          tick={{ fontSize: 10, fill: '#6b7280' }}
                        >
                            <Label value="Mensalidade Média (R$)" offset={0} position="insideBottom" style={{ fontSize: '11px', fill: '#9ca3af' }}/>
                        </XAxis>

                        <YAxis 
                          type="number" 
                          dataKey="salary" 
                          name="Salário" 
                          domain={[0, salaryMax]}
                          tickFormatter={(val) => `R$${(val/1000).toFixed(1)}k`}
                          tick={{ fontSize: 10, fill: '#6b7280' }}
                        >
                            <Label value="Salário Inicial (R$)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontSize: '11px', fill: '#9ca3af' }} offset={10}/>
                        </YAxis>

                        <ZAxis type="number" dataKey="irse" range={[60, 500]} name="IRSE" />
                        
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} iconType="circle"/>

                        {/* Linhas de Referência (Médias) */}
                        <ReferenceLine x={midTuition} stroke="#9ca3af" strokeDasharray="3 3" />
                        <ReferenceLine y={midSalary} stroke="#9ca3af" strokeDasharray="3 3" />
                        
                        {/* Plota os dados agrupados */}
                        {Object.entries(groupedData).map(([category, dataPoints]) => (
                            <Scatter 
                                key={category}
                                name={category}
                                data={dataPoints}
                                fill={CATEGORY_COLORS[category]}
                                opacity={0.85}
                            >
                                {(dataPoints as CourseROI[]).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[category]} strokeWidth={1} stroke="#fff"/>
                                ))}
                            </Scatter>
                        ))}

                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            
            {/* Legenda Externa de Quadrantes */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs border-t pt-3 bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-2">
                     <div className="bg-green-100 p-1 rounded text-green-600 mt-0.5"><TrendingUp size={12}/></div>
                     <div>
                         <span className="font-bold text-gray-700 block">Alta Atratividade</span>
                         <span className="text-[10px] text-gray-500">Cursos com alto salário e mensalidade acessível.</span>
                     </div>
                </div>
                <div className="flex items-start gap-2">
                     <div className="bg-red-100 p-1 rounded text-red-600 mt-0.5"><AlertTriangle size={12}/></div>
                     <div>
                         <span className="font-bold text-gray-700 block">Risco Financeiro</span>
                         <span className="text-[10px] text-gray-500">Mensalidade alta para um salário inicial baixo.</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnOnInvestmentChart;
