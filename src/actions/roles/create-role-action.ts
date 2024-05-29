'use server'

import { Status } from '@/constants/status'
import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { CreateRoleData } from '@/types/roles/create-role'
import { revalidateTag } from 'next/cache'

export async function createRole(
  data: CreateRoleData,
): Promise<IActionResponse> {
  const { Error, Success } = Status
  try {
    await api('/roles', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    revalidateTag('roles')
    return {
      status: Success,
      message: 'Grupo cadastrado com sucesso!',
    }
  } catch (error) {
    return {
      status: Error,
      message: 'Error message',
    }
  }
}
