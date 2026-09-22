import React from "react";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  variant?: "default" | "critical" | "warning" | "healthy" | "primary";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  variant = "default",
}) => {
  let borderStyle = "border-slate-800";
  let iconBg = "bg-slate-800 text-slate-400";

  if (variant === "critical") {
    borderStyle = "border-rose-900/50 bg-rose-950/20 glow-red";
    iconBg = "bg-rose-950 text-rose-400 border border-rose-800/50";
  } else if (variant === "warning") {
    borderStyle = "border-amber-900/40 bg-amber-950/20";
    iconBg = "bg-amber-950 text-amber-400 border border-amber-800/50";
  } else if (variant === "healthy") {
    borderStyle = "border-emerald-900/40 bg-emerald-950/10";
    iconBg = "bg-emerald-950 text-emerald-400 border border-emerald-800/50";
  } else if (variant === "primary") {
    borderStyle = "border-cyan-900/50 bg-cyan-950/20";
    iconBg = "bg-cyan-950 text-cyan-400 border border-cyan-800/50";
  }

  return (
    <div className={`rounded-xl border p-4 bg-[#111C2F] shadow-lg transition-all duration-200 hover:border-slate-700 ${borderStyle}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-slate-100 tracking-tight">{value}</span>
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
    </div>
  );
};
