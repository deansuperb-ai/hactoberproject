/**
 * Deterministically generates bar heights for audio waveforms based on track identifier.
 * Ensures consistent, organic appearance without randomness flicker.
 */
export function generateWaveformBars(seed: string = "default", count: number = 36): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const x = i / count;
    // Harmonic wave envelope
    const envelope = Math.sin(Math.PI * x);
    const pseudoRandom = Math.abs(Math.sin((hash + i * 17) * 0.123));
    const heightPercent = Math.max(15, Math.min(100, (envelope * 0.7 + pseudoRandom * 0.3) * 100));
    bars.push(Math.round(heightPercent));
  }
  return bars;
}
