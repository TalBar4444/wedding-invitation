import type { CSSProperties } from 'react';

// Olive ink sampled from couple-olive.png, shifted a little greener so it reads as sage on the paper.
export const OLIVE = '#3f4a2c';
export const GOLD = '#98753f';
export const MENU_LINE_GOLD = '#c29450';
export const NAVY = '#1A365D';
export const LOGO_BURGUNDY = '#94160c';
/** Ink sampled from the henna invitation frame so the type matches the border. */
export const HENNA_RED = '#ee1a0e';
export const PAPER = '#FBF8F2';
export const SERIF = "'Noto Serif Hebrew', 'Frank Ruhl Libre', serif";
export const MENU_SERIF = "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif";

export const ink: CSSProperties = {
  color: OLIVE,
  fontFamily: SERIF,
  fontWeight: 300,
  mixBlendMode: 'multiply',
  opacity: 0.95,
  filter: 'blur(0.2px)',
  textShadow: '0 0 0.5px rgba(63,74,44,0.45)',
};
