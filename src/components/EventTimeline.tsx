import React from "react";
import type { ServerEvent } from "../types";
import { Clock, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

interface EventTimelineProps {
  events: ServerEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recent Telemetry Events</h4>
      </div>
      <div className="space-y-2 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800">
        {events.map((event, idx) => {
          let icon = <Clock className="w-3.5 h-3.5 text-slate-400" />;
          let bgClass = "bg-slate-900 border-slate-800 text-slate-300";

          if (event.severity === "critical") {
            icon = <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
            bgClass = "bg-rose-950/40 border-rose-800/80 text-rose-200 font-semibold";
          } else if (event.severity === "warning") {
            icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
            bgClass = "bg-amber-950/30 border-amber-800/60 text-amber-200";
          } else if (event.severity === "healthy") {
            icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
            bgClass = "bg-emerald-950/20 border-emerald-800/50 text-emerald-200";
          }

          return (
            <div key={idx} className="relative pl-7 text-xs">
              <div className="absolute left-1.5 top-2 transform -translate-x-1/2 p-0.5 rounded-full bg-[#111C2F]">
                {icon}
              </div>
              <div className={`p-2 rounded-lg border ${bgClass}`}>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5 font-mono">
                  <span>{event.time}</span>
                  <span className="uppercase">{event.severity}</span>
                </div>
                <div>{event.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
