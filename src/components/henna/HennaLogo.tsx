export function HennaLogo({ width }: { width: number }) {
  const height = width * (328 / 306);
  return (
    <img
      src="/logo-henna.png?v=user"
      alt="T&S"
      style={{
        width,
        height,
        maxWidth: 'none',
        display: 'block',
      }}
    />
  );
}
