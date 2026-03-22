export default function FontLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-3 bg-gray-200 rounded w-64 mb-6" />

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-32 mb-6" />

          {/* Preview area */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="h-10 bg-gray-100 rounded mb-4" />
            <div className="h-32 bg-gray-50 rounded" />
          </div>

          {/* Character map */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="h-5 bg-gray-200 rounded w-36 mb-4" />
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="h-10 bg-gray-200 rounded-lg mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 bg-gray-100 rounded w-20" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
