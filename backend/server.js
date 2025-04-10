const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Rota para o formulário de contato
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    // Configuração do Mailchimp
    const mailchimpConfig = {
      apiKey: process.env.MAILCHIMP_API_KEY,
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
      listId: process.env.MAILCHIMP_LIST_ID,
    }

    // Enviar para o Mailchimp
    const response = await axios.post(
      `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.listId}/members`,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          PHONE: phone || "",
          COMPANY: company || "",
          ADDRESS: address || "",
          MESSAGE: message,
        },
      },
      {
        headers: {
          Authorization: `apikey ${mailchimpConfig.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    res.json({ success: true, data: response.data })
  } catch (error) {
    console.error("Erro ao processar formulário:", error)
    res.status(500).json({
      success: false,
      error: "Erro ao processar formulário",
      details: error.response?.data || error.message,
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
