import type {
  JobSteering,
  SteeringDetail,
  SteeringRequest,
} from '@/schemas/steering';

// The design's pane-steering, verbatim.
export const jobSteering: JobSteering = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  requests: [
    {
      id: 'approve-merge',
      title: 'Approve merge to main',
      sub: 'Singularity → team · 2m',
      state: 'blocking',
      authority: 'commit',
    },
    {
      id: 'security-review',
      title: 'Security review: rotation policy',
      sub: 'Priya Patel · 4m',
      state: 'changes',
      authority: 'advise',
    },
    {
      id: 'auth-review',
      title: 'Auth review: refresh path',
      sub: 'Alex Kim · 1m',
      state: 'approved',
      authority: 'advise',
    },
    {
      id: 'destructive-migration',
      title: 'Apply destructive migration',
      sub: 'Singularity · 6m',
      state: 'awaiting',
      authority: 'commit',
    },
    {
      id: 'a11y-review',
      title: 'A11y review: modal focus order',
      sub: 'unassigned · 12m',
      state: 'open',
      authority: 'advise',
    },
    {
      id: 'deploy-window',
      title: 'Confirm deploy window',
      sub: 'Singularity · queued',
      state: 'queued',
      authority: 'commit',
    },
  ],
  team: [
    {
      initials: 'DR',
      name: 'Dana Ruiz',
      role: 'Manager',
      specs: [],
      connection: 'connected',
      authority: 'owner',
    },
    {
      initials: 'AK',
      name: 'Alex Kim',
      role: 'Auth SME',
      specs: ['Auth', 'Backend'],
      connection: 'connected',
      authority: 'advise',
    },
    {
      initials: 'PP',
      name: 'Priya Patel',
      role: 'Security SME',
      specs: ['Security', 'AppSec'],
      connection: 'connected',
      authority: 'advise',
    },
    {
      initials: 'SC',
      name: 'Sam Cole',
      role: 'Member',
      specs: [],
      connection: 'connected',
      authority: 'advise',
    },
    {
      initials: 'LW',
      name: 'Lee Wu',
      role: 'Member',
      specs: [],
      connection: 'invited',
      authority: 'advise',
    },
  ],
};

// The design's "Main Pane · Steering Request Detail" canvas, verbatim.
const approveMergeDetail: SteeringDetail = {
  id: 'approve-merge',
  title: 'Approve merge to main',
  kind: 'hitl',
  state: 'blocking',
  meta: 'raised by Singularity → team · 2m ago',
  breadcrumb: ['Steering', 'Approvals', 'Approve merge to main'],
  context: {
    headline:
      'Singularity reached a merge gate and needs approval to merge the auth-token refactor.',
    body: 'The change rotates session tokens on a 1h window and gates /auth behind the auth_v2 flag. Merging to main triggers the pre-merge gate on stocks-api (2 repos).',
    link: {
      icon: 'account_tree',
      title: 'Jump to the ‘Approve merge’ suspend node',
      sub: 'Flow · run #4827 · suspended, awaiting approval',
      targetLabel: 'Flow',
      target: 'flow',
    },
  },
  actionZone: {
    label: 'ACTION ZONE · OWNER COMMIT',
    title: 'Commit the decision',
    sub: 'You are the job owner · single-master: one owner commits',
    badge: 'JOB OWNER',
  },
  experts: [
    {
      initials: 'DW',
      color: '#7C3AED',
      name: 'Dana Whitfield',
      role: 'SME · Auth',
      roleTone: 'accent',
      note: 'Owns token.service.ts · 40 commits in auth scope, last 3 wks',
      pinned: true,
    },
    {
      initials: 'ML',
      color: '#0EA5A4',
      name: 'Marcus Lindqvist',
      role: 'SME · Security',
      roleTone: 'accent',
      note: 'Authored the token-rotation RFC · resolved WEBMOD-12345',
      pinned: true,
    },
    {
      initials: 'PN',
      color: '#C2410C',
      name: 'Priya Nair',
      role: 'Backend',
      roleTone: 'default',
      note: '12 commits in /auth this month · reviewed refresh.ts',
      pinned: false,
    },
    {
      initials: 'TH',
      color: '#2563EB',
      name: 'Tomás Herrera',
      role: 'Platform',
      roleTone: 'default',
      note: 'Owns the pre-merge gate config for stocks-api',
      pinned: false,
    },
    {
      initials: 'SK',
      color: '#BE185D',
      name: 'Sara Kim',
      role: 'QA',
      roleTone: 'default',
      note: 'Wrote the auth_v2 flag integration tests',
      pinned: false,
    },
  ],
  deliberation: {
    proposal: {
      initials: 'DW',
      color: '#7C3AED',
      name: 'Dana Whitfield',
      role: 'SME · Auth',
      age: '4m ago',
      text: 'Approve, but gate the merge on the auth_v2 smoke suite passing in staging first — token rotation needs one live 1h refresh cycle before main.',
    },
    votes: { approve: 4, requestChanges: 1 },
    verdict:
      'Peers advise approve (4 of 5). Awaiting your commit — as job owner, only you can merge.',
  },
  props: [
    { label: 'Subject', value: 'Approve merge to main', tone: 'default' },
    { label: 'Kind', value: 'HITL', tone: 'default' },
    { label: 'State', value: '● BLOCKING', tone: 'danger' },
    { label: 'Raised by', value: 'Singularity → team', tone: 'default' },
    { label: 'Age', value: '2m ago', tone: 'default' },
    { label: 'Gate', value: 'pre-merge', tone: 'default' },
    { label: 'Blast radius', value: 'stocks-api · 2 repos', tone: 'default' },
    { label: 'Suspended node', value: 'Approve merge', tone: 'accent' },
    { label: 'SLA', value: '4h · 3h 42m left', tone: 'default' },
  ],
};

function minimalSteeringDetail(request: SteeringRequest): SteeringDetail {
  return {
    id: request.id,
    title: request.title,
    kind: 'hitl',
    state: request.state,
    meta: request.sub,
    breadcrumb: ['Steering', request.title],
    context: null,
    actionZone: null,
    experts: [],
    deliberation: null,
    props: [
      { label: 'Subject', value: request.title, tone: 'default' },
      { label: 'State', value: request.state.toUpperCase(), tone: 'default' },
      {
        label: 'Authority',
        value: request.authority === 'commit' ? 'you commit' : 'advise',
        tone: request.authority === 'commit' ? 'accent' : 'muted',
      },
    ],
  };
}

export function steeringDetailFor(
  requestId: string,
): SteeringDetail | undefined {
  if (requestId === 'approve-merge') return approveMergeDetail;
  const request = jobSteering.requests.find((r) => r.id === requestId);
  return request ? minimalSteeringDetail(request) : undefined;
}
