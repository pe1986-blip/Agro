

/**
 * Este serviço atua como uma interface de fachada (Facade) para o Data Lake.
 * No MVP, ele simula a consulta a uma API REST que retornaria dados processados
 * do BigQuery (Tabelas Gold).
 * 
 * Future State: 
 * - Substituir mocks por `fetch('/api/v1/indicators?city_id=...')`
 * - Integrar com autenticação segura
 */

import { MunicipioPerfil } from '../types';

export interface AgroInfraIndicators {
    irrigacao: {
        total_ha: number;
        pivos_ativos: number;
        potencial_expansao_ha: number;
    };
    fundiario: {
        pequeno_produtor_pct: number;
        medio_produtor_pct: number;
        grande_produtor_pct: number;
        area_media_ha: number;
    };
    armazenagem: {
        capacidade_estatica_ton: number;
        producao_anual_ton: number;
        deficit_ton: number;
        deficit_pct: number;
    };
}

// Simula a latência de uma chamada de API real
const SIMULATED_LATENCY = 600; 

export const DataLakeService = {
    
    /**
     * Busca indicadores profundos de infraestrutura produtiva.
     * Fonte: Cruzamento de CAR (Cadastro Ambiental Rural) + CONAB (Armazenagem) + ANA (Outorgas de Água)
     */
    async getProductionInfrastructure(city: MunicipioPerfil): Promise<AgroInfraIndicators> {
        await new Promise(r => setTimeout(r, SIMULATED_LATENCY));

        // Fallback seguro se os dados não existirem no objeto city (MVP)
        // Em produção, isso viria direto do banco de dados
        const infra = city.agro.infraestrutura || {
            area_irrigada_ha: 0,
            pivos_centrais_qtd: 0,
            deficit_armazenagem_pct: 0
        };

        const land = city.agro.estrutura_fundiaria || {
            agricultura_familiar_pct: 30,
            medio_produtor_pct: 30,
            patronal_pct: 40
        };

        // Simula produção anual baseada no PIB Agro (aprox.) para cálculo de déficit
        const productionProxy = city.agro.pib_agro_bi * 1_500_000; // Toneladas estimadas

        return {
            irrigacao: {
                total_ha: infra.area_irrigada_ha,
                pivos_ativos: infra.pivos_centrais_qtd,
                potencial_expansao_ha: Math.round(infra.area_irrigada_ha * 1.5) // Mock de potencial
            },
            fundiario: {
                pequeno_produtor_pct: land.agricultura_familiar_pct,
                medio_produtor_pct: land.medio_produtor_pct,
                grande_produtor_pct: land.patronal_pct,
                area_media_ha: land.patronal_pct > 50 ? 2500 : 150 // Lógica simples de área média
            },
            armazenagem: {
                capacidade_estatica_ton: city.agro.capacidade_armazenagem_ton,
                producao_anual_ton: productionProxy,
                deficit_ton: Math.max(0, productionProxy - city.agro.capacidade_armazenagem_ton),
                deficit_pct: infra.deficit_armazenagem_pct
            }
        };
    }
};
