import { z } from 'zod';

export const PhaseKindSchema = z.enum([
  'trigger',
  'agent',
  'fork',
  'join',
  'gate',
  'decision',
  'suspend',
  'publish',
]);

export const PhaseStatusSchema = z.enum([
  'done',
  'running',
  'blocked',
  'pending',
  'suspended',
]);

// tone colors the phase icon; detailTone colors the detail line. Both come
// straight from the design's pane-flow nodes rather than being derived,
// because the design mixes them per kind (a pending gate is warning-toned,
// a pending decision is neutral).
export const PhaseToneSchema = z.enum([
  'active',
  'accent',
  'warning',
  'muted',
  'secondary',
]);

export const FlowPhaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: PhaseKindSchema,
  status: PhaseStatusSchema,
  icon: z.string(),
  tone: PhaseToneSchema,
  detail: z.string(),
  detailTone: z.enum(['default', 'accent', 'warning', 'muted', 'secondary']),
  indent: z.boolean(),
});
export type FlowPhase = z.infer<typeof FlowPhaseSchema>;

export const JobFlowSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  phases: FlowPhaseSchema.array(),
});
export type JobFlow = z.infer<typeof JobFlowSchema>;
