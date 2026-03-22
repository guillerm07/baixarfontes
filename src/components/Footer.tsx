import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <Logo variant="footer" />
            </div>
            <p className="text-sm leading-relaxed">
              Baixe milhares de fontes tipográficas grátis para seus projetos de design, logos, web e muito mais.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/top" className="hover:text-white transition-colors">Fontes populares</Link></li>
              <li><Link href="/novas" className="hover:text-white transition-colors">Fontes novas</Link></li>
              <li><Link href="/fontes" className="hover:text-white transition-colors">Todas as fontes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categorias</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/categoria/fantasia" className="hover:text-white transition-colors">Fantasia</Link></li>
              <li><Link href="/categoria/script" className="hover:text-white transition-colors">Script</Link></li>
              <li><Link href="/categoria/gotico" className="hover:text-white transition-colors">Gótico</Link></li>
              <li><Link href="/categoria/tecno" className="hover:text-white transition-colors">Tecno</Link></li>
              <li><Link href="/categoria/basico" className="hover:text-white transition-colors">Básico</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Informações</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sobre-nos" className="hover:text-white transition-colors">Sobre nós</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/licencas" className="hover:text-white transition-colors">Licenças</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso legal</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/politica-cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} BaixarFontes.com &mdash; Fontes tipográficas grátis para todos</p>
        </div>
      </div>
    </footer>
  );
}
