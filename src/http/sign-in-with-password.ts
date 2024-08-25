import { api } from './api-client'

interface SignInWithPasswordRequest {
  username: string
  password: string
}

export interface SignInWithPasswordResponse {
  token: string
  user: {
    name: string
  }
}

export async function signInWithPassword({
  username,
  password,
}: SignInWithPasswordRequest) {
  const result = api
    .post('auth/sign-in', {
      json: {
        username,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
