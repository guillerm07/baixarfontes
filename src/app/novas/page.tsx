import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fontes Novas Grátis - Baixar",
  description: "As últimas fontes tipográficas adicionadas. Baixe grátis as fontes mais novas.",
  alternates: { canonical: "/novas" },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewFontsPage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const pageSize = 25;

  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      orderBy: { dateAdded: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Fontes Novas</h1>
      <p className="text-gray-500 mb-8">Últimas fontes adicionadas</p>

      <div className="grid gap-3">
        {fonts.map((font) => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/novas" />
    </div>
  );
}
