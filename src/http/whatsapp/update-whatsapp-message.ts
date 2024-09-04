import { api } from '../api-client'

interface UpdateWhatsappMessageRequest {
  chargeMessage: string
  payMessage: string
  payOffMessage: string
}

export async function updateWhatsappMessage(
  props: UpdateWhatsappMessageRequest,
) {
  const result = await api
    .patch('configurations/whatsapp-messages', {
      json: props,
    })
    .json()

  return result
}
