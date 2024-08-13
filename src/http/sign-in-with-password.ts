import { api } from './api-client'

interface SignInWithPasswordRequest {
  username: string
  password: string
}

export interface SignInWithPasswordResponse {
  token: string
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
        organizationId: 1,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
