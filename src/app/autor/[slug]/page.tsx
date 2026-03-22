import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getFontsByAuthor } from "@/lib/fonts";
import { FontCard } from "@/components/FontCard";
import { Pagination } from "@/components/Pagination";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await prisma.author.findUnique({ where: { slug } });
  if (!author) return {};

  return {
    title: `Fontes de ${author.name} - Baixar Grátis`,
    description: `Baixe as fontes de ${author.name} grátis. ${author.fontCount} fontes disponíveis.`,
    alternates: {
      canonical: `/autor/${slug}`,
    },
  };
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const author = await prisma.author.findUnique({ where: { slug } });
  if (!author) notFound();

  const page = Math.max(1, parseInt(pageStr || "1"));
  const { fonts, total, totalPages } = await getFontsByAuthor(slug, page);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Início</Link>
        <span>/</span>
        <span className="text-gray-900">{author.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
      <p className="text-gray-500 mb-8">
        {total.toLocaleString("pt-BR")} fontes disponíveis
      </p>

      <div className="grid gap-3">
        {fonts.map((font) => (
          <FontCard key={font.id} font={font} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/autor/${slug}`} />
    </div>
  );
}
