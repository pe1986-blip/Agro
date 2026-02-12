import { MUNICIPIOS_PERFIL } from '../constants';
import type { MunicipioPerfil, GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors, MarketPhase } from '../types';

export type { GrowthOpportunityScore, MarketTier, GrowthOpportunityFactors };

const normalize = (val: number, min: number, max: number) => Math.min(10, Math.max(0, ((val - min) / (max - min)) * 10));

export const calculateGrowthOpportunity = (city: MunicipioPerfil): GrowthOpportunityScore => {
    const tier = city.tier || 'P1';
    const isSede = tier === 'SEDE' || tier === 'UNA';
    const income = city.economia.renda_per_capita || 2000;
    const pibAgro = city.agro.pib_agro_bi || 1.0;
    const servicos = city.economia.pib_composicao?.servicos_bi || 1.0;
    const totalIES = city.educacao.total_ies_ativas || 5;
    const cagr = city.demografia?.cagr_populacao_5y || 0.5;
    // Fix: Using metricas_estrategicas safely
    const ticket = city.metricas_estrategicas?.ticket_medio_estimado || 600;
    const penetrationRate = city.metricas_estrategicas?.penetracao_mercado || 15;
    const concluintes = city.demografia.concluintes_em || (city.demografia.populacao_18_24 * 0.15) || 500;

    const scoreWealth = normalize(income, 1800, 5000);
    const scoreAgroSize = normalize(pibAgro, 0.5, 4.0);
    const scorePricingPower = normalize(ticket, 450, 1500);

    let scoreCompetition = totalIES > 15 ? 2 : (totalIES > 8 ? 4 : (totalIES > 3 ? 7 : 10));
    
    const finalScore = (scoreAgroSize * 0.4) + (scoreWealth * 0.3) + (scoreCompetition * 0.1) + (scorePricingPower * 0.2);

    return {
        municipio_id: city.municipio_id,
        municipality: `${city.nome} (${city.estado})`,
        score: parseFloat(finalScore.toFixed(1)),
        hubScore: isSede ? 9.5 : 4.5,
        category: finalScore > 7.0 ? 'high' : (finalScore > 5.0 ? 'medium' : 'low'),
        tier: tier as MarketTier,
        marketPhase: penetrationRate > 30 ? 'Cash Cow' : 'Battlefield',
        factors: {
            marketPotential: scoreAgroSize,
            futureTrend: cagr,
            hubPotentialScore: isSede ? 9.5 : 4.5,
            scorePop: normalize(concluintes, 200, 10000),
            scoreWealth,
            scoreAgroSize,
            scoreMomentum: cagr,
            scorePenetration: normalize(penetrationRate, 50, 5),
            scoreTechFit: city.agro.nivel_tecnologico === 'Alto' ? 10 : 6,
            scoreCompetition,
            scoreK12Pipeline: normalize(concluintes, 200, 10000),
            scoreRivalQuality: 8,
            scorePricingPower,
            penetrationRateVal: penetrationRate,
            competitionRisk: 10 - scoreCompetition,
            academicHealth: 8,
            talentGapScore: 7,
            agroTechIndex: 8,
            penetrationScore: normalize(penetrationRate, 50, 5),
            momentumScore: cagr,
            scoreVitality: 7
        },
        reasoning: isSede ? "Hub Estratégico Nacional" : "Oportunidade de Expansão"
    };
};

export const getAllOpportunities = async (): Promise<GrowthOpportunityScore[]> => {
    return MUNICIPIOS_PERFIL.map(city => calculateGrowthOpportunity(city)).sort((a, b) => b.score - a.score);
};
