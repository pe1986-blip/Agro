import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { formatNumber, formatPercent } from './constants';
import type { MunicipioPerfil, AgroIndicadores } from './types';

const COLORS = ['#FFBB28', '#00C49F', '#0088FE', '#FF8042', '#AF19FF'];

const WidgetLoader: React.FC = () => (
    <div className="flex justify-center items-center h-[250px] w-full bg-gray-50 rounded-lg">
        <Loader2 size={32} className="animate-spin text-gray-400" />
    </div>
);

// --- WIDGET 1: ÁREA PLANTADA ---
interface AreaPlantadaProps {
    data: { name: string; 'Soja (ha)': number; 'Milho (ha)': number; 'Algodão (ha)': number }[];
    isLoading: boolean;
}

export const AreaPlantadaWidget: React.FC<AreaPlantadaProps> = ({ data, isLoading }) => {
    if (isLoading) return <WidgetLoader />;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(val) => `${formatNumber(Number(val) / 1000)}k`} />
                <Tooltip formatter={(value) => formatNumber(value as number, 'decimal')} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Soja (ha)" stackId="a" fill={COLORS[0]} name="Soja" />
                <Bar dataKey="Milho (ha)" stackId="a" fill={COLORS[1]} name="Milho" />
                <Bar dataKey="Algodão (ha)" stackId="a" fill={COLORS[2]} name="Algodão" />
            </BarChart>
        </ResponsiveContainer>
    );
};

// --- WIDGET 2: REBANHOS ---
interface RebanhosProps {
    data: { name: string; 'Bovinos': number; 'Suínos': number }[];
    isLoading: boolean;
}

export const RebanhosWidget: React.FC<RebanhosProps> = ({ data, isLoading }) => {
    if (isLoading) return <WidgetLoader />;

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(val) => `${formatNumber(Number(val) / 1000)}k`} />
                <Tooltip formatter={(value) => formatNumber(value as number, 'decimal')} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="Bovinos" stroke={COLORS[3]} strokeWidth={2} />
                <Line type="monotone" dataKey="Suínos" stroke={COLORS[4]} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

// --- WIDGET 3: EXPORTAÇÕES ---
interface ExportacoesProps {
    cities: MunicipioPerfil[];
    agroData: Record<number, AgroIndicadores | null>;
    isLoading: boolean;
}

const seededRandom = (seed: number) => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    return (a * seed + c) % m / m;
};

export const ExportacoesWidget: React.FC<ExportacoesProps> = ({ cities, agroData, isLoading }) => {
    if (isLoading) return <WidgetLoader />;

    return (
        <div className="grid grid-cols-2 gap-4 h-[250px] content-start overflow-y-auto">
            {cities.map(city => {
                const data = agroData[city.municipio_id];
                const value = data ? data.exportacoes_valor_usd : 0;
                const trendUp = seededRandom(city.municipio_id) > 0.4;
                
                return (
                    <div key={city.municipio_id} className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-xs font-semibold text-gray-600 truncate">{city.nome}</p>
                        <p className="text-lg font-bold text-blue-700 my-1">
                            ${formatNumber(value / 1_000_000, 'decimal')} M
                        </p>
                         <div className={`flex items-center justify-center text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            {trendUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                            <span>{trendUp ? '+' : '-'}{formatNumber(seededRandom(city.municipio_id*2)*5 + 1)}%</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- WIDGET 4: CONFORMIDADE AMBIENTAL (CAR) ---
interface ConformidadeCARProps {
    cities: MunicipioPerfil[];
    agroData: Record<number, AgroIndicadores | null>;
    isLoading: boolean;
}

export const ConformidadeCARWidget: React.FC<ConformidadeCARProps> = ({ cities, agroData, isLoading }) => {
    if (isLoading) return <WidgetLoader />;

    return (
         <div className="grid grid-cols-2 gap-2 h-[250px] content-start overflow-y-auto">
             {cities.map(city => {
                 const data = agroData[city.municipio_id];
                 const compliancePct = data ? data.conformidade_ambiental_pct : 0;
                 const pieData = [
                     { name: 'Conforme', value: compliancePct },
                     { name: 'Não Conforme', value: 100 - compliancePct },
                 ];
                 return (
                     <div key={city.municipio_id} className="text-center">
                         <p className="text-xs font-semibold text-gray-600 truncate mb-1">{city.nome}</p>
                         <ResponsiveContainer width="100%" height={80}>
                             <PieChart>
                                 <Pie
                                     data={pieData}
                                     cx="50%"
                                     cy="50%"
                                     innerRadius={20}
                                     outerRadius={35}
                                     fill="#8884d8"
                                     paddingAngle={5}
                                     dataKey="value"
                                 >
                                    <Cell key="cell-0" fill={COLORS[1]} />
                                    <Cell key="cell-1" fill="#E0E0E0" />
                                 </Pie>
                                 <Tooltip formatter={(value) => `${formatNumber(value as number)}%`} />
                             </PieChart>
                         </ResponsiveContainer>
                         <p className="text-sm font-bold text-emerald-700">{formatPercent(compliancePct)}</p>
                     </div>
                 );
             })}
         </div>
    );
};