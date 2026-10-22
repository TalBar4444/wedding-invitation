import { STARTERS } from '@/content/menu';
import { GOLD } from '@/theme/tokens';

export function StarterList({ top, fontSize }: { top: number; fontSize: number }) {
  return (
    <p
      className="absolute flex flex-wrap items-center justify-center"
      style={{
        top,
        left: 0,
        right: 0,
        marginInline: 'auto',
        width: 920,
        fontSize,
        fontWeight: 400,
        letterSpacing: '0.02em',
        rowGap: 12,
      }}
    >
      {STARTERS.map((item, i) => (
        <span key={item} style={{ whiteSpace: 'nowrap' }}>
          {item}
          {i < STARTERS.length - 1 && (
            <span style={{ color: GOLD, margin: '0 10px', fontWeight: 500 }} aria-hidden>
              |
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
