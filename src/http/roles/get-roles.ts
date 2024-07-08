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
  per?: string
  content?: string
}

export async function getRoles({
  content = '',
  per = '',
}: IGetRoles): Promise<{ roles: IRoles }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const result = api.get(`roles/search?${queryParams.toString()}`, {
    next: {
      tags: ['roles'],
    },
  })

  const roles = await result.json<IRoles>()

  return { roles }
}
