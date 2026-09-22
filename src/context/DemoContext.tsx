import React, { createContext, useContext, useState } from "react";
import type { LinuxServer, LinuxAnalysis, ToastMessage } from "../types";
import { MOCK_SERVERS } from "../data/servers";
import { analyzeServerTelemetry } from "../services/geminiService";
import { FALLBACK_ANALYSIS_API_PROD_07 } from "../data/fallbackAnalysis";

interface DemoContextType {
  selectedServer: LinuxServer;
  servers: LinuxServer[];
  analysis: LinuxAnalysis | null;
  isAnalyzing: boolean;
  usedFallback: boolean;
  errorMessage: string | null;
  completedSteps: number[];
  toasts: ToastMessage[];
  addToast: (message: string, type?: "info" | "success" | "warning") => void;
  removeToast: (id: string) => void;
  selectServer: (server: LinuxServer) => void;
  selectServerById: (id: string) => void;
  runAnalysis: (customQuery?: string) => Promise<void>;
  markStepCompleted: (stepId: number) => void;
  hasGeneratedIncident: boolean;
  setHasGeneratedIncident: (val: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servers] = useState<LinuxServer[]>(MOCK_SERVERS);
  // Default selected server: api-prod-07
  const [selectedServer, setSelectedServer] = useState<LinuxServer>(
    MOCK_SERVERS.find((s) => s.id === "api-prod-07") || MOCK_SERVERS[0]
  );
  const [analysis, setAnalysis] = useState<LinuxAnalysis | null>(FALLBACK_ANALYSIS_API_PROD_07);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [usedFallback, setUsedFallback] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]); // Steps 1 and 2 start unlocked for api-prod-07
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hasGeneratedIncident, setHasGeneratedIncident] = useState<boolean>(false);

  const addToast = (message: string, type: "info" | "success" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markStepCompleted = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
  };

  const selectServer = (server: LinuxServer) => {
    setSelectedServer(server);
    setAnalysis(null);
    setErrorMessage(null);
    markStepCompleted(1);
    markStepCompleted(2);
  };

  const selectServerById = (id: string) => {
    const server = servers.find((s) => s.id === id);
    if (server) {
      selectServer(server);
    }
  };

  const runAnalysis = async (customQuery?: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    // Dynamic delay for realistic loading effect during demo
    await new Promise((res) => setTimeout(res, 1200));

    try {
      const result = await analyzeServerTelemetry(selectedServer, customQuery);
      setAnalysis(result.analysis);
      setUsedFallback(result.usedFallback);
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
      }
      markStepCompleted(3);
      if (result.analysis.commands && result.analysis.commands.length > 0) {
        markStepCompleted(4);
      }
    } catch (err: any) {
      setErrorMessage("Analysis failed. Activating demo fallback analysis.");
      setUsedFallback(true);
      setAnalysis(FALLBACK_ANALYSIS_API_PROD_07);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        selectedServer,
        servers,
        analysis,
        isAnalyzing,
        usedFallback,
        errorMessage,
        completedSteps,
        toasts,
        addToast,
        removeToast,
        selectServer,
        selectServerById,
        runAnalysis,
        markStepCompleted,
        hasGeneratedIncident,
        setHasGeneratedIncident,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
