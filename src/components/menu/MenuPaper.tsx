import { STARTERS_DESIGN_H } from '@/layouts/registry';

const SRC_W = 1024;
const SRC_H = 1536;
/** Logo, sunburst, and the rule under MENU. */
const TOP_H = 420;
/** Lower rule, names, and the corner leaf, anchored to the foot of the sheet. */
const BOTTOM_H = 340;

export function MenuPaper() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute overflow-hidden" style={{ top: 0, left: 0, width: SRC_W, height: TOP_H }}>
        <img
          src="/menu-blank.png"
          alt=""
          style={{ position: 'absolute', width: SRC_W, height: SRC_H, maxWidth: 'none', top: 0, left: 0 }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute overflow-hidden"
        style={{ top: STARTERS_DESIGN_H - BOTTOM_H, left: 0, width: SRC_W, height: BOTTOM_H }}
      >
        <img
          src="/menu-blank.png"
          alt=""
          style={{
            position: 'absolute',
            width: SRC_W,
            height: SRC_H,
            maxWidth: 'none',
            top: -(SRC_H - BOTTOM_H),
            left: 0,
          }}
        />
      </div>
    </>
  );
}
