import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import path from "path";

const SCRAPER_DB = process.env.SCRAPER_DB_PATH || "c:/Users/guill/Documents/fuentes-scraper/output/dafont.db";
const BATCH_SIZE = 500;

async function main() {
  console.log(`Leyendo DB del scraper: ${SCRAPER_DB}`);

  const sqlite = new Database(SCRAPER_DB, { readonly: true });
  const prisma = new PrismaClient();

  try {
    // Contar fuentes totales
    const { total } = sqlite.prepare("SELECT COUNT(*) as total FROM fonts").get() as { total: number };
    console.log(`Total fuentes en scraper: ${total}`);

    // Importar fuentes en lotes
    const stmt = sqlite.prepare(`
      SELECT id, slug, name, author_name, author_slug, category_id, category_name,
             license, downloads_total, downloads_yesterday, date_added, file_size,
             num_files, num_glyphs, font_url, download_url, preview_image_url,
             font_file_path, detail_scraped, font_downloaded
      FROM fonts
      ORDER BY id
    `);

    const allFonts = stmt.all() as Array<Record<string, unknown>>;
    let imported = 0;

    for (let i = 0; i < allFonts.length; i += BATCH_SIZE) {
      const batch = allFonts.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        batch.map((f) =>
          prisma.font.upsert({
            where: { slug: f.slug as string },
            create: {
              slug: f.slug as string,
              name: f.name as string,
              authorName: f.author_name as string | null,
              authorSlug: f.author_slug as string | null,
              categoryId: f.category_id as number | null,
              categoryName: f.category_name as string | null,
              license: f.license as string | null,
              downloadsTotal: (f.downloads_total as number) || 0,
              downloadsYesterday: (f.downloads_yesterday as number) || 0,
              dateAdded: f.date_added as string | null,
              fileSize: f.file_size as string | null,
              numFiles: f.num_files as number | null,
              numGlyphs: f.num_glyphs as number | null,
              fontUrl: f.font_url as string | null,
              downloadUrl: f.download_url as string | null,
              previewImageUrl: f.preview_image_url as string | null,
              fontFilePath: f.font_file_path as string | null,
              detailScraped: f.detail_scraped === 1,
              fontDownloaded: f.font_downloaded === 1,
            },
            update: {
              name: f.name as string,
              authorName: f.author_name as string | null,
              authorSlug: f.author_slug as string | null,
              categoryId: f.category_id as number | null,
              categoryName: f.category_name as string | null,
              license: f.license as string | null,
              downloadsTotal: (f.downloads_total as number) || 0,
              downloadsYesterday: (f.downloads_yesterday as number) || 0,
              dateAdded: f.date_added as string | null,
              fileSize: f.file_size as string | null,
              numFiles: f.num_files as number | null,
              numGlyphs: f.num_glyphs as number | null,
              fontUrl: f.font_url as string | null,
              downloadUrl: f.download_url as string | null,
              previewImageUrl: f.preview_image_url as string | null,
              fontFilePath: f.font_file_path as string | null,
              detailScraped: f.detail_scraped === 1,
              fontDownloaded: f.font_downloaded === 1,
            },
          })
        )
      );

      imported += batch.length;
      console.log(`Importadas ${imported}/${total} fuentes`);
    }

    // Crear categorías
    console.log("\nCreando categorías...");
    const categories = sqlite
      .prepare(
        `SELECT category_id, category_name, COUNT(*) as font_count
         FROM fonts
         WHERE category_name IS NOT NULL AND category_id IS NOT NULL
         GROUP BY category_id, category_name
         ORDER BY category_name`
      )
      .all() as Array<{ category_id: number; category_name: string; font_count: number }>;

    for (const cat of categories) {
      const parts = cat.category_name.split(" > ");
      if (parts.length !== 2) continue;

      await prisma.category.upsert({
        where: { id: cat.category_id },
        create: {
          id: cat.category_id,
          name: cat.category_name,
          parentName: parts[0].trim(),
          childName: parts[1].trim(),
          fontCount: cat.font_count,
        },
        update: {
          name: cat.category_name,
          parentName: parts[0].trim(),
          childName: parts[1].trim(),
          fontCount: cat.font_count,
        },
      });
    }
    console.log(`Creadas ${categories.length} categorías`);

    // Crear autores
    console.log("\nCreando autores...");
    const authors = sqlite
      .prepare(
        `SELECT author_slug, author_name, COUNT(*) as font_count
         FROM fonts
         WHERE author_slug IS NOT NULL AND author_name IS NOT NULL
         GROUP BY author_slug
         ORDER BY font_count DESC`
      )
      .all() as Array<{ author_slug: string; author_name: string; font_count: number }>;

    let authorCount = 0;
    for (let i = 0; i < authors.length; i += BATCH_SIZE) {
      const batch = authors.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map((a) =>
          prisma.author.upsert({
            where: { slug: a.author_slug },
            create: {
              slug: a.author_slug,
              name: a.author_name,
              fontCount: a.font_count,
            },
            update: {
              name: a.author_name,
              fontCount: a.font_count,
            },
          })
        )
      );
      authorCount += batch.length;
      console.log(`Autores: ${authorCount}/${authors.length}`);
    }

    console.log(`\nImportación completada:`);
    console.log(`  - ${imported} fuentes`);
    console.log(`  - ${categories.length} categorías`);
    console.log(`  - ${authors.length} autores`);
  } finally {
    sqlite.close();
    await prisma.$disconnect();
  }
}

main().catch(console.error);
