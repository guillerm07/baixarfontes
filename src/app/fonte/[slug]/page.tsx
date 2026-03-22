import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getFontBySlug } from "@/lib/fonts";
import { FontPreview } from "@/components/FontPreview";
import { CharacterMap } from "@/components/CharacterMap";
import { FontCardPreview } from "@/components/FontCardPreview";
import { prisma } from "@/lib/prisma";
import { getCategorySlugs } from "@/lib/categories";

function formatDatePT(dateStr: string): string {
  if (dateStr.toLowerCase().startsWith("before")) {
    const year = dateStr.replace(/\D/g, "");
    return `Anterior a ${year}`;
  }

  const months: Record<string, string> = {
    January: "janeiro", February: "fevereiro", March: "março", April: "abril",
    May: "maio", June: "junho", July: "julho", August: "agosto",
    September: "setembro", October: "outubro", November: "novembro", December: "dezembro",
  };

  // "April 01, 2010" → "1 de abril de 2010"
  const match = dateStr.match(/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (match) {
    const month = months[match[1]] || match[1].toLowerCase();
    const day = parseInt(match[2], 10);
    return `${day} de ${month} de ${match[3]}`;
  }

  return dateStr;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const font = await getFontBySlug(slug);
  if (!font) return {};

  return {
    title: `Baixar Fonte ${font.name} Grátis`,
    description: `Baixe a fonte ${font.name} grátis. ${font.license || ""} ${font.authorName ? `Por ${font.authorName}.` : ""} ${font.downloadsTotal.toLocaleString("pt-BR")} downloads.`,
    alternates: {
      canonical: `/fonte/${slug}`,
    },
    openGraph: {
      title: `Baixar Fonte ${font.name} Grátis | BaixarFontes`,
      description: `Baixe a fonte ${font.name} grátis para seus projetos de design.`,
      url: `https://baixarfontes.com/fonte/${slug}`,
      type: "article",
    },
  };
}

export default async function FontPage({ params }: Props) {
  const { slug } = await params;
  const font = await getFontBySlug(slug);
  if (!font) notFound();

  const categorySlugs = font.categoryName
    ? getCategorySlugs(font.categoryName)
    : null;

  // Fontes relacionadas (mesma categoria)
  const related = font.categoryName
    ? await prisma.font.findMany({
        where: {
          categoryName: font.categoryName,
          slug: { not: font.slug },
        },
        orderBy: { downloadsTotal: "desc" },
        take: 6,
      })
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Início</Link>
        {categorySlugs && font.categoryName && (
          <>
            <span>/</span>
            <Link
              href={`/categoria/${categorySlugs.parentSlug}`}
              className="hover:text-primary-600"
            >
              {font.categoryName.split(" > ")[0]}
            </Link>
            <span>/</span>
            <Link
              href={`/categoria/${categorySlugs.parentSlug}/${categorySlugs.childSlug}`}
              className="hover:text-primary-600"
            >
              {font.categoryName.split(" > ")[1]}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900">{font.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{font.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-gray-600">
            {font.authorName && (
              <Link
                href={`/autor/${font.authorSlug}`}
                className="hover:text-primary-600"
              >
                por {font.authorName}
              </Link>
            )}
            {font.license && (
              <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                {font.license}
              </span>
            )}
          </div>
        </div>

        <a
          href={`/api/download/${font.slug}`}
          className="btn-download text-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Baixar
        </a>
      </div>

      {/* Preview interativo */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Pré-visualização</h2>
        <FontPreview slug={font.slug} name={font.name} />
      </section>

      {/* Mapa de caracteres */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Mapa de caracteres</h2>
        <CharacterMap slug={font.slug} />
      </section>

      {/* Info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Informações</h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Downloads</dt>
            <dd className="font-medium">{font.downloadsTotal.toLocaleString("pt-BR")}</dd>
          </div>
          {font.dateAdded && (
            <div>
              <dt className="text-gray-500">Adicionada</dt>
              <dd className="font-medium">{formatDatePT(font.dateAdded)}</dd>
            </div>
          )}
          {font.license && (
            <div>
              <dt className="text-gray-500">Licença</dt>
              <dd className="font-medium">{font.license}</dd>
            </div>
          )}
          {font.fileSize && (
            <div>
              <dt className="text-gray-500">Tamanho</dt>
              <dd className="font-medium">{font.fileSize}</dd>
            </div>
          )}
          {font.numFiles && (
            <div>
              <dt className="text-gray-500">Arquivos</dt>
              <dd className="font-medium">{font.numFiles}</dd>
            </div>
          )}
          {font.numGlyphs && (
            <div>
              <dt className="text-gray-500">Glifos</dt>
              <dd className="font-medium">{font.numGlyphs}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Fontes relacionadas */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Fontes relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((f) => (
              <Link
                key={f.id}
                href={`/fonte/${f.slug}`}
                className="font-card hover:border-primary-300"
              >
                <FontCardPreview slug={f.slug} name={f.name} />
                <p className="text-sm font-medium truncate mt-2">{f.name}</p>
                <p className="text-xs text-gray-500">{f.downloadsTotal.toLocaleString("pt-BR")} downloads</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Schema.org - SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: font.name,
            applicationCategory: "DesignApplication",
            operatingSystem: "Windows, macOS, Linux",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            ...(font.authorName && { author: { "@type": "Person", name: font.authorName } }),
            ...(font.downloadsTotal && { interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/DownloadAction",
              userInteractionCount: font.downloadsTotal,
            }}),
          }),
        }}
      />

      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://baixarfontes.com",
              },
              ...(categorySlugs && font.categoryName
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: font.categoryName.split(" > ")[0],
                      item: `https://baixarfontes.com/categoria/${categorySlugs.parentSlug}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: font.categoryName.split(" > ")[1],
                      item: `https://baixarfontes.com/categoria/${categorySlugs.parentSlug}/${categorySlugs.childSlug}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: font.name,
                      item: `https://baixarfontes.com/fonte/${font.slug}`,
                    },
                  ]
                : [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: font.name,
                      item: `https://baixarfontes.com/fonte/${font.slug}`,
                    },
                  ]),
            ],
          }),
        }}
      />
    </div>
  );
}
