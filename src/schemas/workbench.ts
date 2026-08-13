import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

export const WorkbenchStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  sub: z.string().nullable(),
});

export const WorkbenchRowSchema = z.object({
  title: z.string(),
  meta: z.string().nullable(),
  sub: z.string().nullable(),
  badge: z.string().nullable(),
  badgeTone: ToneSchema,
  stat: z.string().nullable(),
  statTone: ToneSchema,
});
export type WorkbenchRow = z.infer<typeof WorkbenchRowSchema>;

export const WorkbenchBlockSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('tiles'),
    tiles: z
      .object({ title: z.string(), desc: z.string(), action: z.string() })
      .array(),
  }),
  z.object({ kind: z.literal('list'), rows: WorkbenchRowSchema.array() }),
  z.object({
    kind: z.literal('table'),
    columns: z.string().array(),
    rows: z.string().array().array(),
  }),
  z.object({
    kind: z.literal('pills'),
    items: z
      .object({ label: z.string(), sub: z.string(), tone: ToneSchema })
      .array(),
  }),
  z.object({
    kind: z.literal('note'),
    tone: z.enum(['accent', 'warning', 'danger', 'active']),
    label: z.string(),
    text: z.string(),
    action: z.string().nullable(),
  }),
]);
export type WorkbenchBlock = z.infer<typeof WorkbenchBlockSchema>;

export const WorkbenchCardSchema = z.object({
  label: z.string(),
  sub: z.string().nullable(),
  block: WorkbenchBlockSchema,
});
export type WorkbenchCard = z.infer<typeof WorkbenchCardSchema>;

export const WorkbenchViewSchema = z.object({
  slug: z.string(),
  tab: z.string(),
  subtitle: z.string(),
  stats: WorkbenchStatSchema.array(),
  cards: WorkbenchCardSchema.array(),
});
export type WorkbenchView = z.infer<typeof WorkbenchViewSchema>;

export const WorkbenchSectionSchema = z.object({
  title: z.string(),
  scope: z.string(),
  views: WorkbenchViewSchema.array(),
});
export type WorkbenchSection = z.infer<typeof WorkbenchSectionSchema>;
