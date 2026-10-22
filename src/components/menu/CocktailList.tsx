import { GiChiliPepper } from 'react-icons/gi';
import { COCKTAILS } from '@/content/menu';
import { GOLD } from '@/theme/tokens';

export function CocktailList() {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ top: 318, left: 0, right: 0, marginInline: 'auto', width: 620, zIndex: 4, gap: 28 }}
    >
      {COCKTAILS.map((drink) => (
        <div key={drink.name} className="flex flex-col items-center" style={{ width: '100%' }}>
          <h2
            className="flex items-center justify-center"
            style={{ fontSize: 44, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.15, gap: 8 }}
          >
            {drink.name}
            {drink.spicy && <GiChiliPepper size={36} color={GOLD} aria-hidden style={{ flexShrink: 0 }} />}
          </h2>
          <div className="flex flex-col items-center" style={{ marginTop: 6, gap: 2 }}>
            {drink.lines.map((line) => (
              <p
                key={line.join('|')}
                className="flex flex-nowrap items-center justify-center"
                style={{ fontSize: 30, fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.35 }}
              >
                {line.map((item, i) => (
                  <span key={item} style={{ whiteSpace: 'nowrap' }}>
                    {item}
                    {i < line.length - 1 && (
                      <span style={{ color: GOLD, margin: '0 8px', fontWeight: 500 }} aria-hidden>
                        |
                      </span>
                    )}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
