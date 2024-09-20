'use server'

import { addCustomerDocuments } from '@/http/customers/add-customer-documents'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

interface addCustomerDocumentsAction {
  files: FormData
  customerId: number
}

export async function addCustomerDocumentsAction({
  files,
  customerId,
}: addCustomerDocumentsAction) {
  try {
    await addCustomerDocuments({
      files,
      customerId,
    })

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
    message: 'Documentos adicionados com sucesso',
    errors: null,
  }
}
