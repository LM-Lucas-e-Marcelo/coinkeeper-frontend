'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

export async function reloadStatusAction() {
  try {
    revalidateTag('bot-status')
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

  return { success: true, message: 'Recarregado com sucesso!', errors: null }
}
