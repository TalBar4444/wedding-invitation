import { MENU_INTRO } from '@/content/menu';
import { MENU_W, STARTERS_DESIGN_H, STARTERS_DESIGN_W } from '@/layouts/registry';
import type { MenuVariant } from '@/layouts/types';
import { MENU_SERIF, NAVY } from '@/theme/tokens';
import { CocktailList } from './CocktailList';
import { CocktailLogo } from './CocktailLogo';
import { CocktailPaper } from './CocktailPaper';
import { DishBlock } from './DishBlock';
import { HeartRule } from './HeartRule';
import { MenuFooter } from './MenuFooter';
import { MenuMonogram } from './MenuMonogram';
import { MenuPaper } from './MenuPaper';
import { ScatteredCocktails } from './ScatteredCocktails';
import { StarterList } from './StarterList';

/** Same pocket under the lower rule as on the original sheet. */
const STARTERS_FOOTER_TOP = STARTERS_DESIGN_H - 166;
const STARTERS_SCALE = MENU_W / STARTERS_DESIGN_W;

export function MenuOverlay({ variant }: { variant: MenuVariant }) {
  const intro = (
    <>
      {MENU_INTRO[0]}
      <br />
      {MENU_INTRO[1]}
      <br />
      {MENU_INTRO[2]}
    </>
  );

  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{ color: NAVY, fontFamily: MENU_SERIF }}
    >
      {variant === 'cocktails' ? (
        <>
          <CocktailPaper />
          <CocktailLogo />
          <h1
            className="absolute"
            style={{
              top: 214,
              left: 0,
              right: 0,
              fontSize: 52,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              zIndex: 4,
            }}
          >
            קוקטיילים
          </h1>
          <HeartRule top={286} />
          <HeartRule top={804} />
          <ScatteredCocktails />
          <CocktailList />
        </>
      ) : variant === 'starters' ? (
        <div
          className="absolute top-0 left-0"
          style={{
            width: STARTERS_DESIGN_W,
            height: STARTERS_DESIGN_H,
            transform: `scale(${STARTERS_SCALE})`,
            transformOrigin: 'top left',
          }}
        >
          <MenuPaper />
          <MenuMonogram />
          <p
            className="absolute"
            style={{
              top: 258,
              left: 0,
              right: 0,
              marginInline: 'auto',
              width: 900,
              fontSize: 40,
              fontWeight: 400,
              lineHeight: 1.45,
              letterSpacing: '0.02em',
            }}
          >
            {intro}
          </p>
          <h1
            className="absolute"
            style={{
              top: 470,
              left: 0,
              right: 0,
              fontSize: 68,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            ראשונות
          </h1>
          <StarterList top={580} fontSize={32} />
          <h1
            className="absolute"
            style={{
              top: 860,
              left: 0,
              right: 0,
              fontSize: 84,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            עיקריות
          </h1>
          <DishBlock top={990} nameSize={52} descSize={34} gap={48} width={900} />
          <MenuFooter top={STARTERS_FOOTER_TOP} nameSize={46} dateSize={34} ampSize={40} />
        </div>
      ) : (
        <div
          className="absolute top-0 left-0"
          style={{
            width: STARTERS_DESIGN_W,
            height: STARTERS_DESIGN_H,
            transform: `scale(${STARTERS_SCALE})`,
            transformOrigin: 'top left',
          }}
        >
          <MenuPaper />
          <MenuMonogram menuScale={1.45} logoScale={1.4} />
          <p
            className="absolute"
            style={{
              top: 308,
              left: 0,
              right: 0,
              marginInline: 'auto',
              width: 880,
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 1.34,
              letterSpacing: '0.02em',
            }}
          >
            {intro}
          </p>
          <h1
            className="absolute"
            style={{
              top: 540,
              left: 0,
              right: 0,
              fontSize: 84,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.08,
            }}
          >
            עיקריות
          </h1>
          <DishBlock
            top={678}
            nameSize={68}
            descSize={46}
            gap={40}
            divided
            width={880}
            nameLineHeight={1.08}
            descLineHeight={1.3}
            descMarginTop={6}
            descLetterSpacing="0.02em"
          />
          <MenuFooter top={STARTERS_FOOTER_TOP - 30} nameSize={46} dateSize={34} ampSize={40} coupleHeight={188} />
        </div>
      )}
      {variant === 'cocktails' && <MenuFooter top={828} />}
    </div>
  );
}
