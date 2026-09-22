import React, { useState } from "react";
import { useDemo } from "../context/DemoContext";
import { Copy, Check, AlertOctagon } from "lucide-react";

export const IncidentCard: React.FC = () => {
  const { selectedServer, addToast, markStepCompleted, setHasGeneratedIncident } = useDemo();
  const [copied, setCopied] = useState(false);

  const incidentData = {
    id: "INC-2026-0922-001",
    severity: "SEV-1",
    server: selectedServer.hostname,
    environment: selectedServer.environment,
    summary: "Potential service degradation associated with severe resource pressure and a failed Pacemaker service.",
    impact: "Potential application and cluster availability impact. The actual user impact requires validation.",
    evidence: [
      `CPU utilization: ${selectedServer.cpu}%`,
      `Memory utilization: ${selectedServer.memory}%`,
      `Load average: ${selectedServer.loadAverage}`,
      `Pacemaker status: ${selectedServer.services.find(s => s.name === "pacemaker")?.status === "failed" ? "Failed" : "Monitored"}`,
      "Application response time increased (+350ms)",
    ],
    nextStep: "Validate the cluster state and investigate Pacemaker logs and resource-consuming processes before attempting service recovery.",
  };

  const incidentText = `[Generated Incident Draft]
Incident ID: ${incidentData.id}
Severity: ${incidentData.severity}
Server: ${incidentData.server}
Environment: ${incidentData.environment}

Summary: ${incidentData.summary}
Impact: ${incidentData.impact}

Evidence:
${incidentData.evidence.map((e) => `- ${e}`).join("\n")}

Recommended Next Step: ${incidentData.nextStep}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(incidentText);
    setCopied(true);
    addToast("Incident copied", "success");
    markStepCompleted(5);
    setHasGeneratedIncident(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111C2F] border border-rose-900/60 rounded-xl p-5 shadow-xl relative">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="w-5 h-5 text-rose-400" />
          <h3 className="text-sm font-bold text-slate-100">Generated Incident Draft</h3>
          <span className="text-xs bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-mono border border-rose-800 font-semibold">
            {incidentData.severity}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Incident</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-mono">Incident ID</span>
          <span className="font-mono font-bold text-slate-200">{incidentData.id}</span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-mono">Server</span>
          <span className="font-mono font-bold text-cyan-300">{incidentData.server}</span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-mono">Environment</span>
          <span className="font-bold text-slate-200">{incidentData.environment}</span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-mono">Severity</span>
          <span className="font-bold text-rose-400">{incidentData.severity}</span>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <span className="font-bold text-slate-300 block mb-0.5">Summary:</span>
          <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            {incidentData.summary}
          </p>
        </div>

        <div>
          <span className="font-bold text-slate-300 block mb-0.5">Impact:</span>
          <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            {incidentData.impact}
          </p>
        </div>

        <div>
          <span className="font-bold text-slate-300 block mb-0.5">Key Telemetry Evidence:</span>
          <ul className="list-disc list-inside bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 space-y-1 text-slate-300 font-mono text-[11px]">
            {incidentData.evidence.map((ev, i) => (
              <li key={i}>{ev}</li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-bold text-slate-300 block mb-0.5">Recommended Next Step:</span>
          <p className="text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/60 font-medium">
            {incidentData.nextStep}
          </p>
        </div>
      </div>
    </div>
  );
};
