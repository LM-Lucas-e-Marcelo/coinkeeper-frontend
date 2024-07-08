'use server'

import { createUser } from '@/http/users/create-user'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  username: z.string().min(1, { message: 'Usuário é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatório' }),
})

export async function createUserAction(data: FormData) {
  const result = createUserSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, password, username } = result.data

  try {
    await createUser({ name, password, username })
    revalidateTag('users')
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

  return { success: true, message: 'Usuário criado com sucesso', errors: null }
}
