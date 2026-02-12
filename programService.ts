import type { ProgramRecommendation, GrowthOpportunityScore } from './types';

// --- Caching Layer ---
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
    data: ProgramRecommendation[];
    timestamp: number;
}

const cache = new Map<number, CacheEntry>();

// --- Helper Functions ---
const seededRandom = (seed: number): number => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    return (((a * seed) + c) % m) / m;
};

// --- Mock Data Generation ---
const PROGRAM_TEMPLATES = [
    { name: (mun: string) => `Técnico em Agricultura de Precisão para ${mun}`, icon: 'tractor', time: '18 meses' },
    { name: () => `Graduação em Zootecnia com foco em Sustentabilidade`, icon: 'grad_cap', time: '4 anos' },
    { name: () => `MBA em Gestão de Cooperativas Agrícolas`, icon: 'briefcase', time: '12 meses' },
    { name: () => `Especialização em Logística do Agronegócio 4.0`, icon: 'bar_chart', time: '6 meses' },
    { name: () => `Análise de Dados para o Agronegócio (AgroTech)`, icon: 'bar_chart', time: '2 anos' },
    { name: (mun: string) => `Gestão Ambiental e ESG para ${mun}`, icon: 'grad_cap', time: '4 anos' },
    { name: () => `Operador de Drones e VANTs`, icon: 'tractor', time: '3 meses' },
];

const calculateOpportunityScore = (gap: number, innovation: number, competition: number): number => {
    // Normalize factors to a 0-10 scale
    const gapScore = Math.min(10, Math.max(0, (gap / 200) * 10)); // Max score for a gap of 200+
    const innovationScore = Math.min(10, (innovation / 30) * 10); // Max score for 30% growth
    const competitionScore = Math.min(10, Math.max(0, (1 - (competition / 150)) * 10)); // Max score for 0 competition, min for 150+

    const score = (gapScore * 0.4) + (innovationScore * 0.3) + (competitionScore * 0.3);
    
    return Math.max(0, Math.min(score, 10));
};

/**
 * Simulates fetching and processing program recommendations for a given municipality.
 * This function is deterministic based on the municipality ID.
 */
export const getProgramRecommendations = async (opportunity: GrowthOpportunityScore): Promise<ProgramRecommendation[]> => {
    const { municipio_id, municipality, factors } = opportunity;
    const municipalityName = municipality.split(' (')[0];
    const now = Date.now();
    
    // Check cache first
    const cachedEntry = cache.get(municipio_id);
    if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION_MS) {
        return cachedEntry.data;
    }

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

    const recommendations: ProgramRecommendation[] = [];

    // Use a slice of templates based on ID to vary results
    const templateStartIndex = municipio_id % 3;
    const templatesToUse = PROGRAM_TEMPLATES.slice(templateStartIndex, templateStartIndex + 5);

    templatesToUse.forEach((template, index) => {
        const seed = municipio_id + index * 10;
        
        // Demand is influenced by market size and innovation
        // FIX: Property 'cagrStrategic' does not exist on type 'factors'. Replaced with 'futureTrend' as proxy for innovation/growth.
        const localDemand = Math.floor(50 + seededRandom(seed) * 300 + factors.futureTrend * 15);
        
        // Offer is influenced by competition. Derived from competitionRisk (where 10 means low risk/low competition).
        // FIX: Property 'competition' does not exist on type 'factors'. Derived from competitionRisk.
        const competitionLevel = (10 - factors.competitionRisk) * 10;
        const currentOffer = Math.floor(1 + seededRandom(seed * 2) * 5 + competitionLevel / 10);

        const educationalGap = localDemand - (currentOffer * 40); // Assume 1 course serves ~40 students/year
        
        const opportunityScore = calculateOpportunityScore(
            educationalGap,
            // FIX: Property 'cagrStrategic' does not exist. Replaced with scaled 'futureTrend'.
            factors.futureTrend * 3,
            // FIX: Property 'competition' does not exist. Replaced with derived competitionLevel.
            competitionLevel
        );

        recommendations.push({
            id: `${municipio_id}-${index}`,
            name: template.name(municipalityName),
            icon: template.icon as ProgramRecommendation['icon'],
            localDemand,
            currentOffer,
            educationalGap,
            opportunityScore,
            estimatedTime: template.time,
            // FIX: Derived competition proxy used here.
            competition: Math.round(competitionLevel / (2 + seededRandom(seed * 3) * 3)), // Competition per program is a fraction of total
            municipality: opportunity.municipality,
        });
    });

    recommendations.sort((a, b) => b.opportunityScore - a.opportunityScore);

    // Store in cache
    cache.set(municipio_id, { data: recommendations, timestamp: now });

    return recommendations;
};