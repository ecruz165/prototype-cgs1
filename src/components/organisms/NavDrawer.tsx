import {
  Bot,
  FlaskConical,
  House,
  Users,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';
import { NavItem, NavItemPlaceholder } from '@/components/molecules/NavItem';

const menuItems = [
  { to: '/', label: 'Home', icon: House, exact: true },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/demos', label: 'Demos', icon: FlaskConical },
] as const;

// Catalog entries from the design (Agents, Skills, Flows) become NavItems as
// their sections get built.
const catalogItems = [
  { label: 'Agents', icon: Bot },
  { label: 'Skills', icon: Wrench },
  { label: 'Flows', icon: Workflow },
] as const;

interface NavDrawerProps {
  onClose: () => void;
}

export function NavDrawer({ onClose }: NavDrawerProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex w-62 shrink-0 flex-col gap-1 border-r bg-sidebar px-3 py-4"
    >
      <div className="flex items-center justify-between pt-1.5 pr-1 pb-3.5 pl-2">
        <span className="font-semibold text-[11px] text-tertiary">MENU</span>
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="text-tertiary transition-colors hover:text-foreground"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      {menuItems.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
      <div className="px-3 pt-3.5 pb-1.5">
        <span className="font-semibold text-[10px] text-faint">CATALOG</span>
      </div>
      {catalogItems.map((item) => (
        <NavItemPlaceholder key={item.label} {...item} />
      ))}
    </nav>
  );
}
