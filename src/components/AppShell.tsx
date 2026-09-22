import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toast } from "./Toast";
import { useDemo } from "../context/DemoContext";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { toasts, removeToast } = useDemo();

  return (
    <div className="min-h-screen bg-[#08111F] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      <div className="flex flex-1">
        {/* Persistent Left Sidebar */}
        <Sidebar />

        {/* Main Workspace Column */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          {/* Main Route Content Area */}
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Persistent Footer */}
          <footer className="py-4 px-6 border-t border-slate-800/80 bg-[#0B1628]/60 text-center text-xs text-slate-400 font-mono">
            LinuxOps AI • Workshop Prototype • Powered by Gemini
          </footer>
        </div>
      </div>

      {/* Global Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
