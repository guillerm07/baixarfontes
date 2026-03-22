import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "As Fontes Mais Populares - Baixar Grátis",
  description: "As fontes tipográficas mais baixadas de todos os tempos. Baixe grátis as fontes mais populares.",
  alternates: { canonical: "/top" },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function TopPage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const pageSize = 25;

  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      orderBy: { downloadsTotal: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Fontes Mais Populares</h1>
      <p className="text-gray-500 mb-8">As fontes mais baixadas de todos os tempos</p>

      <div className="grid gap-3">
        {fonts.map((font, i) => (
          <div key={font.id} className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-300 w-10 text-right">
              {(page - 1) * pageSize + i + 1}
            </span>
            <div className="flex-1">
              <FontCard font={font} />
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/top" />
    </div>
  );
}
