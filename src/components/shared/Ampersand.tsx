import { GOLD } from '@/theme/tokens';

export function Ampersand({ size = 34, color = GOLD }: { size?: number; color?: string }) {
  return (
    <span
      dir="ltr"
      className="italic"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        color,
        fontWeight: 500,
        fontSize: size,
      }}
    >
      &amp;
    </span>
  );
}
