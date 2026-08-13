import type { GateDetail, JobQuality, QualityGate } from '@/schemas/quality';

// The design's pane-quality, verbatim.
export const jobQuality: JobQuality = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  banner: { text: 'Merge blocked by 1 gate', stat: '→ Coverage 72%' },
  groups: [
    {
      label: 'CONVENTION VERIFICATIONS',
      gates: [
        {
          id: 'lint',
          name: 'Lint',
          stat: '0 err',
          status: 'pass',
          locked: false,
        },
        {
          id: 'type-check',
          name: 'Type check',
          stat: '0 err',
          status: 'pass',
          locked: false,
        },
      ],
    },
    {
      label: 'TEST COVERAGE',
      gates: [
        {
          id: 'coverage',
          name: 'Coverage',
          stat: '72%',
          status: 'fail',
          locked: true,
        },
        {
          id: 'unit-tests',
          name: 'Unit tests',
          stat: '100%',
          status: 'pass',
          locked: true,
        },
      ],
    },
    {
      label: 'ACCESSIBILITY',
      gates: [
        {
          id: 'axe',
          name: 'axe a11y',
          stat: '0 crit',
          status: 'pass',
          locked: false,
        },
      ],
    },
    {
      label: 'SECURITY VULNERABILITIES',
      gates: [
        {
          id: 'dep-scan',
          name: 'Dep scan',
          stat: '0 high',
          status: 'pass',
          locked: true,
        },
      ],
    },
  ],
  trend: {
    label: 'gate pass-rate',
    points: [
      { label: 'Plan', value: 100, tone: 'active', labelTone: 'default' },
      { label: 'Scaffold', value: 100, tone: 'active', labelTone: 'default' },
      { label: 'Patch', value: 83, tone: 'warning', labelTone: 'default' },
      { label: 'Tests', value: 67, tone: 'danger', labelTone: 'default' },
    ],
  },
};

// The design's "Main Pane · Quality · Gate Detail — Coverage ≥ 80%", verbatim.
const coverageDetail: GateDetail = {
  id: 'coverage',
  name: 'Coverage ≥ 80%',
  status: 'failed',
  meta: 'actual 72% · threshold 80% · −8 pts',
  breadcrumb: ['Quality', 'Blocking Gates', 'Coverage ≥ 80%'],
  assertion: {
    expression: 'coverage.lines.pct >= 80',
    message: 'Line coverage must be ≥ 80% before this job can merge to main.',
    evaluated: [
      { label: 'ACTUAL', value: '72%', tone: 'danger' },
      { label: 'THRESHOLD', value: '80%', tone: 'default' },
      { label: 'GAP', value: '−8 pts', tone: 'danger' },
    ],
    actualPct: 72,
    thresholdPct: 80,
    caption: 'fill = actual 72%   ·   marker = 80% threshold',
  },
  trend: {
    label: 'TREND OVER THE RUN · coverage by Phase',
    points: [
      { label: 'Plan', value: 82, tone: 'active', labelTone: 'default' },
      { label: 'Scaffold', value: 81, tone: 'active', labelTone: 'default' },
      { label: 'Patch', value: 72, tone: 'danger', labelTone: 'danger' },
      { label: 'Tests', value: 72, tone: 'danger', labelTone: 'danger' },
    ],
    note: 'Regressed at the Patch phase: 81% → 72% (−9 pts) when token.service.ts added 42 lines with no new tests. Red columns sit below the 80% threshold.',
  },
  blocks: {
    title: 'Blocks merge-to-main',
    pill: 'HALT-ON-FAIL',
    body: 'This blocking gate holds the merge gate in Flow until line coverage reaches the 80% threshold.',
    links: [
      {
        icon: 'account_tree',
        title: 'Merge gate · blocked',
        sub: 'the Flow node this gate holds',
        targetLabel: 'Flow',
        target: 'flow',
      },
      {
        icon: 'difference',
        title: 'token.service.ts · 42 uncovered lines',
        sub: 'the change that moved the metric',
        targetLabel: 'Output',
        target: 'output',
      },
    ],
  },
  links: [
    {
      icon: 'savings',
      title: 'Halt semantics · halt-on-fail',
      sub: 'this gate also halts the run on failure',
      targetLabel: 'Budget & Gates',
      target: 'budget',
    },
  ],
  props: [
    { label: 'Gate', value: 'Coverage ≥ 80%', tone: 'default' },
    { label: 'Type', value: 'Blocking', tone: 'danger' },
    { label: 'Status', value: 'Failed', tone: 'danger' },
    { label: 'Actual', value: '72%', tone: 'danger' },
    { label: 'Threshold', value: '80%', tone: 'default' },
    { label: 'Delta', value: '−8 pts', tone: 'danger' },
    { label: 'Regressed', value: 'Patch phase', tone: 'warning' },
    { label: 'Blocks', value: 'merge-to-main', tone: 'default' },
    { label: 'Halt', value: 'halt-on-fail', tone: 'warning' },
    { label: 'Assertion', value: 'coverage.lines.pct', tone: 'accent' },
  ],
};

function minimalGateDetail(gate: QualityGate): GateDetail {
  return {
    id: gate.id,
    name: gate.name,
    status: gate.status === 'pass' ? 'passed' : 'failed',
    meta: gate.stat,
    breadcrumb: ['Quality', gate.name],
    assertion: null,
    trend: null,
    blocks: null,
    links: [],
    props: [
      { label: 'Gate', value: gate.name, tone: 'default' },
      {
        label: 'Status',
        value: gate.status === 'pass' ? 'Passed' : 'Failed',
        tone: gate.status === 'pass' ? 'active' : 'danger',
      },
      { label: 'Result', value: gate.stat, tone: 'default' },
      {
        label: 'Enforced',
        value: gate.locked ? 'locked' : 'advisory',
        tone: gate.locked ? 'warning' : 'muted',
      },
    ],
  };
}

export function gateDetailFor(gateId: string): GateDetail | undefined {
  if (gateId === 'coverage') return coverageDetail;
  for (const group of jobQuality.groups) {
    const gate = group.gates.find((g) => g.id === gateId);
    if (gate) return minimalGateDetail(gate);
  }
  return undefined;
}
