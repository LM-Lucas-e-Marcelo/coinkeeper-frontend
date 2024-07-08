'use server'

import { updateUser } from '@/http/users/update-user'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  username: z.string().min(1, { message: 'Usuário é obrigatório' }),
  password: z.string().nullish(),
  id: z.string(),
})

export async function updateUserAction(data: FormData) {
  const result = updateUserSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, username, password, id } = result.data

  try {
    await updateUser({ name, username, id, password })
    revalidateTag('users')
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

  return { success: true, message: 'Usuário editado com sucesso', errors: null }
}
