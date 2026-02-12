
import { MunicipioPerfil } from "../types";

export interface JobPosition {
  id: string;
  title: string;
  sector: string;
  salary: string;
  demandLevel: 'Crítica' | 'Alta' | 'Média';
  missingSkills: string[];
  recommendedCourse: string;
}

// --- BANCO DE DADOS DE EMPREGADORES REAIS (MOCK INTELIGENTE) ---
const REAL_EMPLOYERS_DB: Record<string, Array<{name: string, sector: string}>> = {
    // --- SUL DE MINAS (CAFÉ & INDÚSTRIA) ---
    'Pouso Alegre': [
        { name: 'Cimed', sector: 'Farmacêutica' },
        { name: 'General Mills (Yoki)', sector: 'Alimentos' },
        { name: 'Unilever', sector: 'Bens de Consumo' },
        { name: 'Coop. do Sul de Minas', sector: 'Café' },
        { name: 'Grupo Prysmian', sector: 'Indústria' },
        { name: 'DHL Supply Chain', sector: 'Logística' }
    ],
    // --- CENTRO-OESTE MINEIRO ---
    'Bom Despacho': [
        { name: 'Cooperbom', sector: 'Agronegócio (Leite/Grãos)' },
        { name: 'Sicoob Credibom', sector: 'Serviços Financeiros' },
        { name: 'Fidelis Alimentos', sector: 'Avicultura/Indústria' },
        { name: 'Laticínios Embaré', sector: 'Indústria de Laticínios' },
        { name: 'Vap Supermercados', sector: 'Varejo' },
        { name: 'Sindicato Rural de BD', sector: 'Associativismo' }
    ],
    // --- TRIÂNGULO MINEIRO ---
    'Uberlândia': [
        { name: 'Grupo Algar', sector: 'Tecnologia & Serviços' },
        { name: 'Martins Atacadista', sector: 'Logística' },
        { name: 'Cargill Agrícola', sector: 'Indústria' },
        { name: 'BRF S.A.', sector: 'Alimentos' },
        { name: 'Sankhya Gestão', sector: 'Tecnologia' }
    ],
    // --- SUDOESTE GOIANO ---
    'Rio Verde': [
        { name: 'COMIGO', sector: 'Cooperativa' },
        { name: 'BRF Rio Verde', sector: 'Agroindústria' },
        { name: 'Klabin', sector: 'Papel e Celulose' },
        { name: 'Cargill', sector: 'Processamento de Grãos' }
    ],
    // --- MATO GROSSO (GRÃOS) ---
    'Sorriso': [
        { name: 'Amaggi', sector: 'Produção de Grãos' },
        { name: 'Grupo Bom Futuro', sector: 'Agropecuária' },
        { name: 'FS Bioenergia', sector: 'Etanol de Milho' },
        { name: 'Nutribras Alimentos', sector: 'Proteína Animal' }
    ],
    // --- FALLBACKS ESTADUAIS ---
    'MG': [
        { name: 'Cemig', sector: 'Energia' },
        { name: 'Localiza', sector: 'Serviços' },
        { name: 'Usiminas', sector: 'Siderurgia' },
        { name: 'MRV Engenharia', sector: 'Construção' }
    ],
    'MT': [
        { name: 'SLC Agrícola', sector: 'Produção' },
        { name: 'AgroAmazônia', sector: 'Insumos' },
        { name: 'Fiagril', sector: 'Trading' }
    ],
    'GO': [
        { name: 'JBS', sector: 'Frigorífico' },
        { name: 'Caramuru Alimentos', sector: 'Indústria' },
        { name: 'São Martinho', sector: 'Sucroenergético' }
    ],
    'DEFAULT': [
        { name: 'Banco do Brasil', sector: 'Financeiro' },
        { name: 'John Deere (Concessionária)', sector: 'Maquinário' },
        { name: 'Bayer Cropscience', sector: 'Insumos' },
        { name: 'Raízen', sector: 'Energia' }
    ]
};

export const getDetailedSocialGap = (city: MunicipioPerfil) => ({
  neetCount: Math.round(city.demografia.populacao_18_24 * 0.22),
  openJobs: Math.round(city.demografia.populacao_18_24 * 0.08),
  youthPopulation: city.demografia.populacao_18_24,
  gapIndex: 65
});

export const getOpenPositionsBreakdown = (city: MunicipioPerfil): JobPosition[] => {
    const vocacao = city.uso_terra || 'Servicos'; // Fallback

    // LÓGICA TERRITORIAL: Vagas baseadas na cultura produtiva
    switch (vocacao) {
        case 'Cafe':
            return [
                { id: '1', title: 'Classificador de Café (Q-Grader)', sector: 'Agroindústria', salary: 'R$ 4.200', demandLevel: 'Alta', missingSkills: ['Análise Sensorial', 'Torra'], recommendedCourse: 'Curso Superior de Cafeicultura' },
                { id: '2', title: 'Gestor de Certificações', sector: 'Consultoria', salary: 'R$ 5.800', demandLevel: 'Crítica', missingSkills: ['Rainforest Alliance', 'Inglês Técnico'], recommendedCourse: 'MBA em Gestão do Agronegócio' },
                { id: '3', title: 'Técnico em Mecanização de Montanha', sector: 'Serviços', salary: 'R$ 3.500', demandLevel: 'Média', missingSkills: ['Manutenção de Derriçadeiras'], recommendedCourse: 'Mecanização Agrícola' },
            ];

        case 'Graos': // Soja/Milho (Ex: Sorriso, Rio Verde)
            return [
                { id: '1', title: 'Operador de Máquinas High-Tech', sector: 'Produção', salary: 'R$ 6.500', demandLevel: 'Crítica', missingSkills: ['Agricultura de Precisão', 'Piloto Automático'], recommendedCourse: 'Tecnólogo em Agricultura de Precisão' },
                { id: '2', title: 'Analista de Commodities', sector: 'Trading', salary: 'R$ 7.200', demandLevel: 'Alta', missingSkills: ['Hedge', 'Chicago Board of Trade'], recommendedCourse: 'MBA em Mercados Agrícolas' },
                { id: '3', title: 'Gerente de Armazém', sector: 'Logística', salary: 'R$ 5.000', demandLevel: 'Média', missingSkills: ['Classificação de Grãos', 'Gestão de Estoque'], recommendedCourse: 'Gestão da Cadeia de Suprimentos' },
            ];

        case 'Cana': // Sucroenergético (Ex: Ribeirão Preto)
            return [
                { id: '1', title: 'Técnico em Bioenergia', sector: 'Indústria', salary: 'R$ 4.800', demandLevel: 'Alta', missingSkills: ['Processos Fermentativos', 'Automação Industrial'], recommendedCourse: 'Tecnólogo em Biocombustíveis' },
                { id: '2', title: 'Gestor de Frota Agrícola', sector: 'Logística', salary: 'R$ 6.000', demandLevel: 'Média', missingSkills: ['Logística de Colheita', 'Manutenção Preditiva'], recommendedCourse: 'Engenharia de Produção' },
                { id: '3', title: 'Analista de Laboratório Industrial', sector: 'Qualidade', salary: 'R$ 3.800', demandLevel: 'Média', missingSkills: ['Química Analítica', 'Normas ISO'], recommendedCourse: 'Química Industrial' },
            ];

        case 'Proteina': // Aves/Suínos (Ex: Chapecó, Toledo)
            return [
                { id: '1', title: 'Sanitarista Avícola', sector: 'Produção Animal', salary: 'R$ 5.500', demandLevel: 'Crítica', missingSkills: ['Biosseguridade', 'Bem-estar Animal'], recommendedCourse: 'Medicina Veterinária / Zootecnia' },
                { id: '2', title: 'Supervisor de Fábrica de Ração', sector: 'Indústria', salary: 'R$ 4.500', demandLevel: 'Alta', missingSkills: ['Nutrição Animal', 'BPF'], recommendedCourse: 'Engenharia de Alimentos' },
                { id: '3', title: 'Técnico em Ambiência', sector: 'Tecnologia', salary: 'R$ 3.200', demandLevel: 'Média', missingSkills: ['Automação de Galpões', 'Elétrica'], recommendedCourse: 'Eletrotécnica' },
            ];
        
        case 'Frutas': // Fruticultura Irrigada (Ex: Petrolina)
            return [
                { id: '1', title: 'Engenheiro de Irrigação', sector: 'Agro', salary: 'R$ 7.000', demandLevel: 'Crítica', missingSkills: ['Hidráulica', 'Gestão Hídrica'], recommendedCourse: 'Engenharia Agronômica' },
                { id: '2', title: 'Técnico em Fitossanidade', sector: 'Campo', salary: 'R$ 3.500', demandLevel: 'Alta', missingSkills: ['Manejo Integrado de Pragas', 'Certificação GlobalGAP'], recommendedCourse: 'Tecnólogo em Fruticultura' },
                { id: '3', title: 'Analista de Exportação', sector: 'Comércio Exterior', salary: 'R$ 5.000', demandLevel: 'Média', missingSkills: ['Logística do Frio', 'Inglês'], recommendedCourse: 'Comércio Exterior' },
            ];

        case 'Servicos': // Hubs Urbanos (Ex: Uberlândia, Goiânia)
        default:
            return [
                { id: '1', title: 'SDR Agronegócio (Vendas)', sector: 'Comercial', salary: 'R$ 3.500 + Com.', demandLevel: 'Alta', missingSkills: ['CRM', 'Técnicas de Negociação B2B'], recommendedCourse: 'Gestão Comercial' },
                { id: '2', title: 'Analista de Dados Jr', sector: 'Tecnologia', salary: 'R$ 4.000', demandLevel: 'Alta', missingSkills: ['Power BI', 'Python'], recommendedCourse: 'Análise e Desenvolvimento de Sistemas' },
                { id: '3', title: 'Assistente de Logística', sector: 'Logística', salary: 'R$ 2.500', demandLevel: 'Média', missingSkills: ['Excel Avançado', 'Sistemas ERP'], recommendedCourse: 'Logística' },
            ];
    }
};

export const getCorporateImpact = (city: MunicipioPerfil) => {
    // 1. Tenta buscar pela cidade exata
    let employers = REAL_EMPLOYERS_DB[city.nome];
    
    // 2. Se não achar, busca pelo estado
    if (!employers) {
        employers = REAL_EMPLOYERS_DB[city.estado];
    }

    // 3. Fallback nacional
    if (!employers) {
        employers = REAL_EMPLOYERS_DB['DEFAULT'];
    }

    // Seleciona 4 aleatórios da lista (determinístico pelo ID da cidade para estabilidade)
    const seed = city.municipio_id;
    // Simple PRNG-like shuffle to keeping React pure
    const shuffled = [...employers].sort((a, b) => {
        const charA = a.name.charCodeAt(0);
        const charB = b.name.charCodeAt(0);
        return (seed % charA) - (seed % charB);
    });
    
    return shuffled.slice(0, 4).map((emp, index) => ({
        id: index,
        name: emp.name,
        sector: emp.sector,
        openRoles: Math.floor(10 + ((seed + index) % 40)) // Gera número de vagas plausível (10 a 50)
    }));
};

export const getSectorDistribution = (city: MunicipioPerfil) => {
    const comp = city.economia.pib_composicao;
    const total = comp.agropecuaria_bi + comp.industria_bi + comp.servicos_bi + comp.administracao_publica_bi;
    
    return [
        { name: 'Agronegócio', value: Math.round((comp.agropecuaria_bi / total) * 100), color: '#16a34a' },
        { name: 'Serviços', value: Math.round((comp.servicos_bi / total) * 100), color: '#3b82f6' },
        { name: 'Indústria', value: Math.round((comp.industria_bi / total) * 100), color: '#f97316' },
        { name: 'Público', value: Math.round((comp.administracao_publica_bi / total) * 100), color: '#94a3b8' },
    ].filter(s => s.value > 0);
};
