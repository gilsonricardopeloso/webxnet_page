import { Handler } from '@netlify/functions'
import axios from 'axios'

const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    // CORS preflight
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { name, email, message, phone, company, address } = body

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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: true, data: response.data }),
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: "Erro ao processar formulário",
        details: error.response?.data || error.message,
      }),
    }
  }
}

export { handler } 