import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Search } from 'lucide-react';
import type { MunicipioPerfil } from './types';

const InsightCard = ({ title, value, icon: Icon, color, description }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${color.bg} ${color.text} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">Horizonte 2026</span>
        </div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-xl md:text-2xl font-black text-slate-800 mb-4 leading-tight">{value}</p>
        <div className="w-full h-px bg-slate-100 mb-4"></div>
        <p className="text-xs font-medium text-slate-500 leading-relaxed">
            {description}
        </p>
    </div>
);

const CityPlaybookView: React.FC<{ city: MunicipioPerfil }> = ({ city }) => {
    // Verifica se é sede (Goiânia ou Score alto)
    // Cast to any to access hub_analise safely
    const hubScore = (city as any).hub_analise?.score_geral || 0;
    const isSede = city.municipio_id === 5208707 || hubScore > 80;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <InsightCard 
                title="Modelo de Entrada"
                value={isSede ? "Hub Premium Presencial" : "Polo Híbrido Avançado"}
                icon={CheckCircle}
                color={{ bg: 'bg-emerald-100', text: 'text-emerald-600' }}
                description={isSede 
                    ? "Cidade comporta ticket médio > R$ 1.200. Foco em MBAs executivos e eventos de networking. Estrutura física de alto padrão exigida."
                    : "Foco em cursos técnicos e graduação híbrida. Ticket médio ~R$ 600. Estrutura enxuta em parceria com empresas locais."
                }
            />

            <InsightCard 
                title="Janela de Oportunidade"
                value="Imediata (Q1/Q2)"
                icon={TrendingUp}
                color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
                description="Concorrência atual está focada em preço (commodities). Existe um vácuo de oferta para produtos de alta especialização agro."
            />

            <InsightCard 
                title="Ponto de Atenção"
                value={isSede ? "Custo de Mídia (CAC)" : "Logística Docente"}
                icon={AlertTriangle}
                color={{ bg: 'bg-amber-100', text: 'text-amber-600' }}
                description={isSede
                    ? "O CPM em Goiânia é 40% maior que a média. Necessário força de vendas B2B (Consultores) para não depender só de ads."
                    : "Difícil atrair doutores para residir. Requer modelo de professores volantes ou aulas síncronas transmitidas da Sede."
                }
            />

        </div>
    );
};

export default CityPlaybookView;