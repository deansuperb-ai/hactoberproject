import React from "react";

interface StillHereLogoProps {
  variant?: "full" | "compact" | "icon" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  theme?: "light" | "dark" | "terracotta";
}

export const StillHereLogo: React.FC<StillHereLogoProps> = ({
  variant = "full",
  size = "md",
  showTagline = true,
  className = "",
  theme = "light",
}) => {
  // Dimensions based on size
  const iconSize = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 60,
  }[size];

  const wordmarkSize = {
    sm: "text-base tracking-widest",
    md: "text-lg tracking-[0.2em]",
    lg: "text-2xl tracking-[0.22em]",
    xl: "text-3xl tracking-[0.25em]",
  }[size];

  const taglineSize = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base",
  }[size];

  const frameColor = theme === "dark" ? "#FAF6F0" : "#231C18";
  const frameSecondary = theme === "dark" ? "#D48B74" : "#C25E42";
  const starGlow = "#E07A5F";

  const LogoIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="STILL HERE memory frame icon"
    >
      {/* Background soft ambient halo */}
      <circle cx="50" cy="50" r="44" fill={frameSecondary} fillOpacity="0.08" />

      {/* Back overlapping photo frame (soft tilt / continuity) */}
      <rect
        x="22"
        y="18"
        width="56"
        height="64"
        rx="8"
        transform="rotate(-5 22 18)"
        stroke={frameSecondary}
        strokeWidth="2.5"
        strokeOpacity="0.55"
        strokeDasharray="2 3"
      />

      {/* Front elegant memory frame (solid parchment / terracotta border) */}
      <rect
        x="24"
        y="20"
        width="54"
        height="62"
        rx="7"
        stroke={frameColor}
        strokeWidth="3.5"
        fill={theme === "dark" ? "#2B221D" : "#FAF6F0"}
      />

      {/* Inner photograph matte border */}
      <rect
        x="30"
        y="26"
        width="42"
        height="48"
        rx="4"
        stroke={frameSecondary}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* The remembered moment: 4-pointed radiant star of remembrance */}
      <g transform="translate(51, 50)">
        {/* Warm glow behind the star */}
        <circle cx="0" cy="0" r="10" fill={starGlow} fillOpacity="0.3" />
        <circle cx="0" cy="0" r="4" fill={starGlow} fillOpacity="0.7" />

        {/* 4-point star path */}
        <path
          d="M 0 -13 Q 1 -2 12 0 Q 1 2 0 13 Q -1 2 -12 0 Q -1 -2 0 -13 Z"
          fill={starGlow}
        />
        {/* Center shining core */}
        <circle cx="0" cy="0" r="1.5" fill="#FAF6F0" />
      </g>
    </svg>
  );

  if (variant === "icon" || variant === "mark") {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  return (
    <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}

      <div className="flex flex-col">
        <span
          className={`font-serif font-semibold uppercase leading-none ${
            theme === "dark" ? "text-parchment-100" : "text-espresso-900"
          } ${wordmarkSize}`}
        >
          STILL HERE
        </span>
        {showTagline && variant === "full" && (
          <span
            className={`font-sans font-light italic leading-tight text-espresso-600/80 mt-0.5 ${
              theme === "dark" ? "text-parchment-400" : "text-espresso-600"
            } ${taglineSize}`}
          >
            Keep the moments that keep you close.
          </span>
        )}
      </div>
    </div>
  );
};
