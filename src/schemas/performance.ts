import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

// A selectable row in any of the pane's three windows.
export const PerfItemSchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  stat: z.string(),
  statTone: ToneSchema,
});
export type PerfItem = z.infer<typeof PerfItemSchema>;

export const JobPerformanceSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  models: PerfItemSchema.array(),
  connections: PerfItemSchema.array(),
  failures: PerfItemSchema.array(),
  failuresLabel: z.string(),
});
export type JobPerformance = z.infer<typeof JobPerformanceSchema>;

export const PerfDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  pill: z.string(),
  meta: z.string(),
  breadcrumb: z.string().array(),
  usage: z
    .object({ label: z.string(), value: z.string(), tone: ToneSchema })
    .array()
    .nullable(),
  latency: z
    .object({
      points: z.object({ label: z.string(), value: z.string() }).array(),
      note: z.string(),
    })
    .nullable(),
  phases: z
    .object({
      icon: z.string(),
      name: z.string(),
      agent: z.string(),
      requests: z.string(),
      tone: ToneSchema,
    })
    .array()
    .nullable(),
  crossLinks: z
    .object({
      icon: z.string(),
      title: z.string(),
      sub: z.string(),
      targetLabel: z.string(),
      target: z.string(),
    })
    .array(),
  props: z
    .object({ label: z.string(), value: z.string(), tone: ToneSchema })
    .array(),
});
export type PerfDetail = z.infer<typeof PerfDetailSchema>;
