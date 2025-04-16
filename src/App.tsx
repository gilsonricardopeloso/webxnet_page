import { useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "./components/ui/tooltip"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Diagnostic from "./components/Diagnostic"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const queryClient = new QueryClient()

export default function App() {
  const [initialMessage, setInitialMessage] = useState("")

  const handleDiagnosticClick = (message: string) => {
    setInitialMessage(message)
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleConsultoriaClick = (message: string) => {
    setInitialMessage(message)
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Hero onConsultoriaClick={handleConsultoriaClick} />
              <Services />
              <About />
              <Diagnostic onDiagnosticClick={handleDiagnosticClick} />
              <Contact initialMessage={initialMessage} />
              <Footer />
              <Toaster />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
