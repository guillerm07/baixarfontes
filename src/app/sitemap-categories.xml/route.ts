import { prisma } from "@/lib/prisma";
import { PARENT_CATEGORIES, toSlug } from "@/lib/categories";

export const dynamic = "force-dynamic";

const BASE_URL = "https://baixarfontes.com";

export async function GET() {
  const categories = await prisma.category.findMany();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Parent categories
  for (const [, { slug }] of Object.entries(PARENT_CATEGORIES)) {
    xml += `  <url><loc>${BASE_URL}/categoria/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
  }

  // Child categories (cat.parentName usa o nome original da DB em espanhol)
  for (const cat of categories) {
    const entry = Object.values(PARENT_CATEGORIES).find((p) => p.dbName === cat.parentName);
    if (!entry) continue;
    xml += `  <url><loc>${BASE_URL}/categoria/${entry.slug}/${toSlug(cat.childName)}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
