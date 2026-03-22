import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: "noindex",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Em cumprimento do Decreto-Lei n.º 7/2004, de 7 de janeiro, relativo ao comércio
          eletrónico (Lei do Comércio Eletrónico) e do Regulamento (UE) 2016/679 (RGPD),
          informamos sobre o uso de cookies no BaixarFontes.com.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">1. O que são cookies?</h2>
        <p>
          Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo quando
          visita um site. Permitem ao site lembrar as suas ações e preferências durante
          um período de tempo, de modo que não tenha de os introduzir novamente cada vez que
          visita o site ou navega de uma página para outra.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Cookies que utilizamos</h2>

        <h3 className="text-lg font-semibold text-gray-900 mt-6">2.1. Cookies técnicos (estritamente necessários)</h3>
        <p>Estes cookies são essenciais para o funcionamento do site e não requerem consentimento.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left border-b">Cookie</th>
                <th className="px-3 py-2 text-left border-b">Finalidade</th>
                <th className="px-3 py-2 text-left border-b">Duração</th>
                <th className="px-3 py-2 text-left border-b">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b font-mono">cookie_consent</td>
                <td className="px-3 py-2 border-b">Armazena as preferências de cookies do utilizador</td>
                <td className="px-3 py-2 border-b">12 meses</td>
                <td className="px-3 py-2 border-b">Próprio</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-6">2.2. Cookies analíticos</h3>
        <p>
          Estes cookies permitem-nos contabilizar o número de visitas e fontes de tráfego
          para poder medir e melhorar o desempenho do nosso site. Toda a informação
          que estes cookies recolhem é agregada e, portanto, anónima.
        </p>
        <p>
          Estes cookies só são instalados com o seu consentimento prévio.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Gestão de cookies</h2>
        <p>
          Ao aceder ao nosso site pela primeira vez, será apresentado um banner informativo
          sobre o uso de cookies onde poderá:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Aceitar</strong> todos os cookies.</li>
          <li><strong>Rejeitar</strong> os cookies não essenciais.</li>
          <li><strong>Configurar</strong> as suas preferências por categoria.</li>
        </ul>
        <p>
          Pode modificar as suas preferências a qualquer momento clicando no link
          &quot;Configuração de cookies&quot; no rodapé do site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Como eliminar cookies do navegador</h2>
        <p>
          Além do painel de configuração de cookies do nosso site, pode gerir
          os cookies diretamente a partir do seu navegador:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Chrome:</strong> Definições &gt; Privacidade e segurança &gt; Cookies</li>
          <li><strong>Firefox:</strong> Opções &gt; Privacidade e segurança &gt; Cookies</li>
          <li><strong>Safari:</strong> Preferências &gt; Privacidade &gt; Gerir dados de sites</li>
          <li><strong>Edge:</strong> Definições &gt; Privacidade &gt; Cookies</li>
        </ul>
        <p>
          Tenha em conta que a desativação de cookies pode afetar a funcionalidade do site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Duração do consentimento</h2>
        <p>
          O seu consentimento sobre cookies tem uma validade máxima de 24 meses. Decorrido
          este período, voltaremos a solicitar o seu consentimento.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Atualização da política</h2>
        <p>
          Esta política pode ser atualizada periodicamente. Recomendamos que a consulte
          com regularidade. Qualquer alteração será publicada nesta página.
        </p>

        <p className="text-gray-500 mt-8">Última atualização: fevereiro de 2026</p>
      </div>
    </div>
  );
}
