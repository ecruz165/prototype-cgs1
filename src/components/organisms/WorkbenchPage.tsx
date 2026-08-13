import { Fragment, useState } from 'react';
import type {
  WorkbenchBlock,
  WorkbenchRow,
  WorkbenchSection,
} from '@/schemas/workbench';

const tones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

const badgePills = {
  default: 'bg-muted text-muted-foreground',
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-status-warning-subtle text-status-warning',
  active: 'bg-status-badge-bg text-status-badge-text',
  danger: 'bg-status-danger-subtle text-status-danger',
  muted: 'bg-muted text-faint',
} as const;

const noteTones = {
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-status-warning-subtle text-status-warning',
  danger: 'bg-status-danger-subtle text-status-danger',
  active: 'bg-status-badge-bg text-status-badge-text',
} as const;

// One renderer for the workspace-hat and manage screens: header, view tabs,
// stat row, and labeled cards built from a small set of block kinds.
export function WorkbenchPage({ section }: { section: WorkbenchSection }) {
  const [viewSlug, setViewSlug] = useState(section.views[0]?.slug);
  const view =
    section.views.find((v) => v.slug === viewSlug) ?? section.views[0];

  if (!view) return null;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-7 py-6">
      <header className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-bold text-[26px] text-foreground">
            {section.title}
          </h1>
          <span className="rounded-full bg-muted px-3 py-1 text-[13px] text-muted-foreground">
            {section.scope}
          </span>
        </div>
        <p className="text-muted-foreground text-xs">{view.subtitle}</p>
      </header>

      <nav aria-label={`${section.title} views`} className="flex gap-1">
        {section.views.map((v) => (
          <button
            key={v.slug}
            type="button"
            aria-pressed={v.slug === view.slug}
            onClick={() => setViewSlug(v.slug)}
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              v.slug === view.slug
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {v.tab}
          </button>
        ))}
      </nav>

      {view.stats.length > 0 && (
        <div className="flex gap-3">
          {view.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col gap-1 rounded-md border border-border bg-card px-3.5 py-3"
            >
              <span className="font-mono font-semibold text-[10px] text-tertiary">
                {stat.label}
              </span>
              <span className="font-bold text-2xl text-foreground">
                {stat.value}
              </span>
              {stat.sub && (
                <span className="text-[10px] text-tertiary">{stat.sub}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {view.cards.map((card) => (
        <section
          key={card.label}
          className="flex flex-col gap-3 rounded-md border border-border bg-card p-4"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono font-semibold text-[11px] text-foreground">
              {card.label}
            </span>
            {card.sub && (
              <span className="text-[11px] text-tertiary">{card.sub}</span>
            )}
          </div>
          <Block block={card.block} />
        </section>
      ))}
    </main>
  );
}

function Block({ block }: { block: WorkbenchBlock }) {
  if (block.kind === 'tiles') {
    return (
      <div className="grid grid-cols-3 gap-3">
        {block.tiles.map((tile) => (
          <div
            key={tile.title}
            className="flex flex-col gap-1.5 rounded-md bg-muted p-3.5"
          >
            <span className="font-semibold text-[15px] text-foreground">
              {tile.title}
            </span>
            <span className="flex-1 text-muted-foreground text-xs">
              {tile.desc}
            </span>
            <button
              type="button"
              className="w-fit font-semibold text-accent-foreground text-xs hover:underline"
            >
              {tile.action} →
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (block.kind === 'list') {
    return (
      <ul className="flex flex-col">
        {block.rows.map((row) => (
          <ListRow key={`${row.title}-${row.sub ?? ''}`} row={row} />
        ))}
      </ul>
    );
  }
  if (block.kind === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {block.columns.map((column) => (
                <th
                  key={column}
                  className="border-border border-b pr-4 pb-2 font-mono font-semibold text-[10px] text-tertiary"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join('|')} className="border-border-subtle border-b">
                {row.map((cell, index) => (
                  <td
                    key={`${index}-${cell}`}
                    className={`py-2 pr-4 text-xs ${
                      index === 0
                        ? 'font-semibold text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.kind === 'pills') {
    return (
      <div className="flex items-center gap-2">
        {block.items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <span className="text-faint">→</span>}
            <span
              className={`flex flex-col items-center rounded-md px-3.5 py-2 ${badgePills[item.tone]}`}
            >
              <span className="font-mono font-semibold text-[10px]">
                {item.label}
              </span>
              <span className="text-[10px] opacity-80">{item.sub}</span>
            </span>
          </Fragment>
        ))}
      </div>
    );
  }
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3.5 py-3 ${noteTones[block.tone]}`}
    >
      <span className="shrink-0 font-bold font-mono text-[10px]">
        {block.label}
      </span>
      <p className="min-w-0 flex-1 text-xs">{block.text}</p>
      {block.action && (
        <button
          type="button"
          className="shrink-0 rounded-md bg-card px-3 py-1.5 font-semibold text-foreground text-xs"
        >
          {block.action}
        </button>
      )}
    </div>
  );
}

function ListRow({ row }: { row: WorkbenchRow }) {
  return (
    <li className="flex items-center gap-3 border-border-subtle border-b py-2 last:border-b-0">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline gap-2">
          <span className="truncate font-semibold text-foreground text-xs">
            {row.title}
          </span>
          {row.meta && (
            <span className="shrink-0 font-mono text-[10px] text-tertiary">
              {row.meta}
            </span>
          )}
        </span>
        {row.sub && (
          <span className="truncate text-[11px] text-tertiary">{row.sub}</span>
        )}
      </span>
      {row.badge && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${badgePills[row.badgeTone]}`}
        >
          {row.badge}
        </span>
      )}
      {row.stat && (
        <span
          className={`shrink-0 font-mono font-semibold text-[11px] ${tones[row.statTone]}`}
        >
          {row.stat}
        </span>
      )}
    </li>
  );
}
