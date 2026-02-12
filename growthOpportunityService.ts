import { MUNICIPIOS_PERFIL } from './constants';
import type { MunicipioPerfil, GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors, MarketPhase } from './types';

export type { GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors };

const normalize = (val: number, min: number, max: number) => Math.min(10, Math.max(0, ((val - min) / (max - min)) * 10));

export const calculateGrowthOpportunity = (city: MunicipioPerfil): GrowthOpportunityScore => {
    
    // --- SAFETY DEFAULTS (Para evitar crash em dados incompletos) ---
    const tier = city.tier || 'P2';
    const isSede = tier === 'SEDE' || tier === 'UNA';
    const income = city.economia.renda_per_capita || 2000;
    const pibAgro = city.agro.pib_agro_bi || 1.0;
    const servicos = city.economia.pib_composicao?.servicos_bi || 1.0;
    const totalIES = city.educacao.total_ies_ativas || 5;
    const cagr = city.demografia?.cagr_populacao_5y || 0.5;
    // Fix: Accessing potentially missing metricas_estrategicas property safely
    const ticket = city.metricas_estrategicas?.ticket_medio_estimado || 600;
    const penetrationRate = city.metricas_estrategicas?.penetracao_mercado || 15;
    const concluintes = city.demografia.concluintes_em || (city.demografia.populacao_18_24 * 0.15) || 500;
    
    // ========================================================================
    // 2. FUNDAMENTOS
    // ========================================================================
    
    const maxK12 = isSede ? 15000 : 3000;
    const scoreK12Pipeline = normalize(concluintes, 200, maxK12); 

    const scoreWealth = normalize(income, 1800, 5000);
    const scoreAgroSize = normalize(pibAgro, 0.5, 4.0);
    const scoreServices = normalize(servicos, 0.5, 15.0);

    const scorePricingPower = normalize(ticket, 450, 1500);

    // ========================================================================
    // 3. ANÁLISE DE COMPETIÇÃO
    // ========================================================================
    let scoreCompetition = 0;
    let blueOceanBonus = 0;

    if (totalIES > 15) scoreCompetition = 2.0; 
    else if (totalIES > 8) scoreCompetition = 4.0;
    else if (totalIES >= 4) scoreCompetition = 6.0;
    else if (totalIES >= 1) scoreCompetition = 8.0;
    else scoreCompetition = 10.0;

    if (totalIES <= 3 && scoreAgroSize > 5.0) blueOceanBonus = 1.0;

    // ========================================================================
    // 4. VITALIDADE
    // ========================================================================
    let vitalityBonus = 0;
    if (cagr > 2.0) vitalityBonus = 1.0;
    else if (cagr < 0) vitalityBonus = -1.0;

    // ========================================================================
    // 5. CÁLCULO FINAL
    // ========================================================================
    
    let commercialScore = 0;
    let finalScore = 0;
    let reasoning = "";

    if (isSede) {
        commercialScore = (scoreWealth * 0.40) + (scoreServices * 0.30) + (scoreK12Pipeline * 0.20) + (scoreAgroSize * 0.10);
        finalScore = (commercialScore * 0.7) + (scorePricingPower * 0.2) + (scoreCompetition * 0.1) + vitalityBonus;
        reasoning = "Mercado profundo. Foco em produtos Premium e B2B corporativo.";
    } else {
        commercialScore = (scoreAgroSize * 0.50) + (scoreWealth * 0.30) + (scoreK12Pipeline * 0.20);
        finalScore = (commercialScore * 0.5) + (scoreCompetition * 0.3) + (scorePricingPower * 0.2) + blueOceanBonus + vitalityBonus;
        if (blueOceanBonus > 0) reasoning = "💎 OCEANO AZUL: Alta riqueza agro e baixa concorrência.";
        else reasoning = "Fronteira de Expansão. Captura de demanda reprimida.";
    }

    finalScore = Math.min(10, Math.max(1.0, parseFloat(finalScore.toFixed(1))));
    
    const urbanityBonus = city.demografia.populacao_total > 150000 ? 2.0 : 0;
    let hubScore = (scoreServices * 0.5) + (normalize(totalIES, 0, 30) * 0.3) + urbanityBonus;
    hubScore = Math.min(10, parseFloat(hubScore.toFixed(1)));


    // ========================================================================
    // 6. CLASSIFICAÇÃO
    // ========================================================================
    let marketPhase: MarketPhase = 'Early Stage';

    if (isSede) {
        marketPhase = penetrationRate > 30 ? 'Cash Cow' : 'Battlefield';
    } else {
        if (blueOceanBonus > 0) marketPhase = 'Gold Rush';
        else if (penetrationRate < 15) marketPhase = 'Early Stage';
        else marketPhase = 'Battlefield';
    }

    const scoreRivalQuality = totalIES < 3 ? 10 : normalize(city.educacao.media_igc_top3 || 3, 2.0, 4.5);

    return {
        municipio_id: city.municipio_id,
        municipality: `${city.nome} (${city.estado})`,
        score: finalScore,
        hubScore: hubScore,
        category: finalScore > 7.0 ? 'high' : (finalScore > 5.0 ? 'medium' : 'low'),
        tier: tier as MarketTier, 
        marketPhase, 
        isUnaHub: city.isUnaHub,
        factors: {
            marketPotential: parseFloat(commercialScore.toFixed(1)),
            futureTrend: parseFloat(vitalityBonus.toFixed(1)),
            hubPotentialScore: parseFloat(hubScore.toFixed(1)),
            
            scorePop: parseFloat(scoreK12Pipeline.toFixed(1)),
            scoreWealth: parseFloat(scoreWealth.toFixed(1)),
            scoreAgroSize: parseFloat(scoreAgroSize.toFixed(1)),
            scoreMomentum: parseFloat(vitalityBonus.toFixed(1)),
            scorePenetration: normalize(penetrationRate, 50, 10),
            scoreTechFit: city.agro.nivel_tecnologico === 'Alto' ? 10 : 6,
            scoreCompetition: scoreCompetition,
            scoreK12Pipeline: parseFloat(scoreK12Pipeline.toFixed(1)),
            scoreRivalQuality: parseFloat(scoreRivalQuality.toFixed(1)),
            scorePricingPower: parseFloat(scorePricingPower.toFixed(1)),
            penetrationRateVal: penetrationRate,
            competitionRisk: 10 - scoreCompetition,
            academicHealth: normalize(city.educacao.media_igc_top3 || 3, 1, 5), 
            talentGapScore: parseFloat(scoreK12Pipeline.toFixed(1)), 
            agroTechIndex: city.agro.nivel_tecnologico === 'Alto' ? 9 : 6,
            penetrationScore: normalize(penetrationRate, 50, 10),
            momentumScore: parseFloat(vitalityBonus.toFixed(1)),
            scoreVitality: 5 + vitalityBonus
        },
        reasoning
    };
};

export const getAllOpportunities = async (): Promise<GrowthOpportunityScore[]> => {
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return MUNICIPIOS_PERFIL
        .map(city => calculateGrowthOpportunity(city))
        .sort((a, b) => b.score - a.score); 
};
