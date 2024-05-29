'use server'

import { Status } from '@/constants/status'
import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { revalidateTag } from 'next/cache'

interface DeleteRoleProps {
  id: string | null
}

export async function deleteRole({
  id,
}: DeleteRoleProps): Promise<IActionResponse> {
  const { Error: Err, Success } = Status

  try {
    await api(`/roles/${id}`, {
      method: 'DELETE',
    })

    revalidateTag('roles')
    return {
      status: Success,
      message: 'Grupo excluido com sucesso!',
    }
  } catch (error) {
    return {
      status: Err,
      message: 'Error message',
    }
  }
}
