import Link from "next/link";
import type { Font } from "@prisma/client";
import { FontCardPreview } from "./FontCardPreview";

export function FontCard({ font }: { font: Font }) {
  return (
    <div className="font-card group">
      {/* Preview area */}
      <Link href={`/fonte/${font.slug}`} className="block mb-4">
        <FontCardPreview slug={font.slug} name={font.name} />
      </Link>

      {/* Info row */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            href={`/fonte/${font.slug}`}
            className="font-semibold text-gray-900 hover:text-primary-600 truncate block transition-colors"
          >
            {font.name}
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            {font.authorName && (
              <Link
                href={`/autor/${font.authorSlug}`}
                className="hover:text-primary-600 transition-colors"
              >
                {font.authorName}
              </Link>
            )}
            {font.license && (
              <>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span>{font.license}</span>
              </>
            )}
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
            <span>{font.downloadsTotal.toLocaleString("pt-BR")} downloads</span>
          </div>
        </div>

        <Link
          href={`/api/download/${font.slug}`}
          className="shrink-0 bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 active:bg-emerald-700 transition-all shadow-sm hover:shadow"
        >
          Baixar
        </Link>
      </div>
    </div>
  );
}
