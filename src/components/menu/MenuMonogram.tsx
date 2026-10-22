import type { CSSProperties } from 'react';
import { MENU_TS_SCALE, MENU_WORD_SCALE } from '@/layouts/registry';
import { MENU_LINE_GOLD, NAVY } from '@/theme/tokens';
import { BlankCrop } from './BlankCrop';

export function MenuMonogram({ menuScale = 1, logoScale = 1 }: { menuScale?: number; logoScale?: number }) {
  const coverW = 420;
  const coverH = 400;
  const coverTop = 0;
  const coverLeft = (1024 - coverW) / 2;
  const tsH = 260;
  const tsTop = 12;
  const tsScale = MENU_TS_SCALE * logoScale;
  const menuTop = tsTop + tsH * tsScale + 10;
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
      <BlankCrop boxTop={tsTop} boxW={400} boxH={tsH} srcTop={16} scale={tsScale} zIndex={1} />
      <div
        dir="ltr"
        className="absolute flex flex-col items-center"
        style={{ top: menuTop, left: 0, right: 0, zIndex: 2 }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: Math.round(46 * MENU_WORD_SCALE * menuScale),
            fontWeight: 500,
            letterSpacing: '0.4em',
            paddingLeft: '0.4em',
            color: NAVY,
            lineHeight: 1,
          }}
        >
          MENU
        </p>
        <span aria-hidden style={{ width: Math.round(128 * menuScale), height: 2, background: MENU_LINE_GOLD, marginTop: 10 }} />
      </div>
    </>
  );
}
