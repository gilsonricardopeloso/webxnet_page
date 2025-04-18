/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUp } from "lucide-react"
import { Button } from "./ui/button"
import Social from "./Social"
import WebxnetLogo from "../../webxnet.svg"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    openCookiebotModal?: () => void
  }
}

const Footer = () => {
  const handleGgsClick = () => {
    window.gtag?.("config", "UA-161023728-1", {
      page_title: "GGS",
      page_path: "/ggsinfo",
    })
  }

  const handleNetlifyClick = () => {
    window.gtag?.("config", "UA-161023728-1", {
      page_title: "Netlify",
      page_path: "/netlify",
    })
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-secondary text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div
              className="w-22 md:w-32 mb-6"
              role="img"
              aria-label="Logo Webxnet"
            >
              <img
                src={WebxnetLogo}
                alt="Webxnet logo"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-md text-center md:text-left">
              Transformando ideias em soluções digitais inteligentes.
            </p>
            <p className="mt-4 text-gray-300 max-w-md text-center md:text-left">
              Use IA especializada no seu setor para automatizar processos e
              reduzir custos operacionais em 40%.
            </p>
            <div className="mt-6">
              <Social />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="mt-4 space-y-2 text-gray-300">
              <p>Email: support@webxnet.com.br</p>
              <p>Tel: (11) 94440-6158</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <div className="mt-4 space-y-2">
              <a
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Sobre
              </a>
              <a
                href="#diagnostic"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Diagnóstico
              </a>
              <a
                href="#services"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Serviços
              </a>
              <a
                href="#contact"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Feito com ❤️ por{" "}
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="https://www.ggsinfo.com.br/"
              onClick={handleGgsClick}
            >
              GGS Informática Ltda.
            </a>{" "}
            Gentilmente hospedado por{" "}
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="https://www.netlify.com"
              onClick={handleNetlifyClick}
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </a>
            .
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Webxnet.</p>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="inline-block bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition-colors text-sm"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              if (typeof window !== "undefined" && window.openCookiebotModal) {
                window.openCookiebotModal()
              }
            }}
          >
            Mostrar os cookies consentidos
          </button>
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-10 right-28 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  )
}

export default Footer
