import { api } from '../api-client'

export interface IConnectBot {
  token: string
}

export async function getConnectBot(): Promise<{ qrcode: IConnectBot }> {
  const result = await api.get(`bot-instances/organization/connect`, {
    next: {
      tags: ['connect-bot'],
    },
  })

  const qrcode = await result.json<IConnectBot>()

  return { qrcode }
}
