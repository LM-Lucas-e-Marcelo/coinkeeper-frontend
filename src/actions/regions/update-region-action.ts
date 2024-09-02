'use server'

import { updateRegion } from '@/http/regions/update-region'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateRegionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

export async function updateRegionAction(data: FormData) {
  const result = updateRegionSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id, name } = result.data

  try {
    await updateRegion({
      id,
      name,
    })

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
    message: 'Região editada com sucesso',
    errors: null,
  }
}
