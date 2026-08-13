import type { Notifications } from '@/schemas/notifications';

// The design's NotificationsPanel, verbatim. HITL actions land on the
// steering section of the running job.
export const notifications: Notifications = {
  countLabel: '7 new',
  sections: [
    {
      label: 'HITL REQUESTS',
      items: [
        {
          id: 'approve-merge',
          icon: 'front_hand',
          iconTone: 'danger',
          title: 'Approve merge to main',
          sub: 'Rotate session tokens · 2m ago',
          tag: null,
          action: 'Review',
          actionTone: 'accent',
          target: { jobId: 'job_8af21c', section: 'steering' },
        },
        {
          id: 'security-review',
          icon: 'rule',
          iconTone: 'warning',
          title: 'Security review: cap rotation at 1h',
          sub: 'Rotate session tokens · 8m ago',
          tag: null,
          action: 'Review',
          actionTone: 'accent',
          target: { jobId: 'job_8af21c', section: 'steering' },
        },
      ],
    },
    {
      label: 'CHIME-IN REQUESTS',
      items: [
        {
          id: 'dana-migration',
          icon: 'forum',
          iconTone: 'accent',
          title: 'Dana Ruiz wants your call on the migration approach',
          sub: 'Steering · 5m ago',
          tag: null,
          action: 'Reply',
          actionTone: 'secondary',
          target: { jobId: 'job_8af21c', section: 'steering' },
        },
        {
          id: 'agent-unsure',
          icon: 'help',
          iconTone: 'warning',
          title: 'Agent is unsure — drop audit_log_archive in the migration?',
          sub: 'Drop audit archive · 12m ago',
          tag: null,
          action: 'Weigh in',
          actionTone: 'secondary',
          target: { jobId: 'job_8af21c', section: 'steering' },
        },
      ],
    },
    {
      label: 'AGENT SUGGESTED',
      items: [
        {
          id: 'error-rate',
          icon: 'monitor_heart',
          iconTone: 'accent',
          title: 'Error rate on /auth up 12% in the last hour',
          sub: 'Product Health · just now',
          tag: 'HEALTH',
          action: 'Start job',
          actionTone: 'accent',
          target: null,
        },
        {
          id: 'p95-checkout',
          icon: 'speed',
          iconTone: 'accent',
          title: 'p95 latency regressed on checkout — 9.4s',
          sub: 'Product Health · 20m ago',
          tag: 'HEALTH',
          action: 'Investigate',
          actionTone: 'secondary',
          target: null,
        },
        {
          id: 'webmod-12350',
          icon: 'view_kanban',
          iconTone: 'jira',
          title: 'WEBMOD-12350 matches the implement-feature workflow',
          sub: 'Jira Backlog · 1h ago',
          tag: 'JIRA',
          action: 'Draft job',
          actionTone: 'accent',
          target: null,
        },
      ],
    },
  ],
};
