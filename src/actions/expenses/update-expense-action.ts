'use server'

import { updateExpense } from '@/http/expenses/update-expense'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateExpenseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

export async function updateExpenseAction(data: FormData) {
  const result = updateExpenseSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id, name } = result.data

  try {
    await updateExpense({
      id,
      name,
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
