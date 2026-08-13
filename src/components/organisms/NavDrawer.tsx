import { useRouterState } from '@tanstack/react-router';
import {
  BriefcaseBusiness,
  ChartColumn,
  ChartPie,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CirclePlus,
  ClipboardList,
  Construction,
  LayoutGrid,
  Rocket,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { NavItem } from '@/components/molecules/NavItem';

// The four job kinds. Manage is NOT part of this flow — it stays a separate
// overview item above the group (rule from the design's paneLeft wireframe).
const hats = [
  { to: '/workspace/plan', label: 'Plan', icon: ClipboardList },
  { to: '/workspace/build', label: 'Build', icon: Construction },
  { to: '/workspace/validate', label: 'Validate', icon: ShieldCheck },
  { to: '/workspace/run', label: 'Run', icon: Rocket },
] as const;

export function NavDrawer() {
  return (
    <nav
      aria-label="Primary"
      className="flex w-80 shrink-0 flex-col gap-2.5 border-r bg-sidebar px-3 pt-3.5 pb-3.5"
    >
      {/* Product switcher is static until multi-product data exists. */}
      <button
        type="button"
        className="mb-2 flex h-12 w-full items-center justify-between rounded-md border border-border bg-muted px-3 text-left"
      >
        <span className="font-semibold text-[13px] text-foreground">
          Digital Investor Platform
        </span>
        <ChevronsUpDown size={18} className="text-tertiary" aria-hidden />
      </button>

      <NavItem to="/new-job" label="New Job" icon={CirclePlus} tag="entry" />
      <NavItem to="/manage" label="Manage" icon={ChartPie} tag="overview" />
      <WorkspacesDisclosure />
      <NavItem to="/jobs" label="Jobs" icon={BriefcaseBusiness} tag="all" />
      <NavItem to="/benchmarks" label="Benchmarks" icon={ChartColumn} />

      <div className="mt-auto border-border-subtle border-t pt-3">
        <NavItem to="/settings" label="Settings" icon={Settings} />
      </div>
    </nav>
  );
}

// Disclosure per the wireframe: expanding is hover-reveal (or pinned by
// click) and never changes selection — the route alone decides the active
// hat, which lights the parent pill and an accent tick on the guide line.
function WorkspacesDisclosure() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeHat = hats.find((hat) => pathname.startsWith(hat.to));
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned || Boolean(activeHat);
  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover only reveals; the button handles interaction
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setPinned((p) => !p)}
        className={`flex h-[38px] w-full items-center gap-[11px] rounded-sm border px-3 text-[13px] transition-colors ${
          activeHat
            ? 'border-accent-strong bg-accent font-semibold text-accent-foreground [&_svg]:text-accent-strong'
            : 'border-transparent text-muted-foreground hover:bg-muted [&_svg]:text-tertiary'
        }`}
      >
        <LayoutGrid size={18} aria-hidden />
        <span>
          Workspaces
          {!open && activeHat && (
            <>
              <span className="px-1.5 font-normal text-faint">·</span>
              <span className="font-semibold text-accent-strong">
                {activeHat.label}
              </span>
            </>
          )}
        </span>
        <Chevron size={18} className="ml-auto" aria-hidden />
      </button>
      {open && (
        <div className="relative mt-1 flex flex-col gap-1">
          <span
            aria-hidden
            className="absolute top-0.5 bottom-0.5 left-[19px] w-px bg-border"
          />
          {hats.map((hat) => (
            <div key={hat.to} className="relative ml-4">
              {activeHat?.to === hat.to && (
                <span
                  aria-hidden
                  className="absolute top-1 bottom-1 left-[3px] w-0.5 bg-accent-strong"
                />
              )}
              <NavItem
                to={hat.to}
                label={hat.label}
                icon={hat.icon}
                variant="hat"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
