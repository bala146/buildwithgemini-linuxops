import { GoogleGenAI } from "@google/genai";
import type { LinuxServer, LinuxAnalysis } from "../types";
import { LINUXOPS_SYSTEM_INSTRUCTION, GEMINI_MODEL_NAME } from "../prompts/linuxOpsSystemInstruction";
import { getFallbackForServer } from "../data/fallbackAnalysis";

export interface GeminiServiceResult {
  analysis: LinuxAnalysis;
  usedFallback: boolean;
  errorMessage?: string;
}

export const getApiKey = (): string | undefined => {
  // Check Vite environment variable VITE_GEMINI_API_KEY or GEMINI_API_KEY
  const env = import.meta.env;
  return (
    env.VITE_GEMINI_API_KEY ||
    env.GEMINI_API_KEY ||
    (typeof process !== "undefined" && process.env ? process.env.GEMINI_API_KEY : undefined)
  );
};

export const analyzeServerTelemetry = async (
  server: LinuxServer,
  customQuery?: string
): Promise<GeminiServiceResult> => {
  const apiKey = getApiKey();

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_api_key_here") {
    console.warn("Gemini API key is missing. Using fallback demo analysis.");
    return {
      analysis: getFallbackForServer(server.hostname),
      usedFallback: true,
      errorMessage: "GEMINI_API_KEY not configured. Displaying demo fallback data.",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const telemetryPayload = {
      hostname: server.hostname,
      environment: server.environment,
      ip: server.ip,
      os: server.os,
      cpu: server.cpu,
      memory: server.memory,
      disk: server.disk,
      loadAverage: server.loadAverage,
      uptimeDays: server.uptimeDays,
      services: server.services.reduce((acc, s) => {
        acc[s.name] = s.status;
        return acc;
      }, {} as Record<string, string>),
      events: server.events.map((e) => `${e.time} - ${e.message}`),
      userQuestion: customQuery || undefined,
    };

    const promptText = `
Analyze the following server telemetry payload for ${server.hostname}:

${JSON.stringify(telemetryPayload, null, 2)}

Provide a technical assessment strictly following the LinuxOps AI system instruction.
Return a valid JSON object matching this schema:
{
  "severity": "CRITICAL" | "WARNING" | "HEALTHY",
  "overallAssessment": "string",
  "observedEvidence": ["string"],
  "possibleCauses": ["string"],
  "investigationSteps": ["string"],
  "commands": [
    {
      "command": "string",
      "purpose": "string",
      "risk": "Read Only" | "Privileged" | "Potentially Disruptive"
    }
  ],
  "remediationRisks": ["string"],
  "suggestedNextAction": "string",
  "disclaimer": "AI-generated analysis based on supplied telemetry. Commands are suggestions only and were not executed."
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: promptText,
      config: {
        systemInstruction: LINUXOPS_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response returned from Gemini API");
    }

    const parsedData = JSON.parse(responseText);

    // Validate fields
    if (
      !parsedData.severity ||
      !parsedData.overallAssessment ||
      !Array.isArray(parsedData.observedEvidence) ||
      !Array.isArray(parsedData.commands)
    ) {
      throw new Error("Gemini response missing required JSON fields");
    }

    const analysis: LinuxAnalysis = {
      severity: parsedData.severity,
      overallAssessment: parsedData.overallAssessment,
      observedEvidence: parsedData.observedEvidence,
      possibleCauses: parsedData.possibleCauses || [],
      investigationSteps: parsedData.investigationSteps || [],
      commands: (parsedData.commands || []).map((cmd: any) => ({
        command: cmd.command || "",
        purpose: cmd.purpose || "",
        risk: ["Read Only", "Privileged", "Potentially Disruptive"].includes(cmd.risk)
          ? cmd.risk
          : "Read Only",
      })),
      remediationRisks: parsedData.remediationRisks || [],
      suggestedNextAction: parsedData.suggestedNextAction || "",
      disclaimer:
        parsedData.disclaimer ||
        "AI-generated analysis based on supplied telemetry. Commands are suggestions only and were not executed.",
      isFallback: false,
    };

    return {
      analysis,
      usedFallback: false,
    };
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return {
      analysis: getFallbackForServer(server.hostname),
      usedFallback: true,
      errorMessage: err.message || "Failed to communicate with Gemini API. Activated demo fallback mode.",
    };
  }
};
