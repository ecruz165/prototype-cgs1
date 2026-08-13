import { z } from 'zod';

export const JobStatusSchema = z.enum([
  'running',
  'awaiting',
  'failed',
  'completed',
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

// Icon fields carry the design's Material Symbols names (straight from
// design/control-plane-v2.pen); the UI maps them to lucide equivalents.
export const JobContextSchema = z.object({
  icon: z.string(),
  label: z.string(),
});

export const JobSchema = z.object({
  id: z.string(),
  name: z.string(),
  agent: z.string(),
  status: JobStatusSchema,
  stepIcon: z.string(),
  stepText: z.string(),
  progress: z.number().min(0).max(100),
  contexts: JobContextSchema.array(),
  elapsed: z.string(),
  owner: z.string(),
});
export type Job = z.infer<typeof JobSchema>;
