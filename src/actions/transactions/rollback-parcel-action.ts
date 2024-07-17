'use server'

import { rollbackParcel } from '@/http/transactions/rollback-parcel'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const rollbackParcelSchema = z.object({
  id: z.string(),
  transactionId: z.string(),
})

export async function rollbackParcelAction(data: FormData) {
  const result = rollbackParcelSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id, transactionId } = result.data

  try {
    await rollbackParcel({ id, transactionId })
    revalidateTag('transactions')
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
    message: 'Pagamento cancelado com sucesso',
    errors: null,
  }
}
