import type { CSSProperties, RefObject } from 'react';
import { HennaScene } from '@/components/henna/HennaScene';
import { QrOverlay } from '@/components/henna/QrOverlay';
import { MenuOverlay } from '@/components/menu/MenuOverlay';
import { WeddingPaperScene } from '@/components/wedding/WeddingPaperScene';
import { WeddingQrOverlay } from '@/components/wedding/WeddingQrOverlay';
import { WeddingScene } from '@/components/wedding/WeddingScene';
import type { Layout, LayoutId } from '@/layouts/types';
import { PAPER } from '@/theme/tokens';

export function ScaledScene({
  wrapRef,
  sceneRef,
  layout,
  view,
  scale,
}: {
  wrapRef: RefObject<HTMLDivElement | null>;
  sceneRef: RefObject<HTMLDivElement | null>;
  layout: Layout;
  view: LayoutId;
  scale: number;
}) {
  const clearFace = layout.id === 'weddingFront' || layout.id === 'weddingBack';

  const sceneStyle: CSSProperties = {
    width: layout.w,
    height: layout.h,
    ...(clearFace
      ? { backgroundColor: 'transparent' }
      : layout.id === 'wedding'
        ? { backgroundColor: '#e5ddd5' }
      : layout.id === 'menu' || layout.id === 'starters'
        ? { backgroundColor: '#FBF9F2' }
      : layout.id === 'henna'
        ? {
            backgroundColor: '#f7eedb',
            backgroundImage: `url(${layout.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom center',
            backgroundSize: '100% auto',
          }
        : {
            background:
              layout.id === 'cocktails'
                ? PAPER
                : `url(${layout.src}) center / ${layout.id === 'single' ? 'cover' : '100% 100%'} no-repeat`,
          }),
  };

  return (
    <div ref={wrapRef} className="mx-auto w-full overflow-hidden" style={{ maxWidth: layout.w }}>
      <div className="relative" style={{ height: layout.h * scale }}>
        <div className="relative" style={{ width: layout.w, height: layout.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {clearFace && <TransparencyGrid />}
          <div ref={sceneRef} className="relative overflow-hidden" style={sceneStyle}>
            {layout.id === 'qr' ? (
              <QrOverlay />
            ) : layout.id === 'weddingQr' || layout.id === 'weddingQrLandscape' ? (
              <WeddingQrOverlay orientation={layout.id === 'weddingQrLandscape' ? 'landscape' : 'portrait'} />
            ) : layout.id === 'henna' ? (
              <HennaScene src={layout.src} />
            ) : layout.id === 'wedding' ? (
              <WeddingPaperScene />
            ) : layout.id === 'weddingFront' || layout.id === 'weddingBack' ? (
              <WeddingPaperScene side={layout.id === 'weddingFront' ? 'front' : 'back'} />
            ) : layout.id === 'menu' || layout.id === 'starters' || layout.id === 'cocktails' ? (
              <MenuOverlay variant={layout.id} />
            ) : layout.id === 'landscape' || layout.id === 'portrait' || layout.id === 'single' ? (
              <WeddingScene layout={layout} view={view} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Preview only. Sits behind the scene, so the exported PNG stays clear. */
function TransparencyGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundColor: '#efe8dc',
        backgroundImage:
          'linear-gradient(45deg, #d9d0c3 25%, transparent 25%), linear-gradient(-45deg, #d9d0c3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d9d0c3 75%), linear-gradient(-45deg, transparent 75%, #d9d0c3 75%)',
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0',
      }}
    />
  );
}
