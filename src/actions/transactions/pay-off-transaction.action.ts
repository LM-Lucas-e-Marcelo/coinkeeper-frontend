'use server'

import { payOffTransaction } from '@/http/transactions/pay-off-transaction'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const payOffTransactionSchema = z.object({
  transactionId: z.string(),
})

export async function payOffTransactionAction(data: FormData) {
  const result = payOffTransactionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { transactionId } = result.data

  try {
    await payOffTransaction({
      transactionId,
    })
    revalidateTag('transactions')
    revalidateTag('customers')
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
    message: 'Transação quitada com sucesso',
    errors: null,
  }
}
