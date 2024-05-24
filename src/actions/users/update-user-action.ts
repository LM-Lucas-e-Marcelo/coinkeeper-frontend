'use server'

import { Status } from '@/constants/status'
import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { UpdateUserData } from '@/types/users/update-user'
import { revalidateTag } from 'next/cache'

interface UpdateUserProps extends UpdateUserData {
  id: string | null
}

export async function updateUser(
  data: UpdateUserProps,
): Promise<IActionResponse> {
  const { Error, Success } = Status
  const { id, ...rest } = data

  try {
    await api(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(rest),
    })

    revalidateTag('users')
    return {
      status: Success,
      message: 'Usuário editado com sucesso!',
    }
  } catch (error) {
    return {
      status: Error,
      message: 'Error message',
    }
  }
}
