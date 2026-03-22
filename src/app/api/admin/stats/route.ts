import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// Map country codes to flag emoji + name
const COUNTRY_NAMES: Record<string, string> = {
  ES: "Espa\u00f1a", MX: "M\u00e9xico", AR: "Argentina", CO: "Colombia", CL: "Chile",
  PE: "Per\u00fa", VE: "Venezuela", EC: "Ecuador", GT: "Guatemala", CU: "Cuba",
  BO: "Bolivia", DO: "Rep. Dominicana", HN: "Honduras", PY: "Paraguay", SV: "El Salvador",
  NI: "Nicaragua", CR: "Costa Rica", PA: "Panam\u00e1", UY: "Uruguay", PR: "Puerto Rico",
  US: "Estados Unidos", BR: "Brasil", FR: "Francia", DE: "Alemania", IT: "Italia",
  PT: "Portugal", GB: "Reino Unido", CA: "Canad\u00e1", JP: "Jap\u00f3n", CN: "China",
  IN: "India", RU: "Rusia", KR: "Corea del Sur", AU: "Australia", NL: "Pa\u00edses Bajos",
  PL: "Polonia", SE: "Suecia", BE: "B\u00e9lgica", CH: "Suiza", AT: "Austria",
};

function parseUserAgent(ua: string): { browser: string; device: string } {
  let browser = "Otro";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("bot") || ua.includes("Bot") || ua.includes("crawl")) browser = "Bot";

  let device = "Desktop";
  if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
    device = /iPad|Tablet/i.test(ua) ? "Tablet" : "M\u00f3vil";
  } else if (/bot|Bot|crawl|spider|Googlebot|Bingbot/i.test(ua)) {
    device = "Bot";
  }

  return { browser, device };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last7d = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30d = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalFonts,
    totalAuthors,
    totalCategories,
    downloadedFonts,
    totalDownloads,
    topFonts,
    topCategories,
    licenseDistribution,
    recentFonts,
    // Traffic stats
    viewsToday,
    views7d,
    views30d,
    viewsTotal,
    topPages,
    topReferrers,
    // Traffic by day (last 14 days)
    dailyViews,
    // Country stats
    topCountries,
    // Recent page views for UA parsing
    recentViews,
    // Messages
    unreadMessages,
  ] = await Promise.all([
    prisma.font.count(),
    prisma.author.count(),
    prisma.category.count(),
    prisma.font.count({ where: { fontDownloaded: true } }),
    prisma.font.aggregate({ _sum: { downloadsTotal: true, downloadsLocal: true } }),
    prisma.font.findMany({
      orderBy: { downloadsTotal: "desc" },
      take: 20,
      select: {
        name: true,
        slug: true,
        downloadsTotal: true,
        downloadsLocal: true,
        authorName: true,
        categoryName: true,
        license: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { fontCount: "desc" },
      take: 15,
      select: { name: true, parentName: true, childName: true, fontCount: true },
    }),
    prisma.font.groupBy({
      by: ["license"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.font.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { name: true, slug: true, authorName: true, createdAt: true, fontDownloaded: true },
    }),
    // Traffic
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.pageView.count({ where: { createdAt: { gte: last7d } } }),
    prisma.pageView.count({ where: { createdAt: { gte: last30d } } }),
    prisma.pageView.count(),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      where: { createdAt: { gte: last30d } },
      take: 15,
    }),
    prisma.pageView.groupBy({
      by: ["referrer"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      where: {
        createdAt: { gte: last30d },
        referrer: { not: null },
        NOT: { referrer: "" },
      },
      take: 10,
    }),
    // Daily views for chart (last 14 days)
    getDailyViews(14),
    // Country stats (last 30 days)
    prisma.pageView.groupBy({
      by: ["country"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      where: {
        createdAt: { gte: last30d },
        country: { not: null },
        NOT: { country: "" },
      },
      take: 15,
    }),
    // Recent views for browser/device parsing
    prisma.pageView.findMany({
      where: {
        createdAt: { gte: last30d },
        userAgent: { not: null },
      },
      select: { userAgent: true },
    }),
    // Messages
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  // Parse browsers and devices from user agents
  const browserCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  for (const view of recentViews) {
    if (!view.userAgent) continue;
    const { browser, device } = parseUserAgent(view.userAgent);
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }

  const topBrowsers = Object.entries(browserCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const topDevices = Object.entries(deviceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    overview: {
      totalFonts,
      totalAuthors,
      totalCategories,
      downloadedFonts,
      totalDownloads: totalDownloads._sum.downloadsTotal ?? 0,
      realDownloads: totalDownloads._sum.downloadsLocal ?? 0,
    },
    traffic: {
      today: viewsToday,
      last7d: views7d,
      last30d: views30d,
      total: viewsTotal,
      topPages: topPages.map((p) => ({ path: p.path, count: p._count.id })),
      topReferrers: topReferrers.map((r) => ({
        referrer: r.referrer || "Directo",
        count: r._count.id,
      })),
      dailyViews,
      topCountries: topCountries.map((c) => ({
        code: c.country || "??",
        name: COUNTRY_NAMES[c.country || ""] || c.country || "Desconocido",
        count: c._count.id,
      })),
      topBrowsers,
      topDevices,
    },
    topFonts,
    topCategories,
    licenseDistribution: licenseDistribution.map((l) => ({
      license: l.license || "Sin licencia",
      count: l._count.id,
    })),
    recentFonts,
    unreadMessages,
  });
}

async function getDailyViews(days: number) {
  const results: { date: string; count: number }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const count = await prisma.pageView.count({
      where: {
        createdAt: { gte: dayStart, lt: dayEnd },
      },
    });

    results.push({
      date: dayStart.toISOString().split("T")[0],
      count,
    });
  }

  return results;
}
