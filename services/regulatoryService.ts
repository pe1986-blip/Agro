
import { MunicipioPerfil, RegulatoryAct, ActType, ActSentiment, ActSource } from "../types";
import { MUNICIPIOS_PERFIL } from "../constants";

// Helper para gerar datas recentes
const getRandomDate = (daysBack: number) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date.toISOString().split('T')[0];
};

const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

// --- SMART LINK GENERATOR ---
// Cria uma busca qualificada no Google para validar o ato, já que não temos o PDF real ainda.
const generateSmartLink = (city: string, org: string, term: string, type: string) => {
    // Ex: site:goiania.go.gov.br "Decreto" "Incentivo Fiscal"
    const query = `${type} "${term}" ${city} ${org}`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

// --- DATA: DADOS REAIS DE ENTIDADES (FLAVOR TEXT) ---
const LOCAL_ENTITIES: Record<string, { org: string, district?: string, agency?: string }> = {
    'Goiânia': { org: 'Prefeitura de Goiânia', district: 'Polo Tecnológico Samambaia', agency: 'AMMA (Agência Municipal do Meio Ambiente)' },
    'Rio Verde': { org: 'Prefeitura de Rio Verde', district: 'Distrito Agroindustrial (DARV)', agency: 'Sec. Desenv. Econômico' },
    'Sorriso': { org: 'Prefeitura de Sorriso', district: 'Anel Viário da Soja', agency: 'Sec. Agricultura e Meio Ambiente' },
    'São Paulo': { org: 'Prefeitura de São Paulo', district: 'Faria Lima', agency: 'SMUL' },
    'DEFAULT': { org: 'Prefeitura Municipal', district: 'Distrito Industrial', agency: 'Secretaria de Planejamento' }
};

// --- DATA: ATOS ESPECÍFICOS POR CIDADE (HARDCODED REALISM) ---
const CITY_SPECIFIC_DB: Record<number, Partial<RegulatoryAct>[]> = {
    // Goiânia (ID: 5208707)
    5208707: [
        { 
            title: "Decreto nº 4.102 - Revitalização do Centro", 
            summary: "Institui o Programa Centraliza, concedendo isenção de IPTU para retrofits de prédios educacionais e habitacionais no Setor Central.",
            type: "Decree", impactLevel: "High", sentiment: "Positive", tags: ["Urbanismo", "Fiscal"],
            org: "Prefeitura de Goiânia"
        },
        { 
            title: "Licenciamento AMMA - Novo Campus Setor Bueno",
            summary: "Deferimento da licença prévia para empreendimento de grande porte educacional na região da T-63. Exige contrapartida viária.",
            type: "Environmental", impactLevel: "Medium", sentiment: "Neutral", tags: ["Infraestrutura", "Licenciamento"],
            org: "AMMA"
        },
        { 
            title: "PL do Polo Tecnológico Samambaia", 
            summary: "Projeto de Lei enviado à Câmara para expansão do perímetro do parque tecnológico, permitindo parcerias público-privadas com IES.",
            type: "Law", impactLevel: "High", sentiment: "Positive", tags: ["Inovação", "Expansão"],
            org: "Câmara Municipal"
        }
    ],
    // Rio Verde (ID: 5218805)
    5218805: [
        {
            title: "Edital de Concessão - Aeroporto General Leite",
            summary: "Abertura de chamamento público para modernização do terminal de cargas. Impacto direto na logística de equipamentos para cursos de engenharia.",
            type: "Licitation", impactLevel: "Medium", sentiment: "Positive", tags: ["Logística", "Infraestrutura"],
            org: "Prefeitura de Rio Verde"
        },
        {
            title: "Incentivo Fiscal - Agroindústrias 4.0",
            summary: "Lei Municipal concede terreno no DARV II para empresas que instalarem centros de treinamento técnico.",
            type: "Law", impactLevel: "High", sentiment: "Positive", tags: ["B2B", "Incentivo"],
            org: "Sec. Desenv. Econômico"
        }
    ]
};

// --- TEMPLATES GENÉRICOS (FALLBACK) ---
const TEMPLATES: Record<string, (city: string, entities: any) => Partial<RegulatoryAct>[]> = {
    'Graos': (city, ent) => [
        { 
            title: `Licença de Instalação - Silos ${ent.district}`, 
            summary: `Concessão de licença ambiental pela ${ent.agency} para expansão da capacidade de armazenagem local.`,
            type: "Environmental", impactLevel: "High", sentiment: "Positive", tags: ["Infraestrutura", "Expansão"]
        },
        { 
            title: `Desapropriação para ${ent.district}`, 
            summary: "Decreto declarando utilidade pública de área para novo polo agroindustrial. Sinal forte de atração de empresas.",
            type: "Decree", impactLevel: "High", sentiment: "Positive", tags: ["Urbanismo", "Indústria"]
        }
    ],
    'Servicos': (city, ent) => [
        { 
            title: "Lei de Inovação e ISS Tecnológico", 
            summary: "Redução de alíquota de ISS para 2% para empresas de base tecnológica e startups educacionais.",
            type: "Law", impactLevel: "High", sentiment: "Positive", tags: ["Fiscal", "Tech"]
        },
        { 
            title: "Alteração no Plano Diretor - Zona Mista", 
            summary: "Aprovação de verticalização em áreas próximas a eixos de transporte. Oportunidade para housing estudantil.",
            type: "Law", impactLevel: "Medium", sentiment: "Neutral", tags: ["Urbanismo", "Imobiliário"]
        }
    ],
    'Federal': (city, ent) => [
        {
            title: "Portaria MAPA - Habilitação Exportação China",
            summary: "Habilitação de novas plantas frigoríficas na região. Impacto direto na demanda por mão de obra local.",
            type: "Decree", impactLevel: "High", sentiment: "Positive", source: "DOU", tags: ["Exportação", "Sanitário"]
        },
        {
            title: "MEC - Portaria de Regulação EAD",
            summary: "Novos critérios de qualidade para polos EAD em cidades com menos de 50k habitantes.",
            type: "Decree", impactLevel: "High", sentiment: "Negative", source: "DOU", tags: ["Educação", "Regulação"]
        }
    ]
};

const generateMockActs = (city: MunicipioPerfil): RegulatoryAct[] => {
    const acts: RegulatoryAct[] = [];
    
    // 1. Tenta carregar dados específicos da cidade (Hardcoded Realism)
    const specificActs = CITY_SPECIFIC_DB[city.municipio_id];
    
    if (specificActs) {
        specificActs.forEach((act, index) => {
            acts.push({
                id: `ACT-${city.municipio_id}-SPECIFIC-${index}`,
                date: getRandomDate(30),
                source: act.source || 'DOM',
                org: act.org || 'Prefeitura Municipal',
                title: act.title || 'Ato Oficial',
                summary: act.summary || '',
                type: act.type as ActType,
                impactLevel: act.impactLevel as any,
                sentiment: act.sentiment as ActSentiment,
                tags: act.tags || [],
                url: generateSmartLink(city.nome, act.org || 'Prefeitura', act.title || 'Decreto', 'Oficial')
            });
        });
        return acts; // Se tem dados específicos, retorna eles prioritariamente
    }

    // 2. Se não tiver específico, gera com Templates Inteligentes
    const seed = city.municipio_id;
    const numActs = 5 + Math.floor(seededRandom(seed) * 3);
    const entities = LOCAL_ENTITIES[city.nome] || LOCAL_ENTITIES['DEFAULT'];

    // Determina o "pool" de templates baseado na vocação
    let poolFunc = TEMPLATES['Servicos']; // Default
    if (city.agro.nivel_tecnologico === 'Alto' || city.agro.pib_agro_bi > 1.0) poolFunc = TEMPLATES['Graos'];
    
    const pool = [...poolFunc(city.nome, entities), ...TEMPLATES['Federal'](city.nome, entities)];

    for (let i = 0; i < numActs; i++) {
        const template = pool[Math.floor(seededRandom(seed + i) * pool.length)];
        
        let source: ActSource = 'DOM';
        if (template.source) source = template.source as ActSource;
        else if (Math.random() > 0.8) source = 'DOE';

        acts.push({
            id: `ACT-${city.municipio_id}-GEN-${i}`,
            date: getRandomDate(45),
            source: source,
            org: template.org || (source === 'DOU' ? 'Governo Federal' : entities.org),
            title: template.title || "Ato Oficial",
            summary: template.summary || "Resumo não disponível",
            type: template.type as ActType || "Decree",
            impactLevel: template.impactLevel as any || "Low",
            sentiment: template.sentiment as ActSentiment || "Neutral",
            tags: template.tags || [],
            // O LINK É A CHAVE: Gera uma busca Google inteligente
            url: generateSmartLink(city.nome, template.org || entities.org, template.title || 'Ato', 'PDF')
        });
    }

    return acts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// --- PUBLIC API ---

export const getRegulatoryActs = async (cityId: number): Promise<RegulatoryAct[]> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const city = MUNICIPIOS_PERFIL.find(c => c.municipio_id === cityId);
    if (!city) return [];

    return generateMockActs(city);
};

export const getGlobalSignals = async (): Promise<RegulatoryAct[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Pega sinais de Goiânia e Rio Verde como proxy nacional para o MVP
    const keyCities = MUNICIPIOS_PERFIL.filter(c => c.municipio_id === 5208707 || c.municipio_id === 5218805);
    let signals: RegulatoryAct[] = [];

    keyCities.forEach(city => {
        const cityActs = generateMockActs(city);
        const highImpact = cityActs.filter(a => a.impactLevel === 'High');
        signals = [...signals, ...highImpact];
    });

    return signals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
