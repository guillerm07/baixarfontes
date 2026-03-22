import Link from "next/link";
import { PARENT_CATEGORIES } from "@/lib/categories";

export function CategoryNav() {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-0.5 overflow-x-auto py-2 scrollbar-hide">
          {Object.entries(PARENT_CATEGORIES).map(([name, { slug, icon }]) => (
            <Link
              key={slug}
              href={`/categoria/${slug}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-primary-50 hover:text-primary-700 transition-all whitespace-nowrap"
            >
              <span className="text-base">{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
