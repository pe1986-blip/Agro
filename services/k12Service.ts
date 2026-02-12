
import { MunicipioPerfil } from "../types";

export const getFeederFunnel = (city: MunicipioPerfil) => [
  { stage: 'Ensino Médio (Total)', count: city.demografia.populacao_15_17, fill: '#94a3b8' },
  { stage: 'Concluintes (3º Ano)', count: Math.floor(city.demografia.populacao_15_17 * 0.3), fill: '#60a5fa' },
  { stage: 'Inscritos ENEM', count: Math.floor(city.demografia.populacao_15_17 * 0.2), fill: '#3b82f6' },
  { stage: 'Elegíveis Privada', count: Math.floor(city.demografia.populacao_15_17 * 0.1), fill: '#1d4ed8' }
];

export const getSchoolQualityMatrix = (city: MunicipioPerfil) => {
  return Array.from({length: 8}, (_, i) => ({
    name: `Escola ${String.fromCharCode(65+i)}`,
    tuition: 800 + Math.random() * 1500,
    enemScore: 500 + Math.random() * 200,
    students: 100 + Math.floor(Math.random() * 400),
    type: Math.random() > 0.7 ? 'Privada Premium' : 'Privada Standard'
  }));
};

export const getStemMaturity = (city: MunicipioPerfil) => [
  { subject: 'Matemática', cityScore: 65, nationalAvg: 55, fullMark: 100 },
  { subject: 'Ciências', cityScore: 70, nationalAvg: 58, fullMark: 100 },
  { subject: 'Lógica', cityScore: 60, nationalAvg: 50, fullMark: 100 },
  { subject: 'Redação', cityScore: 75, nationalAvg: 60, fullMark: 100 },
  { subject: 'Inglês', cityScore: 55, nationalAvg: 45, fullMark: 100 },
];
