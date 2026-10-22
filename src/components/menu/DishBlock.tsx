import { Fragment } from 'react';
import { MENU_DISHES } from '@/content/menu';
import { MENU_LINE_GOLD } from '@/theme/tokens';

function DishRule() {
  return (
    <div aria-hidden className="flex shrink-0 items-center justify-center" style={{ gap: 12, height: 8 }}>
      <span style={{ width: 88, height: 1.5, background: MENU_LINE_GOLD }} />
      <span style={{ width: 7, height: 7, background: MENU_LINE_GOLD, transform: 'rotate(45deg)' }} />
      <span style={{ width: 88, height: 1.5, background: MENU_LINE_GOLD }} />
    </div>
  );
}

export function DishBlock({
  top,
  bottom,
  nameSize,
  descSize,
  gap,
  width = 600,
  justify,
  nameLineHeight = 1.15,
  descLineHeight = 1.35,
  descMarginTop = 4,
  descLetterSpacing = '0.03em',
  divided = false,
}: {
  top: number;
  bottom?: number;
  nameSize: number;
  descSize: number;
  gap?: number;
  width?: number;
  justify?: 'between' | 'evenly';
  nameLineHeight?: number;
  descLineHeight?: number;
  descMarginTop?: number;
  descLetterSpacing?: string;
  divided?: boolean;
}) {
  const justifyClass = justify === 'evenly' ? 'justify-evenly' : bottom != null ? 'justify-between' : '';
  return (
    <div
      className={`absolute flex flex-col items-center ${justifyClass}`}
      style={{ top, bottom, left: 0, right: 0, marginInline: 'auto', width, gap: bottom != null ? undefined : gap }}
    >
      {MENU_DISHES.map((dish, i) => (
        <Fragment key={dish.name}>
          {divided && i > 0 && <DishRule />}
          <div style={{ width: '100%' }}>
            <h2 style={{ fontSize: nameSize, fontWeight: 500, letterSpacing: '0.03em', lineHeight: nameLineHeight }}>{dish.name}</h2>
            <p style={{ fontSize: descSize, fontWeight: 400, lineHeight: descLineHeight, marginTop: descMarginTop, letterSpacing: descLetterSpacing }}>
              {dish.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
