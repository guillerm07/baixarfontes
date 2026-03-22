"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/pesquisar?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <svg
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors ${large ? "w-5 h-5 left-4" : "w-4 h-4 left-3"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar entre 98.000+ fontes..."
          className={`w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white outline-none transition-all ${
            large
              ? "pl-12 pr-28 py-4 text-lg"
              : "pl-10 pr-20 py-2.5 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 active:bg-primary-800 transition-all ${
            large ? "px-6 py-2.5 text-base" : "px-4 py-1.5 text-sm"
          }`}
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}
