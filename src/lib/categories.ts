// Mapa de categorias principais conforme estão na DB do scraper
// parentName → { slug para URL, ícone }

export const PARENT_CATEGORIES: Record<
  string,
  { slug: string; icon: string; description: string; dbName: string }
> = {
  "Básico": {
    slug: "basico",
    dbName: "Básico",
    icon: "🔤",
    description: "As fontes básicas são a base de qualquer projeto tipográfico. Incluem tipografias serif, sans-serif, monoespaçadas e de largura fixa, ideais para textos de leitura, documentos, interfaces web e projetos que precisam de clareza e legibilidade. Das clássicas romanas às modernas geométricas, aqui você encontrará fontes versáteis para qualquer uso.",
  },
  "Dingbats": {
    slug: "dingbats",
    dbName: "Dingbats",
    icon: "🎨",
    description: "As fontes Dingbats substituem as letras por símbolos, ícones e ilustrações. São perfeitas para decorar designs, criar separadores, adicionar ícones sem imagens ou complementar outros textos com elementos visuais. Incluem desde símbolos clássicos até emoticons, figuras, setas e elementos decorativos de todo tipo.",
  },
  "Estrangeiro": {
    slug: "estrangeiro",
    dbName: "Estrangeiro",
    icon: "🌍",
    description: "Fontes com caracteres de alfabetos não latinos e estilos internacionais. Incluem tipografias árabes, chinesas, japonesas, coreanas, cirílicas, gregas, hebraicas, tailandesas e muitas mais. Ideais para projetos multilíngues, designs com temática cultural ou qualquer trabalho que exija escrita em outros sistemas.",
  },
  "Fantasia": {
    slug: "fantasia",
    dbName: "Fantasia",
    icon: "✨",
    description: "As fontes de fantasia são as mais criativas e expressivas do catálogo. Aqui você encontrará tipografias com estilos únicos: desde fontes que imitam a escrita à mão até designs futuristas, infantis, com efeito 3D, de contorno, sombreadas ou com texturas. Perfeitas para títulos, logos, cartazes e qualquer design que precise de personalidade.",
  },
  "Gótico": {
    slug: "gotico",
    dbName: "Gótico",
    icon: "🏰",
    description: "As fontes góticas evocam a estética medieval e a tradição caligráfica europeia. Incluem tipografias blackletter, textura, fraktur, uncial e variantes celtas. Muito utilizadas em logos de bandas de música, rótulos de cerveja, títulos de videogames, tatuagens e qualquer design que busque um ar histórico, elegante ou com caráter.",
  },
  "Festivo": {
    slug: "festiva",
    dbName: "Festivo",
    icon: "🎄",
    description: "Fontes temáticas para ocasiões especiais e festividades. Encontre tipografias para Natal, Halloween, Dia dos Namorados, Páscoa e outras celebrações. Ideais para cartões de felicitações, convites, cartazes de eventos, decoração e projetos sazonais que queiram transmitir o espírito de cada festividade.",
  },
  "Script": {
    slug: "script",
    dbName: "Script",
    icon: "✍️",
    description: "As fontes Script imitam a escrita à mão e a caligrafia. Desde elegantes tipografias cursivas formais até estilos brush, handwritten e grafite. Perfeitas para convites de casamento, logotipos com personalidade, assinaturas, embalagens e qualquer design que precise de um toque pessoal, artístico ou sofisticado.",
  },
  "Tecno": {
    slug: "tecno",
    dbName: "Tecno",
    icon: "🤖",
    description: "Fontes com estética tecnológica, futurista e digital. Incluem tipografias pixeladas, de ficção científica, estilo LCD, quadradas e geométricas. Ideais para videogames, interfaces digitais, projetos de tecnologia, cartazes de música eletrônica e designs que buscam um aspecto moderno e vanguardista.",
  },
};

// Slug → nome de exibição (português)
export const SLUG_TO_PARENT: Record<string, string> = Object.fromEntries(
  Object.entries(PARENT_CATEGORIES).map(([key, val]) => [val.slug, key])
);

// Slug → nome original na DB (espanhol, conforme importado do DaFont)
export const SLUG_TO_DB_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(PARENT_CATEGORIES).map(([, val]) => [val.slug, val.dbName])
);

// Nome da DB → nome de exibição (português)
export const DB_NAME_TO_DISPLAY: Record<string, string> = Object.fromEntries(
  Object.entries(PARENT_CATEGORIES).map(([key, val]) => [val.dbName, key])
);

// Gera slug limpo a partir de texto
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// "Fantasía > Animación" → { parentSlug: "fantasia", childSlug: "animacion" }
// Recebe o nome da categoria conforme está na DB (espanhol)
export function getCategorySlugs(categoryName: string) {
  const parts = categoryName.split(" > ");
  if (parts.length !== 2) return null;
  const dbParentName = parts[0].trim();
  // Busca pela chave portuguesa ou pelo dbName original
  const entry = Object.entries(PARENT_CATEGORIES).find(
    ([key, val]) => key === dbParentName || val.dbName === dbParentName
  );
  if (!entry) return null;
  return {
    parentSlug: entry[1].slug,
    childSlug: toSlug(parts[1].trim()),
  };
}

// Slug de subcategoria → nome original de categoria completo
// Construído dinamicamente a partir das categorias na DB
export function getParentDisplayName(parentSlug: string): string {
  return SLUG_TO_PARENT[parentSlug] || parentSlug;
}
