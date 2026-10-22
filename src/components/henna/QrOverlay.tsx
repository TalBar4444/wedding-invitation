import { coupleTogether } from '@/content/couple';
import { hennaCopy } from '@/content/henna';
import { LOGO_BURGUNDY, MENU_SERIF } from '@/theme/tokens';
import { HennaFlower } from './HennaFlower';
import { HennaLogo } from './HennaLogo';

export function QrOverlay() {
  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{
        color: LOGO_BURGUNDY,
        fontFamily: MENU_SERIF,
        paddingTop: 52,
        paddingBottom: 64,
        zIndex: 2,
      }}
    >
      <HennaLogo width={176} />
      <div className="flex items-center" style={{ gap: 22, marginTop: 28 }}>
        <HennaFlower size={40} />
        <h1
          style={{
            fontSize: 68,
            fontWeight: 500,
            letterSpacing: '0.01em',
            lineHeight: 1.2,
            color: LOGO_BURGUNDY,
          }}
        >
          {hennaCopy.qrTitlePrefix} {coupleTogether}
        </h1>
        <HennaFlower size={40} />
      </div>
      <img
        src="/qrcode_hena.app.link.png"
        alt="קוד QR למתנה בפייבוקס"
        style={{
          width: 360,
          height: 360,
          display: 'block',
          marginTop: 16,
          mixBlendMode: 'multiply',
        }}
      />
      <p
        style={{
          marginTop: 4,
          fontSize: 44,
          fontWeight: 400,
          letterSpacing: '0.06em',
          color: LOGO_BURGUNDY,
        }}
      >
        {hennaCopy.qrCaption}
      </p>
    </div>
  );
}
