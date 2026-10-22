import { LAYOUTS } from '@/layouts/registry';
import type { LayoutId } from '@/layouts/types';

export function Toolbar({
  view,
  onViewChange,
  busy,
  onExport,
}: {
  view: LayoutId;
  onViewChange: (id: LayoutId) => void;
  busy: boolean;
  onExport: () => void;
}) {
  return (
    <div className="fixed inset-x-4 top-4 z-10 flex flex-wrap gap-2">
      {(Object.keys(LAYOUTS) as LayoutId[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onViewChange(id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition ${
            view === id ? 'bg-[#3c3a28] text-[#f6efe0]' : 'bg-[#f6efe0] text-[#3c3a28] hover:bg-white'
          }`}
        >
          {LAYOUTS[id].label}
        </button>
      ))}
      <button
        type="button"
        onClick={onExport}
        disabled={busy}
        className="ms-auto rounded-full bg-[#3c3a28] px-5 py-2 text-sm font-semibold text-[#f6efe0] shadow-lg transition hover:bg-[#4d4a34] disabled:opacity-60"
      >
        {busy ? 'Exporting…' : 'Download PNG'}
      </button>
    </div>
  );
}
