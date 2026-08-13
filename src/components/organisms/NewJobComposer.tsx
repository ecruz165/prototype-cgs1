import { useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Play,
  Plus,
  X,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { designIcon } from '@/lib/designIcons';
import type { NewJobDraft } from '@/schemas/newJob';

const microLabel = 'font-mono font-semibold text-[10px] text-muted-foreground';

// Usage-weighted tag cloud text treatments, faintest to strongest.
const tagWeights = [
  'text-[11px] font-medium text-tertiary',
  'text-[11px] font-medium text-muted-foreground',
  'text-[13px] font-semibold text-foreground',
  'text-[15px] font-semibold text-foreground',
] as const;

// The design's new-job-1 intake composer: one page carrying the whole
// journey — describe or pick a type, satisfy prerequisites, confirm the
// coordinator's routing, and start.
export function NewJobComposer({ draft }: { draft: NewJobDraft }) {
  const navigate = useNavigate();
  const [scale, setScale] = useState(draft.selectedScale);
  const [jobType, setJobType] = useState(draft.jobType);
  const [intent, setIntent] = useState('');

  const startJob = () => navigate({ to: '/jobs' });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-8 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-[32px] text-foreground">{draft.title}</h1>
        <div className="flex items-center gap-1.5">
          {draft.steps.map((step, index) => (
            <Fragment key={step}>
              {index > 0 && (
                <ChevronRight size={14} className="text-tertiary" aria-hidden />
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs ${
                  index === 0
                    ? 'bg-accent font-semibold text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step}
              </span>
            </Fragment>
          ))}
          <span className="ml-auto flex items-baseline gap-1.5">
            <span className="font-bold font-mono text-accent-foreground text-sm">
              {draft.progress.label}
            </span>
            <span className="font-mono text-[10px] text-faint">
              {draft.progress.extra}
            </span>
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent-strong"
            style={{ width: `${draft.progress.pct}%` }}
          />
        </div>
        <p className="text-[15px] text-muted-foreground">{draft.subtitle}</p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <ChipButton icon="workspaces" label={draft.product} />
          <ChipButton icon="bug_report" label={jobType} />
          <span className="flex items-center gap-1 rounded-full border border-border px-1 py-1">
            <RulerIcon />
            {draft.scales.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={s === scale}
                onClick={() => setScale(s)}
                className={`rounded-full px-2 py-0.5 font-semibold text-xs ${
                  s === scale
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-[10px] border border-border px-3 py-2.5">
          <ShieldIcon />
          <span className={microLabel}>RISK</span>
          <span className="text-[11px] text-tertiary">{draft.riskNote}</span>
          <span className="ml-auto flex gap-1.5">
            {draft.riskTraits.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] text-tertiary"
              >
                {trait}
              </span>
            ))}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-3 rounded-[10px] bg-muted px-4 py-5">
          {draft.tags.map((tag) => (
            <button
              key={tag.name}
              type="button"
              aria-pressed={tag.name === jobType}
              onClick={() => setJobType(tag.name)}
              className={`flex items-baseline gap-1 rounded-full bg-card px-2.5 py-1 transition-colors hover:text-foreground ${tagWeights[tag.weight]} ${
                tag.name === jobType ? 'ring-1 ring-accent-strong' : ''
              }`}
            >
              {tag.name}
              <span className="font-mono font-normal text-[9px] text-faint">
                {tag.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={microLabel}>PREREQUISITES</span>
          <ul className="flex flex-col rounded-xl border border-border">
            {draft.prereqs.map((prereq) => (
              <PrereqRow key={prereq.id} prereq={prereq} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={microLabel}>{draft.paraphraseLabel}</span>
          <p className="rounded-[10px] bg-muted px-3.5 py-3 text-[14px] text-foreground">
            {draft.paraphrase}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 rounded-[10px] bg-accent p-3.5">
          <span className="font-bold font-mono text-[10px] text-accent-foreground">
            • COORDINATOR
          </span>
          <p className="text-[14px] text-foreground">
            {draft.coordinator.text}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md bg-accent-strong px-3.5 py-2 font-semibold text-[13px] text-on-accent"
            >
              <Check size={15} aria-hidden />
              {draft.coordinator.accept}
            </button>
            <button
              type="button"
              className="text-accent-foreground text-xs hover:underline"
            >
              {draft.coordinator.reject}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className={microLabel}>ADDED CONTEXT</span>
            <button
              type="button"
              className="flex items-center gap-1 font-semibold text-accent-foreground text-xs"
            >
              <Plus size={13} aria-hidden />
              add
            </button>
          </div>
          <ul className="flex flex-col gap-2 rounded-[10px] border border-border p-3">
            {draft.addedContext.map((item) => {
              const Icon = designIcon(item.icon);
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon
                    size={14}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span
                    className={`min-w-0 flex-1 truncate text-xs ${
                      item.accent ? 'text-accent-foreground' : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.label}`}
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X size={13} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={microLabel}>{draft.ladderLabel}</span>
          <ul className="flex flex-col rounded-[10px] border border-border">
            {draft.ladder.map((rung) => {
              const Icon = designIcon(rung.icon);
              return (
                <li
                  key={rung.name}
                  className="flex items-center gap-3 border-border border-b px-3.5 py-2.5 last:border-b-0"
                >
                  <Icon
                    size={16}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="flex-1 font-semibold text-foreground text-sm">
                    {rung.name}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-status-active-subtle px-2 py-0.5 font-semibold font-mono text-[10px] text-status-active">
                    <BoltIcon />
                    auto
                  </span>
                </li>
              );
            })}
          </ul>
          <span className="font-mono font-semibold text-[11px] text-tertiary">
            {draft.estimate}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-accent-strong px-4 py-3">
          <button
            type="button"
            onClick={startJob}
            className="flex items-center gap-2 font-bold text-[15px] text-on-accent"
          >
            <Play size={16} aria-hidden />
            {draft.commit}
            <ChevronDown size={16} aria-hidden />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 font-medium text-[13px] text-on-accent/90 hover:text-on-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to edit
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-2 rounded-2xl border border-border bg-conversation p-4">
        <textarea
          aria-label="Describe the job"
          placeholder={draft.intentPlaceholder}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          rows={3}
          className="w-full resize-none bg-transparent text-[14px] text-foreground outline-none placeholder:text-faint"
        />
        <div className="flex flex-wrap items-center gap-2">
          {draft.attachments.map((att) => {
            const Icon = designIcon(att.icon);
            return (
              <span
                key={att.label}
                className="flex items-center gap-1.5 rounded-sm bg-muted px-2 py-1 text-[11px] text-muted-foreground"
              >
                <Icon size={12} aria-hidden />
                <span className="max-w-64 truncate">{att.label}</span>
                <button
                  type="button"
                  aria-label={`Remove ${att.label}`}
                  className="text-faint hover:text-foreground"
                >
                  <X size={11} aria-hidden />
                </button>
              </span>
            );
          })}
          <button
            type="button"
            aria-label="Add attachment"
            className="flex size-6 items-center justify-center rounded-sm bg-muted text-tertiary hover:text-foreground"
          >
            <Plus size={14} aria-hidden />
          </button>
          <button
            type="button"
            onClick={startJob}
            className="ml-auto flex items-center gap-1.5 rounded-md bg-accent-strong px-3.5 py-2 font-semibold text-on-accent text-sm"
          >
            Start
            <ArrowRight size={15} aria-hidden />
          </button>
        </div>
      </section>
    </div>
  );
}

function ChipButton({ icon, label }: { icon: string; label: string }) {
  const Icon = designIcon(icon);
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5"
    >
      <Icon size={14} className="text-accent-strong" aria-hidden />
      <span className="font-semibold text-[13px] text-foreground">{label}</span>
      <ChevronsUpDown size={13} className="text-tertiary" aria-hidden />
    </button>
  );
}

function PrereqRow({ prereq }: { prereq: NewJobDraft['prereqs'][number] }) {
  const StatusIcon = designIcon(
    prereq.status === 'carried'
      ? 'check_circle'
      : prereq.status === 'needs-you'
        ? 'radio_button_unchecked'
        : 'lightbulb',
  );
  const iconTone =
    prereq.status === 'carried'
      ? 'text-status-active'
      : prereq.status === 'needs-you'
        ? 'text-accent-strong'
        : 'text-tertiary';
  const AttachIcon = designIcon('attach_file');
  return (
    <li
      className={`flex flex-col gap-2 border-border border-b px-3 py-2.5 last:border-b-0 ${
        prereq.status === 'needs-you' ? 'bg-accent' : ''
      }`}
    >
      <div className="flex items-center gap-2.5">
        <StatusIcon size={16} className={`shrink-0 ${iconTone}`} aria-hidden />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-semibold text-[13px] text-foreground">
            {prereq.name}
          </span>
          <span className="text-[11px] text-tertiary">{prereq.sub}</span>
        </span>
        <span
          className={`shrink-0 font-mono text-[9px] ${
            prereq.requirement === 'required'
              ? 'font-semibold text-muted-foreground'
              : 'text-faint'
          }`}
        >
          {prereq.requirement}
        </span>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-mono font-semibold text-[9px] ${
            prereq.status === 'needs-you'
              ? 'bg-card text-accent-foreground'
              : prereq.status === 'inferred'
                ? 'bg-muted text-faint'
                : 'bg-muted text-muted-foreground'
          }`}
        >
          {prereq.status}
        </span>
      </div>
      {prereq.placeholder && (
        <div className="flex items-center gap-2 rounded-md bg-card px-3 py-2">
          <input
            aria-label={prereq.name}
            placeholder={prereq.placeholder}
            className="w-full bg-transparent text-foreground text-xs outline-none placeholder:text-faint"
          />
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 font-semibold text-[10px] text-accent-foreground"
          >
            <AttachIcon size={12} aria-hidden />
            attach
          </button>
        </div>
      )}
    </li>
  );
}

const RulerIcon = () => {
  const Icon = designIcon('straighten');
  return <Icon size={13} className="ml-1 text-accent-strong" aria-hidden />;
};
const ShieldIcon = () => {
  const Icon = designIcon('shield');
  return <Icon size={14} className="text-faint" aria-hidden />;
};
const BoltIcon = () => {
  const Icon = designIcon('bolt');
  return <Icon size={11} aria-hidden />;
};
