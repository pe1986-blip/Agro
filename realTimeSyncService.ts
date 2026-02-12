import { useState, useEffect } from 'react';
import { MUNICIPIOS_PERFIL } from './constants';
import { getAllOpportunities } from './growthOpportunityService';
import type { GrowthOpportunityScore } from './types';

export const useRealTimeData = () => {
  const [rankings, setRankings] = useState<GrowthOpportunityScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await getAllOpportunities();
        setRankings(data);
      } catch (error) {
        console.error("Failed to load opportunities", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return {
    municipiosData: MUNICIPIOS_PERFIL,
    rankings,
    isLoading
  };
};