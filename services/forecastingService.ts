
import { MunicipioPerfil } from "../types";

export interface NationalForecast {
    year: number;
    ead_penetration: number; // %
    agtech_jobs_gap: number; // Milhares
    hybrid_adoption: number; // %
}

export const getNationalHorizon = (): NationalForecast[] => {
    return Array.from({length: 12}, (_, i) => {
        const year = 2024 + i;
        // Simulação de Tendências Nacionais
        return {
            year,
            ead_penetration: Math.min(85, 45 + (i * 3.5)), // Crescimento linear até saturação
            agtech_jobs_gap: Math.round(50 + (i * i * 1.5)), // Crescimento exponencial do gap
            hybrid_adoption: Math.min(95, 20 + (i * 6)) // Adoção acelerada de híbrido
        };
    });
};

export const analyzeStrategicHorizon = (city: MunicipioPerfil) => {
  const growthRate = city.cagr_ing_total_2023 / 100;
  return {
    tendencia_crescimento: growthRate > 0.05 ? 'Acelerado' as const : 'Estavel' as const,
    elasticidade_renda: 1.2,
    setores_em_alta: ['Agronegócio 4.0', 'Saúde', 'Tecnologia'],
    projecao_5_anos: Array.from({length: 10}, (_, i) => ({
      ano: 2024 + i,
      demanda_alunos: Math.round(city.ing_total_2023 * Math.pow(1 + growthRate, i)),
      renda_media_projetada: Math.round(city.economia.renda_per_capita * Math.pow(1.03, i))
    }))
  };
};
