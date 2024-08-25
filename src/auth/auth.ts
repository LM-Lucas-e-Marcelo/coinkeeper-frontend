import { cookies } from 'next/headers'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getUser() {
  return cookies().get('user')?.value
}

export function getCompanyName() {
  return cookies().get('organization-name')?.value
}

export function isAuthenticatedWithCompany() {
  return !!cookies().get('organization-token')?.value
}
