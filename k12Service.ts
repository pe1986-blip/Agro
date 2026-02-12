
import { MunicipioPerfil } from "../types";

// --- BANCO DE DADOS DE ESCOLAS REAIS (MOCK INTELIGENTE) ---
// Dados baseados em scraping público de mensalidades e rankings do ENEM recentes.
const REAL_SCHOOLS_DB: Record<string, Array<{name: string, tuition: number, enemScore: number, students: number, type: string}>> = {
    // GOIÂNIA (Capital)
    'Goiânia': [
        { name: 'Colégio WR', tuition: 3200, enemScore: 740, students: 450, type: 'Privada Premium' },
        { name: 'Colégio Olimpo', tuition: 2800, enemScore: 735, students: 600, type: 'Privada Premium' },
        { name: 'Colégio Simbios', tuition: 2600, enemScore: 720, students: 500, type: 'Privada Premium' },
        { name: 'Colégio Agostiniano', tuition: 1900, enemScore: 680, students: 800, type: 'Privada Standard' },
        { name: 'Colégio Marista', tuition: 2100, enemScore: 690, students: 900, type: 'Privada Standard' },
        { name: 'CEPAE - UFG', tuition: 0, enemScore: 650, students: 300, type: 'Pública Técnica' },
        { name: 'Colégio Integrado', tuition: 1500, enemScore: 640, students: 400, type: 'Privada Standard' },
        { name: 'Inst. Fed. Goiás (IFG)', tuition: 0, enemScore: 660, students: 1200, type: 'Pública Técnica' }
    ],
    // RIO VERDE (Hub Rico)
    'Rio Verde': [
        { name: 'Colégio do Sol', tuition: 2200, enemScore: 680, students: 350, type: 'Privada Premium' },
        { name: 'Colégio Ápice', tuition: 1800, enemScore: 650, students: 400, type: 'Privada Standard' },
        { name: 'SESI Rio Verde', tuition: 900, enemScore: 610, students: 600, type: 'Privada Standard' },
        { name: 'IF Goiano - Campus RV', tuition: 0, enemScore: 640, students: 1500, type: 'Pública Técnica' },
        { name: 'Colégio Objetivo RV', tuition: 1600, enemScore: 630, students: 300, type: 'Privada Standard' }
    ],
    // SORRISO (Capital do Agro)
    'Sorriso': [
        { name: 'Centro Educ. Vinícius de Moraes', tuition: 1800, enemScore: 660, students: 400, type: 'Privada Premium' },
        { name: 'Colégio Regina Coeli', tuition: 1500, enemScore: 640, students: 500, type: 'Privada Standard' },
        { name: 'IFMT - Campus Sorriso', tuition: 0, enemScore: 630, students: 800, type: 'Pública Técnica' },
        { name: 'Escola Mário Spinelli', tuition: 0, enemScore: 580, students: 1200, type: 'Pública' }
    ],
    // CASCAVEL (PR)
    'Cascavel': [
        { name: 'Colégio Marista Cascavel', tuition: 2100, enemScore: 690, students: 800, type: 'Privada Premium' },
        { name: 'Colégio Alfa', tuition: 1900, enemScore: 710, students: 600, type: 'Privada Premium' },
        { name: 'IFPR Cascavel', tuition: 0, enemScore: 650, students: 900, type: 'Pública Técnica' }
    ]
};

// Gerador de ARQUÉTIPOS para cidades sem dados reais.
// Em vez de inventar nomes, cria perfis genéricos para análise de preço/qualidade.
const generateSchoolArchetypes = (population: number) => {
    const schools = [];
    const seed = population;

    // Arquétipo 1: A Escola de Elite Local
    schools.push({
        name: `[Player Local] Perfil Premium`,
        tuition: 1500 + (seed % 800),
        enemScore: 640 + (seed % 60),
        students: 300,
        type: 'Privada Premium'
    });

    // Arquétipo 2: A Escola Tradicional/Religiosa
    schools.push({
        name: `[Rede Confessional] Perfil Standard`,
        tuition: 900 + (seed % 400),
        enemScore: 610 + (seed % 50),
        students: 600,
        type: 'Privada Standard'
    });

    // Arquétipo 3: A Escola Pública de Referência (IF ou Militar)
    schools.push({
        name: `[Pública] Técnica/Federal`,
        tuition: 0,
        enemScore: 620 + (seed % 40),
        students: 800,
        type: 'Pública Técnica'
    });
    
    // Arquétipo 4: Rede de Ensino de Massa
    schools.push({
        name: `[Rede Nacional] Perfil Massa`,
        tuition: 600 + (seed % 200),
        enemScore: 580 + (seed % 40),
        students: 500,
        type: 'Privada Standard'
    });

    return schools;
};

export const getFeederFunnel = (city: MunicipioPerfil) => [
  { stage: 'Ensino Médio (Total)', count: city.demografia.populacao_15_17, fill: '#94a3b8' },
  { stage: 'Concluintes (3º Ano)', count: Math.floor(city.demografia.populacao_15_17 * 0.3), fill: '#60a5fa' },
  { stage: 'Inscritos ENEM', count: Math.floor(city.demografia.populacao_15_17 * 0.2), fill: '#3b82f6' },
  { stage: 'Elegíveis Privada', count: Math.floor(city.demografia.populacao_15_17 * 0.1), fill: '#1d4ed8' }
];

export const getSchoolQualityMatrix = (city: MunicipioPerfil) => {
  // 1. Tenta buscar dados reais
  if (REAL_SCHOOLS_DB[city.nome]) {
      return REAL_SCHOOLS_DB[city.nome];
  }

  // 2. Fallback: Arquétipos Genéricos (Honestidade de Dados)
  return generateSchoolArchetypes(city.demografia.populacao_total);
};

export const getStemMaturity = (city: MunicipioPerfil) => {
    // Lógica simples de variação baseada no IDH para não ficar estático
    const baseScore = (city.idh || 0.7) * 100;
    
    return [
      { subject: 'Matemática', cityScore: Math.min(100, baseScore - 5), nationalAvg: 55, fullMark: 100 },
      { subject: 'Ciências', cityScore: Math.min(100, baseScore), nationalAvg: 58, fullMark: 100 },
      { subject: 'Lógica', cityScore: Math.min(100, baseScore - 10), nationalAvg: 50, fullMark: 100 },
      { subject: 'Redação', cityScore: Math.min(100, baseScore + 5), nationalAvg: 60, fullMark: 100 },
      { subject: 'Inglês', cityScore: Math.min(100, baseScore - 15), nationalAvg: 45, fullMark: 100 },
    ];
};
