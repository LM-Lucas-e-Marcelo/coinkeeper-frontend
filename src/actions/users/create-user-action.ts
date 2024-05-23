'use server'

import { api } from '@/services/api'
import { IActionResponse } from '@/types/action-response'
import { CreateUserData } from '@/types/users/create-user'
import { revalidateTag } from 'next/cache'

export async function createUser(
  data: CreateUserData,
): Promise<IActionResponse> {
  try {
    await api('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    revalidateTag('users')

    return { status: 'success', message: 'Usuário cadastrado com sucesso!' }
  } catch (error) {
    return {
      status: 'error',
      message: 'Mensagem do error',
    }
  }
}
