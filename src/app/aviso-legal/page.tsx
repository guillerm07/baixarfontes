import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: "noindex",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Aviso Legal</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Em cumprimento do Decreto-Lei n.º 7/2004, de 7 de janeiro, relativo ao comércio
          eletrónico (Lei do Comércio Eletrónico), informamos os seguintes dados:
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Dados identificativos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Titular:</strong> Woodsearch SL</li>
          <li><strong>CIF:</strong> B19905918</li>
          <li><strong>Domicílio:</strong> Avenida Eduardo García Maroto, 2 - Entr, 23007 Jaén</li>
          <li><strong>Correio eletrónico:</strong> contato@baixarfontes.com</li>
          <li><strong>Site:</strong> https://baixarfontes.com</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Objeto</h2>
        <p>
          BaixarFontes.com é um site que oferece o download gratuito de fontes tipográficas.
          As fontes disponíveis neste site foram recolhidas de fontes públicas e são
          distribuídas sob as licenças indicadas em cada fonte individual.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Propriedade intelectual e industrial</h2>
        <p>
          O design do site, o seu código-fonte, os logos, textos e gráficos são propriedade
          do titular ou existe a licença correspondente para o seu uso. É proibida
          a reprodução total ou parcial do site sem autorização expressa.
        </p>
        <p>
          As fontes tipográficas disponíveis para download são propriedade dos seus respetivos
          autores e são distribuídas sob as licenças que cada autor estabeleceu. O utilizador
          é responsável por verificar e cumprir a licença de cada fonte antes do seu uso.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Condições de uso</h2>
        <p>O utilizador compromete-se a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Fazer um uso adequado e lícito do site.</li>
          <li>Não realizar atividades que possam danificar, inutilizar ou sobrecarregar o site.</li>
          <li>Respeitar as licenças das fontes tipográficas baixadas.</li>
          <li>Não utilizar o site para fins ilícitos ou contrários à ordem pública.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Exclusão de responsabilidade</h2>
        <p>
          O titular não se responsabiliza pelos danos que possam resultar do uso das
          fontes baixadas, incluindo possíveis problemas de compatibilidade, erros nos
          arquivos ou o uso indevido das fontes em relação às suas licenças.
        </p>
        <p>
          O titular reserva-se o direito de modificar o conteúdo do site sem aviso
          prévio, bem como de eliminar, limitar ou impedir o acesso de forma temporária ou
          definitiva.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Links para terceiros</h2>
        <p>
          Este site pode conter links para sites de terceiros. O titular não assume
          responsabilidade pelo conteúdo, políticas de privacidade ou práticas desses
          sites externos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Legislação aplicável e jurisdição</h2>
        <p>
          As presentes condições são regidas pela legislação portuguesa. Para a resolução
          de qualquer controvérsia serão competentes os Tribunais do domicílio
          do titular, salvo se a normativa aplicável dispuser de outra forma.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Normativa aplicável</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Decreto-Lei n.º 7/2004, de 7 de janeiro, relativo ao comércio eletrónico (Lei do Comércio Eletrónico).</li>
          <li>Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho (RGPD).</li>
          <li>Lei n.º 58/2019, de 8 de agosto (Lei de Proteção de Dados Pessoais).</li>
        </ul>

        <p className="text-gray-500 mt-8">Última atualização: fevereiro de 2026</p>
      </div>
    </div>
  );
}
