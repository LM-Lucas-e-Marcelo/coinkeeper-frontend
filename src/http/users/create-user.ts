import { api } from '../api-client'

interface CreateUserRequest {
  name: string
  username: string
  password: string
  roleId: number
}

export async function createUser({
  password,
  username,
  name,
  roleId,
}: CreateUserRequest) {
  const result = await api
    .post('users', {
      json: {
        username,
        password,
        name,
        roleId,
      },
    })
    .json()

  return result
}
