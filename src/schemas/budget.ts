import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

export const BudgetGateSchema = z.object({
  id: z.string(),
  name: z.string(),
  now: z.string(),
  limit: z.string(),
  usedPct: z.number(),
  tripped: z.boolean(),
});
export type BudgetGate = z.infer<typeof BudgetGateSchema>;

export const JobBudgetSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  budget: z.object({
    spent: z.string(),
    ceiling: z.string(),
    usedPct: z.number(),
    projectedPct: z.number(),
    rows: z
      .object({ label: z.string(), value: z.string(), tone: ToneSchema })
      .array(),
    footStatus: z.string(),
    footNote: z.string(),
  }),
  gates: BudgetGateSchema.array(),
  gatesNote: z.string(),
  gatesFootNote: z.string(),
});
export type JobBudget = z.infer<typeof JobBudgetSchema>;

export const HaltDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['clear', 'tripped']),
  meta: z.string(),
  breadcrumb: z.string().array(),
  assertion: z
    .object({
      expression: z.string(),
      message: z.string(),
      statsLabel: z.string(),
      stats: z
        .object({ label: z.string(), value: z.string(), tone: ToneSchema })
        .array(),
      nowPct: z.number(),
      projectedPct: z.number(),
      caption: z.string(),
    })
    .nullable(),
  onTrip: z
    .object({
      title: z.string(),
      pill: z.string(),
      steps: z
        .object({
          icon: z.string(),
          tone: ToneSchema,
          name: z.string(),
          text: z.string(),
        })
        .array(),
    })
    .nullable(),
  guards: z
    .object({
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
  props: z
    .object({ label: z.string(), value: z.string(), tone: ToneSchema })
    .array(),
});
export type HaltDetail = z.infer<typeof HaltDetailSchema>;
