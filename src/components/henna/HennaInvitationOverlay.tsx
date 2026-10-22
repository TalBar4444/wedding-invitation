import type { CSSProperties } from 'react';
import { coupleTogether } from '@/content/couple';
import { hennaCopy } from '@/content/henna';
import { HENNA_RED, LOGO_BURGUNDY, MENU_SERIF, SERIF } from '@/theme/tokens';
import { HennaFlower } from './HennaFlower';
import { HennaLogo } from './HennaLogo';
import { HennaRule } from './HennaRule';

export function HennaInvitationOverlay() {
  const latin: CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 500,
    letterSpacing: '0.02em',
  };

  return (
    <div
      dir="rtl"
      className="absolute inset-0 flex flex-col items-center text-center"
      style={{
        color: HENNA_RED,
        fontFamily: MENU_SERIF,
        paddingTop: 404,
        paddingBottom: 72,
        justifyContent: 'flex-start',
        gap: 48,
        zIndex: 2,
      }}
    >
      <div className="flex flex-col items-center">
        <p style={{ fontSize: 56, fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.15, color: LOGO_BURGUNDY }}>
          {hennaCopy.ceremonyTitle}
        </p>
        <div className="flex items-center" style={{ gap: 16, marginTop: 10 }}>
          <HennaFlower />
          <h1 style={{ fontSize: 92, fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1, color: LOGO_BURGUNDY }}>
            {coupleTogether}
          </h1>
          <HennaFlower />
        </div>
      </div>

      <div className="flex flex-col items-center" style={{ gap: 14 }}>
        <p style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.25, transform: 'translateY(-22px)' }}>
          {hennaCopy.invite}
        </p>
        <HennaRule />
        <div style={{ lineHeight: 1.3, fontFamily: SERIF }}>
          <p style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em' }}>{hennaCopy.dateHe}</p>
          <p dir="ltr" style={{ fontSize: 42, fontWeight: 400, letterSpacing: '0.12em', marginTop: 2 }}>
            {hennaCopy.dateEn}
          </p>
        </div>
        <HennaRule />
        <div style={{ lineHeight: 1.3 }}>
          <p style={{ fontSize: 44, fontWeight: 500, letterSpacing: '0.03em' }}>
            <span dir="ltr" style={{ ...latin, fontSize: 46, unicodeBidi: 'isolate' }}>
              {hennaCopy.venueLatin}
            </span>{' '}
            <span style={{ unicodeBidi: 'isolate' }}>{hennaCopy.venueHebrew}</span>
          </p>
          <p style={{ fontSize: 32, fontWeight: 400, letterSpacing: '0.02em', marginTop: 4 }}>
            {hennaCopy.venueAddress}
          </p>
        </div>
        <HennaRule />
        <p style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em', transform: 'translateY(22px)' }}>
          {hennaCopy.reception}
        </p>
      </div>

      <HennaLogo width={136} />
    </div>
  );
}
