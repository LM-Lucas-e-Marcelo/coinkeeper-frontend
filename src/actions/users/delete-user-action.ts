'use server'

import { Status } from '@/constants/status'
import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { revalidateTag } from 'next/cache'

interface DeleteUserProps {
  id: string | null
}

export async function deleteUser({
  id,
}: DeleteUserProps): Promise<IActionResponse> {
  const { Error, Success } = Status

  try {
    await api(`/users/${id}`, {
      method: 'DELETE',
    })

    revalidateTag('users')
    return {
      status: Success,
      message: 'Usuário excluido com sucesso!',
    }
  } catch (error) {
    return {
      status: Error,
      message: 'Error message',
    }
  }
}
