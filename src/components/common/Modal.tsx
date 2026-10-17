import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Warm backdrop with delicate blur */}
      <div
        className="fixed inset-0 bg-espresso-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Surface */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses} bg-parchment-50 dark:bg-[#241D19] rounded-3xl border border-parchment-300 dark:border-[#382C25] shadow-album p-5 sm:p-8 z-10 my-auto text-left transition-all duration-200 transform scale-100 max-h-[92vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-parchment-300 dark:border-[#382C25]">
          <div>
            {title && (
              <h3
                id="modal-title"
                className="font-serif text-2xl sm:text-3xl font-medium text-espresso-900 tracking-tight"
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                id="modal-description"
                className="text-sm text-espresso-600 mt-1"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full flex items-center justify-center text-espresso-500 hover:text-espresso-900 hover:bg-parchment-200/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-4 sm:py-6 flex-1 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};
