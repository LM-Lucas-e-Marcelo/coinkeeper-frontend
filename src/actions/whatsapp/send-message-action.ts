'use server'

import { sendMessage } from '@/http/whatsapp/send-message'
import { HTTPError } from 'ky'

export async function sendMessageAction(data: number[]) {
  try {
    await sendMessage(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Mensagens enviadas com sucesso',
    errors: null,
  }
}
