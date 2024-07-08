'use server'

import { createRole } from '@/http/roles/create-role'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

export async function createRoleAction(data: FormData) {
  const result = createRoleSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    await createRole({ name })
    revalidateTag('roles')
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

  return { success: true, message: 'Grupo criado com sucesso', errors: null }
}
