import { Link } from '@tanstack/react-router';
import { Settings } from 'lucide-react';
import { designIcon } from '@/lib/designIcons';
import { type JobSectionSlug, jobSections } from '@/lib/jobSections';

interface ActivityRailProps {
  jobId: string;
  activeSection: JobSectionSlug;
  paneOpen: boolean;
  onTogglePane: () => void;
}

const itemClass =
  'flex h-10 w-full items-center justify-center border-l-2 border-transparent transition-colors';

// The right-edge icon rail from the design's jobs-activity-bar wireframe:
// selecting a section opens its pane to the LEFT; re-selecting the active
// section toggles the pane (so the rail item is a button while active).
export function ActivityRail({
  jobId,
  activeSection,
  paneOpen,
  onTogglePane,
}: ActivityRailProps) {
  return (
    <nav
      aria-label="Job sections"
      className="flex w-12 shrink-0 flex-col items-center gap-1 border-border border-l bg-sidebar py-3"
    >
      {jobSections.map((section) => {
        const Icon = designIcon(section.icon);
        const active = section.slug === activeSection;
        return active ? (
          <button
            key={section.slug}
            type="button"
            aria-label={section.label}
            aria-expanded={paneOpen}
            onClick={onTogglePane}
            className={`${itemClass} border-l-accent-strong bg-accent text-accent-foreground`}
          >
            <Icon size={20} aria-hidden />
          </button>
        ) : (
          <Link
            key={section.slug}
            to="/jobs/$jobId/$section"
            params={{ jobId, section: section.slug }}
            aria-label={section.label}
            className={`${itemClass} text-muted-foreground hover:text-foreground`}
          >
            <Icon size={20} aria-hidden />
          </Link>
        );
      })}
      <div className="mt-auto">
        <button
          type="button"
          aria-label="Job settings"
          className={`${itemClass} w-12 text-muted-foreground hover:text-foreground`}
        >
          <Settings size={20} aria-hidden />
        </button>
      </div>
    </nav>
  );
}
