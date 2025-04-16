import { useState } from "react"
import { Button } from "./ui/button"

interface DiagnosticProps {
  onDiagnosticClick: (message: string) => void
}

const Diagnostic = ({ onDiagnosticClick }: DiagnosticProps) => {
  const [initialMessage, setInitialMessage] = useState("")

  const handleDiagnosticoClick = () => {
    setInitialMessage("Gostaria de receber um diagnóstico gratuito de marketing digital.")
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleClick = () => {
    onDiagnosticClick("Gostaria de receber um diagnóstico gratuito de marketing digital.")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
            Diagnóstico Gratuito de Marketing Digital
          </h2>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto mb-8">
            Receba uma análise completa do seu negócio e descubra como melhorar
            sua presença digital.
          </p>
          <Button
            onClick={handleClick}
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Solicitar diagnóstico gratuito"
          >
            Solicitar diagnóstico gratuito →
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Diagnostic
