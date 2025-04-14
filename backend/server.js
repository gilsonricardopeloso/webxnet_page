const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Função auxiliar para enviar dados ao Mailchimp via POST
const sendToMailchimp = async (email, data) => {
  const mailchimpConfig = {
    apiKey: process.env.MAILCHIMP_API_KEY,
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
    listId: process.env.MAILCHIMP_LIST_ID,
  }

  const url = `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.listId}/members`
  const headers = {
    Authorization: `apikey ${mailchimpConfig.apiKey}`,
    "Content-Type": "application/json",
  }

  return axios.post(url, data, { headers })
}

// Função auxiliar para atualizar dados no Mailchimp via PUT
const updateMailchimpContact = async (email, data) => {
  const mailchimpConfig = {
    apiKey: process.env.MAILCHIMP_API_KEY,
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
    listId: process.env.MAILCHIMP_LIST_ID,
  }

  // Para PUT, precisamos do subscriber_hash
  const subscriber_hash = Buffer.from(email.toLowerCase()).toString("base64")
  const url = `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.listId}/membersmembers?skip_merge_validation=true/${subscriber_hash}`
  //members?skip_merge_validation=true"
  const headers = {
    Authorization: `apikey ${mailchimpConfig.apiKey}`,
    "Content-Type": "application/json",
  }

  return axios.put(url, data, { headers })
}

// Rota para o formulário de contato
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    // Validação básica dos campos obrigatórios
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios não preenchidos",
        details: "Nome, email e mensagem são campos obrigatórios",
      })
    }

    const mailchimpData = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        PHONE: phone || "",
        COMPANY: company || "",
        ADDRESS: address
          ? {
              addr1: address.add1 || "",
              addr2: address.add2 || "",
              city: address.city || "",
              state: address.state || "",
              zip: address.zip || "",
              country: address.country || "",
            }
          : {},
        MESSAGE: message,
      },
    }

    try {
      const response = await sendToMailchimp(email, mailchimpData)
      res.json({ success: true, data: response.data })
    } catch (mailchimpError) {
      // Se o erro for de usuário já existente, retornamos um status especial
      if (mailchimpError.response?.data?.title === "Member Exists") {
        return res.status(409).json({
          success: false,
          error: "Usuário já cadastrado",
          details: "Este email já está cadastrado em nossa lista",
          email: email,
        })
      }
      throw mailchimpError
    }
  } catch (error) {
    console.error("Erro ao processar formulário:", error)

    // Verifica se é um erro de validação do Mailchimp
    if (error.response?.data?.title === "Invalid Resource") {
      return res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details:
          error.response.data.detail ||
          "Por favor, verifique os dados fornecidos",
      })
    }

    // Erro genérico do servidor
    res.status(500).json({
      success: false,
      error: "Erro no servidor",
      details:
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
    })
  }
})

// Rota para atualizar contato existente
app.put("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    // Validação do email
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        error: "Email inválido",
        details: "O email fornecido é inválido",
      })
    }

    // Converte email para lowercase
    const normalizedEmail = email.toLowerCase()

    console.log("Dados recebidos para atualização:", {
      name,
      email: normalizedEmail,
      message,
      phone,
      company,
      address,
    })

    // Validação básica dos campos obrigatórios
    if (!name || !normalizedEmail || !message) {
      console.log("Campos obrigatórios faltando")
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios não preenchidos",
        details: "Nome, email e mensagem são campos obrigatórios",
      })
    }

    const mailchimpData = {
      email_address: normalizedEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        PHONE: phone || "",
        COMPANY: company || "",
        ADDRESS: address
          ? {
              addr1: address.add1 || "",
              addr2: address.add2 || "",
              city: address.city || "",
              state: address.state || "",
              zip: address.zip || "",
              country: address.country || "",
            }
          : {},
        MESSAGE: message,
      },
    }

    console.log("Dados preparados para o Mailchimp:", mailchimpData)

    try {
      const response = await updateMailchimpContact(
        normalizedEmail,
        mailchimpData
      )
      console.log("Resposta do Mailchimp:", response.data)
      res.json({ success: true, data: response.data })
    } catch (mailchimpError) {
      console.error("Erro detalhado do Mailchimp:", {
        status: mailchimpError.response?.status,
        data: mailchimpError.response?.data,
        message: mailchimpError.message,
      })

      // Se o erro for de contato não encontrado
      if (mailchimpError.response?.status === 404) {
        return res.status(404).json({
          success: false,
          error: "Contato não encontrado",
          details:
            "O contato que você está tentando atualizar não foi encontrado",
        })
      }

      // Se o erro for de dados inválidos
      if (mailchimpError.response?.data?.title === "Invalid Resource") {
        return res.status(400).json({
          success: false,
          error: "Dados inválidos",
          details:
            mailchimpError.response.data.detail ||
            "Por favor, verifique os dados fornecidos",
        })
      }

      // Se o erro for de membro já existente
      if (mailchimpError.response?.data?.title === "Member Exists") {
        return res.status(409).json({
          success: false,
          error: "Usuário já cadastrado",
          details: "Este email já está cadastrado em nossa lista",
          email: normalizedEmail,
        })
      }

      // Se for um erro específico do Mailchimp
      if (mailchimpError.response?.data) {
        return res.status(400).json({
          success: false,
          error: "Erro ao atualizar contato",
          details:
            mailchimpError.response.data.detail || mailchimpError.message,
        })
      }

      throw mailchimpError
    }
  } catch (error) {
    console.error("Erro ao atualizar contato:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    })

    res.status(500).json({
      success: false,
      error: "Erro no servidor",
      details:
        "Ocorreu um erro ao atualizar o contato. Por favor, tente novamente mais tarde.",
    })
  }
})

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ message: "API funcionando!" })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
