import { ArrowRight, Check } from 'lucide-react';
import { Fragment, useState } from 'react';
import { designIcon } from '@/lib/designIcons';
import type { PlanData } from '@/schemas/plan';

const tones = {
  default: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  warning: 'text-status-warning',
  active: 'text-status-active',
  danger: 'text-status-danger',
  muted: 'text-faint',
} as const;

const pills = {
  default: 'bg-muted text-muted-foreground',
  accent: 'bg-accent text-accent-foreground',
  warning: 'bg-status-warning-subtle text-status-warning',
  active: 'bg-status-badge-bg text-status-badge-text',
  danger: 'bg-status-danger-subtle text-status-danger',
  muted: 'bg-muted text-faint',
} as const;

const dots = {
  default: 'bg-muted-foreground',
  accent: 'bg-accent-strong',
  warning: 'bg-status-warning',
  active: 'bg-status-active',
  danger: 'bg-status-danger',
  muted: 'bg-faint',
} as const;

type Tone = keyof typeof tones;

const views = [
  'Discovery',
  'PRDs',
  'Roadmap',
  'Decompose',
  'Readiness',
  'Dependencies',
] as const;
type View = (typeof views)[number];

// The design's workspace-plan screens, built per-view from their structural
// reads (workspace-plan-1..6).
export function PlanPage({ plan }: { plan: PlanData }) {
  const [view, setView] = useState<View>('Discovery');
  const subtitle = {
    Discovery: plan.discovery.subtitle,
    PRDs: plan.prds.subtitle,
    Roadmap: plan.roadmap.subtitle,
    Decompose: plan.decompose.subtitle,
    Readiness: plan.readiness.subtitle,
    Dependencies: plan.dependencies.subtitle,
  }[view];

  return (
    <main className="flex w-full flex-col">
      <header className="flex items-end justify-between gap-4 px-7 pt-6 pb-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-bold text-[26px] text-foreground">
            {plan.title}
          </h1>
          <p className="truncate text-muted-foreground text-xs">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex items-center gap-0.5 rounded-md bg-muted p-[3px]">
            {plan.altitudes.map((alt) => (
              <button
                key={alt}
                type="button"
                aria-pressed={alt === plan.altitude}
                className={`rounded-sm px-3 py-1 text-[13px] ${
                  alt === plan.altitude
                    ? 'bg-card font-semibold text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {alt}
              </button>
            ))}
          </div>
          <span className="rounded-md bg-muted px-3 py-1.5 text-[13px] text-muted-foreground">
            {plan.scope}
          </span>
        </div>
      </header>

      <nav aria-label="Plan views" className="flex gap-1 px-7 pb-1">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === view}
            onClick={() => setView(v)}
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              v === view
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {v}
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-4 px-7 pt-4 pb-6">
        {view === 'Discovery' && <Discovery plan={plan} />}
        {view === 'PRDs' && <Prds plan={plan} />}
        {view === 'Roadmap' && <Roadmap plan={plan} />}
        {view === 'Decompose' && <Decompose plan={plan} />}
        {view === 'Readiness' && <Readiness plan={plan} />}
        {view === 'Dependencies' && <Dependencies plan={plan} />}
      </div>
    </main>
  );
}

function StatRow({
  stats,
}: {
  stats: { label: string; value: string; sub: string | null }[];
}) {
  return (
    <div className="flex gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-1 flex-col gap-1.5 rounded-xl border border-border bg-card px-[18px] py-[15px]"
        >
          <span className="font-mono font-semibold text-[10px] text-tertiary">
            {s.label}
          </span>
          <span className="font-bold text-[28px] text-foreground leading-none">
            {s.value}
          </span>
          {s.sub && <span className="text-[10px] text-tertiary">{s.sub}</span>}
        </div>
      ))}
    </div>
  );
}

function Win({
  label,
  sub,
  right,
  children,
}: {
  label: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3.5 rounded-xl border border-border bg-card p-[18px]">
      <div className="flex items-center gap-2.5">
        <span className="font-mono font-semibold text-[11px] text-foreground">
          {label}
        </span>
        {sub && <span className="text-[11px] text-tertiary">{sub}</span>}
        {right && <span className="ml-auto">{right}</span>}
      </div>
      {children}
    </section>
  );
}

function Legend({ items }: { items: { label: string; tone: Tone }[] }) {
  return (
    <span className="flex items-center gap-3.5">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            className={`size-2 rounded-full ${dots[item.tone]}`}
            aria-hidden
          />
          <span className="text-[10px] text-tertiary">{item.label}</span>
        </span>
      ))}
    </span>
  );
}

function Pipeline({
  stages,
}: {
  stages: { label: string; sub: string; tone: Tone }[];
}) {
  return (
    <div className="flex w-full items-start">
      {stages.map((stage, index) => (
        <Fragment key={stage.label}>
          {index > 0 && (
            <span aria-hidden className="mt-4 h-0.5 min-w-6 flex-1 bg-border" />
          )}
          <span className="flex flex-col items-center gap-1.5 px-2">
            <span
              className={`flex h-8 min-w-[42px] items-center justify-center rounded-full px-2.5 font-bold font-mono text-[9px] ${pills[stage.tone]}`}
            >
              {stage.label}
            </span>
            <span className="whitespace-nowrap text-[10px] text-tertiary">
              {stage.sub}
            </span>
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function OqBar({
  oq,
}: {
  oq: { label: string; text: string; action: string };
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-[10px] bg-status-warning-subtle px-4 py-3">
      <span className="shrink-0 font-bold font-mono text-[10px] text-status-warning">
        {oq.label}
      </span>
      <p className="min-w-0 flex-1 text-status-warning text-xs">{oq.text}</p>
      <button
        type="button"
        className="shrink-0 rounded-[7px] bg-card px-3.5 py-2 font-semibold text-foreground text-xs"
      >
        {oq.action}
      </button>
    </div>
  );
}

function Discovery({ plan }: { plan: PlanData }) {
  const d = plan.discovery;
  return (
    <>
      <StatRow stats={d.stats} />
      <Win label={d.launcher.label} sub={d.launcher.sub}>
        <div className="flex gap-3">
          {d.launcher.tiles.map((tile) => {
            const Icon = designIcon(tile.icon);
            return (
              <div
                key={tile.title}
                className="flex flex-1 flex-col gap-3 rounded-[10px] bg-muted p-4"
              >
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent">
                  <Icon
                    size={18}
                    className="text-accent-foreground"
                    aria-hidden
                  />
                </span>
                <span className="font-semibold text-[15px] text-foreground">
                  {tile.title}
                </span>
                <span className="flex-1 text-muted-foreground text-xs">
                  {tile.desc}
                </span>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3.5 py-[9px] font-semibold text-accent-foreground text-xs"
                >
                  {tile.action}
                  <ArrowRight size={13} aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      </Win>
      <Win label={d.running.label} sub={d.running.sub}>
        <div className="flex flex-col gap-2.5">
          {d.running.jobs.map((job) => (
            <div
              key={job.title}
              className="flex flex-col gap-2 rounded-lg bg-muted px-3.5 py-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-baseline gap-2">
                  <span className="font-semibold text-[13px] text-foreground">
                    {job.title}
                  </span>
                  <span className="font-mono text-[9px] text-tertiary">
                    {job.kind}
                  </span>
                </span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-[5px] font-semibold text-[11px] ${pills[job.statusTone]}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${dots[job.statusTone]}`}
                    aria-hidden
                  />
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
                  <div
                    className="h-full rounded-full bg-accent-strong"
                    style={{ width: `${job.pct}%` }}
                  />
                </div>
                <span className="font-mono font-semibold text-[11px] text-accent-foreground">
                  {job.pct > 0 ? `${job.pct}%` : 'queued'}
                </span>
              </div>
              <span className="text-[10px] text-tertiary">{job.detail}</span>
            </div>
          ))}
        </div>
      </Win>
      <Win label={d.repository.label} sub={d.repository.sub}>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-border-subtle border-b px-3 py-2">
            {['ARTIFACT', 'TYPE', 'STATE', 'INFORMS', 'UPDATED'].map((h, i) => (
              <span
                key={h}
                className={`font-mono font-semibold text-[10px] text-tertiary ${
                  [
                    'w-[300px]',
                    'w-[140px]',
                    'w-[120px]',
                    'w-[240px]',
                    'flex-1',
                  ][i]
                }`}
              >
                {h}
              </span>
            ))}
          </div>
          {d.repository.rows.map((row) => (
            <div
              key={row.artifact}
              className="flex items-center gap-2.5 border-border-subtle border-b px-3 py-[11px] last:border-b-0"
            >
              <span className="flex w-[300px] flex-col">
                <span className="font-semibold text-foreground text-xs">
                  {row.artifact}
                </span>
                <span className="text-[10px] text-tertiary">{row.desc}</span>
              </span>
              <span className="w-[140px] text-muted-foreground text-xs">
                {row.type}
              </span>
              <span className="w-[120px]">
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold text-[10px] ${pills[row.stateTone]}`}
                >
                  {row.state}
                </span>
              </span>
              <span className="w-[240px] text-muted-foreground text-xs">
                {row.informs}
              </span>
              <span className="flex-1 text-[11px] text-tertiary">
                {row.updated}
              </span>
            </div>
          ))}
        </div>
      </Win>
    </>
  );
}

function Prds({ plan }: { plan: PlanData }) {
  const p = plan.prds;
  return (
    <>
      <StatRow stats={p.stats} />
      <Win label={p.lifecycle.label} sub={p.lifecycle.sub}>
        <Pipeline stages={p.lifecycle.stages} />
      </Win>
      <Win label={p.library.label} sub={p.library.sub}>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-border-subtle border-b px-3 py-2">
            {['PRD', 'FEATURE', 'STATE', 'OWNER', 'ROADMAP ↑', 'TRACE ↓'].map(
              (h, i) => (
                <span
                  key={h}
                  className={`font-mono font-semibold text-[10px] text-tertiary ${
                    [
                      'w-[240px]',
                      'w-[140px]',
                      'w-[125px]',
                      'w-[160px]',
                      'w-[150px]',
                      'flex-1',
                    ][i]
                  }`}
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {p.library.rows.map((row) => (
            <div
              key={row.prd}
              className="flex items-center gap-2.5 border-border-subtle border-b px-3 py-[11px] last:border-b-0"
            >
              <span className="flex w-[240px] flex-col">
                <span className="font-semibold text-foreground text-xs">
                  {row.prd}
                </span>
                <span className="font-mono text-[10px] text-tertiary">
                  {row.id}
                </span>
              </span>
              <span className="w-[140px] text-muted-foreground text-xs">
                {row.feature}
              </span>
              <span className="w-[125px]">
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold text-[10px] ${pills[row.stateTone]}`}
                >
                  {row.state}
                </span>
              </span>
              <span className="w-[160px] font-mono text-[10px] text-tertiary">
                {row.owner}
              </span>
              <span className="w-[150px] text-muted-foreground text-xs">
                {row.roadmap}
              </span>
              <span className="flex-1 font-mono text-[10px] text-tertiary">
                {row.trace}
              </span>
            </div>
          ))}
        </div>
      </Win>
      <Win
        label={p.focus.label}
        right={
          <span className="rounded-full bg-muted px-3 py-1.5 text-[11px] text-muted-foreground">
            {p.focus.roadmapChip}
          </span>
        }
      >
        <div className="flex items-baseline gap-2.5 border-border-subtle border-b pb-3">
          <span className="font-bold text-base text-foreground">
            {p.focus.title}
          </span>
          {p.focus.pills.map((pill) => (
            <span
              key={pill.label}
              className={`rounded-full px-2 py-0.5 font-semibold text-[10px] ${pills[pill.tone]}`}
            >
              {pill.label}
            </span>
          ))}
          <span className="font-mono text-[11px] text-tertiary">
            {p.focus.meta}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <span className="font-mono font-semibold text-[10px] text-tertiary">
              {p.focus.sectionsLabel}
            </span>
            {p.focus.sections.map((section) => (
              <div
                key={section.num}
                className="flex items-center justify-between rounded-lg bg-muted px-[13px] py-[11px]"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono font-semibold text-[10px] text-accent-foreground">
                    {section.num}
                  </span>
                  <span className="font-medium text-foreground text-xs">
                    {section.name}
                  </span>
                </span>
                <span
                  className={`font-semibold text-[10px] ${tones[section.stateTone]}`}
                >
                  {section.state}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="font-mono font-semibold text-[10px] text-tertiary">
              {p.focus.jobsLabel}
            </span>
            {p.focus.jobs.map((job) => (
              <div
                key={job.name}
                className="flex flex-col gap-1.5 rounded-lg bg-muted px-[13px] py-[11px]"
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground text-xs">
                      {job.name}
                    </span>
                    <span className="font-mono text-[10px] text-tertiary">
                      {job.id}
                    </span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold text-[9px] ${pills[job.stateTone]}`}
                  >
                    {job.state}
                  </span>
                </span>
                <span className="text-[10px] text-tertiary">{job.note}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="font-mono font-semibold text-[10px] text-tertiary">
              {p.focus.sourcesLabel}
            </span>
            {p.focus.sources.map((source) => (
              <div
                key={source.name}
                className="flex items-center gap-2.5 rounded-lg bg-muted px-[13px] py-[10px]"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-foreground text-xs">
                    {source.name}
                  </span>
                  <span className="truncate text-[10px] text-tertiary">
                    {source.desc}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-card px-2 py-0.5 font-mono text-[9px] text-tertiary">
                  {source.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Win>
      <div className="flex items-center gap-3.5 rounded-[10px] bg-accent px-4 py-[13px]">
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-bold font-mono text-[10px] text-accent-foreground">
            {p.publish.title}
          </span>
          <span className="text-foreground text-xs">{p.publish.text}</span>
        </span>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-[7px] bg-accent-strong px-4 py-[9px] font-semibold text-on-accent text-xs"
        >
          <Check size={14} aria-hidden />
          {p.publish.action}
        </button>
      </div>
    </>
  );
}

function Roadmap({ plan }: { plan: PlanData }) {
  const r = plan.roadmap;
  return (
    <>
      <StatRow stats={r.stats} />
      <Win
        label={r.board.label}
        sub={r.board.sub}
        right={<Legend items={r.board.legend} />}
      >
        <div className="flex flex-col">
          <div className="flex border-border-subtle border-b pb-2">
            <span className="w-44 font-mono font-semibold text-[10px] text-tertiary">
              CAPABILITY
            </span>
            {r.board.quarters.map((q) => (
              <span
                key={q}
                className="flex-1 text-center font-mono font-semibold text-[10px] text-tertiary"
              >
                {q}
              </span>
            ))}
          </div>
          {r.board.rows.map((row) => (
            <div
              key={row.capability}
              className="flex items-center border-border-subtle border-b py-2 last:border-b-0"
            >
              <span className="w-44 font-semibold text-foreground text-xs">
                {row.capability}
              </span>
              {r.board.quarters.map((q, quarterIndex) => {
                const chip = row.chips.find((c) => c.quarter === quarterIndex);
                return (
                  <span key={q} className="flex flex-1 justify-center px-1">
                    {chip && (
                      <span
                        className={`flex w-full max-w-44 flex-col rounded-md px-2.5 py-1.5 ${pills[chip.tone]}`}
                      >
                        <span className="truncate font-semibold text-[11px]">
                          {chip.label}
                        </span>
                        <span className="truncate text-[9px] opacity-80">
                          {chip.sub}
                        </span>
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </Win>
      <OqBar oq={r.oq} />
    </>
  );
}

function Decompose({ plan }: { plan: PlanData }) {
  const d = plan.decompose;
  return (
    <>
      <StatRow stats={d.stats} />
      <Win label={d.action.title} sub={d.action.id}>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-0.5 font-semibold text-[10px] ${pills.active}`}
          >
            {d.action.state}
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground text-xs"
          >
            {d.action.button}
            <ArrowRight size={13} aria-hidden />
          </button>
        </div>
        <Pipeline stages={d.action.stages} />
      </Win>
      <Win label={d.forecast.label} sub={d.forecast.sub}>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-border-subtle border-b px-3 py-2">
            {['STORY', 'EPIC', 'TRACE', 'DEDUP', 'JIRA PUSH', 'SCALE'].map(
              (h, i) => (
                <span
                  key={h}
                  className={`font-mono font-semibold text-[10px] text-tertiary ${
                    [
                      'w-[240px]',
                      'w-[110px]',
                      'w-[100px]',
                      'w-[150px]',
                      'w-[110px]',
                      'flex-1',
                    ][i]
                  }`}
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {d.forecast.rows.map((row) => (
            <div
              key={row.story}
              className="flex items-center gap-2.5 border-border-subtle border-b px-3 py-[11px] last:border-b-0"
            >
              <span className="w-[240px] font-semibold text-foreground text-xs">
                {row.story}
              </span>
              <span className="w-[110px] text-muted-foreground text-xs">
                {row.epic}
              </span>
              <span className="w-[100px] font-mono text-[10px] text-tertiary">
                {row.trace}
              </span>
              <span
                className={`w-[150px] font-semibold text-[11px] ${tones[row.dedupTone]}`}
              >
                {row.dedup}
              </span>
              <span
                className={`w-[110px] font-mono font-semibold text-[11px] ${tones[row.jiraTone]}`}
              >
                {row.jira}
              </span>
              <span className="flex-1">
                <span className="rounded-full bg-muted px-2 py-0.5 font-bold font-mono text-[10px] text-muted-foreground">
                  {row.scale}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Win>
      <div className="flex gap-4">
        <Win label={d.awaiting.label} sub={d.awaiting.sub}>
          <div className="flex flex-col gap-2">
            {d.awaiting.rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5"
              >
                <span className="font-semibold text-foreground text-xs">
                  {row.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${pills[row.tone]}`}
                >
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </Win>
        <Win label={d.dedup.label} sub={d.dedup.sub}>
          <div className="flex flex-col gap-2">
            {d.dedup.rows.map((row) => (
              <div
                key={row.name}
                className="flex flex-col gap-1 rounded-lg bg-muted px-3 py-2.5"
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground text-xs">
                      {row.name}
                    </span>
                    <span className="font-mono text-[10px] text-accent-foreground">
                      {row.link}
                    </span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${pills[row.verdictTone]}`}
                  >
                    {row.verdict}
                  </span>
                </span>
                <span className="text-[10px] text-tertiary">{row.note}</span>
              </div>
            ))}
          </div>
        </Win>
      </div>
      <OqBar oq={d.oq} />
    </>
  );
}

function Readiness({ plan }: { plan: PlanData }) {
  const r = plan.readiness;
  return (
    <>
      <Win label={r.board.label} sub={r.board.sub}>
        <div className="flex gap-3">
          {r.board.lanes.map((lane) => (
            <div
              key={lane.name}
              className="flex flex-1 flex-col gap-2.5 rounded-lg bg-muted p-3"
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-xs ${tones[lane.tone]}`}>
                  {lane.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-bold font-mono text-[10px] ${pills[lane.tone]}`}
                >
                  {lane.count}
                </span>
              </div>
              {lane.features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col gap-1.5 rounded-md bg-card px-2.5 py-2"
                >
                  <span className="font-semibold text-foreground text-xs">
                    {feature.name}
                  </span>
                  <span className="flex gap-1.5">
                    {feature.checks.map((check) => (
                      <span
                        key={check.label}
                        className={`flex items-center gap-1 rounded-full px-1.5 py-px font-mono text-[9px] ${
                          check.done
                            ? 'bg-status-badge-bg text-status-badge-text'
                            : 'bg-muted text-faint'
                        }`}
                      >
                        {check.done ? '✓' : '—'} {check.label}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Win>
      <div className="flex gap-4">
        <Win label={r.sme.label} sub={r.sme.sub}>
          <div className="flex items-center gap-3">
            <span className="font-bold text-3xl text-status-warning">
              {r.sme.headline}
            </span>
            <span className="min-w-0 flex-1 text-[11px] text-tertiary">
              {r.sme.headlineSub}
            </span>
            <span className="flex shrink-0 gap-1.5">
              {r.sme.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {r.sme.rows.map((row) => (
              <div
                key={row.question}
                className="flex items-center gap-2.5 rounded-lg bg-muted px-3 py-2.5"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-foreground text-xs">
                    {row.question}
                  </span>
                  <span className="text-[10px] text-tertiary">
                    from {row.from} · {row.sme}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${pills[row.tagTone]}`}
                >
                  {row.tag}
                </span>
                <span className="shrink-0 font-mono font-semibold text-[11px] text-status-warning">
                  {row.wait}
                </span>
              </div>
            ))}
          </div>
        </Win>
        <Win label={r.forecast.label} sub={r.forecast.sub}>
          <div className="flex items-baseline justify-between">
            <span className="font-semibold text-foreground text-xs">
              {r.forecast.context}
            </span>
            <span className="text-[10px] text-tertiary">
              {r.forecast.contextSub}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono font-semibold text-[9px] text-tertiary">
              AUTONOMY MIX
            </span>
            {r.forecast.autonomy.map((row) => (
              <div key={row.label} className="flex items-center gap-2.5">
                <span className="w-20 text-[11px] text-muted-foreground">
                  {row.label}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent-strong"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-16 text-right font-mono font-semibold text-[10px] text-foreground">
                  {row.value}
                </span>
              </div>
            ))}
            <span className="rounded-lg bg-status-warning-subtle px-2.5 py-2 font-semibold text-[10px] text-status-warning">
              {r.forecast.needsYou}
            </span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono font-semibold text-[9px] text-tertiary">
              MODEL SPEND · est
            </span>
            {r.forecast.spend.map((s) => (
              <span key={s.label} className="flex items-baseline gap-1">
                <span className="text-[10px] text-tertiary">{s.label}</span>
                <span className="font-bold font-mono text-foreground text-xs">
                  {s.value}
                </span>
              </span>
            ))}
          </div>
          <span className="text-[10px] text-tertiary">
            {r.forecast.spendNote}
          </span>
          <div className="flex items-baseline gap-4">
            <span className="font-mono font-semibold text-[9px] text-tertiary">
              RISK
            </span>
            {r.forecast.risk.map((s) => (
              <span key={s.label} className="flex items-baseline gap-1">
                <span className="font-bold font-mono text-foreground text-xs">
                  {s.value}
                </span>
                <span className="text-[10px] text-tertiary">{s.label}</span>
              </span>
            ))}
          </div>
        </Win>
      </div>
      <div className="flex gap-4">
        <Win label={r.defjobs.label} sub={r.defjobs.sub}>
          <div className="flex flex-col gap-3">
            {r.defjobs.groups.map((group) => (
              <div key={group.name} className="flex flex-col gap-2">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono font-semibold text-[9px] text-tertiary">
                    {group.name}
                  </span>
                  <span className="font-bold font-mono text-[11px] text-foreground">
                    {group.count}
                  </span>
                </span>
                {group.rows.map((row) => (
                  <div
                    key={row.job + row.feature}
                    className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2"
                  >
                    <span className="min-w-0 flex-1 truncate text-xs">
                      <span className="font-semibold text-foreground">
                        {row.job}
                      </span>
                      <span className="text-tertiary"> · {row.feature}</span>
                    </span>
                    <span className="shrink-0 text-[10px] text-tertiary">
                      {row.state}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${pills[row.tagTone]}`}
                    >
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Win>
        <Win label={r.awaitspec.label} sub={r.awaitspec.sub}>
          <div className="flex items-center gap-3">
            <span className="min-w-0 flex-1 font-semibold text-foreground text-xs">
              {r.awaitspec.headline}
            </span>
            <span className="flex shrink-0 gap-1.5">
              {r.awaitspec.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {r.awaitspec.rows.map((row) => (
              <div
                key={row.story}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 ${
                  row.tone === 'danger' ? 'bg-status-danger-subtle' : 'bg-muted'
                }`}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground text-xs">
                      {row.story}
                    </span>
                    <span className="text-[10px] text-tertiary">{row.gap}</span>
                  </span>
                  <span
                    className={`text-[10px] ${
                      row.tone === 'danger'
                        ? 'text-status-danger'
                        : 'text-accent-foreground'
                    }`}
                  >
                    {row.clearedBy}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Win>
      </div>
    </>
  );
}

function Dependencies({ plan }: { plan: PlanData }) {
  const d = plan.dependencies;
  return (
    <>
      <StatRow stats={d.stats} />
      <Win
        label={d.graph.label}
        sub={d.graph.sub}
        right={<Legend items={d.graph.legend} />}
      >
        <div className="flex flex-col gap-2.5">
          {d.graph.lanes.map((lane, index) => (
            <Fragment key={lane.name}>
              {index === 1 && (
                <div className="rounded-lg bg-accent px-3 py-2 text-[11px] text-accent-foreground">
                  {d.graph.crossedge}
                </div>
              )}
              <div
                className={`flex flex-col gap-2.5 rounded-[10px] p-3 ${
                  lane.accent
                    ? 'bg-accent'
                    : 'bg-conversation border border-border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-[10px] text-foreground">
                    {lane.name}
                  </span>
                  {lane.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`rounded-full px-2 py-0.5 font-bold font-mono text-[9px] ${pills[badge.tone]}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  {lane.nodes.map((node, nodeIndex) => (
                    <Fragment key={node.name}>
                      {nodeIndex > 0 && (
                        <span
                          className="mx-1.5 shrink-0 text-faint text-xs"
                          aria-hidden
                        >
                          →
                        </span>
                      )}
                      <span className="flex min-w-0 flex-1 flex-col rounded-md border border-border bg-card px-2.5 py-2">
                        <span className="truncate font-semibold text-[11px] text-foreground">
                          {node.name}
                        </span>
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="truncate font-mono text-[9px] text-tertiary">
                            {node.meta}
                          </span>
                          <span
                            className={`shrink-0 font-semibold text-[9px] ${tones[node.tone]}`}
                          >
                            {node.state}
                          </span>
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </Win>
      <Win
        label={d.priority.label}
        sub={d.priority.sub}
        right={
          <button
            type="button"
            className="rounded-lg bg-muted px-3.5 py-2 font-semibold text-foreground text-xs"
          >
            {d.priority.button}
          </button>
        }
      >
        <div className="flex flex-col">
          {d.priority.rows.map((row) => (
            <div
              key={row.rank}
              className="flex items-center gap-3 border-border-subtle border-b px-3 py-2 last:border-b-0"
            >
              <span className="w-5 font-bold font-mono text-muted-foreground text-xs">
                {row.rank}
              </span>
              <span className="flex min-w-0 flex-1 items-baseline gap-2">
                <span className="font-semibold text-foreground text-xs">
                  {row.story}
                </span>
                <span className="text-[10px] text-tertiary">{row.feature}</span>
              </span>
              {row.critical && (
                <span className="shrink-0 rounded-full bg-status-danger-subtle px-2 py-0.5 font-bold font-mono text-[9px] text-status-danger">
                  critical
                </span>
              )}
              <span
                className={`w-16 shrink-0 font-semibold text-[11px] ${tones[row.stateTone]}`}
              >
                {row.state}
              </span>
              <span className="w-24 shrink-0 text-right text-[10px] text-tertiary">
                {row.downstream}
              </span>
            </div>
          ))}
          <span className="px-3 pt-2 text-[10px] text-faint">
            {d.priority.more}
          </span>
        </div>
      </Win>
      <Win label={d.tracking.label} sub={d.tracking.sub}>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-border-subtle border-b px-3 py-2">
            {d.tracking.columns.map((col, i) => (
              <span
                key={col}
                className={`font-mono font-semibold text-[10px] text-tertiary ${
                  i === 0 ? 'w-[220px]' : 'flex-1'
                }`}
              >
                {col}
              </span>
            ))}
          </div>
          {d.tracking.rows.map((row) => (
            <div
              key={row[0]}
              className="flex items-center gap-2.5 border-border-subtle border-b px-3 py-[9px] last:border-b-0"
            >
              {row.map((cell, i) => (
                <span
                  key={`${i}-${cell}`}
                  className={
                    i === 0
                      ? 'w-[220px] font-semibold text-foreground text-xs'
                      : 'flex-1 text-muted-foreground text-xs'
                  }
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
          <div className="mt-2 rounded-lg bg-muted px-3 py-2 text-[10px] text-tertiary">
            {d.tracking.foot}
          </div>
        </div>
      </Win>
    </>
  );
}
