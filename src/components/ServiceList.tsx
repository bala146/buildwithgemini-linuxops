import React from "react";
import type { LinuxService } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Server } from "lucide-react";

interface ServiceListProps {
  services: LinuxService[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <Server className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monitored Services</h4>
      </div>
      <div className="space-y-2">
        {services.map((svc) => (
          <div
            key={svc.name}
            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-colors ${
              svc.status === "failed"
                ? "bg-rose-950/30 border-rose-800/80 text-rose-200"
                : "bg-slate-900/60 border-slate-800 text-slate-200"
            }`}
          >
            <span className="font-semibold">{svc.name}</span>
            <StatusBadge status={svc.status} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};
