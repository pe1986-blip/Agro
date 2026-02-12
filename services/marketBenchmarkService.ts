
import { MarketTier } from '../types';

export interface Benchmark {
    min: number;
    max: number;
    avg: number;
    label: string;
}

export interface SheetBenchmarks {
    ticket: Benchmark;
    studentsPerUnit: Benchmark;
    capexPerUnit: Benchmark;
}

export interface ValidationResult {
    status: 'ok' | 'warning' | 'critical';
    msg?: string;
}

// Valores de mercado calibrados por Tier
const BENCHMARK_DB: Record<MarketTier, SheetBenchmarks> = {
    'SEDE': {
        ticket: { min: 900, max: 2000, avg: 1300, label: 'Mensalidade Sede' },
        studentsPerUnit: { min: 800, max: 3500, avg: 1800, label: 'Alunos Sede' },
        capexPerUnit: { min: 10000000, max: 30000000, avg: 15000000, label: 'Capex Sede' }
    },
    'P3': {
        ticket: { min: 600, max: 1200, avg: 900, label: 'Mensalidade UA P3' },
        studentsPerUnit: { min: 400, max: 1500, avg: 800, label: 'Alunos UA P3' },
        capexPerUnit: { min: 3000000, max: 8000000, avg: 5000000, label: 'Capex UA P3' }
    },
    'P2': {
        ticket: { min: 450, max: 900, avg: 650, label: 'Mensalidade UA P2' },
        studentsPerUnit: { min: 200, max: 800, avg: 450, label: 'Alunos UA P2' },
        capexPerUnit: { min: 1000000, max: 3500000, avg: 2000000, label: 'Capex UA P2' }
    },
    'P1': {
        ticket: { min: 350, max: 700, avg: 500, label: 'Mensalidade UA P1' },
        studentsPerUnit: { min: 80, max: 400, avg: 200, label: 'Alunos UA P1' },
        capexPerUnit: { min: 200000, max: 1000000, avg: 500000, label: 'Capex UA P1' }
    },
    'UNA': { // Mesma lógica de Sede
        ticket: { min: 900, max: 2000, avg: 1300, label: 'Mensalidade Hub' },
        studentsPerUnit: { min: 800, max: 3500, avg: 1800, label: 'Alunos Hub' },
        capexPerUnit: { min: 10000000, max: 30000000, avg: 15000000, label: 'Capex Hub' }
    }
};

// Benchmarks específicos para Produtos (independentes de Tier)
const PRODUCT_BENCHMARKS: Record<string, Benchmark> = {
    'pos': { min: 600, max: 1800, avg: 1200, label: 'Ticket Pós' }, // Atualizado para Pós-Graduação (Mensalidade implícita)
    'executive': { min: 1500, max: 5000, avg: 2800, label: 'Ticket Exec' },
    'tecnico': { min: 300, max: 700, avg: 450, label: 'Ticket Técnico' },
    'custom': { min: 20000, max: 200000, avg: 50000, label: 'Contrato B2B' }
};

export const getBenchmarksForSheet = (sheetId: string, tier: MarketTier = 'P2'): SheetBenchmarks => {
    // 1. Tenta identificar se é uma unidade física pelo ID ou Tier padrão
    let base = BENCHMARK_DB[tier];

    // Override baseado no ID da planilha
    if (sheetId.includes('sede')) base = BENCHMARK_DB['SEDE'];
    else if (sheetId.includes('p3')) base = BENCHMARK_DB['P3'];
    else if (sheetId.includes('p2')) base = BENCHMARK_DB['P2'];
    else if (sheetId.includes('p1')) base = BENCHMARK_DB['P1'];

    // 2. Ajustes de Produto (se não for unidade)
    const productTicket = 
        sheetId.includes('pos') ? PRODUCT_BENCHMARKS['pos'] :
        sheetId.includes('executive') ? PRODUCT_BENCHMARKS['executive'] :
        sheetId.includes('agro_pro') || sheetId.includes('tecnico') ? PRODUCT_BENCHMARKS['tecnico'] :
        sheetId.includes('custom') ? PRODUCT_BENCHMARKS['custom'] : null;

    if (productTicket) {
        return {
            ...base,
            ticket: productTicket
        };
    }

    return base;
};

export const validateInput = (value: number, benchmark: Benchmark): ValidationResult => {
    if (value === 0) return { status: 'ok' }; // Ignora zeros
    
    if (value > benchmark.max * 1.5) return { status: 'critical', msg: `Valor muito acima do mercado (${benchmark.label} máx: ${benchmark.max})` };
    if (value < benchmark.min * 0.5) return { status: 'critical', msg: `Valor muito abaixo do mercado (${benchmark.label} mín: ${benchmark.min})` };
    
    if (value > benchmark.max) return { status: 'warning', msg: `Acima da média de mercado (${benchmark.avg})` };
    if (value < benchmark.min) return { status: 'warning', msg: `Abaixo da média de mercado (${benchmark.avg})` };

    return { status: 'ok' };
};
