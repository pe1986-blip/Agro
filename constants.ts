import { MunicipioPerfil, MarketTier } from './types';

export const formatNumber = (num: number, style = 'decimal', currency = 'BRL') => 
    new Intl.NumberFormat('pt-BR', { 
        style: style, 
        currency: currency, 
        minimumFractionDigits: 0, 
        maximumFractionDigits: (style === 'currency' ? 2 : 1) 
    }).format(num);

export const formatPercent = (num: number) => `${formatNumber(num)}%`;

export const BRAZILIAN_STATES = [
  { uf: 'AC', name: 'Acre' }, { uf: 'AL', name: 'Alagoas' }, { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' }, { uf: 'BA', name: 'Bahia' }, { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' }, { uf: 'ES', name: 'Espírito Santo' }, { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' }, { uf: 'MT', name: 'Mato Grosso' }, { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' }, { uf: 'PA', name: 'Pará' }, { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' }, { uf: 'PE', name: 'Pernambuco' }, { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' }, { uf: 'RN', name: 'Rio Grande do Norte' }, { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' }, { uf: 'RR', name: 'Roraima' }, { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' }, { uf: 'SE', name: 'Sergipe' }, { uf: 'TO', name: 'Tocantins' }
];

// --- DADOS ESTÁTICOS DE ELITE (GOD TIER) ---
const GOIANIA: MunicipioPerfil = {
    municipio_id: 5208707,
    nome: "Goiânia",
    estado: "GO",
    regiao: "Centro-Oeste",
    latitude: -16.6869,
    longitude: -49.2648,
    rank_final: 1,
    tier: 'SEDE',
    isAmazoniaLegal: false,
    demografia: { populacao_total: 1555626, populacao_18_24: 180000, populacao_15_17: 60000, taxa_escolarizacao_em: 95, concluintes_em: 23000, egressos_em_publica: 15000, egressos_em_privada: 8000, cagr_populacao_5y: 1.2, saldo_migratorio: 'Atrator' },
    economia: { 
        pib_total_bi: 59.8, 
        renda_per_capita: 3900, 
        idhm_educacao: 0.82, 
        taxa_empregabilidade: 92, 
        pib_composicao: { agropecuaria_bi: 0.2, industria_bi: 10, servicos_bi: 45, administracao_publica_bi: 4.6 },
        distribuicao_classes: { classe_a: 12, classe_b: 28, classe_c: 45, classe_d_e: 15 },
        massa_salarial: { total_anual_milhoes: 35000, crescimento_anual: 5.2, evolucao_3_anos: [{ano:2022, valor:31000}, {ano:2023, valor:33000}, {ano:2024, valor:35000}] },
        risco_credito: { inadimplencia_pf: 32, score_credito_medio: 620 },
        financas_agro: {
            credito_rural: { total_tomado_ano: 500, razao_custeio: 60, razao_investimento: 30, razao_comercializacao: 10 },
            patrimonio: { vtn_medio_ha: 40000, patrimonio_imobilizado_total: 5.0, razao_divida_patrimonio: 0.2 },
            maturidade_corporativa: { pct_produtores_pj: 35, holdings_familiares_ativas: 150, idade_media_empresas_agro: 25 }
        },
        financas_publicas: {
            arrecadacao_itr_anual: 12.5,
            arrecadacao_simples_mei: 240.0,
            arrecadacao_total_propria: 1500.0, 
            dependencia_fpm_pct: 15,
            indice_formalizacao_rural: 95
        }
    },
    educacao: { total_ies_ativas: 45, market_share_top3: 50, media_igc_top3: 4.1, vagas_ofertadas_total: 45000, relacao_candidato_vaga: 2.5, taxa_evasao_presencial: 15, taxa_evasao_ead: 25, conceito_medio_enade: 4.0, contratos_fies_ativos: 5000, bolsas_prouni_total: 3000 },
    agro: { pib_agro_bi: 0.5, area_plantada_ha: 10000, nivel_tecnologico: 'Alto', risco_climatico_zarc: 'Baixo', produtividade_soja_ton_ha: 3.5, exportacoes_valor_usd: 50000000, distancia_porto_km: 900, capacidade_armazenagem_ton: 50000 },
    metricas_estrategicas: { cagr_geral_5y: 5.5, cagr_premium_5y: 12.0, penetracao_mercado: 35, indice_competitividade: 85, ticket_medio_estimado: 1200 },
    hub_analise: {
        score_geral: 100,
        classificacao: 'Sede Nacional',
        pilares: { negocios: 100, influencia: 100, lifestyle: 100 },
        detalhes: { servicos_avancados: 100, sedes_corporativas: 100, conexoes_politicas: 100, eventos_networking: 100, educacao_premium_k12: 100, saude_complexidade: 100, mercado_luxo: 100 }
    },
    populacao_total: 1555626, pib_total_bi: 59.8, renda_media: 3900, renda_per_capita_municipal: 3900, idh: 0.82, pib_agro_bi: 0.5, area_plantada_total_ha: 10000, exportacoes_agro_usd_milhoes: 50, car_propriedades_total: 500, uso_terra: "Serviços", pea_total: 900000, pop_20_59: 800000, ing_total_2023: 35000, qtd_ing_ead_premium: 8000, ingressantes_agro_ti_med: 5000, vagas_ofertadas_2023: 45000, concorrentes_total: 45, penetracao_ensino_superior_percent: 35, cagr_ing_total_2023: 5.5, cagr_ead_premium: 12.0, cagr_agrarias_med_ti: 8.0, taxa_evasao_media_percent: 15, conceito_enade_medio: 4.0, pib_total: 59800000000, pib_per_capita: 39000, instrucao_superior_completo: 250000, idh_classificacao: "Muito Alto"
};

const CUIABA: MunicipioPerfil = {
    municipio_id: 5103403,
    nome: "Cuiabá",
    estado: "MT",
    regiao: "Centro-Oeste",
    latitude: -15.601,
    longitude: -56.0979,
    rank_final: 2,
    tier: 'SEDE',
    isAmazoniaLegal: true,
    demografia: { populacao_total: 623614, populacao_18_24: 70000, populacao_15_17: 25000, taxa_escolarizacao_em: 90, concluintes_em: 11000, egressos_em_publica: 8000, egressos_em_privada: 3000, cagr_populacao_5y: 1.0, saldo_migratorio: 'Neutro' },
    economia: { 
        pib_total_bi: 26.8, 
        renda_per_capita: 3500, 
        idhm_educacao: 0.78, 
        taxa_empregabilidade: 90, 
        pib_composicao: { agropecuaria_bi: 0.5, industria_bi: 5, servicos_bi: 18, administracao_publica_bi: 3.3 },
        distribuicao_classes: { classe_a: 8, classe_b: 25, classe_c: 50, classe_d_e: 17 },
        massa_salarial: { total_anual_milhoes: 18000, crescimento_anual: 4.8, evolucao_3_anos: [{ano:2022, valor:15000}, {ano:2023, valor:16500}, {ano:2024, valor:18000}] },
        risco_credito: { inadimplencia_pf: 35, score_credito_medio: 580 },
        financas_agro: {
            credito_rural: { total_tomado_ano: 400, razao_custeio: 55, razao_investimento: 35, razao_comercializacao: 10 },
            patrimonio: { vtn_medio_ha: 35000, patrimonio_imobilizado_total: 3.5, razao_divida_patrimonio: 0.25 },
            maturidade_corporativa: { pct_produtores_pj: 40, holdings_familiares_ativas: 120, idade_media_empresas_agro: 20 }
        },
        financas_publicas: {
            arrecadacao_itr_anual: 8.0, 
            arrecadacao_simples_mei: 110.0, 
            arrecadacao_total_propria: 800.0, 
            dependencia_fpm_pct: 25, 
            indice_formalizacao_rural: 90
        }
    },
    educacao: { total_ies_ativas: 20, market_share_top3: 60, media_igc_top3: 3.8, vagas_ofertadas_total: 15000, relacao_candidato_vaga: 2.0, taxa_evasao_presencial: 18, taxa_evasao_ead: 30, conceito_medio_enade: 3.8, contratos_fies_ativos: 2000, bolsas_prouni_total: 1000 },
    agro: { pib_agro_bi: 1.2, area_plantada_ha: 20000, nivel_tecnologico: 'Alto', risco_climatico_zarc: 'Baixo', produtividade_soja_ton_ha: 3.8, exportacoes_valor_usd: 100000000, distancia_porto_km: 1500, capacidade_armazenagem_ton: 100000 },
    metricas_estrategicas: { cagr_geral_5y: 4.0, cagr_premium_5y: 15.0, penetracao_mercado: 28, indice_competitividade: 75, ticket_medio_estimado: 950 },
    hub_analise: {
        score_geral: 95,
        classificacao: 'Sede Regional A',
        pilares: { negocios: 98, influencia: 95, lifestyle: 85 },
        detalhes: { servicos_avancados: 90, sedes_corporativas: 98, conexoes_politicas: 100, eventos_networking: 85, educacao_premium_k12: 85, saude_complexidade: 80, mercado_luxo: 85 }
    },
    populacao_total: 623614, pib_total_bi: 26.8, renda_media: 3500, renda_per_capita_municipal: 3500, idh: 0.78, pib_agro_bi: 1.2, area_plantada_total_ha: 20000, exportacoes_agro_usd_milhoes: 100, car_propriedades_total: 800, uso_terra: "Misto", pea_total: 350000, pop_20_59: 300000, ing_total_2023: 12000, qtd_ing_ead_premium: 3000, ingressantes_agro_ti_med: 2000, vagas_ofertadas_2023: 15000, concorrentes_total: 20, penetracao_ensino_superior_percent: 28, cagr_ing_total_2023: 4.0, cagr_ead_premium: 15.0, cagr_agrarias_med_ti: 6.0, taxa_evasao_media_percent: 18, conceito_enade_medio: 3.8, pib_total: 26800000000, pib_per_capita: 42000, instrucao_superior_completo: 100000, idh_classificacao: "Alto"
};

// --- GERADOR DE DADOS SINTÉTICOS PARA CAUDA LONGA ---
const gerarCidade = (id: number, nome: string, uf: string, regiao: string, lat: number, lng: number, tier: string, vocacao: string, isAmazonia: boolean = false): MunicipioPerfil => {
    const popBase = tier === 'P3' ? 140000 : (tier === 'P2' ? 75000 : 35000);
    const pibAgroBase = tier === 'P3' ? 1.9 : (tier === 'P2' ? 1.3 : 0.8);
    
    return {
        municipio_id: id, nome, estado: uf, regiao, latitude: lat, longitude: lng, rank_final: 99,
        tier: tier as any,
        isAmazoniaLegal: isAmazonia,
        demografia: { 
            populacao_total: popBase, 
            populacao_18_24: Math.floor(popBase * 0.12), 
            populacao_15_17: Math.floor(popBase * 0.05), 
            taxa_escolarizacao_em: 90, 
            concluintes_em: Math.floor(popBase * 0.018), 
            egressos_em_publica: 1000, 
            egressos_em_privada: 200,
            cagr_populacao_5y: tier === 'P3' ? 1.5 : 0.5,
            saldo_migratorio: tier === 'P3' ? 'Atrator' : 'Neutro'
        },
        economia: { 
            pib_total_bi: pibAgroBase * 3, 
            renda_per_capita: 2800, 
            idhm_educacao: 0.7, 
            taxa_empregabilidade: 95, 
            pib_composicao: { agropecuaria_bi: pibAgroBase, industria_bi: pibAgroBase * 0.5, servicos_bi: pibAgroBase, administracao_publica_bi: pibAgroBase * 0.2 },
            distribuicao_classes: { classe_a: 5, classe_b: 20, classe_c: 50, classe_d_e: 25 },
            massa_salarial: { total_anual_milhoes: 5000, crescimento_anual: 4.0, evolucao_3_anos: [{ano:2022, valor:4500}, {ano:2023, valor:4800}, {ano:2024, valor:5000}] },
            risco_credito: { inadimplencia_pf: 25, score_credito_medio: 600 },
            financas_agro: {
                credito_rural: { total_tomado_ano: 150, razao_custeio: 70, razao_investimento: 20, razao_comercializacao: 10 },
                patrimonio: { vtn_medio_ha: 15000, patrimonio_imobilizado_total: 1.5, razao_divida_patrimonio: 0.3 },
                maturidade_corporativa: { pct_produtores_pj: 15, holdings_familiares_ativas: 20, idade_media_empresas_agro: 15 }
            },
            financas_publicas: {
                arrecadacao_itr_anual: pibAgroBase * 2.5,
                arrecadacao_simples_mei: popBase * 0.0005,
                arrecadacao_total_propria: popBase * 0.0025,
                dependencia_fpm_pct: tier === 'P1' ? 85 : 40,
                indice_formalizacao_rural: 70
            }
        },
        educacao: { 
            total_ies_ativas: tier === 'P3' ? 8 : 4, 
            market_share_top3: 60, 
            media_igc_top3: tier === 'SEDE' ? 4.0 : 3.0, 
            vagas_ofertadas_total: Math.floor(popBase * 0.03), 
            relacao_candidato_vaga: 1.5, 
            taxa_evasao_presencial: 20, 
            taxa_evasao_ead: 35, 
            conceito_medio_enade: 3.0, 
            contratos_fies_ativos: 500, 
            bolsas_prouni_total: 200 
        },
        agro: { pib_agro_bi: pibAgroBase, area_plantada_ha: pibAgroBase * 50000, nivel_tecnologico: tier === 'P3' ? 'Alto' : 'Médio', risco_climatico_zarc: 'Médio', produtividade_soja_ton_ha: 3.5, exportacoes_valor_usd: pibAgroBase * 100000000, distancia_porto_km: 1000, capacidade_armazenagem_ton: 50000 },
        metricas_estrategicas: { 
            cagr_geral_5y: 5.0, 
            cagr_premium_5y: 10.0, 
            penetracao_mercado: 20, 
            indice_competitividade: 50, 
            ticket_medio_estimado: tier === 'P3' ? 850 : 550 
        },
        populacao_total: popBase, pib_total_bi: pibAgroBase * 3, renda_media: 2800, renda_per_capita_municipal: 2800, idh: 0.7, pib_agro_bi: pibAgroBase, area_plantada_total_ha: pibAgroBase * 50000, exportacoes_agro_usd_milhoes: pibAgroBase * 100, car_propriedades_total: 200, uso_terra: vocacao, pea_total: popBase * 0.6, pop_20_59: popBase * 0.5, ing_total_2023: popBase * 0.02, qtd_ing_ead_premium: popBase * 0.005, ingressantes_agro_ti_med: popBase * 0.004, vagas_ofertadas_2023: popBase * 0.03, concorrentes_total: tier === 'P3' ? 8 : 4, penetracao_ensino_superior_percent: 20, cagr_ing_total_2023: 5, cagr_ead_premium: 10, cagr_agrarias_med_ti: 8, taxa_evasao_media_percent: 20, conceito_enade_medio: 3.0, pib_total: pibAgroBase * 3000000000, pib_per_capita: 30000, instrucao_superior_completo: popBase * 0.1, idh_classificacao: "Médio"
    } as MunicipioPerfil;
};

// --- LISTA MESTRA (CINTURÃO DO AGRO BRASILEIRO) ---
export const MUNICIPIOS_PERFIL: MunicipioPerfil[] = [
    GOIANIA,
    CUIABA,
    
    // --- MATO GROSSO (Amazônia Legal Ativa) ---
    gerarCidade(5107909, "Sinop", "MT", "Centro-Oeste", -11.8626, -55.5146, "SEDE", "Graos", true),
    gerarCidade(5107925, "Sorriso", "MT", "Centro-Oeste", -12.5425, -55.7211, "SEDE", "Graos", true),
    gerarCidade(5105259, "Lucas do Rio Verde", "MT", "Centro-Oeste", -13.0649, -55.9189, "P3", "Graos", true),
    gerarCidade(5106208, "Nova Mutum", "MT", "Centro-Oeste", -13.8296, -56.0792, "P3", "Graos", true),
    gerarCidade(5107602, "Rondonópolis", "MT", "Centro-Oeste", -16.4677, -54.6368, "SEDE", "Graos"),
    gerarCidade(5107040, "Primavera do Leste", "MT", "Centro-Oeste", -15.5492, -54.2981, "P3", "Graos"),
    gerarCidade(5102504, "Campo Novo do Parecis", "MT", "Centro-Oeste", -13.6738, -57.8860, "P2", "Graos", true),
    gerarCidade(5107875, "Sapezal", "MT", "Centro-Oeste", -13.5484, -58.8142, "P2", "Graos", true),
    gerarCidade(5107065, "Querência", "MT", "Centro-Oeste", -12.6074, -52.1867, "P2", "Graos", true),
    gerarCidade(5101803, "Canarana", "MT", "Centro-Oeste", -13.5539, -52.2706, "P1", "Graos"),
    
    // --- GOIÁS ---
    gerarCidade(5218805, "Rio Verde", "GO", "Centro-Oeste", -17.7915, -50.9191, "SEDE", "Graos"),
    gerarCidade(5211909, "Jataí", "GO", "Centro-Oeste", -17.8814, -51.7144, "P3", "Graos"),
    gerarCidade(5213103, "Mineiros", "GO", "Centro-Oeste", -17.5611, -52.5511, "P2", "Graos"),
    gerarCidade(5206200, "Cristalina", "GO", "Centro-Oeste", -16.7686, -47.6136, "P2", "Graos"),
    gerarCidade(5205103, "Catalão", "GO", "Centro-Oeste", -18.1658, -47.9463, "P3", "Graos"),
    gerarCidade(5209101, "Goiatuba", "GO", "Centro-Oeste", -18.0125, -49.3553, "P2", "Cana"),
    
    // --- MATO GROSSO DO SUL ---
    gerarCidade(5003702, "Dourados", "MS", "Centro-Oeste", -22.2215, -54.8064, "SEDE", "Graos"),
    gerarCidade(5005400, "Maracaju", "MS", "Centro-Oeste", -21.6144, -55.1682, "P2", "Graos"),
    gerarCidade(5006606, "Ponta Porã", "MS", "Centro-Oeste", -22.5358, -55.7258, "P2", "Graos"),
    gerarCidade(5008305, "Três Lagoas", "MS", "Centro-Oeste", -20.7876, -51.7029, "P3", "Graos"),
    gerarCidade(5007695, "São Gabriel do Oeste", "MS", "Centro-Oeste", -19.3908, -54.5714, "P2", "Proteina"),

    // --- MATOPIBA ---
    gerarCidade(2919553, "Luís Eduardo Magalhães", "BA", "Nordeste", -12.0954, -45.7974, "SEDE", "Graos"),
    gerarCidade(2101400, "Balsas", "MA", "Nordeste", -7.5317, -46.0371, "P3", "Graos", true),
    gerarCidade(2211001, "Uruçuí", "PI", "Nordeste", -7.2291, -44.5562, "P1", "Graos"),
    gerarCidade(1721000, "Palmas", "TO", "Norte", -10.1835, -48.3336, "P3", "Servicos", true),
    gerarCidade(1709500, "Gurupi", "TO", "Norte", -11.7291, -49.0700, "P2", "Graos", true),

    // --- OUTROS ---
    gerarCidade(4104808, "Cascavel", "PR", "Sul", -24.9573, -53.4590, "SEDE", "Proteina"),
    gerarCidade(3543402, "Ribeirão Preto", "SP", "Sudeste", -21.1704, -47.8103, "SEDE", "Cana"),
    gerarCidade(2611101, "Petrolina", "PE", "Nordeste", -9.3831, -40.5069, "P2", "Frutas"),
];