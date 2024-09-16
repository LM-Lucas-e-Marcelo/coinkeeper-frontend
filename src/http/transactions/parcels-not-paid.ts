import { api } from '../api-client'

export async function parcelsNotPaid(data: number[]) {
  const result = api
    .patch(`customers/inform-parcels-not-paid`, {
      json: data,
    })
    .json()

  return result
}
