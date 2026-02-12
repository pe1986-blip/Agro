
import { MunicipioPerfil } from "../types";

// --- Dicionário de Competidores Regionais (Inteligência Real) ---
// Sincronização Territorial: Nomes reais baseados na geografia do MEC
const REGIONAL_COMPETITORS: Record<string, string[]> = {
    'MT': ['Fasipe', 'Unic', 'Univag', 'Unemat', 'Fasipe'],
    'GO': ['UniRV', 'UniEvangélica', 'PUC-GO', 'Fasam', 'Unifan'],
    'MS': ['Unigran', 'UCDB', 'Anhanguera', 'UEMS'],
    'MG': ['Unitri', 'Uniube', 'FPM', 'Unipam'],
    'PR': ['Unicesumar', 'Fag', 'Unioeste', 'Positivo'],
    'BA': ['Fasb', 'Uninasau', 'Ufob'],
    'SP': ['Unip', 'Estácio', 'Unoeste', 'Toledo'],
    'TO': ['Ulbra', 'Unitins', 'Fapal'],
    'MA': ['Ceuma', 'Facimp', 'Balsas'],
    'DEFAULT': ['Anhanguera', 'Estácio', 'Unip', 'EAD Local']
};

export const getCompetitionMatrix = (city: MunicipioPerfil) => {
  // 1. Lógica de Oceano Azul (Blue Ocean)
  // Se tem menos de 3 IES, não geramos gráfico de dispersão genérico.
  // Retornamos array vazio para o componente tratar como "Oportunidade de Monopólio".
  if (city.educacao.total_ies_ativas < 3) {
      return []; 
  }

  // 2. Determinação de Líderes Reais (Sincronização Territorial)
  const stateCompetitors = REGIONAL_COMPETITORS[city.estado] || REGIONAL_COMPETITORS['DEFAULT'];
  
  // Se é Hub Una (marcado no dado), o líder TEM que ser Una/Ânima
  const leaderName = city.isUnaHub ? "Ânima / Una (Líder)" : stateCompetitors[0];
  
  // Ajuste do número de players para o gráfico (não poluir demais)
  const count = Math.min(8, Math.max(3, city.educacao.total_ies_ativas));
  
  // Ticket base calculado pela renda real da cidade
  const baseTicket = city.economia.renda_per_capita * 0.3; 

  return Array.from({ length: count }, (_, i) => {
    let name = "";
    let type = "";
    let color = "";
    
    if (i === 0) {
        name = leaderName;
        type = "Líder Regional";
        color = "#10b981"; // Emerald
    } else {
        // Pega do dicionário do estado ou gera nome local
        name = stateCompetitors[i] || `IES Local ${city.nome.substring(0,3)}`;
        type = i % 2 === 0 ? "Grande Grupo" : "Local Isolada";
        color = i % 2 === 0 ? "#f97316" : "#94a3b8"; // Orange or Gray
    }

    return {
        name: name,
        share: i === 0 ? city.educacao.market_share_top3 : (100 - city.educacao.market_share_top3) / (count - 1),
        ticket: Math.round(baseTicket * (1 + (Math.random() * 0.4 - 0.2))),
        courses: Math.floor(20 + Math.random() * 50),
        type: type,
        color: color
    };
  });
};

export const calculateWagePremium = (city: MunicipioPerfil) => [
  { level: 'Ensino Médio', salary: 1800, premium: 0 },
  { level: 'Técnico', salary: 2800, premium: 55 },
  { level: 'Superior', salary: 4500, premium: 150 },
  { level: 'Pós/MBA', salary: 7200, premium: 300 },
];

export const calculateSocialROI = (city: MunicipioPerfil) => ({
  gdpImpactMillions: city.pib_total_bi * 0.05 * 1000,
  jobsGenerated: Math.floor(city.populacao_total * 0.002),
  taxRevenueMillions: city.pib_total_bi * 0.01 * 1000,
  ruralExodusPreventionRate: 78,
  educationalEquityIndex: 65,
  localProductivityGainPct: 12
});

export const getMarketLeaders = (city: MunicipioPerfil) => {
    const competitors = REGIONAL_COMPETITORS[city.estado] || REGIONAL_COMPETITORS['DEFAULT'];
    return {
      leaderName: city.isUnaHub ? "Ânima/Una" : competitors[0],
      challengerName: competitors[1] || "Grupo Kroton",
      localName: competitors[2] || "Faculdade Católica"
    };
};

export const calculateSocialGap = (city: MunicipioPerfil) => ({
  youthPopulation: city.demografia.populacao_18_24,
  neetCount: Math.floor(city.demografia.populacao_18_24 * 0.25),
  openJobs: Math.floor(city.demografia.populacao_18_24 * 0.15),
  gapIndex: 45
});

// --- NOVAS FUNÇÕES: INTEGRAÇÃO RFB & CAPES (SIMULADA) ---

export const getLifestyleIndices = (city: MunicipioPerfil) => {
    // Simula dados da Receita Federal (CNAEs de serviços) baseado na renda e porte
    const wealthFactor = city.economia.renda_per_capita / 2000;
    const sizeFactor = Math.log10(city.populacao_total) / 5;
    
    const normalize = (val: number) => Math.min(100, Math.max(10, Math.round(val * 100)));

    return [
        { axis: 'Gastronomia & Lazer', value: normalize(wealthFactor * 0.8), description: 'Bares, Restaurantes, Eventos' },
        { axis: 'Saúde & Bem-estar', value: normalize(wealthFactor * 0.9), description: 'Academias, Clínicas, Spas' },
        { axis: 'Serviços Pessoais', value: normalize(sizeFactor * 0.7), description: 'Salões, Estética, Lavanderias' },
        { axis: 'Varejo Premium', value: normalize(wealthFactor * 0.6 * sizeFactor), description: 'Boutiques, Autos, Shoppings' },
        { axis: 'Mobilidade Urbana', value: normalize(sizeFactor * 0.8), description: 'Apps, Transporte Privado' },
    ];
};

export const getScientificData = (city: MunicipioPerfil) => {
    // Simula dados da CAPES e Scraping de Vagas
    const isResearchHub = city.educacao.total_ies_ativas > 10 || city.tier === 'SEDE';
    
    return {
        capes: {
            programs: isResearchHub ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3),
            avgGrade: isResearchHub ? 4.5 : 3.0,
            tier: isResearchHub ? 'Hub de Pesquisa Consolidado' : 'Foco em Ensino',
            topAreas: ['Agronomia', 'Biotecnologia', 'Saúde Coletiva']
        },
        realTimeJobs: [
            { role: 'Cientista de Dados Agro', company: 'Confidencial (LinkedIn)', salary: 'R$ 8k-12k', source: 'LinkedIn' },
            { role: 'Engenheiro de Bioprocessos', company: 'Usina Local', salary: 'R$ 7k', source: 'Glassdoor' },
            { role: 'Gestor de Inovação', company: 'Hub Tech', salary: 'R$ 15k', source: 'Vagas.com' },
            { role: 'Piloto de Drone Agrícola', company: 'Fazenda Futuro', salary: 'R$ 5k', source: 'Indeed' }
        ]
    };
};
