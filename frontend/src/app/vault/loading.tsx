export default function Loading() {
  return (
    <div className="p-6 md:p-8 space-y-6 w-full max-w-7xl mx-auto">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-white/[0.06] rounded-xl w-40 skeleton-shimmer" />
        <div className="h-4 bg-white/[0.04] rounded-lg w-72 skeleton-shimmer" />
      </div>

      {/* Vault Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 skeleton-shimmer"
          />
        ))}
      </div>
    </div>
  );
}

