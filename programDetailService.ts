
import type { ProgramDetail, ProgramRecommendation } from './types';

// --- Caching Layer ---
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
    data: ProgramDetail;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();

// --- Helper Functions ---
const seededRandom = (seed: number): number => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    return (((a * seed) + c) % m) / m;
};

const selectRandomItems = <T,>(arr: T[], count: number, seed: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - seededRandom(seed++));
    return shuffled.slice(0, count);
};


// --- Mock Data Pools ---
const SKILLS_POOL = [
    "Governança de Projetos AgTech", "Análise de Dados Agrícolas", "Estratégia de Inovação no Setor", 
    "Financiamento e Modelos de Negócio", "Sensoriamento Remoto e Geoprocessamento", 
    "Automação e Robótica Agrícola", "Gestão Sustentável (ESG)", "Cadeias de Suprimentos Digitais",
    "Biotecnologia Aplicada", "Marketing Digital para o Agronegócio"
];
const COMPANIES_POOL = [
    "Amaggi", "Cargill", "Bunge", "Raízen", "SLC Agrícola", "Adecoagro", "JBS", "Marfrig", "Syngenta", "Bayer"
];
const POSITIONS_POOL = [
    "Chief Technology Officer (CTO)", "Product Manager de AgTech", "Consultor de Inovação",
    "Analista de Dados Agrícolas", "Especialista em Agricultura de Precisão", "Gerente de Fazenda Digital"
];
const MODULES_POOL = [
    { title: "Fundamentos em Agrotech", duration: "2 meses" },
    { title: "Análise de Dados Agrícolas", duration: "3 meses" },
    { title: "Inovação e Empreendedorismo", duration: "3 meses" },
    { title: "Projeto Final / Capstone", duration: "4 meses" },
    { title: "Gestão Financeira no Agro", duration: "2 meses" },
    { title: "Logística e Supply Chain 4.0", duration: "2 meses" }
];


/**
 * Generates detailed, deterministic mock data for a specific program.
 * @param program - The base program recommendation object.
 * @returns A full ProgramDetail object.
 */
const generateMockProgramDetail = (program: ProgramRecommendation): ProgramDetail => {
    const programId = program.id;
    const [municipioIdStr] = programId.split('-');
    const municipioId = parseInt(municipioIdStr, 10);
    const seed = municipioId + program.name.length;
    
    // Financials
    const priceMin = 15000 + seededRandom(seed) * 10000;
    const priceMax = priceMin + 5000;
    const revenueMin = priceMin * 30;
    const revenueMax = priceMax * 40;
    
    return {
        ...program,
        code: `AGR-${Math.floor(100 + seededRandom(seed * 2) * 899)}`,
        employabilityRate: 85 + seededRandom(seed * 3) * 13,
        description: `Este programa de ${program.name} foi desenhado para atender às necessidades específicas do mercado de ${program.name.split(' para ')[1] || 'Agronegócio'}. Ele prepara profissionais para liderar a transformação digital no campo, combinando conhecimentos técnicos com visão estratégica de negócios. A metodologia foca em estudos de caso reais da região, projetos práticos e parcerias com empresas locais para garantir a máxima aplicabilidade do aprendizado.`,
        
        developedSkills: selectRandomItems(SKILLS_POOL, 5 + Math.floor(seededRandom(seed*4) * 3), seed),

        structure: {
            duration: program.estimatedTime,
            format: seededRandom(seed * 5) > 0.6 ? "Semipresencial (2x por mês)" : "Online com Imersões",
            classesPerYear: seededRandom(seed * 6) > 0.5 ? 2 : 1,
            studentsPerClass: "30-40",
            modules: selectRandomItems(MODULES_POOL, 4, seed),
        },

        marketInfo: {
            averageSalary: `R$ ${((6 + seededRandom(seed*7)*5)*1000/1000).toFixed(1)}k - ${((11 + seededRandom(seed*8)*6)*1000/1000).toFixed(1)}k/mês`,
            hiringCompanies: selectRandomItems(COMPANIES_POOL, 3 + Math.floor(seededRandom(seed*9) * 2), seed),
            availablePositions: selectRandomItems(POSITIONS_POOL, 3, seed),
            marketDemandGrowth: `${Math.floor(12 + seededRandom(seed*10)*10)}% a.a.`,
        },

        financialViability: {
            programPrice: `R$ ${Math.floor(priceMin/1000)}k - ${Math.floor(priceMax/1000)}k por aluno`,
            estimatedRevenuePerClass: `R$ ${Math.floor(revenueMin/1000)}k - ${Math.floor(revenueMax/1000)}k`,
            initialInvestment: `R$ ${100 + Math.floor(seededRandom(seed*11)*150)}k`,
            breakEven: `${seededRandom(seed*12) > 0.5 ? '1-2 turmas' : '2 turmas'}`,
            roiIn3Years: `${Math.floor(250 + seededRandom(seed*13)*200)}%`,
        }
    };
};

/**
 * Simulates fetching detailed program information.
 * @param programId The ID of the program to fetch.
 * @param programBaseName The base name of the program for seeding.
 * @returns A promise that resolves to a ProgramDetail object.
 */
export const getProgramDetailById = async (programId: string, programBaseName: string, municipality?: string): Promise<ProgramDetail> => {
    const cacheKey = programId;
    const now = Date.now();
    const cachedEntry = cache.get(cacheKey);

    if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION_MS) {
        return cachedEntry.data;
    }

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    
    // In a real app, you would fetch this base object from your state or another service.
    // Here we generate it just to pass to the detail generator.
    const tempBaseProgram: ProgramRecommendation = {
        id: programId,
        name: programBaseName,
        icon: 'grad_cap',
        localDemand: 100,
        currentOffer: 2,
        educationalGap: 20,
        opportunityScore: 8.5,
        estimatedTime: "12 meses",
        competition: 5,
        municipality: municipality,
    };
    
    const data = generateMockProgramDetail(tempBaseProgram);

    cache.set(cacheKey, { data, timestamp: now });

    return data;
};