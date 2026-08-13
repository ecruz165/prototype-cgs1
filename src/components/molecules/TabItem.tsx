import { Link, type LinkProps } from '@tanstack/react-router';

const baseClass =
  'rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground';

// Active treatment from the design's TabItem/Active: accent-subtle wash with
// accent text.
const activeProps = {
  className: 'bg-accent font-semibold text-accent-foreground',
};

interface TabItemProps {
  to: LinkProps['to'];
  label: string;
  exact?: boolean;
}

export function TabItem({ to, label, exact }: TabItemProps) {
  return (
    <Link
      to={to}
      className={baseClass}
      activeProps={activeProps}
      activeOptions={exact ? { exact: true } : undefined}
    >
      {label}
    </Link>
  );
}
