
export interface ElasticityModel {
  coefficient: number;
  sensitivityLabel: string;
}

export interface ForecastDataPoint {
  date: string;
  value: number;
  isForecast: boolean;
}

export const getPriceElasticity = (cityId: number): ElasticityModel => ({
  coefficient: -1.5,
  sensitivityLabel: 'Alta Sensibilidade'
});

export const getDemandForecast = async (cityId: number, sector: string): Promise<ForecastDataPoint[]> => {
  const base = 100;
  return Array.from({length: 24}, (_, i) => ({
    date: `2024-${(i % 12) + 1}-01`,
    value: Math.round(base * (1 + i * 0.02) + Math.random() * 10),
    isForecast: i >= 12
  }));
};
