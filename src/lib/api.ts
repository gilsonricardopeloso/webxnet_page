import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const sendContactForm = async (formData: {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  address?: {
    add1: string
    add2: string
    city: string
    state: string
    zip: string
    country: string
  }
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, formData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Usuário já cadastrado - retorna um objeto especial para o frontend
      if (error.response?.status === 409) {
        return {
          needsConfirmation: true,
          email: error.response.data.email,
          message: error.response.data.details,
        }
      }
      if (error.response?.status === 400) {
        // Dados inválidos
        if (error.response.data?.error === "Dados inválidos") {
          throw new Error(error.response.data.details)
        }
        // Campos obrigatórios não preenchidos
        if (
          error.response.data?.error === "Campos obrigatórios não preenchidos"
        ) {
          throw new Error(error.response.data.details)
        }
        // Outros erros 400
        throw new Error(
          error.response.data?.details ||
            "Dados inválidos. Por favor, verifique as informações fornecidas."
        )
      }
      if (error.response?.status === 500) {
        throw new Error(
          error.response.data?.details ||
            "Erro no servidor. Por favor, tente novamente mais tarde."
        )
      }
    }
    throw new Error(
      "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
    )
  }
}

export const updateContact = async (formData: {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  address?: {
    add1: string
    add2: string
    city: string
    state: string
    zip: string
    country: string
  }
}) => {
  try {
    // Validação do email
    if (!formData.email || typeof formData.email !== "string") {
      throw new Error("Email inválido")
    }

    // Normaliza o email para lowercase
    const normalizedFormData = {
      ...formData,
      email: formData.email.toLowerCase(),
    }

    console.log("Enviando dados para atualização:", normalizedFormData)
    const response = await axios.put(
      `${API_URL}/api/contact`,
      normalizedFormData
    )
    console.log("Resposta da atualização:", response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro detalhado na atualização:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })

      if (error.response?.status === 404) {
        throw new Error(
          error.response.data?.details ||
            "Contato não encontrado para atualização"
        )
      }
      if (error.response?.status === 400) {
        throw new Error(
          error.response.data?.details || "Dados inválidos para atualização"
        )
      }
      if (error.response?.status === 409) {
        throw new Error(
          error.response.data?.details ||
            "Este email já está cadastrado em nossa lista"
        )
      }
      if (error.response?.status === 500) {
        console.error("Erro detalhado do servidor:", error.response.data)
        throw new Error(
          error.response.data?.details ||
            "Erro no servidor ao atualizar contato"
        )
      }
    }
    console.error("Erro desconhecido:", error)
    throw new Error(
      "Ocorreu um erro ao atualizar o contato. Por favor, tente novamente."
    )
  }
}
