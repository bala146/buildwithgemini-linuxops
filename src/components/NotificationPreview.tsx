import React, { useState } from "react";
import { useDemo } from "../context/DemoContext";
import { MessageSquare, Copy, Check, Send } from "lucide-react";

export const NotificationPreview: React.FC = () => {
  const { selectedServer, addToast, markStepCompleted } = useDemo();
  const [copiedType, setCopiedType] = useState<"teams" | "slack" | null>(null);

  const teamsContent = `🚨 **LinuxOps AI Alert** | **SEV-1**
**Server:** ${selectedServer.hostname}
**Environment:** ${selectedServer.environment}
**CPU:** ${selectedServer.cpu}% | **Memory:** ${selectedServer.memory}%
**Pacemaker:** FAILED

**AI Assessment:**
Resource pressure detected together with a failed cluster service. The root cause is not yet confirmed.

**Recommended:**
Validate cluster state and review Pacemaker logs and resource-consuming processes before remediation.`;

  const slackContent = `🚨 *LinuxOps AI Alert* | *SEV-1*
*Server:* ${selectedServer.hostname}
*Environment:* ${selectedServer.environment}
*CPU:* ${selectedServer.cpu}% | *Memory:* ${selectedServer.memory}%
*Pacemaker:* FAILED

*AI Assessment:*
Resource pressure detected together with a failed cluster service. The root cause is not yet confirmed.

*Recommended:*
Validate cluster state and review Pacemaker logs and resource-consuming processes before remediation.`;

  const handleCopyTeams = () => {
    navigator.clipboard.writeText(teamsContent);
    setCopiedType("teams");
    addToast("Notification formatted for Teams copied", "success");
    markStepCompleted(6);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopySlack = () => {
    navigator.clipboard.writeText(slackContent);
    setCopiedType("slack");
    addToast("Notification formatted for Slack copied", "success");
    markStepCompleted(6);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-100">Notification Preview</h3>
          <span className="text-xs text-slate-400 font-mono">(Advisory Dispatch)</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyTeams}
            className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-800 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {copiedType === "teams" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Teams Copied</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                <span>Copy for Teams</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopySlack}
            className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {copiedType === "slack" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Slack Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy for Slack</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rendered Preview Box */}
      <div className="bg-[#08111F] border border-slate-800 p-4 rounded-lg text-xs space-y-2 font-sans">
        <div className="flex items-center justify-between text-rose-400 font-bold border-b border-slate-800 pb-2">
          <span>🚨 LinuxOps AI Alert</span>
          <span className="bg-rose-950 px-2 py-0.5 rounded text-[10px] font-mono border border-rose-800">
            SEV-1
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-300 py-1">
          <div>Server: <strong className="text-cyan-300">{selectedServer.hostname}</strong></div>
          <div>Env: <strong className="text-slate-200">{selectedServer.environment}</strong></div>
          <div>CPU: <strong className="text-rose-400">{selectedServer.cpu}%</strong></div>
          <div>Memory: <strong className="text-rose-400">{selectedServer.memory}%</strong></div>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <span className="font-bold text-slate-200 block">AI Assessment:</span>
          <p className="text-slate-300 text-xs mt-0.5">
            Resource pressure detected together with a failed cluster service. The root cause is not yet confirmed.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <span className="font-bold text-emerald-400 block">Recommended Action:</span>
          <p className="text-slate-300 text-xs mt-0.5">
            Validate cluster state and review Pacemaker logs and resource-consuming processes before remediation.
          </p>
        </div>
      </div>
    </div>
  );
};
