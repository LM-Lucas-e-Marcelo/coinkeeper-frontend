'use server'

import { updateExpenseTransaction } from '@/http/expenses/update-expense-transaction'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateExpenseTransactionSchema = z.object({
  transactionId: z.string(),
  dueDate: z.string().nullish(),
  paymentDate: z.string().nullish(),
  description: z.string().nullish(),
  value: z.coerce.number().nullish(),
})

export async function updateExpenseTransactionAction(data: FormData) {
  const result = updateExpenseTransactionSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { description, value, transactionId, dueDate, paymentDate } =
    result.data

  try {
    await updateExpenseTransaction({
      description,
      value,
      transactionId,
      ...(!!paymentDate?.length && { paymentDate }),
      ...(!!dueDate?.length && { dueDate }),
    })

    revalidateTag('expense-by-id')
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
    message: 'Despesa editada com sucesso',
    errors: null,
  }
}
