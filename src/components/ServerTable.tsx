import React, { useState } from "react";
import type { LinuxServer } from "../types";
import { StatusBadge } from "./StatusBadge";
import { UtilizationBar } from "./UtilizationBar";
import { useDemo } from "../context/DemoContext";
import { useNavigate } from "react-router-dom";
import { Server, ArrowRight, Filter, Search } from "lucide-react";

interface ServerTableProps {
  servers: LinuxServer[];
}

export const ServerTable: React.FC<ServerTableProps> = ({ servers }) => {
  const { selectedServer, selectServer } = useDemo();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleViewServer = (server: LinuxServer) => {
    selectServer(server);
    navigate("/server");
  };

  const filteredServers = servers.filter((server) => {
    const matchesStatus = filterStatus === "all" || server.status === filterStatus;
    const matchesSearch =
      server.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ip.includes(searchQuery) ||
      server.os.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#111C2F] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Table controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Server className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-slate-100">Fleet Telemetry Sample</h3>
          <span className="text-xs text-slate-400 font-mono">({servers.length} sample nodes shown)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search hostname, IP, OS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-44 sm:w-56"
            />
          </div>

          {/* Filter Status */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <Filter className="w-3 h-3 text-slate-400 ml-1" />
            {["all", "critical", "warning", "healthy"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2 py-0.5 rounded text-xs capitalize transition-colors font-medium ${
                  filterStatus === status
                    ? "bg-slate-800 text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B1628] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Server</th>
              <th className="py-3 px-4">Environment</th>
              <th className="py-3 px-4 w-28">CPU</th>
              <th className="py-3 px-4 w-28">Memory</th>
              <th className="py-3 px-4 w-28">Disk</th>
              <th className="py-3 px-4">Services</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredServers.map((server) => {
              const isSelected = selectedServer.id === server.id;
              const isPrimaryCritical = server.id === "api-prod-07";

              return (
                <tr
                  key={server.id}
                  className={`transition-colors hover:bg-slate-800/40 ${
                    isSelected
                      ? "bg-cyan-950/20 border-l-4 border-l-cyan-400"
                      : isPrimaryCritical
                      ? "bg-rose-950/10"
                      : ""
                  }`}
                >
                  {/* Hostname & IP */}
                  <td className="py-3 px-4 font-mono">
                    <div className="font-bold text-slate-100 flex items-center gap-2">
                      <span>{server.hostname}</span>
                      {isPrimaryCritical && (
                        <span className="text-[10px] bg-rose-950 text-rose-300 font-sans px-1.5 py-0.2 rounded border border-rose-800">
                          Critical Demo Focus
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{server.ip} • {server.os}</div>
                  </td>

                  {/* Environment */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {server.environment}
                    </span>
                  </td>

                  {/* CPU */}
                  <td className="py-3 px-4">
                    <UtilizationBar value={server.cpu} />
                  </td>

                  {/* Memory */}
                  <td className="py-3 px-4">
                    <UtilizationBar value={server.memory} />
                  </td>

                  {/* Disk */}
                  <td className="py-3 px-4">
                    <UtilizationBar value={server.disk} />
                  </td>

                  {/* Services summary */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {server.services.map((svc) => (
                        <span
                          key={svc.name}
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            svc.status === "failed"
                              ? "bg-rose-950 text-rose-300 font-bold border border-rose-800"
                              : "bg-slate-900 text-slate-400 border border-slate-800"
                          }`}
                        >
                          {svc.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Status badge */}
                  <td className="py-3 px-4">
                    <StatusBadge status={server.status} size="sm" />
                  </td>

                  {/* Action button */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleViewServer(server)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center space-x-1 transition-all cursor-pointer ${
                        isPrimaryCritical
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      }`}
                    >
                      <span>View Server</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
