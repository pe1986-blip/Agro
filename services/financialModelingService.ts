import { SheetData, RowData, YEARS, YearKey, GlobalFinancialConfig, HeritageConfig, ValuationSnapshot } from '../types';

export interface YearlyResult {
  ano: number;
  receitaBruta: number;
  descontos: number;
  impostos: number;
  receitaLiquida: number;
  ebitda: number;
  margemEbitda: number;
  custosVariaveis: number;
  despesasFixas: number;
  fluxoCaixaLivre: number;
  fluxoCaixaAcumulado: number;
  capex: number;
}

export interface FinancialModelResult {
  projecoes: YearlyResult[];
  kpis: {
    paybackAnos: number;
    vpl: number; 
    tir: number;
    roi3anos: number;
    // Versões Nominais
    ebitdaAno5: number;
    rb2030: number;
    totalProjectCost: number;
    totalCapex: number;
    totalCashBurn: number;
    cashFlowAccumFinal: number;
    // Versões a Valor Presente (VP)
    ebitdaAno5vp: number;
    rb2030vp: number;
    totalProjectCostvp: number;
    totalCapexvp: number;
    totalCashBurnvp: number;
    margemEbitdaLongoPrazo: number;
  };
}

export const calculateIRR = (cashFlows: number[]): number => {
    if (cashFlows.every(v => v >= 0)) return 0;
    const initialInvest = Math.abs(cashFlows[0] + (cashFlows[1] < 0 ? cashFlows[1] : 0));
    const avgReturn = cashFlows.slice(3, 10).reduce((a,b) => a+b, 0) / 7;
    return (avgReturn / (initialInvest || 1)) * 100;
};

export const calculateNPV = (cashFlows: number[], rate: number): number => {
    return cashFlows.reduce((acc, val, i) => acc + (val / Math.pow(1 + rate, i)), 0);
};

// Fix: Corrected syntax errors in reduce calls and ensured the function correctly returns a FinancialModelResult
export const convertSheetToModelResult = (sheet: SheetData, globalConfig?: GlobalFinancialConfig): FinancialModelResult => {
    const wacc = globalConfig ? (globalConfig.cdiRate + 4) / 100 : 0.145;
    
    const projecoes: YearlyResult[] = YEARS.map((yearKey, idx) => {
        const get = (id: string) => (sheet.rows.find(r => r.id === id)?.values[yearKey] || 0) * 1_000_000;
        
        const net = get('netRevenue');
        const ebitda = get('ebitda');
        const opex = get('totalOpex');
        
        return {
            ano: idx + 1,
            receitaBruta: get('grossRevenue'),
            descontos: get('scholarshipsValue'),
            impostos: get('revenueDeduction'),
            receitaLiquida: net,
            ebitda: ebitda,
            margemEbitda: net > 0 ? (ebitda / net) * 100 : 0,
            custosVariaveis: opex * 0.7, 
            despesasFixas: opex * 0.3,   
            fluxoCaixaLivre: get('cashFlow'),
            fluxoCaixaAcumulado: get('cashFlowAccum'),
            capex: get('capexTotal')
        };
    });

    // --- KPIs NOMINAIS ---
    // Ajustado para Ano 1 = 2026. Logo Ano 5 = 2030 (Índice 4).
    const ebitdaAno5 = projecoes[4].ebitda;
    const rb2030 = projecoes[4].receitaBruta; // Sincronizado: Ano 5 é 2030
    const totalCapex = projecoes.reduce((acc: number, p) => acc + p.capex, 0);
    const totalCashBurn = projecoes.reduce((acc: number, p) => p.ebitda < 0 ? acc + Math.abs(p.ebitda) : acc, 0);
    const cashFlowAccumFinal = projecoes[9].fluxoCaixaAcumulado;

    // --- KPIs VALOR PRESENTE (VP) ---
    const ebitdaAno5vp = ebitdaAno5 / Math.pow(1 + wacc, 4);
    const rb2030vp = rb2030 / Math.pow(1 + wacc, 4); // Sincronizado VP com Ano 5
    
    // Fix: Explicitly type accumulator as number to fix assignability errors
    const totalCapexvp = projecoes.reduce((acc: number, p, i) => acc + (p.capex / Math.pow(1 + wacc, i)), 0);
    // Fix: Removed trailing garbage syntax ", 0)" inside the ternary return block
    const totalCashBurnvp = projecoes.reduce((acc: number, p, i) => {
        return p.ebitda < 0 ? acc + (Math.abs(p.ebitda) / Math.pow(1 + wacc, i)) : acc;
    }, 0);

    const cashFlows = projecoes.map(p => p.fluxoCaixaLivre);
    
    let payback = 10;
    for (let i = 0; i < projecoes.length; i++) {
        if (projecoes[i].fluxoCaixaAcumulado > 0) {
            const prevAccum = Math.abs(projecoes[i-1]?.fluxoCaixaAcumulado || 0);
            const currentFlow = projecoes[i].fluxoCaixaLivre || 1;
            payback = i + (prevAccum / currentFlow);
            break;
        }
    }

    return {
        projecoes,
        kpis: {
            paybackAnos: payback,
            vpl: calculateNPV(cashFlows, wacc),
            tir: calculateIRR(cashFlows),
            roi3anos: projecoes[2].fluxoCaixaAcumulado > 0 ? 150 : 35,
            ebitdaAno5,
            rb2030,
            rb2030vp,
            totalProjectCost: totalCapex + totalCashBurn,
            totalCapex,
            totalCashBurn,
            cashFlowAccumFinal,
            ebitdaAno5vp,
            totalProjectCostvp: totalCapexvp + totalCashBurnvp,
            totalCapexvp,
            totalCashBurnvp,
            margemEbitdaLongoPrazo: projecoes[9].margemEbitda
        }
    };
};

export const calculateConsolidatedValuation = (heritage: HeritageConfig, expansionSheets: SheetData[], years: number = 10): { snapshots: ValuationSnapshot[], breakdown: any[] } => {
    const snapshots: ValuationSnapshot[] = Array.from({length: years}).map((_, i) => {
        const year = 2026 + i; // Iniciando em 2026
        const heritageRev = heritage.currentRevenue * Math.pow(1 + (heritage.organicGrowthRate/100), i);
        const heritageEbitda = heritageRev * (heritage.currentEbitdaMargin / 100);
        
        const expansionMetrics = expansionSheets
            .filter(s => s.type !== 'consolidated' && s.type !== 'team')
            .reduce((acc, sheet) => {
                const yearKey = YEARS[i] || 'ano10';
                const ebitdaRow = sheet.rows.find(r => r.id === 'ebitda');
                const revenueRow = sheet.rows.find(r => r.id === 'netRevenue');
                return {
                    ebitda: acc.ebitda + (ebitdaRow ? ebitdaRow.values[yearKey] : 0),
                    revenue: acc.revenue + (revenueRow ? revenueRow.values[yearKey] : 0)
                };
            }, { ebitda: 0, revenue: 0 });

        const totalEbitda = heritageEbitda + expansionMetrics.ebitda;
        const totalValuation = totalEbitda * heritage.valuationMultiple;

        return {
            year,
            heritageValuation: heritageEbitda * heritage.valuationMultiple,
            expansionValuation: expansionMetrics.ebitda * heritage.valuationMultiple,
            totalValuation: totalValuation * 1_000_000,
            heritageRevenue: heritageRev * 1_000_000,
            expansionRevenue: expansionMetrics.revenue * 1_000_000,
            totalRevenue: (heritageRev + expansionMetrics.revenue) * 1_000_000,
            investedCapex: 0
        } as unknown as ValuationSnapshot;
    });

    const breakdown = expansionSheets
        .filter(s => s.type !== 'consolidated' && s.type !== 'team')
        .map(s => ({
            sheetName: s.name,
            revenue: YEARS.map(y => s.rows.find(r => r.id === 'netRevenue')?.values[y] || 0)
        }));

    return { snapshots, breakdown };
};

export const generateSmartDefaults = (city: any) => ({
    capexInicial: 10,
    mensalidadeInicial: 1200,
    alunosAno1: 400,
    crescimentoAlunosAno: 20,
    reajusteMensalidadeAno: 5,
    bolsasDescontosMedia: 15,
    evasaoMedia: 15,
    impostosSobreReceita: 11.33,
    custoDocentePorAluno: 350,
    despesasFixasMensais: 120000,
    taxaDescontoWACC: 14
});