import { GiGlassCelebration, GiMartini, GiWineGlass } from 'react-icons/gi';
import { COCKTAIL_SCATTER } from '@/content/menu';
import { GOLD } from '@/theme/tokens';

function CocktailMark({ kind, size }: { kind: 'martini' | 'wine' | 'cheers'; size: number }) {
  const Icon = kind === 'martini' ? GiMartini : kind === 'wine' ? GiWineGlass : GiGlassCelebration;
  return <Icon size={size} color={GOLD} aria-hidden />;
}

export function ScatteredCocktails() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
      {COCKTAIL_SCATTER.map((mark) => (
        <span
          key={`${mark.x}-${mark.y}`}
          className="absolute"
          style={{ left: mark.x, top: mark.y, transform: `rotate(${mark.rot}deg)` }}
        >
          <CocktailMark kind={mark.kind} size={mark.size} />
        </span>
      ))}
    </div>
  );
}
