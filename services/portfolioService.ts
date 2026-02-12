
export interface DnaScore {
  Prática: number;
  Conexão: number;
  Inovação: number;
  Teoria: number;
  Mentoria: number;
  // Novas Dimensões de Fink
  Humana: number;
  Cuidar: number;
  Aprender: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  duration_mask: string;
  description: string;
  dna: DnaScore;
  publico: string;
  formato: string;
  metodologia: string;
  intensidade: 'Baixa' | 'Moderada' | 'Alta' | 'Altíssima';
  ambiente: string;
  entrega_principal: string;
  avaliacao: string;
  custo: string;
}

export interface PortfolioGroup {
  title: string;
  iconName: string;
  color: string;
  items: PortfolioItem[];
}

// Arquétipos enriquecidos com Dimensões de Fink
export const PORTFOLIO_ARCHETYPES: PortfolioGroup[] = [
  {
    title: "Intensivos & Vivenciais (Curta Duração)",
    iconName: "Zap",
    color: "#f59e0b",
    items: [
      { 
        id: 'imersao', 
        name: 'Imersão Executiva', 
        duration_mask: '20h (2-3 dias)', 
        description: 'Programa intensivo de conhecimento prático em curto prazo com foco em vivência e reflexão.', 
        publico: 'Gestores / C-Level',
        formato: 'Vivencial',
        metodologia: 'Neuroaprendizagem Vivencial',
        intensidade: 'Altíssima',
        ambiente: 'Campo / Operação',
        entrega_principal: 'Experiência + Insights',
        avaliacao: 'Participação',
        custo: 'Médio',
        dna: { Prática: 40, Conexão: 90, Inovação: 60, Teoria: 20, Mentoria: 30, Humana: 80, Cuidar: 40, Aprender: 50 } 
      },
      { 
        id: 'bootcamp', 
        name: 'Bootcamp Tático', 
        duration_mask: '40-60h (3-5 dias)', 
        description: 'Treinamento intensivo com foco em resultados práticos imediatos e solução de problemas.', 
        publico: 'Gestores / C-Level',
        formato: 'Prático (Learning by Doing)',
        metodologia: 'Prática + Solução',
        intensidade: 'Altíssima',
        ambiente: 'Prático / Simulação',
        entrega_principal: 'Solução Testada',
        avaliacao: 'Projeto Final',
        custo: 'Médio',
        dna: { Prática: 95, Conexão: 40, Inovação: 50, Teoria: 10, Mentoria: 20, Humana: 30, Cuidar: 20, Aprender: 90 } 
      }
    ]
  },
  {
    title: "Formação Dual (Longa Duração)",
    iconName: "GraduationCap",
    color: "#3b82f6",
    items: [
      { 
        id: 'pos_graduacao', 
        name: 'Pós-Graduação / MBA Dual', 
        duration_mask: '360h (12 meses)', 
        description: 'Especialização acadêmica integrada com desafios reais de empresas parceiras.', 
        publico: 'Gestores / C-Level',
        formato: 'Híbrido Dual',
        metodologia: 'Matriz Radial',
        intensidade: 'Baixa',
        ambiente: 'Acadêmico + Empresa',
        entrega_principal: 'Certificado Acadêmico + Portfólio',
        avaliacao: 'Defesa de Projeto Real',
        custo: 'Alto',
        dna: { Prática: 50, Conexão: 50, Inovação: 60, Teoria: 60, Mentoria: 40, Humana: 50, Cuidar: 30, Aprender: 70 } 
      }
    ]
  }
];

export interface CurriculumModule {
    order: number;
    title: string;
    type: string;
    hours: number;
    neuroPhase: string; // Fase da Neuroaprendizagem
    finkDimension: string; // Dimensão de Fink
}

// Gerador baseado na Neuroaprendizagem (7 Passos)
export const generateCurriculumMatrix = (jobTitle: string, archetypeId: string): CurriculumModule[] => {
  
  // Lógica customizada baseada no Job
  const isTech = jobTitle.toLowerCase().includes('dados') || jobTitle.toLowerCase().includes('tech');
  const isManagement = jobTitle.toLowerCase().includes('gestão') || jobTitle.toLowerCase().includes('liderança');

  // Base padrão da Neuroaprendizagem
  const modules: CurriculumModule[] = [
    { 
        order: 1, 
        title: 'Conexão & Contexto (O Porquê)', 
        type: 'Imersão', 
        hours: 10,
        neuroPhase: 'Conectar (Emoção)',
        finkDimension: 'Dimensão Humana'
    },
    { 
        order: 2, 
        title: isTech ? 'Exploração de Ferramentas & Dados' : 'Fundamentos de Gestão Agro', 
        type: 'Teórico-Prático', 
        hours: 30,
        neuroPhase: 'Explorar (Conceito)',
        finkDimension: 'Conhecimento Fundamental'
    },
    { 
        order: 3, 
        title: isTech ? 'Modelagem & Simulação' : 'Dinâmicas de Mercado', 
        type: 'Laboratório', 
        hours: 40,
        neuroPhase: 'Expandir (Cognição)',
        finkDimension: 'Aplicação'
    },
    { 
        order: 4, 
        title: 'Desafio Real (Empresa Parceira)', 
        type: 'Dual (Empresa)', 
        hours: 60,
        neuroPhase: 'Efetivar (Prática)',
        finkDimension: 'Integração'
    },
    { 
        order: 5, 
        title: 'Socialização & Feedback', 
        type: 'Mentoria Coletiva', 
        hours: 20,
        neuroPhase: 'Evocar/Interagir',
        finkDimension: 'Cuidar (Caring)'
    },
    { 
        order: 6, 
        title: 'Avaliação & Metacognição', 
        type: 'Projeto Final', 
        hours: 20,
        neuroPhase: 'Avaliar (Metacognição)',
        finkDimension: 'Aprender a Aprender'
    }
  ];

  return modules;
};
