import { ChevronDown, ChevronRight } from 'lucide-react';
import { type ReactNode, useState } from 'react';

// The design's collapsible pane window (PIPELINE, REQUESTS, TEAM…): surface
// card, 34px mono header with chevron and trailing count.
export function PaneWindow({
  label,
  count,
  children,
}: {
  label: string;
  count?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const Chevron = open ? ChevronDown : ChevronRight;
  return (
    <section className="rounded-md border border-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[34px] w-full items-center gap-2 px-3"
      >
        <Chevron size={16} className="text-tertiary" aria-hidden />
        <span className="font-mono font-semibold text-[11px] text-foreground">
          {label}
        </span>
        <span className="ml-auto">{count}</span>
      </button>
      {open && <div className="border-border border-t">{children}</div>}
    </section>
  );
}
