'use server'

import { createExpenseTransaction } from '@/http/expenses/create-expense-transaction'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createExpenseTransactionSchema = z.object({
  expenseId: z.string(),
  dueDate: z.string().nullish(),
  paymentDate: z.string().nullish(),
  description: z.string().min(1, { message: 'Descrição é obrigatório' }),
  value: z.coerce.number().min(1, { message: 'Informe um valor válido' }),
})

export async function createExpenseTransactionAction(data: FormData) {
  const result = createExpenseTransactionSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { description, value, expenseId, dueDate, paymentDate } = result.data

  try {
    await createExpenseTransaction({
      description,
      value,
      expenseId,
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
    message: 'Despesa cadastrada com sucesso',
    errors: null,
  }
}
