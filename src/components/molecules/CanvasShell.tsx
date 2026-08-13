import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export const canvasPropTones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  danger: 'text-status-danger',
  warning: 'text-status-warning',
  active: 'text-status-active',
  muted: 'text-faint',
} as const;

export interface CanvasProp {
  label: string;
  value: string;
  tone: keyof typeof canvasPropTones;
}

interface CanvasShellProps {
  title: string;
  titleIcon?: ReactNode;
  pills?: ReactNode;
  meta: string;
  breadcrumb: string[];
  railLabel: string;
  railProps: CanvasProp[];
  children: ReactNode;
}

// The design's main-pane chassis, shared by every detail canvas: bg-sidebar
// header (back, title, pills, mono meta, breadcrumb) over a main column and
// the 236px props rail.
export function CanvasShell({
  title,
  titleIcon,
  pills,
  meta,
  breadcrumb,
  railLabel,
  railProps,
  children,
}: CanvasShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border">
      <header className="flex flex-col gap-2 border-border border-b bg-sidebar px-5 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/jobs"
              aria-label="Back to jobs"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={18} aria-hidden />
            </Link>
            {titleIcon}
            <h1 className="truncate font-bold text-foreground text-lg">
              {title}
            </h1>
            {pills}
          </div>
          <span className="shrink-0 font-mono text-[11px] text-tertiary">
            {meta}
          </span>
        </div>
        <span className="font-mono text-[11px] text-tertiary">
          {breadcrumb.join('  ▸  ')}
        </span>
      </header>
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5 overflow-y-auto p-5">
          {children}
        </div>
        <aside
          aria-label={`${railLabel} properties`}
          className="w-59 shrink-0 overflow-y-auto border-border border-l bg-sidebar"
        >
          <div className="flex h-10 items-center border-border border-b px-4">
            <span className="font-mono font-semibold text-[10px] text-tertiary">
              {railLabel}
            </span>
          </div>
          <dl className="flex flex-col gap-0.5 px-2 py-2.5">
            {railProps.map((prop) => (
              <div
                key={prop.label}
                className="flex items-center justify-between gap-2 px-2 py-1"
              >
                <dt className="font-mono text-[11px] text-tertiary">
                  {prop.label}
                </dt>
                <dd
                  className={`text-right font-mono font-semibold text-[11px] ${canvasPropTones[prop.tone]}`}
                >
                  {prop.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
