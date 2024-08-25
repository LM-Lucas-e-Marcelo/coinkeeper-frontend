import { api } from '../api-client'

export async function payManyParcels(data: Record<number, number>) {
  const payload = Object.entries(data).map(([key, value]) => ({
    id: key,
    amountParcels: value,
  }))

  const result = api
    .patch(`customers/pay-many-parcels`, {
      json: payload,
    })
    .json()

  return result
}
