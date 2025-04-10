import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const sendContactForm = async (formData: {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  address?: string
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, formData)
    return response.data
  } catch (error) {
    console.error("Erro ao enviar formulário:", error)
    throw error
  }
}
