export default function CategoryLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-56 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-80 mb-8" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-24">
            <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
