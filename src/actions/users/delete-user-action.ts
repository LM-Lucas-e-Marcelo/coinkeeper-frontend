'use server'

import { deleteUser } from '@/http/users/delete-user'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteUserSchema = z.object({
  id: z.string(),
})

export async function deleteUserAction(data: FormData) {
  const result = deleteUserSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id } = result.data

  try {
    await deleteUser({ id })
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

  return {
    success: true,
    message: 'Usuário excluido com sucesso',
    errors: null,
  }
}
