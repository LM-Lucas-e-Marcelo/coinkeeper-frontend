import { api } from '../api-client'

interface DeleteUserRequest {
  id: string
}

export async function deleteUser({ id }: DeleteUserRequest) {
  const result = await api.delete(`users/${id}`).json()

  return result
}
