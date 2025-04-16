import { useState } from "react"
import { Button } from "./ui/button"

interface HeroProps {
  onConsultoriaClick: (message: string) => void
}

const Hero = ({ onConsultoriaClick }: HeroProps) => {
  const handleClick = () => {
    onConsultoriaClick("Gostaria de agendar uma consultoria gratuita.")
  }

  return (
    <main id="main-content" className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary animate-fade-in"
            aria-label="Transformando Ideias em Soluções Digitais Inteligentes"
          >
            Transformando Ideias em
            <span className="text-primary block mt-2">Soluções Digitais</span>
            <span className="text-blue-600 block mt-2">Inteligentes</span>
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl text-gray-800 max-w-3xl mx-auto animate-slide-in"
            aria-label="Use IA especializada no seu setor para automatizar processos e reduzir custos operacionais em 40%."
          >
            Use IA especializada no seu setor para automatizar processos e
            reduzir custos operacionais em 40%.
          </p>
          <div
            className="mt-10 animate-slide-in"
            role="region"
            aria-label="Chamada para ação"
          >
            <Button
              onClick={handleClick}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Agende uma consultoria gratuita"
            >
              Agende uma consultoria gratuita →
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
