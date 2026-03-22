const BASE_URL = "https://baixarfontes.com";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/top</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/novas</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/fontes</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE_URL}/sobre-nos</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><loc>${BASE_URL}/licencas</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
