import { useQuery } from '@tanstack/react-query';
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { NotificationsPanel } from '@/components/organisms/NotificationsPanel';
import { fetchNotifications } from '@/lib/api';

interface AppTopBarProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

const squareButtonClass =
  'flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:text-foreground';

export function AppTopBar({ navOpen, onToggleNav }: AppTopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });
  const alertCount =
    notifications?.sections.reduce((n, s) => n + s.items.length, 0) ?? 0;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-sidebar px-4">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={onToggleNav}
          className={squareButtonClass}
        >
          <Menu size={18} aria-hidden />
        </button>
        <div className="flex items-center gap-2.5">
          <span
            className="size-2.5 rounded-full bg-accent-strong"
            aria-hidden
          />
          <span className="font-semibold text-base">Singularity</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
          onClick={() => setNotificationsOpen((o) => !o)}
          className={`relative ${squareButtonClass}`}
        >
          <Bell size={18} aria-hidden />
          {alertCount > 0 && (
            <span className="-top-1 -right-1 absolute flex h-4 min-w-4 items-center justify-center rounded-full bg-status-danger px-[5px] font-bold text-[10px] text-on-accent">
              {alertCount}
            </span>
          )}
        </button>
        <span className="flex size-9 items-center justify-center rounded-full bg-[#7C3AED] font-semibold text-white text-xs">
          E
        </span>
      </div>
      {notificationsOpen && notifications && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setNotificationsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="fixed top-[60px] right-3 z-50 w-[420px]">
            <NotificationsPanel
              notifications={notifications}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>
        </>
      )}
    </header>
  );
}
