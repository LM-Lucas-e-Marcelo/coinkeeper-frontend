'use server'

import { updateWhatsappMessage } from '@/http/whatsapp/update-whatsapp-message'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateWhatsappMessageActionSchema = z.object({
  chargeMessage: z
    .string()
    .min(1, { message: 'Mensagem de cobrança é obrigatório' }),
  payMessage: z
    .string()
    .min(1, { message: 'Mensagem de pagamento é obrigatório' }),
  payOffMessage: z
    .string()
    .min(1, { message: 'Mensagem de quitação é obrigatório' }),
})

export async function updateWhatsappMessageAction(data: FormData) {
  const result = updateWhatsappMessageActionSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { chargeMessage, payOffMessage, payMessage } = result.data

  try {
    await updateWhatsappMessage({ chargeMessage, payMessage, payOffMessage })
    revalidateTag('whatsapp-messages')
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
    message: 'Mensagem atualizada com sucesso',
    errors: null,
  }
}
