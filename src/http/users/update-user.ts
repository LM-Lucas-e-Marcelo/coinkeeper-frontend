import { api } from '../api-client'

interface UpdateUserRequest {
  name: string
  username: string
  password?: string | null
  id: string
}

export async function updateUser({
  password,
  username,
  name,
  id,
}: UpdateUserRequest) {
  const result = await api
    .patch(`users/${id}`, {
      json: {
        username,
        password,
        name,
      },
    })
    .json()

  return result
}
