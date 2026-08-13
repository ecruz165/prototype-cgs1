interface SegmentedControlProps<T extends string> {
  ariaLabel: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

// The design's Segment pattern: inset track, surface-filled active segment,
// mono labels.
export function SegmentedControl<T extends string>({
  ariaLabel,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex items-center gap-0.5 rounded-md bg-muted p-[3px]"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
            option.value === value
              ? 'bg-card font-semibold text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
