import React from 'react';
import ToolTipExplainer from './ToolTipExplainer';
import { TrendingUp, DollarSign, Award, Building2 } from 'lucide-react';

const ScoreLegendItem: React.FC<{ colorClass: string; label: string; range: string }> = ({ colorClass, label, range }) => (
    <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full ${colorClass}`}></div>
        <div>
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-xs text-gray-500">{range}</p>
        </div>
    </div>
);


const LegendaWidget: React.FC = () => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner w-full max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Legenda de Análise (Score 2.0)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Score Colors Section */}
                <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-3 text-center md:text-left">Potencial de Oportunidade</h3>
                    <div className="space-y-3 p-3 bg-white rounded-lg border">
                        <ScoreLegendItem colorClass="bg-green-500" label="Alto Potencial" range="Score: 7.0 - 10" />
                        <ScoreLegendItem colorClass="bg-yellow-500" label="Potencial Moderado" range="Score: 4.0 - 6.9" />
                        <ScoreLegendItem colorClass="bg-red-500" label="Mercado em Desenvolvimento" range="Score: 0 - 3.9" />
                    </div>
                </div>

                {/* Factors Section */}
                <div>
                    <h3 className="text-md font-semibold text-gray-700 mb-3 text-center md:text-left">Fatores de Análise</h3>
                    <div className="space-y-2">
                        <ToolTipExplainer
                            icon={<TrendingUp size={20} className="text-green-500" />}
                            label="Crescimento Matrículas (CAGR)"
                            title="Crescimento Estratégico"
                            description="Crescimento Anual Composto (CAGR) de ingressantes em áreas estratégicas (Agrárias, TI, Medicina), indicando aquecimento da demanda."
                        />
                         <ToolTipExplainer
                            icon={<DollarSign size={20} className="text-blue-500" />}
                            label="PIB do Agronegócio"
                            title="Tamanho do Mercado"
                            description="Produto Interno Bruto do setor agro. Um PIB maior indica um mercado mais robusto e com maior capacidade de absorção de mão de obra."
                        />
                         <ToolTipExplainer
                            icon={<Award size={20} className="text-amber-500" />}
                            label="Qualidade Educacional"
                            title="Eficiência Educacional"
                            description="Métrica que combina a qualidade (nota média Enade) com a eficiência (taxa de retenção/não-evasão). Valores mais altos indicam um sistema educacional local mais saudável."
                        />
                         <ToolTipExplainer
                            icon={<Building2 size={20} className="text-slate-500" />}
                            label="Competição"
                            title="Saturação do Mercado"
                            description="O número total de Instituições de Ensino Superior (IES) que já atuam no município. Um número menor indica menor concorrência."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegendaWidget;