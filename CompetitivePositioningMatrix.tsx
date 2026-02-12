import React, { useState, useEffect, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell } from 'recharts';
import ChatWidget from './ChatWidget';
import { Loader2 } from 'lucide-react';
import { getAllOpportunities } from './growthOpportunityService';
import { GrowthOpportunityScore } from './types';
import { MUNICIPIOS_PERFIL } from './constants';
import CorrelationScatterPlot from './CorrelationScatterPlot';

// --- TYPES ---
type Quadrant = 'Stars' | 'Cash Cows' | 'Question Marks' | 'Dogs';

interface MatrixDataPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  quadrant: Quadrant;
  originalData: GrowthOpportunityScore;
}

// Fix: Updated component props to include selectedCityId required by CorrelationScatterPlot
interface CompetitivePositioningMatrixProps {
    onSelect: (op: GrowthOpportunityScore) => void;
    selectedCityId: number;
}

// --- STYLING & CONFIG ---
const QUADRANT_CONFIG: Record<Quadrant, { color: string; description: string }> = {
  'Stars': { color: 'rgba(34, 197, 94, 0.7)', description: "Mercado atrativo com alta demanda e inovação." }, 
  'Cash Cows': { color: 'rgba(234, 179, 8, 0.7)', description: "Inovação alta, mas demanda educacional a ser desenvolvida." }, 
  'Question Marks': { color: 'rgba(59, 130, 246, 0.7)', description: "Demanda educacional estabelecida, mas com baixa inovação." }, 
  'Dogs': { color: 'rgba(239, 68, 68, 0.7)', description: "Mercado subdesenvolvido em ambos os eixos." }, 
};

// --- HELPER FUNCTIONS ---
const getQuadrant = (x: number, y: number, xMid: number, yMid: number): Quadrant => {
    if (x >= xMid && y >= yMid) return 'Stars';
    if (x < xMid && y >= yMid) return 'Cash Cows';
    if (x >= xMid && y < yMid) return 'Question Marks';
    return 'Dogs';
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data) return null;
    return (
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-700 text-sm animate-fade-in">
        <p className="font-bold text-base mb-1">{data.name}</p>
        <p><span className="font-semibold text-green-400">Tendência Futura (Y):</span> {data.y.toFixed(1)}/10</p>
        <p><span className="font-semibold text-blue-400">Potencial Atual (X):</span> {data.x.toFixed(1)}/10</p>
        <p><span className="font-semibold text-yellow-400">PIB Agro:</span> R$ {data.z.toFixed(2)} Bi</p>
      </div>
    );
  }
  return null;
};

const MatrixLegend = () => (
    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-4 text-xs">
            <div className="col-span-2 lg:col-span-1">
                 <h4 className="font-bold text-sm text-gray-800 mb-2">Matriz de Decisão</h4>
                 <div className="flex items-center gap-2">
                    <span className="text-gray-500">Tamanho:</span>
                    <span className="font-bold text-gray-700">PIB Agro</span>
                 </div>
            </div>
             {Object.entries(QUADRANT_CONFIG).map(([name, { color, description }]) => (
                <div key={name} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: color.replace('0.7', '1') }}></div>
                    <div>
                        <p className="font-bold text-gray-700">{name}</p>
                        <p className="text-gray-500 text-[10px] leading-tight">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Fix: Updated component definition to destructure selectedCityId
const CompetitivePositioningMatrix: React.FC<CompetitivePositioningMatrixProps> = ({ onSelect, selectedCityId }) => {
    const [matrixData, setMatrixData] = useState<MatrixDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const opportunities = await getAllOpportunities();
                const enrichedData = opportunities.map(op => {
                    const profile = MUNICIPIOS_PERFIL.find(m => m.municipio_id === op.municipio_id);
                    return {
                        x: op.factors.marketPotential, // Novo pilar de Potencial
                        y: op.factors.futureTrend,     // Novo pilar de Tendência (Eixo de Inovação)
                        z: profile?.pib_agro_bi || 0,
                        name: op.municipality,
                        quadrant: 'Dogs' as Quadrant, 
                        originalData: op,
                    };
                });

                const xMid = 5; // Centro da escala 0-10
                const yMid = 5;

                const processed = enrichedData.map(d => ({
                    ...d,
                    quadrant: getQuadrant(d.x, d.y, xMid, yMid)
                }));

                setMatrixData(processed);
            } catch (error) {
                console.error("Failed to fetch data for matrix", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;

    return (
        <div className="p-4 bg-gray-50 h-full overflow-y-auto animate-fade-in relative">
            <h2 className="text-xl font-black text-gray-800 text-center mb-2">Mapa Estratégico de Maturidade</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Comparação entre Potencial de Público e Crescimento Projetado (Tendência).</p>
            
            <div className="relative w-full h-[500px] bg-white rounded-2xl border p-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                        
                        <XAxis type="number" dataKey="x" name="Potencial Atual" domain={[0, 10]} tick={{fontSize: 12}}>
                            <Label value="Potencial de Mercado (População + Renda)" offset={-30} position="insideBottom" style={{fontSize: '14px', fontWeight: 'bold', fill: '#64748b'}}/>
                        </XAxis>

                        <YAxis type="number" dataKey="y" name="Tendência" domain={[0, 10]} tick={{fontSize: 12}}>
                            <Label value="Tendência Futura (Projeção 5 Anos)" angle={-90} position="insideLeft" style={{textAnchor: 'middle', fontSize: '14px', fontWeight: 'bold', fill: '#64748b'}} offset={-15}/>
                        </YAxis>

                        <ZAxis type="number" dataKey="z" range={[100, 1500]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        
                        <Scatter 
                            data={matrixData} 
                            onClick={(point) => {
                                if (point && point.payload && point.payload.originalData) {
                                    onSelect(point.payload.originalData);
                                }
                            }} 
                            className="cursor-pointer"
                        >
                            {matrixData.map((point, index) => (
                                <Cell key={`cell-${index}`} fill={QUADRANT_CONFIG[point.quadrant].color} stroke={QUADRANT_CONFIG[point.quadrant].color.replace('0.7', '1')} strokeWidth={2}/>
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <MatrixLegend />
            {/* Fix: Passed selectedCityId to CorrelationScatterPlot */}
            <CorrelationScatterPlot selectedCityId={selectedCityId} />
            <ChatWidget 
               contextPrompt="Análise da Matriz de Maturidade 3.0 baseada em pilares estruturais." 
               initialMessage="Olá! Como posso ajudar a interpretar o posicionamento estratégico destas cidades?" 
               cityContext={MUNICIPIOS_PERFIL.find(m => m.municipio_id === selectedCityId)}
            />
        </div>
    );
};

export default CompetitivePositioningMatrix;