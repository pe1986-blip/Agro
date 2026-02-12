
import React from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
    Cell, PieChart, Pie, LabelList
} from 'recharts';
import { 
    Landmark, CircleDollarSign, Briefcase, Info, TrendingUp, ShieldCheck, 
    Coins, Scale, Building2
} from 'lucide-react';
import type { MunicipioPerfil } from './types';
import ToolTipExplainer from './ToolTipExplainer'; // Reusing the Explainer component

// --- WIDGET 1: MATRIZ DE CRÉDITO RURAL ---
const CreditMatrixWidget = ({ city }: { city: MunicipioPerfil }) => {
    const data = [
        { name: 'Custeio', value: city.economia.financas_agro?.credito_rural.razao_custeio || 60, fill: '#f59e0b', desc: 'Capital de Giro (Sobrevivência)' },
        { name: 'Investimento', value: city.economia.financas_agro?.credito_rural.razao_investimento || 30, fill: '#10b981', desc: 'Tecnologia & Máquinas (Crescimento)' },
        { name: 'Comercial.', value: city.economia.financas_agro?.credito_rural.razao_comercializacao || 10, fill: '#3b82f6', desc: 'Estocagem & Hedge (Estratégia)' },
    ];

    const totalMilhoes = city.economia.financas_agro?.credito_rural.total_tomado_ano || 0;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative group overflow-visible">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Landmark size={18} className="text-emerald-600"/> Matriz de Crédito (BCB)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Perfil da dívida do produtor local</p>
                </div>
                
                {/* TOOLTIP DE EXPLICAÇÃO */}
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-emerald-400">Fonte: Banco Central (SICOR)</p>
                        <p className="leading-relaxed">
                            Cidades com alta taxa de <strong>Investimento</strong> (>30%) estão comprando tecnologia e máquinas. É o melhor sinal de solvência e modernização. Custeio alto indica dependência de capital de giro.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%" cy="50%"
                            innerRadius={60} outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none"/>
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                            formatter={(value: number, name: string, props: any) => [`${value}%`, props.payload.desc]}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Volume</p>
                    <p className="text-lg font-black text-slate-800">R${totalMilhoes}M</p>
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 2: WEALTH MAP (PATRIMÔNIO) ---
const WealthMapWidget = ({ city }: { city: MunicipioPerfil }) => {
    const patrimonio = city.economia.financas_agro?.patrimonio;
    
    // Calcula um "Asset Score" visual (0-100) baseado no VTN
    const assetScore = Math.min(100, (patrimonio?.vtn_medio_ha || 10000) / 500); // 50k = 100

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Coins size={18} className="text-yellow-500"/> Wealth Map (Patrimônio)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Riqueza imobilizada na terra (Asset Rich)</p>
                </div>
                
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-yellow-400">Fonte: Receita Federal (VTN) + CAR</p>
                        <p className="leading-relaxed">
                            Mede o "PIB Patrimonial". Cidades com VTN alto (> R$ 30k/ha) têm famílias milionárias em ativos, mesmo que a renda mensal (Caged) pareça baixa. Alvo ideal para cursos de <strong>Gestão de Patrimônio</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {/* KPI Card 1: Valor da Terra */}
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Valor da Terra Nua (Médio)</p>
                        <p className="text-2xl font-black text-yellow-900 mt-1">R$ {(patrimonio?.vtn_medio_ha || 0).toLocaleString('pt-BR')}<span className="text-xs text-yellow-600 font-bold">/ha</span></p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white border-4 border-yellow-200 flex items-center justify-center shadow-sm">
                        <span className="text-xs font-black text-yellow-600">{Math.round(assetScore)}</span>
                    </div>
                </div>

                {/* KPI Card 2: Riqueza Total */}
                <div className="flex gap-4">
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Patrimônio Est.</p>
                        <p className="text-lg font-black text-slate-700">R$ {patrimonio?.patrimonio_imobilizado_total} Bi</p>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Alavancagem</p>
                        <p className={`text-lg font-black ${patrimonio?.razao_divida_patrimonio! > 0.4 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {(patrimonio?.razao_divida_patrimonio || 0) * 100}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 3: RADAR DE MATURIDADE CORPORATIVA (PJ) ---
const CorporateRadarWidget = ({ city }: { city: MunicipioPerfil }) => {
    const maturidade = city.economia.financas_agro?.maturidade_corporativa;
    const pjPct = maturidade?.pct_produtores_pj || 10;
    
    // Dados simulados para o gráfico de barras
    const data = [
        { name: 'Pessoa Física', value: 100 - pjPct, fill: '#cbd5e1' },
        { name: 'PJ / Holding', value: pjPct, fill: '#7c3aed' },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Building2 size={18} className="text-purple-600"/> Profissionalização (PJ)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Nível de formalização corporativa</p>
                </div>
                
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-purple-400">Fonte: RFB (CNAE Holdings)</p>
                        <p className="leading-relaxed">
                            Mede a "PJotização". Alta % de PJs indica gestão madura e sucessão planejada. É o gatilho para vender <strong>Governança Corporativa</strong> e <strong>Direito Societário</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4">
                {/* Bar Chart Horizontal */}
                <div className="h-16 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[{name: 'Ratio', pf: 100-pjPct, pj: pjPct}]} margin={{left:0, right:0}}>
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis type="category" hide dataKey="name" />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', fontSize: '12px' }}/>
                            <Bar dataKey="pf" stackId="a" fill="#cbd5e1" name="CPF (Produtor)" radius={[4, 0, 0, 4]} />
                            <Bar dataKey="pj" stackId="a" fill="#7c3aed" name="CNPJ (Holding)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center text-xs px-2">
                    <span className="font-bold text-slate-500">CPF: {100-pjPct}%</span>
                    <span className="font-bold text-purple-700">PJ: {pjPct}%</span>
                </div>

                {/* KPI Extra */}
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 flex items-center justify-between mt-2">
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-wide">Holdings Familiares Ativas</span>
                    <span className="text-xl font-black text-purple-900">{maturidade?.holdings_familiares_ativas}</span>
                </div>
            </div>
        </div>
    );
};

const FinancialDeepDive: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[350px]">
            <CreditMatrixWidget city={city} />
            <WealthMapWidget city={city} />
            <CorporateRadarWidget city={city} />
        </div>
    );
};

export default FinancialDeepDive;
