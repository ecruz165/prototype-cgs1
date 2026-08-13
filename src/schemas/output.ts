import { z } from 'zod';
import { DiffLineSchema } from './nodeDetail';

export const FileChangeSchema = z.enum(['modified', 'added', 'removed']);

export const OutputFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  change: FileChangeSchema,
  added: z.number().nullable(),
  removed: z.number().nullable(),
});

export const OutputTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  commit: z.string(),
  files: OutputFileSchema.array(),
});

export const OutputArtifactSchema = z.object({
  icon: z.string(),
  name: z.string(),
  sub: z.string(),
});

export const JobOutputSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  scope: z.object({ icon: z.string(), label: z.string() }).array(),
  tasks: OutputTaskSchema.array(),
  artifacts: OutputArtifactSchema.array(),
});
export type JobOutput = z.infer<typeof JobOutputSchema>;
export type OutputTask = z.infer<typeof OutputTaskSchema>;
export type OutputFile = z.infer<typeof OutputFileSchema>;

export const FileDiffSchema = z.object({
  id: z.string(),
  name: z.string(),
  change: FileChangeSchema,
  meta: z.string(),
  breadcrumb: z.string().array(),
  hunkLabel: z.string().nullable(),
  hunks: z.object({ lines: DiffLineSchema.array() }).array(),
  producedBy: z
    .object({
      label: z.string(),
      value: z.string(),
      tone: z.enum(['default', 'accent']),
    })
    .array(),
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
    .object({
      label: z.string(),
      value: z.string(),
      tone: z.enum([
        'default',
        'accent',
        'warning',
        'active',
        'danger',
        'muted',
      ]),
    })
    .array(),
});
export type FileDiff = z.infer<typeof FileDiffSchema>;
