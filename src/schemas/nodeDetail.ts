import { z } from 'zod';
import { PhaseKindSchema, PhaseStatusSchema } from './flow';

export const DiffLineSchema = z.object({
  kind: z.enum(['context', 'removed', 'added']),
  text: z.string(),
});

export const NodeCrossLinkSchema = z.object({
  icon: z.string(),
  title: z.string(),
  sub: z.string(),
  targetLabel: z.string(),
  // Rail section slug the link navigates to.
  target: z.string(),
});

export const NodePropSchema = z.object({
  label: z.string(),
  value: z.string(),
  tone: z.enum(['default', 'accent', 'muted']),
});

// Sections are nullable: only phases that have run carry rich content.
export const NodeDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: PhaseKindSchema,
  status: PhaseStatusSchema,
  meta: z.string(),
  breadcrumb: z.string().array(),
  input: z
    .object({
      brief: z.string(),
      sources: z.string(),
      chips: z.string().array(),
    })
    .nullable(),
  output: z
    .object({ label: z.string(), lines: DiffLineSchema.array() })
    .nullable(),
  agent: z
    .object({
      name: z.string(),
      model: z.string(),
      adapter: z.string(),
      note: z.string(),
    })
    .nullable(),
  crossLinks: NodeCrossLinkSchema.array(),
  props: NodePropSchema.array(),
});
export type NodeDetail = z.infer<typeof NodeDetailSchema>;
