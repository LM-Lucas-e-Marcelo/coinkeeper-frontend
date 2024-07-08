'use server'

import { deleteRole } from '@/http/roles/delete-role'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteRoleSchema = z.object({
  id: z.string(),
})

export async function deleteRoleAction(data: FormData) {
  const result = deleteRoleSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id } = result.data

  try {
    await deleteRole({ id })
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

  return {
    success: true,
    message: 'Grupo excluido com sucesso',
    errors: null,
  }
}
