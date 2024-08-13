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
  [key: string]: string
}

export async function getUsers(props: IGetUsers): Promise<{ users: IUsers }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = await api.get(`users/search?${queryParams.toString()}`, {
    next: {
      tags: ['users'],
    },
  })

  const users = await result.json<IUsers>()

  return { users }
}
