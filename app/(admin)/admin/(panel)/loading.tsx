function AdminLoading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center bg-parchment-200/30">
      <span
        className="inline-flex h-8 w-8 animate-spin items-center justify-center rounded-full border-2 border-pomegranate/30 border-t-pomegranate"
        aria-hidden
      />
    </div>
  );
}

export default AdminLoading;
