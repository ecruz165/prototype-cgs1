import type { z } from 'zod';
import { designIcon } from '@/lib/designIcons';
import type { JobContextSchema } from '@/schemas/job';

type JobContext = z.infer<typeof JobContextSchema>;

// The design's ContextChip with its remove-✕ omitted — the jobs list
// disables it on every instance.
export function ContextChip({ context }: { context: JobContext }) {
  const Icon = designIcon(context.icon);
  return (
    <span className="flex items-center gap-[7px] rounded-full border border-border bg-card px-2.5 py-[5px]">
      <Icon size={14} className="text-muted-foreground" aria-hidden />
      <span className="font-mono text-foreground text-xs">{context.label}</span>
    </span>
  );
}
