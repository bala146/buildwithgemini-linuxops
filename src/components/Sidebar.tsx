import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Server, Bot, PlayCircle, ShieldCheck } from "lucide-react";
import { useDemo } from "../context/DemoContext";

export const Sidebar: React.FC = () => {
  const { selectedServer } = useDemo();

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      to: "/server",
      label: "Server Workspace",
      icon: Server,
      badge: selectedServer?.hostname,
    },
    {
      to: "/copilot",
      label: "AI Copilot",
      icon: Bot,
    },
    {
      to: "/demo-flow",
      label: "Demo Flow",
      icon: PlayCircle,
    },
  ];

  return (
    <aside className="w-64 bg-[#0B1628] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Top Header Logo */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Server className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 tracking-tight leading-none">
                LinuxOps AI
              </h1>
              <p className="text-[11px] text-cyan-400 mt-1 font-medium">
                AI Infrastructure Ops
              </p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-rose-950 text-rose-300 font-mono px-1.5 py-0.5 rounded border border-rose-800/50">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom sidebar info */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <ShieldCheck className="w-4 h-4" />
            <span>Demo Mode Enabled</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Gemini advisory mode active. No server commands are executed.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 text-center font-mono">
          v1.0.0 • Workshop Demo
        </div>
      </div>
    </aside>
  );
};
