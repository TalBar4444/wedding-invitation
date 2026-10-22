import { HennaInvitationOverlay } from './HennaInvitationOverlay';

export function HennaScene({ src }: { src: string }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 640,
          background: `url(${src}) top center / 100% auto no-repeat`,
          zIndex: 1,
        }}
      />
      <HennaInvitationOverlay />
    </>
  );
}
