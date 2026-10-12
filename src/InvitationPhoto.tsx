import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { GiGlassCelebration, GiMartini, GiWineGlass } from 'react-icons/gi';
import { toPng } from 'html-to-image';

// Olive ink sampled from couple-olive.png, shifted a little greener so it reads as sage on the paper.
const OLIVE = '#3f4a2c';
const GOLD = '#98753f';
const MENU_LINE_GOLD = '#c29450';
const NAVY = '#1A365D';
const LOGO_BURGUNDY = '#94160c';
const SERIF = "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif";
const MENU_SERIF = "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif";

const FONTS_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@300;400&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;500&display=swap';

/** The design is authored at this size, then scaled onto each photo's cards. */
const CANON_LEFT = { w: 260, h: 360 };
const CANON_RIGHT = { w: 248, h: 400 };
const CANON_SINGLE = { w: 600, h: 980 };

type Face = { cx: number; cy: number; rot: number; scale: number };
type LayoutId = 'landscape' | 'portrait' | 'single' | 'menu' | 'starters' | 'cocktails' | 'qr';
type BaseLayout = {
  id: LayoutId;
  label: string;
  src: string;
  w: number;
  h: number;
};
type TwoCardLayout = BaseLayout & { id: 'landscape' | 'portrait'; left: Face; right: Face };
type SingleCardLayout = BaseLayout & { id: 'single'; card: Face };
type MenuLayout = BaseLayout & { id: 'menu' };
type StartersLayout = BaseLayout & { id: 'starters' };
type CocktailsLayout = BaseLayout & { id: 'cocktails' };
type QrLayout = BaseLayout & { id: 'qr' };
type Layout = TwoCardLayout | SingleCardLayout | MenuLayout | StartersLayout | CocktailsLayout | QrLayout;

/** Cocktail card is a short, narrow brochure, not the full menu sheet. */
const COCKTAIL_W = 760;
const COCKTAIL_H = 1000;
const PAPER = '#FBF8F2';

const LAYOUTS: Record<LayoutId, Layout> = {
  landscape: {
    id: 'landscape',
    label: 'לרוחב',
    src: '/deckle-flatlay.jpg',
    w: 1024,
    h: 745,
    left: { cx: 250, cy: 400, rot: -0.9, scale: 1 },
    right: { cx: 602, cy: 428, rot: 15, scale: 1 },
  },
  portrait: {
    id: 'portrait',
    label: 'לאורך',
    src: '/portrait.png',
    w: 1086,
    h: 1448,
    left: { cx: 310, cy: 700, rot: -1.6, scale: 1.22 },
    right: { cx: 755, cy: 760, rot: 13.8, scale: 1.28 },
  },
  single: {
    id: 'single',
    label: 'עמוד אחד',
    src: '/blank-page.png',
    w: 1140,
    h: 2000,
    // Photo is cover-fitted into the frame; overlay follows that crop.
    card: { cx: 597, cy: 1031, rot: -0.55, scale: 1140 / 940 },
  },
  menu: {
    id: 'menu',
    label: 'עיקריות',
    src: '/menu-blank.png',
    w: 1024,
    h: 1536,
  },
  starters: {
    id: 'starters',
    label: 'ראשונות',
    src: '/menu-blank.png',
    w: 1024,
    h: 1536,
  },
  cocktails: {
    id: 'cocktails',
    label: 'קוקטיילים',
    src: '/menu-blank.png',
    w: COCKTAIL_W,
    h: COCKTAIL_H,
  },
  qr: {
    id: 'qr',
    label: 'חינה',
    src: '/hena_bg.png',
    w: 1672,
    h: 941,
  },
};

const MENU_TS_SCALE = 0.55;
const MENU_WORD_SCALE = 0.7;
const MENU_COUPLE_HEIGHT = 118;

const STARTERS = [
  'קלאסית עגבניות איטלקיות',
  'לבבות חסות צבעוניות',
  'בורגול בפיקנטיות עדינה',
  'קרפצ׳ינו בקר',
  'סינטה רכה עם שום קונפי',
  'סשימי סלמון בסויה ומירין',
  'סלט עוף אסייתי',
  'קרפצ׳יו חציל',
  'מסבחה רכה ומלטפת',
  'פלטת מטבלים ולחם הבית',
];

const COCKTAILS: { name: string; lines: string[][] }[] = [
  {
    name: 'גרין וולוט',
    lines: [
      ['ג׳ין', 'ליקר פרחי סמבוק', 'מחית קיווי'],
      ['סירופ מלפפון', 'בזיליקום'],
    ],
  },
  {
    name: 'ספייסי סול',
    lines: [
      ['טקילה', 'מחית מנגו', 'סירופ פסיפלורה'],
      ['סירופ דבש', 'צ׳ילי', 'מיץ ליים'],
    ],
  },
  {
    name: 'פינק מרטיני',
    lines: [
      ['ג׳ין', 'מרטיני ביאנקו'],
      ['אשכולית אדומה', 'ליקר הדרים'],
    ],
  },
];

const COCKTAIL_SCATTER: { kind: 'martini' | 'wine' | 'cheers'; x: number; y: number; size: number; rot: number }[] = [
  { kind: 'martini', x: 668, y: 24, size: 64, rot: 14 },
  { kind: 'cheers', x: 10, y: 198, size: 62, rot: -8 },
  { kind: 'wine', x: 678, y: 300, size: 58, rot: -10 },
  { kind: 'martini', x: 15, y: 530, size: 62, rot: 8 },
  { kind: 'cheers', x: 678, y: 548, size: 60, rot: 6 },
  { kind: 'wine', x: 10, y: 850, size: 58, rot: -12 },
];

const MENU_DISHES: { name: string; lines: string[] }[] = [
  {
    name: 'שייטל זהוב עם ירקות עונתיים',
    lines: ['מוגש עם פירה חרדל ארומטי ושעועית ירוקה'],
  },
  {
    name: 'פרגית עשבי תיבול',
    lines: ['עם אורז קוקוס ומיקס אגוזים קלויים'],
  },
  {
    name: 'פילה דניס ים',
    lines: ['סוכריות פסטה שחורה ועגבניות שרי, ברוטב טימין ולימון רענן'],
  },
  {
    name: 'טארטליני ציידים',
    lines: ['במילוי פטריות, בציר בקר ואסאדו'],
  },
  {
    name: 'רביולי ארטישוק טבעוני',
    lines: ['מוגש עם רוטב פטריות עשיר, ונגיעות כמהין'],
  },
];

async function buildFontEmbedCss(): Promise<string> {
  try {
    const css = await (await fetch(FONTS_CSS_URL)).text();
    const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
    let out = css;
    await Promise.all(
      urls.map(async (u) => {
        const blob = await (await fetch(u)).blob();
        const data = await new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
        out = out.split(u).join(data);
      }),
    );
    return out;
  } catch {
    return '';
  }
}

function place(face: Face, canon: { w: number; h: number }): CSSProperties {
  return {
    left: face.cx - canon.w / 2,
    top: face.cy - canon.h / 2,
    width: canon.w,
    height: canon.h,
    transform: `rotate(${face.rot}deg) scale(${face.scale})`,
    transformOrigin: 'center center',
  };
}

function BlankCrop({
  boxTop,
  boxW,
  boxH,
  srcTop,
  scale,
  zIndex,
  pageW = 1024,
}: {
  boxTop: number;
  boxW: number;
  boxH: number;
  srcTop: number;
  scale: number;
  zIndex?: number;
  pageW?: number;
}) {
  const srcLeft = (1024 - boxW) / 2;
  const imgStyle: CSSProperties = {
    position: 'absolute',
    width: 1024,
    height: 1536,
    maxWidth: 'none',
    maxHeight: 'none',
    left: -srcLeft,
    top: -srcTop,
  };
  return (
    <div
      aria-hidden
      className="absolute overflow-hidden"
      style={{
        top: boxTop,
        left: (pageW - boxW) / 2,
        width: boxW,
        height: boxH,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        zIndex,
      }}
    >
      <img src="/menu-blank.png" alt="" style={imgStyle} />
    </div>
  );
}

function PaperPatch({ top, left, width, height }: { top: number; left: number; width: number; height: number }) {
  return (
    <div aria-hidden className="absolute overflow-hidden" style={{ top, left, width, height, zIndex: 1 }}>
      <img
        src="/menu-blank.png"
        alt=""
        style={{
          position: 'absolute',
          width: 1024,
          height: 1536,
          maxWidth: 'none',
          maxHeight: 'none',
          left: -420,
          top: -700,
        }}
      />
    </div>
  );
}

function HeartRule({ top }: { top: number }) {
  return (
    <div
      aria-hidden
      className="absolute flex items-center justify-center"
      style={{ top, left: 0, right: 0, zIndex: 3, gap: 12 }}
    >
      <span style={{ width: 188, height: 2, background: MENU_LINE_GOLD }} />
      <svg width="32" height="28" viewBox="0 0 16 14">
        <path
          d="M8 12.4S2.2 8.6 2.2 5.2C2.2 3.2 3.7 2 5.2 2c.9 0 1.7.4 2.2 1.2C7.9 2.4 8.7 2 9.6 2c1.5 0 3 1.2 3 3.2 0 3.4-4.6 7.2-4.6 7.2z"
          fill={MENU_LINE_GOLD}
        />
      </svg>
      <span style={{ width: 188, height: 2, background: MENU_LINE_GOLD }} />
    </div>
  );
}

function CocktailPaper() {
  const cropX = (1024 - COCKTAIL_W) / 2;
  const frame: CSSProperties = {
    position: 'absolute',
    width: 1024,
    height: 1536,
    maxWidth: 'none',
    maxHeight: 'none',
  };
  return (
    <>
      <div aria-hidden className="absolute overflow-hidden" style={{ top: 0, left: 0, width: COCKTAIL_W, height: 420, zIndex: 0 }}>
        <img src="/menu-blank.png" alt="" style={{ ...frame, left: -cropX, top: 0 }} />
      </div>
      <div aria-hidden className="absolute overflow-hidden" style={{ right: 0, bottom: 0, width: 240, height: 320, zIndex: 0 }}>
        <img src="/menu-blank.png" alt="" style={{ ...frame, right: 0, bottom: 0 }} />
      </div>
    </>
  );
}

function CocktailLogo() {
  const coverW = 284;
  return (
    <>
      <PaperPatch top={0} left={(COCKTAIL_W - coverW) / 2} width={coverW} height={378} />
      <BlankCrop boxTop={26} boxW={280} boxH={250} srcTop={18} scale={0.64} zIndex={2} pageW={COCKTAIL_W} />
    </>
  );
}

function MenuMonogram() {
  const coverW = 420;
  const coverH = 400;
  const coverTop = 0;
  const coverLeft = (1024 - coverW) / 2;
  const tsH = 260;
  const tsTop = 12;
  const menuTop = tsTop + tsH * MENU_TS_SCALE + 10;
  const imgStyle: CSSProperties = {
    position: 'absolute',
    width: 1024,
    height: 1536,
    maxWidth: 'none',
    maxHeight: 'none',
  };
  return (
    <>
      <div
        aria-hidden
        className="absolute overflow-hidden"
        style={{ top: coverTop, left: coverLeft, width: coverW, height: coverH, zIndex: 0 }}
      >
        <img src="/menu-blank.png" alt="" style={{ ...imgStyle, left: -coverLeft, top: -720 }} />
      </div>
      <BlankCrop boxTop={tsTop} boxW={400} boxH={tsH} srcTop={16} scale={MENU_TS_SCALE} zIndex={1} />
      <div
        dir="ltr"
        className="absolute flex flex-col items-center"
        style={{ top: menuTop, left: 0, right: 0, zIndex: 2 }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: Math.round(46 * MENU_WORD_SCALE),
            fontWeight: 500,
            letterSpacing: '0.4em',
            paddingLeft: '0.4em',
            color: NAVY,
            lineHeight: 1,
          }}
        >
          MENU
        </p>
        <span aria-hidden style={{ width: 128, height: 2, background: MENU_LINE_GOLD, marginTop: 10 }} />
      </div>
    </>
  );
}

function CoupleMark({ height }: { height: number }) {
  return (
    <span aria-hidden className="relative inline-block" style={{ height, mixBlendMode: 'multiply' }}>
      <img src="/couple-olive.png" alt="" style={{ height, maxWidth: 'none', visibility: 'hidden' }} />
      <span
        className="absolute inset-0"
        style={{
          backgroundColor: NAVY,
          WebkitMaskImage: 'url(/couple-olive.png)',
          maskImage: 'url(/couple-olive.png)',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
    </span>
  );
}

function MenuFooter({ large = false, top }: { large?: boolean; top?: number }) {
  const nameSize = large ? 46 : 32;
  const dateSize = large ? 34 : 24;
  const ampSize = large ? 40 : 28;
  return (
    <div
      className="absolute flex items-center justify-center"
      dir="ltr"
      style={{
        top: top ?? (large ? 1356 : 1370),
        left: 0,
        right: 0,
        gap: 18,
        fontFamily: MENU_SERIF,
        color: NAVY,
        zIndex: 4,
      }}
    >
      <span style={{ transform: 'translateX(-28px)' }}>
        <CoupleMark height={MENU_COUPLE_HEIGHT} />
      </span>
      <div dir="rtl" className="flex flex-col items-center">
        <p className="flex items-baseline justify-center" style={{ fontSize: nameSize, fontWeight: 500, gap: 10, letterSpacing: '0.08em' }}>
          <span>טל</span>
          <Ampersand size={ampSize} />
          <span>שקד</span>
        </p>
        <p dir="ltr" style={{ fontSize: dateSize, fontWeight: 500, letterSpacing: '0.3em', marginTop: 6 }}>
          29.10.2026
        </p>
      </div>
    </div>
  );
}

function DishBlock({
  top,
  bottom,
  nameSize,
  descSize,
  gap,
}: {
  top: number;
  bottom?: number;
  nameSize: number;
  descSize: number;
  gap?: number;
}) {
  return (
    <div
      className={`absolute flex flex-col items-center ${bottom != null ? 'justify-between' : ''}`}
      style={{ top, bottom, left: 0, right: 0, marginInline: 'auto', width: 600, gap: bottom != null ? undefined : gap }}
    >
      {MENU_DISHES.map((dish) => (
        <div key={dish.name} style={{ width: '100%' }}>
          <h2 style={{ fontSize: nameSize, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.15 }}>{dish.name}</h2>
          <p style={{ fontSize: descSize, fontWeight: 400, lineHeight: 1.35, marginTop: 4, letterSpacing: '0.03em' }}>
            {dish.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

function StarterList({ top, fontSize }: { top: number; fontSize: number }) {
  return (
    <p
      className="absolute flex flex-wrap items-center justify-center"
      style={{
        top,
        left: 0,
        right: 0,
        marginInline: 'auto',
        width: 720,
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

function CocktailMark({ kind, size }: { kind: 'martini' | 'wine' | 'cheers'; size: number }) {
  const Icon = kind === 'martini' ? GiMartini : kind === 'wine' ? GiWineGlass : GiGlassCelebration;
  return <Icon size={size} color={GOLD} aria-hidden />;
}

function ScatteredCocktails() {
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

function CocktailList() {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ top: 324, left: 0, right: 0, marginInline: 'auto', width: 540, zIndex: 4, gap: 40 }}
    >
      {COCKTAILS.map((drink) => (
        <div key={drink.name} className="flex flex-col items-center" style={{ width: '100%' }}>
          <h2 style={{ fontSize: 44, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.15 }}>
            {drink.name}
          </h2>
          <div className="flex flex-col items-center" style={{ marginTop: 6, gap: 2 }}>
            {drink.lines.map((line) => (
              <p
                key={line.join('|')}
                className="flex flex-nowrap items-center justify-center"
                style={{ fontSize: 22, fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.35 }}
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

function HennaLogo({ width }: { width: number }) {
  const height = width * (328 / 306);
  return (
    <img
      src="/logo-henna.png?v=user"
      alt="T&S"
      style={{
        width,
        height,
        maxWidth: 'none',
        display: 'block',
      }}
    />
  );
}

function QrOverlay() {
  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{
        color: LOGO_BURGUNDY,
        fontFamily: MENU_SERIF,
        paddingTop: 52,
        paddingBottom: 64,
        zIndex: 2,
      }}
    >
      <HennaLogo width={176} />
      <h1
        style={{
          marginTop: 28,
          fontSize: 68,
          fontWeight: 500,
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          color: LOGO_BURGUNDY,
        }}
      >
        החינה של טל ושקד
      </h1>
      <img
        src="/qrcode_hena.app.link.png"
        alt="קוד QR למתנה בפייבוקס"
        style={{
          width: 360,
          height: 360,
          display: 'block',
          marginTop: 16,
          mixBlendMode: 'multiply',
        }}
      />
      <p
        style={{
          marginTop: 4,
          fontSize: 44,
          fontWeight: 400,
          letterSpacing: '0.06em',
          color: LOGO_BURGUNDY,
        }}
      >
        למתנה בפייבוקס, סרקו כאן
      </p>
    </div>
  );
}

function MenuOverlay({ variant }: { variant: 'menu' | 'starters' | 'cocktails' }) {
  const intro = (
    <>
      אורחים יקרים
      <br />
      הארוחה תוגש בקונספט מסעדה
      <br />
      מומלץ לטעום ולהנות מהמנות ללא הגבלה
    </>
  );

  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{ color: NAVY, fontFamily: MENU_SERIF }}
    >
      {variant === 'starters' && <MenuMonogram />}
      {variant === 'menu' && (
        <span
          aria-hidden
          className="absolute"
          style={{
            top: 259,
            left: 0,
            right: 0,
            marginInline: 'auto',
            width: 128,
            height: 2,
            background: MENU_LINE_GOLD,
          }}
        />
      )}
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
          <HeartRule top={780} />
          <ScatteredCocktails />
          <CocktailList />
        </>
      ) : variant === 'starters' ? (
        <>
          <p
            className="absolute"
            style={{
              top: 230,
              left: 0,
              right: 0,
              marginInline: 'auto',
              width: 720,
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '0.02em',
            }}
          >
            {intro}
          </p>
          <h1
            className="absolute"
            style={{
              top: 358,
              left: 0,
              right: 0,
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            ראשונות
          </h1>
          <StarterList top={416} fontSize={20} />
          <h1
            className="absolute"
            style={{
              top: 600,
              left: 0,
              right: 0,
              fontSize: 60,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            עיקריות
          </h1>
          <DishBlock top={700} nameSize={35} descSize={22} gap={45} />
        </>
      ) : (
        <>
          <div
            className="absolute flex flex-col items-center"
            style={{ top: 368, left: 0, right: 0, marginInline: 'auto', width: 720 }}
          >
            <h1 style={{ fontSize: 64, fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.15 }}>עיקריות</h1>
            <p style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.45, marginTop: 10, letterSpacing: '0.02em' }}>
              {intro}
            </p>
          </div>
          <div
            className="absolute flex flex-col items-center justify-evenly"
            style={{ top: 575, bottom: 230, left: 0, right: 0, marginInline: 'auto', width: 500 }}
          >
            {MENU_DISHES.map((dish) => (
              <div key={dish.name} style={{ width: '100%' }}>
                <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.2 }}>{dish.name}</h2>
                <p style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.45, marginTop: 6, letterSpacing: '0.04em' }}>
                  {dish.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <MenuFooter top={variant === 'cocktails' ? 828 : undefined} />
    </div>
  );
}

function Flourish({ width = 176, scale = 1 }: { width?: number; scale?: number }) {
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

const ink: CSSProperties = {
  color: OLIVE,
  fontFamily: SERIF,
  fontWeight: 300,
  mixBlendMode: 'multiply',
  opacity: 0.95,
  filter: 'blur(0.2px)',
  textShadow: '0 0 0.5px rgba(63,74,44,0.45)',
};

function Ampersand({ size = 34, color = GOLD }: { size?: number; color?: string }) {
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

function Artwork({
  logoWidth,
  coupleHeight,
  gap = 8,
}: {
  logoWidth: number;
  coupleHeight: number;
  gap?: number;
}) {
  return (
    <div className="flex flex-col items-center" style={{ gap }}>
      <img
        src="/logo-hires.png"
        alt="T&S monogram"
        style={{ width: logoWidth, mixBlendMode: 'multiply' }}
      />
      <img
        src="/couple-olive.png"
        alt=""
        style={{ height: coupleHeight, mixBlendMode: 'multiply' }}
      />
    </div>
  );
}

function InvitationCopy({
  view,
  namesSize = 38,
  ampSize = 34,
}: {
  view: LayoutId;
  namesSize?: number;
  ampSize?: number;
}) {
  const single = view === 'single';
  const shift = (n: number) => (single ? undefined : `translateX(${n}px)`);
  const t = single
    ? {
        intro: 30,
        dateHe: 28,
        dateEn: 32,
        venue: 34,
        times: 28,
        parents: 28,
        label: 25,
        line: 440,
        namesGap: 14,
      }
    : {
        intro: 15,
        dateHe: 15,
        dateEn: 17,
        venue: 18,
        times: 14,
        parents: 12,
        label: 11,
        line: 210,
        namesGap: 12,
      };

  return (
    <>
      <p style={{ fontSize: t.intro, lineHeight: 1.55, letterSpacing: '0.05em' }}>
        אנו שמחים להזמינכם לחגוג עמנו
        <br />
        את יום חתונתנו
      </p>

      <h1
        className="flex items-baseline leading-none"
        style={{ letterSpacing: '0.06em', fontSize: namesSize, gap: t.namesGap }}
      >
        <span>טל</span>
        <Ampersand size={ampSize} />
        <span>שקד</span>
      </h1>

      <div style={{ lineHeight: 1.55, transform: shift(6) }}>
        <p style={{ fontSize: t.dateHe, letterSpacing: '0.06em' }}>יום חמישי, י״ח בחשון התשפ״ז</p>
        <p dir="ltr" style={{ fontSize: t.dateEn, letterSpacing: '0.22em', color: GOLD }}>
          29.10.2026
        </p>
      </div>

      <p style={{ fontSize: t.venue, letterSpacing: '0.07em', transform: shift(7) }}>״בדולינה״, רעננה</p>

      <div style={{ fontSize: t.times, lineHeight: 1.55, letterSpacing: '0.04em', transform: shift(12) }}>
        <p>קבלת פנים: 19:30</p>
        <p>חופה וקידושין: 20:30</p>
      </div>

      <div
        className="flex flex-col items-center"
        style={{
          fontSize: t.parents,
          lineHeight: 1.5,
          letterSpacing: '0.03em',
          gap: single ? 8 : 6,
          width: single ? '100%' : undefined,
        }}
      >
        {single && (
          <img
            src="/couple-olive.png"
            alt=""
            style={{ height: 96, mixBlendMode: 'multiply', marginBottom: 18 }}
          />
        )}
        <span
          className="h-px"
          style={{
            background: GOLD,
            opacity: 0.55,
            width: t.line,
            transform: single ? undefined : view === 'landscape' ? 'translateX(10px)' : 'translateX(12px)',
          }}
        />
        <div
          className="flex items-start text-center"
          style={{
            width: single ? t.line : undefined,
            justifyContent: single ? 'space-between' : 'center',
            gap: single ? undefined : 24,
          }}
        >
          <div style={{ transform: shift(22) }}>
            <p style={{ fontSize: t.label, letterSpacing: '0.14em', color: GOLD }}>הורי הכלה</p>
            <p>ניסים ומירה בר</p>
          </div>
          <div>
            <p style={{ fontSize: t.label, letterSpacing: '0.14em', color: GOLD }}>הורי החתן</p>
            <p>איתן ודליה שושן</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function InvitationPhoto() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<LayoutId>('qr');
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const layout = LAYOUTS[view];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / layout.w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout.w]);

  async function handleExport() {
    if (!sceneRef.current || busy) return;
    setBusy(true);
    try {
      const fontEmbedCSS = await buildFontEmbedCss();
      const dataUrl = await toPng(sceneRef.current, {
        pixelRatio: layout.id === 'single' ? 1 : 2,
        cacheBust: true,
        width: layout.w,
        height: layout.h,
        style: { transform: 'none', margin: '0' },
        ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
      });
      const a = document.createElement('a');
      a.download =
        layout.id === 'qr'
          ? 'hena-paybox.png'
          : layout.id === 'menu'
            ? 'menu.png'
            : layout.id === 'starters'
              ? 'menu-starters.png'
              : layout.id === 'cocktails'
                ? 'menu-cocktails.png'
                : `invitation-${layout.id}.png`;
      a.href = dataUrl;
      a.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#e9dfcf] px-2 pb-14 pt-28 sm:px-6">
      <div className="fixed inset-x-4 top-4 z-10 flex flex-wrap gap-2">
        {(Object.keys(LAYOUTS) as LayoutId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition ${
              view === id ? 'bg-[#3c3a28] text-[#f6efe0]' : 'bg-[#f6efe0] text-[#3c3a28] hover:bg-white'
            }`}
          >
            {LAYOUTS[id].label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleExport}
          disabled={busy}
          className="ms-auto rounded-full bg-[#3c3a28] px-5 py-2 text-sm font-semibold text-[#f6efe0] shadow-lg transition hover:bg-[#4d4a34] disabled:opacity-60"
        >
          {busy ? 'Exporting…' : 'Download PNG'}
        </button>
      </div>

      <div ref={wrapRef} className="mx-auto w-full overflow-hidden" style={{ maxWidth: layout.w }}>
        <div style={{ height: layout.h * scale }}>
          <div style={{ width: layout.w, height: layout.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <div
              ref={sceneRef}
              className="relative overflow-hidden"
              style={{
                width: layout.w,
                height: layout.h,
                background:
                  layout.id === 'cocktails'
                    ? PAPER
                    : `url(${layout.src}) center / ${layout.id === 'single' ? 'cover' : '100% 100%'} no-repeat`,
              }}
            >
              {layout.id === 'qr' ? (
                <QrOverlay />
              ) : layout.id === 'menu' || layout.id === 'starters' || layout.id === 'cocktails' ? (
                <MenuOverlay variant={layout.id} />
              ) : layout.id === 'single' ? (
                <div
                  dir="rtl"
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    ...place(layout.card, CANON_SINGLE),
                    ...ink,
                    padding: '32px 28px 40px',
                  }}
                >
                  <img
                    src="/logo-hires.png"
                    alt="T&S monogram"
                    style={{ width: 104, mixBlendMode: 'multiply' }}
                  />
                  <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-between">
                    <Flourish width={300} scale={1.35} />
                    <InvitationCopy view={view} namesSize={72} ampSize={60} />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="absolute flex flex-col items-center justify-center gap-2"
                    style={place(layout.left, CANON_LEFT)}
                  >
                    <div className="flex flex-col items-center gap-2" style={{ transform: 'translateX(10px)' }}>
                      <Artwork logoWidth={56} coupleHeight={100} />
                    </div>
                  </div>

                  <div
                    dir="rtl"
                    className="absolute flex flex-col items-center justify-between text-center"
                    style={{
                      ...place(layout.right, CANON_RIGHT),
                      ...ink,
                      padding: '8px 16px 10px',
                    }}
                  >
                    <Flourish />
                    <InvitationCopy view={view} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
