function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-3 text-ink-muted">
        <span
          className="inline-flex h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-pomegranate/30 border-t-pomegranate"
          aria-hidden
        />
        <p className="text-xs uppercase tracking-eyebrow">Loading…</p>
      </div>
    </div>
  );
}

export default RootLoading;
