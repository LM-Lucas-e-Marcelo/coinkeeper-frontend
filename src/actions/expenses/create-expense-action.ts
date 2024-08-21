'use server'

import { createExpense } from '@/http/expenses/create-expense'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createExpenseSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

export async function createExpenseAction(data: FormData) {
  const result = createExpenseSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    await createExpense({
      name,
    })

    revalidateTag('expenses')
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
