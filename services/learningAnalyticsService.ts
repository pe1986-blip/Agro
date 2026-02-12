
import { MunicipioPerfil } from '../types';

export interface ImpactProjection {
  empregabilidade: number; // % estimada
  incrementoRenda: number; // % aumento salarial
  retencaoEsperada: number; // %
  satisfacaoEmpresas: number; // NPS B2B esperado
  impactoTerritorial: string; // Descrição qualitativa
}

// Simula dados históricos do Lake para calibrar as projeções
const HISTORIC_DATA = {
  'Alta': { emp: 92, renda: 35, ret: 88, nps: 75 }, // Alta Tecnologia
  'Média': { emp: 80, renda: 20, ret: 75, nps: 60 },
  'Baixa': { emp: 65, renda: 10, ret: 60, nps: 45 }
};

export const LearningAnalyticsService = {
  /**
   * Consulta o Lake para projetar o impacto de um novo curso
   * baseado nas características do território e do job.
   */
  getImpactProjection: async (city: MunicipioPerfil, jobSector: string): Promise<ImpactProjection> => {
    // Simula latência de consulta ao BigQuery
    await new Promise(resolve => setTimeout(resolve, 800));

    // Lógica de inferência baseada nos dados do território (O Lake "pensa")
    const techLevel = city.agro.nivel_tecnologico || 'Média';
    const baseStats = HISTORIC_DATA[techLevel as keyof typeof HISTORIC_DATA] || HISTORIC_DATA['Média'];

    // Ajustes finos baseados no setor (Dualidade)
    let modifier = 1.0;
    if (jobSector.includes('Tech') || jobSector.includes('Dados')) modifier = 1.2;
    if (jobSector.includes('Gestão')) modifier = 1.1;

    return {
      empregabilidade: Math.min(99, baseStats.emp * modifier),
      incrementoRenda: baseStats.renda * modifier,
      retencaoEsperada: baseStats.ret,
      satisfacaoEmpresas: baseStats.nps,
      impactoTerritorial: `A implementação deste curso em ${city.nome} tem potencial de reduzir o gap de ${jobSector} em até 40% em 18 meses, baseado em casos similares em ${city.estado}.`
    };
  }
};
