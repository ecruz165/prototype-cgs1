interface PagePlaceholderProps {
  title: string;
}

// Stub body for routes whose screens haven't been built from the design yet.
export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="rounded-lg border border-border border-dashed bg-card px-10 py-8 text-center">
        <h1 className="font-semibold text-foreground text-lg">{title}</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Screen not built yet
        </p>
      </div>
    </main>
  );
}
