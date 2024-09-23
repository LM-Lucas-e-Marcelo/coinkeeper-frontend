'use server'

import { financialLoss } from '@/http/transactions/financial-loss'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const financialLossSchema = z.object({
  transactionId: z.string(),
})

export async function FinancialLossAction(data: FormData) {
  const result = financialLossSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { transactionId } = result.data

  try {
    await financialLoss({
      transactionId,
    })
    revalidateTag('customer-by-id')
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
    message: 'Transação marcada como prejuízo.',
    errors: null,
  }
}
