import { useEffect, useRef, useState } from 'react';
import { ScaledScene } from '@/components/studio/ScaledScene';
import { Toolbar } from '@/components/studio/Toolbar';
import { exportScenePng } from '@/export/png';
import { LAYOUTS } from '@/layouts/registry';
import type { LayoutId } from '@/layouts/types';

export default function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<LayoutId>('henna');
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const layout = LAYOUTS[view];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / layout.w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout.w]);

  async function handleExport() {
    if (!sceneRef.current || busy) return;
    setBusy(true);
    try {
      await exportScenePng(sceneRef.current, layout);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#e9dfcf] px-2 pb-14 pt-28 sm:px-6">
      <Toolbar view={view} onViewChange={setView} busy={busy} onExport={handleExport} />
      <ScaledScene wrapRef={wrapRef} sceneRef={sceneRef} layout={layout} view={view} scale={scale} />
    </main>
  );
}
