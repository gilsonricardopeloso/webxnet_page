import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary"
      >
        Pular para o conteúdo principal
      </a>

      <nav
        className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm"
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className="text-2xl font-bold text-primary"
                aria-label="Webxnet - Página inicial"
              >
                Webxnet
              </a>
            </div>

            {/* Desktop Menu */}
            <div
              className="hidden md:flex items-center space-x-8"
              role="menubar"
            >
              <a
                href="#about"
                className="text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                role="menuitem"
              >
                Sobre
              </a>
              <a
                href="#diagnostic"
                className="text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                role="menuitem"
              >
                Diagnóstico
              </a>
              <a
                href="#services"
                className="text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                role="menuitem"
              >
                Serviços
              </a>
              <a
                href="#contact"
                className="text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
                role="menuitem"
              >
                Contato
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-secondary p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden ${isOpen ? "block" : "hidden"}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#about"
                className="block px-3 py-2 text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#diagnostic"
                className="block px-3 py-2 text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Diagnóstico
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Serviços
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
