import { MUNICIPIOS_PERFIL } from './constants';
import type { AgroIndicadores } from './types';

// Cache simples para persistência em memória
const cache = new Map<number, AgroIndicadores>();

// Função auxiliar para números pseudo-aleatórios estáveis baseados em seed
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// --- SIMULAÇÃO DE DADOS (SEM ERROS) ---
const fetchSimulatedAgroData = async (municipio: any): Promise<AgroIndicadores> => {
    // Delay mínimo para simular latência sem travar a main thread
    await new Promise(resolve => setTimeout(resolve, 50));

    const seed = municipio.municipio_id;
    
    // Gera dados proporcionais ao perfil real do município definido em constants.ts
    return {
        municipio_id: municipio.municipio_id,
        area_soja_ha: Math.floor(municipio.area_plantada_total_ha * (0.4 + seededRandom(seed) * 0.2)),
        area_milho_ha: Math.floor(municipio.area_plantada_total_ha * (0.2 + seededRandom(seed + 1) * 0.2)),
        area_algodao_ha: Math.floor(municipio.area_plantada_total_ha * (0.1 + seededRandom(seed + 2) * 0.1)),
        rebanho_bovino_cabecas: Math.floor(municipio.populacao_total * (1.2 + seededRandom(seed + 3))),
        rebanho_suino_cabecas: Math.floor(municipio.populacao_total * (0.6 + seededRandom(seed + 4))),
        exportacoes_valor_usd: municipio.agro.exportacoes_valor_usd,
        car_propriedades_cadastradas: municipio.car_propriedades_total || 1000,
        conformidade_ambiental_pct: Math.floor(85 + seededRandom(seed + 5) * 14),
    };
};

const getFallbackData = (id: number): AgroIndicadores => ({
    municipio_id: id,
    area_soja_ha: 100000,
    area_milho_ha: 50000,
    area_algodao_ha: 10000,
    rebanho_bovino_cabecas: 150000,
    rebanho_suino_cabecas: 30000,
    exportacoes_valor_usd: 800000000,
    car_propriedades_cadastradas: 1500,
    conformidade_ambiental_pct: 92,
});

/**
 * Busca dados do agronegócio com garantia de retorno (zero erros).
 * Implementa cache para performance e fallback para IDs não encontrados.
 */
export const getAgroDataForMunicipio = async (municipioId: number): Promise<AgroIndicadores> => {
    if (cache.has(municipioId)) {
        return cache.get(municipioId)!;
    }

    const municipio = MUNICIPIOS_PERFIL.find(m => m.municipio_id === municipioId);
    
    if (!municipio) {
        return getFallbackData(municipioId);
    }

    try {
        const data = await fetchSimulatedAgroData(municipio);
        cache.set(municipioId, data);
        return data;
    } catch (error) {
        // Fallback silencioso em caso de erro inesperado
        console.warn(`Erro no agroService para ID ${municipioId}. Usando fallback.`);
        return getFallbackData(municipioId);
    }
};