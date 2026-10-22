import { useLayoutEffect, useRef } from 'react';
import { MENU_LINE_GOLD } from '@/theme/tokens';

const LINE_PX = 1;
const HEART_PATH =
  'M8 12.4S2.2 8.6 2.2 5.2C2.2 3.2 3.7 2 5.2 2c.9 0 1.7.4 2.2 1.2C7.9 2.4 8.7 2 9.6 2c1.5 0 3 1.2 3 3.2 0 3.4-4.6 7.2-4.6 7.2z';

/** Same heart rule as the menu, in normal flow. */
export function HeartLine({ width = 340 }: { width?: number }) {
  return (
    <div aria-hidden className="flex items-center" style={{ width, gap: 12 }}>
      <span className="flex-1" style={{ height: 2, background: MENU_LINE_GOLD }} />
      <svg width="34" height="30" viewBox="0 0 16 14">
        <path d={HEART_PATH} fill={MENU_LINE_GOLD} />
      </svg>
      <span className="flex-1" style={{ height: 2, background: MENU_LINE_GOLD }} />
    </div>
  );
}

export function HeartRule({ top }: { top: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const align = () => {
      const dpr = window.devicePixelRatio || 1;
      const scale = root.getBoundingClientRect().height / root.offsetHeight || 1;
      const devicePx = Math.max(2, Math.ceil(LINE_PX * scale * dpr - 1e-4));
      const cssH = devicePx / (scale * dpr);
      const lines = root.querySelectorAll<HTMLElement>('[data-rule]');
      lines.forEach((line) => {
        line.style.transform = '';
        line.style.height = `${cssH}px`;
      });
      lines.forEach((line) => {
        const deviceTop = line.getBoundingClientRect().top * dpr;
        const delta = (Math.round(deviceTop) - deviceTop) / dpr / scale;
        line.style.transform = `translateY(${delta}px)`;
      });
    };

    align();
    const ro = new ResizeObserver(align);
    ro.observe(root);
    window.addEventListener('resize', align);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', align);
    };
  }, [top]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute flex items-center justify-center"
      style={{ top, left: 0, right: 0, zIndex: 3, gap: 12 }}
    >
      <span data-rule style={{ width: 112, height: LINE_PX, background: MENU_LINE_GOLD }} />
      <svg width="32" height="28" viewBox="0 0 16 14">
        <path d={HEART_PATH} fill={MENU_LINE_GOLD} />
      </svg>
      <span data-rule style={{ width: 112, height: LINE_PX, background: MENU_LINE_GOLD }} />
    </div>
  );
}
