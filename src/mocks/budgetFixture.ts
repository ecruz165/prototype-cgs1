import type { BudgetGate, HaltDetail, JobBudget } from '@/schemas/budget';

// The design's pane-budget, verbatim.
export const jobBudget: JobBudget = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  budget: {
    spent: '$0.41',
    ceiling: 'of $5.00 ceiling',
    usedPct: 8,
    projectedPct: 14,
    rows: [
      { label: 'Projected', value: '~$0.68', tone: 'default' },
      { label: 'Remaining', value: '$4.59', tone: 'active' },
      { label: 'Tokens', value: '35.8k', tone: 'default' },
    ],
    footStatus: 'On track',
    footNote: 'projected $0.68 · 14% of ceiling',
  },
  gates: [
    {
      id: 'cost-ceiling',
      name: 'Cost ceiling',
      now: 'now $0.41',
      limit: 'limit $5.00',
      usedPct: 8,
      tripped: false,
    },
    {
      id: 'max-hitl',
      name: 'Max HITL pauses',
      now: 'now 1',
      limit: 'limit 3',
      usedPct: 33,
      tripped: false,
    },
    {
      id: 'wall-clock',
      name: 'Wall-clock',
      now: 'now 12m',
      limit: 'limit 30m',
      usedPct: 40,
      tripped: false,
    },
    {
      id: 'max-retries',
      name: 'Max retries',
      now: 'now 1',
      limit: 'limit 5',
      usedPct: 20,
      tripped: false,
    },
    {
      id: 'token-budget',
      name: 'Token budget',
      now: 'now 35.8k',
      limit: 'limit 200k',
      usedPct: 18,
      tripped: false,
    },
  ],
  gatesNote: 'Hard limits — any breach halts the run immediately',
  gatesFootNote: 'run continues',
};

// The design's "Main Pane · Budget & Gates · Halt Detail — Cost ceiling",
// verbatim.
const costCeilingDetail: HaltDetail = {
  id: 'cost-ceiling',
  name: 'Cost ceiling',
  status: 'clear',
  meta: 'now $0.41 · limit $5.00 · 8%',
  breadcrumb: ['Budget & Gates', 'Halting Gates', 'Cost ceiling'],
  assertion: {
    expression: 'run.cost.usd <= 5.00',
    message:
      'Halt the run immediately if cumulative spend reaches the $5.00 ceiling.',
    statsLabel: 'DISTANCE FROM THRESHOLD',
    stats: [
      { label: 'NOW', value: '$0.41', tone: 'active' },
      { label: 'PROJECTED', value: '$0.68', tone: 'default' },
      { label: 'CEILING', value: '$5.00', tone: 'default' },
      { label: 'HEADROOM', value: '$4.59', tone: 'active' },
    ],
    nowPct: 8,
    projectedPct: 14,
    caption:
      'fill = now $0.41 (8%)   ·   marker = projected $0.68 (14%)   ·   end = $5.00 ceiling',
  },
  onTrip: {
    title: 'When spend reaches the $5.00 ceiling',
    pill: 'HALT-ON-EXCEED',
    steps: [
      {
        icon: 'save',
        tone: 'accent',
        name: '1 · Checkpoint',
        text: 'Snapshot run state — context, partial outputs, and the current Flow position.',
      },
      {
        icon: 'do_not_disturb_on',
        tone: 'danger',
        name: '2 · Halt',
        text: 'Stop all agent execution immediately — no further tokens or spend.',
      },
      {
        icon: 'how_to_reg',
        tone: 'warning',
        name: '3 · Await operator',
        text: 'Resume with a raised ceiling, or roll back to the last checkpoint.',
      },
    ],
  },
  guards: {
    body: 'This ceiling gates every pending node — the run cannot proceed past it once tripped.',
    links: [
      {
        icon: 'account_tree',
        title: 'Run continuation · all pending nodes',
        sub: 'the Flow this gate guards',
        targetLabel: 'Flow',
        target: 'flow',
      },
      {
        icon: 'payments',
        title: 'Spend Detail · cost breakdown',
        sub: 'where the budget is going',
        targetLabel: 'Budget & Gates',
        target: 'budget',
      },
    ],
  },
  props: [
    { label: 'Gate', value: 'Cost ceiling', tone: 'default' },
    { label: 'Kind', value: 'Budget gate', tone: 'accent' },
    { label: 'Status', value: 'Clear', tone: 'active' },
    { label: 'Now', value: '$0.41', tone: 'default' },
    { label: 'Limit', value: '$5.00', tone: 'default' },
    { label: 'Used', value: '8%', tone: 'default' },
    { label: 'Headroom', value: '$4.59', tone: 'active' },
    { label: 'Projected', value: '$0.68', tone: 'default' },
    { label: 'On trip', value: 'checkpoint + halt', tone: 'warning' },
    { label: 'Guards', value: 'run continuation', tone: 'default' },
  ],
};

function minimalHaltDetail(gate: BudgetGate): HaltDetail {
  return {
    id: gate.id,
    name: gate.name,
    status: gate.tripped ? 'tripped' : 'clear',
    meta: `${gate.now} · ${gate.limit} · ${gate.usedPct}%`,
    breadcrumb: ['Budget & Gates', 'Halting Gates', gate.name],
    assertion: null,
    onTrip: null,
    guards: null,
    props: [
      { label: 'Gate', value: gate.name, tone: 'default' },
      {
        label: 'Status',
        value: gate.tripped ? 'Tripped' : 'Clear',
        tone: gate.tripped ? 'danger' : 'active',
      },
      { label: 'Now', value: gate.now.replace('now ', ''), tone: 'default' },
      {
        label: 'Limit',
        value: gate.limit.replace('limit ', ''),
        tone: 'default',
      },
      { label: 'Used', value: `${gate.usedPct}%`, tone: 'default' },
    ],
  };
}

export function haltDetailFor(gateId: string): HaltDetail | undefined {
  if (gateId === 'cost-ceiling') return costCeilingDetail;
  const gate = jobBudget.gates.find((g) => g.id === gateId);
  return gate ? minimalHaltDetail(gate) : undefined;
}
