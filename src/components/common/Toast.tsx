import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FDFCF9] border border-parchment-300 shadow-warm-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && (
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0" />
              )}
              {isError && (
                <AlertCircle className="w-5 h-5 text-terracotta shrink-0" />
              )}
              {!isSuccess && !isError && (
                <Info className="w-5 h-5 text-espresso-700 shrink-0" />
              )}
              <p className="text-sm font-medium text-espresso-900">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-espresso-400 hover:text-espresso-800 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
