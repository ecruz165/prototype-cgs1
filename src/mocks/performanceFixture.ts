import type {
  JobPerformance,
  PerfDetail,
  PerfItem,
} from '@/schemas/performance';

// The design's pane-perf, verbatim.
export const jobPerformance: JobPerformance = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  models: [
    {
      id: 'opus',
      icon: 'memory',
      name: 'claude-opus-4.8',
      stat: '↓14.2k ↑7.2k',
      statTone: 'default',
    },
    {
      id: 'sonnet',
      icon: 'memory',
      name: 'claude-sonnet-4.6',
      stat: '↓8.1k ↑3.4k',
      statTone: 'default',
    },
    {
      id: 'gpt-4o',
      icon: 'memory',
      name: 'gpt-4o · eval',
      stat: '↓2.1k ↑0.8k',
      statTone: 'default',
    },
  ],
  connections: [
    {
      id: 'anthropic-api',
      icon: 'cloud_done',
      name: 'Anthropic API',
      stat: 'Connected',
      statTone: 'active',
    },
    {
      id: 'openai-api',
      icon: 'cloud_done',
      name: 'OpenAI API',
      stat: 'Connected',
      statTone: 'active',
    },
    {
      id: 'fargate',
      icon: 'dns',
      name: 'Fargate workers',
      stat: '3/3 healthy',
      statTone: 'active',
    },
    {
      id: 'edge-context',
      icon: 'database',
      name: 'edge-context-server',
      stat: 'Connected',
      statTone: 'active',
    },
  ],
  failures: [
    {
      id: 'rate-limit',
      icon: 'replay',
      name: 'Rate-limit (opus) → retried',
      stat: 'recovered',
      statTone: 'warning',
    },
    {
      id: 'timeouts',
      icon: 'timer_off',
      name: 'Transient timeout ×2',
      stat: 'recovered',
      statTone: 'warning',
    },
    {
      id: 'hard-failures',
      icon: 'check_circle',
      name: 'Hard failures',
      stat: '0',
      statTone: 'active',
    },
  ],
  failuresLabel: '1 retry',
};

// The design's "Main Pane · Performance · Per-Model Usage —
// claude-opus-4.8", verbatim.
const opusDetail: PerfDetail = {
  id: 'opus',
  title: 'claude-opus-4.8',
  pill: 'PRIMARY',
  meta: '14 req · 21.4k tok · $0.30',
  breadcrumb: ['Performance', 'Model Usage', 'claude-opus-4.8'],
  usage: [
    { label: 'REQUESTS', value: '14', tone: 'default' },
    { label: 'IN', value: '14.2k', tone: 'default' },
    { label: 'OUT', value: '7.2k', tone: 'default' },
    { label: 'COST', value: '$0.30', tone: 'accent' },
  ],
  latency: {
    points: [
      { label: 'p50', value: '4.1s' },
      { label: 'p75', value: '6.2s' },
      { label: 'p90', value: '9.4s' },
      { label: 'p95', value: '11.8s' },
      { label: 'max', value: '14.2s' },
    ],
    note: 'Median 4.1s. The slow tail (p95 11.8s, max 14.2s) lands in the Patch phase, where 8 of 14 requests run.',
  },
  phases: [
    {
      icon: 'route',
      name: 'Plan',
      agent: 'planner',
      requests: '3 req',
      tone: 'default',
    },
    {
      icon: 'code',
      name: 'Patch',
      agent: 'coder',
      requests: '8 req',
      tone: 'accent',
    },
    {
      icon: 'science',
      name: 'Tests',
      agent: 'test-runner',
      requests: '3 req',
      tone: 'default',
    },
  ],
  crossLinks: [
    {
      icon: 'savings',
      title: 'Model spend',
      sub: "this model's share of run cost · $0.30",
      targetLabel: 'Budget & Gates',
      target: 'budget',
    },
    {
      icon: 'bolt',
      title: 'Decisions using this model',
      sub: 'coordinator decisions routed to opus-4.8',
      targetLabel: 'Activity',
      target: 'activity',
    },
  ],
  props: [
    { label: 'Model', value: 'claude-opus-4.8', tone: 'default' },
    { label: 'Requests', value: '14', tone: 'default' },
    { label: 'In', value: '14.2k', tone: 'default' },
    { label: 'Out', value: '7.2k', tone: 'default' },
    { label: 'Total', value: '21.4k', tone: 'default' },
    { label: 'Avg latency', value: '6.2s', tone: 'default' },
    { label: 'p95', value: '11.8s', tone: 'default' },
    { label: 'Cost', value: '$0.30', tone: 'accent' },
    { label: 'Phases', value: '3', tone: 'default' },
  ],
};

function minimalPerfDetail(item: PerfItem, group: string): PerfDetail {
  return {
    id: item.id,
    title: item.name,
    pill: group.toUpperCase(),
    meta: item.stat,
    breadcrumb: ['Performance', group, item.name],
    usage: null,
    latency: null,
    phases: null,
    crossLinks: [],
    props: [
      { label: group, value: item.name, tone: 'default' },
      { label: 'Status', value: item.stat, tone: item.statTone },
    ],
  };
}

export function perfDetailFor(itemId: string): PerfDetail | undefined {
  if (itemId === 'opus') return opusDetail;
  const groups: [string, PerfItem[]][] = [
    ['Model', jobPerformance.models],
    ['Connection', jobPerformance.connections],
    ['Failure', jobPerformance.failures],
  ];
  for (const [group, items] of groups) {
    const item = items.find((i) => i.id === itemId);
    if (item) return minimalPerfDetail(item, group);
  }
  return undefined;
}
