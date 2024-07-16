'use server'

import { deleteTransaction } from '@/http/transactions/delete-transaction'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteTransactionSchema = z.object({
  id: z.string(),
})

export async function deleteTransactionAction(data: FormData) {
  const result = deleteTransactionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id } = result.data

  try {
    await deleteTransaction({ id })
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
    message: 'Transação excluida com sucesso',
    errors: null,
  }
}
