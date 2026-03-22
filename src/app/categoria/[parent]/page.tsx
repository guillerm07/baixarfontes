import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SLUG_TO_PARENT, PARENT_CATEGORIES, toSlug } from "@/lib/categories";

interface Props {
  params: Promise<{ parent: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { parent } = await params;
  const parentName = SLUG_TO_PARENT[parent];
  if (!parentName) return {};

  const info = PARENT_CATEGORIES[parentName];
  return {
    title: `Fontes de ${parentName} Grátis - Baixar`,
    description: info?.description.slice(0, 160) || `Baixe fontes de ${parentName} grátis. Explore subcategorias e encontre a fonte perfeita para seu projeto.`,
    alternates: {
      canonical: `/categoria/${parent}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { parent } = await params;
  const parentName = SLUG_TO_PARENT[parent];
  if (!parentName) notFound();

  const parentInfo = PARENT_CATEGORIES[parentName];

  // Obter subcategorias desta categoria principal
  const subcategories = await prisma.category.findMany({
    where: { parentName },
    orderBy: { childName: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Início</Link>
        <span>/</span>
        <span className="text-gray-900">{parentName}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        {parentInfo.icon} Fontes de {parentName}
      </h1>
      <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
        {parentInfo.description}
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Subcategorias de {parentName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/categoria/${parent}/${toSlug(sub.childName)}`}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-primary-300 transition-all"
          >
            <h2 className="font-semibold text-lg text-gray-900">{sub.childName}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {sub.fontCount.toLocaleString("pt-BR")} fontes
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
