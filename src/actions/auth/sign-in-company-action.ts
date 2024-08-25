'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { companyAuth } from '@/http/companies/company-auth'

export async function signInCompany(id: number) {
  try {
    const { token, company } = await companyAuth({
      organizationId: id,
    })

    cookies().set('organization-name', company.name, {
      path: '/',
      maxAge: 60 * 60 * 24, // 24hours
    })

    cookies().set('organization-token', token, {
      path: '/',
      maxAge: 60 * 60 * 24, // 24hours
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
