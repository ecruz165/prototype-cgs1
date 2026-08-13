import type { FileDiff, JobOutput, OutputFile } from '@/schemas/output';

// The design's pane-output, verbatim: five task groups, nine files, four
// non-code artifacts.
export const jobOutput: JobOutput = {
  ticket: 'WEBMOD-12345',
  flow: 'implement-feature v3',
  scope: [
    { icon: 'confirmation_number', label: 'WEBMOD-12345' },
    { icon: 'call_merge', label: 'PR #142' },
  ],
  tasks: [
    {
      id: 'rotate-tokens',
      title: 'Rotate session tokens on a 1h window',
      commit: 'a1b2c3d',
      files: [
        {
          id: 'token.service.ts',
          name: 'token.service.ts',
          change: 'modified',
          added: 42,
          removed: 18,
        },
        {
          id: 'session.ts',
          name: 'session.ts',
          change: 'modified',
          added: 14,
          removed: 6,
        },
      ],
    },
    {
      id: 'gate-auth',
      title: 'Gate /auth behind auth_v2 flag',
      commit: 'e4f5g6h',
      files: [
        {
          id: 'auth.guard.ts',
          name: 'auth.guard.ts',
          change: 'modified',
          added: 21,
          removed: 7,
        },
        {
          id: 'auth.types.ts',
          name: 'auth.types.ts',
          change: 'modified',
          added: 9,
          removed: 2,
        },
      ],
    },
    {
      id: 'refresh-tests',
      title: 'Add tests for refresh path',
      commit: 'i7j8k9l',
      files: [
        {
          id: 'auth.test.ts',
          name: 'auth.test.ts',
          change: 'added',
          added: 88,
          removed: null,
        },
        {
          id: 'refresh.ts',
          name: 'refresh.ts',
          change: 'added',
          added: 120,
          removed: null,
        },
      ],
    },
    {
      id: 'cap-rotation',
      title: 'Cap rotation at 1h (security review)',
      commit: 'm0n1o2p',
      files: [
        {
          id: 'session.helper.ts',
          name: 'session.helper.ts',
          change: 'modified',
          added: 9,
          removed: 3,
        },
      ],
    },
    {
      id: 'drop-audit-archive',
      title: 'Drop audit_log_archive in migration',
      commit: 'q3r4s5t',
      files: [
        {
          id: 'migration.sql',
          name: 'migration.sql',
          change: 'added',
          added: 64,
          removed: null,
        },
        {
          id: 'audit-archive.model.ts',
          name: 'audit-archive.model.ts',
          change: 'removed',
          added: null,
          removed: 47,
        },
      ],
    },
  ],
  artifacts: [
    { icon: 'summarize', name: 'rotation-summary.md', sub: 'report · 4.2 KB' },
    { icon: 'data_object', name: 'api-contract.json', sub: 'schema · 1.8 KB' },
    { icon: 'html', name: 'coverage-report.html', sub: '72% · 88 KB' },
    { icon: 'account_tree', name: 'auth-sequence.svg', sub: 'diagram · 12 KB' },
  ],
};

// The design's "Main Pane · Output · Diff View — token.service.ts", verbatim.
const tokenServiceDiff: FileDiff = {
  id: 'token.service.ts',
  name: 'token.service.ts',
  change: 'modified',
  meta: '+42 −18 · a1b2c3d',
  breadcrumb: ['Output', 'Diff View', 'token.service.ts'],
  hunkLabel: '@@ src/auth/token.service.ts',
  hunks: [
    {
      lines: [
        { kind: 'context', text: '  function issueSession(user) {' },
        {
          kind: 'removed',
          text: '-   const expiresAt = now() + STATIC_TTL_MS',
        },
        {
          kind: 'added',
          text: '+   const ROTATION_WINDOW_MS = 60 * 60 * 1000',
        },
      ],
    },
    {
      lines: [
        {
          kind: 'context',
          text: '    const token = signSession(user, claims)',
        },
        { kind: 'removed', text: '-   return { token, expiresAt }' },
        {
          kind: 'added',
          text: '+   scheduleRefresh(token, ROTATION_WINDOW_MS)',
        },
      ],
    },
    {
      lines: [
        { kind: 'context', text: '  function rotate(session) {' },
        {
          kind: 'removed',
          text: '-   session.expiresAt = now() + STATIC_TTL_MS',
        },
        {
          kind: 'added',
          text: '+   return refreshSession(session, ROTATION_WINDOW_MS)',
        },
      ],
    },
  ],
  producedBy: [
    {
      label: 'Task',
      value: 'Rotate session tokens on a 1h window',
      tone: 'default',
    },
    { label: 'Phase', value: 'Patch', tone: 'default' },
    { label: 'Agent', value: 'coder · claude-opus-4.8', tone: 'default' },
    { label: 'Commit', value: 'a1b2c3d', tone: 'accent' },
  ],
  crossLinks: [
    {
      icon: 'account_tree',
      title: 'Generate patch',
      sub: 'the Flow node that produced this file',
      targetLabel: 'Flow',
      target: 'flow',
    },
    {
      icon: 'gavel',
      title: 'Cap rotation at 1h',
      sub: 'the decision that drove it',
      targetLabel: 'Steering',
      target: 'steering',
    },
  ],
  props: [
    { label: 'File', value: 'token.service.ts', tone: 'default' },
    { label: 'Path', value: 'src/auth/', tone: 'default' },
    { label: 'Status', value: 'Modified', tone: 'warning' },
    { label: 'Added', value: '+42', tone: 'active' },
    { label: 'Removed', value: '−18', tone: 'danger' },
    { label: 'Language', value: 'TypeScript', tone: 'default' },
    { label: 'Task', value: 'Rotate session tokens', tone: 'default' },
    { label: 'Phase', value: 'Patch', tone: 'default' },
    { label: 'Commit', value: 'a1b2c3d', tone: 'accent' },
  ],
};

const changeWord: Record<OutputFile['change'], string> = {
  modified: 'Modified',
  added: 'Added',
  removed: 'Removed',
};

function minimalFileDiff(file: OutputFile, taskTitle: string): FileDiff {
  const stats = [
    file.added !== null ? `+${file.added}` : null,
    file.removed !== null ? `−${file.removed}` : null,
  ]
    .filter(Boolean)
    .join(' ');
  return {
    id: file.id,
    name: file.name,
    change: file.change,
    meta: stats,
    breadcrumb: ['Output', 'Diff View', file.name],
    hunkLabel: null,
    hunks: [],
    producedBy: [{ label: 'Task', value: taskTitle, tone: 'default' }],
    crossLinks: [],
    props: [
      { label: 'File', value: file.name, tone: 'default' },
      {
        label: 'Status',
        value: changeWord[file.change],
        tone:
          file.change === 'modified'
            ? 'warning'
            : file.change === 'added'
              ? 'active'
              : 'danger',
      },
      ...(file.added !== null
        ? [{ label: 'Added', value: `+${file.added}`, tone: 'active' as const }]
        : []),
      ...(file.removed !== null
        ? [
            {
              label: 'Removed',
              value: `−${file.removed}`,
              tone: 'danger' as const,
            },
          ]
        : []),
    ],
  };
}

export function fileDiffFor(fileId: string): FileDiff | undefined {
  if (fileId === 'token.service.ts') return tokenServiceDiff;
  for (const task of jobOutput.tasks) {
    const file = task.files.find((f) => f.id === fileId);
    if (file) return minimalFileDiff(file, task.title);
  }
  return undefined;
}
