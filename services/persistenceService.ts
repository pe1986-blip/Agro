import { SheetData, GlobalFinancialConfig, HeritageConfig } from '../types';
import { DEFAULT_HERITAGE, DEFAULT_GLOBAL_CONFIG } from './financialSheetFactory';

// CHAVES DE ARMAZENAMENTO (Versão v28_team_update - Injeção de dados Holding)
const STORAGE_KEY_SHEETS = 'financial_sheets_v28_team_update';
const STORAGE_KEY_HERITAGE = 'financial_heritage_v28_team_update';
const STORAGE_KEY_GLOBAL = 'financial_global_config_v28_team_update';

export const FinancialRepository = {
    
    loadSheets: async (): Promise<SheetData[]> => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_SHEETS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                     return parsed;
                }
            }
        } catch (e) { console.error(e); }
        return [];
    },

    loadGlobalConfig: async (): Promise<GlobalFinancialConfig | null> => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_GLOBAL);
            if (saved) return JSON.parse(saved);
        } catch (e) { console.error(e); }
        return DEFAULT_GLOBAL_CONFIG;
    },

    loadHeritage: async (): Promise<HeritageConfig> => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_HERITAGE);
            if (saved) return JSON.parse(saved);
        } catch (e) { console.error(e); }
        return DEFAULT_HERITAGE;
    },

    saveSheets: async (sheets: SheetData[]): Promise<boolean> => {
        try {
            localStorage.setItem(STORAGE_KEY_SHEETS, JSON.stringify(sheets));
            return true;
        } catch (e) { return false; }
    },

    saveGlobalConfig: async (config: GlobalFinancialConfig): Promise<boolean> => {
        try {
            localStorage.setItem(STORAGE_KEY_GLOBAL, JSON.stringify(config));
            return true;
        } catch (e) { return false; }
    },

    saveHeritage: async (config: HeritageConfig): Promise<boolean> => {
        try {
            localStorage.setItem(STORAGE_KEY_HERITAGE, JSON.stringify(config));
            return true;
        } catch (e) { return false; }
    },

    factoryReset: async (): Promise<void> => {
        localStorage.removeItem(STORAGE_KEY_SHEETS);
        localStorage.removeItem(STORAGE_KEY_HERITAGE);
        localStorage.removeItem(STORAGE_KEY_GLOBAL);
    }
};
