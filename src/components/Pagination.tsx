import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const separator = baseUrl.includes("?") ? "&" : "?";

  return (
    <nav className="flex items-center justify-center gap-1 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}${separator}page=${currentPage - 1}`}
          className="px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
        >
          Anterior
        </Link>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}${separator}page=${page}`}
            className={`px-3 py-2 rounded text-sm font-medium ${
              page === currentPage
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}${separator}page=${currentPage + 1}`}
          className="px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
        >
          Próximo
        </Link>
      )}
    </nav>
  );
}
