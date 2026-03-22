import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Sirve el archivo TTF/OTF para preview con @font-face
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Buscar en public/fonts/ (TTFs extraídos)
  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const ttfPath = path.join(fontsDir, `${slug}.ttf`);
  const otfPath = path.join(fontsDir, `${slug}.otf`);

  let filePath = "";
  let contentType = "";

  if (existsSync(ttfPath)) {
    filePath = ttfPath;
    contentType = "font/ttf";
  } else if (existsSync(otfPath)) {
    filePath = otfPath;
    contentType = "font/otf";
  } else {
    return new NextResponse("Font not found", { status: 404 });
  }

  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
