import { CANON_LEFT, CANON_RIGHT, CANON_SINGLE, place } from '@/layouts/geometry';
import type { LayoutId, SingleCardLayout, TwoCardLayout } from '@/layouts/types';
import { ink } from '@/theme/tokens';
import { Artwork } from './Artwork';
import { Flourish } from './Flourish';
import { InvitationCopy } from './InvitationCopy';

export function WeddingScene({
  layout,
  view,
}: {
  layout: TwoCardLayout | SingleCardLayout;
  view: LayoutId;
}) {
  if (layout.id === 'single') {
    return (
      <div
        dir="rtl"
        className="absolute flex flex-col items-center text-center"
        style={{
          ...place(layout.card, CANON_SINGLE),
          ...ink,
          padding: '32px 28px 40px',
        }}
      >
        <img
          src="/logo-olive.png"
          alt="T&S monogram"
          style={{ width: 104, mixBlendMode: 'multiply' }}
        />
        <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-between">
          <Flourish width={300} scale={1.35} />
          <InvitationCopy view={view} namesSize={72} ampSize={60} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="absolute flex flex-col items-center justify-center gap-2"
        style={place(layout.left, CANON_LEFT)}
      >
        <div className="flex flex-col items-center gap-2" style={{ transform: 'translateX(10px)' }}>
          <Artwork logoWidth={56} coupleHeight={100} />
        </div>
      </div>

      <div
        dir="rtl"
        className="absolute flex flex-col items-center justify-between text-center"
        style={{
          ...place(layout.right, CANON_RIGHT),
          ...ink,
          padding: '8px 16px 10px',
        }}
      >
        <Flourish />
        <InvitationCopy view={view} />
      </div>
    </>
  );
}
