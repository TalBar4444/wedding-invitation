import type { CSSProperties, ReactNode } from 'react';
import { WEDDING_FACE_H, WEDDING_FACE_W } from '@/layouts/registry';
import { OLIVE, SERIF, ink } from '@/theme/tokens';
import { Artwork } from './Artwork';
import { Flourish } from './Flourish';
import { InvitationCopy } from './InvitationCopy';

/** Inside the deckled sheet, clear of the torn edge. */
const faceInset: CSSProperties = {
  left: 115,
  right: 115,
  top: 195,
  bottom: 190,
};

/** Solid ink. Multiply would vanish once the paper behind it is gone. */
const clearInk: CSSProperties = {
  color: OLIVE,
  fontFamily: SERIF,
  fontWeight: 300,
};

export function WeddingPaperScene({ side }: { side?: 'front' | 'back' }) {
  if (!side) {
    return (
      <div className="absolute inset-0 flex" dir="ltr">
        <PaperFace>
          <Cover />
        </PaperFace>
        <PaperFace>
          <Details sheet />
        </PaperFace>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" dir="ltr">
      <div dir="rtl" className="absolute flex flex-col items-center text-center" style={{ ...faceInset, ...clearInk }}>
        {side === 'front' ? <Cover flat /> : <Details sheet />}
      </div>
    </div>
  );
}

function PaperFace({ children }: { children: ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: WEDDING_FACE_W, height: WEDDING_FACE_H }}>
      <img
        src="/portrait_paper.png"
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div dir="rtl" className="absolute flex flex-col items-center text-center" style={{ ...faceInset, ...ink }}>
        {children}
      </div>
    </div>
  );
}

/** Same stack as the portrait left card, enlarged for this sheet. */
function Cover({ flat = false }: { flat?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Artwork logoWidth={160} coupleHeight={300} gap={18} flat={flat} />
    </div>
  );
}

/** Portrait right card (248×400, padding, flourish, copy) scaled onto this sheet. */
function Details({ sheet = false }: { sheet?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="flex flex-col items-center justify-between text-center"
        style={{
          width: 248,
          height: 400,
          padding: '8px 16px 10px',
          transform: 'scale(2.45)',
          transformOrigin: 'center center',
        }}
      >
        <Flourish />
        <InvitationCopy view={sheet ? 'wedding' : 'portrait'} />
      </div>
    </div>
  );
}
