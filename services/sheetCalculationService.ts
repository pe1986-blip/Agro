import { SheetData, RowData, YEARS, YearKey, GlobalFinancialConfig } from '../types';
import { generateFullProjectStructure } from './financialSheetFactory';

const getVal = (rows: RowData[], id: string, year: YearKey): number => {
  const row = rows.find(r => r.id === id);
  return row ? row.values[year] : 0;
};

const setVal = (rows: RowData[], id: string, year: YearKey, val: number) => {
  const row = rows.find(r => r.id === id);
  if (row) {
    row.values[year] = val;
  }
};

export const recalculateSheet = (sheet: SheetData, globalConfig?: GlobalFinancialConfig | null): SheetData => {
  let newRows = sheet.rows.map(row => ({ ...row, values: { ...row.values } }));
  let accumulatedUnits = 0;

  YEARS.forEach((year) => {
    
    // --- 1. CÁLCULO DE RECEITA BRUTA POR TIPO ---
    let grossRevenue = 0;

    if (sheet.type === 'unit') {
        const newUnits = getVal(newRows, 'units_count', year);
        accumulatedUnits += newUnits;
        setVal(newRows, 'units_cumulative', year, accumulatedUnits);
        
        const studentsPerUnit = getVal(newRows, 'students_per_unit', year);
        const totalStudents = accumulatedUnits * studentsPerUnit;
        setVal(newRows, 'students', year, totalStudents);
        
        const ticket = getVal(newRows, 'ticket', year);
        // Expansão Territorial: Ticket Mensal * 12 meses
        grossRevenue = (totalStudents * ticket * 12) / 1_000_000;
    } 
    else if (sheet.type === 'product' || sheet.type === 'hybrid_course') {
        const cohorts = getVal(newRows, 'cohorts_yr', year);
        const seats = getVal(newRows, 'seats_cohort', year);
        const fill = getVal(newRows, 'fill_rate', year);
        const totalStudents = cohorts * seats * fill;
        setVal(newRows, 'students', year, totalStudents);
        setVal(newRows, 'total_students_calc', year, totalStudents);

        const mixB2B = getVal(newRows, 'mix_b2b_pct', year);
        const tB2C = getVal(newRows, 'ticket_b2c', year);
        const tB2B = getVal(newRows, 'ticket_b2b', year);
        
        // Produtos e Serviços: Ticket é o valor TOTAL do curso (não multiplica por 12)
        const weightedTicket = (tB2C * (1 - mixB2B)) + (tB2B * mixB2B);
        grossRevenue = (totalStudents * weightedTicket) / 1_000_000;
    }
    else if (sheet.type === 'b2b_project') {
        // B2B: active_contracts já representa o total de contratos ativos no ano
        const totalContracts = getVal(newRows, 'active_contracts', year);
        const contractValue = getVal(newRows, 'contract_value', year);
        grossRevenue = (totalContracts * contractValue) / 1_000_000;
    }
    else if (sheet.type === 'transformation_project') {
        // Lógica de Delta (Una Vocacionada)
        const legacyBase = getVal(newRows, 'legacy_revenue_base', year);
        const ticketLift = getVal(newRows, 'ticket_lift_pct', year);
        const retentionHedge = getVal(newRows, 'retention_hedge_pct', year);
        const b2bIncremental = getVal(newRows, 'b2b_incremental_revenue', year);
        
        // O faturamento do projeto é o LIFT sobre a base legado + B2B novo
        // Fix: Corrected typo b2incremental to b2bIncremental
        grossRevenue = (legacyBase * (ticketLift + retentionHedge)) + b2bIncremental;
    }

    if (sheet.type !== 'team' && sheet.type !== 'transformation_project') {
        setVal(newRows, 'grossRevenue', year, grossRevenue);
    } else if (sheet.type === 'transformation_project') {
        setVal(newRows, 'grossRevenue', year, grossRevenue);
    }

    // --- 2. DEDUÇÕES E RECEITA LÍQUIDA ---
    const currentGross = getVal(newRows, 'grossRevenue', year);
    const scholPct = getVal(newRows, 'scholarshipsPct', year) || 0;
    const scholVal = currentGross * scholPct;
    setVal(newRows, 'scholarshipsValue', year, scholVal);
    
    const taxRate = 0.1133; // PIS/COFINS/ISS fixo
    const taxes = (currentGross - scholVal) * taxRate;
    setVal(newRows, 'revenueDeduction', year, taxes);
    
    const netRevenue = Math.max(0, currentGross - scholVal - taxes);
    setVal(newRows, 'netRevenue', year, netRevenue);

    // --- 3. OPEX (SOBRE A LÍQUIDA) ---
    let totalOpex = 0;
    if (sheet.type === 'team') {
        const sHead = getVal(newRows, 'head_salary', year);
        const sProd = getVal(newRows, 'product_team', year);
        const sAdv = getVal(newRows, 'advocacy_team', year);
        const sComm = getVal(newRows, 'commercial_team', year);
        const sBrand = getVal(newRows, 'brand_team', year);
        const taxPct = getVal(newRows, 'tax_rate_pct', year);

        totalOpex = ((sHead + sProd + sAdv + sComm + sBrand) * (1 + taxPct) * 12) / 1_000_000;
    } 
    else if (sheet.type === 'b2b_project') {
        // Lógica de custo específica para B2B
        const deliveryPct = getVal(newRows, 'delivery_cost_pct', year);
        const deliveryVal = netRevenue * deliveryPct;
        setVal(newRows, 'costDelivery', year, deliveryVal);
        
        const commPct = getVal(newRows, 'sales_comm_pct', year);
        const commVal = currentGross * commPct; 
        setVal(newRows, 'salesComm', year, commVal);
        
        totalOpex = deliveryVal + commVal;
    }
    else if (sheet.type === 'transformation_project') {
        // OPEX Incremental Una Vocacionada
        const headAgronomist = getVal(newRows, 'head_agronomist_opex', year);
        const council = getVal(newRows, 'council_and_events_opex', year);
        const b2bComm = getVal(newRows, 'b2b_commissions_opex', year);
        
        // Esses custos já estão em R$ MM anuais (baseados nos sliders simplificados)
        totalOpex = headAgronomist + council + b2bComm;
    }
    else {
        const opexIds = ['costDocente', 'costApoio', 'costRent', 'expMarketing', 'costCSC', 'costOthers'];
        opexIds.forEach(id => {
            const pct = getVal(newRows, `${id}Pct`, year);
            const val = netRevenue * pct;
            setVal(newRows, id, year, val);
            totalOpex += val;
        });
        
        // PDD incide sobre a BRUTA
        const pddPct = getVal(newRows, 'costPDDPct', year);
        const pddVal = currentGross * pddPct;
        // Fix: corrected undefined id variable to string literal 'costPDD'
        setVal(newRows, 'costPDD', year, pddVal); // ajuste de nome interno
        totalOpex += pddVal;
    }
    setVal(newRows, 'totalOpex', year, totalOpex);

    // --- 4. EBITDA & MARGEM ---
    const ebitda = (sheet.type === 'team') ? -totalOpex : netRevenue - totalOpex;
    setVal(newRows, 'ebitda', year, ebitda);
    setVal(newRows, 'ebitdaMargin', year, netRevenue > 0 ? ebitda / netRevenue : 0);

    // --- 5. CAPEX AUTOMATIZADO ---
    let totalCapex = 0;
    if (sheet.type === 'transformation_project') {
        const cBrand = getVal(newRows, 'capex_branding', year);
        const cLabs = getVal(newRows, 'capex_agrotech_labs', year);
        const cIntel = getVal(newRows, 'capex_intel_setup', year);
        totalCapex = cBrand + cLabs + cIntel;
    } else {
        const area = getVal(newRows, 'capex_area', year);
        const sqmCost = getVal(newRows, 'capex_sqm_cost', year);
        const unitsAdded = sheet.type === 'unit' ? getVal(newRows, 'units_count', year) : 1;
        const constructionVal = (unitsAdded * area * sqmCost) / 1_000_000;
        setVal(newRows, 'capex_construction', year, constructionVal);

        const lab = getVal(newRows, 'capex_lab', year);
        const brand = getVal(newRows, 'capex_brand', year);
        totalCapex = constructionVal + lab + brand;
    }
    setVal(newRows, 'capexTotal', year, totalCapex);

    // --- 6. CASH FLOW ---
    const cashFlow = ebitda - totalCapex;
    setVal(newRows, 'cashFlow', year, cashFlow);
  });

  // Acumulado
  let accum = 0;
  YEARS.forEach(y => {
      accum += getVal(newRows, 'cashFlow', y);
      setVal(newRows, 'cashFlowAccum', y, accum);
  });

  return { ...sheet, rows: newRows };
};

export const consolidateSheets = (sheets: SheetData[], filterIds?: string[], nameOverride?: string): SheetData => {
  const factory = generateFullProjectStructure();
  const baseSheet = factory.find(s => s.id === 'sede_goiania')!;
  const consolidatedRows = baseSheet.rows.map(r => ({ ...r, isEditable: false, values: {} as any }));
  
  YEARS.forEach(y => {
    consolidatedRows.forEach(row => {
        row.values[y] = 0;
    });
  });

  const relevantSheets = filterIds ? sheets.filter(s => filterIds.includes(s.id)) : sheets;

  relevantSheets.forEach(sheet => {
      sheet.rows.forEach(row => {
          const target = consolidatedRows.find(tr => tr.id === row.id);
          // Soma apenas se for valor absoluto, not percentual
          if (target && !row.isHeader && !row.isPercentage) {
              YEARS.forEach(y => {
                  target.values[y] += (row.values[y] || 0);
              });
          }
      });
  });

  // Recalculo de Margens Consolidado
  YEARS.forEach(y => {
      const net = consolidatedRows.find(r => r.id === 'netRevenue')?.values[y] || 0;
      const ebit = consolidatedRows.find(r => r.id === 'ebitda')?.values[y] || 0;
      const marginRow = consolidatedRows.find(r => r.id === 'ebitdaMargin');
      if (marginRow) marginRow.values[y] = net > 0 ? ebit / net : 0;
  });

  return {
      id: 'consolidado',
      name: nameOverride || 'Consolidado Total',
      type: 'consolidated',
      rows: consolidatedRows
  };
};