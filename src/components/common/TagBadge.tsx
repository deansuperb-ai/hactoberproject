import React from "react";

interface TagBadgeProps {
  label: string;
  size?: "sm" | "md";
  onClick?: () => void;
  selected?: boolean;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  label,
  size = "md",
  onClick,
  selected = false,
}) => {
  // Deterministic color accent based on tag string
  let colorStyles = "bg-parchment-200/80 text-espresso-700 border-parchment-300";
  const lower = label.toLowerCase();

  if (lower.includes("music") || lower.includes("piano") || lower.includes("song")) {
    colorStyles = selected
      ? "bg-terracotta text-white border-terracotta"
      : "bg-terracotta-light/60 text-terracotta-dark border-terracotta-border hover:bg-terracotta-light";
  } else if (lower.includes("cabin") || lower.includes("lake") || lower.includes("nature") || lower.includes("walk")) {
    colorStyles = selected
      ? "bg-olive text-white border-olive"
      : "bg-olive-light/70 text-olive-dark border-olive-border hover:bg-olive-light";
  } else if (lower.includes("recipe") || lower.includes("kitchen") || lower.includes("nora") || lower.includes("letter")) {
    colorStyles = selected
      ? "bg-rose-dusty text-white border-rose-dusty"
      : "bg-rose-light/80 text-rose-dark border-rose-border hover:bg-rose-light";
  } else {
    colorStyles = selected
      ? "bg-espresso-800 text-parchment-50 border-espresso-800"
      : "bg-parchment-200/80 text-espresso-700 border-parchment-300 hover:bg-parchment-200";
  }

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2.5 py-0.5 tracking-wide"
      : "text-xs px-3 py-1 tracking-wider";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center font-medium rounded-full border transition-all duration-150 cursor-pointer ${sizeClasses} ${colorStyles}`}
      >
        <span>#{label}</span>
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${colorStyles}`}
    >
      #{label}
    </span>
  );
};
