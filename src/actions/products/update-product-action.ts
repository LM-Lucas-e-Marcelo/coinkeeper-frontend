'use server'

import { updateProduct } from '@/http/products/update-product'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateProductSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  parcels: z.coerce
    .number()
    .min(1, { message: 'Informe a quantidade de parcelas' }),
  value: z.coerce.number().min(1, { message: 'Informe um valor válido' }),
  id: z.string(),
})

export async function updateProductAction(data: FormData) {
  const result = updateProductSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, parcels, value, id } = result.data

  try {
    await updateProduct({ name, parcels, id, value })
    revalidateTag('products')
  } catch (err) {
    if (err instanceof HTTPError) {
      console.error(err)
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

  return { success: true, message: 'Produto editado com sucesso', errors: null }
}
