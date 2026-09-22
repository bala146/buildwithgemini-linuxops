import React from "react";
import { useDemo } from "../context/DemoContext";
import { StatusBadge } from "../components/StatusBadge";
import { UtilizationBar } from "../components/UtilizationBar";
import { ServiceList } from "../components/ServiceList";
import { EventTimeline } from "../components/EventTimeline";
import { AnalysisPanel } from "../components/AnalysisPanel";
import { LoadingState } from "../components/LoadingState";
import { IncidentCard } from "../components/IncidentCard";
import { NotificationPreview } from "../components/NotificationPreview";
import { Sparkles, Server, Cpu, HardDrive, Database, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServerWorkspace: React.FC = () => {
  const { selectedServer, runAnalysis, isAnalyzing, analysis, usedFallback } = useDemo();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Environment:</span>
          <span className="text-xs font-mono font-bold text-slate-200 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
            {selectedServer.environment}
          </span>
        </div>
      </div>

      {/* Main Server Header Card */}
      <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-6 shadow-xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-950 to-blue-900 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-md">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-mono font-bold text-slate-100">{selectedServer.hostname}</h2>
                <StatusBadge status={selectedServer.status} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1 font-mono">
                <span>IP: <strong className="text-slate-200">{selectedServer.ip}</strong></span>
                <span>•</span>
                <span>OS: <strong className="text-slate-200">{selectedServer.os}</strong></span>
                <span>•</span>
                <span>Uptime: <strong className="text-slate-200">{selectedServer.uptimeDays} days</strong></span>
                <span>•</span>
                <span>Load Avg: <strong className={selectedServer.loadAverage > 10 ? "text-rose-400 font-bold" : "text-slate-200"}>{selectedServer.loadAverage}</strong></span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => runAnalysis()}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin-slow" />
            <span>{isAnalyzing ? "Analyzing Telemetry..." : "✨ Analyze with Gemini"}</span>
          </button>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-[#08111F] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-cyan-400" /> CPU Utilization</span>
              <span className="font-mono font-bold text-rose-400 text-sm">{selectedServer.cpu}%</span>
            </div>
            <UtilizationBar value={selectedServer.cpu} showPercentage={false} />
          </div>

          <div className="bg-[#08111F] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-cyan-400" /> Memory Utilization</span>
              <span className="font-mono font-bold text-rose-400 text-sm">{selectedServer.memory}%</span>
            </div>
            <UtilizationBar value={selectedServer.memory} showPercentage={false} />
          </div>

          <div className="bg-[#08111F] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-cyan-400" /> Storage Utilization</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{selectedServer.disk}%</span>
            </div>
            <UtilizationBar value={selectedServer.disk} showPercentage={false} />
          </div>
        </div>
      </div>

      {/* Grid: Services & Recent Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceList services={selectedServer.services} />
        <EventTimeline events={selectedServer.events} />
      </div>

      {/* Gemini Analysis Section */}
      {isAnalyzing && <LoadingState />}

      {!isAnalyzing && analysis && (
        <div className="space-y-6">
          <AnalysisPanel analysis={analysis} usedFallback={usedFallback} />

          {/* Phase 2 Enhancements: Incident Summary Draft & Notification Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <IncidentCard />
            <NotificationPreview />
          </div>
        </div>
      )}
    </div>
  );
};
