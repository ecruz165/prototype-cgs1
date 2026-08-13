import { z } from 'zod';

export const JobTypeTagSchema = z.object({
  name: z.string(),
  count: z.string(),
  // 0 = faint, 1 = secondary, 2 = strong, 3 = strongest — the design's
  // usage-weighted tag cloud.
  weight: z.number().min(0).max(3),
});
export type JobTypeTag = z.infer<typeof JobTypeTagSchema>;

export const PrereqSchema = z.object({
  id: z.string(),
  name: z.string(),
  sub: z.string(),
  requirement: z.enum(['required', 'optional']),
  status: z.enum(['carried', 'needs-you', 'inferred']),
  // The needs-you row carries an inline input in the design.
  placeholder: z.string().nullable(),
});
export type Prereq = z.infer<typeof PrereqSchema>;

export const NewJobDraftSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  steps: z.string().array(),
  progress: z.object({ label: z.string(), extra: z.string(), pct: z.number() }),
  product: z.string(),
  jobType: z.string(),
  scales: z.string().array(),
  selectedScale: z.string(),
  riskNote: z.string(),
  riskTraits: z.string().array(),
  tags: JobTypeTagSchema.array(),
  prereqs: PrereqSchema.array(),
  paraphraseLabel: z.string(),
  paraphrase: z.string(),
  coordinator: z.object({
    text: z.string(),
    accept: z.string(),
    reject: z.string(),
  }),
  addedContext: z
    .object({ icon: z.string(), label: z.string(), accent: z.boolean() })
    .array(),
  ladderLabel: z.string(),
  ladder: z.object({ icon: z.string(), name: z.string() }).array(),
  estimate: z.string(),
  commit: z.string(),
  intentPlaceholder: z.string(),
  attachments: z.object({ icon: z.string(), label: z.string() }).array(),
});
export type NewJobDraft = z.infer<typeof NewJobDraftSchema>;
