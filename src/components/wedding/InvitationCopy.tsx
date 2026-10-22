import { Ampersand } from '@/components/shared/Ampersand';
import { couple } from '@/content/couple';
import { weddingCopy } from '@/content/wedding';
import type { LayoutId } from '@/layouts/types';
import { GOLD } from '@/theme/tokens';

export function InvitationCopy({
  view,
  namesSize = 38,
  ampSize = 34,
}: {
  view: LayoutId;
  namesSize?: number;
  ampSize?: number;
}) {
  const sheet = view === 'single';
  const weddingSheet = view === 'wedding';
  const shift = (n: number) => (sheet || weddingSheet ? undefined : `translateX(${n}px)`);
  const t =
    view === 'single'
      ? {
          intro: 30,
          dateHe: 28,
          dateEn: 32,
          venue: 34,
          times: 28,
          parents: 28,
          label: 25,
          line: 440,
          namesGap: 14,
        }
      : {
        intro: 15,
        dateHe: 15,
        dateEn: 17,
        venue: 18,
        times: 14,
        parents: 12,
        label: 11,
        line: 210,
        namesGap: 12,
      };

  return (
    <>
      <p style={{ fontSize: t.intro, lineHeight: 1.55, letterSpacing: '0.05em' }}>
        {weddingCopy.intro[0]}
        <br />
        {weddingCopy.intro[1]}
      </p>

      <h1
        className="flex items-baseline leading-none"
        style={{ letterSpacing: '0.06em', fontSize: namesSize, gap: t.namesGap }}
      >
        <span>{couple.bride}</span>
        <Ampersand size={ampSize} />
        <span>{couple.groom}</span>
      </h1>

      <div style={{ lineHeight: 1.55, transform: shift(6) }}>
        <p style={{ fontSize: t.dateHe, letterSpacing: '0.06em' }}>{weddingCopy.dateHe}</p>
        <p dir="ltr" style={{ fontSize: t.dateEn, letterSpacing: '0.22em', color: GOLD }}>
          {couple.weddingDateEn}
        </p>
      </div>

      <p style={{ fontSize: t.venue, letterSpacing: '0.07em', transform: shift(7) }}>{couple.weddingVenue}</p>

      <div style={{ fontSize: t.times, lineHeight: 1.55, letterSpacing: '0.04em', transform: shift(12) }}>
        <p>{weddingCopy.reception}</p>
        <p>{weddingCopy.ceremony}</p>
      </div>

      <div
        className="flex flex-col items-center"
        style={{
          fontSize: t.parents,
          lineHeight: 1.5,
          letterSpacing: '0.03em',
          gap: weddingSheet ? 10 : sheet ? 8 : 6,
          width: weddingSheet ? 248 : sheet ? '100%' : undefined,
          transform: weddingSheet ? 'translateY(18px)' : undefined,
        }}
      >
        {view === 'single' && (
          <img
            src="/couple-olive.png"
            alt=""
            style={{ height: 96, mixBlendMode: 'multiply', marginBottom: 18 }}
          />
        )}
        <span
          className="h-px"
          style={{
            background: GOLD,
            opacity: 0.55,
            width: weddingSheet ? 248 : t.line,
            transform: sheet || weddingSheet ? undefined : view === 'landscape' ? 'translateX(10px)' : 'translateX(12px)',
          }}
        />
        <div
          className="flex items-start text-center"
          style={{
            width: weddingSheet ? 248 : sheet ? t.line : undefined,
            justifyContent: weddingSheet || sheet ? 'space-between' : 'center',
            gap: weddingSheet || sheet ? undefined : 24,
          }}
        >
          <div style={{ transform: shift(22) }}>
            <p style={{ fontSize: t.label, letterSpacing: '0.14em', color: GOLD }}>{weddingCopy.brideParentsLabel}</p>
            <p>{weddingCopy.brideParents}</p>
          </div>
          <div>
            <p style={{ fontSize: t.label, letterSpacing: '0.14em', color: GOLD }}>{weddingCopy.groomParentsLabel}</p>
            <p>{weddingCopy.groomParents}</p>
          </div>
        </div>
      </div>
    </>
  );
}
