import React from "react";
import { useDemo } from "../context/DemoContext";
import { DemoProgress } from "../components/DemoProgress";
import { PlayCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DemoFlow: React.FC = () => {
  const { selectServerById, runAnalysis, markStepCompleted } = useDemo();
  const navigate = useNavigate();

  const handleStepAction = (stepIndex: number) => {
    markStepCompleted(stepIndex);
    if (stepIndex === 1 || stepIndex === 2) {
      selectServerById("api-prod-07");
      navigate("/server");
    } else if (stepIndex === 3) {
      selectServerById("api-prod-07");
      navigate("/server");
      runAnalysis();
    } else if (stepIndex === 4) {
      navigate("/copilot");
    } else if (stepIndex === 5 || stepIndex === 6) {
      selectServerById("api-prod-07");
      navigate("/server");
    }
  };

  const scriptSteps = [
    {
      num: 1,
      title: "Fleet Dashboard Overview",
      action: "Show the 128 total fleet nodes (112 Healthy, 11 Warning, 5 Critical). Point out the primary critical node api-prod-07.",
      buttonText: "Go to Dashboard",
    },
    {
      num: 2,
      title: "Select & Inspect Critical Server",
      action: "Select api-prod-07. Inspect CPU (94%), Memory (91%), Load Avg (12.4), and failed Pacemaker service.",
      buttonText: "Open api-prod-07 Workspace",
    },
    {
      num: 3,
      title: "Analyze Telemetry with Gemini",
      action: "Click 'Analyze with Gemini'. Show how Gemini receives the raw JSON telemetry payload and returns structured analysis.",
      buttonText: "Run Gemini Telemetry Analysis",
    },
    {
      num: 4,
      title: "Review Evidence & Safe Investigation Commands",
      action: "Explain observed evidence vs possible causes. Review suggested commands with risk labels (Read Only, Privileged).",
      buttonText: "Ask AI Copilot",
    },
    {
      num: 5,
      title: "Generate Incident Draft (INC-2026-0922-001)",
      action: "Click 'Copy Incident' to copy formatted SEV-1 incident draft to clipboard.",
      buttonText: "View Incident Draft",
    },
    {
      num: 6,
      title: "Prepare Teams & Slack Dispatch",
      action: "Copy formatted advisory alert for Microsoft Teams and Slack dispatch. Re-emphasize that LinuxOps AI is strictly advisory and never executes code.",
      buttonText: "View Notification Preview",
    },
  ];

  return (
    <div className="space-y-6">
      <DemoProgress />

      <div className="bg-[#111C2F] border border-cyan-800/80 rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Workshop Presenter Playbook</h2>
            <p className="text-xs text-slate-400">
              Interactive step-by-step presentation script for demonstrating LinuxOps AI
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {scriptSteps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-7 h-7 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xl">
                    {step.action}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleStepAction(step.num)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer"
              >
                <span>{step.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
