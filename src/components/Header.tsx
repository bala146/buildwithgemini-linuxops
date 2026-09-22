import React from "react";
import { useDemo } from "../context/DemoContext";
import { StatusBadge } from "./StatusBadge";
import { Cpu, HardDrive, Server, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const { selectedServer, servers, selectServerById, runAnalysis, isAnalyzing } = useDemo();
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    navigate("/server");
    runAnalysis();
  };

  return (
    <header className="h-16 bg-[#0B1628]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span>LinuxOps AI</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono font-normal">
              Enterprise SRE
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            AI-powered Linux Infrastructure Operations
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Selected server dropdown */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
          <Server className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Active Server:</span>
          <select
            value={selectedServer.id}
            onChange={(e) => selectServerById(e.target.value)}
            className="bg-transparent text-slate-100 font-mono font-semibold focus:outline-none cursor-pointer"
          >
            {servers.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                {s.hostname} ({s.status.toUpperCase()})
              </option>
            ))}
          </select>
          <StatusBadge status={selectedServer.status} size="sm" />
        </div>

        {/* Quick metrics summary */}
        <div className="hidden lg:flex items-center space-x-3 text-xs bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg text-slate-300 font-mono">
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>CPU: <strong className={selectedServer.cpu >= 90 ? "text-rose-400" : "text-emerald-400"}>{selectedServer.cpu}%</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            <span>RAM: <strong className={selectedServer.memory >= 90 ? "text-rose-400" : "text-emerald-400"}>{selectedServer.memory}%</strong></span>
          </div>
        </div>

        {/* Gemini Quick Action Button */}
        <button
          onClick={handleAnalyzeClick}
          disabled={isAnalyzing}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-950 animate-spin-slow" />
          <span>{isAnalyzing ? "Analyzing..." : "Analyze with Gemini"}</span>
        </button>
      </div>
    </header>
  );
};
