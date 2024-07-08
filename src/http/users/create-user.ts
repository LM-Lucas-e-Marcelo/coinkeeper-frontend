import { api } from '../api-client'

interface CreateUserRequest {
  name: string
  username: string
  password: string
}

export async function createUser({
  password,
  username,
  name,
}: CreateUserRequest) {
  const result = api
    .post('users', {
      json: {
        username,
        password,
        name,
      },
    })
    .json()

  return result
}
