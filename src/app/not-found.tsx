import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-8xl font-bold text-primary-200 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Página não encontrada</h1>
      <p className="text-gray-500 mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          Voltar ao início
        </Link>
        <Link
          href="/fontes"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
        >
          Ver fontes A-Z
        </Link>
      </div>
    </div>
  );
}
