
import { MunicipioPerfil, DataQualityReport } from "../types";

export const getDataQualityReport = (city: MunicipioPerfil): DataQualityReport => ({
  overallScore: 95,
  status: 'A',
  lineage: [
    { metric: 'PIB Agro', source: 'IBGE PAM 2023', version: 'v2.1', lastUpdate: '2024-01-15', confidence: 0.99 },
    { metric: 'Vagas', source: 'Novo Caged', version: 'v1.0', lastUpdate: '2024-05-01', confidence: 0.95 }
  ],
  anomalies: []
});
