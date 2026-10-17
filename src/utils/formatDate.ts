/**
 * Formats dates with warmth and editorial grace
 * e.g., "1988-06-14" -> "June 14, 1988"
 */
export function formatMemoryDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "Undated moment";

  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);

      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (parts.length === 1) {
      return `Circa ${parts[0]}`;
    }

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch {
    // fallback
  }

  return dateStr;
}

/**
 * Format seconds to MM:SS string
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
