import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

export const ContextItemSchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  stat: z.string(),
  statTone: ToneSchema,
});
export type ContextItem = z.infer<typeof ContextItemSchema>;

export const JobContextSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  inputs: ContextItemSchema.array(),
  queries: ContextItemSchema.array(),
  queriesLabel: z.string(),
});
export type JobContextData = z.infer<typeof JobContextSchema>;

export const QueryHitSchema = z.object({
  icon: z.string(),
  path: z.string(),
  score: z.string(),
  used: z.boolean(),
});

export const QueryDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  pill: z.string(),
  meta: z.string(),
  breadcrumb: z.string().array(),
  query: z
    .object({
      text: z.string(),
      tags: z.string().array(),
      issuedBy: z.string(),
    })
    .nullable(),
  hits: z
    .object({
      label: z.string(),
      rows: QueryHitSchema.array(),
      footer: z.string(),
    })
    .nullable(),
  fed: z
    .object({
      body: z.string(),
      usedLegend: z.string(),
      prunedLegend: z.string(),
      usedPct: z.number(),
    })
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
export type QueryDetail = z.infer<typeof QueryDetailSchema>;
