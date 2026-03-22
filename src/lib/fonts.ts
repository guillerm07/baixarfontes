import { prisma } from "./prisma";

export async function getFontBySlug(slug: string) {
  return prisma.font.findUnique({ where: { slug } });
}

export async function getPopularFonts(limit = 20) {
  return prisma.font.findMany({
    orderBy: { downloadsTotal: "desc" },
    take: limit,
  });
}

export async function getNewFonts(limit = 20) {
  return prisma.font.findMany({
    orderBy: { dateAdded: "desc" },
    take: limit,
  });
}

export async function getFontsByCategory(
  categoryName: string,
  page = 1,
  pageSize = 25,
  orderBy: "popular" | "name" | "date" = "popular"
) {
  const orderMap = {
    popular: { downloadsTotal: "desc" as const },
    name: { name: "asc" as const },
    date: { dateAdded: "desc" as const },
  };

  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      where: { categoryName: { contains: categoryName } },
      orderBy: orderMap[orderBy],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count({
      where: { categoryName: { contains: categoryName } },
    }),
  ]);

  return { fonts, total, totalPages: Math.ceil(total / pageSize) };
}

export async function getFontsByAuthor(authorSlug: string, page = 1, pageSize = 25) {
  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      where: { authorSlug },
      orderBy: { downloadsTotal: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count({ where: { authorSlug } }),
  ]);

  return { fonts, total, totalPages: Math.ceil(total / pageSize) };
}

export async function searchFonts(query: string, page = 1, pageSize = 25) {
  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      where: { name: { contains: query } },
      orderBy: { downloadsTotal: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count({
      where: { name: { contains: query } },
    }),
  ]);

  return { fonts, total, totalPages: Math.ceil(total / pageSize) };
}

export async function getFontsByLetter(letter: string, page = 1, pageSize = 50) {
  const where = letter === "0-9"
    ? { name: { startsWith: letter } }
    : { name: { startsWith: letter.toUpperCase() } };

  // Para 0-9 necesitamos filtrar por cualquier dígito
  if (letter === "0-9") {
    const [fonts, total] = await Promise.all([
      prisma.font.findMany({
        where: {
          OR: "0123456789".split("").map((d) => ({ name: { startsWith: d } })),
        },
        orderBy: { name: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.font.count({
        where: {
          OR: "0123456789".split("").map((d) => ({ name: { startsWith: d } })),
        },
      }),
    ]);
    return { fonts, total, totalPages: Math.ceil(total / pageSize) };
  }

  const [fonts, total] = await Promise.all([
    prisma.font.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.font.count({ where }),
  ]);

  return { fonts, total, totalPages: Math.ceil(total / pageSize) };
}
