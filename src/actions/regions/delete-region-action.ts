'use server'

import { deleteRegion } from '@/http/regions/delete-region'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteRegionSchema = z.object({
  id: z.string(),
})

export async function deleteRegionAction(data: FormData) {
  const result = deleteRegionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id } = result.data

  try {
    await deleteRegion({ id })
    revalidateTag('regions')
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
    message: 'Região excluida com sucesso',
    errors: null,
  }
}
