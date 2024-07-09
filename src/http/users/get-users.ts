import { api } from '../api-client'

export interface IUser {
  id: number
  name: string
  username: string
  role: {
    id: number
    name: string
  }
}

export interface IUsers {
  items: IUser[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetUsers {
  per?: string
  content?: string
}

export async function getUsers({
  content = '',
  per = '',
}: IGetUsers): Promise<{ users: IUsers }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const result = await api.get(`users/search?${queryParams.toString()}`, {
    next: {
      tags: ['users'],
    },
  })

  const users = await result.json<IUsers>()

  return { users }
}
