"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary-600 mb-4">Error</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Algo deu errado
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-2.5 rounded-lg"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}
