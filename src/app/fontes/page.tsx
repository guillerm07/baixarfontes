import type { Metadata } from "next";
import Link from "next/link";
import { getFontsByLetter } from "@/lib/fonts";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Todas as Fontes Grátis de A a Z",
  description: "Explore todas as fontes tipográficas disponíveis ordenadas alfabeticamente. Mais de 98.000 fontes grátis.",
  alternates: { canonical: "/fontes" },
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["0-9"]);

interface Props {
  searchParams: Promise<{ letter?: string; page?: string }>;
}

export default async function AllFontsPage({ searchParams }: Props) {
  const { letter: letterParam, page: pageStr } = await searchParams;
  const letter = letterParam || "A";
  const page = Math.max(1, parseInt(pageStr || "1"));

  const { fonts, total, totalPages } = await getFontsByLetter(letter, page);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todas as Fontes</h1>

      {/* Navegação por letra */}
      <div className="flex flex-wrap gap-1 mb-8">
        {LETTERS.map((l) => (
          <Link
            key={l}
            href={`/fontes?letter=${l}`}
            className={`w-10 h-10 flex items-center justify-center rounded font-medium text-sm ${
              l === letter
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {l}
          </Link>
        ))}
      </div>

      <p className="text-gray-500 mb-4">
        {total.toLocaleString("pt-BR")} fontes que começam com &quot;{letter}&quot;
      </p>

      <div className="grid gap-3">
        {fonts.map((font) => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/fontes?letter=${letter}`}
      />
    </div>
  );
}
