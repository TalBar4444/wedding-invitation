import { toPng } from 'html-to-image';
import type { Layout } from '@/layouts/types';
import { buildFontEmbedCss } from './fonts';

function filenameFor(layout: Layout): string {
  switch (layout.id) {
    case 'qr':
      return 'hena-paybox.png';
    case 'weddingQr':
      return 'wedding-paybox.png';
    case 'weddingQrLandscape':
      return 'wedding-paybox-landscape.png';
    case 'henna':
      return 'henna-invitation.png';
    case 'wedding':
      return 'wedding-invitation.png';
    case 'weddingFront':
      return 'wedding-invitation-back.png';
    case 'weddingBack':
      return 'wedding-invitation-front.png';
    case 'menu':
      return 'menu.png';
    case 'starters':
      return 'menu-starters.png';
    case 'cocktails':
      return 'menu-cocktails.png';
    default:
      return `invitation-${layout.id}.png`;
  }
}

export async function exportScenePng(scene: HTMLElement, layout: Layout): Promise<void> {
  const fontEmbedCSS = await buildFontEmbedCss();
  const dataUrl = await toPng(scene, {
    pixelRatio: layout.id === 'single' ? 1 : 2,
    cacheBust: true,
    width: layout.w,
    height: layout.h,
    style: { transform: 'none', margin: '0' },
    ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
  });
  const a = document.createElement('a');
  a.download = filenameFor(layout);
  a.href = dataUrl;
  a.click();
}
