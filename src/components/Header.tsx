import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-1">
            {[
              { href: "/top", label: "Top" },
              { href: "/novas", label: "Novas" },
              { href: "/fontes", label: "A-Z" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
