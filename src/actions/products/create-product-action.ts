'use server'

import { createProduct } from '@/http/products/create-product'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createProductSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  parcels: z.coerce
    .number()
    .min(1, { message: 'Informe a quantidade de parcelas' }),
  value: z.coerce.number().min(1, { message: 'Informe um valor válido' }),
})

export async function createProductAction(data: FormData) {
  const result = createProductSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, parcels, value } = result.data

  try {
    await createProduct({
      name,
      parcels,
      value,
    })

    revalidateTag('products')
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
    message: 'Produto cadastrado com sucesso',
    errors: null,
  }
}
