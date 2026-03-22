import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple in-memory cache for IP → country (avoids hammering the API)
const countryCache = new Map<string, { country: string | null; ts: number }>();
const CACHE_TTL = 3600_000; // 1 hour

async function getCountryFromIP(ip: string): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return null;

  const cached = countryCache.get(ip);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.country;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,countryCode`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const country = data.status === "success" ? data.countryCode : null;
    countryCache.set(ip, { country, ts: Date.now() });
    // Keep cache from growing unbounded
    if (countryCache.size > 10000) {
      const oldest = countryCache.keys().next().value;
      if (oldest) countryCache.delete(oldest);
    }
    return country;
  } catch {
    return null;
  }
}

function extractDomain(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const { path, referrer } = await request.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || null;
    const ip = getClientIP(request);

    // Fire geo-lookup async - don't block the response
    const countryPromise = getCountryFromIP(ip);

    // Try to get country quickly, but don't wait too long
    const country = await countryPromise;

    await prisma.pageView.create({
      data: {
        path: path.slice(0, 500),
        referrer: extractDomain(referrer),
        userAgent: userAgent ? userAgent.slice(0, 300) : null,
        country: country || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
