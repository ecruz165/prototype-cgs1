const sizes = {
  sm: 'size-[30px] text-[11px]',
  md: 'size-8 text-xs',
} as const;

// Design note: the .pen binds initials to $text-primary, which is
// near-black on the navy brand fill in light mode; white works on both
// modes' brand values (same correction as Button/Brand).
export function Avatar({
  initials,
  size = 'md',
}: {
  initials: string;
  size?: keyof typeof sizes;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}
