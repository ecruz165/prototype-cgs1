import { Link, type LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

// Row anatomy from the design's paneLeft-toggle wireframe: 38px rows, 6px
// radius, 13px Inter labels, mono tag pills. Active styling rides the
// data-status attribute the router sets — attribute selectors outrank the
// base color classes, unlike activeProps class concatenation, which leaves
// the winner to stylesheet order.
const rowClass =
  'flex h-[38px] items-center gap-[11px] rounded-sm border border-transparent px-3 text-[13px] transition-colors';

const variants = {
  // Selected rows get the accent-subtle wash with a 1px accent stroke.
  default: `${rowClass} text-muted-foreground hover:bg-muted [&_svg]:text-tertiary data-[status=active]:border-accent-strong data-[status=active]:bg-accent data-[status=active]:font-semibold data-[status=active]:text-accent-foreground data-[status=active]:[&_svg]:text-accent-strong`,
  // Workspace hats: accent text when active, never a second pill.
  hat: `${rowClass} text-muted-foreground hover:text-foreground [&_svg]:text-tertiary data-[status=active]:font-semibold data-[status=active]:text-accent-foreground data-[status=active]:[&_svg]:text-accent-strong`,
} as const;

interface NavItemProps {
  to: LinkProps['to'];
  label: string;
  icon: LucideIcon;
  tag?: string;
  variant?: keyof typeof variants;
}

export function NavItem({
  to,
  label,
  icon: Icon,
  tag,
  variant = 'default',
}: NavItemProps) {
  return (
    <Link to={to} className={variants[variant]}>
      <Icon size={18} aria-hidden />
      {label}
      {tag && (
        <span className="ml-auto rounded-full border border-border px-2 py-px font-medium font-mono text-[10px] text-tertiary">
          {tag}
        </span>
      )}
    </Link>
  );
}
