
import React from 'react';
import { 
  Users, Cpu, Telescope, Target, Building2, 
  GraduationCap, ShieldCheck, ClipboardCheck, Info
} from 'lucide-react';

const LegendItem: React.FC<{ 
    icon: React.ReactNode, 
    label: string, 
    weight: string, 
    desc: string,
    source: string 
}> = ({ icon, label, weight, desc, source }) => (
    <div className="flex gap-4 p-5 border-b border-slate-100 lg:border-b-0 lg:border-r last:border-0 hover:bg-slate-50 transition-all duration-300">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm shrink-0 h-fit">
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{label}</h4>
                <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded-md font-black shadow-sm">{weight}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-3">{desc}</p>
            <div className="flex items-center gap-1 mt-2.5">
                <Info size={10} className="text-slate-300"/>
                <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest truncate">Fonte: {source}</p>
            </div>
        </div>
    </div>
);

const TechnicalLegend: React.FC = () => {
    return (
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden mt-12 animate-fade-in">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <ClipboardCheck size={18} className="text-blue-600"/>
                        Dicionário Técnico & Pesos do Algoritmo RogerLens
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Metodologia Analytics v4.5 • Atualizado via Google Cloud Dataflow</p>
                </div>
                <div className="px-5 py-2.5 bg-white rounded-2xl border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-inner">
                    Confidencial • Uso Estratégico Interno
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
                <LegendItem 
                    icon={<Target size={18} className="text-rose-500"/>}
                    label="Gap de Talentos"
                    weight="25%"
                    desc="Cruzamento agressivo entre vagas abertas (CAGED) e volume de formandos locais. Identifica o déficit real de capital humano."
                    source="CAGED + INEP"
                />
                <LegendItem 
                    icon={<Cpu size={18} className="text-indigo-500"/>}
                    label="AgroTech Index"
                    weight="20%"
                    desc="Maturidade tecnológica regional (área irrigada, GPS, drones). Indica propensão a tickets médios altos e demanda por inovação."
                    source="IBGE PAM + Censo Agro"
                />
                <LegendItem 
                    icon={<Telescope size={18} className="text-purple-500"/>}
                    label="Alpha-10y (Futuro)"
                    weight="20%"
                    desc="Coeficiente de aceleração logística/demográfica via Regressão Logística. Detecta ativos 'Early Stage' com potencial exponencial."
                    source="Modelagem Preditiva RL"
                />
                <LegendItem 
                    icon={<Users size={18} className="text-emerald-500"/>}
                    label="Taxa de Penetração"
                    weight="15%"
                    desc="Métrica de Oceano Azul. Quanto menor o % da população alvo atendida, menor o Custo de Aquisição (CAC) e maior a escala."
                    source="INEP + IBGE Demográfico"
                />
                <LegendItem 
                    icon={<Building2 size={18} className="text-blue-500"/>}
                    label="Potencial de Mercado"
                    weight="10%"
                    desc="Massa crítica de alunos em idade escolar combinada com o poder de compra (PIB per capita) do município."
                    source="IBGE Renda + RAIS"
                />
                <LegendItem 
                    icon={<ShieldCheck size={18} className="text-slate-500"/>}
                    label="Risco & Qualidade"
                    weight="10%"
                    desc="Média entre Saturação Concorrencial (5%) e Saúde Acadêmica/Enade (5%). Proteção contra mercados predatórios e baixa retenção."
                    source="e-MEC + Enade"
                />
            </div>

            <div className="bg-slate-950 p-4 text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
                    Algoritmo Proprietário RogerLens Intelligence • Versão 3.6 • Build 2024.11.24
                </p>
            </div>
        </div>
    );
};

export default TechnicalLegend;
