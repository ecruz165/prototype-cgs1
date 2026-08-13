import { z } from 'zod';

// Request list states from the design's pane-steering rows.
export const RequestStateSchema = z.enum([
  'blocking',
  'changes',
  'approved',
  'awaiting',
  'open',
  'queued',
]);

// Single-master authority: the viewer either commits or advises.
export const AuthoritySchema = z.enum(['commit', 'advise']);

export const SteeringRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  sub: z.string(),
  state: RequestStateSchema,
  authority: AuthoritySchema,
});

export const TeamMemberSchema = z.object({
  initials: z.string(),
  name: z.string(),
  role: z.string(),
  specs: z.string().array(),
  connection: z.enum(['connected', 'invited']),
  authority: z.enum(['owner', 'advise']),
});

export const JobSteeringSchema = z.object({
  ticket: z.string(),
  flow: z.string(),
  requests: SteeringRequestSchema.array(),
  team: TeamMemberSchema.array(),
});
export type JobSteering = z.infer<typeof JobSteeringSchema>;
export type SteeringRequest = z.infer<typeof SteeringRequestSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;

const ExpertSchema = z.object({
  initials: z.string(),
  color: z.string(),
  name: z.string(),
  role: z.string(),
  roleTone: z.enum(['accent', 'default']),
  note: z.string(),
  pinned: z.boolean(),
});

export const SteeringDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.string(),
  state: RequestStateSchema,
  meta: z.string(),
  breadcrumb: z.string().array(),
  context: z
    .object({
      headline: z.string(),
      body: z.string(),
      link: z.object({
        icon: z.string(),
        title: z.string(),
        sub: z.string(),
        targetLabel: z.string(),
        target: z.string(),
      }),
    })
    .nullable(),
  actionZone: z
    .object({
      label: z.string(),
      title: z.string(),
      sub: z.string(),
      badge: z.string(),
    })
    .nullable(),
  experts: ExpertSchema.array(),
  deliberation: z
    .object({
      proposal: z.object({
        initials: z.string(),
        color: z.string(),
        name: z.string(),
        role: z.string(),
        age: z.string(),
        text: z.string(),
      }),
      votes: z.object({ approve: z.number(), requestChanges: z.number() }),
      verdict: z.string(),
    })
    .nullable(),
  props: z
    .object({
      label: z.string(),
      value: z.string(),
      tone: z.enum(['default', 'accent', 'danger', 'muted']),
    })
    .array(),
});
export type SteeringDetail = z.infer<typeof SteeringDetailSchema>;
