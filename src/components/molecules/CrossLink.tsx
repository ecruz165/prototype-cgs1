import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { designIcon } from '@/lib/designIcons';

interface CrossLinkProps {
  jobId: string;
  icon: string;
  title: string;
  sub: string;
  targetLabel: string;
  // Job section slug the row navigates to.
  target: string;
}

// The design's cross-link row: canvas-to-section jump with a mono target tag.
export function CrossLink({
  jobId,
  icon,
  title,
  sub,
  targetLabel,
  target,
}: CrossLinkProps) {
  const Icon = designIcon(icon);
  return (
    <Link
      to="/jobs/$jobId/$section"
      params={{ jobId, section: target }}
      className="flex items-center gap-2.5 rounded-sm border border-border bg-muted px-3 py-2.5 transition-colors hover:border-accent-strong"
    >
      <Icon size={16} className="shrink-0 text-accent-strong" aria-hidden />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-semibold text-foreground text-xs">
          {title}
        </span>
        <span className="truncate font-mono text-[10px] text-tertiary">
          {sub}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1 font-mono font-semibold text-[10px] text-accent-foreground">
        {targetLabel}
        <ArrowRight size={14} aria-hidden />
      </span>
    </Link>
  );
}
