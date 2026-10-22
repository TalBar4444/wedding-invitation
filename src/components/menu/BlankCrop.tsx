import type { CSSProperties } from 'react';

export function BlankCrop({
  boxTop,
  boxW,
  boxH,
  srcTop,
  scale,
  zIndex,
  pageW = 1024,
}: {
  boxTop: number;
  boxW: number;
  boxH: number;
  srcTop: number;
  scale: number;
  zIndex?: number;
  pageW?: number;
}) {
  const srcLeft = (1024 - boxW) / 2;
  const imgStyle: CSSProperties = {
    position: 'absolute',
    width: 1024,
    height: 1536,
    maxWidth: 'none',
    maxHeight: 'none',
    left: -srcLeft,
    top: -srcTop,
  };
  return (
    <div
      aria-hidden
      className="absolute overflow-hidden"
      style={{
        top: boxTop,
        left: (pageW - boxW) / 2,
        width: boxW,
        height: boxH,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        zIndex,
      }}
    >
      <img src="/menu-blank.png" alt="" style={imgStyle} />
    </div>
  );
}
