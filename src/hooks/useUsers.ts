import { api } from '@/services/api'
import { IUsers } from '@/types/users/get-users'

export async function getUsers(): Promise<IUsers> {
  const response = await api('/users/search', {
    next: {
      tags: ['users'],
    },
  })

  const users = await response.json()

  return users
}
