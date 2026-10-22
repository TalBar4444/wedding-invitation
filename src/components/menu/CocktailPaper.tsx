import type { CSSProperties } from 'react';
import { COCKTAIL_W } from '@/layouts/registry';

export function CocktailPaper() {
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
