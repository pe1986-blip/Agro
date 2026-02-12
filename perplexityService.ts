// --- Types ---
export interface ResearchSource {
  title: string;
  url: string;
}

export interface ResearchResult {
  title: string;
  summary: string;
  sources: ResearchSource[];
  insights: string[];
}


// --- Caching Layer ---
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
    data: ResearchResult;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();


// --- Helper Functions ---

// Helper to generate deterministic data based on input
const seededHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};


// --- Mock Data Generation ---

const generateMockData = (query: string, municipality: string, state: string): ResearchResult => {
    const hashSeed = seededHash(`${query}-${municipality}-${state}`);
    
    return {
        title: `Análise de Oportunidades em ${query} para ${municipality}, ${state}`,
        summary: `Uma análise aprofundada do mercado de ${query.toLowerCase()} em ${municipality} revela um cenário promissor, impulsionado pelo forte setor do agronegócio local e uma crescente demanda por profissionais qualificados. A sinergia entre a produção agrícola e a necessidade de inovação tecnológica cria um ambiente fértil para investimentos educacionais estratégicos.`,
        sources: [
            { title: `Plano de Desenvolvimento Econômico de ${municipality} 2024`, url: '#' },
            { title: 'EMBRAPA - Dados da Produção Agrícola Regional', url: '#' },
            { title: 'Censo Educacional 2023 - INEP/MEC', url: '#' },
        ],
        insights: [
            `A demanda por cursos de ${query.toLowerCase()} em ${municipality} cresceu ${10 + (hashSeed % 15)}% nos últimos dois anos.`,
            'Existe uma lacuna de mercado para especializações em agricultura de precisão e gestão de agronegócio.',
            `Empresas locais investiram mais de R$${50 + (hashSeed % 100)} milhões em tecnologia no último ano, aumentando a procura por mão de obra qualificada.`,
        ],
    };
};

const getFallbackData = (query: string, municipality: string): ResearchResult => {
    return {
        title: `Pesquisa Indisponível para ${query}`,
        summary: `Não foi possível obter os dados da pesquisa para ${municipality} neste momento. A simulação da API pode ter encontrado um erro. Por favor, tente novamente mais tarde.`,
        sources: [],
        insights: ['Nenhum insight disponível devido a uma falha na busca de dados.'],
    };
};


// --- Main Service Function ---

/**
 * Simula a busca de uma pesquisa aprofundada sobre um tópico em um município.
 * Utiliza um cache de 5 minutos e tem um mecanismo de fallback em caso de erro.
 * @param query O tópico da pesquisa (ex: "Ensino Superior em TI")
 * @param municipality O nome do município
 * @param state A sigla do estado
 * @returns Uma promessa que resolve com o resultado da pesquisa.
 */
export const fetchResearch = async (
    query: string,
    municipality: string,
    state: string
): Promise<ResearchResult> => {
    const cacheKey = `${query}-${municipality}-${state}`.toLowerCase();
    const now = Date.now();
    const cachedEntry = cache.get(cacheKey);

    if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION_MS) {
        console.log(`[PerplexityService] Returning cached response for: ${cacheKey}`);
        return cachedEntry.data;
    }

    try {
        // Simula latência de rede
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

        // Simula uma falha em 15% das chamadas para testar o fallback
        if (Math.random() < 0.15) {
            throw new Error(`Simulated API failure for query: ${cacheKey}`);
        }

        console.log(`[PerplexityService] Fetching new data for: ${cacheKey}`);
        const data = generateMockData(query, municipality, state);

        cache.set(cacheKey, { data, timestamp: now });
        return data;

    } catch (error) {
        console.warn(`[PerplexityService] Could not fetch research for ${cacheKey}. Returning fallback. Error:`, error);
        return getFallbackData(query, municipality);
    }
};
