import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

export const QualityGateSchema = z.object({
  id: z.string(),
  name: z.string(),
  stat: z.string(),
  status: z.enum(['pass', 'fail']),
  locked: z.boolean(),
});
export type QualityGate = z.infer<typeof QualityGateSchema>;

export const TrendPointSchema = z.object({
  label: z.string(),
  // Percentage 0-100; rendered as a mini bar column.
  value: z.number(),
  tone: z.enum(['active', 'warning', 'danger']),
  labelTone: z.enum(['default', 'danger']),
});
export type TrendPoint = z.infer<typeof TrendPointSchema>;

export const JobQualitySchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  banner: z.object({ text: z.string(), stat: z.string() }).nullable(),
  groups: z
    .object({ label: z.string(), gates: QualityGateSchema.array() })
    .array(),
  trend: z.object({ label: z.string(), points: TrendPointSchema.array() }),
});
export type JobQuality = z.infer<typeof JobQualitySchema>;

export const GateDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['passed', 'failed']),
  meta: z.string(),
  breadcrumb: z.string().array(),
  assertion: z
    .object({
      expression: z.string(),
      message: z.string(),
      evaluated: z
        .object({ label: z.string(), value: z.string(), tone: ToneSchema })
        .array(),
      // Bar fill and marker positions as percentages.
      actualPct: z.number(),
      thresholdPct: z.number(),
      caption: z.string(),
    })
    .nullable(),
  trend: z
    .object({
      label: z.string(),
      points: TrendPointSchema.array(),
      note: z.string(),
    })
    .nullable(),
  blocks: z
    .object({
      title: z.string(),
      pill: z.string(),
      body: z.string(),
      links: z
        .object({
          icon: z.string(),
          title: z.string(),
          sub: z.string(),
          targetLabel: z.string(),
          target: z.string(),
        })
        .array(),
    })
    .nullable(),
  links: z
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
export type GateDetail = z.infer<typeof GateDetailSchema>;
