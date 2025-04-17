import express, { Request, Response } from "express"
import cors from "cors"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Tipagem para o corpo do formulário
interface ContactRequestBody {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  address?: {
    add1?: string
    add2?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
}

// Rota para o formulário de contato
app.post("/api/contact", async (req: Request<object, object, ContactRequestBody>, res: Response) => {
  try {
    const { name, email, message, phone, company, address } = req.body

    // Configuração do Mailchimp
    const mailchimpConfig = {
      apiKey: process.env.MAILCHIMP_API_KEY as string,
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX as string,
      listId: process.env.MAILCHIMP_LIST_ID as string,
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
          ADDRESS: {
            addr1: address?.add1 || "",
            addr2: address?.add2 || "",
            city: address?.city || "",
            state: address?.state || "",
            zip: address?.zip || "",
            country: address?.country || "",
          },
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
  } catch (error: unknown) {
    console.error("Erro ao processar formulário:", error)
    const err = error as { response?: { data?: unknown }, message?: string }
    res.status(500).json({
      success: false,
      error: "Erro ao processar formulário",
      details: err.response?.data || err.message,
    })
  }
})

// Rota de teste
app.get("/api/test", (_req: Request, res: Response) => {
  res.json({ message: "API funcionando!" })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
}) 