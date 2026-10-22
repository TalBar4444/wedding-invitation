export function PaperPatch({ top, left, width, height }: { top: number; left: number; width: number; height: number }) {
  return (
    <div aria-hidden className="absolute overflow-hidden" style={{ top, left, width, height, zIndex: 1 }}>
      <img
        src="/menu-blank.png"
        alt=""
        style={{
          position: 'absolute',
          width: 1024,
          height: 1536,
          maxWidth: 'none',
          maxHeight: 'none',
          left: -420,
          top: -700,
        }}
      />
    </div>
  );
}
