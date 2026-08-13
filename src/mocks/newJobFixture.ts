import type { NewJobDraft } from '@/schemas/newJob';

// The design's new-job-1 intake composer, verbatim.
export const newJobDraft: NewJobDraft = {
  title: 'Start a new job',
  subtitle: 'Describe what you need — or start from one of your job types.',
  steps: ['Intake', 'Scoping', 'Confirm'],
  progress: { label: '2 / 3', extra: '+1 optional', pct: 66 },
  product: 'Tide Platform',
  jobType: 'resolve-bug-v2',
  scales: ['S', 'M', 'L'],
  selectedScale: 'S',
  riskNote: '— assessed from type + scale',
  riskTraits: ['local', 'non-breaking', 'full autonomy'],
  tags: [
    { name: 'add-endpoint-v1', count: '16×', weight: 1 },
    { name: 'implement-feature-v3', count: '48×', weight: 3 },
    { name: 'migrate-schema-v1', count: '14×', weight: 1 },
    { name: 'optimize-query-v1', count: '9×', weight: 0 },
    { name: 'patch-security-v2', count: '7×', weight: 0 },
    { name: 'refactor-module-v2', count: '21×', weight: 2 },
    { name: 'resolve-bug-v2', count: '56×', weight: 3 },
    { name: 'update-docs-v1', count: '11×', weight: 0 },
    { name: 'upgrade-deps-v1', count: '29×', weight: 2 },
    { name: 'write-tests-v2', count: '18×', weight: 1 },
  ],
  prereqs: [
    {
      id: 'codebase',
      name: 'Target codebase',
      sub: 'portfolio-service / main',
      requirement: 'required',
      status: 'carried',
      placeholder: null,
    },
    {
      id: 'repro',
      name: 'Reproduction steps',
      sub: 'same triage template',
      requirement: 'required',
      status: 'carried',
      placeholder: null,
    },
    {
      id: 'ticket',
      name: 'Jira ticket',
      sub: 'point me at it',
      requirement: 'required',
      status: 'needs-you',
      placeholder: 'Paste a test path, ticket link, or describe it…',
    },
    {
      id: 'test-target',
      name: 'Test target',
      sub: 'pytest · tests/regression',
      requirement: 'optional',
      status: 'inferred',
      placeholder: null,
    },
  ],
  paraphraseLabel: 'WHAT YOU ASKED',
  paraphrase:
    'Fix the failing checkout regression in portfolio-service — pin the repro at tests/regression/test_checkout.py, keep behaviour otherwise unchanged.',
  coordinator: {
    text: 'Routed → bug-fix (v2) — matches an existing workflow for this job-request type.',
    accept: 'Use this workflow',
    reject: 'Not right → Compose a new one',
  },
  addedContext: [
    {
      icon: 'description',
      label: 'tests/regression/test_checkout.py',
      accent: true,
    },
    { icon: 'link', label: 'triage-bot #482', accent: true },
    { icon: 'attach_file', label: 'stack-trace.txt', accent: false },
  ],
  ladderLabel: 'GATE LADDER · change · full autonomy',
  ladder: [
    { icon: 'construction', name: 'Build' },
    { icon: 'verified_user', name: 'Validate' },
    { icon: 'rocket_launch', name: 'Run' },
  ],
  estimate:
    'ESTIMATE · ~1 job · ~2 pts · ~$0.05 · ~4 min   (Small · band 1–2 · mid model)',
  commit: 'Start job',
  intentPlaceholder: 'Describe the job, or pick a job type above…',
  attachments: [
    { icon: 'attach_file', label: 'auth-spec.md' },
    { icon: 'link', label: 'github.com/skoolscout/platform/issues/142' },
  ],
};
