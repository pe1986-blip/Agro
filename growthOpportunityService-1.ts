import { MUNICIPIOS_PERFIL } from './constants';
import type { MunicipioPerfil, GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors, MarketPhase } from './types';

export type { GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors };

// IDs VIPs
const SEDE_IDS = [5208707, 5103403, 3543402, 4113700, 3170206];

const normalize = (val: number, min: number, max: number) => Math.min(10, Math.max(0, ((val - min) / (max - min)) * 10));

export const calculateGrowthOpportunity = (city: MunicipioPerfil): GrowthOpportunityScore => {
    // --- LÓGICA DE OURO ---
    // Verifica por ID ou nome para garantir que o sistema não falhe
    const isGoiania = city.municipio_id === 5208707 || city.nome.includes('Goiânia');
    const isSede = SEDE_IDS.includes(city.municipio_id);

    let finalScore = 0;
    let tier: MarketTier = 'P2';
    let reasoning = "";
    let marketPhase: MarketPhase = 'Early Stage';
    
    // Define Hub Potential logic
    const hubPotentialScore = isGoiania ? 10 : (isSede ? 9 : 4);

    if (isGoiania) {
        finalScore = 9.8; 
        tier = 'SEDE';
        reasoning = "💎 SEDE NACIONAL. Hub absoluto de decisão.";
        marketPhase = 'Gold Rush';
    } else if (isSede) {
        finalScore = 9.2; 
        tier = 'SEDE';
        reasoning = "⭐ Sede Regional Estratégica.";
        marketPhase = 'Cash Cow';
    } else {
        const rawScore = normalize((city.demografia.populacao_18_24 * 2) + (city.economia.renda_per_capita / 50), 5000, 150000) * 0.4 + (city.agro.nivel_tecnologico === 'Alto' ? 8 : 5) * 0.6;
        finalScore = Math.min(8.5, Math.max(4.0, rawScore));
        tier = 'P1';
        reasoning = "Oportunidade de mercado orgânica.";
        
        // Simulação básica de fase de mercado para os demais
        if (finalScore > 6) marketPhase = 'Battlefield';
        else if (finalScore > 4) marketPhase = 'Early Stage';
        else marketPhase = 'Cash Cow';
    }

    return {
        municipio_id: city.municipio_id,
        municipality: `${city.nome} (${city.estado})`,
        score: parseFloat(finalScore.toFixed(1)),
        hubScore: parseFloat(hubPotentialScore.toFixed(1)),
        category: finalScore > 8 ? 'high' : 'medium',
        tier,
        marketPhase,
        factors: {
            marketPotential: isGoiania ? 10 : 6,
            hubPotentialScore: parseFloat(hubPotentialScore.toFixed(1)),
            competitionRisk: isGoiania ? 8 : 5,
            academicHealth: 9,
            talentGapScore: isGoiania ? 10 : 7,
            agroTechIndex: isGoiania ? 10 : 6,
            futureTrend: 9,
            penetrationScore: isGoiania ? 9 : 5,
            penetrationRateVal: 20,
            
            // New Factors
            scoreK12Pipeline: isGoiania ? 10 : 6,
            scoreRivalQuality: isGoiania ? 9 : 5,
            scorePricingPower: isGoiania ? 9 : 6,

            momentumScore: isGoiania ? 9.5 : 6.0,
            scorePop: isGoiania ? 10 : 6,
            scoreWealth: isGoiania ? 10 : 6,
            scoreAgroSize: isGoiania ? 10 : 7,
            scoreMomentum: isGoiania ? 9.5 : 6.0,
            scorePenetration: isGoiania ? 9 : 5,
            scoreTechFit: isGoiania ? 10 : 6,
            scoreCompetition: isGoiania ? 8 : 5,
            scoreVitality: isGoiania ? 10 : 5
        },
        reasoning
    };
};

export const getAllOpportunities = async (): Promise<GrowthOpportunityScore[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    // Ordenação forçada: Goiânia 9.8 sempre no topo
    return MUNICIPIOS_PERFIL
        .map(city => calculateGrowthOpportunity(city))
        .sort((a, b) => b.score - a.score);
};
