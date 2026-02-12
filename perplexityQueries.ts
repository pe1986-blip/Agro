/**
 * Este módulo contém templates de queries para o serviço de pesquisa (Perplexity).
 * Cada função gera uma string de consulta detalhada e contextualizada, pronta para ser enviada.
 * As queries são projetadas para extrair insights específicos sobre o mercado educacional e setores produtivos.
 */

interface QueryFunctions {
  /**
   * Gera uma query para uma análise completa do mercado educacional superior em um município.
   */
  educationalMarketAnalysis: (municipality: string, state: string) => string;

  /**
   * Gera uma query sobre as tendências do setor de agronegócio para um município.
   */
  agroSectorTrends: (municipality: string) => string;

  /**
   * Gera uma query para identificar a demanda por habilidades profissionais em um município,
   * com base em seus principais setores produtivos.
   */
  professionalSkillsDemand: (municipality: string, productive_sectors: string) => string;

  /**
   * Gera uma query para descobrir oportunidades educacionais e lacunas de mercado em um município.
   */
  educationalOpportunities: (municipality: string) => string;
  
  /**
   * Gera uma query para uma análise competitiva detalhada do ensino superior em um município.
   */
  competitiveAnalysis: (municipality: string, state: string) => string;
}


export const queries: QueryFunctions = {

  educationalMarketAnalysis: (municipality: string, state: string): string => `
    Realize uma análise aprofundada do mercado de ensino superior para o município de ${municipality}, ${state}. 
    A análise deve incluir:
    1.  **Potencial de Mercado:** Avalie o tamanho do mercado potencial, considerando a população jovem e a demanda por qualificação.
    2.  **Principais Oportunidades:** Identifique as áreas de estudo com maior potencial de crescimento, correlacionando com a economia local.
    3.  **Riscos e Desafios:** Liste os principais riscos, como saturação de mercado em certas áreas ou desafios socioeconômicos.
    4.  **Cenário Competitivo:** Mapeie os principais players (universidades e faculdades) já estabelecidos na região.
    Forneça uma conclusão com um resumo executivo.
  `,

  agroSectorTrends: (municipality: string): string => `
    Descreva as principais tendências e o panorama atual do setor de agronegócio no município de ${municipality}. 
    Sua resposta deve abordar:
    1.  **Principais Culturas e Produções:** Detalhe os produtos agrícolas mais relevantes para a economia local.
    2.  **Tecnologias Adotadas:** Investigue o nível de adoção de tecnologias como agricultura de precisão, IoT e biotecnologia.
    3.  **Projeções de Crescimento:** Apresente projeções de crescimento para os próximos 5 anos para o agronegócio na região.
    4.  **Demandas de Qualificação:** Quais são as principais necessidades de mão de obra qualificada para sustentar esse crescimento?
  `,

  professionalSkillsDemand: (municipality: string, productive_sectors: string): string => `
    Analise a demanda por habilidades profissionais no município de ${municipality}, com foco nos seguintes setores produtivos: ${productive_sectors}.
    A análise deve conter:
    1.  **Funções Mais Requisitadas:** Liste os cargos e funções com maior número de vagas abertas.
    2.  **Habilidades Técnicas (Hard Skills):** Especifique as tecnologias, softwares e conhecimentos técnicos mais demandados.
    3.  **Habilidades Comportamentais (Soft Skills):** Identifique as competências comportamentais mais valorizadas pelos empregadores locais.
    4.  **Tendências de Contratação:** Indique se há uma tendência de aumento na demanda por profissionais de tecnologia, gestão ou outras áreas específicas.
  `,

  educationalOpportunities: (municipality: string): string => `
    Identifique lacunas e oportunidades no setor educacional do município de ${municipality}.
    Baseie sua análise nos seguintes pontos:
    1.  **Cursos Inexistentes ou com Baixa Oferta:** Quais cursos de graduação e pós-graduação, alinhados à vocação econômica local, ainda não são oferecidos ou têm pouca oferta?
    2.  **Demanda vs. Oferta:** Compare a demanda por profissionais qualificados (com base nos setores econômicos de ${municipality}) com a oferta atual de cursos na cidade.
    3.  **Potencial para Cursos Técnicos e de Curta Duração:** Avalie a oportunidade para a criação de cursos de formação mais rápida para atender demandas imediatas do mercado de trabalho.
  `,
  
  competitiveAnalysis: (municipality: string, state: string): string => `
    Realize uma análise competitiva detalhada das instituições de ensino superior (IES) que atuam em ${municipality}, ${state}.
    A análise deve incluir:
    1.  **Principais Concorrentes:** Liste as 3 a 5 IES mais relevantes na cidade.
    2.  **Market Share Estimado:** Forneça uma estimativa do market share de cada uma, com base no número de alunos ou ingressantes.
    3.  **Portfólio de Cursos:** Compare o portfólio de cursos das principais concorrentes, destacando seus pontos fortes.
    4.  **Estratégia de Preços e Posicionamento:** Descreva o posicionamento de cada IES (premium, popular, nicho) e sua estratégia de preços, se houver dados públicos.
  `,

};
