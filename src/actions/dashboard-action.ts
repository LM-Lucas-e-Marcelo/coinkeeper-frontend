'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

export async function DashboardAction() {
  try {
    revalidateTag('get-month-data')
    revalidateTag('get-total-data')
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

  return {
    success: true,
    message: '',
    errors: null,
  }
}
