import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licenças de Fontes",
  description:
    "Informações sobre as licenças das fontes tipográficas disponíveis no BaixarFontes.com. Entenda os tipos de licença antes de usar as fontes.",
  alternates: { canonical: "/licencas" },
};

export default function LicensesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Licenças de Fontes</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          As fontes disponíveis no BaixarFontes.com são propriedade de seus respectivos autores.
          Cada fonte tem sua própria licença que determina como pode ser utilizada. É
          responsabilidade do utilizador verificar a licença antes de usar uma fonte.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Tipos de licença comuns</h2>

        <div className="space-y-6 not-prose">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-green-800 mb-2">100% Grátis</h3>
            <p className="text-sm text-green-700">
              A fonte é completamente gratuita para uso pessoal e comercial. Não é necessária
              atribuição nem pagamento algum.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-blue-800 mb-2">Grátis para uso pessoal</h3>
            <p className="text-sm text-blue-700">
              A fonte pode ser usada livremente em projetos pessoais. Para uso comercial
              (logos, produtos, sites comerciais, etc.) é necessário adquirir uma
              licença do autor.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-purple-800 mb-2">Domínio público / GPL / OFL</h3>
            <p className="text-sm text-purple-700">
              Fontes sob licenças de código aberto como SIL Open Font License (OFL),
              GNU GPL ou em domínio público. Geralmente permitem uso livre, modificação
              e redistribuição.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-yellow-800 mb-2">Donationware / Shareware</h3>
            <p className="text-sm text-yellow-700">
              O autor solicita uma doação ou contribuição voluntária pelo uso da fonte.
              Embora o download seja gratuito, agradece-se a contribuição ao criador.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-orange-800 mb-2">Demo / Versão de teste</h3>
            <p className="text-sm text-orange-700">
              A fonte é uma versão de demonstração com caracteres limitados. Para obter
              a versão completa é necessário adquirir a licença.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Recomendações</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Verifique sempre a licença</strong> de cada fonte antes de usá-la em um
            projeto, especialmente se for de caráter comercial.
          </li>
          <li>
            <strong>Consulte o autor</strong> se tiver dúvidas sobre o que a licença permite.
            As informações de contato do autor geralmente estão incluídas nos arquivos da fonte.
          </li>
          <li>
            <strong>Respeite a atribuição</strong> quando a licença exigir. Muitos autores
            apenas pedem para serem mencionados como criadores.
          </li>
          <li>
            <strong>Não redistribua</strong> fontes como próprias. Respeite sempre a autoria
            original.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Isenção de responsabilidade</h2>
        <p>
          BaixarFontes.com atua como plataforma de distribuição e não se responsabiliza pelo
          uso que o utilizador faça das fontes baixadas. A informação de licença
          apresentada é obtida das fontes originais e pode não estar atualizada. Em caso
          de dúvida, entre em contato diretamente com o autor da fonte.
        </p>
        <p>
          Se você é o autor de uma fonte e a informação de licença apresentada está incorreta,
          ou se deseja que sua fonte seja removida do site, por favor{" "}
          <a href="/contato" className="text-primary-600 hover:underline">
            entre em contato
          </a>.
        </p>
      </div>
    </div>
  );
}
