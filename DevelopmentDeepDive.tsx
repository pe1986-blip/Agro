
import React, { useState, useEffect } from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
    Cell, PieChart, Pie, LabelList, RadialBarChart, RadialBar
} from 'recharts';
import { 
    TrendingUp, Users, Zap, Info, Building, ShieldCheck, HeartHandshake, Briefcase, 
    Wifi, Clock, Droplets, Warehouse, Tractor, Loader2, Coins, Landmark
} from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';
import { DataLakeService, AgroInfraIndicators } from './services/dataLakeService';

// --- WIDGET 1: MOTOR DE CRESCIMENTO (INVESTIMENTO) ---
const InvestmentWidget = ({ city }: { city: MunicipioPerfil }) => {
    const macro = city.economia.macro_cenario;
    const investPublico = macro?.investimento.publico_empenhado_bi || 0.5;
    const investPrivado = macro?.investimento.privado_credito_pj_bi || 2.0;
    
    const data = [
        { name: 'Público (Infra)', value: investPublico, fill: '#6366f1' }, // Indigo
        { name: 'Privado (Crédito PJ)', value: investPrivado, fill: '#10b981' }, // Emerald
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative group overflow-visible">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-600"/> Motor de Crescimento
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Alavancagem Pública vs. Privada</p>
                </div>
                
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-blue-400">Proxies de Investimento</p>
                        <p className="leading-relaxed">
                            <strong>Público:</strong> Valor empenhado em despesas de capital (Siconfi).<br/>
                            <strong>Privado:</strong> Saldo da carteira de crédito PJ local (BCB).<br/>
                            Indica se o crescimento é orgânico (empresas) ou dependente do estado.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 40, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value: number) => [`R$ ${value.toFixed(1)} Bi`, 'Volume']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="value" position="right" formatter={(val: number) => `R$ ${val.toFixed(1)}B`} style={{fontSize: 11, fontWeight: 'bold', fill: '#475569'}} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- WIDGET 2: TERMÔMETRO SOCIAL (INCLUSÃO) ---
const SocialThermometerWidget = ({ city }: { city: MunicipioPerfil }) => {
    const social = city.economia.macro_cenario?.social;
    const vulnerabilidade = social?.vulnerabilidade_cadunico || 20;
    const creches = social?.cobertura_creches || 50;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <HeartHandshake size={18} className="text-rose-500"/> Termômetro Social
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Inclusão e Base Futura</p>
                </div>
                
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-rose-400">Indicadores de Longo Prazo</p>
                        <p className="leading-relaxed">
                            <strong>Vulnerabilidade:</strong> % de famílias no CadÚnico. Menor é melhor (mais renda autônoma).<br/>
                            <strong>Creches:</strong> Cobertura de 0-3 anos. Maior é melhor (libera mães para o mercado e prepara a base).
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Indicador 1: Vulnerabilidade (Quanto menor, melhor) */}
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Vulnerabilidade (CadÚnico)</span>
                        <span className={vulnerabilidade > 30 ? 'text-red-500' : 'text-emerald-500'}>{vulnerabilidade}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${vulnerabilidade > 30 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${Math.min(100, vulnerabilidade * 2)}%` }} // Escala visual ajustada
                        ></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 text-right">Média Nacional: ~35%</p>
                </div>

                {/* Indicador 2: Creches (Quanto maior, melhor) */}
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Cobertura de Creches</span>
                        <span className={creches < 30 ? 'text-red-500' : 'text-blue-500'}>{creches}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${creches < 30 ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{ width: `${creches}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 text-right">Meta PNE: 50%</p>
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 3: AMBIENTE DE NEGÓCIOS (COMPETITIVIDADE) ---
const BusinessEnvWidget = ({ city }: { city: MunicipioPerfil }) => {
    const comp = city.economia.macro_cenario?.competitividade;
    const horas = comp?.tempo_abertura_empresa_horas || 48;
    const internet = comp?.conectividade_rural_pct || 60;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Zap size={18} className="text-yellow-500"/> Competitividade Real
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Facilidade de Negócios (Doing Business)</p>
                </div>
                
                <div className="relative group/info z-50">
                    <Info size={16} className="text-slate-300 hover:text-blue-500 cursor-help"/>
                    <div className="absolute right-0 top-6 w-64 bg-slate-800 text-white text-[10px] p-3 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <p className="font-bold mb-1 text-yellow-400">Infraestrutura & Burocracia</p>
                        <p className="leading-relaxed">
                            <strong>Abertura:</strong> Tempo médio em horas (Redesim).<br/>
                            <strong>Conectividade:</strong> Cobertura 4G/5G na área rural (Anatel). Essencial para AgTech.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full items-center">
                {/* Card 1: Tempo */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center h-28">
                    <Clock size={24} className="text-slate-400 mb-2"/>
                    <p className="text-2xl font-black text-slate-800">{horas}h</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Para Abrir Empresa</p>
                </div>

                {/* Card 2: Conectividade */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center h-28">
                    <Wifi size={24} className={internet > 80 ? 'text-green-500' : 'text-slate-400'} mb-2/>
                    <p className="text-2xl font-black text-slate-800">{internet}%</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Cobertura Rural 4G</p>
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 4: TECNOLOGIA HÍDRICA (IRRIGAÇÃO) ---
const IrrigationWidget = ({ data }: { data: AgroInfraIndicators['irrigacao'] }) => {
    const usagePct = Math.min(100, (data.total_ha / data.potencial_expansao_ha) * 100);
    
    const chartData = [
        { name: 'Uso Atual', uv: usagePct, fill: '#0ea5e9' },
        { name: 'Potencial', uv: 100, fill: '#e0f2fe' }
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
             <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Droplets size={18} className="text-cyan-500"/> Tecnologia Hídrica
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Perímetros Irrigados & Pivôs</p>
                </div>
            </div>

            <div className="flex items-center gap-6 h-full">
                <div className="w-1/2 h-[120px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%" cy="50%"
                                innerRadius={40} outerRadius={55}
                                startAngle={90} endAngle={-270}
                                dataKey="uv"
                                stroke="none"
                            >
                                <Cell fill="#0ea5e9" />
                                <Cell fill="#f1f5f9" />
                            </Pie>
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-black fill-slate-800">
                                {data.pivos_ativos}
                            </text>
                            <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-bold fill-slate-400 uppercase">
                                Pivôs
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-3">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Área Irrigada</p>
                        <p className="text-lg font-black text-slate-800">{formatNumber(data.total_ha)} <span className="text-xs text-slate-500">ha</span></p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Potencial</p>
                        <p className="text-lg font-black text-cyan-600">+{formatNumber(data.potencial_expansao_ha - data.total_ha)} <span className="text-xs text-slate-500">ha</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- WIDGET 5: PERFIL DO PRODUTOR (FUNDIÁRIO) ---
const ProducerProfileWidget = ({ data }: { data: AgroInfraIndicators['fundiario'] }) => {
    const chartData = [
        { name: 'Familiar', value: data.pequeno_produtor_pct, fill: '#10b981' },
        { name: 'Médio', value: data.medio_produtor_pct, fill: '#f59e0b' },
        { name: 'Patronal', value: data.grande_produtor_pct, fill: '#6366f1' },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
             <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Tractor size={18} className="text-orange-600"/> Estrutura Fundiária
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Perfil do Público-Alvo (Aluno)</p>
                </div>
            </div>

            <div className="flex-1 relative min-h-[150px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }} barCategoryGap={15}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }} width={60} />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }} 
                            formatter={(value: number) => [`${value}%`, 'Participação']}
                            contentStyle={{ borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={25}>
                             {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="value" position="right" formatter={(val: number) => `${val}%`} style={{ fontSize: 10, fontWeight: 'bold', fill: '#475569' }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-2 text-center text-[10px] font-medium text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {data.grande_produtor_pct > 40 ? "Perfil Corporativo: Foco em MBA e Alta Gestão." : "Perfil Familiar: Foco em Sucessão e Técnica."}
            </div>
        </div>
    );
};

// --- WIDGET 6: GARGALO LOGÍSTICO (ARMAZENAGEM) ---
const StorageGapWidget = ({ data }: { data: AgroInfraIndicators['armazenagem'] }) => {
    const capacityPct = Math.min(100, (data.capacidade_estatica_ton / data.producao_anual_ton) * 100);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-visible">
             <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Warehouse size={18} className="text-slate-600"/> Infraestrutura Estática
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Capacidade de Armazenagem (CONAB)</p>
                </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-600">Cobertura da Safra</span>
                        <span className={capacityPct < 80 ? 'text-amber-500' : 'text-emerald-500'}>{capacityPct.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${capacityPct < 80 ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                            style={{ width: `${capacityPct}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Capacidade</p>
                        <p className="text-sm font-black text-slate-800">{formatNumber(data.capacidade_estatica_ton / 1000)}k <span className="text-[9px]">ton</span></p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                        <p className="text-[10px] font-black text-red-400 uppercase">Déficit</p>
                        <p className="text-sm font-black text-red-600">{formatNumber(data.deficit_ton / 1000)}k <span className="text-[9px]">ton</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NOVO WIDGET 7: SAÚDE FISCAL & FORMALIZAÇÃO ---
const FiscalHealthWidget = ({ city }: { city: MunicipioPerfil }) => {
    const fiscal = city.economia.financas_publicas;
    const agro = city.agro;
    
    // Dados para o Gráfico de Arrecadação (Comparativo ITR vs MEI)
    // Usamos um fator para "normalizar" a visualização, já que ITR costuma ser menor que MEI absoluto
    const chartData = [
        { name: 'Agro (ITR)', value: fiscal?.arrecadacao_itr_anual || 0, fill: '#10b981', label: 'Imposto Rural' },
        { name: 'Serviços (MEI)', value: fiscal?.arrecadacao_simples_mei || 0, fill: '#3b82f6', label: 'Empreendedorismo' },
    ];

    // Score de Formalização (Gauge)
    const formalizacaoScore = fiscal?.indice_formalizacao_rural || 50;
    
    // Análise de Dependência (FPM)
    const fpm = fiscal?.dependencia_fpm_pct || 0;
    let fpmStatus = { text: 'Baixa', color: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (fpm > 60) fpmStatus = { text: 'Crítica', color: 'text-red-500', bg: 'bg-red-50' };
    else if (fpm > 40) fpmStatus = { text: 'Moderada', color: 'text-amber-500', bg: 'bg-amber-50' };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full relative group overflow-visible">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Landmark size={18} className="text-purple-600"/> Saúde Fiscal & Formalização
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Transparência da Riqueza Local</p>
                </div>
                
                <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${fpmStatus.bg} ${fpmStatus.color} border border-opacity-20`}>
                    Dep. FPM: {fpmStatus.text} ({fpm}%)
                </div>
            </div>

            <div className="flex gap-6 h-full items-center">
                
                {/* Esquerda: Comparativo de Arrecadação */}
                <div className="flex-1 min-w-0 h-[160px]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 text-center">Base de Arrecadação (R$ Mi)</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }} barCategoryGap={20}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                formatter={(value: number) => [`R$ ${value.toFixed(1)} Mi`, 'Arrecadação']}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <LabelList dataKey="value" position="top" formatter={(v:number) => v.toFixed(1)} style={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> ITR</div>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> MEI</div>
                    </div>
                </div>

                {/* Direita: Índice de Formalização (Gauge) */}
                <div className="w-1/3 flex flex-col items-center justify-center border-l border-slate-100 pl-4">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                            <circle 
                                cx="48" cy="48" r="40" stroke={formalizacaoScore > 80 ? '#10b981' : (formalizacaoScore > 60 ? '#f59e0b' : '#ef4444')} 
                                strokeWidth="8" fill="transparent" 
                                strokeDasharray={251} 
                                strokeDashoffset={251 - (251 * formalizacaoScore) / 100} 
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-slate-800">{formalizacaoScore}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
                        </div>
                    </div>
                    <p className="text-[9px] text-center font-bold text-slate-500 mt-2 leading-tight">
                        Índice de Formalização Rural
                    </p>
                </div>

            </div>

            {/* Insight de Oportunidade */}
            {agro.pib_agro_bi > 1.0 && fiscal?.arrecadacao_itr_anual < 5 && (
                 <div className="mt-4 bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-start gap-2">
                    <Coins size={14} className="text-amber-600 mt-0.5 shrink-0"/>
                    <p className="text-[10px] text-amber-800 leading-tight">
                        <strong>Gap Detectado:</strong> PIB Agro alto ({agro.pib_agro_bi}Bi) mas ITR baixo. Indica alta informalidade fundiária. Oportunidade para cursos de <strong>Gestão Tributária</strong> e <strong>Regularização</strong>.
                    </p>
                 </div>
            )}
        </div>
    );
};

const DevelopmentDeepDive: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const [infraData, setInfraData] = useState<AgroInfraIndicators | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInfra = async () => {
            setLoading(true);
            try {
                const data = await DataLakeService.getProductionInfrastructure(city);
                setInfraData(data);
            } catch (error) {
                console.error("Erro ao carregar dados de infraestrutura:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInfra();
    }, [city]);

    if (loading) return (
        <div className="flex items-center justify-center h-[350px]">
            <Loader2 className="animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="space-y-6">
            
            {/* LINHA 1: MACRO ECONOMIA (Existente) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[320px]">
                <InvestmentWidget city={city} />
                <SocialThermometerWidget city={city} />
                <BusinessEnvWidget city={city} />
            </div>

            {/* LINHA 2: INFRAESTRUTURA PRODUTIVA (Novo - Baseado na imagem) */}
            {infraData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[320px]">
                    <IrrigationWidget data={infraData.irrigacao} />
                    <ProducerProfileWidget data={infraData.fundiario} />
                    <StorageGapWidget data={infraData.armazenagem} />
                </div>
            )}

            {/* LINHA 3: MATURIDADE FISCAL (NOVO!) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[340px]">
                <FiscalHealthWidget city={city} />
                {/* Espaço para futuro widget ou expansão do layout */}
                <div className="bg-slate-50 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400">
                    <Briefcase size={32} className="mb-2 opacity-50"/>
                    <p className="text-xs font-bold uppercase tracking-widest">Espaço para Expansão Jurídica</p>
                </div>
            </div>
        </div>
    );
};

export default DevelopmentDeepDive;
