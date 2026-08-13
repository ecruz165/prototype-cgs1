import { useNavigate } from '@tanstack/react-router';
import { Bell, Settings } from 'lucide-react';
import { designIcon } from '@/lib/designIcons';
import type { AppNotification, Notifications } from '@/schemas/notifications';

const iconTones = {
  danger: 'text-status-danger',
  warning: 'text-status-warning',
  accent: 'text-accent-strong',
  jira: 'text-[#4F9EF7]',
} as const;

const tagTones = {
  HEALTH: 'text-accent-foreground',
  JIRA: 'text-[#4F9EF7]',
} as const;

// The design's NotificationsPanel: HITL requests, chime-in requests, and
// agent-suggested work, each item carrying its action.
export function NotificationsPanel({
  notifications,
  onClose,
}: {
  notifications: Notifications;
  onClose: () => void;
}) {
  return (
    <div className="relative flex flex-col rounded-[14px] border border-border bg-card shadow-xl">
      <span
        aria-hidden
        className="-top-1.5 absolute right-[52px] size-3 rotate-45 border-border border-t border-l bg-card"
      />
      <header className="flex items-center justify-between px-4 py-3.5">
        <span className="flex items-center gap-2">
          <Bell size={18} className="text-foreground" aria-hidden />
          <span className="font-bold text-base text-foreground">
            Notifications
          </span>
          <span className="rounded-full bg-accent px-2 py-0.5 font-semibold text-[11px] text-accent-foreground">
            {notifications.countLabel}
          </span>
        </span>
        <span className="flex items-center gap-2.5">
          <button
            type="button"
            className="text-[11px] text-tertiary transition-colors hover:text-foreground"
          >
            Mark all read
          </button>
          <button
            type="button"
            aria-label="Notification settings"
            className="text-tertiary transition-colors hover:text-foreground"
          >
            <Settings size={16} aria-hidden />
          </button>
        </span>
      </header>
      <div className="flex flex-col">
        {notifications.sections.map((section) => (
          <section key={section.label} className="flex flex-col">
            <div className="flex items-baseline justify-between px-4 pt-3 pb-1">
              <span className="font-mono font-semibold text-[10px] text-faint">
                {section.label}
              </span>
              <span className="font-mono text-[10px] text-tertiary">
                {section.items.length}
              </span>
            </div>
            <ul className="flex flex-col gap-0.5 px-1.5 pb-2">
              {section.items.map((item) => (
                <NotificationRow key={item.id} item={item} onClose={onClose} />
              ))}
            </ul>
          </section>
        ))}
      </div>
      <footer className="border-border border-t px-4 py-3">
        <button
          type="button"
          className="font-semibold text-[13px] text-accent-foreground"
        >
          View all notifications&ensp;→
        </button>
      </footer>
    </div>
  );
}

function NotificationRow({
  item,
  onClose,
}: {
  item: AppNotification;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const Icon = designIcon(item.icon);
  const actionable = Boolean(item.target);
  const act = () => {
    if (item.target) {
      navigate({
        to: '/jobs/$jobId/$section',
        params: item.target,
      });
      onClose();
    }
  };
  return (
    <li>
      <button
        type="button"
        onClick={act}
        disabled={!actionable}
        className="flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors enabled:hover:bg-muted"
      >
        <Icon
          size={16}
          className={`mt-0.5 shrink-0 ${iconTones[item.iconTone]}`}
          aria-hidden
        />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-baseline gap-1.5">
            <span className="min-w-0 truncate font-semibold text-[13px] text-foreground">
              {item.title}
            </span>
            {item.tag && (
              <span
                className={`shrink-0 font-bold font-mono text-[9px] ${tagTones[item.tag]}`}
              >
                {item.tag}
              </span>
            )}
          </span>
          <span className="truncate text-[11px] text-tertiary">{item.sub}</span>
        </span>
        <span
          className={`shrink-0 font-semibold text-xs ${
            item.actionTone === 'accent'
              ? 'text-accent-foreground'
              : 'text-muted-foreground'
          }`}
        >
          {item.action}
        </span>
      </button>
    </li>
  );
}
