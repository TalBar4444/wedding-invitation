import { useEffect, useRef } from 'react';
import { HeartLine } from '@/components/menu/HeartRule';
import { coupleTogether } from '@/content/couple';
import { weddingCopy } from '@/content/wedding';
import { MENU_SERIF, NAVY } from '@/theme/tokens';

/** The monogram inside logo_blue.jpeg, clear of the extra cream margin. */
const LOGO_CROP = { x: 222, y: 146, w: 859, h: 928 };
const LOGO_PAPER = { r: 253, g: 249, b: 240 };

function BlueLogo({ width }: { width: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const height = Math.round(width * (LOGO_CROP.h / LOGO_CROP.w));

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancel = false;
    const img = new Image();
    img.onload = () => {
      if (cancel) return;
      const src = document.createElement('canvas');
      src.width = img.width;
      src.height = img.height;
      const srcCtx = src.getContext('2d');
      if (!srcCtx) return;
      srcCtx.drawImage(img, 0, 0);
      const frame = srcCtx.getImageData(LOGO_CROP.x, LOGO_CROP.y, LOGO_CROP.w, LOGO_CROP.h);
      const px = frame.data;
      for (let i = 0; i < px.length; i += 4) {
        const dist = Math.hypot(px[i] - LOGO_PAPER.r, px[i + 1] - LOGO_PAPER.g, px[i + 2] - LOGO_PAPER.b);
        if (dist < 28) px[i + 3] = 0;
        else if (dist < 48) px[i + 3] = Math.round(((dist - 28) / 20) * 255);
      }
      canvas.width = LOGO_CROP.w;
      canvas.height = LOGO_CROP.h;
      canvas.getContext('2d')?.putImageData(frame, 0, 0);
    };
    img.src = '/logo_blue.jpeg';
    return () => {
      cancel = true;
    };
  }, []);

  return <canvas ref={ref} role="img" aria-label="T&S" style={{ width, height, display: 'block' }} />;
}

const titleStyle = {
  fontWeight: 500,
  letterSpacing: '0.03em',
  lineHeight: 1.2,
  color: NAVY,
} as const;

const captionStyle = {
  fontWeight: 400,
  letterSpacing: '0.06em',
  color: NAVY,
} as const;

export function WeddingQrOverlay({ orientation = 'portrait' }: { orientation?: 'portrait' | 'landscape' }) {
  if (orientation === 'landscape') {
    return (
      <div
        dir="rtl"
        className="absolute inset-0 flex flex-col items-center text-center"
        style={{
          color: NAVY,
          fontFamily: MENU_SERIF,
          paddingTop: 64,
          paddingBottom: 52,
          zIndex: 2,
        }}
      >
        <BlueLogo width={156} />
        <div className="flex flex-col items-center" style={{ gap: 12, marginTop: 20 }}>
          <HeartLine width={320} />
          <h1 style={{ ...titleStyle, fontSize: 56 }}>
            {weddingCopy.qrTitlePrefix} {coupleTogether}
          </h1>
        </div>
        <img
          src="/qrcode_hena.app.link.png"
          alt="קוד QR למתנה בפייבוקס"
          style={{
            width: 300,
            height: 300,
            display: 'block',
            marginTop: 16,
            mixBlendMode: 'multiply',
          }}
        />
        <p style={{ ...captionStyle, marginTop: 4, fontSize: 36 }}>{weddingCopy.qrCaption}</p>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{
        color: NAVY,
        fontFamily: MENU_SERIF,
        justifyContent: 'center',
        gap: 36,
        paddingTop: 96,
        paddingBottom: 120,
        zIndex: 2,
      }}
    >
      <BlueLogo width={200} />
      <div className="flex flex-col items-center" style={{ gap: 16 }}>
        <HeartLine width={340} />
        <h1 style={{ ...titleStyle, fontSize: 64 }}>
          {weddingCopy.qrTitlePrefix} {coupleTogether}
        </h1>
      </div>
      <img
        src="/qrcode_hena.app.link.png"
        alt="קוד QR למתנה בפייבוקס"
        style={{
          width: 380,
          height: 380,
          display: 'block',
          mixBlendMode: 'multiply',
        }}
      />
      <p style={{ ...captionStyle, fontSize: 36 }}>{weddingCopy.qrCaption}</p>
    </div>
  );
}
