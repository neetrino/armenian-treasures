function AdminLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16">
      <span
        className="inline-flex h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-pomegranate/25 border-t-pomegranate"
        aria-hidden
      />
      <div className="h-2 w-40 overflow-hidden rounded-full bg-stone-200/80">
        <div
          className="h-full w-full animate-admin-shimmer rounded-full bg-gradient-to-r from-transparent via-bronze-400/60 to-transparent"
          style={{ backgroundSize: '200% 100%' }}
          aria-hidden
        />
      </div>
      <p className="text-sm text-ink-muted motion-safe:animate-admin-fade-in">Loading admin…</p>
    </div>
  );
}

export default AdminLoading;
