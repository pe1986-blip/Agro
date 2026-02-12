import { SheetData, RowData, YearKey, YEARS } from '../types';

export type { SheetData, RowData, YearKey };

export const DEFAULT_GLOBAL_CONFIG = {
    projectTitle: "Plano Mestre RogerLens",
    strategicThesis: "Crescimento Sustentável e Rentável",
    inflationRate: 4.5,
    realTuitionIncrease: 2,
    salaryAdjustmentGap: 1,
    cdiRate: 10.5,
    badDebtRate: 3.5,
    incomeTaxRate: 34,
    workingCapitalCycle: 30
};

export const DEFAULT_HERITAGE = {
    "currentRevenue": 400,
    "currentEbitdaMargin": 25,
    "organicGrowthRate": 5,
    "valuationMultiple": 8
};

export const createEmptyValues = () => ({ "ano1": 0, "ano2": 0, "ano3": 0, "ano4": 0, "ano5": 0, "ano6": 0, "ano7": 0, "ano8": 0, "ano9": 0, "ano10": 0 });

const fillValues = (vals: number[]) => {
    const v = {} as any;
    YEARS.forEach((y, i) => v[y] = vals[i] || 0);
    return v;
};

// --- GERADORES DE LINHAS CUSTOMIZADOS ---

const getOpexRows = (docente: number[], apoio: number[], aluguel: number[], mkt: number[]): RowData[] => [
    { "id": "section_costs", "label": "CUSTOS & DESPESAS (OPEX)", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
    { "id": "costDocentePct", "label": "Docente/Delivery % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(docente) },
    { "id": "costDocente", "label": "Custo Docente (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "costApoioPct", "label": "Apoio & Admin % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(apoio) },
    { "id": "costApoio", "label": "Custo Apoio (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "costRentPct", "label": "Aluguel & Infra % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(aluguel) },
    { "id": "costRent", "label": "Custo Aluguel (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "expMarketingPct", "label": "Marketing % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(mkt) },
    { "id": "expMarketing", "label": "Despesas Mkt (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "costPDDPct", "label": "PDD % (Sobre RB)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.03)) },
    { "id": "costPDD", "label": "Custo PDD (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "costCSCPct", "label": "CSC % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.02)) },
    { "id": "costCSC", "label": "Custo CSC (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "costOthersPct", "label": "Outros Custos % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.01)) },
    { "id": "costOthers", "label": "Outros Custos (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "totalOpex", "label": "Total OPEX (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "section_result", "label": "RESULTADO OPERACIONAL", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
    { "id": "ebitda", "label": "EBITDA (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "ebitdaMargin", "label": "Margem EBITDA %", "isEditable": false, "isPercentage": true, "isCurrency": false, "values": createEmptyValues() }
];

const getCapexRows = (obra: number[], labs: number[], brand: number[], sqmetragem: number = 1500): RowData[] => [
    { "id": "section_capex_detail", "label": "INVESTIMENTOS (CAPEX)", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
    { "id": "capex_area", "label": "Área Construída/Reforço (m²)", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues(obra.map(v => v > 0 ? sqmetragem : 0)) },
    { "id": "capex_sqm_cost", "label": "Custo por m² (Obra R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues(obra.map(v => v > 0 ? 3000 : 0)) },
    { "id": "capex_construction", "label": "Obra Civil (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": fillValues(obra) },
    { "id": "capex_lab", "label": "Labs & Conteúdo (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues(labs) },
    { "id": "capex_brand", "label": "Branding & Lançam. (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues(brand) },
    { "id": "capexTotal", "label": "Investimento Total (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "section_flow", "label": "DEMONSTRATIVO DE CAIXA", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
    { "id": "cashFlow", "label": "Fluxo Livre (FCF)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
    { "id": "cashFlowAccum", "label": "Fluxo Acumulado", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() }
];

export const generateFullProjectStructure = (): SheetData[] => {
    return [
        // 1. SEDE GOIÂNIA
        {
            "id": "sede_goiania", "name": "Sede Nacional: Goiânia", "type": "unit",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE VOLUME", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "units_count", "label": "Novas Unidades", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([0, 1, 0, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "students_per_unit", "label": "Alunos (Médio/Unid)", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([0, 500, 1000, 1500, 2000, 2500, 3500, 3500, 4000, 4000]) },
                { "id": "ticket", "label": "Ticket Médio Mensal (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3195]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Bolsas (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0.2, 0.3, 0.2, 0.15, 0.1, 0.1, 0.08, 0.1, 0.1, 0.1]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções Bolsa (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.35, 0.3, 0.25, 0.25, 0.25, 0.25, 0.18, 0.18, 0.18, 0.18],
                    [0.15, 0.12, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                    [0, 0.7, 0.5, 0.25, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                ),
                ...getCapexRows(
                    [0, 17.5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 2, 1, 2, 2, 2, 0.5, 0.5, 0.5, 0.5],
                    [10, 10, 5, 2.5, 0, 0, 0, 0, 0, 0]
                )
            ]
        },
        // 2. SEDES REGIONAIS
        {
            "id": "regional_hub", "name": "Sedes Regionais", "type": "unit",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE VOLUME", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "units_count", "label": "Novas Unidades", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([0, 1, 2, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "students_per_unit", "label": "Alunos (Médio/Unid)", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([0, 500, 700, 800, 900, 1000, 1200, 1500, 1500, 1500]) },
                { "id": "ticket", "label": "Ticket Médio Mensal (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Bolsas (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0, 0.3, 0.25, 0.2, 0.2, 0.18, 0.18, 0.15, 0.15, 0.15]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções Bolsa (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0, 0.3, 0.28, 0.25, 0.25, 0.2, 0.18, 0.15, 0.15, 0.15],
                    [0, 0.1, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0.12, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0.3, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1]
                ),
                ...getCapexRows(
                    [0, 5, 10, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0.4, 0.8, 2, 2, 2, 0, 0, 0, 0],
                    [0, 5, 2, 1, 0, 0, 0, 0, 0, 0],
                    1500
                )
            ]
        },
        // 3. UNA VOCACIONADA (DELTA UPGRADE)
        {
            "id": "una_vocacionada", "name": "Una Vocacionada (Lift Delta)", "type": "transformation_project",
            "rows": [
                { "id": "section_delta_drivers", "label": "DRIVERS DO DELTA ECONÔMICO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "legacy_revenue_base", "label": "Receita Base Legado (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([10, 10, 10.5, 11, 11.5, 12, 12.6, 13.2, 13.9, 14.6]) },
                { "id": "ticket_lift_pct", "label": "Lift de Ticket Médio (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.25, 0.25, 0.25, 0.25]) },
                { "id": "retention_hedge_pct", "label": "Ganho de Retenção/Hedge (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.1, 0.1, 0.1, 0.1]) },
                { "id": "b2b_incremental_revenue", "label": "Novas Receitas B2B (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0, 0.5, 1.2, 1.8, 2.5, 3, 3.5, 4, 4, 4]) },
                { "id": "grossRevenue", "label": "Receita Incremental (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos Média (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida Incremental (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "section_incremental_opex", "label": "OPEX INCREMENTAL DO PROJETO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "head_agronomist_opex", "label": "Head de Unidade (Agrônomo)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18]) },
                { "id": "council_and_events_opex", "label": "Conselho & Eventos Locais", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12]) },
                { "id": "b2b_commissions_opex", "label": "Comissões Vendas B2B", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0, 0.05, 0.1, 0.15, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]) },
                { "id": "totalOpex", "label": "Total OPEX Incremental (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "ebitda", "label": "EBITDA Incremental (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "ebitdaMargin", "label": "Margem EBITDA Delta (%)", "isEditable": false, "isPercentage": true, "isCurrency": false, "values": createEmptyValues() },
                { "id": "section_kit_capex", "label": "KIT DE TRANSFORMAÇÃO (CAPEX)", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "capex_branding", "label": "Branding & Fachada (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "capex_agrotech_labs", "label": "Labs Agrotech (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0.35, 0.15, 0, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "capex_intel_setup", "label": "Setup Intel & Think Tank (R$ MM)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "capexTotal", "label": "Investimento Total Kit (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "section_cashflow", "label": "RETORNO DO INVESTIMENTO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "cashFlow", "label": "Fluxo Livre Delta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "cashFlowAccum", "label": "Fluxo Acumulado Projeto", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() }
            ]
        },
        // 4. UNIDADES P3 (FORTALEZAS)
        {
            "id": "p3_unit", "name": "Unidades P3 (Fortalezas)", "type": "unit",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE VOLUME", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "units_count", "label": "Novas Unidades", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([4, 8, 8, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "students_per_unit", "label": "Alunos (Médio/Unid)", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([0, 300, 500, 600, 700, 800, 800, 800, 800, 800]) },
                { "id": "ticket", "label": "Ticket Médio Mensal (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([800, 460, 500, 550, 600, 650, 650, 650, 650, 650]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Bolsas (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0.3, 0.35, 0.3, 0.25, 0.18, 0.17, 0.17, 0.17, 0.17, 0.17]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções Bolsa (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.35, 0.3, 0.28, 0.2, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12],
                    [0.1, 0.1, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                    [0.7, 0.7, 0.5, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                ),
                ...getCapexRows(
                    [18, 36, 36, 0, 0, 0, 0, 0, 0, 0],
                    [0.5, 0.2, 0.5, 0.2, 0.5, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0.3, 0, 0, 0, 0, 0],
                    1500
                )
            ]
        },
        // 5. UNIDADES P2 (MÉDIAS)
        {
            "id": "p2_unit", "name": "Unidades P2 (Médias)", "type": "unit",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE VOLUME", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "units_count", "label": "Novas Unidades", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([5, 10, 15, 0, 0, 0, 0, 0, 0, 0]) },
                { "id": "students_per_unit", "label": "Alunos (Médio/Unid)", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([100, 200, 300, 400, 450, 500, 500, 500, 500, 500]) },
                { "id": "ticket", "label": "Ticket Médio Mensal (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([550, 600, 650, 650, 650, 650, 650, 650, 650, 650]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Bolsas (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0.3, 0.3, 0.2, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções Bolsa (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.35, 0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
                    [0.1, 0.1, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                    [0.7, 0.5, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                ),
                ...getCapexRows(
                    [12, 24, 36, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0.2, 0.2, 0.2, 0, 0, 0], 
                    [1, 1, 1, 1, 0.1, 0.1, 0.1, 0, 0, 0], 
                    800
                )
            ]
        },
        // 6. PÓS-GRADUAÇÃO (DIGITAL)
        {
            "id": "hybrid_course", "name": "Pós-Graduação (Digital)", "type": "product",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE PRODUTO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "cohorts_yr", "label": "Turmas/Ano", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([8, 12, 14, 16, 20, 20, 20, 20, 20, 20]) },
                { "id": "seats_cohort", "label": "Vagas/Turma", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues(Array(10).fill(150)) },
                { "id": "fill_rate", "label": "Taxa Ocupação (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(1)) },
                { "id": "mix_b2b_pct", "label": "Mix B2B (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.3)) },
                { "id": "ticket_b2c", "label": "Ticket B2C (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([8000, 8000, 10000, 12000, 12000, 14000, 15000, 16000, 16000, 16000]) },
                { "id": "ticket_b2b", "label": "Ticket B2B (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([6000, 6000, 8000, 10000, 10000, 10000, 10000, 12000, 12000, 12000]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues([0.3, 0.25, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.25, 0.25, 0.25, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
                    [0.08, 0.08, 0.08, 0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.7, 0.5, 0.25, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
                ),
                ...getCapexRows(
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.5, 0.2, 0.5, 0.2, 0.5, 0, 0, 0, 0, 0],
                    [2, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                    0
                )
            ]
        },
        // 7. AGRO PRO (TÉCNICO)
        {
            "id": "agro_pro", "name": "Agro Pro (Técnico)", "type": "product",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE PRODUTO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "cohorts_yr", "label": "Turmas/Ano", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([2, 8, 12, 15, 30, 40, 50, 50, 50, 50]) },
                { "id": "seats_cohort", "label": "Vagas/Turma", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([50, 100, 120, 150, 150, 150, 150, 150, 150, 150]) },
                { "id": "fill_rate", "label": "Taxa Ocupação (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(1)) },
                { "id": "mix_b2b_pct", "label": "Mix B2B (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.3)) },
                { "id": "ticket_b2c", "label": "Ticket B2C (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([500, 500, 600, 800, 800, 800, 800, 800, 800, 800]) },
                { "id": "ticket_b2b", "label": "Ticket B2B (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([300, 300, 400, 500, 500, 500, 500, 500, 500, 500]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.15)) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.25, 0.25, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
                    [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.7, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
                ),
                ...getCapexRows(
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    0
                )
            ]
        },
        // 8. AGRO GESTÃO (MÉDIO)
        {
            "id": "agro_gestao", "name": "Agro Gestão (Médio)", "type": "product",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE PRODUTO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "cohorts_yr", "label": "Turmas/Ano", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([2, 6, 10, 12, 15, 30, 40, 50, 60, 60]) },
                { "id": "seats_cohort", "label": "Vagas/Turma", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([50, 60, 80, 80, 80, 100, 100, 100, 100, 100]) },
                { "id": "fill_rate", "label": "Taxa Ocupação (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(1)) },
                { "id": "mix_b2b_pct", "label": "Mix B2B (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.3)) },
                { "id": "ticket_b2c", "label": "Ticket B2C (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([800, 800, 800, 800, 800, 1000, 1000, 1000, 1000, 1000]) },
                { "id": "ticket_b2b", "label": "Ticket B2B (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([600, 600, 600, 600, 600, 800, 800, 800, 800, 800]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.15)) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.25, 0.25, 0.25, 0.25, 0.2, 0.18, 0.15, 0.15, 0.15, 0.15],
                    [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.7, 0.7, 0.5, 0.25, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15]
                ),
                ...getCapexRows(
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0, 0, 0, 0],
                    [0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0],
                    0
                )
            ]
        },
        // 8. AGRO EXECUTIVE (PREMIUM)
        {
            "id": "agro_executive", "name": "Agro Executive (Premium)", "type": "product",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE PRODUTO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "cohorts_yr", "label": "Turmas/Ano", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([1, 2, 5, 10, 15, 15, 15, 15, 15, 15]) },
                { "id": "seats_cohort", "label": "Vagas/Turma", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues(Array(10).fill(50)) },
                { "id": "fill_rate", "label": "Taxa Ocupação (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(1)) },
                { "id": "mix_b2b_pct", "label": "Mix B2B (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.4)) },
                { "id": "ticket_b2c", "label": "Ticket B2C (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues(Array(10).fill(15000)) },
                { "id": "ticket_b2b", "label": "Ticket B2B (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues(Array(10).fill(12000)) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.10)) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                ...getOpexRows(
                    [0.40, 0.38, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
                    [0.10, 0.10, 0.10, 0.10, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.35, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
                ),
                ...getCapexRows(
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    [2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                    0
                )
            ]
        },
        // 9. SOLUÇÕES CORPORATIVAS (B2B)
        {
            "id": "b2b_project", "name": "Soluções Corporativas", "type": "b2b_project",
            "rows": [
                { "id": "section_drivers", "label": "DRIVERS DE CONTRATO", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "active_contracts", "label": "Contratos Ativos", "isEditable": true, "isPercentage": false, "isCurrency": false, "values": fillValues([2, 5, 8, 12, 15, 18, 20, 22, 24, 25]) },
                { "id": "contract_value", "label": "Valor Médio Anual (R$)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000]) },
                { "id": "grossRevenue", "label": "Receita Bruta (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "scholarshipsPct", "label": "Descontos/Bolsas (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.1)) },
                { "id": "scholarshipsValue", "label": "(-) Deduções (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "revenueDeduction", "label": "(-) Impostos (11.33%)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "netRevenue", "label": "= Receita Líquida (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "section_costs", "label": "CUSTOS & DESPESAS (OPEX)", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "delivery_cost_pct", "label": "Custo Entrega % (Sobre RL)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.3)) },
                { "id": "costDelivery", "label": "Custo Entrega (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "sales_comm_pct", "label": "Comissão Vendas % (Sobre RB)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.08)) },
                { "id": "salesComm", "label": "Comissões (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "totalOpex", "label": "Total OPEX (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "ebitda", "label": "EBITDA (R$ MM)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "ebitdaMargin", "label": "Margem EBITDA %", "isEditable": false, "isPercentage": true, "isCurrency": false, "values": createEmptyValues() },
                ...getCapexRows(
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0.5, 0.2, 0.2, 0, 0, 0, 0, 0, 0, 0],
                    0
                )
            ]
        },
        {
            "id": "team_structure", "name": "Equipe & Núcleos (Holding)", "type": "team",
            "rows": [
                { "id": "section_headcount", "label": "HEADCOUNT & SALÁRIOS", "isEditable": false, "isPercentage": false, "isCurrency": false, "isHeader": true, "values": createEmptyValues() },
                { "id": "head_salary", "label": "Head Ânima Agro (Salário)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([45000, 45000, 48000, 50000, 55000, 60000, 60000, 65000, 70000, 75000]) },
                { "id": "product_team", "label": "Núcleo Aprendizagem (Total)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([35000, 40000, 50000, 60000, 70000, 80000, 80000, 90000, 90000, 90000]) },
                { "id": "advocacy_team", "label": "Núcleo Advocacy (Total)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([25000, 30000, 35000, 40000, 45000, 50000, 50000, 55000, 55000, 55000]) },
                { "id": "commercial_team", "label": "Núcleo Relacionamento (Total)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]) },
                { "id": "brand_team", "label": "Núcleo Marca/Growth (Total)", "isEditable": true, "isPercentage": false, "isCurrency": true, "values": fillValues([20000, 25000, 30000, 35000, 40000, 45000, 45000, 50000, 50000, 50000]) },
                { "id": "tax_rate_pct", "label": "Encargos & Benefícios (%)", "isEditable": true, "isPercentage": true, "isCurrency": false, "values": fillValues(Array(10).fill(0.8)) },
                { "id": "totalOpex", "label": "Custo Total Anual", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() },
                { "id": "ebitda", "label": "EBITDA (Custo)", "isEditable": false, "isPercentage": false, "isCurrency": true, "values": createEmptyValues() }
            ]
        }
    ];
};
