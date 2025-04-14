import { Button } from "../components/ui/button"

export default function Diagnostic() {
  const handleDiagnosticoClick = () => {
    // Rola até a seção de contato
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })

      // Aguarda a animação de scroll
      setTimeout(() => {
        // Preenche o campo de mensagem
        const messageInput = document.getElementById(
          "message"
        ) as HTMLTextAreaElement
        if (messageInput) {
          messageInput.value =
            "Solicito meu diagnóstico gratuito de marketing digital"
          // Dispara o evento de change para atualizar o estado do formulário
          const event = new Event("change", { bubbles: true })
          messageInput.dispatchEvent(event)
        }
      }, 500)
    }
  }

  return (
    <section
      id="diagnostic"
      className="py-20 inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10 text-center"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="mt-8 text-4xl font-bold text-secondary mb-4">
          Diagnóstico de Marketing Digital
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Descubra os pontos fortes e fracos da sua presença digital e
          transforme suas ideias em soluções inteligentes.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="font-semibold  text-secondary  text-xl mb-2">
              🎯 Definir Objetivos
            </h3>
            <p className="text-sm text-gray-600">
              Entenda para onde sua empresa quer ir.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="font-semibold  text-secondary text-xl mb-2">
              📥 Coleta de Dados
            </h3>
            <p className="text-sm text-gray-600">
              Reunimos informações sobre mercado e concorrência.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="font-semibold  text-secondary  text-xl mb-2">
              🌐 Presença Online
            </h3>
            <p className="text-sm text-gray-600">
              Analisamos seu site, redes e SEO.
            </p>
          </div>
          <div className="p-4 bg-white shadow rounded-2xl">
            <h3 className="font-semibold  text-secondary  text-xl mb-2">
              📊 Análise Estratégica
            </h3>
            <p className="text-sm text-gray-600">
              Identificamos oportunidades de crescimento.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="text-lg px-8"
          onClick={handleDiagnosticoClick}
        >
          Quero meu diagnóstico gratuito
        </Button>
      </div>
    </section>
  )
}
