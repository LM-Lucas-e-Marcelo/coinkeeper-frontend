'use server'

import { SUPPORTED_SIZE } from '@/constants/files'
import { createTransaction } from '@/http/transactions/create-transaction'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createTransactionSchema = z.object({
  customerId: z.string(),
  firstDueDate: z
    .string()
    .min(1, { message: 'Vencimento da primeira parcela é obrigatório' }),
  totalParcels: z.coerce
    .number()
    .min(1, { message: 'Quantidade de parcelas é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatório' }),
  value: z.coerce.number().min(1, { message: 'Informe um valor válido' }),
  differenceBetweenParcels: z.coerce.number().nullish(),
  contractFile: z.any().refine((file) => {
    return !file || file?.size <= SUPPORTED_SIZE
  }, 'O arquivo deve ser menor que 25mb'),
  companyExpense: z.coerce.number().nullish(),
})

export async function createTransactionAction(data: FormData) {
  const result = createTransactionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const {
    customerId,
    firstDueDate,
    totalParcels,
    description,
    value,
    differenceBetweenParcels,
    companyExpense,
    contractFile,
  } = result.data

  try {
    await createTransaction({
      customerId,
      firstDueDate,
      totalParcels,
      description,
      value,
      differenceBetweenParcels,
      companyExpense,
      contractFile,
    })

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
    message: 'Transação cadastrado com sucesso',
    errors: null,
  }
}
