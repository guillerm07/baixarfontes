import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: "noindex",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Em cumprimento do Regulamento (UE) 2016/679 Geral de Proteção de Dados (RGPD)
          e da Lei n.º 58/2019, de 8 de agosto (Lei de Proteção de Dados Pessoais),
          informamos sobre o tratamento dos seus dados pessoais.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Responsável pelo tratamento</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Identidade:</strong> Woodsearch SL</li>
          <li><strong>CIF:</strong> B19905918</li>
          <li><strong>Endereço:</strong> Avenida Eduardo García Maroto, 2 - Entr, 23007 Jaén</li>
          <li><strong>Correio eletrónico:</strong> contato@baixarfontes.com</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Dados que recolhemos</h2>
        <p>BaixarFontes.com recolhe os seguintes dados:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dados de navegação:</strong> endereço IP (anonimizado), tipo de navegador, sistema operativo, páginas visitadas, data e hora de acesso.</li>
          <li><strong>Dados de contato:</strong> quando nos envia uma mensagem através do formulário de contato, recolhemos o seu nome e endereço de correio eletrónico.</li>
          <li><strong>Dados de uso:</strong> estatísticas agregadas sobre downloads de fontes e uso do site.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Finalidade do tratamento</h2>
        <p>Os dados são tratados com as seguintes finalidades:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Fornecer e manter o serviço de download de fontes.</li>
          <li>Responder a consultas realizadas através do formulário de contato.</li>
          <li>Elaborar estatísticas de uso agregadas e anónimas para melhorar o serviço.</li>
          <li>Garantir a segurança do site e prevenir usos fraudulentos.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Base legal do tratamento</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Consentimento:</strong> para o uso de cookies não essenciais (Art. 6.1.a RGPD).</li>
          <li><strong>Interesse legítimo:</strong> para o funcionamento do site, a segurança e as estatísticas agregadas (Art. 6.1.f RGPD).</li>
          <li><strong>Execução de contrato:</strong> para a prestação do serviço solicitado (Art. 6.1.b RGPD).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Destinatários dos dados</h2>
        <p>
          Os seus dados pessoais não serão cedidos a terceiros, salvo obrigação legal.
          Apenas poderão ter acesso aos dados os prestadores de serviços que
          atuem como subcontratantes do tratamento (alojamento, analítica) e com os quais
          foi celebrado o correspondente contrato de subcontratação de tratamento.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Prazo de conservação</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dados de navegação:</strong> conservados de forma anonimizada e agregada.</li>
          <li><strong>Dados de contato:</strong> conservados durante o tempo necessário para atender a consulta e um máximo de 12 meses adicionais.</li>
          <li><strong>Cookies:</strong> conforme indicado na <a href="/politica-cookies" className="text-primary-600 hover:underline">Política de Cookies</a>.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Direitos do utilizador</h2>
        <p>Pode exercer os seguintes direitos dirigindo-se a contato@baixarfontes.com:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Acesso:</strong> saber que dados pessoais seus tratamos.</li>
          <li><strong>Retificação:</strong> solicitar a correção de dados inexatos.</li>
          <li><strong>Eliminação:</strong> solicitar a eliminação dos seus dados ("direito ao esquecimento").</li>
          <li><strong>Limitação:</strong> solicitar a limitação do tratamento dos seus dados.</li>
          <li><strong>Portabilidade:</strong> receber os seus dados num formato estruturado.</li>
          <li><strong>Oposição:</strong> opor-se ao tratamento dos seus dados.</li>
          <li><strong>Revogação do consentimento:</strong> retirar o seu consentimento a qualquer momento.</li>
        </ul>
        <p>
          Tem igualmente o direito de apresentar uma reclamação junto da Comissão Nacional de
          Proteção de Dados (CNPD) em <a href="https://www.cnpd.pt" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a> se
          considerar que os seus direitos não foram devidamente atendidos.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Medidas de segurança</h2>
        <p>
          Adotámos as medidas técnicas e organizativas necessárias para garantir
          a segurança dos seus dados pessoais, incluindo cifra de comunicações (HTTPS),
          controlo de acesso e cópias de segurança periódicas.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">9. Modificações</h2>
        <p>
          Reservamo-nos o direito de modificar esta política de privacidade para adaptá-la
          a novidades legislativas ou jurisprudenciais. As alterações serão publicadas nesta
          mesma página.
        </p>

        <p className="text-gray-500 mt-8">Última atualização: fevereiro de 2026</p>
      </div>
    </div>
  );
}
