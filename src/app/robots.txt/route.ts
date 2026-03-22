export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /pesquisar

Host: https://baixarfontes.com

Sitemap: https://baixarfontes.com/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
