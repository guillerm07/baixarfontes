import AdmZip from "adm-zip";
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const FONTS_ZIP_PATH = process.env.FONTS_ZIP_PATH || "c:/Users/guill/Documents/fuentes-scraper/output/fonts";
const OUTPUT_DIR = path.join(process.cwd(), "public", "fonts");
const LOG_INTERVAL = 500;

async function main() {
  const prisma = new PrismaClient();

  // Solo extraer fuentes que ya están descargadas
  const fonts = await prisma.font.findMany({
    where: { fontDownloaded: true },
    select: { slug: true },
  });

  console.log(`Fuentes descargadas: ${fonts.length}`);
  console.log(`Directorio de salida: ${OUTPUT_DIR}`);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let extracted = 0;
  let skipped = 0;
  let errors = 0;
  let noZip = 0;
  const startTime = Date.now();

  for (let i = 0; i < fonts.length; i++) {
    const slug = fonts[i].slug;
    const firstLetter = slug[0].toLowerCase();
    const zipPath = path.join(FONTS_ZIP_PATH, firstLetter, slug, `${slug}.zip`);

    // Ya extraído?
    const ttfOut = path.join(OUTPUT_DIR, `${slug}.ttf`);
    const otfOut = path.join(OUTPUT_DIR, `${slug}.otf`);
    if (existsSync(ttfOut) || existsSync(otfOut)) {
      skipped++;
      continue;
    }

    if (!existsSync(zipPath)) {
      noZip++;
      continue;
    }

    try {
      const zip = new AdmZip(zipPath);
      const entries = zip.getEntries();

      // Filtrar solo archivos de fuentes
      const fontEntries = entries.filter(
        (e) => /\.(ttf|otf)$/i.test(e.entryName) && !e.isDirectory
      );

      // Preferir: Regular TTF > Regular OTF > cualquier TTF > cualquier OTF
      const pickBest = () => {
        const name = (e: { entryName: string }) =>
          path.basename(e.entryName).toLowerCase();
        const isRegular = (n: string) =>
          /regular|normal/i.test(n) ||
          (!/-|bold|italic|light|thin|medium|heavy|black|semi|cond|comp|narrow|wide|oblique|ui\b/i.test(n));

        // TTF Regular
        const ttfReg = fontEntries.find(
          (e) => /\.ttf$/i.test(e.entryName) && isRegular(name(e))
        );
        if (ttfReg) return ttfReg;

        // OTF Regular
        const otfReg = fontEntries.find(
          (e) => /\.otf$/i.test(e.entryName) && isRegular(name(e))
        );
        if (otfReg) return otfReg;

        // Any TTF
        const anyTtf = fontEntries.find((e) => /\.ttf$/i.test(e.entryName));
        if (anyTtf) return anyTtf;

        // Any OTF
        return fontEntries[0] || null;
      };

      const best = pickBest();
      if (best) {
        const ext = path.extname(best.entryName).toLowerCase();
        const dest = path.join(OUTPUT_DIR, `${slug}${ext}`);
        const buffer = best.getData();
        writeFileSync(dest, buffer);
        extracted++;
      }
    } catch {
      errors++;
    }

    const processed = extracted + errors + skipped + noZip;
    if (processed % LOG_INTERVAL === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const rate = (processed / ((Date.now() - startTime) / 1000)).toFixed(0);
      console.log(
        `[${elapsed}s] Progreso: ${processed}/${fonts.length} | ` +
        `Extraídas: ${extracted} | Skipped: ${skipped} | Errores: ${errors} | Sin ZIP: ${noZip} | ${rate} fonts/s`
      );
    }
  }

  console.log(`\nExtracción completada:`);
  console.log(`  - ${extracted} extraídas`);
  console.log(`  - ${skipped} ya existentes`);
  console.log(`  - ${noZip} sin archivo ZIP`);
  console.log(`  - ${errors} errores`);
  console.log(`  - Tiempo: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

  await prisma.$disconnect();
}

main().catch(console.error);
