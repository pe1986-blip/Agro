
import React, { useMemo } from 'react';
import { 
  Users, Building2, Zap, Target, Wallet, 
  Activity, Globe, Lock, AlertTriangle, ShieldCheck, 
  ArrowRight, LayoutGrid, DollarSign, PieChart, Handshake, Heart
} from 'lucide-react';
import type { MunicipioPerfil } from './types';
import { formatNumber } from './constants';

interface RiskItem {
  risk: string;
  mitigation: string;
  severity: 'High' | 'Medium' | 'Low';
}

const StickyNote = ({ title, items, color, icon: Icon }: any) => (
  <div className={`h-full p-4 rounded-xl border-l-4 ${color.border} ${color.bg} flex flex-col shadow-sm hover:shadow-md transition-all`}>
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/5">
      <Icon size={16} className={color.text} />
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">{title}</h4>
    </div>
    <ul className="space-y-2 flex-1">
      {items.map((item: string, idx: number) => (
        <li key={idx} className="text-[11px] font-medium text-slate-600 leading-snug flex items-start gap-2">
          <span className={`mt-1 w-1 h-1 rounded-full shrink-0 ${color.dot}`}></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const RiskCard: React.FC<RiskItem> = ({ risk, mitigation, severity }) => {
    const color = severity === 'High' ? 'red' : (severity === 'Medium' ? 'amber' : 'blue');
    
    return (
        <div className={`p-4 rounded-xl border border-${color}-200 bg-${color}-50/50 flex flex-col gap-2`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className={`text-${color}-600`}/>
                    <span className={`text-xs font-bold text-${color}-800 uppercase`}>Risco: {risk}</span>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded bg-white border border-${color}-200 text-${color}-600 uppercase`}>
                    {severity}
                </span>
            </div>
            <div className="pl-6 border-l-2 border-slate-300">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mitigação (Plano B)</p>
                <p className="text-xs font-medium text-slate-700">{mitigation}</p>
            </div>
        </div>
    );
};

const generateCanvasData = (city: MunicipioPerfil) => {
    const isSede = city.tier === 'SEDE' || city.tier === 'UNA';
    const isAgroHigh = city.agro.nivel_tecnologico === 'Alto';

    return {
        keyPartners: [
            "Empresas-Âncora (B2B)",
            "Cooperativas Locais",
            "Governo/Prefeitura",
            "EMBRAPA/Institutos"
        ],
        keyActivities: [
            "Ensino Híbrido (Radial)",
            "Gestão de Parcerias",
            "Pesquisa Aplicada (P&D)",
            "Eventos & Networking"
        ],
        keyResources: [
            "Plataforma Digital",
            "Laboratórios Vivos",
            "Corpo Docente (Practitioners)",
            "Marca Ânima"
        ],
        valuePropositions: [
            "Empregabilidade Real",
            "Resolução de Dores da Cadeia",
            "Networking de Elite",
            "Diploma com Grife"
        ],
        customerRelationships: [
            "Mentoria de Carreira",
            "Comunidade Alumni",
            "Consultoria Continuada",
            "Hub de Inovação"
        ],
        channels: [
            "Venda Consultiva B2B",
            "Hub Físico (Campus)",
            "Plataforma Digital",
            "Eventos Setoriais"
        ],
        customerSegments: [
            "Sucessores Familiares",
            "Executivos do Agro",
            "Técnicos em Transição",
            "Corporativo (In-Company)"
        ],
        costStructure: [
            "Folha Docente Qualificada",
            "Manutenção de Labs/Infra",
            "Marketing & CAC",
            "Tecnologia/Licenças"
        ],
        revenueStreams: [
            "Mensalidades (Grad/Pós)",
            "Contratos Corporativos B2B",
            "Projetos de P&D",
            "Patrocínios/Eventos"
        ]
    };
};

const generateRiskAnalysis = (city: MunicipioPerfil): RiskItem[] => {
    const risks: RiskItem[] = [];
    
    // Risco 1: Concorrência
    if (city.educacao.total_ies_ativas > 10) {
        risks.push({
            risk: "Saturação de Mercado (Red Ocean)",
            mitigation: "Focar 100% em nichos premium e B2B onde as IES de massa não conseguem entregar qualidade.",
            severity: 'High'
        });
    } else {
        risks.push({
            risk: "Entrada de Novos Players",
            mitigation: "Bloquear canais de distribuição via parcerias exclusivas com as principais cooperativas locais.",
            severity: 'Medium'
        });
    }

    // Risco 2: Docência
    if (city.populacao_total < 100000) {
        risks.push({
            risk: "Apagão Docente (Falta de PhDs locais)",
            mitigation: "Modelo 'Professor Volante' e aulas síncronas transmitidas da Sede Goiânia. Contratação de practitioners locais como mentores.",
            severity: 'High'
        });
    } else {
        risks.push({
            risk: "Custo Docente Elevado",
            mitigation: "Mix otimizado de tutores digitais e professores estrelas para garantir margem.",
            severity: 'Medium'
        });
    }

    // Risco 3: Econômico
    if (city.economia.risco_credito.inadimplencia_pf > 30) {
        risks.push({
            risk: "Inadimplência Elevada",
            mitigation: "Foco agressivo em vendas B2B (empresa paga) e seguro educacional na mensalidade.",
            severity: 'High'
        });
    } else {
        risks.push({
            risk: "Volatilidade de Commodities",
            mitigation: "Diversificação de portfólio para incluir cursos anticíclicos (Gestão de Crise, Recuperação Judicial).",
            severity: 'Low'
        });
    }

    return risks;
};

const BusinessModelCanvasView: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    const data = useMemo(() => generateCanvasData(city), [city]);
    const risks = useMemo(() => generateRiskAnalysis(city), [city]);

    return (
        <div className="animate-fade-in space-y-12">
            
            {/* Header */}
            <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    <LayoutGrid size={12} /> Blueprint Estratégico
                </div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">O Modelo de Negócio (BMC)</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
                    A arquitetura de valor consolidada para {city.nome}, integrando todas as camadas de análise anteriores.
                </p>
            </div>

            {/* THE CANVAS GRID */}
            <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
                <div className="grid grid-cols-5 grid-rows-[auto_auto_auto] gap-4 min-h-[600px]">
                    
                    {/* Key Partners */}
                    <div className="col-span-1 row-span-2">
                        <StickyNote 
                            title="Parcerias Chave" 
                            items={data.keyPartners} 
                            icon={Handshake} 
                            color={{ border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400' }}
                        />
                    </div>

                    {/* Key Activities */}
                    <div className="col-span-1 row-span-1 h-full">
                        <StickyNote 
                            title="Atividades Chave" 
                            items={data.keyActivities} 
                            icon={Activity} 
                            color={{ border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-400' }}
                        />
                    </div>

                    {/* Key Resources (Nested under Activities visually in standard canvas, but grid places it below) */}
                    <div className="col-span-1 row-span-1 h-full">
                        <StickyNote 
                            title="Recursos Chave" 
                            items={data.keyResources} 
                            icon={Building2} 
                            color={{ border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-400' }}
                        />
                    </div>

                    {/* Value Propositions (Center) */}
                    <div className="col-span-1 row-span-2">
                        <StickyNote 
                            title="Proposta de Valor" 
                            items={data.valuePropositions} 
                            icon={Target} 
                            color={{ border: 'border-purple-400', bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400' }}
                        />
                    </div>

                    {/* Customer Relationships */}
                    <div className="col-span-1 row-span-1">
                        <StickyNote 
                            title="Relacionamento" 
                            items={data.customerRelationships} 
                            icon={Heart} 
                            color={{ border: 'border-amber-400', bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' }}
                        />
                    </div>

                    {/* Channels */}
                    <div className="col-span-1 row-span-1">
                        <StickyNote 
                            title="Canais" 
                            items={data.channels} 
                            icon={Globe} 
                            color={{ border: 'border-amber-400', bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' }}
                        />
                    </div>

                    {/* Customer Segments */}
                    <div className="col-span-1 row-span-2">
                        <StickyNote 
                            title="Segmentos de Cliente" 
                            items={data.customerSegments} 
                            icon={Users} 
                            color={{ border: 'border-rose-400', bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-400' }}
                        />
                    </div>

                    {/* Cost Structure (Bottom Left) */}
                    <div className="col-span-2.5 row-span-1">
                         <StickyNote 
                            title="Estrutura de Custos" 
                            items={data.costStructure} 
                            icon={PieChart} 
                            color={{ border: 'border-slate-400', bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' }}
                        />
                    </div>

                    {/* Revenue Streams (Bottom Right) */}
                    <div className="col-span-2.5 row-span-1">
                        <StickyNote 
                            title="Fontes de Receita" 
                            items={data.revenueStreams} 
                            icon={DollarSign} 
                            color={{ border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' }}
                        />
                    </div>

                </div>
            </div>

            {/* --- SECTION: RISKS & MITIGATION (THE REQUESTED ADDITION) --- */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 shadow-inner">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-rose-600">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Matriz de Riscos & Mitigação</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Análise Pre-Mortem</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {risks.map((risk, idx) => (
                        <RiskCard 
                            key={idx} 
                            risk={risk.risk} 
                            mitigation={risk.mitigation} 
                            severity={risk.severity} 
                        />
                    ))}
                </div>
                
                <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                    <Target size={20} className="text-blue-500 mt-1 shrink-0"/>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Estratégia de Hedge</p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            A estrutura híbrida (Presencial + Digital + B2B) foi desenhada propositalmente para mitigar esses riscos. Se o varejo (B2C) cair, o contrato corporativo (B2B) sustenta a operação. Se o presencial for caro, o digital escala a margem.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BusinessModelCanvasView;
