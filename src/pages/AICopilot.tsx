import React, { useState } from "react";
import { useDemo } from "../context/DemoContext";
import { Bot, Send, HelpCircle, Server } from "lucide-react";
import { LoadingState } from "../components/LoadingState";
import { AnalysisPanel } from "../components/AnalysisPanel";

export const AICopilot: React.FC = () => {
  const { selectedServer, runAnalysis, isAnalyzing, analysis, usedFallback } = useDemo();
  const [customQuestion, setCustomQuestion] = useState("");

  const presetQuestions = [
    "Why is this server unhealthy?",
    "What should I investigate first?",
    "Why might Pacemaker have failed?",
    "Show safe CPU investigation commands",
    "Show safe memory investigation commands",
  ];

  const handleAskPreset = (question: string) => {
    setCustomQuestion(question);
    runAnalysis(question);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || isAnalyzing) return;
    runAnalysis(customQuestion);
  };

  return (
    <div className="space-y-6">
      {/* Copilot Header */}
      <div className="bg-[#111C2F] border border-cyan-800/80 rounded-xl p-6 shadow-xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Ask LinuxOps AI</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Interactive SRE Copilot focused on active node:{" "}
                <strong className="text-cyan-300 font-mono">{selectedServer.hostname}</strong> ({selectedServer.ip})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Context:</span>
            <span className="font-mono font-bold text-slate-200">{selectedServer.hostname}</span>
          </div>
        </div>

        {/* Preset Questions Chips */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 block mb-2 font-medium flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preset SRE Queries:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAskPreset(q)}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-800/60 text-xs font-medium transition-all text-left cursor-pointer disabled:opacity-50"
              >
                ✨ {q}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleSubmitCustom} className="mt-4 flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder={`Ask a custom Linux investigation question for ${selectedServer.hostname}...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!customQuestion.trim() || isAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center space-x-1.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4 text-slate-950" />
            <span>Submit</span>
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isAnalyzing && <LoadingState />}

      {/* Copilot Response Output */}
      {!isAnalyzing && analysis && (
        <AnalysisPanel analysis={analysis} usedFallback={usedFallback} />
      )}
    </div>
  );
};
