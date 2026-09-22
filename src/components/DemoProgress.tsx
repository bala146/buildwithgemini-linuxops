import React from "react";
import { useDemo } from "../context/DemoContext";
import { CheckCircle2, Circle } from "lucide-react";

export const DemoProgress: React.FC = () => {
  const { completedSteps } = useDemo();

  const steps = [
    { id: 1, label: "Server Selected" },
    { id: 2, label: "Health Reviewed" },
    { id: 3, label: "AI Analysis Generated" },
    { id: 4, label: "Commands Suggested" },
    { id: 5, label: "Incident Draft Created" },
    { id: 6, label: "Notification Prepared" },
  ];

  const completedCount = completedSteps.length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-4 shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <span>Guided Workshop Workflow</span>
            <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono border border-cyan-800/50">
              {completedCount} / {steps.length} Complete ({progressPercent}%)
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Follow the 5-step Linux operational workflow: Detect → Understand → Investigate → Recommend → Communicate
          </p>
        </div>
      </div>

      {/* Steps bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((step) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-2 p-2 rounded-lg border text-xs transition-all ${
                isDone
                  ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                  : "bg-slate-900/60 border-slate-800 text-slate-400"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="font-medium truncate">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
