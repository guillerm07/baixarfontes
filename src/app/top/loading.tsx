export default function TopLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-56 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-64 mb-8" />

      <div className="grid gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
          >
            <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0" />
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
