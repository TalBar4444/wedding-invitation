import { HENNA_RED } from '@/theme/tokens';

export function HennaFlower({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden style={{ display: 'block', flexShrink: 0 }}>
      <g transform="translate(14 14)">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-7" rx="2.4" ry="6.2" fill={HENNA_RED} transform={`rotate(${i * 45})`} />
        ))}
        <circle r="2.4" fill="#f7eedb" />
      </g>
    </svg>
  );
}
