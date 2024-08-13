'use server'

import { SUPPORTED_SIZE } from '@/constants/files'
import { updateCustomer } from '@/http/customers/update-customer'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateCustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  document: z.string().nullish(),
  phone: z.string().nullish(),
  phoneWhatsapp: z.string().nullish(),
  address: z.string().nullish(),
  email: z.string().nullish(),
  businessAddress: z.string().nullish(),
  residentialAddress: z.string().nullish(),
  documentFile: z.any().refine((file) => {
    return !file || file?.size <= SUPPORTED_SIZE
  }, 'O arquivo deve ser menor que 25mb'),
  proofAddressFile: z.any().refine((file) => {
    return file && file?.size <= SUPPORTED_SIZE
  }, 'O arquivo deve ser menor que 25mb'),
})

export async function updateCustomerAction(data: FormData) {
  const result = updateCustomerSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const {
    id,
    name,
    email,
    address,
    document,
    phone,
    phoneWhatsapp,
    businessAddress,
    documentFile,
    proofAddressFile,
    residentialAddress,
  } = result.data

  try {
    await updateCustomer({
      id,
      name,
      email,
      address,
      document,
      phone,
      phoneWhatsapp,
      businessAddress,
      documentFile,
      proofAddressFile,
      residentialAddress,
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
    message: 'Cliente editado com sucesso',
    errors: null,
  }
}
