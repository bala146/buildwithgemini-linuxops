import React from "react";
import type { LinuxAnalysis } from "../types";
import { CommandCard } from "./CommandCard";
import { Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Terminal, FileCheck, Info } from "lucide-react";

interface AnalysisPanelProps {
  analysis: LinuxAnalysis;
  usedFallback?: boolean;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, usedFallback }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#111C2F] border border-cyan-800/80 rounded-xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100">Gemini Infrastructure Assessment</h3>
                {usedFallback && (
                  <span className="bg-amber-950/90 text-amber-300 border border-amber-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Demo Fallback Result
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Structured Linux telemetry analysis & safety-first troubleshooting commands
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono">Severity:</span>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider ${
                analysis.severity === "CRITICAL"
                  ? "bg-rose-950 text-rose-300 border border-rose-800 animate-pulse"
                  : analysis.severity === "WARNING"
                  ? "bg-amber-950 text-amber-300 border border-amber-800"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-800"
              }`}
            >
              {analysis.severity}
            </span>
          </div>
        </div>

        {/* Section 2: Overall Assessment */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Overall Assessment
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 font-sans">
            {analysis.overallAssessment}
          </p>
        </div>
      </div>

      {/* Grid: Observed Evidence vs Possible Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 3: Observed Evidence */}
        <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-800">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Observed Evidence (Facts)
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.observedEvidence.map((ev, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Possible Contributing Factors / Causes */}
        <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Possible Causes (Hypotheses)
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.possibleCauses.map((cause, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 5: Recommended Investigation */}
      <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-800">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Recommended Investigation Workflow
          </h4>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {analysis.investigationSteps.map((step, i) => (
            <li key={i} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-slate-300">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Section 6: Suggested Linux Commands */}
      {analysis.commands && analysis.commands.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Suggested Linux Investigation Commands ({analysis.commands.length})</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Commands are suggestions only. Never auto-executed.</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {analysis.commands.map((cmd, idx) => (
              <CommandCard key={idx} command={cmd} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Section 7 & 8: Remediation Risks & Recommended Next Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 7: Remediation Risks */}
        <div className="bg-[#111C2F] border border-rose-900/40 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-rose-900/40">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Remediation Safety & Risks
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.remediationRisks.map((risk, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs text-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 8: Recommended Next Action */}
        <div className="bg-[#111C2F] border border-emerald-900/40 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-emerald-900/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Recommended Next Action
              </h4>
            </div>
            <p className="text-sm font-medium text-emerald-300 bg-emerald-950/40 p-3.5 rounded-lg border border-emerald-800/60 leading-relaxed">
              {analysis.suggestedNextAction}
            </p>
          </div>

          {/* Section 9: AI Disclaimer */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
            {analysis.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};
