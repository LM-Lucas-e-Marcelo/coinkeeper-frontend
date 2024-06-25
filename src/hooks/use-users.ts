import { api } from '@/services/api'
import { IUsers } from '@/types/users/get-users'

interface UseUsersProps {
  per?: string
  content?: string
}

export async function useUsers({
  content = '',
  per = '',
}: UseUsersProps): Promise<{ users: IUsers }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const response = await api(`/users/search?${queryParams.toString()}`, {
    next: {
      tags: ['users'],
    },
  })

  const users = await response.json()

  return { users }
}
