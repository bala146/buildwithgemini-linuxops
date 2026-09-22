import React from "react";
import type { HealthStatus, ServiceStatus, CommandRisk } from "../types";
import { CheckCircle2, AlertTriangle, AlertCircle, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

interface StatusBadgeProps {
  status?: HealthStatus | ServiceStatus;
  risk?: CommandRisk;
  label?: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, risk, label, size = "md" }) => {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-semibold";

  if (risk) {
    let bgClass = "bg-slate-800 text-slate-300 border-slate-700";
    let icon = <Shield className="w-3.5 h-3.5 mr-1 text-slate-400" />;

    if (risk === "Read Only") {
      bgClass = "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
      icon = <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />;
    } else if (risk === "Privileged") {
      bgClass = "bg-amber-950/80 text-amber-300 border-amber-800/60";
      icon = <ShieldAlert className="w-3.5 h-3.5 mr-1 text-amber-400" />;
    } else if (risk === "Potentially Disruptive") {
      bgClass = "bg-rose-950/80 text-rose-300 border-rose-800/60";
      icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />;
    }

    return (
      <span className={`inline-flex items-center rounded-md border ${sizeClasses} ${bgClass}`}>
        {icon}
        {risk}
      </span>
    );
  }

  const normalizedStatus = status?.toLowerCase();

  let style = "bg-slate-800 text-slate-300 border-slate-700";
  let icon = null;
  let text = label || status || "Unknown";

  if (normalizedStatus === "healthy" || normalizedStatus === "running") {
    style = "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
    icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />;
    if (!label && normalizedStatus === "healthy") text = "Healthy";
    if (!label && normalizedStatus === "running") text = "Running";
  } else if (normalizedStatus === "warning") {
    style = "bg-amber-950/80 text-amber-300 border-amber-800/60";
    icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" />;
    if (!label) text = "Warning";
  } else if (normalizedStatus === "critical" || normalizedStatus === "failed") {
    style = "bg-rose-950/80 text-rose-300 border-rose-800/60 animate-pulse";
    icon = <AlertCircle className="w-3.5 h-3.5 mr-1 text-rose-400" />;
    if (!label && normalizedStatus === "critical") text = "Critical";
    if (!label && normalizedStatus === "failed") text = "Failed";
  } else if (normalizedStatus === "stopped") {
    style = "bg-slate-800 text-slate-400 border-slate-700";
    if (!label) text = "Stopped";
  }

  return (
    <span className={`inline-flex items-center rounded-md border ${sizeClasses} ${style}`}>
      {icon}
      <span>{text}</span>
    </span>
  );
};
