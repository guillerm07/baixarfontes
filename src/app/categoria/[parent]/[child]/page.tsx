import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SLUG_TO_PARENT, toSlug } from "@/lib/categories";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";

interface Props {
  params: Promise<{ parent: string; child: string }>;
  searchParams: Promise<{ page?: string; order?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { parent, child } = await params;
  const parentName = SLUG_TO_PARENT[parent];
  if (!parentName) return {};

  // Buscar o nome real da subcategoria
  const category = await prisma.category.findFirst({
    where: { parentName },
  });

  // Buscar a subcategoria que coincida com o slug
  const allSubs = await prisma.category.findMany({ where: { parentName } });
  const sub = allSubs.find((s) => toSlug(s.childName) === child);

  const childName = sub?.childName || child;
  return {
    title: `Fontes de ${childName} Grátis - Baixar`,
    description: `Baixe grátis ${sub?.fontCount || "centenas de"} fontes de ${childName} da categoria ${parentName}. Fontes tipográficas de ${childName.toLowerCase()} para design, logos, web e projetos criativos.`,
    alternates: {
      canonical: `/categoria/${parent}/${child}`,
    },
  };
}

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const { parent, child } = await params;
  const { page: pageStr, order } = await searchParams;
  const parentName = SLUG_TO_PARENT[parent];
  if (!parentName) notFound();

  // Encontrar a subcategoria real
  const allSubs = await prisma.category.findMany({ where: { parentName } });
  const sub = allSubs.find((s) => toSlug(s.childName) === child);
  if (!sub) notFound();

  const page = Math.max(1, parseInt(pageStr || "1"));
  const pageSize = 25;

  const orderBy = order === "name"
    ? { name: "asc" as const }
    : order === "date"
    ? { createdAt: "desc" as const }
    : { downloadsTotal: "desc" as const };

  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      where: { categoryName: sub.name },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count({ where: { categoryName: sub.name } }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Início</Link>
        <span>/</span>
        <Link href={`/categoria/${parent}`} className="hover:text-primary-600">{parentName}</Link>
        <span>/</span>
        <span className="text-gray-900">{sub.childName}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fontes de {sub.childName}</h1>
        <p className="text-gray-500 mt-1 mb-4">{total.toLocaleString("pt-BR")} fontes disponíveis para baixar grátis</p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          Explore nossa coleção de fontes tipográficas de {sub.childName.toLowerCase()} dentro da categoria {parentName}.
          Baixe grátis qualquer uma das {total.toLocaleString("pt-BR")} fontes de {sub.childName.toLowerCase()} disponíveis
          para seus projetos de design gráfico, web, logos ou qualquer criação visual.
          Cada fonte inclui informações sobre sua licença para que você possa usá-la com total tranquilidade.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div></div>

        {/* Order controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Ordenar:</span>
          {[
            { key: "popular", label: "Populares" },
            { key: "name", label: "Nome" },
            { key: "date", label: "Data" },
          ].map((o) => (
            <Link
              key={o.key}
              href={`/categoria/${parent}/${child}?order=${o.key}`}
              className={`px-3 py-1 rounded text-sm ${
                (order || "popular") === o.key
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {o.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {fonts.map((font) => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

      {fonts.length === 0 && (
        <p className="text-center text-gray-500 py-12">Nenhuma fonte encontrada nesta categoria.</p>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/categoria/${parent}/${child}${order ? `?order=${order}` : ""}`}
      />
    </div>
  );
}
