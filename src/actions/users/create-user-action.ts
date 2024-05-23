'use server'

import { Status } from '@/constants/status'
import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { CreateUserData } from '@/types/users/create-user'
import { revalidateTag } from 'next/cache'

export async function createUser(
  data: CreateUserData,
): Promise<IActionResponse> {
  const { Error, Success } = Status
  try {
    await api('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    revalidateTag('users')
    return {
      status: Success,
      message: 'Usuário cadastrado com sucesso!',
    }
  } catch (error) {
    return {
      status: Error,
      message: 'Error message',
    }
  }
}
