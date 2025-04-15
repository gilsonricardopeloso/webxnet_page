export interface FormData {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  address: {
    add1: string
    add2: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  address: {
    add1: "",
    add2: "",
    city: "",
    state: "",
    zip: "",
    country: "Brazil",
  },
}

export const validateForm = (data: FormData): Partial<FormData> => {
  const errors: Partial<FormData> = {}

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
