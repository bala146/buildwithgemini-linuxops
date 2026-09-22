import React, { useState } from "react";
import type { SuggestedCommand } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Copy, Check, Terminal } from "lucide-react";
import { useDemo } from "../context/DemoContext";

interface CommandCardProps {
  command: SuggestedCommand;
  index?: number;
}

export const CommandCard: React.FC<CommandCardProps> = ({ command, index }) => {
  const { addToast } = useDemo();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    addToast("Command copied", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          {index !== undefined && (
            <span className="text-xs font-mono font-bold text-slate-400">#{index + 1}</span>
          )}
          <span className="text-xs font-semibold text-slate-200">{command.purpose}</span>
        </div>
        <StatusBadge risk={command.risk} size="sm" />
      </div>

      {/* Code Snippet Box */}
      <div className="relative mt-2 group">
        <pre className="bg-[#08111F] text-cyan-300 font-mono text-xs p-3.5 rounded-lg overflow-x-auto border border-slate-800/90 select-all leading-relaxed">
          <code>{command.command}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
          title="Copy command to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-300" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
