import { z } from 'zod';

const ToneSchema = z.enum([
  'default',
  'accent',
  'warning',
  'active',
  'danger',
  'muted',
]);

const StatSchema = z.object({
  label: z.string(),
  value: z.string(),
  sub: z.string().nullable(),
});

const PillSchema = z.object({ label: z.string(), tone: ToneSchema });

export const PlanDataSchema = z.object({
  title: z.string(),
  scope: z.string(),
  altitudes: z.string().array(),
  altitude: z.string(),
  discovery: z.object({
    subtitle: z.string(),
    stats: StatSchema.array(),
    launcher: z.object({
      label: z.string(),
      sub: z.string(),
      tiles: z
        .object({
          icon: z.string(),
          title: z.string(),
          desc: z.string(),
          action: z.string(),
        })
        .array(),
    }),
    running: z.object({
      label: z.string(),
      sub: z.string(),
      jobs: z
        .object({
          title: z.string(),
          kind: z.string(),
          status: z.string(),
          statusTone: ToneSchema,
          pct: z.number(),
          detail: z.string(),
        })
        .array(),
    }),
    repository: z.object({
      label: z.string(),
      sub: z.string(),
      rows: z
        .object({
          artifact: z.string(),
          desc: z.string(),
          type: z.string(),
          state: z.string(),
          stateTone: ToneSchema,
          informs: z.string(),
          updated: z.string(),
        })
        .array(),
    }),
  }),
  prds: z.object({
    subtitle: z.string(),
    stats: StatSchema.array(),
    lifecycle: z.object({
      label: z.string(),
      sub: z.string(),
      stages: z
        .object({ label: z.string(), sub: z.string(), tone: ToneSchema })
        .array(),
    }),
    library: z.object({
      label: z.string(),
      sub: z.string(),
      rows: z
        .object({
          prd: z.string(),
          id: z.string(),
          feature: z.string(),
          state: z.string(),
          stateTone: ToneSchema,
          owner: z.string(),
          roadmap: z.string(),
          trace: z.string(),
        })
        .array(),
    }),
    focus: z.object({
      label: z.string(),
      title: z.string(),
      pills: PillSchema.array(),
      meta: z.string(),
      roadmapChip: z.string(),
      sectionsLabel: z.string(),
      sections: z
        .object({
          num: z.string(),
          name: z.string(),
          state: z.string(),
          stateTone: ToneSchema,
        })
        .array(),
      jobsLabel: z.string(),
      jobs: z
        .object({
          name: z.string(),
          id: z.string(),
          state: z.string(),
          stateTone: ToneSchema,
          note: z.string(),
        })
        .array(),
      sourcesLabel: z.string(),
      sources: z
        .object({ name: z.string(), desc: z.string(), tag: z.string() })
        .array(),
    }),
    publish: z.object({
      title: z.string(),
      text: z.string(),
      action: z.string(),
    }),
  }),
  roadmap: z.object({
    subtitle: z.string(),
    stats: StatSchema.array(),
    board: z.object({
      label: z.string(),
      sub: z.string(),
      legend: PillSchema.array(),
      quarters: z.string().array(),
      rows: z
        .object({
          capability: z.string(),
          chips: z
            .object({
              label: z.string(),
              sub: z.string(),
              quarter: z.number(),
              tone: ToneSchema,
            })
            .array(),
        })
        .array(),
    }),
    oq: z.object({ label: z.string(), text: z.string(), action: z.string() }),
  }),
  decompose: z.object({
    subtitle: z.string(),
    stats: StatSchema.array(),
    action: z.object({
      title: z.string(),
      id: z.string(),
      state: z.string(),
      meta: z.string(),
      button: z.string(),
      stages: z
        .object({ label: z.string(), sub: z.string(), tone: ToneSchema })
        .array(),
    }),
    forecast: z.object({
      label: z.string(),
      sub: z.string(),
      rows: z
        .object({
          story: z.string(),
          epic: z.string(),
          trace: z.string(),
          dedup: z.string(),
          dedupTone: ToneSchema,
          jira: z.string(),
          jiraTone: ToneSchema,
          scale: z.string(),
        })
        .array(),
    }),
    awaiting: z.object({
      label: z.string(),
      sub: z.string(),
      rows: z
        .object({ name: z.string(), tag: z.string(), tone: ToneSchema })
        .array(),
    }),
    dedup: z.object({
      label: z.string(),
      sub: z.string(),
      rows: z
        .object({
          name: z.string(),
          link: z.string(),
          verdict: z.string(),
          verdictTone: ToneSchema,
          note: z.string(),
        })
        .array(),
    }),
    oq: z.object({ label: z.string(), text: z.string(), action: z.string() }),
  }),
  readiness: z.object({
    subtitle: z.string(),
    board: z.object({
      label: z.string(),
      sub: z.string(),
      lanes: z
        .object({
          name: z.string(),
          count: z.string(),
          tone: ToneSchema,
          features: z
            .object({
              name: z.string(),
              checks: z
                .object({ label: z.string(), done: z.boolean() })
                .array(),
            })
            .array(),
        })
        .array(),
    }),
    sme: z.object({
      label: z.string(),
      sub: z.string(),
      headline: z.string(),
      headlineSub: z.string(),
      tags: z.string().array(),
      rows: z
        .object({
          question: z.string(),
          tag: z.string(),
          tagTone: ToneSchema,
          wait: z.string(),
          from: z.string(),
          sme: z.string(),
        })
        .array(),
    }),
    forecast: z.object({
      label: z.string(),
      sub: z.string(),
      context: z.string(),
      contextSub: z.string(),
      autonomy: z
        .object({ label: z.string(), value: z.string(), pct: z.number() })
        .array(),
      needsYou: z.string(),
      spend: z.object({ label: z.string(), value: z.string() }).array(),
      spendNote: z.string(),
      risk: z.object({ label: z.string(), value: z.string() }).array(),
    }),
    defjobs: z.object({
      label: z.string(),
      sub: z.string(),
      groups: z
        .object({
          name: z.string(),
          count: z.string(),
          rows: z
            .object({
              job: z.string(),
              feature: z.string(),
              state: z.string(),
              tag: z.string(),
              tagTone: ToneSchema,
            })
            .array(),
        })
        .array(),
    }),
    awaitspec: z.object({
      label: z.string(),
      sub: z.string(),
      headline: z.string(),
      tags: z.string().array(),
      rows: z
        .object({
          story: z.string(),
          gap: z.string(),
          clearedBy: z.string(),
          tone: ToneSchema,
        })
        .array(),
    }),
  }),
  dependencies: z.object({
    subtitle: z.string(),
    stats: StatSchema.array(),
    graph: z.object({
      label: z.string(),
      sub: z.string(),
      legend: PillSchema.array(),
      lanes: z
        .object({
          name: z.string(),
          badges: PillSchema.array(),
          accent: z.boolean(),
          nodes: z
            .object({
              name: z.string(),
              meta: z.string(),
              state: z.string(),
              tone: ToneSchema,
            })
            .array(),
          note: z.string().nullable(),
        })
        .array(),
      crossedge: z.string(),
    }),
    priority: z.object({
      label: z.string(),
      sub: z.string(),
      button: z.string(),
      rows: z
        .object({
          rank: z.string(),
          story: z.string(),
          feature: z.string(),
          state: z.string(),
          stateTone: ToneSchema,
          critical: z.boolean(),
          downstream: z.string(),
        })
        .array(),
      more: z.string(),
    }),
    tracking: z.object({
      label: z.string(),
      sub: z.string(),
      columns: z.string().array(),
      rows: z.string().array().array(),
      foot: z.string(),
    }),
  }),
});
export type PlanData = z.infer<typeof PlanDataSchema>;
