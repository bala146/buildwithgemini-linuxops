import React from "react";
import { useDemo } from "../context/DemoContext";
import { FLEET_SUMMARY } from "../data/servers";
import { MetricCard } from "../components/MetricCard";
import { ServerTable } from "../components/ServerTable";
import { DemoProgress } from "../components/DemoProgress";
import { Server, CheckCircle2, AlertTriangle, AlertCircle, Cpu, HardDrive, Database, Activity, ShieldAlert, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { servers, selectServerById, runAnalysis } = useDemo();
  const navigate = useNavigate();

  // Calculate averages from sample visible servers
  const avgCpu = Math.round(servers.reduce((acc, s) => acc + s.cpu, 0) / servers.length);
  const avgMem = Math.round(servers.reduce((acc, s) => acc + s.memory, 0) / servers.length);
  const avgDisk = Math.round(servers.reduce((acc, s) => acc + s.disk, 0) / servers.length);

  const totalEventsCount = servers.reduce((acc, s) => acc + s.events.filter(e => e.severity !== "healthy").length, 0);
  const failedServicesCount = servers.reduce((acc, s) => acc + s.services.filter(svc => svc.status === "failed").length, 0);

  const handleStartDemoFocus = () => {
    selectServerById("api-prod-07");
    navigate("/server");
    runAnalysis();
  };

  return (
    <div className="space-y-6">
      {/* Demo Progress Banner */}
      <DemoProgress />

      {/* Top Banner Alert for Demo Presenters */}
      <div className="bg-gradient-to-r from-rose-950/80 via-[#111C2F] to-cyan-950/80 border border-rose-800/80 rounded-xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">Critical Node Focus: api-prod-07</h2>
              <span className="text-xs bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-mono font-bold">
                SEV-1 ALERT
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              High CPU (94%), Memory (91%), and Pacemaker cluster service failed. Recommended workshop flow: Select api-prod-07 → Analyze with Gemini → Review safe investigation commands.
            </p>
          </div>
        </div>

        <button
          onClick={handleStartDemoFocus}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch Demo Focus (api-prod-07)</span>
        </button>
      </div>

      {/* Fleet KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Servers"
          value={FLEET_SUMMARY.totalServers}
          subtext="128 monitored infrastructure hosts"
          icon={Server}
          variant="primary"
        />
        <MetricCard
          title="Healthy Nodes"
          value={FLEET_SUMMARY.healthy}
          subtext={`${Math.round((FLEET_SUMMARY.healthy / FLEET_SUMMARY.totalServers) * 100)}% operating normally`}
          icon={CheckCircle2}
          variant="healthy"
        />
        <MetricCard
          title="Warning Nodes"
          value={FLEET_SUMMARY.warning}
          subtext="Resource thresholds exceeded"
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Critical Nodes"
          value={FLEET_SUMMARY.critical}
          subtext="Requires immediate investigation"
          icon={AlertCircle}
          variant="critical"
        />
      </div>

      {/* Operational Metrics Secondary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Avg CPU Load</span>
          </div>
          <span className="text-lg font-bold text-slate-100">{avgCpu}%</span>
        </div>

        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>Avg Memory</span>
          </div>
          <span className="text-lg font-bold text-slate-100">{avgMem}%</span>
        </div>

        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Avg Disk Usage</span>
          </div>
          <span className="text-lg font-bold text-slate-100">{avgDisk}%</span>
        </div>

        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Alerts</span>
          </div>
          <span className="text-lg font-bold text-amber-400">{totalEventsCount}</span>
        </div>

        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Failed Services</span>
          </div>
          <span className="text-lg font-bold text-rose-400">{failedServicesCount}</span>
        </div>

        <div className="bg-[#111C2F] border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recent Incidents</span>
          </div>
          <span className="text-lg font-bold text-slate-100">1</span>
        </div>
      </div>

      {/* Visible Server Table */}
      <ServerTable servers={servers} />
    </div>
  );
};
