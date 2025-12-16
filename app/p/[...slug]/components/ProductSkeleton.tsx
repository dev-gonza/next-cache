export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="aspect-3/4 bg-gray-200 rounded-lg" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-14 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
