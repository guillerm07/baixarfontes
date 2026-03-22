import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça o BaixarFontes.com, sua fonte de confiança para baixar milhares de fontes tipográficas grátis.",
  alternates: { canonical: "/sobre-nos" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sobre Nós</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          <strong>BaixarFontes.com</strong> nasceu com uma missão simples: tornar as fontes
          tipográficas acessíveis para todos. Sabemos como é importante encontrar a fonte
          perfeita para um projeto de design, um logo, um site ou qualquer criação visual.
        </p>

        <p>
          Oferecemos um catálogo de mais de <strong>98.000 fontes tipográficas</strong> organizadas
          em categorias para que você encontre facilmente o que precisa: desde fontes clássicas
          e elegantes até tipografias modernas, góticas, fantasia ou script.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Nossa missão</h2>
        <p>
          Queremos ser o recurso de referência em português para o download de fontes
          tipográficas. Nos esforçamos para oferecer:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Um catálogo extenso e bem organizado por categorias.</li>
          <li>Pré-visualizações claras de cada fonte.</li>
          <li>Informações sobre as licenças de cada tipografia.</li>
          <li>Uma experiência de navegação rápida e sem complicações.</li>
          <li>Um site que respeita a sua privacidade.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Licenças</h2>
        <p>
          Cada fonte disponível no BaixarFontes tem sua própria licença estabelecida pelo seu
          autor. Recomendamos sempre verificar a licença antes de utilizar uma fonte em
          um projeto comercial. Você pode consultar mais detalhes em nossa página de{" "}
          <a href="/licencas" className="text-primary-600 hover:underline">
            Licenças
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Contato</h2>
        <p>
          Tem alguma pergunta, sugestão ou quer reportar um problema? Não hesite em
          nos escrever através da nossa página de{" "}
          <a href="/contato" className="text-primary-600 hover:underline">
            Contato
          </a>.
        </p>
      </div>
    </div>
  );
}
