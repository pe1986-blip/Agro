export type InstitutionType = 'Pública' | 'Privada' | 'Comunitária';

export interface EducationalGroup {
  grupo_id: number;
  name_grupo: string;
  data_fundacao: string; // ISO 8601 format: "YYYY-MM-DD"
  sede_principal: string;
  foco_atuacao: string;
}

export interface Institution {
  ies_id: number;
  cnpj: string;
  nome_razao_social: string;
  nome_fantasia?: string;
  municipio_id: number;
  municipio: string;
  estado: string;
  regiao: string;
  latitude: number;
  longitude: number;
  tipo_instituicao: InstitutionType;
  grupo_educacional_id?: number | null;
  data_abertura: string; // ISO 8601 format: "YYYY-MM-DD"
  students: number; 
  competitors: { name: string; students: number }[];
}

export interface Demografia {
  populacao_total: number;
  populacao_18_24: number;
  populacao_15_17: number;
  taxa_escolarizacao_em: number;
  egressos_em_publica: number;
  egressos_em_privada: number;
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
}

export interface Educacao {
  total_ies_ativas: number;
  market_share_top3: number;
  vagas_ofertadas_total: number;
  relacao_candidato_vaga: number;
  taxa_evasao_presencial: number;
  taxa_evasao_ead: number;
  conceito_medio_enade: number;
  contratos_fies_ativos: number;
  bolsas_prouni_total: number;
}

export interface AgroProfile {
  pib_agro_bi: number;
  area_plantada_ha: number;
  nivel_tecnologico: 'Baixo' | 'Médio' | 'Alto'; 
  risco_climatico_zarc: string;
  produtividade_soja_ton_ha: number;
  exportacoes_valor_usd: number;
  distancia_porto_km: number;
  capacidade_armazenagem_ton: number;
}

export interface MunicipioPerfil {
  municipio_id: number;
  nome: string;
  estado: string;
  regiao: string;
  latitude: number;
  longitude: number;
  rank_final: number;
  
  // --- Structured Data ---
  demografia: Demografia;
  economia: Economia;
  educacao: Educacao;
  agro: AgroProfile;
  
  // --- Hub Intelligence ---
  hub_analise?: {
      score_geral: number;
      classificacao: string;
      pilares: { negocios: number; influencia: number; lifestyle: number };
      detalhes: {
          servicos_avancados: number;
          sedes_corporativas: number;
          conexoes_politicas: number;
          eventos_networking: number;
          educacao_premium_k12: number;
          saude_complexidade: number;
          market_luxo: number;
      };
  };

  // --- Demográficos e Socioeconômicos (Legacy Flat Props) ---
  populacao_total: number;
  pib_total_bi: number;
  renda_media: number; // Legacy, preferir renda_per_capita_municipal
  renda_per_capita_municipal: number;
  idh: number;
  
  // --- Dados do Agronegócio (Base) ---
  pib_agro_bi: number; 
  area_plantada_total_ha: number;
  exportacoes_agro_usd_milhoes: number;
  car_propriedades_total: number;
  uso_terra: string;

  // --- Potencial de Mercado (Estoque) ---
  pea_total: number; // População Economicamente Ativa
  pop_20_59: number; // Faixa Etária de 20 a 59 (denominador)

  // --- Mercado Educacional Atual (Oferta e Demanda) ---
  ing_total_2023: number;
  qtd_ing_ead_premium: number;
  ingressantes_agro_ti_med: number;
  vagas_ofertadas_2023: number;

  // --- Competição ---
  concorrentes_total: number;
  penetracao_ensino_superior_percent: number;

  // --- Crescimento (CAGR) ---
  cagr_ing_total_2023: number;
  cagr_ead_premium: number;
  cagr_agrarias_med_ti: number;

  // --- Desempenho Institucional (Qualidade) ---
  taxa_evasao_media_percent: number;
  conceito_enade_medio: number;
  
  // --- Deprecated / Legacy ---
  pib_total: number;
  pib_per_capita: number;
  instrucao_superior_completo: number;
  idh_classificacao: string;
  rank_fator_agro?: number; 
  
  // --- Forecasting ---
  forecasting?: AnaliseForecasting;
}

export interface GrowthOpportunityFactors {
    marketPotential: number;
    competitionRisk: number;
    academicHealth: number;
    talentGapScore: number;
    agroTechIndex: number;
    futureTrend: number; 
    penetrationScore: number; // NOVO: Score derivado da Taxa de Penetração
    penetrationRateVal: number; // Valor real em % (ex: 12.5) para exibição
}

export type MarketTier = 'SEDE' | 'P3' | 'P2' | 'P1';

export interface GrowthOpportunityScore {
    municipio_id: number;
    municipality: string;
    score: number;
    category: 'high' | 'medium' | 'low';
    tier: MarketTier;
    factors: GrowthOpportunityFactors;
    reasoning: string;
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

export interface ProgramStructure {
  duration: string;
  format: string;
  classesPerYear: number;
  studentsPerClass: string;
  modules: { title: string; duration: string }[];
}

export interface MarketInfo {
  averageSalary: string;
  hiringCompanies: string[];
  availablePositions: string[];
  marketDemandGrowth: string;
}

export interface FinancialViability {
  programPrice: string;
  estimatedRevenuePerClass: string;
  initialInvestment: string;
  breakEven: string;
  roiIn3Years: string;
}

export interface ProgramDetail extends ProgramRecommendation {
  code: string;
  employabilityRate: number;
  description: string;
  developedSkills: string[];
  structure: ProgramStructure;
  marketInfo: MarketInfo;
  financialViability: FinancialViability;
}

export interface SocialImpactMetrics {
  gdpImpactMillions: number;
  jobsGenerated: number;
  taxRevenueMillions: number;
  ruralExodusPreventionRate: number;
  educationalEquityIndex: number;
  localProductivityGainPct: number;
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

export interface DataPointFuturo {
  ano: number;
  demanda_alunos: number;
  renda_media_projetada: number;
}

export interface AnaliseForecasting {
  tendencia_crescimento: 'Acelerado' | 'Estavel' | 'Desaceleracao';
  elasticidade_renda: number;
  projecao_5_anos: DataPointFuturo[];
  setores_em_alta: string[];
}

export interface CagedMonthlyData {
    competencia: string;
    agro_admissoes: number;
    agro_demissoes: number;
    agro_saldo: number;
    total_admissoes: number;
    total_desligamentos: number;
    saldo_movimentacao: number;
}

export interface EmecInstitutionData {
    nome_ies: string;
    sigla: string;
    cursos_count: number;
    igc_continuo: number;
    ci_conceito: number;
    cod_ies: number;
    categoria_administrativa: string;
    organizacao_academica: string;
    ci_conceito_institucional: number;
    total_cursos_ativos: number;
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

export interface CityPlaybookData {
  header: {
    city_name: string;
    tagline: string;
    main_thesis: string;
  };
  strategy: {
    verdict: 'BUY' | 'HOLD' | 'SELL';
    tier_recommendation: string;
    executive_summary: string;
  };
  strategic_widgets: {
    radar_data: {
      logistics_infra: number;
      economic_diversification: number;
      stakeholder_density: number;
      climate_resilience: number;
      tech_upside: number;
    };
    risk_matrix: {
      risk_score: number;
      return_potential: number;
      quadrant_label: string;
    };
    b2b_pipeline: Array<{ company: string; pain: string; product: string }>;
  };
  market_stats: {
    gdp_evolution: {
      year_minus_2: string;
      year_minus_1: string;
      current_year_projected: string;
    };
    salary_mass: {
      monthly_value: string;
      trend: string;
    };
    market_share_players: Array<{ name: string; share: number }>;
    modality_share: {
      presential: number;
      ead: number;
    };
  };
  student_magnetism: {
    hub_influence_score: number;
    influence_radius_km: number;
    feeder_cities: Array<{ city: string; distance: number; contribution: number }>;
  };
  future_roadmap: {
    growth_thesis: string;
    milestones: Array<{ year: number; phase_name: string; trigger_event: string; projected_kpi: string }>;
  };
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

export type YearKey = 'ano1' | 'ano2' | 'ano3' | 'ano4' | 'ano5' | 'ano6' | 'ano7' | 'ano8' | 'ano9' | 'ano10';
export const YEARS: YearKey[] = ['ano1', 'ano2', 'ano3', 'ano4', 'ano5', 'ano6', 'ano7', 'ano8', 'ano9', 'ano10'];
export const YEAR_LABELS = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'];

// --- FIX: Added exported types for regulatory acts to fix errors in regulatoryService.ts ---
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