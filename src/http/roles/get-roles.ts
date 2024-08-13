import { api } from '../api-client'

export interface IRole {
  id: number
  name: string
}

export interface IRoles {
  items: IRole[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetRoles {
  [key: string]: string
}

export async function getRoles(props: IGetRoles): Promise<{ roles: IRoles }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = api.get(`roles/search?${queryParams.toString()}`, {
    next: {
      tags: ['roles'],
    },
  })

  const roles = await result.json<IRoles>()

  return { roles }
}
