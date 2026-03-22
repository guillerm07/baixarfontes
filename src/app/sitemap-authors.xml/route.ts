import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://baixarfontes.com";

export async function GET() {
  const authors = await prisma.author.findMany({
    select: { slug: true },
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const author of authors) {
    xml += `  <url><loc>${BASE_URL}/autor/${author.slug}</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>\n`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
