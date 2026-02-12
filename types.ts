export type InstitutionType = 'Pública' | 'Privada' | 'Comunitária';
export type MarketTier = 'SEDE' | 'P3' | 'P2' | 'P1' | 'UNA';
export type MarketPhase = 'Early Stage' | 'Gold Rush' | 'Battlefield' | 'Cash Cow' | 'Reinvention';

// --- SHARED CONSTANTS ---
export type YearKey = 'ano1' | 'ano2' | 'ano3' | 'ano4' | 'ano5' | 'ano6' | 'ano7' | 'ano8' | 'ano9' | 'ano10';
export const YEARS: YearKey[] = ['ano1', 'ano2', 'ano3', 'ano4', 'ano5', 'ano6', 'ano7', 'ano8', 'ano9', 'ano10'];
// Ajustado: Ano 1 = 2026. Consequentemente Ano 5 = 2030.
export const YEAR_LABELS = ['2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];

export interface Demografia {
  populacao_total: number;
  populacao_18_24: number;
  populacao_15_17: number;
  taxa_escolarizacao_em?: number;
  concluintes_em?: number;
  egressos_em_publica: number;
  egressos_em_privada: number;
  cagr_populacao_5y?: number;
  saldo_migratorio?: 'Atrator' | 'Neutro' | 'Expulsor';
  historico_populacao?: { ano: number; valor: number }[];
}

export interface Economia {
  pib_total_bi: number;
  renda_per_capita: number;
  idhm_educacao: number;
  taxa_empregabilidade: number;
  pib_composicao: {
    agropecuaria_bi: number;
    industria_bi: number;
    servicos_bi: number;
    administracao_publica_bi: number;
  };
  distribuicao_classes?: {
    classe_a: number;
    classe_b: number;
    classe_c: number;
    classe_d_e: number;
  };
  massa_salarial?: {
    total_anual_milhoes: number;
    crescimento_anual: number;
    evolucao_3_anos: { ano: number; valor: number }[];
  };
  risco_credito: { inadimplencia_pf: number; score_credito_medio: number; };
  financas_agro?: {
      credito_rural: { total_tomado_ano: number; razao_custeio: number; razao_investimento: number; razao_comercializacao: number; };
      patrimonio: { vtn_medio_ha: number; patrimonio_imobilizado_total: number; razao_divida_patrimonio: number; };
      maturidade_corporativa: { 
          pct_produtores_pj: number; 
          holdings_familiares_ativas: number; 
          idade_media_empresas_agro?: number; 
      };
  };
  financas_publicas?: {
      arrecadacao_itr_anual: number;
      arrecadacao_simples_mei: number;
      arrecadacao_total_propria?: number;
      dependencia_fpm_pct: number;
      indice_formalizacao_rural: number;
  };
  macro_cenario?: {
      investimento: { publico_empenhado_bi: number; privado_credito_pj_bi: number; };
      social: { vulnerabilidade_cadunico: number; cobertura_creches: number; };
      competitividade: { tempo_abertura_empresa_horas: number; conectividade_rural_pct: number; };
  };
}

export interface Educacao {
  total_ies_ativas: number;
  market_share_top3: number;
  media_igc_top3: number;
  taxa_evasao_presencial: number;
  vagas_ofertadas_total?: number;
  relacao_candidato_vaga?: number;
  taxa_evasao_ead?: number;
  conceito_medio_enade?: number;
  contratos_fies_ativos?: number;
  bolsas_prouni_total?: number;
}

export interface AgroProfile {
  pib_agro_bi: number;
  area_plantada_ha?: number;
  nivel_tecnologico: 'Baixo' | 'Médio' | 'Alto'; 
  exportacoes_valor_usd: number;
  capacidade_armazenagem_ton: number;
  risco_climatico_zarc?: string;
  produtividade_soja_ton_ha?: number;
  distancia_porto_km?: number;
  infraestrutura?: { area_irrigada_ha: number; pivos_centrais_qtd: number; deficit_armazenagem_pct: number; };
  estrutura_fundiaria?: { agricultura_familiar_pct: number; medio_produtor_pct: number; patronal_pct: number; };
}

export interface MunicipioPerfil {
  municipio_id: number;
  nome: string;
  estado: string;
  regiao: string;
  latitude: number;
  longitude: number;
  tier: MarketTier;
  isUnaHub?: boolean;
  hasCampus?: boolean;
  isAmazoniaLegal?: boolean;
  uso_terra?: string;
  demografia: Demografia;
  economia: Economia;
  educacao: Educacao;
  agro: AgroProfile;
  metricas_estrategicas?: {
    cagr_geral_5y: number;
    cagr_premium_5y: number;
    penetracao_mercado: number;
    indice_competitividade: number;
    ticket_medio_estimado: number;
  };
  hub_analise?: {
      score_geral: number;
      classificacao: string;
      pilares: { negocios: number; influencia: number; lifestyle: number };
      detalhes: any;
  };
  populacao_total: number;
  pib_total_bi: number;
  pib_agro_bi: number;
  ing_total_2023: number;
  concorrentes_total: number;
  cagr_ing_total_2023: number;
  penetracao_ensino_superior_percent: number;
  idh: number;
  exportacoes_agro_usd_milhoes: number;
  renda_per_capita_municipal: number;
  renda_media: number;
  car_propriedades_total: number;
  conceito_enade_medio?: number;
  rank_final?: number;
  idh_classificacao?: string;
  pea_total?: number;
  pop_20_59?: number;
  qtd_ing_ead_premium?: number;
  ingressantes_agro_ti_med?: number;
  vagas_ofertadas_2023?: number;
  cagr_ead_premium?: number;
  cagr_agrarias_med_ti?: number;
  taxa_evasao_media_percent?: number;
  instrucao_superior_completo?: number;
  pib_total?: number;
  pib_per_capita?: number;
  area_plantada_total_ha?: number;
}

export interface GrowthOpportunityFactors {
    marketPotential: number;
    futureTrend: number;
    hubPotentialScore: number;
    scorePop: number;
    scoreWealth: number;
    scoreAgroSize: number;
    scoreMomentum: number;
    scorePenetration: number;
    scoreTechFit: number;
    scoreCompetition: number;
    scoreK12Pipeline: number;
    scoreRivalQuality: number;
    scorePricingPower: number;
    penetrationRateVal: number;
    competitionRisk: number;
    academicHealth: number;
    talentGapScore: number;
    agroTechIndex: number;
    penetrationScore: number;
    momentumScore: number;
    scoreVitality: number;
}

export interface GrowthOpportunityScore {
    municipio_id: number;
    municipality: string;
    score: number;
    hubScore: number;
    category: 'high' | 'medium' | 'low';
    tier: MarketTier;
    marketPhase: MarketPhase;
    factors: GrowthOpportunityFactors;
    reasoning: string;
    isUnaHub?: boolean;
    isAmazoniaLegal?: boolean;
}

export interface GlobalFinancialConfig {
    projectTitle: string;
    strategicThesis: string;
    inflationRate: number;
    realTuitionIncrease: number;
    salaryAdjustmentGap: number;
    cdiRate: number;
    badDebtRate: number;
    incomeTaxRate: number;
    workingCapitalCycle: number;
}

export interface HeritageConfig {
    currentRevenue: number;
    currentEbitdaMargin: number;
    organicGrowthRate: number;
    valuationMultiple: number;
}

export interface RowData {
    id: string;
    label: string;
    isEditable: boolean;
    isPercentage: boolean;
    isCurrency: boolean;
    isHeader?: boolean;
    values: Record<YearKey, number>;
}

export interface SheetData {
    id: string;
    name: string;
    type: 'unit' | 'revenue' | 'team' | 'consolidated' | 'b2b_project' | 'product' | 'transformation_project' | 'hybrid_course';
    rows: RowData[];
    isSimulation?: boolean;
}

export interface ValuationSnapshot {
    year: number;
    heritageRevenue: number;
    expansionRevenue: number;
    totalRevenue: number;
    totalValuation: number;
}

export type ActType = 'Decree' | 'Law' | 'Licitation' | 'Environmental' | string;
export type ActSentiment = 'Positive' | 'Negative' | 'Neutral';
export type ActSource = 'DOM' | 'DOE' | 'DOU' | string;

export interface RegulatoryAct {
    id: string;
    date: string;
    source: ActSource;
    org: string;
    title: string;
    summary: string;
    type: ActType;
    impactLevel: 'High' | 'Medium' | 'Low';
    sentiment: ActSentiment;
    tags: string[];
    url: string;
}

export interface AgroIndicadores {
  municipio_id: number;
  area_soja_ha: number;
  area_milho_ha: number;
  area_algodao_ha: number;
  rebanho_bovino_cabecas: number;
  rebanho_suino_cabecas: number;
  exportacoes_valor_usd: number;
  car_propriedades_cadastradas: number;
  conformidade_ambiental_pct: number;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface DataPointFuturo {
  ano: number;
  demanda_alunos: number;
  renda_media_projetada: number;
}

export interface ProgramRecommendation {
  id: string;
  name: string;
  icon: 'grad_cap' | 'briefcase' | 'bar_chart' | 'tractor' | 'leaf' | 'chip';
  localDemand: number;
  currentOffer: number;
  educationalGap: number;
  opportunityScore: number;
  estimatedTime: string;
  competition: number;
  municipality?: string;
}

export interface StudentPersona {
  id: string;
  name: string;
  tagline: string;
  ageRange: string;
  incomeLevel: 'Baixa' | 'Média' | 'Alta';
  goals: string[];
  painPoints: string[];
  preferredModality: 'Presencial' | 'EAD' | 'Híbrido';
  icon: string;
}

export interface CareerPathStep {
    stage: string;
    role: string;
    avgSalary: string;
    duration: string;
}

export interface FinancingOption {
    name: string;
    type: string;
    eligibility: string;
    probability: string;
    description: string;
}

export interface PersonaRecommendation {
  personaId: string;
  bestPrograms: ProgramRecommendation[];
  careerPath: CareerPathStep[];
  financing: FinancingOption[];
  marketingAngle: string;
}

export interface ProgramDetail extends ProgramRecommendation {
  code: string;
  employabilityRate: number;
  description: string;
  developedSkills: string[];
  structure: {
      duration: string;
      format: string;
      classesPerYear: number;
      studentsPerClass: string;
      modules: { title: string; duration: string }[];
  };
  marketInfo: {
      averageSalary: string;
      hiringCompanies: string[];
      availablePositions: string[];
      marketDemandGrowth: string;
  };
  financialViability: {
      programPrice: string;
      estimatedRevenuePerClass: string;
      initialInvestment: string;
      breakEven: string;
      roiIn3Years: string;
  };
}

export interface ScenarioAnalysisResult {
    viability_score: number;
    viability_category: 'Alta' | 'Média' | 'Baixa';
    summary: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    financial_projection: {
        time_to_breakeven_months: number;
        estimated_students_first_year: number;
        estimated_revenue_three_years: number;
        roi_three_years_percent: number;
    };
    strategic_recommendation: string;
}

export interface CatchmentNode {
    id: string;
    name: string;
    lat: number;
    lng: number;
    students: number;
    distanceKm: number;
    type: 'Polo' | 'Satelite';
}

export interface DataLineage {
    metric: string;
    source: string;
    version: string;
    lastUpdate: string;
    confidence: number;
}

export interface DataAnomaly {
    metric: string;
    variation: number;
    severity: 'high' | 'medium' | 'low';
    description: string;
    timestamp: number;
}

export interface DataQualityReport {
  overallScore: number;
  status: 'A' | 'B' | 'C';
  lineage: DataLineage[];
  anomalies: DataAnomaly[];
}