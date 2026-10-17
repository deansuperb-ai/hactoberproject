import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "button" | "pill";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  variant = "icon",
}) => {
  const { toggleTheme, isDark } = useTheme();

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
          isDark
            ? "bg-[#2F2620] border-[#3D322B] text-parchment-200 hover:bg-[#3D322B]"
            : "bg-parchment-100 border-parchment-300 text-espresso-800 hover:bg-parchment-200"
        } ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4 text-terracotta" /> : <Moon className="w-4 h-4 text-espresso-600" />}
        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors cursor-pointer border ${
          isDark ? "bg-[#2F2620] border-[#4A3B32]" : "bg-parchment-200 border-parchment-300"
        } ${className}`}
      >
        <span
          className={`inline-block w-6 h-6 transform rounded-full bg-parchment-50 shadow-md transition-transform flex items-center justify-center ${
            isDark ? "translate-x-7 bg-terracotta text-white" : "translate-x-1 text-espresso-800"
          }`}
        >
          {isDark ? <Moon className="w-3.5 h-3.5 text-white" /> : <Sun className="w-3.5 h-3.5 text-terracotta" />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`p-2 rounded-xl transition-all cursor-pointer border ${
        isDark
          ? "bg-[#241D19] border-[#382C25] text-parchment-200 hover:bg-[#2F2620] hover:text-white"
          : "bg-white border-parchment-300 text-espresso-700 hover:bg-parchment-100 hover:text-espresso-950"
      } shadow-xs ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-terracotta-light transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-espresso-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
