import axios from "axios"
import { FormData } from "./contact-utils"

const API_URL = "/api"

export const sendContactForm = async (data: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, {
      ...data,
      email: data.email.toLowerCase(),
      address: data.address,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error("Este email já está cadastrado")
      }
      if (error.response?.status === 400) {
        throw new Error("Dados inválidos. Por favor, verifique os campos.")
      }
    }
    throw new Error("Erro ao enviar formulário. Tente novamente mais tarde.")
  }
}

export const updateContact = async (data: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/contact`, {
      ...data,
      email: data.email.toLowerCase(),
      address: data.address,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Contato não encontrado")
      }
      if (error.response?.status === 400) {
        throw new Error("Dados inválidos. Por favor, verifique os campos.")
      }
      if (error.response?.status === 409) {
        throw new Error("Este email já está cadastrado para outro contato")
      }
    }
    throw new Error("Erro ao atualizar contato. Tente novamente mais tarde.")
  }
}
