function PublicLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span
        className="inline-flex h-8 w-8 animate-spin items-center justify-center rounded-full border-2 border-pomegranate/30 border-t-pomegranate"
        aria-hidden
      />
    </div>
  );
}

export default PublicLoading;
