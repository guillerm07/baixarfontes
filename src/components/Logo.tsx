import Link from "next/link";

export function Logo({ variant = "default" }: { variant?: "default" | "footer" }) {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Icon mark */}
      <div
        className={`flex items-center justify-center rounded-xl font-black italic transition-transform group-hover:scale-105 ${
          isFooter
            ? "w-9 h-9 text-lg bg-primary-500 text-white"
            : "w-9 h-9 text-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-sm"
        }`}
      >
        Bf
      </div>

      {/* Wordmark */}
      <div className="flex items-baseline gap-0">
        <span
          className={`text-xl font-extrabold tracking-tight ${
            isFooter ? "text-primary-400" : "text-primary-600 group-hover:text-primary-700"
          } transition-colors`}
        >
          Baixar
        </span>
        <span
          className={`text-xl font-extrabold tracking-tight ${
            isFooter ? "text-white" : "text-gray-900"
          }`}
        >
          Fontes
        </span>
      </div>
    </Link>
  );
}
