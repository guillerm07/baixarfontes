import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://baixarfontes.com";
const FONTS_PER_SITEMAP = 10000;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const page = parseInt(id, 10);
  if (isNaN(page) || page < 0) {
    return new Response("Not found", { status: 404 });
  }

  const fonts = await prisma.font.findMany({
    select: { slug: true },
    orderBy: { id: "asc" },
    skip: page * FONTS_PER_SITEMAP,
    take: FONTS_PER_SITEMAP,
  });

  if (fonts.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const font of fonts) {
    xml += `  <url><loc>${BASE_URL}/fonte/${font.slug}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
