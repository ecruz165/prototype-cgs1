import type { Decision, DecisionDetail, JobActivity } from '@/schemas/activity';

// The design's pane-activity decisions, plus the dispatch decision the
// design's Decision Detail canvas opens on (slotted at its 14:02 timestamp).
export const jobActivity: JobActivity = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  decisions: [
    {
      id: 'routed',
      icon: 'alt_route',
      title: 'Routed → implement-feature v3',
      sub: '14:01 · matched workflow',
      subTone: 'muted',
    },
    {
      id: 'dispatch-coder',
      icon: 'hub',
      title: 'Dispatched coder · Patch phase',
      sub: '14:02 · patch produced',
      subTone: 'active',
    },
    {
      id: 'gated-auth',
      icon: 'bolt',
      title: 'Gated /auth behind auth_v2 flag',
      sub: '14:04 · applied',
      subTone: 'muted',
    },
    {
      id: 'reran-tests',
      icon: 'rate_review',
      title: 'Re-ran tests after patch',
      sub: '14:05 · all green',
      subTone: 'active',
    },
    {
      id: 'sme-steering',
      icon: 'tune',
      title: 'Applied SME steering: cap rotation 1h',
      sub: '14:06 · from Priya (Security)',
      subTone: 'muted',
    },
    {
      id: 'escalated-coverage',
      icon: 'report',
      title: 'Escalated coverage gate failure',
      sub: '14:07 · blocking merge',
      subTone: 'danger',
    },
    {
      id: 'paused-hitl',
      icon: 'front_hand',
      title: 'Paused for HITL at merge gate',
      sub: '14:08 · awaiting approval',
      subTone: 'warning',
    },
  ],
};

// The design's "Main Pane · Activity · Decision Detail — Dispatch coder",
// verbatim.
const dispatchCoderDetail: DecisionDetail = {
  id: 'dispatch-coder',
  title: 'Dispatch coder · Patch phase',
  kind: 'DISPATCH',
  meta: '14:02 · claude-opus-4.8 · 8.4s',
  breadcrumb: ['Activity', 'Coordinator Decisions', 'Dispatch coder'],
  reasoning: {
    body: 'Patch phase needs code generation against an accepted spec. Dispatched the coder agent on claude-opus-4.8 (over sonnet) for higher accuracy on the auth-rotation diff — budget headroom was comfortable. Routed to the patch branch of the fork, not tests.',
    inputs: [
      { icon: 'speed', label: 'Task complexity', value: 'high' },
      { icon: 'check_circle', label: 'Prior phase', value: 'plan accepted' },
      {
        icon: 'balance',
        label: 'Model trade-off',
        value: 'opus: +accuracy / +cost',
      },
      { icon: 'account_tree', label: 'Branch', value: 'patch ‖ tests → patch' },
      { icon: 'savings', label: 'Budget headroom', value: '$4.59 remaining' },
    ],
  },
  io: {
    note: 'The raw LLM transcript — what the old Logs pane showed; now nested behind the decision.',
    request:
      'system: You are coder@singularity.\nuser: Implement session-token rotation on a 1h window per\nauth-spec.md §4. Gate the refresh path behind auth_v2.',
    response:
      '+ rotateSessionToken(session, { windowMs: 3_600_000 })\n+ refresh path wired through /auth\n→ 2 files · +56 −24',
    stats: 'claude-opus-4.8  ·  in 14.2k  ·  out 7.2k  ·  8.4s',
  },
  crossLinks: [
    {
      icon: 'account_tree',
      title: 'Generate patch',
      sub: 'the Flow node this decision drove',
      targetLabel: 'Flow',
      target: 'flow',
    },
    {
      icon: 'difference',
      title: 'token.service.ts  +42 −18',
      sub: 'the changes it produced',
      targetLabel: 'Output',
      target: 'output',
    },
    {
      icon: 'payments',
      title: "This decision's cost · $0.18",
      sub: 'what it spent',
      targetLabel: 'Budget & Gates',
      target: 'budget',
    },
  ],
  props: [
    { label: 'Decision', value: 'Dispatch coder', tone: 'default' },
    { label: 'Phase', value: 'Patch', tone: 'default' },
    { label: 'Agent', value: 'coder', tone: 'default' },
    { label: 'Model', value: 'claude-opus-4.8', tone: 'accent' },
    { label: 'At', value: '14:02:03', tone: 'default' },
    { label: 'Latency', value: '8.4s', tone: 'default' },
    { label: 'In', value: '14.2k', tone: 'default' },
    { label: 'Out', value: '7.2k', tone: 'default' },
    { label: 'Cost', value: '$0.18', tone: 'accent' },
    { label: 'Outcome', value: 'patch produced', tone: 'active' },
  ],
};

function minimalDecisionDetail(decision: Decision): DecisionDetail {
  return {
    id: decision.id,
    title: decision.title,
    kind: 'DECISION',
    meta: decision.sub,
    breadcrumb: ['Activity', 'Coordinator Decisions', decision.title],
    reasoning: null,
    io: null,
    crossLinks: [],
    props: [
      { label: 'Decision', value: decision.title, tone: 'default' },
      { label: 'At', value: decision.sub.split(' · ')[0], tone: 'default' },
      {
        label: 'Outcome',
        value: decision.sub.split(' · ')[1] ?? '—',
        tone: decision.subTone,
      },
    ],
  };
}

export function decisionDetailFor(
  decisionId: string,
): DecisionDetail | undefined {
  if (decisionId === 'dispatch-coder') return dispatchCoderDetail;
  const decision = jobActivity.decisions.find((d) => d.id === decisionId);
  return decision ? minimalDecisionDetail(decision) : undefined;
}
