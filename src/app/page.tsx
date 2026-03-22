import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { FontCard } from "@/components/FontCard";
import { PARENT_CATEGORIES } from "@/lib/categories";
import { getPopularFonts, getNewFonts } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [popularFonts, newFonts] = await Promise.all([
    getPopularFonts(20),
    getNewFonts(20),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
        {/* Background typographic pattern */}
        <div className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
          <div className="absolute -top-4 -left-4 text-[12rem] font-black text-white/[0.04] leading-none tracking-tighter">Ag</div>
          <div className="absolute top-8 right-[10%] text-[8rem] font-thin text-white/[0.05] leading-none italic">Qs</div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-8 text-[10rem] font-mono text-white/[0.03] leading-none rotate-90">01</div>
          <div className="absolute bottom-0 right-0 text-[14rem] font-serif text-white/[0.04] leading-none tracking-tight">Rk</div>
          <div className="absolute top-1/3 left-[45%] text-[6rem] font-light text-white/[0.06] leading-none -rotate-12">&amp;</div>
          <div className="absolute bottom-8 left-[15%] text-[7rem] font-bold text-white/[0.04] leading-none rotate-6">Tf</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Baixar Fontes Grátis
          </h1>
          <p className="text-primary-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Mais de 98.000 fontes tipográficas para seus projetos de design
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-primary-300">
            <span>98.000+ fontes</span>
            <span className="w-1 h-1 rounded-full bg-primary-400" />
            <span>Download gratuito</span>
            <span className="w-1 h-1 rounded-full bg-primary-400" />
            <span>Sem registro</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Categorias */}
        <section className="py-12">
          <h2 className="section-title mb-8">Explorar por categoria</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {Object.entries(PARENT_CATEGORIES).map(([name, { slug, icon }]) => (
              <Link
                key={slug}
                href={`/categoria/${slug}`}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-700">{name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Fontes populares */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Fontes Populares</h2>
              <p className="text-gray-500 text-sm mt-1">As mais baixadas de todos os tempos</p>
            </div>
            <Link href="/top" className="text-primary-600 hover:text-primary-700 text-sm font-semibold hover:underline">
              Ver todas &rarr;
            </Link>
          </div>
          <div className="grid gap-3">
            {popularFonts.map((font) => (
              <FontCard key={font.id} font={font} />
            ))}
          </div>
        </section>

        {/* Fontes novas */}
        <section className="py-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Fontes Novas</h2>
              <p className="text-gray-500 text-sm mt-1">Últimas fontes adicionadas</p>
            </div>
            <Link href="/novas" className="text-primary-600 hover:text-primary-700 text-sm font-semibold hover:underline">
              Ver todas &rarr;
            </Link>
          </div>
          <div className="grid gap-3">
            {newFonts.map((font) => (
              <FontCard key={font.id} font={font} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
