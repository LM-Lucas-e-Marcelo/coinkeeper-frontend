import { api } from '../api-client'

export async function sendMessage(data: number[]) {
  const result = api
    .patch(`customers/send-pending-message`, {
      json: data,
    })
    .json()

  return result
}
