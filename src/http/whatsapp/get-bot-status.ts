import { api } from '../api-client'

export interface IStatus {
  id: string
  name: string
  connectionStatus: string
}

export async function getBotStatus(): Promise<{ status: IStatus }> {
  const result = await api.get(`bot-instances/organization`, {
    next: {
      tags: ['bot-status'],
    },
  })

  const status = await result.json<IStatus>()

  return { status }
}
