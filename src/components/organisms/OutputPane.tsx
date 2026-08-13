import { Ticket } from 'lucide-react';
import { PaneWindow } from '@/components/molecules/PaneWindow';
import { designIcon } from '@/lib/designIcons';
import type { JobOutput, OutputFile } from '@/schemas/output';

const changeTones: Record<OutputFile['change'], string> = {
  modified: 'text-status-warning',
  added: 'text-status-active',
  removed: 'text-status-danger',
};

const changeIcons: Record<OutputFile['change'], string> = {
  modified: 'change_circle',
  added: 'add_circle',
  removed: 'remove_circle',
};

interface OutputPaneProps {
  output: JobOutput;
  selectedId: string | undefined;
  onSelect: (fileId: string) => void;
}

// The design's pane-output: CHANGES BY TASK groups (commit-tagged, files
// indented beneath) and the non-code ARTIFACTS list.
export function OutputPane({ output, selectedId, onSelect }: OutputPaneProps) {
  const fileCount = output.tasks.reduce((n, t) => n + t.files.length, 0);
  const CommitIcon = designIcon('commit');
  const DownloadIcon = designIcon('download');

  return (
    <div className="flex flex-col gap-3.5">
      <span className="font-mono font-semibold text-[10px] text-tertiary">
        OUTPUT
      </span>
      <span className="flex items-center gap-[5px]">
        <Ticket size={12} className="text-tertiary" aria-hidden />
        <span className="font-mono text-[10px] text-tertiary">
          {output.ticket} · {output.flow}
        </span>
      </span>

      <PaneWindow
        label="CHANGES BY TASK"
        count={
          <span className="font-mono text-[10px] text-tertiary">
            {fileCount} files · {output.tasks.length} tasks
          </span>
        }
      >
        <div className="flex gap-2 px-3 py-2">
          {output.scope.map((chip) => {
            const Icon = designIcon(chip.icon);
            return (
              <span
                key={chip.label}
                className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-[3px]"
              >
                <Icon size={14} className="text-accent-strong" aria-hidden />
                <span className="font-mono font-semibold text-[11px] text-muted-foreground">
                  {chip.label}
                </span>
              </span>
            );
          })}
        </div>
        <div className="flex flex-col gap-2.5 px-1.5 pb-2">
          {output.tasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 rounded-[4px] px-1 py-1.5">
                <span className="min-w-0 truncate font-semibold text-foreground text-xs">
                  {task.title}
                </span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-accent-foreground">
                  <CommitIcon size={12} aria-hidden />
                  {task.commit}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-tertiary">
                  {task.files.length}{' '}
                  {task.files.length === 1 ? 'file' : 'files'}
                </span>
              </div>
              <ul className="flex flex-col gap-0.5 pr-1 pl-4">
                {task.files.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    selected={file.id === selectedId}
                    onSelect={() => onSelect(file.id)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PaneWindow>

      <PaneWindow
        label="ARTIFACTS"
        count={
          <span className="font-mono text-[10px] text-tertiary">
            {output.artifacts.length} · non-code
          </span>
        }
      >
        <ul className="flex flex-col gap-0.5 p-1.5">
          {output.artifacts.map((artifact) => {
            const Icon = designIcon(artifact.icon);
            return (
              <li
                key={artifact.name}
                className="flex items-center gap-2 rounded-[4px] px-2 py-1.5"
              >
                <Icon
                  size={15}
                  className="shrink-0 text-tertiary"
                  aria-hidden
                />
                <span className="flex min-w-0 flex-1 items-baseline gap-2">
                  <span className="truncate font-mono text-foreground text-xs">
                    {artifact.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-tertiary">
                    {artifact.sub}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={`Download ${artifact.name}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <DownloadIcon size={14} aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      </PaneWindow>
    </div>
  );
}

function FileRow({
  file,
  selected,
  onSelect,
}: {
  file: OutputFile;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = designIcon(changeIcons[file.change]);
  return (
    <li>
      <button
        type="button"
        aria-current={selected || undefined}
        onClick={onSelect}
        className={`flex w-full items-center gap-2 rounded-[4px] border px-2 py-1.5 text-left transition-colors ${
          selected
            ? 'border-accent-strong bg-accent'
            : 'border-transparent hover:bg-muted'
        }`}
      >
        <Icon
          size={14}
          className={`shrink-0 ${changeTones[file.change]}`}
          aria-hidden
        />
        <span className="min-w-0 flex-1 truncate font-mono text-foreground text-xs">
          {file.name}
        </span>
        {file.added !== null && (
          <span className="shrink-0 font-mono text-[11px] text-status-active">
            +{file.added}
          </span>
        )}
        {file.removed !== null && (
          <span className="shrink-0 font-mono text-[11px] text-status-danger">
            −{file.removed}
          </span>
        )}
      </button>
    </li>
  );
}
