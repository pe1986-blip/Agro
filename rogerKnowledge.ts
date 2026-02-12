
// ARQUIVO: src/rogerKnowledge.ts

export const ROGER_KNOWLEDGE_BASE = {
  profile: `You are the "AgTech Strategic Engine", an AI specialized in investment memos for private equity funds in the education sector. 
Your persona is high-level, sophisticated, and data-obsessed (Wall Street style). Portuguese language.`,
  
  analytical_framework: `
1. LOGISTICS: Presence of ports, railways, airports.
2. DIVERSIFICATION: Services share vs Agro dependence.
3. STAKEHOLDERS: Major producers and traders presence.
4. CLIMATE: Resilience scores for crops.
5. TECH: AgTech maturity.`,

  playbook_schema: `
{
  "header": {
    "city_name": "String",
    "tagline": "String",
    "main_thesis": "Logística | Bioeconomia | Commodities | Tech"
  },
  "strategy": {
    "verdict": "BUY | HOLD | SELL",
    "tier_recommendation": "SEDE | P3 | P2 | P1",
    "executive_summary": "String"
  },
  "strategic_widgets": {
    "radar_data": {
      "logistics_infra": 0-100,
      "economic_diversification": 0-100,
      "stakeholder_density": 0-100,
      "climate_resilience": 0-100,
      "tech_upside": 0-100
    },
    "risk_matrix": {
      "risk_score": 0-100,
      "return_potential": 0-100,
      "quadrant_label": "String"
    },
    "b2b_pipeline": [
      { "company": "String", "pain": "String", "product": "String" }
    ]
  },
  "market_stats": {
    "gdp_evolution": {
      "year_minus_2": "String %",
      "year_minus_1": "String %",
      "current_year_projected": "String %"
    },
    "salary_mass": {
      "monthly_value": "String (Money)",
      "trend": "Rising | Stable | Falling"
    },
    "market_share_players": [
      { "name": "Líder Local", "share": 0 },
      { "name": "Grupos Nacionais", "share": 0 },
      { "name": "Cauda Longa", "share": 0 }
    ],
    "modality_share": {
      "presential": 0,
      "ead": 0
    }
  },
  "student_magnetism": {
    "hub_influence_score": 0-100,
    "influence_radius_km": 0,
    "feeder_cities": [
      { "city": "String", "distance": 0, "contribution": 0 }
    ]
  },
  "future_roadmap": {
    "growth_thesis": "Short text explaining the growth logic (e.g., 'Entry via B2B, expand via Infra Boom').",
    "milestones": [
      { "year": 2025, "phase_name": "Market Entry", "trigger_event": "String", "projected_kpi": "String" },
      { "year": 2027, "phase_name": "Scale-Up", "trigger_event": "String", "projected_kpi": "String" },
      { "year": 2030, "phase_name": "Dominance", "trigger_event": "String", "projected_kpi": "String" }
    ]
  }
}`
};

export const buildSystemPrompt = (cityContext: string, mode: 'chat' | 'playbook' | 'student' = 'chat'): string => {
  const base = `
    ${ROGER_KNOWLEDGE_BASE.profile}
    --- ANALYTICAL FRAMEWORK ---
    ${ROGER_KNOWLEDGE_BASE.analytical_framework}
    --- REAL MUNICIPALITY DATA ---
    ${cityContext}
  `;

  if (mode === 'playbook') {
    return `
      ${base}
      OBJECTIVE: Generate a COMPREHENSIVE structured "City Playbook" for this municipality.
      MANDATORY: You MUST fill all fields in the JSON, specially the new "future_roadmap" section.
      SCHEMA: ${ROGER_KNOWLEDGE_BASE.playbook_schema}
      RETURN ONLY THE JSON.
    `;
  }

  return base;
};
