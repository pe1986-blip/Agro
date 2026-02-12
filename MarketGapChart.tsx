
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface MarketGapChartProps {
  municipality: string;
}

const generateMockData = (municipality: string) => {
    const CARGOS = ["Eng. Agrônomo", "Téc. Agrícola", "Zootecnista", "Tratorista", "Veterinário"];
    const seed = municipality.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return CARGOS.map((cargo, i) => {
        const seededRandom = (s: number) => {
            const x = Math.sin(s) * 10000;
            return x - Math.floor(x);
        }
        const baseDemand = (seed % (i + 1) * 5) + 10;
        const baseOffer = baseDemand * (0.5 + seededRandom(i));
        return {
            cargo,
            "Demanda (Vagas Caged)": Math.round(baseDemand + seededRandom(i+1) * 15),
            "Oferta (Formandos Censo)": Math.round(baseOffer + seededRandom(i+2) * 10),
        }
    });
};

const MarketGapChart: React.FC<MarketGapChartProps> = ({ municipality }) => {
    const data = useMemo(() => generateMockData(municipality), [municipality]);

    return (
        <div className="w-full h-[300px] relative min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cargo" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Demanda (Vagas Caged)" fill="#EF4444" />
                    <Bar dataKey="Oferta (Formandos Censo)" fill="#3B82F6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MarketGapChart;
