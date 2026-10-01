import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { toPng } from 'html-to-image';

// Olive ink sampled from couple-olive.png, shifted a little greener so it reads as sage on the paper.
const OLIVE = '#3f4a2c';
const GOLD = '#98753f';
const SERIF = "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif";

const FONTS_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@300;400&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;500&display=swap';

/** The design is authored at this size, then scaled onto each photo's cards. */
const CANON_LEFT = { w: 260, h: 360 };
const CANON_RIGHT = { w: 248, h: 400 };

type Face = { cx: number; cy: number; rot: number; scale: number };
type LayoutId = 'landscape' | 'portrait';
type Layout = {
  id: LayoutId;
  label: string;
  src: string;
  w: number;
  h: number;
  left: Face;
  right: Face;
};

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
};

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

function Flourish() {
  return (
    <div className="flex w-[176px] items-center gap-2.5" aria-hidden>
      <span className="h-px flex-1" style={{ background: GOLD, opacity: 0.65 }} />
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden>
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

export default function InvitationPhoto() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<LayoutId>('landscape');
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
        pixelRatio: 2,
        cacheBust: true,
        width: layout.w,
        height: layout.h,
        style: { transform: 'none', margin: '0' },
        ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
      });
      const a = document.createElement('a');
      a.download = `invitation-${layout.id}.png`;
      a.href = dataUrl;
      a.click();
    } finally {
      setBusy(false);
    }
  }

  const label = 'text-[11px] tracking-[0.14em]';

  return (
    <main className="relative min-h-screen bg-[#e9dfcf] px-2 py-14 sm:px-6">
      <div className="fixed left-4 top-4 z-10 flex gap-2">
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
      </div>
      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        className="fixed right-4 top-4 z-10 rounded-full bg-[#3c3a28] px-5 py-2 text-sm font-semibold text-[#f6efe0] shadow-lg transition hover:bg-[#4d4a34] disabled:opacity-60"
      >
        {busy ? 'Exporting…' : 'Download PNG'}
      </button>

      <div ref={wrapRef} className="mx-auto w-full" style={{ maxWidth: layout.w }}>
        <div style={{ height: layout.h * scale }}>
          <div style={{ width: layout.w, height: layout.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <div
              ref={sceneRef}
              className="relative overflow-hidden"
              style={{
                width: layout.w,
                height: layout.h,
                background: `url(${layout.src}) center / 100% 100% no-repeat`,
              }}
            >
              <div className="absolute flex flex-col items-center justify-center gap-2" style={place(layout.left, CANON_LEFT)}>
                <div className="flex flex-col items-center gap-2" style={{ transform: 'translateX(10px)' }}>
                  <img
                    src="/logo-hires.png"
                    alt="T&S monogram"
                    className="w-14"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  <img
                    src="/couple-olive.png"
                    alt=""
                    className="h-[100px]"
                    style={{ mixBlendMode: 'multiply' }}
                  />
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

                <p className="text-[15px]" style={{ lineHeight: 1.55, letterSpacing: '0.05em' }}>
                  אנו שמחים להזמינכם לחגוג עמנו
                  <br />
                  את יום חתונתנו
                </p>

                <h1 className="flex items-baseline gap-3 text-[38px] leading-none" style={{ letterSpacing: '0.06em' }}>
                  <span>טל</span>
                  <span
                    dir="ltr"
                    className="text-[34px] italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD, fontWeight: 500 }}
                  >
                    &amp;
                  </span>
                  <span>שקד</span>
                </h1>

                <div style={{ lineHeight: 1.55, transform: 'translateX(6px)' }}>
                  <p className="text-[15px]" style={{ letterSpacing: '0.06em' }}>
                    יום חמישי, י״ח בחשון התשפ״ז
                  </p>
                  <p className="text-[17px]" dir="ltr" style={{ letterSpacing: '0.22em', color: GOLD }}>
                    29.10.2026
                  </p>
                </div>

                <p className="text-[18px]" style={{ letterSpacing: '0.07em', transform: 'translateX(7px)' }}>
                  ״בדולינה״, רעננה
                </p>

                <div className="text-[14px]" style={{ lineHeight: 1.55, letterSpacing: '0.04em', transform: 'translateX(12px)' }}>
                  <p>קבלת פנים: 19:30</p>
                  <p>חופה וקידושין: 20:30</p>
                </div>

                <div className="flex flex-col items-center gap-1.5 text-[12px]" style={{ lineHeight: 1.5, letterSpacing: '0.03em' }}>
                  <span
                    className="h-px"
                    style={{
                      background: GOLD,
                      opacity: 0.55,
                      width: 210,
                      transform: view === 'landscape' ? 'translateX(10px)' : 'translateX(12px)',
                    }}
                  />
                  <div className="flex items-start justify-center gap-6 text-center">
                    <div style={{ transform: 'translateX(22px)' }}>
                      <p className={label} style={{ color: GOLD }}>הורי הכלה</p>
                      <p>ניסים ומירה בר</p>
                    </div>
                    <div>
                      <p className={label} style={{ color: GOLD }}>הורי החתן</p>
                      <p>איתן ודליה שושן</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
