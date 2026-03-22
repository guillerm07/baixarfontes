import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o BaixarFontes.com. Escreva-nos para qualquer consulta, sugestão ou reclamação.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contato</h1>
      <p className="text-gray-600 mb-8">
        Tem alguma dúvida, sugestão ou quer reportar um problema? Preencha o formulário
        e responderemos o mais breve possível.
      </p>

      <ContactForm />

      <div className="mt-12 prose prose-gray max-w-none space-y-4 text-sm leading-relaxed text-gray-700">
        <h2 className="text-xl font-semibold text-gray-900">Motivos frequentes de contato</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Problemas com uma fonte:</strong> se um arquivo não é baixado corretamente
            ou está corrompido, indique-nos o nome da fonte e o problema.
          </li>
          <li>
            <strong>Reclamações de direitos autorais:</strong> se você é o autor de uma fonte
            e deseja que ela seja removida, escreva-nos indicando a fonte e sua credencial.
          </li>
          <li>
            <strong>Sugestões:</strong> estamos abertos a melhorias. Se você tem ideias, queremos
            ouvi-las.
          </li>
          <li>
            <strong>Proteção de dados:</strong> para exercer seus direitos consulte nossa{" "}
            <a href="/politica-privacidade" className="text-primary-600 hover:underline">
              Política de Privacidade
            </a>.
          </li>
        </ul>
      </div>
    </div>
  );
}
