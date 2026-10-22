export type Face = { cx: number; cy: number; rot: number; scale: number };
export type LayoutId =
  | 'landscape'
  | 'portrait'
  | 'single'
  | 'wedding'
  | 'weddingFront'
  | 'weddingBack'
  | 'menu'
  | 'starters'
  | 'cocktails'
  | 'qr'
  | 'weddingQr'
  | 'weddingQrLandscape'
  | 'henna';
export type BaseLayout = {
  id: LayoutId;
  label: string;
  src: string;
  w: number;
  h: number;
};
export type TwoCardLayout = BaseLayout & { id: 'landscape' | 'portrait'; left: Face; right: Face };
export type SingleCardLayout = BaseLayout & { id: 'single'; card: Face };
export type WeddingLayout = BaseLayout & { id: 'wedding' | 'weddingFront' | 'weddingBack' };
export type MenuLayout = BaseLayout & { id: 'menu' };
export type StartersLayout = BaseLayout & { id: 'starters' };
export type CocktailsLayout = BaseLayout & { id: 'cocktails' };
export type QrLayout = BaseLayout & { id: 'qr' };
export type WeddingQrLayout = BaseLayout & { id: 'weddingQr' | 'weddingQrLandscape' };
export type HennaLayout = BaseLayout & { id: 'henna' };
export type Layout =
  | TwoCardLayout
  | SingleCardLayout
  | WeddingLayout
  | MenuLayout
  | StartersLayout
  | CocktailsLayout
  | QrLayout
  | WeddingQrLayout
  | HennaLayout;
export type MenuVariant = 'menu' | 'starters' | 'cocktails';
