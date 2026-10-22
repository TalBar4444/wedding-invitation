export function Artwork({
  logoWidth,
  coupleHeight,
  gap = 8,
  flat = false,
}: {
  logoWidth: number;
  coupleHeight: number;
  gap?: number;
  /** Skip multiply so the transparent PNG stays solid on a clear canvas. */
  flat?: boolean;
}) {
  const blend = flat ? undefined : ('multiply' as const);
  return (
    <div className="flex flex-col items-center" style={{ gap }}>
      <img src="/logo-olive.png" alt="T&S monogram" style={{ width: logoWidth, mixBlendMode: blend }} />
      <img src="/couple-olive.png" alt="" style={{ height: coupleHeight, mixBlendMode: blend }} />
    </div>
  );
}
