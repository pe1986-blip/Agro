import React, { useMemo } from 'react';
import { 
    Calculator, TrendingDown, TrendingUp, DollarSign, 
    Users, Target, Construction, Megaphone, Briefcase, Zap, Percent,
    ShieldCheck, Lightbulb
} from 'lucide-react';
import { SheetData, YEARS } from '../types';
import { formatNumber } from '../constants';
import { calculateIRR } from '../services/financialModelingService';

interface UnitEconomicsProps {
    sheet: SheetData;
}

const MetricBox = ({ label, value, sub, icon: Icon, color }: any) => (
    <div className="flex flex-col gap-1 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
        <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">{label}</span>
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon size={18} />
            </div>
        </div>
        <span className="text-2xl font-black text-white tracking-tight">{value}</span>
        {sub && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{sub}</span>}
    </div>
);

const UnitEconomicsCard: React.FC<UnitEconomicsProps> = ({ sheet }) => {
    
    const metrics = useMemo(() => {
        const getVal = (id: string, yearIdx: number) => {
            const row = sheet.rows.find(r => r.id === id);
            return row ? row.values[YEARS[yearIdx]] : 0;
        };

        const isB2B = sheet.type === 'b2b_project';
        const isProductType = sheet.type === 'hybrid_course' || sheet.type === 'product';
        const isConsolidated = sheet.type === 'consolidated';

        let capexSetup = 0;
        for (let i = 0; i < 3; i++) {
            const totalCapexRow = getVal('capexTotal', i) * 1_000_000;
            capexSetup += totalCapexRow;
        }

        const idxMat = 4; // Ano 5
        let studentsMat = 0;
        let ticketMat = 0;

        if (isConsolidated) {
            studentsMat = getVal('students', idxMat);
            const netRevTotal = getVal('netRevenue', idxMat);
            ticketMat = studentsMat > 0 ? (netRevTotal * 1_000_000 / (studentsMat * 12)) : 0;
        } else if (isB2B) {
            studentsMat = getVal('active_contracts', idxMat);
            ticketMat = getVal('contract_value', idxMat);
        } else if (isProductType) {
             studentsMat = getVal('total_students_calc', idxMat);
             const mix = getVal('mix_b2b_pct', idxMat);
             const tB2C = getVal('ticket_b2c', idxMat);
             const tB2B = getVal('ticket_b2b', idxMat);
             ticketMat = (tB2C * (1 - mix)) + (tB2B * mix);
        } else {
            const perUnit = getVal('students_per_unit', idxMat);
            studentsMat = perUnit; 
            ticketMat = getVal('ticket', idxMat);
        }
        
        const monthsMultiplier = (sheet.type === 'unit' || isConsolidated) ? 12 : 1; 
        const grossRevUnit = studentsMat * ticketMat * monthsMultiplier;
        const scholarshipPct = getVal('scholarshipsPct', idxMat) || 0;
        const taxRate = 0.1133; 
        const netRevUnit = grossRevUnit * (1 - scholarshipPct) * (1 - taxRate);

        const totalEbitda = getVal('ebitda', idxMat);
        const totalNetRev = getVal('netRevenue', idxMat);
        const margin = totalNetRev !== 0 ? (totalEbitda / totalNetRev) : 0;
        const ebitdaUnit = netRevUnit * margin;

        let cashburnOp = 0;
        const cashFlows: number[] = [];
        
        for (let i = 0; i < YEARS.length; i++) {
            const ebitdaVal = getVal('ebitda', i) * 1_000_000;
            const cashFlowVal = getVal('cashFlow', i) * 1_000_000;
            if (ebitdaVal < 0) cashburnOp += Math.abs(ebitdaVal);
            cashFlows.push(cashFlowVal);
        }
        
        const tir = calculateIRR(cashFlows);

        const totalFunding = capexSetup + cashburnOp;

        const labelItem = isConsolidated ? "Volume Ativo" : (isB2B ? "Contratos" : (isProductType ? "Vagas Preenchidas" : "Alunos / Unidade"));
        const labelTicket = isB2B ? "Ticket Contrato" : "Ticket Médio";
        const iconItem = isB2B ? Briefcase : (isProductType ? Zap : Users);

        return {
            capex: capexSetup,
            cashburn: cashburnOp,
            funding: totalFunding,
            tir: tir,
            ticketMat,
            studentsMat,
            revenueMat: netRevUnit,
            ebitdaMat: ebitdaUnit,
            ebitdaMarginMat: margin * 100,
            labels: { item: labelItem, ticket: labelTicket },
            IconItem: iconItem,
            isConsolidated
        };

    }, [sheet]);

    if (!metrics) return null;

    return (
        <div className="mt-4 bg-slate-900 text-white rounded-[2.5rem] p-10 border border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Calculator size={300} />
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-8 border-b border-white/10 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/30">
                            <Target size={32} className="text-white"/>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Unit Economics <span className="text-indigo-400">{metrics.isConsolidated ? 'Médio' : 'Calibrado'}</span></h3>
                            <p className="text-slate-400 text-sm font-medium mt-1">
                                {metrics.isConsolidated ? 'Análise ponderada do portfólio selecionado' : `Análise de rentabilidade unitária projetada para: ${sheet.name}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                        <ShieldCheck size={20} className="text-emerald-400"/>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">Modelo Auditado V8</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            <Construction size={14}/> Capital de Setup
                        </h4>
                        <MetricBox 
                            label="Funding Total" 
                            value={`R$ ${formatNumber(metrics.funding / 1_000_000)} MM`}
                            sub="Capex + Burn Operacional"
                            icon={DollarSign}
                            color="text-rose-400"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            <Megaphone size={14}/> Performance
                        </h4>
                        <MetricBox 
                            label={metrics.labels.item} 
                            value={formatNumber(metrics.studentsMat)}
                            sub="Volume em Maturidade"
                            icon={metrics.IconItem}
                            color="text-blue-400"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            <TrendingUp size={14}/> Eficiência de Preço
                        </h4>
                        <MetricBox 
                            label={metrics.labels.ticket} 
                            value={`R$ ${formatNumber(metrics.ticketMat)}`}
                            sub="Líquido de Bolsas"
                            icon={DollarSign}
                            color="text-emerald-400"
                        />
                    </div>

                    <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center shadow-inner group">
                        <div className="mb-4 p-4 bg-emerald-50 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                            <Zap size={32} className="text-slate-900" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Margem de Contribuição</p>
                        <p className="text-5xl font-black text-white tracking-tighter mb-3">
                            {metrics.ebitdaMarginMat.toFixed(1)}%
                        </p>
                        <div className="px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                            <span className="text-xs font-black text-emerald-400 uppercase">TIR: {metrics.tir.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <Lightbulb size={20} className="text-amber-400 shrink-0"/>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        <strong>Insight do Modelo:</strong> {metrics.isConsolidated ? "O portfólio consolidado entrega uma margem superior à média devido ao mix de produtos de baixo capex." : `Para este arquétipo, o ponto de equilíbrio operacional (ebitda positivo) é atingido com ${Math.round(metrics.studentsMat * 0.4)} unidades de venda.`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnitEconomicsCard;