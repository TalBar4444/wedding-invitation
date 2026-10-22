import { NAVY } from '@/theme/tokens';

export function CoupleMark({ height }: { height: number }) {
  return (
    <span aria-hidden className="relative inline-block" style={{ height, mixBlendMode: 'multiply' }}>
      <img src="/couple-olive.png" alt="" style={{ height, maxWidth: 'none', visibility: 'hidden' }} />
      <span
        className="absolute inset-0"
        style={{
          backgroundColor: NAVY,
          WebkitMaskImage: 'url(/couple-olive.png)',
          maskImage: 'url(/couple-olive.png)',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      />
    </span>
  );
}
