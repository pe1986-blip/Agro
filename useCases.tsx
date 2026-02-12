import React, { useState } from 'react';
import { ChevronDown, Target, BarChartHorizontal, Users, DollarSign, Map, TrendingUp } from 'lucide-react';

const useCasesData = [
  {
    title: "Análise de Penetração",
    icon: <Target size={18} className="text-indigo-500" />,
    question: "Qual é a taxa de penetração de ensino superior em Campinas vs. Brasil?",
    data: [
      "População 20-59 anos: IBGE",
      "Ingressantes + matrículas: e-MEC",
      "Cálculo: (ingressantes / população) × 100",
    ],
    output: "Gráfico comparativo, identificação de oportunidade de expansão.",
  },
  {
    title: "Análise Competitiva por Município",
    icon: <BarChartHorizontal size={18} className="text-red-500" />,
    question: "Quantos e quais são os principais concorrentes em um município?",
    data: [
        "Lista de IES por município: e-MEC",
        "Ingressantes por IES: e-MEC",
        "Market share: cálculo derivado",
    ],
    output: "Mapa Estratégico (4 quadrantes), mapa de posicionamento, identificação de lacunas.",
  },
  {
    title: "Correlação Demográfica-Educacional",
    icon: <Users size={18} className="text-green-500" />,
    question: "Qual a relação entre renda média e penetração de cursos premium?",
    data: [
      "Renda média e PIB per capita: IBGE",
      "Cursos premium (Agrárias, TI, Médicas): e-MEC",
      "CAGR premium: série histórica",
    ],
    output: "Scatter plot, coeficiente de correlação, previsões.",
  },
  {
    title: "Análise de Potencial de Mercado (TAM)",
    icon: <DollarSign size={18} className="text-yellow-500" />,
    question: "Qual é o tamanho de mercado potencial para TI em uma região?",
    data: [
      "Vagas de TI geradas: LinkedIn",
      "População com capacidade de renda: IBGE",
      "Demanda reprimida (educação < superior): IBGE",
      "CAGR histórico: e-MEC",
    ],
    output: "TAM em reais, crescimento esperado, ROI estimado.",
  },
  {
    title: "Análise Locacional com Heatmap",
    icon: <Map size={18} className="text-blue-500" />,
    question: "Onde estão os maiores clusters de oportunidade educacional?",
    data: [
      "Latitude/longitude: Google Maps + BD CNPJ",
      "Densidade de ingressantes: agregação geográfica",
      "Renda média e IDH: IBGE por município",
    ],
    output: "Mapa com heatmap interativo, zoom por região.",
  },
  {
    title: "Análise de Fluxo e Evasão de Alunos",
    icon: <TrendingUp size={18} className="text-teal-500" />,
    question: "Qual é a jornada do aluno em nosso programa de Agronegócio em Itajubá e qual a principal etapa de evasão?",
    data: [
      "Ingressantes por município: e-MEC",
      "Taxas de conversão/evasão (históricas/simuladas)",
      "Demografia dos alunos por etapa (via drill-down)",
    ],
    output: "Diagrama Sankey interativo com métricas de conversão, tempo médio de jornada e análise detalhada por etapa.",
  },
];

interface UseCaseItemProps {
    useCase: typeof useCasesData[0];
    isOpen: boolean;
    onToggle: () => void;
}

const UseCaseItem: React.FC<UseCaseItemProps> = ({ useCase, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mr-3 shrink-0">
                {useCase.icon}
            </div>
            <span>{useCase.title}</span>
        </div>
        <ChevronDown
          className={`transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="font-semibold text-sm text-gray-800 mb-1">Pergunta-chave:</p>
          <p className="text-sm text-gray-600 mb-3 italic">"{useCase.question}"</p>

          <p className="font-semibold text-sm text-gray-800 mb-1">Dados Utilizados:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-3 space-y-1 pl-2">
            {useCase.data.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          
          <p className="font-semibold text-sm text-gray-800 mb-1">Output Esperado:</p>
          <p className="text-sm text-gray-600">{useCase.output}</p>
        </div>
      )}
    </div>
  );
};

export default function UseCasesPanel() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-center mb-4 text-blue-800">Casos de Uso Analíticos</h2>
        {useCasesData.map((useCase, index) => (
            <UseCaseItem
                key={index}
                useCase={useCase}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
            />
        ))}
    </div>
  );
}