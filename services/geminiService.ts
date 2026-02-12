import { GoogleGenAI } from "@google/genai";
import { MunicipioPerfil } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatDeepContext = (city: MunicipioPerfil): string => {
  const econ = city.economia;
  const agro = city.agro;
  const educ = city.educacao;

  const techLevel = agro.nivel_tecnologico === 'Alto' ? "AGRO 4.0 (Alta Tecnologia)" : "AGRO TRADICIONAL";
  const amazoniaTag = city.isAmazoniaLegal ? "ZONA CRÍTICA: AMAZÔNIA LEGAL (REQUER COMPLIANCE AMBIENTAL ESTRITO/CAR)" : "";
  
  return `
=== DADOS ESTRATÉGICOS DE ${city.nome.toUpperCase()} (${city.estado}) ===
${amazoniaTag}
1. PERFIL: ${techLevel}, PIB Agro R$ ${agro.pib_agro_bi}Bi.
2. EDUCACIONAL: ${educ.total_ies_ativas} IES, Evasão ${educ.taxa_evasao_presencial}%.
3. FINANCEIRO: Renda Média R$ ${econ.renda_per_capita}.
4. VOCAÇÃO: ${city.uso_terra || 'Misto'}.
5. AMBIENTAL: ${city.isAmazoniaLegal ? 'Impacto EUDR (Exportação Europa), Crédito Carbono, Manejo Sustentável.' : 'Conformidade Padrão.'}
`;
};

export const generateMarketAnalysis = async (prompt: string, cityContext?: MunicipioPerfil): Promise<string> => {
  try {
    const contextStr = cityContext ? formatDeepContext(cityContext) : "";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `CONTEXTO DE DADOS:\n${contextStr}\n\nPERGUNTA:\n"${prompt}"`,
      config: {
        systemInstruction: `Você é RogerLens, estrategista educacional sênior. Use a Taxonomia de Fink e Neuroaprendizagem. Tom profissional e data-driven. Se a cidade for da Amazônia Legal, foque em teses de sustentabilidade e compliance ambiental.`,
        temperature: 0.4, 
      }
    });
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA.";
  }
};

export const generateScenarioAnalysis = async (prompt: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini JSON Error:", error);
    throw new Error("Falha na simulação estruturada.");
  }
};

export const generateAudioBriefing = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: `Resuma este briefing de forma executiva para áudio: ${text}`,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const audioData = response.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
    if (!audioData) throw new Error("No audio returned");
    return audioData;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw new Error("Erro no áudio briefing.");
  }
};

export const generateCurriculumStructure = async (
  city: MunicipioPerfil, 
  jobTitle: string, 
  archetype: string
): Promise<any[]> => {
  const context = formatDeepContext(city);
  const prompt = `Gere matriz curricular JSON de 6 módulos para "${archetype}" focado em "${jobTitle}" em ${city.nome}. Use Neuroaprendizagem e Fink. Retorne apenas JSON array de objetos {order, title, type, hours, neuroPhase, finkDimension}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });
    const json = JSON.parse(response.text || "[]");
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error("Erro ao gerar ementa:", error);
    return [];
  }
};