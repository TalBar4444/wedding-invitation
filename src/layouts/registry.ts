import type { Layout, LayoutId } from './types';

/** Cocktail card is a short, narrow brochure, not the full menu sheet. */
export const COCKTAIL_W = 760;
export const COCKTAIL_H = 1000;

/** One face of the wedding card, without the paper photo. */
export const WEDDING_FACE_W = 1060;
export const WEDDING_FACE_H = 1484;

/** ראשונות sheet is a 12cm × 24cm card. */
export const MENU_W = 454;
export const MENU_H = 908;
/** Coordinates the starters layout is designed in, then scaled onto the card. */
export const STARTERS_DESIGN_W = 1024;
export const STARTERS_DESIGN_H = 2048;

export const MENU_TS_SCALE = 0.55;
export const MENU_WORD_SCALE = 0.7;
export const MENU_COUPLE_HEIGHT = 118;

export const LAYOUTS: Record<LayoutId, Layout> = {
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
  wedding: {
    id: 'wedding',
    label: 'הזמנה חתונה',
    src: '/portrait_paper.png',
    w: WEDDING_FACE_W * 2,
    h: WEDDING_FACE_H,
  },
  weddingFront: {
    id: 'weddingFront',
    label: 'הזמנה אחורי',
    src: '',
    w: WEDDING_FACE_W,
    h: WEDDING_FACE_H,
  },
  weddingBack: {
    id: 'weddingBack',
    label: 'הזמנה קדמי',
    src: '',
    w: WEDDING_FACE_W,
    h: WEDDING_FACE_H,
  },
  menu: {
    id: 'menu',
    label: 'עיקריות',
    src: '/menu-blank.png',
    w: MENU_W,
    h: MENU_H,
  },
  starters: {
    id: 'starters',
    label: 'ראשונות',
    src: '/menu-blank.png',
    w: MENU_W,
    h: MENU_H,
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
    label: 'חינה-פייבוקס',
    src: '/hena_bg.png',
    w: 1672,
    h: 941,
  },
  weddingQr: {
    id: 'weddingQr',
    label: 'חתונה-פייבוקס',
    src: '/elegant-bg.png',
    w: 1024,
    h: 1536,
  },
  weddingQrLandscape: {
    id: 'weddingQrLandscape',
    label: 'חתונה-פייבוקס לרוחב',
    src: '/elegant-ba-landscape.png',
    w: 1536,
    h: 1024,
  },
  henna: {
    id: 'henna',
    label: 'הזמנת חינה',
    src: '/henna_invetation_bg.png?v=pendant',
    w: 1024,
    h: 1360,
  },
};
