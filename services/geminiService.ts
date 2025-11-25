import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, SecurityComponent } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeComponent = async (component: SecurityComponent): Promise<AIAnalysis> => {
  if (!apiKey) {
    // Mock response if API key is missing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: `(Mock) ${component.name} acts as a pivotal control in the ${component.provider} environment, processing ${component.dataCaptured?.[0]?.type || 'telemetry'}.`,
          importance: `Critical for maintaining ${component.compliance?.join('/') || 'security'} compliance posture.`,
          businessValue: "Reduces mean-time-to-respond (MTTR) for critical incidents.",
          technicalDetails: [
            "Native API integration with SIEM.",
            "Sub-millisecond latency impact.",
            "Automated failover capabilities."
          ]
        });
      }, 1500);
    });
  }

  try {
    const prompt = `
      Act as a Principal Security Architect.
      We are analyzing the component "${component.name}" (${component.provider} - ${component.domain}) in a high-security multi-cloud banking environment.
      
      Existing Compliance Context: ${component.compliance?.join(', ') || 'General Best Practices'}.
      Known Mitigation: ${component.mitigates?.join(', ') || 'General Defense'}.

      Provide an ADVANCED deep-dive analysis JSON:
      - summary: Technical architectural function (1 sentence).
      - importance: Why this specific component is non-negotiable for zero-trust.
      - businessValue: Executive-level ROI statement (risk vs cost).
      - technicalDetails: 3 very specific, advanced configuration or integration capabilities (e.g., "Supports custom KQL parsers", " VPC Traffic Mirroring target").
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            importance: { type: Type.STRING },
            businessValue: { type: Type.STRING },
            technicalDetails: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "importance", "businessValue", "technicalDetails"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysis;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Advanced analysis unavailable.",
      importance: "System requires API connectivity.",
      businessValue: "Check configuration.",
      technicalDetails: ["Analysis service offline."]
    };
  }
};
