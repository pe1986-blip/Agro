import { utils, writeFile } from 'xlsx';
import { SheetData, YEARS, GlobalFinancialConfig } from '../types';

function getColLetter(colIndex: number): string {
    let temp, letter = '';
    while (colIndex >= 0) {
        temp = (colIndex) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        colIndex = (colIndex - temp - 1) / 26;
    }
    return letter;
}

const sanitizeSheetName = (name: string): string => {
  return name.replace(/[:\\/?*\[\]]/g, ' ').substring(0, 30).trim();
};

export const exportFinancialModelToExcel = (
    sheets: SheetData[], 
    globalConfig: GlobalFinancialConfig, 
    filename: string,
    mode: 'current' | 'all'
) => {
    const wb = utils.book_new();

    // --- 1. ABA DE PREMISSAS ---
    const assumptionsData = [
        ["PREMISSAS MACROECONÔMICAS (Editáveis)"],
        ["Indicador", "Valor Atual", "Código Interno"],
        ["Inflação (IPCA a.a.)", globalConfig.inflationRate / 100, "inflation"],
        ["Ganho Real Mensalidade", globalConfig.realTuitionIncrease / 100, "realGain"],
        ["Dissídio Salarial (Gap)", globalConfig.salaryAdjustmentGap / 100, "salaryGap"],
        ["Impostos sobre Venda", 0.1133, "taxSales"], 
        ["Imposto de Renda (IRPJ/CSLL)", globalConfig.incomeTaxRate / 100, "taxProfit"],
        ["Inadimplência Média", globalConfig.badDebtRate / 100, "badDebt"]
    ];

    const wsAssumptions = utils.aoa_to_sheet(assumptionsData);
    utils.book_append_sheet(wb, wsAssumptions, "Premissas");

    // --- 2. GERAÇÃO DAS ABAS DE DRE ---
    sheets.forEach(sheet => {
        const headerRow = ["Indicador", ...YEARS.map((_, i) => `Ano ${i + 1}`)];
        const rowMap = new Map<string, number>(); 
        const excelRows: any[][] = [headerRow];
        let currentRowIdx = 1;

        sheet.rows.forEach(row => {
            if (row.isHeader) {
                excelRows.push([row.label.toUpperCase(), "", "", "", "", "", "", "", "", "", ""]);
            } else {
                rowMap.set(row.id, currentRowIdx);
                const rowData: any[] = [row.label];
                YEARS.forEach((yearKey) => {
                    const val = row.values[yearKey];
                    rowData.push({ t: 'n', v: val }); 
                });
                excelRows.push(rowData);
            }
            currentRowIdx++;
        });

        let processRowIdx = 1;
        sheet.rows.forEach(row => {
            if (!row.isHeader) {
                const rowIndex = processRowIdx; 
                YEARS.forEach((_, i) => {
                    const colIdx = i + 1;
                    const colLetter = getColLetter(colIdx);
                    const cellObj = excelRows[rowIndex][colIdx];

                    const getRef = (targetId: string) => {
                        const targetRowIdx = rowMap.get(targetId);
                        return targetRowIdx !== undefined ? `${colLetter}${targetRowIdx + 1}` : null;
                    };

                    // FÓRMULAS V9.2
                    if (row.id === 'units_cumulative') {
                        const refNewUnits = getRef('units_count');
                        const myRow = rowMap.get('units_cumulative');
                        if (i === 0 && refNewUnits) cellObj.f = `${refNewUnits}`;
                        else if (i > 0 && refNewUnits && myRow !== undefined) {
                            const prevCellRef = `${getColLetter(i)}${myRow + 1}`;
                            cellObj.f = `${prevCellRef}+${refNewUnits}`;
                        }
                    }
                    else if (row.id === 'students' || row.id === 'total_students_calc') {
                        // Lógica de volume para produtos ou unidades
                        if (sheet.type === 'unit') {
                            const refPerUnit = getRef('students_per_unit');
                            const refCumUnits = getRef('units_cumulative');
                            if (refPerUnit && refCumUnits) cellObj.f = `${refPerUnit}*${refCumUnits}`;
                        } else if (sheet.type === 'product' || sheet.type === 'hybrid_course') {
                            const refCohorts = getRef('cohorts_yr');
                            const refSeats = getRef('seats_cohort');
                            const refFill = getRef('fill_rate');
                            if (refCohorts && refSeats && refFill) cellObj.f = `${refCohorts}*${refSeats}*${refFill}`;
                        }
                    }
                    else if (row.id === 'grossRevenue' && sheet.type !== 'consolidated') {
                        const refStudents = getRef('students') || getRef('total_students_calc');
                        
                        if (sheet.type === 'unit') {
                            const refTicket = getRef('ticket');
                            if (refStudents && refTicket) cellObj.f = `${refStudents}*${refTicket}*12/1000000`;
                        } else if (sheet.type === 'product' || sheet.type === 'hybrid_course') {
                            const refTB2C = getRef('ticket_b2c');
                            const refTB2B = getRef('ticket_b2b');
                            const refMix = getRef('mix_b2b_pct');
                            if (refStudents && refTB2C && refTB2B && refMix) {
                                cellObj.f = `${refStudents}*((${refTB2C}*(1-${refMix}))+(${refTB2B}*${refMix}))/1000000`;
                            }
                        } else if (sheet.type === 'b2b_project') {
                            const refContracts = getRef('active_contracts');
                            const refVal = getRef('contract_value');
                            if (refContracts && refVal) cellObj.f = `${refContracts}*${refVal}/1000000`;
                        }
                    }
                    else if (row.id === 'scholarshipsValue') {
                        const refGross = getRef('grossRevenue');
                        const refPct = getRef('scholarshipsPct');
                        if (refGross && refPct) cellObj.f = `${refGross}*${refPct}`;
                    }
                    else if (row.id === 'revenueDeduction') {
                        const refGross = getRef('grossRevenue');
                        const refSchol = getRef('scholarshipsValue');
                        if (refGross && refSchol) cellObj.f = `(${refGross}-${refSchol})*Premissas!$B$6`; 
                    }
                    else if (row.id === 'netRevenue' && sheet.type !== 'consolidated') {
                        const refGross = getRef('grossRevenue');
                        const refSchol = getRef('scholarshipsValue');
                        const refDeduc = getRef('revenueDeduction');
                        if (refGross && refSchol && refDeduc) cellObj.f = `${refGross}-${refSchol}-${refDeduc}`;
                    }
                    else if (['costDocente', 'costApoio', 'costRent', 'expMarketing', 'costPDD', 'costCSC', 'costOthers'].includes(row.id)) {
                        const refNet = getRef('netRevenue');
                        const refPct = getRef(`${row.id}Pct`); 
                        if (refNet && refPct) cellObj.f = `${refNet}*${refPct}`;
                    }
                    else if (row.id === 'capex_construction') {
                        const refUnitsNew = getRef('units_count');
                        const refArea = getRef('capex_area');
                        const refCost = getRef('capex_sqm_cost');
                        if (refUnitsNew && refArea && refCost) cellObj.f = `${refUnitsNew}*${refArea}*${refCost}/1000000`;
                    }
                    else if (row.id === 'capexTotal') {
                        const parts = ['capex_construction', 'capex_lab', 'capex_brand'].map(id => getRef(id)).filter(r => r);
                        if (parts.length > 0) cellObj.f = parts.join('+');
                    }
                    else if (row.id === 'totalOpex') {
                        const costIds = ['costDocente', 'costApoio', 'costRent', 'expMarketing', 'costPDD', 'costCSC', 'costOthers'];
                        const refs = costIds.map(id => getRef(id)).filter(r => r);
                        if (refs.length > 0) cellObj.f = refs.join('+');
                    }
                    else if (row.id === 'ebitda') {
                        const refNet = getRef('netRevenue');
                        const refOpex = getRef('totalOpex');
                        if (refNet && refOpex) cellObj.f = `${refNet}-${refOpex}`;
                    }
                    else if (row.id === 'cashFlow') {
                        const refEbitda = getRef('ebitda');
                        const refCapex = getRef('capexTotal');
                         if (refEbitda && refCapex) cellObj.f = `${refEbitda}-${refCapex}`;
                    }
                    else if (row.id === 'cashFlowAccum') {
                        const refCash = getRef('cashFlow');
                        const myRow = rowMap.get('cashFlowAccum');
                        if (i === 0 && refCash) cellObj.f = `${refCash}`;
                        else if (i > 0 && refCash && myRow !== undefined) {
                            const prevCellRef = `${getColLetter(i)}${myRow+1}`;
                            cellObj.f = `${prevCellRef}+${refCash}`;
                        }
                    }
                });
                processRowIdx++;
            } else {
                processRowIdx++;
            }
        });

        const ws = utils.aoa_to_sheet(excelRows);
        ws['!cols'] = [{ wch: 35 }, ...YEARS.map(() => ({ wch: 14 }))];
        const safeName = sanitizeSheetName(sheet.name);
        utils.book_append_sheet(wb, ws, safeName);
    });

    writeFile(wb, `${filename}.xlsx`);
};
