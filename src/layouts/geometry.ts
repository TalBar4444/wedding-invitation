import type { CSSProperties } from 'react';
import type { Face } from './types';

/** The design is authored at this size, then scaled onto each photo's cards. */
export const CANON_LEFT = { w: 260, h: 360 };
export const CANON_RIGHT = { w: 248, h: 400 };
export const CANON_SINGLE = { w: 600, h: 980 };

export function place(face: Face, canon: { w: number; h: number }): CSSProperties {
  return {
    left: face.cx - canon.w / 2,
    top: face.cy - canon.h / 2,
    width: canon.w,
    height: canon.h,
    transform: `rotate(${face.rot}deg) scale(${face.scale})`,
    transformOrigin: 'center center',
  };
}
