import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

const FONTS_ZIP_PATH = process.env.FONTS_ZIP_PATH || "c:/Users/guill/Documents/fuentes-scraper/output/fonts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Buscar la fuente en DB
  const font = await prisma.font.findUnique({ where: { slug } });
  if (!font) {
    return new NextResponse("Font not found", { status: 404 });
  }

  // Construir ruta al ZIP: fonts/[primera-letra]/[slug]/[slug].zip
  const firstLetter = slug[0].toLowerCase();
  const zipPath = path.join(FONTS_ZIP_PATH, firstLetter, slug, `${slug}.zip`);

  if (!existsSync(zipPath)) {
    return new NextResponse("File not available yet", { status: 404 });
  }

  // Incrementar contadores: total (visible al usuario) + local (descargas reales)
  await prisma.font.update({
    where: { slug },
    data: {
      downloadsTotal: { increment: 1 },
      downloadsLocal: { increment: 1 },
    },
  });

  const buffer = await readFile(zipPath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.zip"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
