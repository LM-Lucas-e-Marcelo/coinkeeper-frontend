'use server'

import { SUPPORTED_SIZE } from '@/constants/files'
import { payParcel } from '@/http/transactions/pay-parcel'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const payParcelSchema = z.object({
  paymentDate: z.string().min(1, { message: 'Data é obrigatório' }),
  id: z.string(),
  transactionId: z.string(),
  observation: z.string().nullish(),
  proofFile: z.any().refine((file) => {
    return !file || file?.size <= SUPPORTED_SIZE
  }, 'O arquivo deve ser menor que 25mb'),
})

export async function payParcelAction(data: FormData) {
  const result = payParcelSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id, transactionId, paymentDate, observation, proofFile } = result.data

  try {
    await payParcel({ id, transactionId, paymentDate, observation, proofFile })
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

  return { success: true, message: 'Parcela paga com sucesso', errors: null }
}
