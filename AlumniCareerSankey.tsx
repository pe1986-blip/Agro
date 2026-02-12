
import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip, Layer } from 'recharts';
import { Briefcase } from 'lucide-react';

interface AlumniCareerSankeyProps {
    municipality: string;
}

const COLORS: Record<string, string> = {
    'Formados': '#3B82F6',
    'Agronegócio': '#10B981',
    'Tecnologia': '#8B5CF6',
    'Serviços': '#F59E0B',
    'Indústria': '#EF4444',
    'Analista Jr': '#6366F1',
    'Trainee': '#EC4899',
    'Gestor': '#14B8A6',
    'Empreendedor': '#F97316'
};

const data = {
    nodes: [
        { name: 'Formados (Total)', color: COLORS['Formados'] },
        { name: 'Setor Agronegócio', color: COLORS['Agronegócio'] },
        { name: 'Setor Tecnologia', color: COLORS['Tecnologia'] },
        { name: 'Setor Serviços', color: COLORS['Serviços'] },
        { name: 'Setor Indústria', color: COLORS['Indústria'] },
        { name: 'Analista Jr', color: COLORS['Analista Jr'] },
        { name: 'Trainee', color: COLORS['Trainee'] },
        { name: 'Gestor', color: COLORS['Gestor'] },
        { name: 'Empreendedor', color: COLORS['Empreendedor'] },
    ],
    links: [
        { source: 0, target: 1, value: 500 }, // Formados -> Agro
        { source: 0, target: 2, value: 200 }, // Formados -> Tech
        { source: 0, target: 3, value: 200 }, // Formados -> Serviços
        { source: 0, target: 4, value: 100 }, // Formados -> Indústria

        { source: 1, target: 5, value: 200 }, // Agro -> Analista
        { source: 1, target: 6, value: 150 }, // Agro -> Trainee
        { source: 1, target: 7, value: 100 }, // Agro -> Gestor
        { source: 1, target: 8, value: 50 },  // Agro -> Empreendedor

        { source: 2, target: 5, value: 100 }, // Tech -> Analista
        { source: 2, target: 8, value: 100 }, // Tech -> Empreendedor

        { source: 3, target: 5, value: 150 }, // Serviços -> Analista
        { source: 3, target: 7, value: 50 },  // Serviços -> Gestor

        { source: 4, target: 6, value: 50 },  // Indústria -> Trainee
        { source: 4, target: 7, value: 50 },  // Indústria -> Gestor
    ]
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0].payload) {
        const { source, target, value } = payload[0].payload;
        if (!source || !target) {
            const node = payload[0].payload;
            return (
                <div className="bg-slate-800 text-white p-2 rounded shadow text-xs">
                    <span className="font-bold">{node.name}</span>: {payload[0].value} egressos
                </div>
            );
        }
        return (
            <div className="bg-slate-800 text-white p-2 rounded shadow text-xs">
                <span className="font-bold">{source.name}</span> → <span className="font-bold">{target.name}</span>: {value} egressos
            </div>
        );
    }
    return null;
};

const CustomNode = ({ x, y, width, height, index, payload, containerWidth }: any) => {
    if (!payload || !payload.name) return null; 
    const isOut = x + width + 6 > containerWidth;
    
    return (
        <Layer key={`CustomNode${index}`}>
            <rect x={x} y={y} width={width} height={height} fill={payload.color || '#ccc'} rx={4} />
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 8 : x + width + 8}
                y={y + height / 2}
                fontSize="12"
                fontWeight="bold"
                fill="#374151"
                alignmentBaseline="middle"
            >
                {payload.name}
            </text>
        </Layer>
    );
};

const AlumniCareerSankey: React.FC<AlumniCareerSankeyProps> = ({ municipality }) => {
    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm h-full flex flex-col">
             <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600"/>
                Tracking de Carreira: {municipality}
            </h3>
            <p className="text-sm text-gray-500 mb-6">Fluxo de empregabilidade dos egressos nos primeiros 2 anos após a formatura.</p>
            <div className="flex-1 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%" minHeight={400} minWidth={0}>
                    <Sankey
                        data={data}
                        node={<CustomNode />}
                        nodePadding={50}
                        margin={{ left: 20, right: 150, top: 20, bottom: 20 }}
                        link={{ stroke: '#D1D5DB', strokeOpacity: 0.4 }}
                    >
                        <Tooltip content={<CustomTooltip />} />
                    </Sankey>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AlumniCareerSankey;
