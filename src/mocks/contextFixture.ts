import type {
  ContextItem,
  JobContextData,
  QueryDetail,
} from '@/schemas/context';

// The design's pane-context, verbatim.
export const jobContext: JobContextData = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  inputs: [
    {
      id: 'docs',
      icon: 'folder',
      name: 'Uploaded docs',
      stat: '4',
      statTone: 'muted',
    },
    {
      id: 'links',
      icon: 'link',
      name: 'Links (Confluence, JIRA…)',
      stat: '5',
      statTone: 'muted',
    },
    {
      id: 'repos',
      icon: 'account_tree',
      name: 'Repos in scope',
      stat: '2',
      statTone: 'muted',
    },
  ],
  queries: [
    {
      id: 'refresh-patterns',
      icon: 'manage_search',
      name: 'auth token refresh patterns',
      stat: '12 · 3 used',
      statTone: 'accent',
    },
    {
      id: 'rotation-usages',
      icon: 'manage_search',
      name: 'session-token rotation usages',
      stat: '8 · 2 used',
      statTone: 'accent',
    },
    {
      id: 'auth-contract',
      icon: 'manage_search',
      name: '/auth contract & refresh tests',
      stat: '15 · 5 used',
      statTone: 'accent',
    },
  ],
  queriesLabel: '6 · what was used',
};

// The design's "Main Pane · Context · Query Detail — token rotation",
// verbatim.
const refreshPatternsDetail: QueryDetail = {
  id: 'refresh-patterns',
  title: 'auth token refresh patterns',
  pill: 'HYBRID',
  meta: '12 hits · 38ms · 4 fed to context',
  breadcrumb: ['Context', 'Queries', 'auth token refresh patterns'],
  query: {
    text: 'auth token refresh patterns',
    tags: ['hybrid', 'vector + graph + keyword', '38ms', 'context-server'],
    issuedBy:
      'Issued by coder agent · Patch phase · 14:02 · over repo + uploaded docs',
  },
  hits: {
    label: 'HIT SET · 12 retrieved · 4 fed to context',
    rows: [
      {
        icon: 'code',
        path: 'src/auth/token.service.ts:42',
        score: '0.91',
        used: true,
      },
      {
        icon: 'description',
        path: 'auth-spec.md §4 — rotation',
        score: '0.88',
        used: true,
      },
      {
        icon: 'code',
        path: 'src/auth/session.ts:18',
        score: '0.84',
        used: true,
      },
      {
        icon: 'picture_as_pdf',
        path: 'rotating-tokens-rfc.pdf p.3',
        score: '0.79',
        used: true,
      },
      {
        icon: 'code',
        path: 'test/refresh.test.ts:10',
        score: '0.72',
        used: false,
      },
      {
        icon: 'article',
        path: '/auth contract.md',
        score: '0.68',
        used: false,
      },
      { icon: 'code', path: 'legacy/auth.js:88', score: '0.61', used: false },
    ],
    footer: '+ 5 more below the 0.60 cut — retrieved, not injected',
  },
  fed: {
    body: "4 of 12 hits were injected into the coder agent's context for the Patch phase (8.1k tokens). The other 8 were retrieved but pruned — below the 0.75 relevance cut or trimmed to fit the context budget.",
    usedLegend: '■ 4 used (8.1k tok)',
    prunedLegend: '■ 8 pruned',
    usedPct: 33,
  },
  crossLinks: [
    {
      icon: 'hub',
      title: 'Dispatch coder · Patch phase',
      sub: 'the decision that consumed these hits',
      targetLabel: 'Activity',
      target: 'activity',
    },
    {
      icon: 'difference',
      title: 'token.service.ts',
      sub: 'the file this context shaped',
      targetLabel: 'Output',
      target: 'output',
    },
  ],
  props: [
    { label: 'Query', value: 'auth token refresh', tone: 'default' },
    { label: 'Mode', value: 'hybrid', tone: 'accent' },
    { label: 'Latency', value: '38ms', tone: 'default' },
    { label: 'Hits', value: '12', tone: 'default' },
    { label: 'Used', value: '4', tone: 'active' },
    { label: 'Pruned', value: '8', tone: 'default' },
    { label: 'Issued by', value: 'coder', tone: 'default' },
    { label: 'Phase', value: 'Patch', tone: 'default' },
    { label: 'Source', value: 'context-server', tone: 'default' },
    { label: 'Fed tokens', value: '8.1k', tone: 'default' },
  ],
};

function minimalQueryDetail(item: ContextItem, group: string): QueryDetail {
  return {
    id: item.id,
    title: item.name,
    pill: group.toUpperCase(),
    meta: item.stat,
    breadcrumb: ['Context', group, item.name],
    query: null,
    hits: null,
    fed: null,
    crossLinks: [],
    props: [
      { label: group, value: item.name, tone: 'default' },
      { label: 'Count', value: item.stat, tone: item.statTone },
    ],
  };
}

export function queryDetailFor(itemId: string): QueryDetail | undefined {
  if (itemId === 'refresh-patterns') return refreshPatternsDetail;
  const groups: [string, ContextItem[]][] = [
    ['Input', jobContext.inputs],
    ['Query', jobContext.queries],
  ];
  for (const [group, items] of groups) {
    const item = items.find((i) => i.id === itemId);
    if (item) return minimalQueryDetail(item, group);
  }
  return undefined;
}
