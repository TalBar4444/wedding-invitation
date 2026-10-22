import { HENNA_RED } from '@/theme/tokens';

export function HennaRule() {
  return (
    <div className="flex items-center" style={{ width: 210, gap: 12 }} aria-hidden>
      <span className="h-px flex-1" style={{ background: HENNA_RED, opacity: 0.7 }} />
      <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden>
        <path d="M4.5 0.4 L5.25 3.75 L8.6 4.5 L5.25 5.25 L4.5 8.6 L3.75 5.25 L0.4 4.5 L3.75 3.75 Z" fill={HENNA_RED} />
      </svg>
      <span className="h-px flex-1" style={{ background: HENNA_RED, opacity: 0.7 }} />
    </div>
  );
}
