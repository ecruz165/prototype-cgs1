import { Link, type LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

const baseClass =
  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

// Selected treatment from the design's NavItem/Selected: brand-subtle wash,
// accent icon, full-strength label.
const activeProps = {
  className:
    'bg-brand-subtle font-semibold text-foreground [&_svg]:text-accent-strong',
};

interface NavItemProps {
  to: LinkProps['to'];
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export function NavItem({ to, label, icon: Icon, exact }: NavItemProps) {
  return (
    <Link
      to={to}
      className={baseClass}
      activeProps={activeProps}
      activeOptions={exact ? { exact: true } : undefined}
    >
      <Icon size={18} aria-hidden />
      {label}
    </Link>
  );
}

interface NavItemPlaceholderProps {
  label: string;
  icon: LucideIcon;
}

// Design nav entries whose routes don't exist yet: visible, not navigable.
export function NavItemPlaceholder({
  label,
  icon: Icon,
}: NavItemPlaceholderProps) {
  return (
    <span
      aria-disabled="true"
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-faint"
    >
      <Icon size={18} aria-hidden />
      {label}
    </span>
  );
}
