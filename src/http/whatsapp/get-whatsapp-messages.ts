import { api } from '../api-client'

export interface GetWhatsappMessageResponse {
  chargeMessage: string
  payMessage: string
  payOffMessage: string
}

export async function getWhatsappMessage(): Promise<{
  messages: GetWhatsappMessageResponse
}> {
  const result = await api.get(`configurations/whatsapp-messages`, {
    next: {
      tags: ['whatsapp-messages'],
    },
  })

  const messages = await result.json<GetWhatsappMessageResponse>()

  return { messages }
}
