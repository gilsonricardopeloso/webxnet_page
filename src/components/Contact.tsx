import { useState, useEffect } from "react"
import { sendContactForm } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog"
import { FormData, initialFormData, validateForm } from "../lib/contact-utils"



export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

// Função para atualizar o estado do formulário quando a mensagem é alterada externamente
useEffect(() => {
    const handleMessageChange = (e: Event) => {
      const target = e.target as HTMLTextAreaElement
      if (target.id === "message") {
        setFormData((prev) => ({ ...prev, message: target.value }))
      }
    }

    const messageInput = document.getElementById("message")
    if (messageInput) {
      messageInput.addEventListener("change", handleMessageChange)
    }

    return () => {
      if (messageInput) {
        messageInput.removeEventListener("change", handleMessageChange)
      }
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1] as keyof FormData["address"]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true)
      try {
        const response = await sendContactForm(formData)
        if (response.success) {
          setShowConfirmation(true)
          setFormData(initialFormData)
        }
      } catch {
        toast({
          title: "Erro",
          description:
            "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Entre em Contato
            </h2>
            <p className="text-gray-600 text-lg">
              Tem alguma dúvida, sugestão ou projeto em mente? Manda pra gente!
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-12 shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <Label htmlFor="name" className="text-base text-gray-800 font-medium">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`h-12 text-base bg-[#eff6ff] ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="email" className="text-base text-gray-800 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`h-12 text-base bg-[#eff6ff] ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="phone" className="text-base text-gray-800 font-medium">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className={`h-12 text-base bg-[#eff6ff] ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="company" className="text-base text-gray-800 font-medium">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="space-y-0.5 md:col-span-4">
                  <Label htmlFor="address.add1" className="text-base text-gray-800 font-medium">Rua, número</Label>
                  <Input
                    id="address.add1"
                    name="address.add1"
                    value={formData.address.add1}
                    onChange={handleChange}
                    placeholder="Rua, número"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>

                <div className="space-y-0.5 md:col-span-2">
                  <Label htmlFor="address.add2" className="text-base text-gray-800 font-medium">Complemento</Label>
                  <Input
                    id="address.add2"
                    name="address.add2"
                    value={formData.address.add2}
                    onChange={handleChange}
                    placeholder="Complemento"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>

                <div className="space-y-0.5 md:col-span-2">
                  <Label htmlFor="address.city" className="text-base text-gray-800 font-medium">Cidade</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="Cidade"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>

                <div className="space-y-0.5 md:col-span-1">
                  <Label htmlFor="address.state" className="text-base text-gray-800 font-medium">Estado</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="Estado"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>

                <div className="space-y-0.5 md:col-span-2">
                  <Label htmlFor="address.zip" className="text-base text-gray-800 font-medium">CEP</Label>
                  <Input
                    id="address.zip"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    placeholder="00000-000"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>

                <div className="space-y-0.5 md:col-span-1">
                  <Label htmlFor="address.country" className="text-base text-gray-800 font-medium">País</Label>
                  <Input
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    placeholder="País"
                    defaultValue="Brazil"
                    className="h-12 text-base bg-[#eff6ff]"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <Label htmlFor="message" className="text-base text-gray-800 font-medium">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem"
                  className={`min-h-[100px] text-base bg-[#eff6ff] ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white" 
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mensagem Enviada!</AlertDialogTitle>
            <AlertDialogDescription>
              Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
