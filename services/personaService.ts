import { GrowthOpportunityScore, PersonaRecommendation } from '../types';

export const PERSONAS = [
  { id: 'herdeiro', name: 'O Sucessor (Herdeiro)', tagline: 'Preciso modernizar a fazenda da família.', icon: 'tractor', ageRange: '22-28', incomeLevel: 'Alta', preferredModality: 'Presencial', painPoints: ['Conflito de gerações', 'Falta de gestão financeira'] },
  { id: 'transicao', name: 'O Migrante Tech', tagline: 'Quero sair da operação braçal para a tecnologia.', icon: 'laptop', ageRange: '25-35', incomeLevel: 'Média', preferredModality: 'EAD', painPoints: ['Falta de skills digitais', 'Horário rígido'] },
];

export const getPersonaRecommendations = async (personaId: string, opp: GrowthOpportunityScore): Promise<PersonaRecommendation> => {
  return {
    personaId,
    bestPrograms: [
      { id: 'mba_agro', name: 'MBA em Gestão do Agronegócio', icon: 'briefcase', localDemand: 100, currentOffer: 2, educationalGap: 50, opportunityScore: 9, estimatedTime: '18 meses', competition: 2 },
      { id: 'tec_drones', name: 'Piloto de Drones Agrícolas', icon: 'tractor', localDemand: 150, currentOffer: 1, educationalGap: 80, opportunityScore: 9.5, estimatedTime: '6 meses', competition: 1 }
    ],
    careerPath: [
      { stage: 'Curto Prazo', role: 'Assistente Técnico', avgSalary: 'R$ 3.500', duration: '6 meses' },
      { stage: 'Médio Prazo', role: 'Gerente de Operações', avgSalary: 'R$ 8.000', duration: '2-3 anos' }
    ],
    financing: [
      { name: 'Bolsa Mérito', type: 'Desconto', eligibility: 'Nota ENEM > 700', probability: 'Média', description: 'Até 50% de desconto.' }
    ],
    marketingAngle: personaId === 'herdeiro' ? "Foque na blindagem do patrimônio familiar e inovação." : "Foque na rápida inserção no mercado tech."
  };
};