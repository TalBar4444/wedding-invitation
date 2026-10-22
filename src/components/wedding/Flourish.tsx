import { GOLD } from '@/theme/tokens';

export function Flourish({ width = 176, scale = 1 }: { width?: number; scale?: number }) {
  const svgW = 26 * scale;
  const svgH = 14 * scale;
  return (
    <div className="flex items-center" style={{ width, gap: 10 * scale }} aria-hidden>
      <span className="h-px flex-1" style={{ background: GOLD, opacity: 0.65 }} />
      <svg width={svgW} height={svgH} viewBox="0 0 26 14" fill="none" aria-hidden>
        <circle cx="9" cy="7" r="4.6" stroke={GOLD} strokeWidth="0.75" />
        <circle cx="17" cy="7" r="4.6" stroke={GOLD} strokeWidth="0.75" />
      </svg>
      <span className="h-px flex-1" style={{ background: GOLD, opacity: 0.65 }} />
    </div>
  );
}
