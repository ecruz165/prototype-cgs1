import type { FlowPhase } from '@/schemas/flow';
import type { NodeDetail } from '@/schemas/nodeDetail';
import { jobFlow } from './flowFixture';

// The design's "Main Pane · Flow Node Detail — Generate patch" canvas,
// verbatim.
const generatePatchDetail: NodeDetail = {
  id: 'patch',
  name: 'Generate patch',
  kind: 'agent',
  status: 'running',
  meta: 'node-4a · started 14:05:46 · 2m14s',
  breadcrumb: ['Flow', 'Fork: patch ‖ tests', 'Generate patch'],
  input: {
    brief:
      'Replace the static session-token refresh with the rotating scheme — 1h window per spec §3.',
    sources:
      'Inputs: Plan / step-2 output · auth-spec.md · rotating-tokens-rfc.pdf §3',
    chips: ['target: token.service.ts', 'target: refresh.ts', 'ctx 18.2k tok'],
  },
  output: {
    label: 'OUTPUT — streaming · 2 of 4 files',
    lines: [
      { kind: 'context', text: '  function loadContext(spec) {' },
      { kind: 'removed', text: '-   return cache.get(spec.id)' },
      { kind: 'added', text: '+   return cache.get(spec.id) ?? load(spec)' },
    ],
  },
  agent: {
    name: 'coder',
    model: 'claude-opus-4.8',
    adapter: 'anthropic',
    note: 'Dispatched because Plan routed step 4 (code-gen) to the patch branch of the fork.',
  },
  crossLinks: [
    {
      icon: 'smart_toy',
      title: 'Why dispatched · coordinator decision',
      sub: 'Activity · 14:04 · routed to code-gen',
      targetLabel: 'Activity',
      target: 'activity',
    },
    {
      icon: 'difference',
      title: 'Diffs produced · token.service.ts +42/−18 · refresh.ts +120',
      sub: 'Changed Files · 2 of 4 files so far',
      targetLabel: 'Changed Files',
      target: 'output',
    },
    {
      icon: 'receipt_long',
      title: "This node's trace · 6 LLM calls",
      sub: 'Activity · raw I/O drill-down',
      targetLabel: 'Activity',
      target: 'activity',
    },
  ],
  props: [
    { label: 'Node id', value: 'node-4a', tone: 'accent' },
    { label: 'Kind', value: 'agent', tone: 'default' },
    { label: 'Status', value: 'running', tone: 'accent' },
    { label: 'Agent', value: 'coder', tone: 'default' },
    { label: 'Model', value: 'claude-opus-4.8', tone: 'default' },
    { label: 'Adapter', value: 'anthropic', tone: 'default' },
    { label: 'Branch', value: 'patch (fork)', tone: 'default' },
    { label: 'Start', value: '14:05:46', tone: 'default' },
    { label: 'Elapsed', value: '2m14s', tone: 'default' },
    { label: 'Exit', value: '— pending', tone: 'muted' },
    { label: 'Attempt', value: '1 of 1', tone: 'default' },
  ],
};

function minimalDetail(phase: FlowPhase, index: number): NodeDetail {
  return {
    id: phase.id,
    name: phase.name,
    kind: phase.kind,
    status: phase.status,
    meta: `node-${index + 1} · ${phase.status}`,
    breadcrumb: ['Flow', phase.name],
    input: null,
    output: null,
    agent: null,
    crossLinks: [],
    props: [
      { label: 'Node id', value: phase.id, tone: 'default' },
      { label: 'Kind', value: phase.kind, tone: 'default' },
      {
        label: 'Status',
        value: phase.status,
        tone: phase.status === 'running' ? 'accent' : 'default',
      },
      { label: 'Detail', value: phase.detail, tone: 'muted' },
    ],
  };
}

export function nodeDetailFor(phaseId: string): NodeDetail | undefined {
  if (phaseId === 'patch') return generatePatchDetail;
  const index = jobFlow.phases.findIndex((phase) => phase.id === phaseId);
  if (index < 0) return undefined;
  return minimalDetail(jobFlow.phases[index], index);
}
