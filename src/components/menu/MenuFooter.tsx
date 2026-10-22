import { Ampersand } from '@/components/shared/Ampersand';
import { couple } from '@/content/couple';
import { MENU_COUPLE_HEIGHT } from '@/layouts/registry';
import { MENU_SERIF, NAVY } from '@/theme/tokens';
import { CoupleMark } from './CoupleMark';

export function MenuFooter({
  large = false,
  top,
  nameSize = large ? 46 : 32,
  dateSize = large ? 34 : 24,
  ampSize = large ? 40 : 28,
  coupleHeight = MENU_COUPLE_HEIGHT,
}: {
  large?: boolean;
  top?: number;
  nameSize?: number;
  dateSize?: number;
  ampSize?: number;
  coupleHeight?: number;
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      dir="ltr"
      style={{
        top: top ?? (large ? 1356 : 1370),
        left: 0,
        right: 0,
        gap: 18,
        fontFamily: MENU_SERIF,
        color: NAVY,
        zIndex: 4,
      }}
    >
      <span style={{ transform: 'translateX(-28px)' }}>
        <CoupleMark height={coupleHeight} />
      </span>
      <div dir="rtl" className="flex flex-col items-center">
        <p className="flex items-baseline justify-center" style={{ fontSize: nameSize, fontWeight: 500, gap: 10, letterSpacing: '0.08em' }}>
          <span>{couple.bride}</span>
          <Ampersand size={ampSize} />
          <span>{couple.groom}</span>
        </p>
        <p dir="ltr" style={{ fontSize: dateSize, fontWeight: 500, letterSpacing: '0.3em', marginTop: 6 }}>
          {couple.weddingDateEn}
        </p>
      </div>
    </div>
  );
}
