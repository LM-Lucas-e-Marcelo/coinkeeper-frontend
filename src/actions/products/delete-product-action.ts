'use server'

import { deleteProduct } from '@/http/products/delete-product'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteProductSchema = z.object({
  id: z.string(),
})

export async function deleteProductAction(data: FormData) {
  const result = deleteProductSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id } = result.data

  try {
    await deleteProduct({ id })
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
    message: 'Produto excluido com sucesso',
    errors: null,
  }
}
