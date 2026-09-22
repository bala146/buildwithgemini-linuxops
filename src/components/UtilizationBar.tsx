import React from "react";

interface UtilizationBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

export const UtilizationBar: React.FC<UtilizationBarProps> = ({
  value,
  label,
  showPercentage = true,
}) => {
  let barColor = "bg-emerald-500";
  let textColor = "text-emerald-400";

  if (value >= 90) {
    barColor = "bg-rose-500";
    textColor = "text-rose-400 font-bold";
  } else if (value >= 75) {
    barColor = "bg-amber-500";
    textColor = "text-amber-400 font-semibold";
  }

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs mb-1">
          {label && <span className="text-slate-400">{label}</span>}
          {showPercentage && <span className={textColor}>{value}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};
