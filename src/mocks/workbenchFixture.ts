import type { WorkbenchRow, WorkbenchSection } from '@/schemas/workbench';

// Condensed from the design's 28 workspace/manage screens: titles, stats,
// and each view's defining cards are verbatim; long tables keep their top
// rows.
function row(title: string, opts: Partial<WorkbenchRow> = {}): WorkbenchRow {
  return {
    title,
    meta: null,
    sub: null,
    badge: null,
    badgeTone: 'default',
    stat: null,
    statTone: 'default',
    ...opts,
  };
}

const stat = (label: string, value: string, sub: string | null = null) => ({
  label,
  value,
  sub,
});

export const planSection: WorkbenchSection = {
  title: 'Plan',
  scope: 'Digital Investor Platform · FeatureSet · all features',
  views: [
    {
      slug: 'discovery',
      tab: 'Discovery',
      subtitle: 'Discovery — distill raw input into curated artifacts',
      stats: [
        stat('ACTIVE JOBS', '3'),
        stat('ARTIFACTS', '6'),
        stat('CURATED', '2'),
        stat('PUBLISHED', '2'),
      ],
      cards: [
        {
          label: 'INVOKE DISCOVERY',
          sub: 'distill raw input into reusable artifacts · pick a job type',
          block: {
            kind: 'tiles',
            tiles: [
              {
                title: 'Codebase exploration',
                desc: 'Map an unfamiliar area of the codebase into a navigable reference.',
                action: 'Explore codebase',
              },
              {
                title: 'Research / spike',
                desc: 'Time-box an investigation of an approach, library, or trade-off.',
                action: 'Run spike',
              },
              {
                title: 'Root-cause investigation',
                desc: 'Trace a defect or anomaly back to its origin in the system.',
                action: 'Investigate',
              },
            ],
          },
        },
        {
          label: 'RUNNING JOBS',
          sub: 'in-flight distillation · live progress',
          block: {
            kind: 'list',
            rows: [
              row('Rebalance rules engine', {
                meta: 'CODEBASE',
                sub: 'step 4 / 5 · 318 files indexed · elapsed 6m',
                badge: 'Running',
                badgeTone: 'accent',
                stat: '72%',
                statTone: 'accent',
              }),
              row('Tax-lot export formats', {
                meta: 'SPIKE',
                sub: 'step 2 / 4 · comparing 3 libraries · elapsed 11m',
                badge: 'Running',
                badgeTone: 'accent',
                stat: '45%',
                statTone: 'accent',
              }),
              row('Statements PDF mismatch', {
                meta: 'ROOT-CAUSE',
                sub: 'waiting on repo access · queued 2m ago',
                badge: 'Awaiting',
                badgeTone: 'warning',
                stat: 'queued',
                statTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'ARTIFACT REPOSITORY',
          sub: 'curated discovery outputs · feed PRD authoring',
          block: {
            kind: 'table',
            columns: ['ARTIFACT', 'TYPE', 'STATE', 'INFORMS', 'UPDATED'],
            rows: [
              [
                'Rebalance engine — code map',
                'Discovery Doc',
                'Published',
                'Rebalance rules',
                '2h ago',
              ],
              [
                'Order routing findings',
                'Finding',
                'Curated',
                'Fractional orders',
                '1d ago',
              ],
              [
                'Tax-lot export format spike',
                'Spike',
                'Curated',
                'Tax-lot export',
                '3h ago',
              ],
              [
                'Statements PDF mismatch',
                'Finding',
                'Draft',
                'Statements',
                '22m ago',
              ],
              [
                'Advisor chat retrieval spike',
                'Spike',
                'Published',
                'Advisor chat',
                '2d ago',
              ],
              [
                'Custodian API surface map',
                'Discovery Doc',
                'Draft',
                'Settlement',
                '30m ago',
              ],
            ],
          },
        },
      ],
    },
    {
      slug: 'prds',
      tab: 'PRDs',
      subtitle: 'PRDs — author, publish & refine product requirements',
      stats: [
        stat('TOTAL PRDS', '4', 'across 4 features'),
        stat('PUBLISHED', '1', 'Fractional orders v2'),
        stat('IN REVIEW', '1', 'Rebalance rules'),
        stat('DRAFT', '1', 'Tax-lot export'),
      ],
      cards: [
        {
          label: 'PRD LIFECYCLE',
          sub: 'draft → publish → review → refine · terminal artifact — complete at publish',
          block: {
            kind: 'pills',
            items: [
              { label: 'DRAFT', sub: '1 · Tax-lot export', tone: 'muted' },
              {
                label: 'PUBLISHED',
                sub: '1 · Fractional orders',
                tone: 'active',
              },
              {
                label: 'IN REVIEW',
                sub: '1 · Rebalance rules',
                tone: 'accent',
              },
              { label: 'REFINE', sub: '1 · Statements', tone: 'warning' },
            ],
          },
        },
        {
          label: 'PRD LIBRARY',
          sub: '4 docs · 1 published · 1 in review · 1 refine · 1 draft',
          block: {
            kind: 'table',
            columns: [
              'PRD',
              'FEATURE',
              'STATE',
              'OWNER',
              'ROADMAP ↑',
              'TRACE ↓',
            ],
            rows: [
              [
                'Fractional orders v2',
                'Fractional orders',
                'Published',
                'feature-spec · J-204',
                'M1 · Custody',
                '6 § · 5 sources',
              ],
              [
                'Rebalance rules',
                'Rebalance rules',
                'In review',
                'feature-spec · J-211',
                'M2 · Advisor',
                '5 § · 4 sources',
              ],
              [
                'Statements & tax docs',
                'Statements',
                'Refine',
                'feature-spec · J-198',
                'M2 · Advisor',
                '4 § · 3 sources',
              ],
              [
                'Tax-lot export',
                'Tax-lot export',
                'Draft',
                'feature-spec · J-220',
                'M3 · Reporting',
                '3 § · 2 sources',
              ],
            ],
          },
        },
        {
          label: 'AUTHORING PRD · Rebalance rules',
          sub: 'PRD #RB-1 · §1–§5 · ↑ Roadmap · M2 Advisor experience',
          block: {
            kind: 'list',
            rows: [
              row('§1 Overview & goals', {
                badge: 'Done',
                badgeTone: 'active',
              }),
              row('§2 User stories', { badge: 'Done', badgeTone: 'active' }),
              row('§3 Rebalance rules engine', {
                badge: 'In progress',
                badgeTone: 'accent',
              }),
              row('§4 Acceptance criteria', {
                badge: 'In review',
                badgeTone: 'warning',
              }),
              row('§5 Risks & open questions', {
                badge: 'To do',
                badgeTone: 'muted',
              }),
            ],
          },
        },
        {
          label: 'TERMINAL AT PUBLISH · RB-1',
          sub: null,
          block: {
            kind: 'note',
            tone: 'accent',
            label: 'PUBLISH',
            text: 'Rebalance rules — 2 of 5 sections complete. Publish closes the artifact.',
            action: 'Publish PRD',
          },
        },
      ],
    },
    {
      slug: 'roadmap',
      tab: 'Roadmap',
      subtitle:
        'Roadmap — capability milestones over time · milestones trace to PRDs',
      stats: [
        stat('SHIPPED', '1'),
        stat('ON TRACK', '3'),
        stat('AT RISK', '1'),
        stat('PLANNED', '3'),
      ],
      cards: [
        {
          label: 'PORTFOLIO ROADMAP',
          sub: 'capability milestones over time',
          block: {
            kind: 'table',
            columns: ['CAPABILITY', 'MILESTONE', 'QUARTER', 'PRD', 'STATE'],
            rows: [
              [
                'Fractional orders',
                'GA launch',
                'Q3 2026',
                'PRD #FO-2',
                'shipped',
              ],
              [
                'Rebalance rules',
                'v2 rules engine',
                'Q4 2026',
                'PRD #RB-1',
                'on track',
              ],
              [
                'Portfolio charts',
                'interactive charts',
                'Q4 2026',
                'PRD #PC-1',
                'on track',
              ],
              ['Statements', 'redesign GA', 'Q4 2026', 'PRD #ST-3', 'at risk'],
              [
                'Tax-lot export',
                'export beta',
                'Q1 2027',
                'PRD draft',
                'planned',
              ],
              [
                'KYC onboarding v2',
                'v2 rollout',
                'Q1 2027',
                'PRD #KYC-2',
                'on track',
              ],
              ['Advisor chat', 'pilot', 'Q2 2027', 'no PRD yet', 'planned'],
            ],
          },
        },
        {
          label: 'BLOCKING DECISION · OQ-1',
          sub: null,
          block: {
            kind: 'note',
            tone: 'warning',
            label: 'OQ-1',
            text: 'Roadmap output format is TBD — dated quarters (shown) vs now/next/later.',
            action: 'Decide',
          },
        },
      ],
    },
    {
      slug: 'decompose',
      tab: 'Decompose',
      subtitle: 'Decompose — PRD → deduped, traceable stories in Jira',
      stats: [
        stat('FORECASTED STORIES', '14'),
        stat('NEW (DEDUPED)', '9'),
        stat('MERGED / DUP', '4'),
        stat('PUSHED TO JIRA', '9'),
      ],
      cards: [
        {
          label: 'DECOMPOSITION FORECAST',
          sub: 'PRD → epics & stories · deduped vs backlog · pushed to Jira',
          block: {
            kind: 'table',
            columns: ['STORY', 'EPIC', 'TRACE', 'DEDUP', 'JIRA PUSH', 'SCALE'],
            rows: [
              [
                'Order routing engine',
                'Routing',
                'PRD §3.2',
                'New',
                'JIRA-4821',
                'M',
              ],
              [
                'Fractional lot allocation',
                'Routing',
                'PRD §3.3',
                'New',
                'JIRA-4822',
                'L',
              ],
              [
                'Settlement reconciliation',
                'Settlement',
                'PRD §4.1',
                'Dup → #1291',
                'merged',
                'S',
              ],
              [
                'Order status webhooks',
                'Webhooks',
                'PRD §3.5',
                'New',
                'pending',
                'S',
              ],
              [
                'Custodian adapter',
                'Custody',
                'PRD §5.0',
                'Conflict → #1188',
                'blocked',
                'M',
              ],
              [
                'Fee schedule update',
                'Fees',
                'PRD §6.1',
                'New',
                'JIRA-4825',
                'S',
              ],
            ],
          },
        },
        {
          label: 'DEDUP & DECONFLICT',
          sub: 'matches against the existing backlog',
          block: {
            kind: 'list',
            rows: [
              row('Custodian adapter', {
                meta: '↔ #1188',
                sub: 'keep both · merge · supersede',
                badge: 'RESOLVE',
                badgeTone: 'warning',
              }),
              row('Settlement reconciliation', {
                meta: '→ #1291',
                sub: 'folded into existing story',
                badge: 'MERGED',
                badgeTone: 'active',
              }),
              row('Rebalance threshold', {
                meta: '↔ #1302',
                sub: 'same story · cross-hat link',
                badge: 'LINKED',
                badgeTone: 'accent',
              }),
            ],
          },
        },
        {
          label: 'BLOCKING DECISION · OQ-2',
          sub: null,
          block: {
            kind: 'note',
            tone: 'warning',
            label: 'OQ-2',
            text: 'Is Jira the backlog system of record, or does Singularity own it?',
            action: 'Decide',
          },
        },
      ],
    },
    {
      slug: 'readiness',
      tab: 'Readiness',
      subtitle: 'Readiness — is the work ready to build?',
      stats: [
        stat('READY TO BUILD', '2'),
        stat('IN DEFINITION', '3'),
        stat('NEEDS DECOMPOSITION', '2'),
        stat('OPEN QUESTIONS', '3'),
      ],
      cards: [
        {
          label: 'FEATURES BY READINESS',
          sub: 'decomposed · specced · acceptance criteria',
          block: {
            kind: 'list',
            rows: [
              row('Tax-lot export', {
                sub: 'Decomp ✓ · Spec ✓ · AC ✓',
                badge: 'Ready to build',
                badgeTone: 'active',
              }),
              row('Portfolio charts', {
                sub: 'Decomp ✓ · Spec ✓ · AC ✓',
                badge: 'Ready to build',
                badgeTone: 'active',
              }),
              row('Fractional orders', {
                sub: 'Decomp ✓ · Spec … · AC —',
                badge: 'In definition',
                badgeTone: 'accent',
              }),
              row('Rebalance rules', {
                sub: 'Decomp ✓ · Spec … · AC —',
                badge: 'In definition',
                badgeTone: 'accent',
              }),
              row('KYC onboarding v2', {
                sub: 'Decomp — · Spec — · AC —',
                badge: 'Needs decomposition',
                badgeTone: 'warning',
              }),
              row('Statements redesign', {
                sub: 'Decomp — · Spec — · AC —',
                badge: 'Needs decomposition',
                badgeTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'SME ROUTING · NEEDS YOU',
          sub: '3 open questions kicked back to a human · awaiting SME',
          block: {
            kind: 'list',
            rows: [
              row('Which custodian for fractional lots?', {
                sub: 'from Feature specification · Tax SME',
                badge: 'HITL',
                badgeTone: 'warning',
                stat: '6h',
                statTone: 'warning',
              }),
              row('Confirm KYC tier for minors', {
                sub: 'from UX exploration · Compliance',
                badge: 'HITL',
                badgeTone: 'warning',
                stat: '1d',
                statTone: 'danger',
              }),
              row('Rebalance threshold — 5% or 3%?', {
                sub: 'from Estimation · PM',
                badge: 'HITL+gated',
                badgeTone: 'danger',
                stat: '3h',
                statTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'DECOMPOSITION FORECAST',
          sub: '18 of 29 stories decomposed · 11 coarse · not forecastable',
          block: {
            kind: 'list',
            rows: [
              row('Autonomy mix', {
                sub: 'full 9 · 50% — gated 4 · 22% — HITL 4 · 22% — HITL+gated 1 · 6%',
                stat: '5 route to a human',
                statTone: 'warning',
              }),
              row('Model spend · est', {
                sub: 'small $14 · mid $52 · frontier $90 · frontier-heavy (L-scale)',
                stat: '$156 total',
                statTone: 'accent',
              }),
              row('Risk', {
                sub: 'non-breaking 11 · breaking 5 · migration 2',
                stat: '18 stories',
                statTone: 'default',
              }),
            ],
          },
        },
        {
          label: 'AWAITING SPEC',
          sub: 'stories under-defined · block Build',
          block: {
            kind: 'list',
            rows: [
              row('Order routing rules', {
                sub: 'missing AC · cleared by Spec generation (running)',
                badge: 'clearing',
                badgeTone: 'accent',
              }),
              row('Minor account flow', {
                sub: 'missing spec · cleared by Feature specification (running)',
                badge: 'clearing',
                badgeTone: 'accent',
              }),
              row('Drift calculation', {
                sub: 'missing spec + AC · assign a definition job',
                badge: 'no job',
                badgeTone: 'danger',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'dependencies',
      tab: 'Dependencies',
      subtitle:
        'Dependencies & tracking — sequence the backlog, track artifacts',
      stats: [
        stat('STORIES', '8'),
        stat('BLOCKED', '4'),
        stat('CRITICAL PATH', '4'),
        stat('ARTIFACTS DONE', '8/12'),
      ],
      cards: [
        {
          label: 'DEPENDENCY GRAPH',
          sub: 'blocking relationships across the feature job graph · blocker → blocked',
          block: {
            kind: 'list',
            rows: [
              row('ORDERS → REBALANCE', {
                sub: 'Order routing engine (done) → Fractional lot allocation (active) → Rebalance rule engine → Drift threshold triggers',
                badge: 'ON TRACK',
                badgeTone: 'active',
              }),
              row('CUSTODY → STATEMENTS', {
                sub: 'Custodian adapter (conflict #1188) → Settlement reconciliation → Statement generation → Tax-lot statement export',
                badge: 'CRITICAL PATH',
                badgeTone: 'danger',
                stat: '4 BLOCKED',
                statTone: 'danger',
              }),
            ],
          },
        },
        {
          label: 'PRIORITY & SEQUENCING',
          sub: 'the critical path gates delivery · top 5 by downstream impact',
          block: {
            kind: 'table',
            columns: ['#', 'STORY', 'FEATURE', 'STATE', 'DOWNSTREAM'],
            rows: [
              [
                '1',
                'Custodian adapter',
                'Custody & Settlement',
                'blocked · critical',
                '3 downstream',
              ],
              [
                '2',
                'Fractional lot allocation',
                'Fractional Orders',
                'active',
                '3 downstream',
              ],
              [
                '3',
                'Settlement reconciliation',
                'Custody & Settlement',
                'blocked · critical',
                '2 downstream',
              ],
              [
                '4',
                'Statement generation',
                'Statements',
                'blocked · critical',
                '1 downstream',
              ],
              [
                '5',
                'Rebalance rule engine',
                'Rebalance Rules',
                'queued',
                '1 downstream',
              ],
            ],
          },
        },
        {
          label: 'ARTIFACT & STORY TRACKING',
          sub: '8 of 12 artifacts complete · 4 of 8 stories ready',
          block: {
            kind: 'table',
            columns: ['AREA', 'DISCOVERY', 'PRD', 'ROADMAP', 'STORIES READY'],
            rows: [
              [
                'Fractional Orders',
                'done',
                'published',
                'Q3 · GA',
                '2/2 ready',
              ],
              [
                'Rebalance Rules',
                'done',
                'in review',
                'Q4 · committed',
                '2/2 ready',
              ],
              [
                'Custody & Settlement',
                'done',
                'in review',
                'Q4 · committed',
                '0/2 ready',
              ],
              [
                'Statements',
                'in review',
                'draft',
                'Q4 · committed',
                '0/2 ready',
              ],
            ],
          },
        },
      ],
    },
  ],
};

export const buildSection: WorkbenchSection = {
  title: 'Build',
  scope: 'Digital Investor Platform · Portfolio · Product',
  views: [
    {
      slug: 'dispatch',
      tab: 'Dispatch',
      subtitle: 'Dispatch — launch build jobs from ready stories',
      stats: [
        stat('READY TO BUILD', '6'),
        stat('DISPATCHED', '4'),
        stat('RUNNING', '3'),
        stat('AWAITING HITL', '1'),
      ],
      cards: [
        {
          label: 'READY TO BUILD',
          sub: 'stories pulled from Plan · scale auto-detected',
          block: {
            kind: 'table',
            columns: ['STORY', 'FEATURE · STORY ID', 'KIND', 'SCALE', 'LAUNCH'],
            rows: [
              [
                'Partial-share order routing',
                'Fractional Orders · FO-21',
                'greenfield',
                'M',
                'Launch',
              ],
              [
                'Drift-threshold rebalance trigger',
                'Rebalance Rules · RB-08',
                'brownfield',
                'L',
                'Selected',
              ],
              [
                'Quarterly statement PDF render',
                'Statements · ST-14',
                'greenfield',
                'S',
                'Launch',
              ],
              [
                'CSV tax-lot export (Schedule D)',
                'Tax-Lot Export · TX-05',
                'config',
                'S',
                'Launch',
              ],
              [
                'Step-3 document re-verification',
                'KYC Onboarding · KY-09',
                'migration',
                'M',
                'Launch',
              ],
            ],
          },
        },
        {
          label: 'DISPATCH CONFIG',
          sub: 'selected story → job kind · auto-scale derives autonomy tier & model class',
          block: {
            kind: 'list',
            rows: [
              row('Drift-threshold rebalance trigger', {
                meta: 'Rebalance Rules · RB-08',
                sub: 'ready · from Plan',
                badge: 'SELECTED',
                badgeTone: 'accent',
              }),
              row('Auto-scale L · large', {
                sub: 'from diff footprint',
                stat: 'brownfield',
                statTone: 'accent',
              }),
              row('Autonomy tier · HITL + gated', {
                sub: 'human approves each gate',
                stat: 'frontier model',
                statTone: 'accent',
              }),
              row('Risk · High', {
                sub: 'money-movement path · scale L · brownfield → HITL + gated · frontier',
                badge: 'Dispatch build job',
                badgeTone: 'accent',
              }),
            ],
          },
        },
        {
          label: 'RECENTLY DISPATCHED',
          sub: 'just-launched build jobs · live status',
          block: {
            kind: 'list',
            rows: [
              row('Allocation donut + performance line', {
                meta: 'Portfolio Charts · PC-11 · M · gated · mid',
                sub: 'step 2 / 7 · scaffolding chart components · elapsed 3m',
                badge: 'Running',
                badgeTone: 'accent',
              }),
              row('Glidepath schedule loader', {
                meta: 'Rebalance Rules · RB-04 · S · full · small',
                sub: 'step 1 / 4 · generating loader module · elapsed 1m',
                badge: 'Running',
                badgeTone: 'accent',
              }),
              row('Order rounding rule fix', {
                meta: 'Fractional Orders · FO-18 · S · HITL · mid',
                sub: 'paused at gate 1 · awaiting supervisor approval · 2m',
                badge: 'Awaiting',
                badgeTone: 'warning',
              }),
              row('Statement locale number format', {
                meta: 'Statements · ST-09 · S · full · small',
                sub: 'step 3 / 3 · running locale tests · elapsed 5m',
                badge: 'Running',
                badgeTone: 'accent',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'active',
      tab: 'Active',
      subtitle: "Active — what's running, blocked & needs you",
      stats: [
        stat('ACTIVE JOBS', '5', 'in Build phase'),
        stat('UNATTENDED', '2', 'full autonomy'),
        stat('NEEDS YOU', '3', '1 HITL+gated · 2 gated'),
        stat('FAILED / BLOCKED', '2', '1 failed · 1 blocked'),
      ],
      cards: [
        {
          label: 'NEEDS YOU',
          sub: 'your HITL + gated jobs · sorted by wait time',
          block: {
            kind: 'list',
            rows: [
              row('KYC gate · accredited-investor check', {
                badge: 'HITL+gated',
                badgeTone: 'danger',
                sub: 'DECISION',
                stat: '4h 10m',
                statTone: 'danger',
              }),
              row('Portfolio rebalance guardrails', {
                badge: 'gated',
                badgeTone: 'warning',
                sub: 'APPROVAL',
                stat: '2h 35m',
                statTone: 'warning',
              }),
              row('Dividend reinvest scheduler', {
                badge: 'HITL',
                badgeTone: 'warning',
                sub: 'DECISION',
                stat: '48m',
                statTone: 'default',
              }),
            ],
          },
        },
        {
          label: 'MY ACTIVE JOBS',
          sub: 'Build · autonomy lens · agent health · branch/PR',
          block: {
            kind: 'list',
            rows: [
              row('Checkout latency fix', {
                meta: 'Fractional orders · #1291 · M · full · mid',
                sub: 'step 5 / 7 · ETA 8m · feat/checkout-perf · PR #1291 open · CI passing',
                badge: 'running',
                badgeTone: 'accent',
              }),
              row('Fractional order routing', {
                meta: 'Fractional orders · #1296 · L · gated · frontier',
                sub: '7 / 7 · ready to merge · feat/frac-routing · PR #1296 open · CI passing',
                badge: 'awaiting approval',
                badgeTone: 'warning',
              }),
              row('Portfolio chart render', {
                meta: 'Portfolio charts · #1277 · S · full · small',
                sub: 'step 2 / 4 · ETA 4m · fix/chart-render · PR draft · CI running',
                badge: 'running',
                badgeTone: 'accent',
              }),
              row('Rebalance threshold change', {
                meta: 'Rebalance rules · #1302 · L · HITL+gated · frontier',
                sub: 'failed · step 4 / 6 (regression) · feat/rebalance · PR #1302 · CI failing',
                badge: 'failed',
                badgeTone: 'danger',
              }),
              row('Statement export', {
                meta: 'Statements · #1268 · M · blocked · mid',
                sub: 'paused · waiting on Auth rotation · feat/statements · PR — · CI —',
                badge: 'blocked',
                badgeTone: 'muted',
              }),
            ],
          },
        },
        {
          label: 'FAILURE DRILL-IN · Rebalance threshold change',
          sub: 'failing step · logs · branch / PR state',
          block: {
            kind: 'list',
            rows: [
              row('$ pnpm test:regression --filter rebalance', {
                sub: '✗ drift.spec.ts › settles within tolerance — AssertionError: expected drift 0.42 to be ≤ 0.05 at RebalanceEngine.settle (src/engine.ts:214)',
                badge: '3 failed · 41 passed',
                badgeTone: 'danger',
              }),
              row('feat/rebalance · PR #1302 open', {
                badge: 'CI failing',
                badgeTone: 'danger',
                stat: 'merge blocked',
                statTone: 'danger',
              }),
            ],
          },
        },
        {
          label: 'AGENT WORK HEALTH',
          sub: 'progress · ETA · throughput across my jobs',
          block: {
            kind: 'list',
            rows: [
              row('AVG COMPLETE 49% · DONE TODAY 6 · THROUGHPUT 1.2/h', {}),
              row('Portfolio rebalancer', {
                meta: 'FULL',
                stat: '5/7 · 8m',
                statTone: 'accent',
              }),
              row('Dividend reconciliation', {
                meta: 'GATED',
                stat: '3/6 · 22m',
                statTone: 'default',
              }),
              row('KYC onboarding flow', {
                meta: 'HITL',
                stat: '2/8 · 35m',
                statTone: 'warning',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'review',
      tab: 'Review',
      subtitle: 'Review — diff, CI & blast radius → approve, reject, merge',
      stats: [
        stat('READY TO MERGE', '3'),
        stat('IN REVIEW', '2'),
        stat('MERGED TODAY', '7'),
        stat('CHANGES REQ', '1'),
      ],
      cards: [
        {
          label: 'REVIEW QUEUE',
          sub: 'ready-to-merge build jobs · diff · CI · blast radius',
          block: {
            kind: 'table',
            columns: [
              'JOB',
              'FEATURE · STORY',
              'DIFF',
              'CI',
              'BLAST',
              'ACTION',
            ],
            rows: [
              [
                'Fractional order routing',
                'Fractional orders · #1296',
                '+420 −85 · 12f',
                '8/8',
                'MEDIUM',
                'reviewing',
              ],
              [
                'Statement export',
                'Statements · #1268',
                '+180 −20 · 5f',
                '6/6',
                'LOW',
                'Review',
              ],
              [
                'Portfolio chart render',
                'Portfolio charts · #1277',
                '+95 −12 · 3f',
                '5/5',
                'LOW',
                'Review',
              ],
              [
                'Tax-lot export',
                'Tax-lot export · #1305',
                '+210 −30 · 6f',
                '7/7',
                'LOW',
                'changes req',
              ],
            ],
          },
        },
        {
          label: 'REVIEWING · Fractional order routing',
          sub: 'Story #1296 · PR #1296 · ready to merge · blast radius MEDIUM',
          block: {
            kind: 'list',
            rows: [
              row('DIFF · 12 files · +420 −85', {
                sub: 'src/orders/routing.ts +120 −10 · allocator.ts +85 −5 · fractional.ts +140 −40 · routing.spec.ts +75 −30',
              }),
              row('CI CHECKS · 8 / 8 passing', {
                sub: 'build · unit (142) · integration (38) · lint · regression',
                badge: 'passing',
                badgeTone: 'active',
              }),
              row('BLAST RADIUS · Orders · Settlement · Portfolio', {
                sub: 'Touches the settlement path · 3 downstream stories depend on this',
                badge: 'MEDIUM',
                badgeTone: 'warning',
              }),
              row('Request changes · Approve · Merge → Validate', {
                badge: 'ACTIONS',
                badgeTone: 'accent',
              }),
            ],
          },
        },
        {
          label: 'BLOCKING DECISION · OQ-1',
          sub: null,
          block: {
            kind: 'note',
            tone: 'warning',
            label: 'OQ-1',
            text: 'Does Singularity host PR review & merge, or link out to GitHub?',
            action: 'Decide',
          },
        },
      ],
    },
    {
      slug: 'resolve',
      tab: 'Resolve',
      subtitle: 'Resolve — failures, retry budget & frontier-burn',
      stats: [
        stat('FAILED', '3'),
        stat('BLOCKED', '2'),
        stat('AT RETRY CAP', '1'),
        stat('BURN TODAY', '$4.18'),
      ],
      cards: [
        {
          label: 'FAILED & BLOCKED JOBS',
          sub: '5 build jobs need resolution · failed step · attempts · spend',
          block: {
            kind: 'table',
            columns: [
              'JOB',
              'FEATURE · STORY',
              'FAILED STEP · REASON',
              'ATTEMPTS',
              'SPEND',
              'STATUS',
            ],
            rows: [
              [
                'Rebalance threshold change',
                'Portfolio rebalancing · #1342',
                'frontier codegen · schema drift',
                '3/5',
                '$3.10',
                'retrying',
              ],
              [
                'Dividend reinvest calc',
                'Dividend engine · #1318',
                'unit tests · rounding assertion',
                '2/5',
                '$0.42',
                'failed',
              ],
              [
                'Webhook signature verify',
                'Webhooks · #1357',
                'integration test · HMAC mismatch',
                '5/5',
                '$0.66',
                'halted → human',
              ],
              [
                'Portfolio sync worker',
                'Portfolio sync · #1361',
                'waiting on Auth rotation',
                '—',
                '$0.00',
                'blocked',
              ],
              [
                'Statement PDF render',
                'Statements · #1349',
                'render queue saturated',
                '—',
                '$0.00',
                'blocked',
              ],
            ],
          },
        },
        {
          label: 'FRONTIER-BURN ALARM · Rebalance threshold change',
          sub: 'frontier retry loop — cost climbs each attempt',
          block: {
            kind: 'list',
            rows: [
              row('Try 1 $0.82 · Try 2 $1.04 · Try 3 $1.24', {
                sub: '▲ 19% vs Try 2 · ≈ $5.60 projected if it runs to the retry cap',
                stat: '$3.10 accumulated',
                statTone: 'danger',
              }),
              row(
                'A non-frontier retry would cost ≈ $0.12/attempt — 10× cheaper.',
                {
                  badge: 'Halt now & route to human',
                  badgeTone: 'danger',
                },
              ),
            ],
          },
        },
        {
          label: 'BLOCKER RESOLUTION PATH',
          sub: 'how each blocked job clears — self-resolve or escalate',
          block: {
            kind: 'list',
            rows: [
              row('Portfolio sync worker', {
                sub: 'Waiting on Auth rotation · cross-hat → Secure-hat · clears when rotation lands · no ETA',
                badge: 'routes to human',
                badgeTone: 'warning',
              }),
              row('Statement PDF render', {
                sub: 'Render queue saturated · auto-resolves · queue draining',
                badge: 'self-clears · ETA 6 min',
                badgeTone: 'active',
              }),
              row('Webhook signature verify', {
                sub: 'hit 5 / 5 attempts ($0.66 spent) — auto-retry exhausted',
                badge: 'ESCALATED TO HUMAN',
                badgeTone: 'danger',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'artifacts',
      tab: 'Artifacts',
      subtitle: 'Artifacts — docs, tests, SDKs & images · published / exported',
      stats: [
        stat('ARTIFACTS', '7'),
        stat('PUBLISHED', '4'),
        stat('EXPORTED', '2'),
        stat('BUILDING', '1'),
      ],
      cards: [
        {
          label: 'ARTIFACT LIFECYCLE',
          sub: 'build output → published / exported · never promoted to validate',
          block: {
            kind: 'pills',
            items: [
              { label: 'BUILD', sub: '7 jobs', tone: 'accent' },
              { label: 'ARTIFACT', sub: '7 outputs', tone: 'default' },
              { label: 'PUBLISH / EXPORT', sub: '6 shipped', tone: 'active' },
              { label: 'VALIDATE', sub: 'n/a · terminal', tone: 'muted' },
            ],
          },
        },
        {
          label: 'BUILD ARTIFACTS',
          sub: 'artifact-terminal outputs',
          block: {
            kind: 'table',
            columns: ['ARTIFACT', 'TYPE', 'STATE', 'JOB', 'TRACE'],
            rows: [
              [
                '@dip/trade-sdk v2.4.0',
                'SDK',
                'published',
                'build #4821',
                'Fractional Orders · FO-2',
              ],
              [
                'Investor API Reference',
                'docs',
                'published',
                'build #4830',
                'Public Order API · API-7',
              ],
              [
                'dip-gateway:2.4.0',
                'image',
                'exported',
                'build #4833',
                'Order Gateway · OG-3',
              ],
              [
                'Portfolio E2E suite',
                'tests',
                'published',
                'build #4827',
                'Rebalance flow · PF-12',
              ],
              [
                '@dip/webhooks-sdk v0.9',
                'SDK',
                'building',
                'build #4840',
                'Status webhooks · SW-3',
              ],
            ],
          },
        },
        {
          label: 'PUBLISH TARGETS',
          sub: 'where each artifact ships',
          block: {
            kind: 'list',
            rows: [
              row('npm · @dip', { sub: 'SDK packages', stat: '2' }),
              row('ghcr.io', { sub: 'container images', stat: '1' }),
              row('developers.dip', { sub: 'API reference docs', stat: '1' }),
              row('s3://dip-artifacts', {
                sub: 'test & config bundles',
                stat: '3',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'chains',
      tab: 'Chains',
      subtitle: 'Chains — dependency graph, critical path & throughput',
      stats: [
        stat('BUILD JOBS', '9'),
        stat('COMPLETED', '5'),
        stat('ON CRITICAL PATH', '5'),
        stat('BLOCKED', '1'),
      ],
      cards: [
        {
          label: 'BUILD-JOB DEPENDENCY GRAPH',
          sub: 'Fractional Orders & Auto-Rebalance v2 · blocker → blocked',
          block: {
            kind: 'list',
            rows: [
              row('FRACTIONAL ORDERS · 3 JOBS', {
                sub: 'Order schema migration → Fractional lot allocator (FRONTIER) → Order routing handler',
                badge: 'ON TRACK',
                badgeTone: 'active',
              }),
              row('AUTO-REBALANCE · 3 JOBS', {
                sub: 'Rebalance rule parser → Drift trigger engine (running) → Rebalance scheduler',
                badge: 'IN PROGRESS',
                badgeTone: 'accent',
              }),
              row('STATEMENTS · 3 JOBS', {
                sub: 'Tax-lot ledger writer (FRONTIER) → Statement composer (blocked) → PDF render + sign',
                badge: 'CRITICAL PATH',
                badgeTone: 'danger',
                stat: '1 BLOCKED',
                statTone: 'danger',
              }),
              row('CRITICAL PATH · 5 jobs · ~12m remaining once unblocked', {
                sub: 'Fractional lot allocator → Order routing handler → Tax-lot ledger writer → …',
                stat: '38m elapsed',
                statTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'THROUGHPUT',
          sub: 'completed-job metrics over the 9-job feature set · last ~50m',
          block: {
            kind: 'list',
            rows: [
              row(
                'COMPLETED / HR 6.0 · SUCCESS 94% (16/17) · AVG 8m 24s · SPEND $4.18',
                {
                  sub: 'frontier 66% of spend',
                },
              ),
              row('Model mix', {
                sub: 'Frontier ×2 (12m 30s · $2.74) · Mid ×4 (6m 45s · $1.18) · Small ×3 (2m 50s · $0.26)',
              }),
              row('Status mix', {
                sub: 'Done ×5 · Active ×1 · Queued ×2 · Blocked ×1 (Statement composer, on the critical path)',
              }),
            ],
          },
        },
      ],
    },
  ],
};

export const validateSection: WorkbenchSection = {
  title: 'Validate',
  scope: 'Digital Investor Platform · Portfolio · Product',
  views: [
    {
      slug: 'intake',
      tab: 'Intake',
      subtitle:
        "Intake — what's entering validation & which gates apply per scale",
      stats: [
        stat('INCOMING', '4'),
        stat('DISPATCHED TODAY', '6'),
        stat('GATES AUTO-RUN', '25'),
        stat('SKIPPED · TERMINAL', '3'),
      ],
      cards: [
        {
          label: 'AUTO-DISPATCH TRIGGER',
          sub: 'Build job merged → main · validation dispatches on merge · no manual step',
          block: {
            kind: 'pills',
            items: [
              { label: 'MERGE', sub: 'from Build', tone: 'default' },
              { label: 'INTAKE', sub: '4 entering', tone: 'accent' },
              { label: 'GATE SET', sub: 'by scale', tone: 'default' },
              { label: 'DISPATCH', sub: '6 today', tone: 'active' },
            ],
          },
        },
        {
          label: 'GATE POLICY',
          sub: 'scale-derived · cumulative · auto-dispatched on merge',
          block: {
            kind: 'list',
            rows: [
              row('S · SMALL · 2 gates', { sub: 'lint · unit' }),
              row('M · MEDIUM · 4 gates', {
                sub: 'lint · unit · integration · security-scan',
              }),
              row('L · LARGE · 7 gates', {
                sub: 'lint · unit · integration · security-scan · compliance · perf · a11y',
              }),
            ],
          },
        },
        {
          label: 'RECENTLY ENTERED',
          sub: 'dispatched today · gate status per job',
          block: {
            kind: 'table',
            columns: [
              'STORY',
              'FEATURE',
              'SOURCE MERGE',
              'SCALE',
              'GATES',
              'STATUS',
            ],
            rows: [
              [
                'Order routing engine',
                'Fractional orders',
                'PR #4821',
                'M',
                '4',
                'Running',
              ],
              [
                'Threshold evaluator',
                'Rebalance rules',
                'PR #4830',
                'L',
                '7',
                'Dispatched',
              ],
              [
                'Card tokenization',
                'Checkout',
                'PR #4833',
                'M',
                '4',
                'Running',
              ],
              [
                'Session token rotation',
                'Auth rotation',
                'PR #4835',
                'S',
                '2',
                'Passed',
              ],
              [
                'Portfolio chart widget',
                'Portfolio charts',
                'PR #4812',
                'M',
                '4',
                'Failed · sec-scan',
              ],
            ],
          },
        },
      ],
    },
    {
      slug: 'queue',
      tab: 'Queue',
      subtitle: 'Queue — pass rate, coverage, failing gates & sign-offs',
      stats: [
        stat('IN VALIDATION', '24'),
        stat('PASS RATE', '91%', 'validators passing'),
        stat('FAILING GATES', '3', 'across 2 jobs'),
        stat('AWAITING SIGN-OFF', '3', 'gated · HITL'),
      ],
      cards: [
        {
          label: 'NEEDS YOU · GATED SIGN-OFFS',
          sub: 'compliance & security approvals · oldest waited 2h 40m',
          block: {
            kind: 'list',
            rows: [
              row('Rebalance threshold change', {
                sub: 'Compliance review · needs Compliance officer',
                badge: 'Approve',
                badgeTone: 'accent',
                stat: '2h 40m',
                statTone: 'warning',
              }),
              row('Statement export', {
                sub: 'Security sign-off · needs Security lead',
                badge: 'Approve',
                badgeTone: 'accent',
                stat: '1h 12m',
                statTone: 'default',
              }),
              row('Funding webhook', {
                sub: 'Security sign-off · needs AppSec reviewer',
                badge: 'Approve',
                badgeTone: 'accent',
                stat: '34m',
                statTone: 'default',
              }),
            ],
          },
        },
        {
          label: 'VALIDATE JOB QUEUE',
          sub: 'dispatch overlay · pass rate · validators',
          block: {
            kind: 'list',
            rows: [
              row('Auth rotation', {
                meta: 'Token security · #1284 · L · gated · frontier',
                sub: 'coverage 81% · SAST · Regression · Secrets scan · Compliance',
                badge: '2 failing',
                badgeTone: 'danger',
                stat: 'awaiting sign-off',
                statTone: 'warning',
              }),
              row('Checkout latency fix', {
                meta: 'Fractional orders · #1291 · M · full · mid',
                sub: 'coverage 86% · SAST · Regression · Perf · a11y',
                badge: 'all pass',
                badgeTone: 'active',
                stat: '94% pass',
                statTone: 'active',
              }),
              row('Portfolio chart render', {
                meta: 'Portfolio charts · #1277 · S · full · small',
                sub: 'coverage 72% · Unit · Visual · a11y',
                badge: 'all pass',
                badgeTone: 'active',
                stat: '100% pass',
                statTone: 'active',
              }),
              row('Rebalance threshold change', {
                meta: 'Rebalance rules · #1302 · L · gated · frontier',
                sub: 'coverage 90% · SAST · Regression · Risk model · Compliance',
                badge: '1 failing',
                badgeTone: 'danger',
                stat: '88% pass',
                statTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'FAILING GATE · DRILL-IN · Auth rotation',
          sub: 'which validator failed & why',
          block: {
            kind: 'list',
            rows: [
              row('Secrets scan · FAILED', {
                sub: 'auth/rotation.ts:42 — AWS access-key committed in plaintext config',
                badge: 'FAILED',
                badgeTone: 'danger',
              }),
              row('Compliance · PENDING', {
                sub: 'SOC2 · CC6.1 — awaiting control-mapping review before sign-off',
                badge: 'PENDING',
                badgeTone: 'warning',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'signoff',
      tab: 'Sign-off',
      subtitle:
        'Sign-off — gated compliance & security approvals, with evidence',
      stats: [
        stat('AWAITING SIGN-OFF', '3'),
        stat('COMPLIANCE', '1'),
        stat('SECURITY', '2'),
        stat('OLDEST WAIT', '4h 12m'),
      ],
      cards: [
        {
          label: 'PENDING SIGN-OFFS',
          sub: '3 gates awaiting a human signature · evidence attached',
          block: {
            kind: 'table',
            columns: [
              'JOB',
              'FEATURE · STORY',
              'GATE',
              'APPROVER ROLE',
              'WAIT',
            ],
            rows: [
              [
                'Rebalance threshold change',
                'Portfolio rebalancing · #1342',
                'Compliance review',
                'Compliance Officer',
                '4h 12m',
              ],
              [
                'Statement export',
                'Statements · #1349',
                'Security sign-off',
                'Security Lead',
                '1h 48m',
              ],
              [
                'Funding webhook',
                'Funding · #1357',
                'Security sign-off',
                'Security Lead',
                '22m',
              ],
            ],
          },
        },
        {
          label: 'EVIDENCE AT THE APPROVAL POINT · Rebalance threshold change',
          sub: 'what passed — and the one thing needing your judgment',
          block: {
            kind: 'list',
            rows: [
              row('Unit + integration tests', {
                stat: '124 passed',
                statTone: 'active',
              }),
              row('Security scan (SAST + deps)', {
                stat: '0 critical · 0 high',
                statTone: 'active',
              }),
              row('Change diff reviewed', {
                stat: '2 files · +38 / −12',
                statTone: 'default',
              }),
              row('Threshold delta exceeds auto-approve ceiling', {
                badge: 'NEEDS JUDGMENT',
                badgeTone: 'warning',
                stat: '+0.50% vs 0.25% cap',
                statTone: 'warning',
              }),
              row('Control mapping', {
                sub: 'SOC2 CC6.1 · PCI DSS 6.3 · SOX 404',
              }),
              row('Blast radius', {
                sub: 'Production · 14,200 active portfolios · live rebalance thresholds · reversible < 2 min',
              }),
            ],
          },
        },
        {
          label: 'SIGNING AS COMPLIANCE OFFICER · EDWIN CRUZ',
          sub: null,
          block: {
            kind: 'note',
            tone: 'accent',
            label: 'SIGN-OFF',
            text: 'Recorded to the immutable audit trail with the evidence shown above.',
            action: 'Approve & sign off',
          },
        },
      ],
    },
    {
      slug: 'resolve',
      tab: 'Resolve',
      subtitle: 'Resolve & route — fail → back to Build, pass → promote to Run',
      stats: [
        stat('FAILING GATES', '3'),
        stat('ROUTING TO BUILD', '2'),
        stat('READY TO PROMOTE', '4'),
        stat('FLAKY GATES', '1'),
      ],
      cards: [
        {
          label: 'FAIL → ROUTE BACK TO BUILD',
          sub: '3 gates · 2 jobs',
          block: {
            kind: 'list',
            rows: [
              row('Auth rotation · #1284', {
                sub: 'Secrets-scan gate · secret detected in commit a3f1',
                badge: 'Route to Build',
                badgeTone: 'danger',
              }),
              row('Auth rotation · #1284', {
                sub: 'Dependency-audit gate · CVE-2026-1182 (high)',
                badge: 'Route to Build',
                badgeTone: 'danger',
              }),
              row('Checkout latency fix · #1291', {
                sub: 'Perf-budget gate · p95 +12% over budget',
                badge: 'Route to Build',
                badgeTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'PASS → PROMOTE TO RUN',
          sub: '4 jobs · all gates green · chain forward',
          block: {
            kind: 'list',
            rows: [
              row('Fractional order routing · #1296', {
                sub: '8/8 gates green · coverage 92% · blast radius medium',
                badge: 'Promote',
                badgeTone: 'active',
              }),
              row('Rebalance threshold change · #1302', {
                sub: '6/6 gates green · coverage 88%',
                badge: 'Promote',
                badgeTone: 'active',
              }),
              row('Funding webhook · #1340', {
                sub: '7/7 gates green · signed off by AppSec',
                badge: 'Promote',
                badgeTone: 'active',
              }),
              row('Dividend reinvest scheduler · #1355', {
                sub: '5/5 gates green · coverage 90%',
                badge: 'Promote',
                badgeTone: 'active',
              }),
            ],
          },
        },
        {
          label: 'CROSS-HAT THREAD · STORY #1284',
          sub: 'one Story rendered coherently across hats',
          block: {
            kind: 'pills',
            items: [
              {
                label: 'VALIDATE',
                sub: 'Secrets-scan FAILED',
                tone: 'danger',
              },
              { label: 'BUILD', sub: 'fix job queued', tone: 'accent' },
              {
                label: 'BUILD',
                sub: '#1268 waiting on #1284',
                tone: 'muted',
              },
            ],
          },
        },
      ],
    },
    {
      slug: 'evidence',
      tab: 'Evidence',
      subtitle:
        'Evidence — reports, attestations, sign-off records & audit trail',
      stats: [
        stat('EVIDENCE', '8'),
        stat('PUBLISHED', '5'),
        stat('EXPORTED', '3'),
        stat('ATTESTATIONS', '2'),
      ],
      cards: [
        {
          label: 'EVIDENCE LIFECYCLE',
          sub: 'gate run → sign / attest → publish / export · artifact-terminal',
          block: {
            kind: 'pills',
            items: [
              { label: 'GATE RUN', sub: '8 runs', tone: 'default' },
              { label: 'SIGN / ATTEST', sub: '8 signed', tone: 'accent' },
              { label: 'PUBLISH / EXPORT', sub: '8 shipped', tone: 'active' },
              { label: 'AUDIT', sub: 'fit for audit', tone: 'muted' },
            ],
          },
        },
        {
          label: 'EVIDENCE ARTIFACTS',
          sub: 'artifact-terminal · published / exported',
          block: {
            kind: 'table',
            columns: ['EVIDENCE', 'TYPE', 'STATE', 'GATE RUN', 'SIGNER'],
            rows: [
              [
                'Portfolio E2E test report',
                'TEST',
                'published',
                'G-2208',
                'CI Runner',
              ],
              [
                'Secrets-scan report',
                'SCAN',
                'published',
                'G-2210',
                'SecOps Bot',
              ],
              [
                'SOC 2 Type II attestation',
                'ATTEST',
                'exported',
                'G-2215',
                'J. Okafor',
              ],
              [
                'PCI-DSS control attestation',
                'ATTEST',
                'published',
                'G-2215',
                'A. Mensah',
              ],
              [
                'Security sign-off record',
                'SIGN-OFF',
                'published',
                'G-2212',
                'M. Reyes · CISO',
              ],
              [
                'Release audit-trail export',
                'AUDIT',
                'exported',
                'G-2216',
                'Release Bot',
              ],
            ],
          },
        },
        {
          label: 'AUDIT TRAIL',
          sub: 'immutable · most recent first',
          block: {
            kind: 'list',
            rows: [
              row('SOC 2 attestation exported', {
                meta: '14:32',
                sub: 'J. Okafor → FI GRC',
              }),
              row('Security sign-off published', {
                meta: '13:50',
                sub: 'M. Reyes → store',
              }),
              row('Release audit-trail exported', {
                meta: '12:10',
                sub: 'Release Bot → FI GRC',
              }),
              row('Secrets-scan report published', {
                meta: '11:20',
                sub: 'SecOps Bot → store',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'health',
      tab: 'Health',
      subtitle:
        'Gate health — pass-rate trends, flaky-gate detection & coverage',
      stats: [
        stat('TOTAL RUNS', '1,284', 'across 7 gate types · 10d'),
        stat('PASS RATE', '91%', 'last 10d · all-time 93%'),
        stat('FLAKY GATES', '3', 'inconsistent pass/fail'),
        stat('COVERAGE', '87%', '6 areas · +1.6 pts'),
      ],
      cards: [
        {
          label: 'FLAKY-GATE DETECTION',
          sub: 'gates that pass/fail inconsistently · last 16 runs',
          block: {
            kind: 'table',
            columns: ['RANK', 'GATE', 'STABILITY', 'FAILS', 'VERDICT'],
            rows: [
              [
                '01',
                'integration · PR merge gate · e2e',
                '78%',
                '4 / 16',
                'FLAKY',
              ],
              ['02', 'perf · nightly + PR budget', '84%', '3 / 16', 'FLAKY'],
              [
                '03',
                'security-scan · SAST · dependency audit',
                '88%',
                '2 / 16',
                'INTERMITTENT',
              ],
            ],
          },
        },
        {
          label: 'GATE-RUN SUMMARY',
          sub: 'aggregate runs by gate type · all-time',
          block: {
            kind: 'table',
            columns: [
              'GATE TYPE',
              'RUNS',
              'PASS RATE',
              'AVG DURATION',
              'STATUS',
            ],
            rows: [
              ['lint · eslint · biome', '312', '99%', '0m 38s', 'STABLE'],
              ['unit · vitest · jest', '286', '96%', '2m 41s', 'STABLE'],
              ['integration · e2e', '198', '82%', '7m 12s', 'FLAKY'],
              ['security-scan', '142', '90%', '4m 05s', 'WATCH'],
              ['compliance', '98', '98%', '1m 22s', 'STABLE'],
              ['perf · budget · load', '124', '88%', '6m 48s', 'WATCH'],
              ['a11y · axe · wcag 2.2', '124', '97%', '1m 09s', 'STABLE'],
            ],
          },
        },
        {
          label: 'COVERAGE TRENDS',
          sub: 'line/branch coverage by area · Δ vs prior sprint · target 85%',
          block: {
            kind: 'list',
            rows: [
              row('Order Routing', {
                stat: '92% (+2.1)',
                statTone: 'active',
              }),
              row('Settlement', { stat: '88% (+0.8)', statTone: 'active' }),
              row('Fractional Lots', {
                stat: '84% (−1.4)',
                statTone: 'warning',
              }),
              row('KYC Onboarding', {
                stat: '79% (−2.3)',
                statTone: 'danger',
              }),
              row('Fee Schedule', { stat: '90% (+1.2)', statTone: 'active' }),
              row('Statements', { stat: '86% (+0.6)', statTone: 'active' }),
            ],
          },
        },
      ],
    },
  ],
};

export const runSection: WorkbenchSection = {
  title: 'Run',
  scope: 'Digital Investor Platform · Portfolio · Product',
  views: [
    {
      slug: 'releases',
      tab: 'Releases',
      subtitle:
        "Releases — what's bundled, diff from prod & the Validate handoff",
      stats: [
        stat('PROMOTED FROM VALIDATE', '3'),
        stat('BUNDLED · REL 2.4', '4'),
        stat('STORIES SHIPPING', '12'),
        stat('DIFF VS PROD', '4'),
      ],
      cards: [
        {
          label: 'INTAKE · PROMOTED FROM VALIDATE',
          sub: 'FeatureSets just cleared the Validate gate — compose into a release',
          block: {
            kind: 'list',
            rows: [
              row('Fractional orders v2.2', {
                sub: '12/12 gates green · promoted 2h ago · 4 stories · VALIDATE G-4821',
                badge: 'PROMOTED',
                badgeTone: 'active',
                stat: 'M',
              }),
              row('Rebalance rules v3.0', {
                sub: '9/9 gates green · promoted 4h ago · 3 stories · VALIDATE G-4830',
                badge: 'PROMOTED',
                badgeTone: 'active',
                stat: 'L',
              }),
              row('Statements v2.2', {
                sub: '7/7 gates green · promoted 6h ago · 3 stories · VALIDATE G-4833',
                badge: 'PROMOTED',
                badgeTone: 'active',
                stat: 'S',
              }),
            ],
          },
        },
        {
          label: 'RELEASE MANIFEST · REL 2.4',
          sub: 'cut from main @ a1b2c3d · target prod · manifest sealed · sha rel-2.4-9f3a',
          block: {
            kind: 'table',
            columns: [
              'FEATURESET',
              'VERSION',
              'STORIES',
              'VALIDATE GATE',
              'STATUS',
            ],
            rows: [
              ['Fractional orders', 'v2.1 → v2.2', '4', 'G-4821', 'BUNDLED'],
              ['Rebalance rules', 'new · v3.0', '3', 'G-4830', 'BUNDLED'],
              ['Statements', 'v2.1 → v2.2', '3', 'G-4833', 'BUNDLED'],
              ['Portfolio charts', 'v1.3 → v1.4', '2', 'G-4809', 'STAGED'],
            ],
          },
        },
        {
          label: 'ROLLBACK TARGET · rel 2.3',
          sub: 'auto-revert if rel 2.4 regresses · live in prod · shipped 6d ago',
          block: {
            kind: 'note',
            tone: 'accent',
            label: 'READY',
            text: 'rel 2.4 is composed — 4 FeatureSets, 12 stories, fully traced. One-click revert restores rel 2.3 · est. 40s.',
            action: 'Promote to canary',
          },
        },
      ],
    },
    {
      slug: 'promote',
      tab: 'Promote',
      subtitle: 'Promote — approval console & promotion gate pipeline',
      stats: [
        stat('READY TO PROMOTE', '3'),
        stat('GATED ON SIGN-OFF', '3'),
        stat('BLOCKED', '2'),
        stat('IN CANARY', '2'),
      ],
      cards: [
        {
          label: 'APPROVAL CONSOLE',
          sub: 'promote · hold · reject · rollback — the primary surface',
          block: {
            kind: 'list',
            rows: [
              row('Fractional orders', {
                sub: 'FeatureSet · promote to Production',
                badge: 'gated',
                badgeTone: 'warning',
                stat: 'Approve · Hold',
                statTone: 'accent',
              }),
              row('Portfolio charts', {
                sub: 'FeatureSet · security sign-off required',
                badge: 'HITL+gated',
                badgeTone: 'danger',
                stat: 'Approve · Hold · Reject',
                statTone: 'accent',
              }),
              row('Rebalance rules', {
                sub: 'FeatureSet · canary promote decision',
                badge: 'gated',
                badgeTone: 'warning',
                stat: 'Promote · Hold',
                statTone: 'accent',
              }),
              row('Rollback · Statement export v2.2', {
                sub: 'Run job · rollback (breaking) · prod incident',
                badge: 'HITL+gated',
                badgeTone: 'danger',
                stat: 'Approve rollback',
                statTone: 'danger',
              }),
            ],
          },
        },
        {
          label: 'PROMOTION GATES · rel 2026.06.3',
          sub: 'Build → Staging → Smoke → Security → Canary → Production · 3/6 passed',
          block: {
            kind: 'list',
            rows: [
              row('Build', {
                badge: 'passed',
                badgeTone: 'active',
                stat: '1m 58s',
              }),
              row('Staging', {
                badge: 'passed',
                badgeTone: 'active',
                stat: '3m 12s',
              }),
              row('Smoke', {
                badge: 'passed',
                badgeTone: 'active',
                stat: '142 checks',
              }),
              row('Security sign-off', {
                badge: 'in progress',
                badgeTone: 'warning',
                stat: 'HITL · 2 approvers',
                statTone: 'warning',
              }),
              row('Canary', {
                badge: 'awaiting',
                badgeTone: 'muted',
                stat: '10% planned',
              }),
              row('Production', { badge: 'not started', badgeTone: 'muted' }),
            ],
          },
        },
        {
          label: 'CANARY ANALYSIS',
          sub: 'promote / hold decision · evaluation signal',
          block: {
            kind: 'list',
            rows: [
              row('Fractional orders · canary 25% · 18m elapsed', {
                sub: 'ERR 0.04% (−0.02) · p99 212ms (−8ms) · SUCCESS 99.2% (+0.3%)',
                badge: 'Promote',
                badgeTone: 'active',
              }),
              row('Rebalance rules · canary 10% · 6m elapsed', {
                sub: 'p99 548ms · +184ms vs base',
                badge: 'Hold',
                badgeTone: 'danger',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'canary',
      tab: 'Canary',
      subtitle: 'Canary — staged rollout analysis · promote or hold on signal',
      stats: [
        stat('ACTIVE CANARIES', '2'),
        stat('PROMOTE-READY', '1'),
        stat('HOLDING', '1'),
        stat('EVAL SAMPLES', '25.4K'),
      ],
      cards: [
        {
          label:
            'FRACTIONAL ORDERS · fs-2208 · v1.8.0 · 25% traffic · stage 3 of 4',
          sub: 'rolling 18m window · canary vs stable · 5-min buckets',
          block: {
            kind: 'table',
            columns: ['METRIC', 'BASELINE', 'CANARY', 'Δ vs BASE'],
            rows: [
              ['Error rate · 5xx + app errors', '0.20%', '0.18%', '-0.02 pp'],
              ['P95 latency · end-to-end', '148 ms', '142 ms', '-6 ms'],
              ['Success rate · 2xx / total', '99.70%', '99.82%', '+0.12 pp'],
              [
                'Req volume · 22.3k samples',
                '4.9k rpm',
                '1.24k rpm',
                '25% split',
              ],
            ],
          },
        },
        {
          label: 'DECISION · PROMOTE-READY',
          sub: null,
          block: {
            kind: 'note',
            tone: 'active',
            label: 'GREEN',
            text: 'All guardrails green across the 18-minute window. Eligible for auto-promote.',
            action: 'Promote to 50%',
          },
        },
        {
          label:
            'REBALANCE RULES · fs-2174 · v0.4.0 · 10% traffic · stage 2 of 4',
          sub: 'rolling 6m window · canary vs stable',
          block: {
            kind: 'table',
            columns: ['METRIC', 'BASELINE', 'CANARY', 'Δ vs BASE'],
            rows: [
              ['Error rate', '0.20%', '0.63%', '+0.43 pp'],
              ['P95 latency', '148 ms', '205 ms', '+57 ms'],
              ['Success rate', '99.70%', '98.90%', '-0.80 pp'],
            ],
          },
        },
        {
          label: 'DECISION · HOLD',
          sub: null,
          block: {
            kind: 'note',
            tone: 'danger',
            label: 'HOLD',
            text: 'Error rate 3.1x baseline and p95 +38% over 6 minutes. Rollout held.',
            action: 'Roll back',
          },
        },
      ],
    },
    {
      slug: 'rollback',
      tab: 'Rollback',
      subtitle:
        'Rollback & incidents — targets, blast radius, history & on-call',
      stats: [
        stat('ACTIVE INCIDENTS', '1'),
        stat('ROLLBACKS · 24H', '2'),
        stat('ERROR BUDGET', '62%'),
        stat('MTTR', '14m'),
      ],
      cards: [
        {
          label: 'ACTIVE INCIDENT · INC-2042 · Statement export',
          sub: 'shipped v2.2 · SEV-2 · rolling back · on-call @dpark',
          block: {
            kind: 'list',
            rows: [
              row('CURRENT (BROKEN) · v2.2', {
                sub: 'error rate 4.2% → roll back',
                badge: 'SEV-2',
                badgeTone: 'danger',
              }),
              row('TARGET (LAST GOOD) · v2.1', {
                sub: 'shipped 6d ago',
                badge: 'TARGET',
                badgeTone: 'active',
              }),
              row('BLAST RADIUS · Statements · ~12.4k users · 2 downstream', {
                sub: 'Statement generation + Tax-doc export depend on this FeatureSet',
              }),
              row('IDENTITY · version-distinct instances', {
                sub: 'SHIPPED v2.2 (in incident, rolling back) vs NEW #1268 (in pipeline, not shipped) — same FeatureSet, two instances',
                badge: 'Roll back to v2.1',
                badgeTone: 'danger',
              }),
            ],
          },
        },
        {
          label: 'ROLLBACK HISTORY',
          sub: 'recent production rollbacks · release-level · audit trail',
          block: {
            kind: 'table',
            columns: [
              'FEATURESET',
              'VERSION',
              'REASON',
              'WHEN',
              'BY',
              'STATUS',
            ],
            rows: [
              [
                'Statement export',
                'v2.2 → v2.1',
                'error-rate spike · SEV-2',
                'now',
                '@dpark',
                'rolling back',
              ],
              [
                'Fractional orders',
                'v3.0 → v2.9',
                'canary p95 regression',
                '2d ago',
                '@lwong',
                'rolled back',
              ],
              [
                'Funding webhook',
                'v1.4 → v1.3',
                'webhook timeout · SEV-3',
                '5d ago',
                'auto',
                'rolled back',
              ],
              [
                'Portfolio charts',
                'v2.1 → v2.0',
                'render OOM under load',
                '11d ago',
                '@mkhan',
                'rolled back',
              ],
            ],
          },
        },
      ],
    },
    {
      slug: 'nonprod',
      tab: 'Non-prod',
      subtitle: 'Non-prod — chain-forward deploys to dev / staging / preview',
      stats: [
        stat('ENVIRONMENTS', '3'),
        stat('HEALTHY', '2'),
        stat('DEGRADED', '1'),
        stat('DEPLOYS · 24H', '7'),
      ],
      cards: [
        {
          label: 'PROMOTION PATH',
          sub: 'non-prod deploy → chains forward toward prod · not terminal',
          block: {
            kind: 'pills',
            items: [
              { label: 'MERGE', sub: '12 today', tone: 'default' },
              { label: 'DEV', sub: 'rc4 live', tone: 'active' },
              { label: 'STAGING', sub: 'v2.4.1', tone: 'warning' },
              { label: 'CANARY', sub: 'chains fwd →', tone: 'accent' },
              { label: 'PROD', sub: 'target', tone: 'muted' },
            ],
          },
        },
        {
          label: 'ENVIRONMENTS',
          sub: 'live state per environment',
          block: {
            kind: 'list',
            rows: [
              row('DEV · Fractional Orders v2.5.0-rc4', {
                sub: 'deployed 4m ago · auto on merge · promotes to STAGING',
                badge: 'healthy',
                badgeTone: 'active',
              }),
              row('STAGING · Rebalance Rules v2.4.1', {
                sub: 'deployed 38m ago · @maya.chen · promotes to CANARY → PROD',
                badge: 'degraded',
                badgeTone: 'warning',
              }),
              row('PREVIEW · Statements v1.9.0-pr.412', {
                sub: 'deployed 1h ago · @workflow · PR #412 · merges → DEV',
                badge: 'healthy',
                badgeTone: 'active',
              }),
            ],
          },
        },
        {
          label: 'PENDING PROMOTIONS',
          sub: 'queued to chain forward',
          block: {
            kind: 'list',
            rows: [
              row('Rebalance Rules', {
                sub: 'staging → canary',
                badge: 'awaiting health',
                badgeTone: 'warning',
              }),
              row('Fractional Orders', {
                sub: 'dev → staging',
                badge: 'ready',
                badgeTone: 'active',
              }),
              row('Statements', {
                sub: 'preview → dev',
                badge: 'on PR merge',
                badgeTone: 'muted',
              }),
              row('KYC Onboarding', {
                sub: 'dev → staging',
                badge: 'queued',
                badgeTone: 'muted',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'artifacts',
      tab: 'Artifacts',
      subtitle:
        'Artifacts — images, SDKs, docs & tokens · publish → version → consume',
      stats: [
        stat('TOTAL ARTIFACTS', '5'),
        stat('GENERATED', '1'),
        stat('PUBLISHED', '2'),
        stat('CONSUMED', '1'),
      ],
      cards: [
        {
          label: 'ARTIFACT-TERMINAL LIFECYCLE',
          sub: 'generated → published → versioned → consumed',
          block: {
            kind: 'pills',
            items: [
              { label: 'GENERATED', sub: '1 in Run', tone: 'accent' },
              { label: 'PUBLISHED', sub: '2 live', tone: 'active' },
              { label: 'VERSIONED', sub: '1 pinned', tone: 'default' },
              { label: 'CONSUMED', sub: '1 downstream', tone: 'muted' },
            ],
          },
        },
        {
          label: 'GENERATED ARTIFACTS',
          sub: 'terminal outputs from Run · each traces to the job that produced it',
          block: {
            kind: 'table',
            columns: [
              'ARTIFACT',
              'TYPE',
              'LIFECYCLE',
              'DESTINATION',
              'VERSION',
            ],
            rows: [
              [
                '@digital-investor · packages/sdk',
                'SDK PACKAGE',
                'CONSUMED',
                'npm · registry',
                'v2.4.0',
              ],
              [
                'control-plane · services/control-plane',
                'CONTAINER IMAGE',
                'VERSIONED',
                'ghcr.io',
                'v0.9.2',
              ],
              [
                'api-docs · docs/api',
                'DOCS SITE',
                'PUBLISHED',
                'docs.singularity.dev',
                '#312',
              ],
              [
                'design-tokens · design/tokens',
                'DESIGN TOKENS',
                'PUBLISHED',
                'export · tokens.json',
                'v1.7.0',
              ],
              [
                'harness-cli · apps/harness-cli',
                'CLI BINARY',
                'GENERATED',
                'export · gh releases',
                'v0.4.0',
              ],
            ],
          },
        },
        {
          label: 'RESOLVED · OQ-2',
          sub: null,
          block: {
            kind: 'note',
            tone: 'active',
            label: 'ANSWER: RUN',
            text: "Artifact-terminal generation lives in Run's Artifacts.",
            action: null,
          },
        },
      ],
    },
  ],
};

export const manageSection: WorkbenchSection = {
  title: 'Manage',
  scope: 'Digital Investor Platform · all epics',
  views: [
    {
      slug: 'overview',
      tab: 'Overview',
      subtitle: 'Overview — flow, cost, scale & attention across the portfolio',
      stats: [
        stat(
          'JOBS BY KIND',
          '107',
          'Plan 30 · Build 34 · Validate 28 · Run 15',
        ),
        stat('SPEND FORECAST', '$182K', 'frontier 62% · mid 27% · small 11%'),
        stat('NEEDS YOU', '23', '15 gated/HITL · 8 HITL+gated'),
        stat('7-DAY VELOCITY', '6.4', 'jobs / day · +18% vs prior 7d'),
      ],
      cards: [
        {
          label: 'SCALE MIX',
          sub: '107 jobs · 6 epics · 19% high-risk',
          block: {
            kind: 'list',
            rows: [
              row('S · Small · low-risk · small models', {
                stat: '49 jobs · 46%',
                statTone: 'active',
              }),
              row('M · Medium · moderate · mid models', {
                stat: '38 jobs · 35%',
                statTone: 'accent',
              }),
              row('L · Large · breaking · migration · frontier', {
                stat: '20 jobs · 19%',
                statTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'NEEDS YOU · BY TEAM',
          sub: '23 jobs blocked on a human · 5 teams',
          block: {
            kind: 'list',
            rows: [
              row('Portfolio Engine', { stat: '7', statTone: 'warning' }),
              row('Onboarding & KYC', { stat: '6', statTone: 'warning' }),
              row('Payments', { stat: '4', statTone: 'default' }),
              row('Market Data', { stat: '3', statTone: 'default' }),
              row('Compliance', { stat: '3', statTone: 'default' }),
            ],
          },
        },
        {
          label: 'CROSS-ASSET COMPARE',
          sub: 'initiative health · side by side',
          block: {
            kind: 'table',
            columns: [
              'INITIATIVE',
              'HEALTH',
              'IN FLIGHT',
              'NEEDS YOU',
              'FRONTIER',
              'VELOCITY',
            ],
            rows: [
              [
                'Digital Investor Platform',
                'On track',
                '42',
                '6',
                '18%',
                '7.2/d',
              ],
              ['Acme Retail', 'At risk', '28', '11', '34%', '4.1/d'],
              ['Northwind Ops', 'Healthy', '15', '2', '9%', '5.5/d'],
            ],
          },
        },
      ],
    },
    {
      slug: 'calibration',
      tab: 'Calibration',
      subtitle:
        'Calibration — predicted vs actual · did scale assignments predict cost?',
      stats: [
        stat('FORECAST', '$182K'),
        stat('ACTUAL', '$193K'),
        stat('VARIANCE', '+6%'),
        stat('MIS-SCALED', '11'),
      ],
      cards: [
        {
          label: 'PREDICTED vs ACTUAL · BY SCALE',
          sub: 'DispatchPrediction vs OutcomeRecord',
          block: {
            kind: 'table',
            columns: ['SCALE', 'PREDICTED', 'ACTUAL', 'DELTA', 'CALIBRATION'],
            rows: [
              ['S · Small', '$40K', '$37K', '−7%', 'well-calibrated'],
              ['M · Medium', '$72K', '$79K', '+10%', 'drifting high'],
              ['L · Large', '$70K', '$77K', '+10%', 'frontier over-run'],
            ],
          },
        },
        {
          label: 'CALIBRATION DRIFT · BY JOBTYPE',
          sub: 'is a job kind systematically mis-scaled?',
          block: {
            kind: 'table',
            columns: [
              'JOBTYPE',
              'JOBS',
              'ASSIGNED',
              'ACTUAL BEHAVIOR',
              'CALIBRATION',
            ],
            rows: [
              [
                'migration',
                '8',
                'mostly M',
                'behaves L · 2.3× cost',
                'under-scaled',
              ],
              ['greenfield', '14', 'mostly M', 'on target', 'calibrated'],
              ['bug fix', '31', 'mostly S', 'on target', 'calibrated'],
              [
                'refactor',
                '12',
                'mostly L',
                'behaves M · cheaper',
                'over-scaled',
              ],
              ['upgrade', '9', 'mostly S', 'dep cascades → M', 'under-scaled'],
            ],
          },
        },
        {
          label: 'MIS-SCALED JOBS · 11',
          sub: 'assigned one scale, behaved like another',
          block: {
            kind: 'list',
            rows: [
              row('Rebalance threshold change', {
                meta: 'M → L',
                sub: 'frontier retry loop · 3.1× forecast cost',
                badge: 'under-scaled',
                badgeTone: 'danger',
              }),
              row('Auth rotation', {
                meta: 'M → L',
                sub: 'secrets-scan reruns · gated late',
                badge: 'under-scaled',
                badgeTone: 'danger',
              }),
              row('Statement export', {
                meta: 'L → S',
                sub: 'shipped in 1 pass · well under cost',
                badge: 'over-scaled',
                badgeTone: 'active',
              }),
              row('Portfolio chart render', {
                meta: 'S → M',
                sub: 'a11y rework not predicted',
                badge: 'under-scaled',
                badgeTone: 'warning',
              }),
            ],
          },
        },
      ],
    },
    {
      slug: 'governance',
      tab: 'Governance',
      subtitle: 'Governance — autonomy policy envelope, enforcement & audit',
      stats: [
        stat('POLICY COMPLIANCE', '98.9%'),
        stat('FULL-AUTO', '142'),
        stat('GATED', '38'),
        stat('VIOLATIONS', '2'),
      ],
      cards: [
        {
          label: 'POLICY ENVELOPE',
          sub: 'scale × risk → allowed autonomy tier',
          block: {
            kind: 'table',
            columns: [
              'SCALE ↓ · RISK →',
              'NON-BREAKING',
              'BREAKING',
              'REGULATED DATA',
            ],
            rows: [
              ['S · 1–2 files', 'FULL-AUTO', 'GATED', 'HITL'],
              ['M · multi-file', 'FULL-AUTO', 'GATED', 'HITL+GATED'],
              ['L · architectural', 'GATED', 'HITL', 'HITL+GATED'],
            ],
          },
        },
        {
          label: 'ENFORCEMENT',
          sub: '189 of 191 governed actions followed the envelope',
          block: {
            kind: 'list',
            rows: [
              row('Dispatched per policy', { stat: '189', statTone: 'active' }),
              row('Manual overrides · authorized', {
                stat: '4',
                statTone: 'warning',
              }),
              row('Unauthorized bypass', { stat: '2', statTone: 'danger' }),
            ],
          },
        },
        {
          label: 'OVERRIDES & VIOLATIONS',
          sub: '4 overrides · 2 violations',
          block: {
            kind: 'list',
            rows: [
              row('Skipped HITL on rate-limiter', {
                sub: 'harness · HITL → full-auto · no approval',
                badge: 'VIOLATION',
                badgeTone: 'danger',
              }),
              row('L-scale merge ran unattended', {
                sub: 'harness · envelope bypass · job-4961',
                badge: 'VIOLATION',
                badgeTone: 'danger',
              }),
              row('Forced HITL+gated on KYC export', {
                sub: 'S. Okafor (Risk) · gated → HITL+gated',
                badge: 'OVERRIDE',
                badgeTone: 'warning',
              }),
              row('Downgraded L refactor to gated', {
                sub: 'M. Chen (Lead) · HITL → gated · exception',
                badge: 'OVERRIDE',
                badgeTone: 'warning',
              }),
            ],
          },
        },
        {
          label: 'AUDIT TRAIL · UNATTENDED',
          sub: 'what the harness ran full-auto · every action traces to its job',
          block: {
            kind: 'table',
            columns: ['ACTION', 'SCALE × RISK', 'TIER', 'WHEN', 'OUTCOME'],
            rows: [
              [
                'Bump deps · @di/web',
                'S · non-breaking',
                'FULL-AUTO',
                '2h ago',
                'merged',
              ],
              [
                'Add unit tests · portfolio calc',
                'S · non-breaking',
                'FULL-AUTO',
                '5h ago',
                'merged',
              ],
              [
                'Refactor quote formatter',
                'M · non-breaking',
                'FULL-AUTO',
                '9h ago',
                'merged',
              ],
              [
                'Fix flaky e2e · orders',
                'S · non-breaking',
                'FULL-AUTO',
                '14h ago',
                'auto-reverted',
              ],
            ],
          },
        },
      ],
    },
    {
      slug: 'compare',
      tab: 'Compare',
      subtitle:
        'Compare — cross-initiative health side by side · portfolio altitude',
      stats: [
        stat('INITIATIVES', '3', 'portfolio scope'),
        stat('ACTIVE JOBS', '61', 'across all three'),
        stat('MODEL SPEND', '$22.3k', '/ month'),
        stat('NEEDS YOU', '14', 'decisions waiting'),
      ],
      cards: [
        {
          label: 'INITIATIVE COMPARISON',
          sub: 'ranked healthy → at-risk · bars normalized to portfolio max',
          block: {
            kind: 'table',
            columns: [
              'INITIATIVE',
              'TIER',
              'HEALTH',
              'JOBS',
              'SPEND',
              'RISK',
              'VELOCITY',
            ],
            rows: [
              [
                'Digital Investor Platform',
                'Investor-facing · Tier 1',
                'Healthy · 99.2% SLO',
                '34',
                '$12.4k',
                '6%',
                '47/wk ↑8%',
              ],
              [
                'Acme Retail',
                'Commerce · Tier 2',
                'Watch · 97.4% SLO',
                '19',
                '$6.8k',
                '14%',
                '28/wk → flat',
              ],
              [
                'Northwind Ops',
                'Internal ops · Tier 3',
                'At-Risk · 94.1% SLO',
                '8',
                '$3.1k',
                '31%',
                '9/wk ↓12%',
              ],
            ],
          },
        },
        {
          label: 'AT-RISK · NORTHWIND OPS',
          sub: null,
          block: {
            kind: 'note',
            tone: 'danger',
            label: 'AT-RISK',
            text: 'SLO at 94.1% against a 99% target · 31% of active jobs flagged high-risk.',
            action: 'Open initiative',
          },
        },
        {
          label: 'WATCH · ACME RETAIL',
          sub: null,
          block: {
            kind: 'note',
            tone: 'warning',
            label: 'WATCH',
            text: 'Velocity has gone flat and high-risk is creeping to 14% · 5 decisions waiting.',
            action: 'Open initiative',
          },
        },
      ],
    },
  ],
};
