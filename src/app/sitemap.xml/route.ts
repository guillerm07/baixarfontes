import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://baixarfontes.com";
const FONTS_PER_SITEMAP = 10000;

export async function GET() {
  // Count total fonts to determine number of sitemap files
  const totalFonts = await prisma.font.count();
  const totalSitemaps = Math.ceil(totalFonts / FONTS_PER_SITEMAP);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>${BASE_URL}/sitemap-categories.xml</loc></sitemap>
  <sitemap><loc>${BASE_URL}/sitemap-authors.xml</loc></sitemap>
`;

  for (let i = 0; i < totalSitemaps; i++) {
    xml += `  <sitemap><loc>${BASE_URL}/sitemap-fonts-${i}.xml</loc></sitemap>\n`;
  }

  xml += `</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
