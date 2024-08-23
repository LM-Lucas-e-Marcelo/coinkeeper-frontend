import { cookies } from 'next/headers'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getUser() {
  return cookies().get('user')?.value
}
