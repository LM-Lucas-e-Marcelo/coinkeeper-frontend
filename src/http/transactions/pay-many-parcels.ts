import { api } from '../api-client'

export async function payManyParcels(
  data: Record<number, { value: number; paidLate: boolean }>,
) {
  const payload = Object.entries(data).map(([key, value]) => ({
    id: key,
    amountParcels: value.value,
    paidLate: value.paidLate,
  }))

  const result = api
    .patch(`customers/pay-many-parcels`, {
      json: payload,
    })
    .json()

  return result
}
