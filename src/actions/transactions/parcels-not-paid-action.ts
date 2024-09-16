'use server'

import { payManyParcels } from '@/http/transactions/pay-many-parcels'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

export async function parcelsNotPaidAction(data: Record<number, number>) {
  try {
    await payManyParcels(data)
    revalidateTag('customer-by-id')
    revalidateTag('customers')
    revalidateTag('customers-with-debt')
    revalidateTag('charges')
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

  return { success: true, message: 'Registro salvo com sucesso!', errors: null }
}
