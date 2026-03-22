export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero skeleton */}
      <div className="bg-gray-100 rounded-2xl h-64 mb-12 animate-pulse" />

      {/* Section title */}
      <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse" />

      {/* Font cards skeleton */}
      <div className="grid gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 animate-pulse"
          >
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
              <div className="h-10 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-24" />
            </div>
            <div className="h-9 bg-gray-200 rounded-lg w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
