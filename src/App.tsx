import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/index"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Notifications */}
      <div aria-live="polite" aria-atomic="true">
        <Toaster />
        <Sonner />
      </div>

      <BrowserRouter>
        <div lang="pt-BR">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
