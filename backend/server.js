const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

// Função auxiliar para enviar dados ao Mailchimp via POST
const sendToMailchimp = async (data) => {
  try {
    const response = await axios.post(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        email_address: data.email.toLowerCase(),
        status: "subscribed",
        merge_fields: {
          FNAME: data.name,
          PHONE: data.phone || "",
          COMPANY: data.company || "",
          ADDRESS: {
            addr1: data.address.add1,
            addr2: data.address.add2,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
            country: data.address.country,
          },
          MESSAGE: data.message,
        },
      },
      {
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
      }
    )
    return response.data
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error("Dados inválidos")
    }
    if (error.response?.status === 409) {
      throw new Error("Email já cadastrado")
    }
    throw error
  }
}

// Função auxiliar para atualizar dados no Mailchimp via PUT
const updateMailchimpContact = async (data) => {
  try {
    const subscriberHash = Buffer.from(data.email.toLowerCase()).toString(
      "base64"
    )
    const response = await axios.put(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
      {
        email_address: data.email.toLowerCase(),
        status: "subscribed",
        merge_fields: {
          FNAME: data.name,
          PHONE: data.phone || "",
          COMPANY: data.company || "",
          ADDRESS: {
            addr1: data.address.add1,
            addr2: data.address.add2,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
            country: data.address.country,
          },
          MESSAGE: data.message,
        },
      },
      {
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
      }
    )
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Contato não encontrado")
    }
    if (error.response?.status === 400) {
      throw new Error("Dados inválidos")
    }
    if (error.response?.status === 409) {
      throw new Error("Email já cadastrado para outro contato")
    }
    throw error
  }
}

// Rota para o formulário de contato
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Campos obrigatórios não preenchidos",
        details: "Nome, email e mensagem são obrigatórios",
      })
    }

    const result = await sendToMailchimp({
      name,
      email,
      message,
      phone,
      company,
      address,
    })

    res.json({ success: true, data: result })
  } catch (error) {
    console.error("Erro ao processar formulário:", error)
    if (error.message === "Dados inválidos") {
      return res.status(400).json({
        error: "Dados inválidos",
        details: "Verifique os dados enviados",
      })
    }
    if (error.message === "Email já cadastrado") {
      return res.status(409).json({
        error: "Email já cadastrado",
        details: "Este email já está cadastrado em nossa lista",
      })
    }
    res.status(500).json({
      error: "Erro no servidor",
      details: "Ocorreu um erro ao processar sua solicitação",
    })
  }
})

// Rota para atualizar contato existente
app.put("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Campos obrigatórios não preenchidos",
        details: "Nome, email e mensagem são obrigatórios",
      })
    }

    const result = await updateMailchimpContact({
      name,
      email,
      message,
      phone,
      company,
      address,
    })

    res.json({ success: true, data: result })
  } catch (error) {
    console.error("Erro ao atualizar contato:", error)
    if (error.message === "Contato não encontrado") {
      return res.status(404).json({
        error: "Contato não encontrado",
        details: "O contato não foi encontrado para atualização",
      })
    }
    if (error.message === "Dados inválidos") {
      return res.status(400).json({
        error: "Dados inválidos",
        details: "Verifique os dados enviados",
      })
    }
    if (error.message === "Email já cadastrado para outro contato") {
      return res.status(409).json({
        error: "Email já cadastrado",
        details: "Este email já está cadastrado para outro contato",
      })
    }
    res.status(500).json({
      error: "Erro no servidor",
      details: "Ocorreu um erro ao processar sua solicitação",
    })
  }
})

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ message: "API funcionando!" })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
