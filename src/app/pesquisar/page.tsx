import type { Metadata } from "next";
import { searchFonts } from "@/lib/fonts";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export const metadata: Metadata = {
  title: "Pesquisar Fontes",
  robots: "noindex,follow",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, page: pageStr } = await searchParams;
  const query = q?.trim() || "";
  const page = Math.max(1, parseInt(pageStr || "1"));

  const result = query ? await searchFonts(query, page) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pesquisar Fontes</h1>

      <div className="max-w-xl mb-8">
        <SearchBar large />
      </div>

      {query && result && (
        <>
          <p className="text-gray-600 mb-4">
            {result.total.toLocaleString("pt-BR")} resultados para &quot;{query}&quot;
          </p>

          <div className="grid gap-3">
            {result.fonts.map((font) => (
              <FontCard key={font.id} font={font} />
            ))}
          </div>

          {result.fonts.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              Nenhuma fonte encontrada para &quot;{query}&quot;
            </p>
          )}

          <Pagination
            currentPage={page}
            totalPages={result.totalPages}
            baseUrl={`/pesquisar?q=${encodeURIComponent(query)}`}
          />
        </>
      )}
    </div>
  );
}
