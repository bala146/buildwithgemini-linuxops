import React from "react";
import type { ToastMessage } from "../types";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderClass = "border-emerald-800/80 bg-slate-900/95";

        if (toast.type === "warning") {
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = "border-amber-800/80 bg-slate-900/95";
        } else if (toast.type === "info") {
          icon = <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
          borderClass = "border-cyan-800/80 bg-slate-900/95";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-xl backdrop-blur-md text-slate-100 ${borderClass} animate-in fade-in slide-in-from-bottom-5 duration-200`}
          >
            <div className="flex items-center space-x-3">
              {icon}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-4 text-slate-400 hover:text-slate-200 focus:outline-none"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
