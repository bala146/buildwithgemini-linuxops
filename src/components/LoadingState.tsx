import React, { useState, useEffect } from "react";
import { Sparkles, Cpu, ShieldCheck, Terminal } from "lucide-react";

export const LoadingState: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: "Preparing server telemetry", icon: Cpu },
    { title: "Analyzing health indicators & system events", icon: ShieldCheck },
    { title: "Generating investigation guidance & commands", icon: Terminal },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStepIndex(1), 400);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="bg-[#111C2F] border border-cyan-800/60 rounded-xl p-8 shadow-2xl text-center glow-cyan my-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-100 mb-1">
        LinuxOps AI Analysis in Progress
      </h3>
      <p className="text-xs text-slate-400 mb-6">
        Evaluating supplied telemetry against safety constraints & SRE guidelines
      </p>

      {/* Animated step list */}
      <div className="max-w-md mx-auto space-y-3 text-left">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === currentStepIndex;
          const isDone = idx < currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3 p-3 rounded-lg border text-xs transition-all duration-300 ${
                isActive
                  ? "bg-cyan-950/60 border-cyan-700 text-cyan-200 font-semibold"
                  : isDone
                  ? "bg-slate-900/80 border-slate-800 text-emerald-400"
                  : "bg-slate-900/30 border-slate-900 text-slate-400"
              }`}
            >
              <StepIcon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-cyan-400 animate-pulse" : isDone ? "text-emerald-400" : "text-slate-400"
                }`}
              />
              <span className="flex-1">{step.title}</span>
              {isDone && <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Done</span>}
              {isActive && <span className="text-[10px] uppercase font-mono text-cyan-400 animate-pulse">Processing...</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
