'use server'

import { deleteCustomerDocument } from '@/http/customers/delete-customer-document'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const deleteCustomerDocumentActionSchema = z.object({
  customerId: z.string(),
  fileId: z.string(),
})

export async function deleteCustomerDocumentAction(data: FormData) {
  const result = deleteCustomerDocumentActionSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { customerId, fileId } = result.data

  try {
    await deleteCustomerDocument({ customerId, fileId })
    revalidateTag('customer-by-id')
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
    message: 'Documento excluido com sucesso',
    errors: null,
  }
}
