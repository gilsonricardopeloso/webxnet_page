import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { sendContactForm } from "../lib/api"

type FormData = {
  name: string
  email: string
  address: string
  message: string
  phone?: string
  company?: string
}

type FormErrors = {
  name?: string
  email?: string
  address?: string
  message?: string
  phone?: string
  company?: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  address: "",
  message: "",
  phone: "",
  company: "",
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = "Nome é obrigatório"
  }

  if (!data.email.trim()) {
    errors.email = "Email é obrigatório"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email inválido"
  }

  if (!data.message.trim()) {
    errors.message = "Mensagem é obrigatória"
  }

  if (data.phone && !/^[0-9\s()-]+$/.test(data.phone)) {
    errors.phone = "Telefone inválido"
  }

  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

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
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors = validateForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)

    try {
      await sendContactForm(formData)
      toast.success("Mensagem enviada com sucesso!")
      setFormData(initialFormData)
      setErrors({})
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err)
      toast.error("Ocorreu um erro ao enviar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-white py-16 px-4 md:px-6 lg:px-14"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="contact-heading"
          className="text-3xl font-bold mb-4 text-gray-900"
        >
          Entre em Contato
        </h2>
        <p className="text-gray-600 mb-10">
          Tem alguma dúvida, sugestão ou projeto em mente? Manda pra gente!
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Empresa
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Endereço
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mensagem *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={loading ? "Enviando mensagem..." : "Enviar mensagem"}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </span>
              ) : (
                "Enviar Mensagem"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
