import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

export const DecisionSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  sub: z.string(),
  subTone: ToneSchema,
});
export type Decision = z.infer<typeof DecisionSchema>;

export const JobActivitySchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  decisions: DecisionSchema.array(),
});
export type JobActivity = z.infer<typeof JobActivitySchema>;

export const DecisionDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.string(),
  meta: z.string(),
  breadcrumb: z.string().array(),
  reasoning: z
    .object({
      body: z.string(),
      inputs: z
        .object({ icon: z.string(), label: z.string(), value: z.string() })
        .array(),
    })
    .nullable(),
  io: z
    .object({
      note: z.string(),
      request: z.string(),
      response: z.string(),
      stats: z.string(),
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
export type DecisionDetail = z.infer<typeof DecisionDetailSchema>;
